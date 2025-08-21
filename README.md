# WordGlance 📖

Get instant dictionary definitions and translations for any text on any website! Just select text and click the book icon.

[![Install from GreasyFork](https://img.shields.io/badge/Install-GreasyFork-orange.svg)](https://greasyfork.org/scripts/wordglance)
[![Install Direct](https://img.shields.io/badge/Install-Direct-blue.svg)](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/ShrekBytes/WordGlance)

![sample](/screenshots/dark.png)

## 📋 Table of Contents

- [✨ What it does](#-what-it-does)
- [🚀 How to install](#-how-to-install)
- [📱 How to use](#-how-to-use)
- [⚙️ Settings](#️-settings)
- [🌍 Supported languages](#-supported-languages)
- [❓ Common questions](#-common-questions)
- [👨‍💻 For developers](#-for-developers)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ What it does

- **📚 Dictionary**: Get definitions, examples, synonyms and antonyms
- **🌍 Translation**: Translate to 40+ languages instantly  
- **⚡ Fast**: Smart caching for instant results
- **🎨 Beautiful**: Clean interface with dark mode
- **🔧 Customizable**: Choose your languages and preferences

## 🚀 How to install

### Step 1: Get a userscript manager
Install **Violentmonkey** (recommended, it's free!):
- [Chrome](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) 
- [Firefox](https://addons.mozilla.org/firefox/addon/violentmonkey/)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)

**Alternative options:**
- **Tampermonkey**: [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/) | [Safari](https://apps.apple.com/app/tampermonkey/id1482490089) | [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- **ScriptCat**: [Chrome](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) | [Firefox](https://addons.mozilla.org/firefox/addon/scriptcat/) | [Edge](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh)

### Step 2: Install WordGlance
**Option 1 (Recommended):** [Install from GreasyFork](https://greasyfork.org/scripts/wordglance)

**Option 2:** [Install directly](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)

### Step 3: Test it!
1. Go to any website
2. Select some text 
3. Click the 📖 icon that appears
4. Enjoy instant definitions and translations!

## 📱 How to use

1. **Select text** - Highlight any word or phrase
2. **Click the 📖 icon** - It appears near your selection  
3. **Browse results** - Use arrows to see more definitions/translations
4. **Adjust settings** - Right-click your userscript manager icon → WordGlance Settings

![button](/screenshots/button.png)
![light](/screenshots/light.png)
![dark](/screenshots/dark.png)

### 💡 Tips
- Works best with **single words** for definitions
- Great for **short phrases** for translations  
- Supports **40+ languages** including Spanish, French, German, Chinese, Japanese, Arabic, and more

## ⚙️ Settings

Click the settings gear to customize:

- **🌙 Dark Mode** - Easy on the eyes for night browsing
- **🌍 Languages** - Choose source and target languages
- **🗂️ Cache** - Clear stored data if needed

![settings dark](/screenshots/settings_dark.png)
![settings dark](/screenshots/settings_light.png)

### Popular language combinations:
- English → Spanish (`en` → `es`)
- English → French (`en` → `fr`) 
- Auto-detect → Chinese (`auto` → `zh`)
- Any language → English (`auto` → `en`)

## 🌍 Supported languages

**Major languages:** Arabic, Bengali, Chinese, English, French, German, Hindi, Italian, Japanese, Korean, Portuguese, Russian, Spanish

**All 40+ languages (A-Z):** Amharic, Arabic, Bengali, Bulgarian, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Filipino, Finnish, French, German, Greek, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Latvian, Lithuanian, Malay, Norwegian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Thai, Turkish, Ukrainian, Vietnamese, Zulu

## ❓ Common questions

**Q: Is it free?**  
A: Yes! Completely free and no ads.

**Q: Do I need to create an account?**  
A: Nope! Works instantly after installation.

**Q: Does it work on mobile?**  
A: Yes it works flawlessly on both desktop and mobile.

**Q: Is my data safe?**  
A: Yes! Everything stays in your browser. No data is sent to us, and the script is open source so you can inspect the code if you want to verify.

**Q: Why isn't it working?**  
A: Make sure your userscript manager (Violentmonkey/Tampermonkey) is installed and enabled and the script is also enabled. Try refreshing the page.

**Q: The translation seems wrong?**  
A: Try using "Auto-detect" for source language, or select specific languages in settings.

**Q: Does it work on all websites?**  
A: Yes! WordGlance works on any website where you can select text.

**Q: How do I change the target language?**  
A: Right-click your userscript manager icon → WordGlance Settings → Choose your language.

**Q: Why do some words show "No definition found"?**  
A: Very new words, slang, or technical terms might not be in the dictionary. Try synonyms or simpler terms.

**Q: Does it slow down my browser?**  
A: No! WordGlance is lightweight and only activates when you select text.

**Q: Can I translate entire sentences?**  
A: Yes, but it works best with 1-5 words. For longer text, use dedicated translation tools.

**Q: How do I disable it temporarily?**  
A: Click your userscript manager icon → Toggle WordGlance off/on.

**Q: Does it work offline?**  
A: No, it needs internet to fetch definitions and translations from online APIs.

**Have a question, suggestion, or found a bug?** [Open an issue](https://github.com/ShrekBytes/WordGlance/issues) on GitHub and we'll help you out!


## 👨‍💻 For developers

### Configuration
Modify the `CONFIG` object for advanced customization:
```javascript
const CONFIG = {
    debounceTime: 150,        // API call delay (ms)
    maxDefinitions: 9,        // Max definitions to show  
    maxTranslations: 8,       // Max translations to show
    cacheSize: 100,          // Cache size limit
    apiTimeout: 10000        // Request timeout (ms)
};
```

### APIs used
- **Dictionary**: [Dictionary API](https://dictionaryapi.dev/) - Free English dictionary
- **Translation**: [Free Translate API](https://ftapi.pythonanywhere.com/) - Multi-language translation

*Special thanks to these amazing free APIs that make WordGlance possible!*

## 🤝 Contributing

Found a bug? Want a feature? [Open an issue](https://github.com/ShrekBytes/WordGlance/issues) or submit a pull request!

##

> **💡 Why not a browser extension and will there be one in the future?**
> 
> **No, there will never be a browser extension version.** WordGlance is intentionally built as a userscript because userscripts are simply better:
> - **⚡ Lighter & Faster** - No bloated extension overhead
> - **🌐 Cross-platform** - Works on Chrome, Firefox, Safari, Edge with the same code
> - **🔧 Easy to manage** - Update instantly, customize easily, no store approval delays
> - **🔒 More secure** - You can inspect the code, no hidden tracking
> - **📱 Universal** - One script works everywhere instead of separate extensions

*Love WordGlance? Give it a ⭐ star on GitHub!*

## 📄 License

Open source under [GPL-3.0 License](LICENSE)