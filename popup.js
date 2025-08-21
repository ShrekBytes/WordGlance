// Popup script for WordGlance extension settings
// Handles the settings popup interface

// Language definitions (same as content script)
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

// Current settings
let currentSettings = {
    targetLanguage: 'bn',
    sourceLanguage: 'auto',
    isDarkMode: false,
    totalWordsLearned: 0
};

// Initialize popup
document.addEventListener('DOMContentLoaded', async function() {
    await loadSettings();
    setupEventListeners();
    updateCacheInfo();
});

// Load settings from background script
async function loadSettings() {
    try {
        const response = await browser.runtime.sendMessage({ action: 'getSettings' });
        if (response.success) {
            currentSettings = response.settings;
            updateUI();
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
        showStatus('Failed to load settings', 'error');
    }
}

// Update UI with current settings
function updateUI() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.checked = currentSettings.isDarkMode;
    updateDarkMode();
    
    // Language selectors
    updateLanguageSelector('source', currentSettings.sourceLanguage);
    updateLanguageSelector('target', currentSettings.targetLanguage);
    
    // Words learned counter
    const usageNumber = document.getElementById('usage-number');
    usageNumber.textContent = currentSettings.totalWordsLearned;
    
    // Generate language options
    generateLanguageOptions();
}

// Update dark mode
function updateDarkMode() {
    if (currentSettings.isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Update language selector display
function updateLanguageSelector(type, languageCode) {
    const selector = document.getElementById(`${type}-language-selector`);
    const languageText = selector.querySelector('.language-text');
    languageText.textContent = getLanguageName(languageCode);
}

// Get language name for display
function getLanguageName(code) {
    return LANGUAGES[code] || code.toUpperCase();
}

// Generate language options for dropdowns
function generateLanguageOptions() {
    generateSourceLanguageOptions();
    generateTargetLanguageOptions();
}

function generateSourceLanguageOptions() {
    const optionsContainer = document.getElementById('source-language-options');
    optionsContainer.innerHTML = '';
    
    Object.entries(LANGUAGES).forEach(([code, name]) => {
        const option = document.createElement('div');
        option.className = `language-option ${code === currentSettings.sourceLanguage ? 'selected' : ''}`;
        option.dataset.code = code;
        option.textContent = name;
        optionsContainer.appendChild(option);
    });
}

function generateTargetLanguageOptions() {
    const optionsContainer = document.getElementById('target-language-options');
    optionsContainer.innerHTML = '';
    
    // Exclude 'auto' from target languages
    Object.entries(LANGUAGES)
        .filter(([code]) => code !== 'auto')
        .forEach(([code, name]) => {
            const option = document.createElement('div');
            option.className = `language-option ${code === currentSettings.targetLanguage ? 'selected' : ''}`;
            option.dataset.code = code;
            option.textContent = name;
            optionsContainer.appendChild(option);
        });
}

// Setup event listeners
function setupEventListeners() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', async (e) => {
        currentSettings.isDarkMode = e.target.checked;
        updateDarkMode();
        await saveSettings();
    });
    
    // Language selectors
    setupLanguageSelector('source');
    setupLanguageSelector('target');
    
    // Clear cache button
    const clearCacheBtn = document.getElementById('clear-cache-btn');
    clearCacheBtn.addEventListener('click', clearCache);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            closeAllDropdowns();
        }
    });
}

function setupLanguageSelector(type) {
    const prefix = type === 'source' ? 'source-' : 'target-';
    const languageSelector = document.getElementById(`${prefix}language-selector`);
    const languageDropdown = document.getElementById(`${prefix}language-dropdown`);
    const languageSearch = document.getElementById(`${prefix}language-search`);
    const languageOptions = document.getElementById(`${prefix}language-options`);
    
    languageSelector.addEventListener('click', (e) => {
        if (!languageDropdown.contains(e.target)) {
            // Close other dropdown first
            const otherPrefix = type === 'source' ? 'target-' : 'source-';
            const otherDropdown = document.getElementById(`${otherPrefix}language-dropdown`);
            if (otherDropdown) {
                otherDropdown.classList.remove('open');
                const otherSearch = document.getElementById(`${otherPrefix}language-search`);
                if (otherSearch) otherSearch.value = '';
                resetLanguageOptions(otherPrefix.replace('-', ''));
            }
            
            languageDropdown.classList.toggle('open');
            if (languageDropdown.classList.contains('open')) {
                setTimeout(() => languageSearch.focus(), 50);
            }
        }
    });
    
    // Language search functionality
    languageSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const options = languageOptions.querySelectorAll('.language-option');
        
        options.forEach(option => {
            const languageName = option.textContent.toLowerCase();
            const languageCode = option.dataset.code.toLowerCase();
            
            if (languageName.includes(searchTerm) || languageCode.includes(searchTerm)) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    });
    
    // Prevent dropdown from closing when clicking inside it
    languageDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Language option selection
    languageOptions.addEventListener('click', async (e) => {
        if (e.target.classList.contains('language-option')) {
            const newLanguage = e.target.dataset.code;
            const currentLanguage = type === 'source' ? currentSettings.sourceLanguage : currentSettings.targetLanguage;
            
            if (newLanguage !== currentLanguage) {
                // Update settings
                if (type === 'source') {
                    currentSettings.sourceLanguage = newLanguage;
                } else {
                    currentSettings.targetLanguage = newLanguage;
                }
                
                // Update UI
                updateLanguageSelector(type, newLanguage);
                
                // Update selected state
                languageOptions.querySelectorAll('.language-option').forEach(opt => 
                    opt.classList.remove('selected'));
                e.target.classList.add('selected');
                
                // Save settings
                await saveSettings();
            }
            
            // Clear search and close dropdown
            languageSearch.value = '';
            resetLanguageOptions(type);
            languageDropdown.classList.remove('open');
        }
    });
    
    // Handle Escape key
    languageSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            languageDropdown.classList.remove('open');
            languageSearch.value = '';
            resetLanguageOptions(type);
        }
    });
}

function resetLanguageOptions(type) {
    const optionsContainer = document.getElementById(`${type}-language-options`);
    const options = optionsContainer.querySelectorAll('.language-option');
    options.forEach(opt => opt.style.display = 'block');
}

function closeAllDropdowns() {
    document.querySelectorAll('.language-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
    });
    document.querySelectorAll('.language-search').forEach(search => {
        search.value = '';
    });
    resetLanguageOptions('source');
    resetLanguageOptions('target');
}

// Save settings to background script
async function saveSettings() {
    try {
        const settingsToSave = {
            'wordglance-target-language': currentSettings.targetLanguage,
            'wordglance-source-language': currentSettings.sourceLanguage,
            'wordglance-dark-mode': currentSettings.isDarkMode
        };
        
        const response = await browser.runtime.sendMessage({
            action: 'updateSettings',
            settings: settingsToSave
        });
        
        if (response.success) {
            // Notify all content scripts about the settings change
            const tabs = await browser.tabs.query({});
            for (const tab of tabs) {
                try {
                    await browser.tabs.sendMessage(tab.id, {
                        action: 'settingsChanged',
                        settings: currentSettings
                    });
                } catch (error) {
                    // Ignore errors for tabs that don't have content script
                }
            }
            
            showStatus('Settings saved successfully', 'success');
        } else {
            showStatus('Failed to save settings', 'error');
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        showStatus('Failed to save settings', 'error');
    }
}

// Update cache info
async function updateCacheInfo() {
    try {
        const response = await browser.runtime.sendMessage({ action: 'getCacheInfo' });
        if (response.success) {
            const cacheInfo = document.getElementById('cache-info');
            const totalItems = response.cacheInfo.definitionsCount + response.cacheInfo.translationsCount;
            cacheInfo.textContent = `${totalItems} items`;
        }
    } catch (error) {
        console.error('Failed to get cache info:', error);
        const cacheInfo = document.getElementById('cache-info');
        cacheInfo.textContent = 'Error loading cache info';
    }
}

// Clear cache
async function clearCache() {
    const confirmed = confirm('Are you sure you want to clear all cached data and reset word counter?\n\nThis will delete:\n• All cached definitions and translations\n• Words learned counter\n\nThis action cannot be undone.');
    
    if (confirmed) {
        try {
            const response = await browser.runtime.sendMessage({ action: 'clearCache' });
            if (response.success) {
                // Update UI
                currentSettings.totalWordsLearned = 0;
                const usageNumber = document.getElementById('usage-number');
                usageNumber.textContent = '0';
                
                updateCacheInfo();
                showStatus('Cache cleared successfully', 'success');
            } else {
                showStatus('Failed to clear cache', 'error');
            }
        } catch (error) {
            console.error('Error clearing cache:', error);
            showStatus('Failed to clear cache', 'error');
        }
    }
}

// Show status message
function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    
    // Hide after 3 seconds
    setTimeout(() => {
        statusMessage.style.display = 'none';
        statusMessage.className = 'status-message';
    }, 3000);
}
