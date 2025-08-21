// Content script for WordGlance extension
// Handles UI interactions and text selection on web pages

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        tooltipZIndex: 999999,
        maxDefinitions: 9,
        maxTranslations: 8,
        definitionsPerPage: 3,
        translationsPerPage: 4,
        maxSynonyms: 6,
        maxAntonyms: 6,
        cacheSize: 100,
        apiTimeout: 10000
    };

    // Settings - loaded from storage
    let targetLanguage = 'bn';
    let sourceLanguage = 'auto';
    let isDarkMode = false;

    // Language definitions (same as userscript)
    const LANGUAGES = {
        'auto': 'Auto-detect',
        'en': 'English', 'bn': 'Bengali', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
        'it': 'Italian', 'pt': 'Portuguese', 'ru': 'Russian', 'ja': 'Japanese',
        'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic', 'hi': 'Hindi',
        'tr': 'Turkish', 'nl': 'Dutch', 'sv': 'Swedish', 'da': 'Danish',
        'no': 'Norwegian', 'fi': 'Finnish', 'pl': 'Polish', 'cs': 'Czech',
        'sk': 'Slovak', 'hu': 'Hungarian', 'ro': 'Romanian', 'bg': 'Bulgarian',
        'hr': 'Croatian', 'sr': 'Serbian', 'sl': 'Slovenian', 'et': 'Estonian',
        'lv': 'Latvian', 'lt': 'Lithuanian', 'uk': 'Ukrainian', 'el': 'Greek',
        'he': 'Hebrew', 'th': 'Thai', 'vi': 'Vietnamese', 'id': 'Indonesian',
        'ms': 'Malay', 'tl': 'Filipino', 'sw': 'Swahili', 'am': 'Amharic', 'zu': 'Zulu'
    };

    // State variables
    let tooltip = null;
    let triggerIcon = null;
    let resizeTimeout = null;
    let currentSelection = '';
    let selectionRange = null;
    let definitionData = null;
    let translationData = null;
    let currentDefinitionPage = 0;
    let currentTranslationPage = 0;
    let definitionPageHeights = [];
    let translationPageHeights = [];

    // DOM element cache
    let domCache = {
        definitionSlider: null,
        translationSlider: null,
        translationTitle: null,
        definitionInfo: null,
        translationInfo: null,
        definitionPrevBtn: null,
        definitionNextBtn: null,
        translationPrevBtn: null,
        translationNextBtn: null
    };

    // Initialize extension
    async function init() {
        try {
            const response = await browser.runtime.sendMessage({ action: 'getSettings' });
            if (response.success) {
                targetLanguage = response.settings.targetLanguage;
                sourceLanguage = response.settings.sourceLanguage;
                isDarkMode = response.settings.isDarkMode;
            }
        } catch (error) {
            console.log('Failed to load settings:', error);
        }

        // Set up event listeners
        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('keyup', handleSelection);
        document.addEventListener('touchend', function(e) {
            setTimeout(handleSelection, 100);
        });
        document.addEventListener('selectionchange', function() {
            if (document.hasFocus()) {
                setTimeout(handleSelection, 150);
            }
        });
        
        document.addEventListener('click', function(e) {
            if (tooltip && !tooltip.contains(e.target) && 
                triggerIcon && !triggerIcon.contains(e.target) &&
                window.getSelection().toString().trim() === '') {
                hideTooltip();
                hideTriggerIcon();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideTooltip();
                hideTriggerIcon();
            }
        });

        document.addEventListener('selectstart', function(e) {
            if ((tooltip && tooltip.contains(e.target)) || 
                (triggerIcon && triggerIcon.contains(e.target))) {
                e.preventDefault();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            if (!tooltip || tooltip.style.display === 'none') return;
            
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            
            resizeTimeout = setTimeout(() => {
                definitionPageHeights[currentDefinitionPage] = recalcCurrentPageHeight('definition');
                translationPageHeights[currentTranslationPage] = recalcCurrentPageHeight('translation');
                setContainerHeightFromCache('definition');
                setContainerHeightFromCache('translation');
            }, 100);
        });

        // Listen for settings changes from popup
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'settingsChanged') {
                targetLanguage = message.settings.targetLanguage;
                sourceLanguage = message.settings.sourceLanguage;
                isDarkMode = message.settings.isDarkMode;
                
                // Update UI if tooltip is open
                updateUIForSettings();
                sendResponse({ success: true });
            }
        });
    }

    // Update UI when settings change
    function updateUIForSettings() {
        if (tooltip) {
            tooltip.className = `wordglance-tooltip ${isDarkMode ? 'dark-mode' : ''}`;
            
            // Update translation title
            const translationTitle = domCache.translationTitle || tooltip.querySelector('.translation-section .section-title span');
            if (translationTitle) {
                const sourceLabel = sourceLanguage === 'auto' ? 'Auto' : getLanguageName(sourceLanguage);
                const targetLabel = getLanguageName(targetLanguage);
                translationTitle.textContent = `${sourceLabel} → ${targetLabel}`;
                
                // Reload translation if there's a current selection
                if (currentSelection) {
                    reloadTranslationContent();
                }
            }
        }
        
        if (triggerIcon) {
            triggerIcon.className = `wordglance-trigger-icon ${isDarkMode ? 'dark-mode' : ''}`;
        }
    }

    // Get language name for display
    function getLanguageName(code) {
        return LANGUAGES[code] || code.toUpperCase();
    }

    // Enhanced input sanitization function (same as userscript)
    function sanitizeAndValidateText(text) {
        if (!text || typeof text !== 'string') {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        let sanitized = text.trim();
        sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
        sanitized = sanitized.replace(/[<>'"&]/g, '');
        
        if (sanitized.length === 0) {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        if (sanitized.length > 100) {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        const words = sanitized.split(/\s+/).filter(word => word.length > 0);
        if (words.length > 5) {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        if (!/^[\p{L}\s\-'\.]+$/u.test(sanitized)) {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        if (/^\d+$/.test(sanitized)) {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        if (/^[^\p{L}]+$/u.test(sanitized)) {
            return { valid: false, sanitized: '', error: 'Invalid input' };
        }
        
        return { valid: true, sanitized: sanitized, error: null };
    }

    // Handle text selection
    function handleSelection() {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        
        const validation = sanitizeAndValidateText(selectedText);
        
        if (validation.valid && validation.sanitized !== currentSelection) {
            currentSelection = validation.sanitized;
            
            if (selection.rangeCount > 0) {
                selectionRange = selection.getRangeAt(0);
            }
            
            if (selectionRange) {
                try {
                    const rect = selectionRange.getBoundingClientRect();
                    const x = rect.left + (rect.width / 2);
                    const y = rect.top;
                    showTriggerIcon(x, y);
                } catch (e) {
                    console.log('Error positioning trigger icon:', e);
                }
            }
        } else if (!selectedText || !validation.valid) {
            currentSelection = '';
            selectionRange = null;
            hideTooltip();
            hideTriggerIcon();
        }
    }

    // Create trigger icon
    function createTriggerIcon() {
        const icon = document.createElement('button');
        icon.className = `wordglance-trigger-icon ${isDarkMode ? 'dark-mode' : ''}`;
        icon.innerHTML = '📖';
        icon.title = 'Click to get definition and translation';
        document.body.appendChild(icon);
        return icon;
    }

    // Show trigger icon
    function showTriggerIcon(x, y) {
        if (!triggerIcon) {
            triggerIcon = createTriggerIcon();
            
            if (!triggerIcon) {
                console.log('Failed to create trigger icon');
                return;
            }
            
            triggerIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentSelection) {
                    const rect = triggerIcon.getBoundingClientRect();
                    showTooltip(currentSelection, rect.left, rect.top);
                }
            });
        }
        
        positionTriggerIcon(triggerIcon, x, y);
        triggerIcon.style.display = 'block';
        
        requestAnimationFrame(() => {
            if (triggerIcon) {
                triggerIcon.classList.add('show');
            }
        });
    }

    // Position trigger icon (same logic as userscript)
    function positionTriggerIcon(icon, x, y) {
        requestAnimationFrame(() => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0);
            
            const buttonSize = isMobile ? 32 : 24;
            const halfButton = buttonSize / 2;
            
            let left, top;
            
            if (isMobile) {
                left = Math.max(10, Math.min(x - halfButton, viewportWidth - buttonSize - 10));
                top = y + 40;
                
                if (top + buttonSize > viewportHeight - 50) {
                    left = Math.min(x + 20, viewportWidth - buttonSize - 10);
                    top = Math.max(10, y - halfButton);
                    
                    if (left + buttonSize > viewportWidth - 10) {
                        left = Math.max(10, x - buttonSize - 20);
                    }
                }
            } else {
                left = x + 10;
                top = y - 30;
                
                if (left + buttonSize > viewportWidth) {
                    left = x - buttonSize - 10;
                }
                if (top < 0) {
                    top = y + 10;
                }
            }
            
            icon.style.left = left + window.scrollX + 'px';
            icon.style.top = top + window.scrollY + 'px';
        });
    }

    // Hide trigger icon
    function hideTriggerIcon() {
        if (triggerIcon) {
            triggerIcon.classList.remove('show');
            setTimeout(() => {
                if (triggerIcon && !triggerIcon.classList.contains('show')) {
                    triggerIcon.style.display = 'none';
                }
            }, 250);
        }
    }

    // Create tooltip element (same structure as userscript)
    function createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = `wordglance-tooltip ${isDarkMode ? 'dark-mode' : ''}`;
        tooltip.innerHTML = `
            <div class="definition-section">
                <div class="section-title">
                    <span class="word-title">Word</span>
                    <div class="slider-controls">
                        <button class="slider-button definition-prev">‹</button>
                        <span class="slider-info definition-info">1/1</span>
                        <button class="slider-button definition-next">›</button>
                    </div>
                </div>
                <div class="content-container">
                    <div class="content-slider definition-slider">
                        <div class="content-page">
                            <div class="definition-content loading">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="translation-section">
                <div class="section-title">
                    <span class="translation-title">${sourceLanguage === 'auto' ? 'Auto' : getLanguageName(sourceLanguage)} → ${getLanguageName(targetLanguage)}</span>
                    <div class="slider-controls">
                        <button class="slider-button translation-prev">‹</button>
                        <span class="slider-info translation-info">1/1</span>
                        <button class="slider-button translation-next">›</button>
                    </div>
                </div>
                <div class="content-container">
                    <div class="content-slider translation-slider">
                        <div class="content-page">
                            <div class="translation-content loading">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="synonyms-antonyms-section" style="display: none;">
                <div class="synonyms-antonyms-content"></div>
            </div>
        `;
        
        // Add event listeners for navigation
        tooltip.querySelector('.definition-prev').addEventListener('click', () => {
            if (currentDefinitionPage > 0) {
                currentDefinitionPage--;
                updateDefinitionSlider();
            }
        });
        
        tooltip.querySelector('.definition-next').addEventListener('click', () => {
            if (definitionData && currentDefinitionPage < definitionData.pages.length - 1) {
                currentDefinitionPage++;
                updateDefinitionSlider();
            }
        });
        
        tooltip.querySelector('.translation-prev').addEventListener('click', () => {
            if (currentTranslationPage > 0) {
                currentTranslationPage--;
                updateTranslationSlider();
            }
        });
        
        tooltip.querySelector('.translation-next').addEventListener('click', () => {
            if (translationData && currentTranslationPage < translationData.pages.length - 1) {
                currentTranslationPage++;
                updateTranslationSlider();
            }
        });
        
        document.body.appendChild(tooltip);
        
        // Cache DOM elements
        cacheDOMElements();
        attachTransitionHeightSync();
        
        return tooltip;
    }

    // Cache DOM elements for performance
    function cacheDOMElements() {
        if (!tooltip) return;
        
        domCache.definitionSlider = tooltip.querySelector('.definition-slider');
        domCache.translationSlider = tooltip.querySelector('.translation-slider');
        domCache.translationTitle = tooltip.querySelector('.translation-section .section-title span');
        domCache.definitionInfo = tooltip.querySelector('.definition-info');
        domCache.translationInfo = tooltip.querySelector('.translation-info');
        domCache.definitionPrevBtn = tooltip.querySelector('.definition-prev');
        domCache.definitionNextBtn = tooltip.querySelector('.definition-next');
        domCache.translationPrevBtn = tooltip.querySelector('.translation-prev');
        domCache.translationNextBtn = tooltip.querySelector('.translation-next');
    }

    // Clear DOM cache
    function clearDOMCache() {
        if (tooltip) {
            const defSlider = tooltip.querySelector('.definition-slider');
            const transSlider = tooltip.querySelector('.translation-slider');
            
            if (defSlider && defSlider._heightSyncHandler) {
                defSlider.removeEventListener('transitionend', defSlider._heightSyncHandler);
                delete defSlider._heightSyncHandler;
            }
            if (transSlider && transSlider._heightSyncHandler) {
                transSlider.removeEventListener('transitionend', transSlider._heightSyncHandler);
                delete transSlider._heightSyncHandler;
            }
        }
        
        domCache = {
            definitionSlider: null,
            translationSlider: null,
            translationTitle: null,
            definitionInfo: null,
            translationInfo: null,
            definitionPrevBtn: null,
            definitionNextBtn: null,
            translationPrevBtn: null,
            translationNextBtn: null
        };
    }

    // Show tooltip with content
    async function showTooltip(selectedText, x, y) {
        if (!tooltip) {
            tooltip = createTooltip();
        }

        // Reset state
        currentDefinitionPage = 0;
        currentTranslationPage = 0;
        definitionData = null;
        translationData = null;
        definitionPageHeights = [];
        translationPageHeights = [];

        // Reset content
        const definitionSlider = tooltip.querySelector('.definition-slider');
        const translationSlider = tooltip.querySelector('.translation-slider');
        const synonymsAntonymsSection = tooltip.querySelector('.synonyms-antonyms-section');
        
        definitionSlider.innerHTML = '<div class="content-page"><div class="definition-content loading">Loading...</div></div>';
        translationSlider.innerHTML = '<div class="content-page"><div class="translation-content loading">Loading...</div></div>';
        
        if (synonymsAntonymsSection) {
            synonymsAntonymsSection.style.display = 'none';
        }
        
        // Reset controls
        tooltip.querySelector('.definition-info').textContent = '1/1';
        tooltip.querySelector('.translation-info').textContent = '1/1';
        tooltip.querySelector('.definition-prev').disabled = true;
        tooltip.querySelector('.definition-next').disabled = true;
        tooltip.querySelector('.translation-prev').disabled = true;
        tooltip.querySelector('.translation-next').disabled = true;
        
        // Update word title
        const wordTitle = tooltip.querySelector('.word-title');
        if (wordTitle) {
            wordTitle.textContent = selectedText;
        }
        
        // Position and show tooltip
        tooltip.style.display = 'block';
        positionTooltip(tooltip, x, y);

        // Set initial loading heights
        const defLoadingContainer = tooltip.querySelector('.definition-section .content-container');
        const transLoadingContainer = tooltip.querySelector('.translation-section .content-container');
        if (defLoadingContainer) smoothHeightTransition(defLoadingContainer, 60, true);
        if (transLoadingContainer) smoothHeightTransition(transLoadingContainer, 80, true);
        
        requestAnimationFrame(() => {
            if (tooltip) {
                tooltip.classList.add('show');
            }
        });

        // Fetch definition
        try {
            const defResponse = await browser.runtime.sendMessage({
                action: 'fetchDefinition',
                word: selectedText
            });
            
            if (defResponse.success) {
                definitionData = defResponse.data;
                displayDefinitionData(defResponse.data);
                
                // Increment words learned counter
                browser.runtime.sendMessage({ action: 'incrementWordsLearned' });
            } else {
                displayDefinitionError('Definition not found');
            }
        } catch (error) {
            console.log('Definition fetch error:', error);
            displayDefinitionError('Connection error - please try again');
        }

        // Fetch translation
        try {
            const transResponse = await browser.runtime.sendMessage({
                action: 'fetchTranslation',
                text: selectedText,
                sourceLanguage: sourceLanguage,
                targetLanguage: targetLanguage
            });
            
            if (transResponse.success) {
                translationData = transResponse.data;
                displayTranslationData(transResponse.data);
            } else {
                displayTranslationError('Translation not available');
            }
        } catch (error) {
            console.log('Translation fetch error:', error);
            displayTranslationError('Connection error - please try again');
        }
    }

    // Display definition data (same logic as userscript)
    function displayDefinitionData(result) {
        const definitionSlider = tooltip.querySelector('.definition-slider');
        
        let pagesHtml = '';
        result.pages.forEach((page, pageIndex) => {
            let pageHtml = '<div class="content-page">';
            
            page.forEach(def => {
                pageHtml += `
                    <div class="definition-item">
                        <span class="part-of-speech">${def.partOfSpeech}</span>
                        <div class="definition-text">${def.definition}</div>
                        ${def.example ? `<div class="example">"${def.example}"</div>` : ''}
                    </div>
                `;
            });
            
            pageHtml += '</div>';
            pagesHtml += pageHtml;
        });
        
        definitionSlider.innerHTML = pagesHtml;
        
        // Handle synonyms and antonyms
        const synonymsAntonymsSection = tooltip.querySelector('.synonyms-antonyms-section');
        const synonymsAntonymsContent = tooltip.querySelector('.synonyms-antonyms-content');
        
        if (result.synonyms.length > 0 || result.antonyms.length > 0) {
            let synonymsAntonymsHtml = '<div class="synonyms-antonyms">';
            
            if (result.synonyms.length > 0) {
                synonymsAntonymsHtml += `
                    <div class="synonyms">
                        <span class="synonyms-label">Synonyms:</span> 
                        <span class="synonyms-list">${result.synonyms.join(', ')}</span>
                    </div>
                `;
            }
            
            if (result.antonyms.length > 0) {
                synonymsAntonymsHtml += `
                    <div class="antonyms">
                        <span class="antonyms-label">Antonyms:</span> 
                        <span class="antonyms-list">${result.antonyms.join(', ')}</span>
                    </div>
                `;
            }
            
            synonymsAntonymsHtml += '</div>';
            synonymsAntonymsContent.innerHTML = synonymsAntonymsHtml;
            synonymsAntonymsSection.style.display = 'block';
        } else {
            synonymsAntonymsSection.style.display = 'none';
        }

        // Measure page heights
        definitionPageHeights = Array.from(definitionSlider.children).map(page => {
            return measurePageHeight(page);
        });
        
        updateDefinitionSlider(true);
        
        setTimeout(() => {
            setContainerHeightFromCache('definition', false);
        }, 50);
    }

    // Display definition error
    function displayDefinitionError(error) {
        const definitionSlider = tooltip.querySelector('.definition-slider');
        definitionSlider.innerHTML = `<div class="content-page"><span class="error">${error}</span></div>`;
        definitionPageHeights = [40];
        updateDefinitionSlider(true);
        
        setTimeout(() => {
            setContainerHeightFromCache('definition', false);
        }, 50);
        
        const synonymsAntonymsSection = tooltip.querySelector('.synonyms-antonyms-section');
        if (synonymsAntonymsSection) {
            synonymsAntonymsSection.style.display = 'none';
        }
    }

    // Display translation data (same logic as userscript)
    function displayTranslationData(result) {
        const translationSlider = tooltip.querySelector('.translation-slider');
        
        let pagesHtml = '';
        result.pages.forEach((page, pageIndex) => {
            let pageHtml = '<div class="content-page">';
            pageHtml += '<div class="translation-grid">';
            
            page.forEach(translation => {
                pageHtml += `<div class="translation-text">${translation}</div>`;
            });
            
            const emptyCells = CONFIG.translationsPerPage - page.length;
            for (let i = 0; i < emptyCells; i++) {
                pageHtml += '<div class="translation-text" style="opacity: 0; pointer-events: none;"></div>';
            }
            
            pageHtml += '</div>';
            pageHtml += '</div>';
            pagesHtml += pageHtml;
        });
        
        translationSlider.innerHTML = pagesHtml;

        translationPageHeights = Array.from(translationSlider.children).map(page => {
            return measurePageHeight(page);
        });
        
        updateTranslationSlider(true);
        
        setTimeout(() => {
            setContainerHeightFromCache('translation', false);
        }, 100);
    }

    // Display translation error
    function displayTranslationError(error) {
        const translationSlider = tooltip.querySelector('.translation-slider');
        translationSlider.innerHTML = `<div class="content-page"><span class="error">${error}</span></div>`;
        translationPageHeights = [40];
        updateTranslationSlider(true);
        
        setTimeout(() => {
            setContainerHeightFromCache('translation', false);
        }, 100);
    }

    // Update sliders (same logic as userscript)
    function updateDefinitionSlider(initial) {
        if (!tooltip || !definitionData) return;
        
        const slider = domCache.definitionSlider || tooltip.querySelector('.definition-slider');
        const info = domCache.definitionInfo || tooltip.querySelector('.definition-info');
        const prevBtn = domCache.definitionPrevBtn || tooltip.querySelector('.definition-prev');
        const nextBtn = domCache.definitionNextBtn || tooltip.querySelector('.definition-next');
        
        if (!slider || !info || !prevBtn || !nextBtn) return;
        
        slider.style.transform = `translateX(-${currentDefinitionPage * 100}%)`;
        info.textContent = `${currentDefinitionPage + 1}/${definitionData.pages.length}`;
        prevBtn.disabled = currentDefinitionPage === 0;
        nextBtn.disabled = currentDefinitionPage === definitionData.pages.length - 1;

        setContainerHeightFromCache('definition', initial);
    }

    function updateTranslationSlider(initial) {
        if (!tooltip || !translationData) return;
        
        const slider = domCache.translationSlider || tooltip.querySelector('.translation-slider');
        const info = domCache.translationInfo || tooltip.querySelector('.translation-info');
        const prevBtn = domCache.translationPrevBtn || tooltip.querySelector('.translation-prev');
        const nextBtn = domCache.translationNextBtn || tooltip.querySelector('.translation-next');
        
        if (!slider || !info || !prevBtn || !nextBtn) return;
        
        slider.style.transform = `translateX(-${currentTranslationPage * 100}%)`;
        info.textContent = `${currentTranslationPage + 1}/${translationData.pages.length}`;
        prevBtn.disabled = currentTranslationPage === 0;
        nextBtn.disabled = currentTranslationPage === translationData.pages.length - 1;

        setContainerHeightFromCache('translation', initial);
    }

    // Helper functions (same as userscript)
    function attachTransitionHeightSync() {
        if (!tooltip) return;
        const defSlider = tooltip.querySelector('.definition-slider');
        const transSlider = tooltip.querySelector('.translation-slider');
        const handler = (e) => {
            if (e.propertyName === 'transform') {
                setContainerHeightFromCache('definition');
                setContainerHeightFromCache('translation');
            }
        };
        
        if (defSlider) {
            defSlider.addEventListener('transitionend', handler);
            defSlider._heightSyncHandler = handler;
        }
        if (transSlider) {
            transSlider.addEventListener('transitionend', handler);
            transSlider._heightSyncHandler = handler;
        }
    }

    function setContainerHeightFromCache(kind, initial) {
        if (!tooltip) return;
        const container = tooltip.querySelector(`.${kind}-section .content-container`);
        if (!container) return;
        const heights = kind === 'definition' ? definitionPageHeights : translationPageHeights;
        const index = kind === 'definition' ? currentDefinitionPage : currentTranslationPage;
        const targetHeight = heights[index];
        
        if (targetHeight) {
            smoothHeightTransition(container, targetHeight, initial);
        }
    }

    function smoothHeightTransition(container, targetHeight, immediate = false) {
        if (!container) return;
        
        if (immediate) {
            const prevTransition = container.style.transition;
            container.style.transition = 'none';
            container.style.height = targetHeight + 'px';
            requestAnimationFrame(() => {
                if (container) {
                    container.style.transition = prevTransition || 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            });
        } else {
            container.style.height = targetHeight + 'px';
        }
    }

    function measurePageHeight(page) {
        const prevStyle = page.getAttribute('style') || '';
        page.style.position = 'absolute';
        page.style.visibility = 'hidden';
        page.style.left = '-10000px';
        page.style.top = '0';
        page.style.height = 'auto';
        const height = page.scrollHeight;
        page.setAttribute('style', prevStyle);
        return height;
    }

    function recalcCurrentPageHeight(kind) {
        if (!tooltip) return 0;
        const container = tooltip.querySelector(`.${kind}-section .content-container`);
        if (!container) return 0;
        const slider = container.querySelector(`.${kind}-slider`);
        if (!slider) return 0;
        const index = kind === 'definition' ? currentDefinitionPage : currentTranslationPage;
        const page = slider.children[index];
        if (!page) return 0;
        
        return measurePageHeight(page);
    }

    // Position tooltip (same logic as userscript)
    function positionTooltip(tooltip, x, y) {
        requestAnimationFrame(() => {
            const rect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            const margin = 20;
            
            let left = x + 10;
            let top = y - rect.height - 10;
            
            if (left + rect.width > viewportWidth - margin) {
                left = x - rect.width - 10;
            }
            
            if (top < margin) {
                top = y + 20;
            }
            
            left = Math.max(margin, Math.min(left, viewportWidth - rect.width - margin));
            top = Math.max(margin, Math.min(top, viewportHeight - rect.height - margin));
            
            tooltip.style.left = left + window.scrollX + 'px';
            tooltip.style.top = top + window.scrollY + 'px';
        });
    }

    // Hide tooltip
    function hideTooltip() {
        if (tooltip) {
            tooltip.classList.remove('show');
            setTimeout(() => {
                if (tooltip && !tooltip.classList.contains('show')) {
                    tooltip.style.display = 'none';
                    clearDOMCache();
                }
            }, 300);
        }
    }

    // Reload translation content when language changes
    async function reloadTranslationContent() {
        const translationSlider = domCache.translationSlider || tooltip?.querySelector('.translation-slider');
        if (!translationSlider) return;
        
        translationSlider.innerHTML = '<div class="content-page"><div class="translation-content loading">Loading...</div></div>';
        
        const container = tooltip.querySelector('.translation-section .content-container');
        if (container) smoothHeightTransition(container, 80, true);
        
        try {
            const response = await browser.runtime.sendMessage({
                action: 'fetchTranslation',
                text: currentSelection,
                sourceLanguage: sourceLanguage,
                targetLanguage: targetLanguage
            });
            
            if (response.success) {
                translationData = response.data;
                displayTranslationData(response.data);
                currentTranslationPage = 0;
                updateTranslationSlider(true);
                
                setTimeout(() => {
                    setContainerHeightFromCache('translation', false);
                }, 150);
            } else {
                displayTranslationError('Translation not available');
            }
        } catch (error) {
            console.log('Translation reload failed:', error);
            displayTranslationError('Connection error - please try again');
        }
    }

    // Cleanup function
    function cleanup() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
            resizeTimeout = null;
        }
        
        clearDOMCache();
        
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
        if (triggerIcon) {
            triggerIcon.remove();
            triggerIcon = null;
        }
    }
    
    window.addEventListener('beforeunload', cleanup);

    // Initialize the extension
    init();

    console.log('WordGlance extension loaded! Select text and click the 📖 icon to see definitions and translations.');
})();
