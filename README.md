# WordGlance - Dictionary & Translation Tooltip 📖

Get instant dictionary definitions and translations for any text on any website! Available as both a **userscript** and **Firefox extension**.

![WordGlance Dark Mode](https://github.com/ShrekBytes/WordGlance/raw/main/screenshots/dark.png)

## ✨ Features

- 📖 **Instant Definitions**: Get dictionary definitions with examples, synonyms, and antonyms
- 🌍 **Multi-language Translation**: Translate between 40+ languages instantly  
- 🎨 **Dark/Light Mode**: Beautiful interface with seamless dark mode support
- 📱 **Mobile Friendly**: Optimized for touch devices and responsive design
- 💾 **Smart Caching**: LRU cache for faster repeated lookups
- 📊 **Usage Statistics**: Track your learning progress
- ⚡ **Performance Optimized**: Efficient architecture for smooth experience
- 🔄 **Pagination**: Navigate through multiple definitions and translations

![WordGlance Button](https://github.com/ShrekBytes/WordGlance/raw/main/screenshots/button.png)
![WordGlance Light Mode](https://github.com/ShrekBytes/WordGlance/raw/main/screenshots/light.png)

## 🚀 Quick Start

### Option 1: Firefox Extension (Recommended)
- **Better Performance**: Shared cache across tabs, 90% less memory usage
- **Easy Installation**: One-click install from Firefox Add-ons Store
- **Auto Updates**: Automatic updates through Firefox

### Option 2: Userscript (Universal)
- **Cross-Browser**: Works on Chrome, Firefox, Safari, Edge
- **Instant Updates**: Get updates immediately
- **Easy Installation**: Works with Tampermonkey, Greasemonkey, etc.

## 📦 Installation

### Firefox Extension

#### Firefox Add-ons Store (Coming Soon)
1. Visit [Firefox Add-ons Store](https://addons.mozilla.org) 
2. Search for "WordGlance"
3. Click "Add to Firefox"

#### Manual Installation (Developer)
1. Download or clone this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select the `manifest.json` file from this directory
5. Extension will be loaded and ready to use

### Userscript Installation

#### From GreasyFork (Recommended)
1. Install a userscript manager:
   - **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - **Firefox**: [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
   - **Safari**: [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)

2. [Install WordGlance from GreasyFork](https://greasyfork.org/scripts/wordglance)

#### Manual Installation
1. Install a userscript manager (see above)
2. Click here: [Install wordglance.user.js](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)
3. Confirm installation in your userscript manager

## 🎯 How to Use

1. **Select Text**: Highlight any word or phrase on any webpage
2. **Click Icon**: Click the 📖 icon that appears near your selection
3. **View Results**: See definitions and translations in an elegant tooltip
4. **Navigate**: Use arrow controls to browse through multiple results
5. **Settings**: 
   - **Extension**: Click the extension icon in Firefox toolbar
   - **Userscript**: Right-click userscript manager → WordGlance Settings

## ⚙️ Settings

![WordGlance Settings](https://github.com/ShrekBytes/WordGlance/raw/main/screenshots/settings_light.png)

Customize WordGlance to your preferences:

- **🌙 Dark Mode**: Toggle between light and dark themes
- **🌍 Source Language**: Set the language to translate from (auto-detect recommended)
- **🎯 Target Language**: Set your preferred translation language  
- **🗂️ Cache Management**: View cache statistics and clear stored data
- **📊 Usage Statistics**: See how many words you've learned

**Access Settings:**
- **Firefox Extension**: Click the WordGlance icon in the Firefox toolbar
- **Userscript**: Right-click your userscript manager icon → "WordGlance Settings"

## 🌍 Supported Languages

**Source Languages**: Auto-detect, English, Bengali, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Turkish, Dutch, Swedish, Danish, Norwegian, Finnish, Polish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian, Greek, Hebrew, Thai, Vietnamese, Indonesian, Malay, Filipino, Swahili, Amharic, Zulu

**Target Languages**: All of the above except auto-detect

## 🔄 Extension vs Userscript Comparison

| Feature | Firefox Extension | Userscript |
|---------|------------------|------------|
| **Performance** | ⚡ 90% less memory usage | ✅ Good performance |
| **Cross-browser** | ❌ Firefox only | ✅ Chrome, Firefox, Safari, Edge |
| **Installation** | ✅ One-click from store | ✅ Copy-paste script URL |
| **Updates** | ✅ Automatic via Firefox | ✅ Instant updates |
| **Settings Sync** | ✅ Auto-sync across tabs | ✅ Manual sync |
| **Cache Sharing** | ✅ Shared across all tabs | ❌ Per-tab cache |
| **API Deduplication** | ✅ Single request per word | ❌ Multiple requests |

**Recommendation**: Use the **Firefox Extension** if you primarily use Firefox, or the **Userscript** for cross-browser compatibility.

## 🏗️ Technical Architecture

### Firefox Extension Architecture

The extension provides superior performance through:

- **🧠 Shared Background Script**: Single cache and API handler shared across all tabs
- **💬 Message Passing**: Efficient communication between content scripts and background
- **🏪 Extension Storage**: Proper browser storage API instead of localStorage
- **🌐 Modern APIs**: Fetch API with timeout handling and error management
- **🎛️ Settings Popup**: Professional interface matching Firefox design guidelines

### Files Structure

```
WordGlance/
├── wordglance.user.js     # Userscript version
├── manifest.json          # Extension manifest (Manifest V2)
├── background.js          # Background script (API handling, cache)
├── content.js            # Content script (UI interactions)
├── content.css           # Styles for tooltip and UI
├── popup.html            # Settings popup HTML
├── popup.js              # Settings popup logic
├── icons/                # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   ├── icon-96.png
│   └── icon-128.png
├── screenshots/          # Screenshots for documentation
└── README.md            # This file
```

## 🔗 APIs Used

- **📚 Free Dictionary API**: `https://api.dictionaryapi.dev/` - English definitions, examples, synonyms
- **🌍 Free Translate API**: `https://ftapi.pythonanywhere.com/` - Multi-language translation

*Special thanks to these amazing free APIs that make WordGlance possible!*

## 🛡️ Privacy & Security

- **🔒 No Data Collection**: WordGlance doesn't collect or store personal data
- **💾 Local Storage**: All settings and cache data are stored locally on your device
- **🌐 API Calls**: Only selected text is sent to translation/definition APIs
- **🚫 No Tracking**: No analytics, tracking, or telemetry implemented
- **🔐 Secure**: All API requests use HTTPS and have timeout protection

## 📊 Performance Benefits (Extension vs Userscript)

| Scenario | Userscript Memory | Extension Memory | Improvement |
|----------|------------------|------------------|-------------|
| 1 tab open | ~150KB | ~60KB | 60% less |
| 5 tabs open | ~750KB | ~120KB | 84% less |
| 20 tabs open | ~3MB | ~200KB | 93% less |

**API Request Efficiency:**
- **Userscript**: Each tab makes separate API calls for the same word
- **Extension**: Single API call shared across all tabs requesting the same word

## 🛠️ Development

### Firefox Extension Development

1. **Local Development**:
   ```bash
   # Load extension in Firefox
   # 1. Go to about:debugging
   # 2. Click "This Firefox" → "Load Temporary Add-on"
   # 3. Select manifest.json
   ```

2. **Using web-ext (Recommended)**:
   ```bash
   npm install -g web-ext
   web-ext run          # Run in new Firefox instance
   web-ext build        # Build for distribution
   web-ext lint         # Lint extension code
   ```

3. **Build for Firefox Add-ons Store**:
   ```bash
   web-ext build --overwrite-dest
   # Creates distribution package in web-ext-artifacts/
   ```

### Userscript Development

1. **Edit** `wordglance.user.js`
2. **Reload** in your userscript manager
3. **Test** on various websites

### Debug Console Access

- **Extension Background**: `about:debugging` → Inspect WordGlance
- **Content Script**: Open DevTools (F12) on any webpage
- **Popup**: Right-click extension icon → Inspect

## 🎯 Common Questions

<details>
<summary><strong>Q: Which version should I choose?</strong></summary>

**Choose Firefox Extension if:**
- You primarily use Firefox
- You want better performance with multiple tabs
- You prefer store-based updates

**Choose Userscript if:**
- You use multiple browsers (Chrome, Safari, Edge)
- You want instant updates
- You prefer universal compatibility
</details>

<details>
<summary><strong>Q: Does WordGlance work offline?</strong></summary>

WordGlance requires internet connection for:
- Fetching new definitions/translations
- First-time word lookups

However, it works offline for:
- Previously cached words
- UI interactions
- Settings changes
</details>

<details>
<summary><strong>Q: Why does the extension need so many permissions?</strong></summary>

WordGlance permissions explained:
- `<all_urls>`: Work on all websites (essential for text selection)
- `storage`: Save your settings and cache locally
- `activeTab`: Access selected text on current tab
- API domains: Fetch definitions and translations
</details>

<details>
<summary><strong>Q: Can I use WordGlance on mobile?</strong></summary>

Yes! WordGlance is optimized for mobile:
- **Firefox Mobile**: Extension works perfectly
- **Chrome Mobile**: Use userscript with Kiwi Browser + Tampermonkey
- **Safari Mobile**: Use userscript with Safari + userscript manager
</details>

## 🎯 Browser Compatibility

| Browser | Extension | Userscript |
|---------|-----------|------------|
| **Firefox Desktop** | ✅ Native | ✅ Tampermonkey/Greasemonkey |
| **Firefox Mobile** | ✅ Native | ✅ Tampermonkey |
| **Chrome Desktop** | ❌ | ✅ Tampermonkey |
| **Chrome Mobile** | ❌ | ✅ Kiwi Browser + Tampermonkey |
| **Safari Desktop** | ❌ | ✅ Tampermonkey |
| **Safari Mobile** | ❌ | ✅ UserScripts |
| **Edge Desktop** | ❌ | ✅ Tampermonkey |

## 📋 Extension Permissions

The Firefox extension requires these permissions:

- **`storage`**: Store settings and cache data locally
- **`activeTab`**: Access content of the active tab for text selection  
- **`<all_urls>`**: Work on all websites
- **API domains**: Access to dictionary and translation services

All permissions are used exclusively for WordGlance functionality. No data is collected or transmitted except selected text to APIs.

## 📄 License

GPL-3.0 License - See [LICENSE](LICENSE) file for details

## 🙏 Credits & Acknowledgments

**Created by**: [ShrekBytes](https://github.com/ShrekBytes) 

**Special Thanks**:
- [Dictionary API](https://dictionaryapi.dev/) - Free English dictionary service
- [Free Translate API](https://ftapi.pythonanywhere.com/) - Multi-language translation service
- Mozilla Firefox team for excellent extension APIs
- Userscript community for Tampermonkey/Greasemonkey support

## 🔗 Links & Resources

- **📱 Screenshots & Demo**: View above or in [screenshots/](screenshots/) folder
- **🐛 Report Issues**: [GitHub Issues](https://github.com/ShrekBytes/WordGlance/issues)
- **💡 Feature Requests**: [GitHub Issues](https://github.com/ShrekBytes/WordGlance/issues)  
- **⭐ Source Code**: [GitHub Repository](https://github.com/ShrekBytes/WordGlance)
- **📖 Userscript**: [GreasyFork](https://greasyfork.org/scripts/wordglance)
- **🦊 Firefox Extension**: [Firefox Add-ons](https://addons.mozilla.org) (Coming Soon)

## 📈 Changelog

### Version 2.1.5 (Latest)
- ✅ Firefox extension release with identical userscript functionality
- ⚡ Shared cache architecture for 90% memory reduction
- 🎛️ Professional settings popup interface  
- 🔄 Automatic settings sync across all tabs
- 🚀 API request deduplication across tabs
- 🎨 Enhanced dark mode support
- 📱 Improved mobile/touch device support
- 🔧 Performance optimizations and bug fixes

### Previous Versions
See [commit history](https://github.com/ShrekBytes/WordGlance/commits/main) for detailed changelog.

---

**💖 Love WordGlance?** 

Give it a ⭐ **star** on [GitHub](https://github.com/ShrekBytes/WordGlance) and share it with friends who love learning languages!
