// Background script for WordGlance extension
// Handles shared cache, API requests, and cross-tab communication

// Configuration - matches userscript
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

// Shared cache system - accessible by all tabs
const cache = {
    definitions: new Map(),
    translations: new Map()
};

// Track active requests to prevent duplicates
const activeRequests = new Map();

// Standardized error messages
const ERROR_MESSAGES = {
    NO_DEFINITION: 'Definition not found',
    NO_TRANSLATION: 'Translation not available',
    NETWORK_ERROR: 'Connection error - please try again',
    API_TIMEOUT: 'Request timed out - please try again',
    PARSE_ERROR: 'Unable to process response',
    INVALID_INPUT: 'Please select a valid word or phrase',
    LANGUAGE_ERROR: 'Language not supported'
};

// Language definitions
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

// Helper function to create standardized error display
function createErrorMessage(errorType, details = '') {
    const baseMessage = ERROR_MESSAGES[errorType] || 'Unknown error';
    return details ? `${baseMessage}: ${details}` : baseMessage;
}

// Load cache from storage
async function loadCache() {
    try {
        const result = await browser.storage.local.get(['wordglance-cache-definitions', 'wordglance-cache-translations']);
        
        const cachedDefinitions = result['wordglance-cache-definitions'] || '{}';
        const cachedTranslations = result['wordglance-cache-translations'] || '{}';
        
        const defData = JSON.parse(cachedDefinitions);
        const transData = JSON.parse(cachedTranslations);
        
        // Convert back to Map
        Object.entries(defData).forEach(([key, value]) => {
            cache.definitions.set(key, value);
        });
        
        Object.entries(transData).forEach(([key, value]) => {
            cache.translations.set(key, value);
        });
    } catch (e) {
        console.log('Failed to load cache:', e);
        // Clear corrupted cache
        await browser.storage.local.set({
            'wordglance-cache-definitions': '{}',
            'wordglance-cache-translations': '{}'
        });
    }
}

// Save cache to storage
async function saveCache() {
    try {
        const defObj = Object.fromEntries(cache.definitions);
        const transObj = Object.fromEntries(cache.translations);
        
        await browser.storage.local.set({
            'wordglance-cache-definitions': JSON.stringify(defObj),
            'wordglance-cache-translations': JSON.stringify(transObj)
        });
    } catch (e) {
        console.log('Failed to save cache:', e);
    }
}

// Add to cache with LRU behavior
function addToCache(type, word, data, sourceLanguage, targetLanguage) {
    const targetCache = cache[type];
    const cacheKey = type === 'translations' ? `${word}-${sourceLanguage}-${targetLanguage}` : word.toLowerCase();
    
    // Remove if already exists (to update position)
    if (targetCache.has(cacheKey)) {
        targetCache.delete(cacheKey);
    }
    
    // Add to front
    targetCache.set(cacheKey, data);
    
    // Remove oldest if cache exceeds limit
    if (targetCache.size > CONFIG.cacheSize) {
        const firstKey = targetCache.keys().next().value;
        targetCache.delete(firstKey);
    }
    
    // Save cache
    saveCache();
}

// Get from cache
function getFromCache(type, word, sourceLanguage, targetLanguage) {
    const targetCache = cache[type];
    const cacheKey = type === 'translations' ? `${word}-${sourceLanguage}-${targetLanguage}` : word.toLowerCase();
    
    if (targetCache.has(cacheKey)) {
        // Move to front (most recently used)
        const data = targetCache.get(cacheKey);
        targetCache.delete(cacheKey);
        targetCache.set(cacheKey, data);
        return data;
    }
    
    return null;
}

// Fetch definition from Free Dictionary API
async function fetchDefinition(word) {
    // Check cache first
    const cached = getFromCache('definitions', word);
    if (cached) {
        return cached;
    }
    
    // Check if request is already in progress
    const requestKey = `def-${word}`;
    if (activeRequests.has(requestKey)) {
        return activeRequests.get(requestKey);
    }
    
    const promise = new Promise((resolve, reject) => {
        // Create AbortController for timeout (compatible across Firefox versions)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            reject(createErrorMessage('API_TIMEOUT'));
        }, CONFIG.apiTimeout);
        
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
            signal: controller.signal
        })
        .then(async response => {
            clearTimeout(timeoutId);
            
            if (response.status === 404) {
                reject(createErrorMessage('NO_DEFINITION'));
                return;
            } else if (!response.ok) {
                reject(createErrorMessage('NETWORK_ERROR'));
                return;
            }
            
            const data = await response.json();
            if (!data || !Array.isArray(data) || data.length === 0) {
                reject(createErrorMessage('NO_DEFINITION'));
                return;
            }
            
            const entry = data[0];
            if (!entry || !entry.meanings || !Array.isArray(entry.meanings) || entry.meanings.length === 0) {
                reject(createErrorMessage('NO_DEFINITION'));
                return;
            }
            
            // Process definitions (same logic as userscript)
            const definitions = [];
            let allSynonyms = [];
            let allAntonyms = [];
            
            for (const meaning of entry.meanings) {
                if (definitions.length >= CONFIG.maxDefinitions) break;
                
                const meaningSynonyms = meaning.synonyms || [];
                const meaningAntonyms = meaning.antonyms || [];
                allSynonyms.push(...meaningSynonyms);
                allAntonyms.push(...meaningAntonyms);
                
                for (const definition of meaning.definitions) {
                    if (definitions.length >= CONFIG.maxDefinitions) break;
                    
                    const definitionSynonyms = definition.synonyms || [];
                    const definitionAntonyms = definition.antonyms || [];
                    allSynonyms.push(...definitionSynonyms);
                    allAntonyms.push(...definitionAntonyms);
                    
                    definitions.push({
                        partOfSpeech: meaning.partOfSpeech,
                        definition: definition.definition,
                        example: definition.example
                    });
                }
            }
            
            const uniqueSynonyms = [...new Set(allSynonyms)].slice(0, CONFIG.maxSynonyms);
            const uniqueAntonyms = [...new Set(allAntonyms)].slice(0, CONFIG.maxAntonyms);
            
            // Group definitions into pages
            const pages = [];
            for (let i = 0; i < definitions.length; i += CONFIG.definitionsPerPage) {
                const pageDefinitions = definitions.slice(i, i + CONFIG.definitionsPerPage);
                pages.push(pageDefinitions);
            }
            
            const result = { 
                pages: pages,
                synonyms: uniqueSynonyms,
                antonyms: uniqueAntonyms
            };
            
            // Cache the result (fix: don't pass undefined parameters)
            addToCache('definitions', word, result);
            
            resolve(result);
        })
        .catch(error => {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                reject(createErrorMessage('API_TIMEOUT'));
            } else {
                console.log('Definition fetch error:', error);
                reject(createErrorMessage('NETWORK_ERROR'));
            }
        });
    });
    
    activeRequests.set(requestKey, promise);
    
    try {
        const result = await promise;
        activeRequests.delete(requestKey);
        return result;
    } catch (error) {
        activeRequests.delete(requestKey);
        throw error;
    }
}

// Fetch translation from Free Translate API
async function fetchTranslation(text, sourceLanguage, targetLanguage) {
    // Check cache first
    const cached = getFromCache('translations', text, sourceLanguage, targetLanguage);
    if (cached) {
        return cached;
    }
    
    // Check if request is already in progress
    const requestKey = `trans-${text}-${sourceLanguage}-${targetLanguage}`;
    if (activeRequests.has(requestKey)) {
        return activeRequests.get(requestKey);
    }
    
    const promise = new Promise((resolve, reject) => {
        // Build URL with source language parameter
        let url = `https://ftapi.pythonanywhere.com/translate?dl=${targetLanguage}&text=${encodeURIComponent(text)}`;
        if (sourceLanguage !== 'auto') {
            url += `&sl=${sourceLanguage}`;
        }
        
        // Create AbortController for timeout (compatible across Firefox versions)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            reject(createErrorMessage('API_TIMEOUT'));
        }, CONFIG.apiTimeout);
        
        fetch(url, {
            signal: controller.signal
        })
        .then(async response => {
            clearTimeout(timeoutId);
            
            if (response.status === 404) {
                reject(createErrorMessage('NO_TRANSLATION'));
                return;
            } else if (!response.ok) {
                reject(createErrorMessage('NETWORK_ERROR'));
                return;
            }
            
            const data = await response.json();
            if (data && data['destination-text']) {
                const translations = [];
                
                // Add primary translation
                translations.push(data['destination-text']);
                
                // Extract translations from all-translations array
                if (data.translations && data.translations['all-translations']) {
                    const allTranslations = data.translations['all-translations'];
                    
                    for (const translationGroup of allTranslations) {
                        if (Array.isArray(translationGroup) && translationGroup.length > 0) {
                            const mainTranslation = translationGroup[0];
                            
                            if (mainTranslation && 
                                mainTranslation !== data['destination-text'] && 
                                !translations.includes(mainTranslation)) {
                                translations.push(mainTranslation);
                            }
                            
                            if (translations.length >= CONFIG.maxTranslations) break;
                        }
                    }
                }
                
                // Add possible translations as fallback
                if (translations.length < CONFIG.maxTranslations && 
                    data.translations && data.translations['possible-translations']) {
                    const possibleTranslations = data.translations['possible-translations']
                        .filter(t => t && !translations.includes(t))
                        .slice(0, CONFIG.maxTranslations - translations.length);
                    translations.push(...possibleTranslations);
                }
                
                const limitedTranslations = translations.slice(0, CONFIG.maxTranslations);
                
                // Group translations into pages
                const pages = [];
                for (let i = 0; i < limitedTranslations.length; i += CONFIG.translationsPerPage) {
                    pages.push(limitedTranslations.slice(i, i + CONFIG.translationsPerPage));
                }
                
                const result = { pages: pages };
                
                // Cache the result
                addToCache('translations', text, result, sourceLanguage, targetLanguage);
                
                resolve(result);
            } else {
                if (data && data.error && data.error.includes('language')) {
                    reject(createErrorMessage('LANGUAGE_ERROR'));
                } else {
                    reject(createErrorMessage('NO_TRANSLATION'));
                }
            }
        })
        .catch(error => {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                reject(createErrorMessage('API_TIMEOUT'));
            } else {
                console.log('Translation fetch error:', error);
                reject(createErrorMessage('NETWORK_ERROR'));
            }
        });
    });
    
    activeRequests.set(requestKey, promise);
    
    try {
        const result = await promise;
        activeRequests.delete(requestKey);
        return result;
    } catch (error) {
        activeRequests.delete(requestKey);
        throw error;
    }
}

// Message handler for content script communication
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {
        try {
            switch (message.action) {
                case 'fetchDefinition':
                    const definitionResult = await fetchDefinition(message.word);
                    sendResponse({ success: true, data: definitionResult });
                    break;
                    
                case 'fetchTranslation':
                    const translationResult = await fetchTranslation(
                        message.text, 
                        message.sourceLanguage, 
                        message.targetLanguage
                    );
                    sendResponse({ success: true, data: translationResult });
                    break;
                    
                case 'incrementWordsLearned':
                    const result = await browser.storage.local.get(['wordglance-total-words-learned']);
                    const currentCount = result['wordglance-total-words-learned'] || 0;
                    const newCount = currentCount + 1;
                    await browser.storage.local.set({ 'wordglance-total-words-learned': newCount });
                    sendResponse({ success: true, count: newCount });
                    break;
                    
                case 'getSettings':
                    const settings = await browser.storage.local.get([
                        'wordglance-target-language',
                        'wordglance-source-language', 
                        'wordglance-dark-mode',
                        'wordglance-total-words-learned'
                    ]);
                    sendResponse({
                        success: true,
                        settings: {
                            targetLanguage: settings['wordglance-target-language'] || 'bn',
                            sourceLanguage: settings['wordglance-source-language'] || 'auto',
                            isDarkMode: settings['wordglance-dark-mode'] || false,
                            totalWordsLearned: settings['wordglance-total-words-learned'] || 0
                        }
                    });
                    break;
                    
                case 'updateSettings':
                    await browser.storage.local.set(message.settings);
                    sendResponse({ success: true });
                    break;
                    
                case 'clearCache':
                    cache.definitions.clear();
                    cache.translations.clear();
                    await browser.storage.local.set({
                        'wordglance-cache-definitions': '{}',
                        'wordglance-cache-translations': '{}',
                        'wordglance-total-words-learned': 0
                    });
                    sendResponse({ success: true });
                    break;
                    
                case 'getCacheInfo':
                    sendResponse({
                        success: true,
                        cacheInfo: {
                            definitionsCount: cache.definitions.size,
                            translationsCount: cache.translations.size
                        }
                    });
                    break;
                    
                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            console.error('Background script error:', error);
            sendResponse({ success: false, error: error.message || 'Unknown error' });
        }
    })();
    
    // Return true to indicate we'll send response asynchronously
    return true;
});

// Initialize cache on startup
loadCache();
