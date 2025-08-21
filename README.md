# WordGlance 📖

Get instant dictionary definitions and translations for any text on any website! Just select text and click the book icon.

[![Install from GreasyFork](https://img.shields.io/badge/Install-GreasyFork-orange.svg)](https://greasyfork.org/scripts/wordglance)
[![Install Direct](https://img.shields.io/badge/Install-Direct-blue.svg)](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/ShrekBytes/WordGlance)

## ✨ What it does

- **📚 Dictionary**: Get definitions, examples, synonyms and antonyms
- **🌍 Translation**: Translate to 40+ languages instantly  
- **⚡ Fast**: Smart caching for instant results
- **🎨 Beautiful**: Clean interface with dark mode
- **🔧 Customizable**: Choose your languages and preferences

## 🚀 How to install

### Step 1: Get a userscript manager
Install **Tampermonkey** (it's free!):
- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 
- [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- [Safari](https://apps.apple.com/app/tampermonkey/id1482490089)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### Step 2: Install WordGlance
**Option 1 (Recommended):** [Install from GreasyFork](https://greasyfork.org/scripts/wordglance) *(link will be updated)*

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
4. **Adjust settings** - Right-click Tampermonkey icon → WordGlance Settings

### 💡 Tips
- Works best with **single words** for definitions
- Great for **short phrases** for translations  
- Supports **40+ languages** including Spanish, French, German, Chinese, Japanese, Arabic, and more

## ⚙️ Settings

Click the settings gear to customize:

- **🌙 Dark Mode** - Easy on the eyes for night browsing
- **🌍 Languages** - Choose source and target languages
- **🗂️ Cache** - Clear stored data if needed

### Popular language combinations:
- English → Spanish (`en` → `es`)
- English → French (`en` → `fr`) 
- Auto-detect → Chinese (`auto` → `zh`)
- Any language → English (`auto` → `en`)

## 🌍 Supported languages

**Major languages:** English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Bengali

**All 40+ languages:** English, Spanish, French, German, Italian, Portuguese, Russian, Dutch, Swedish, Danish, Norwegian, Finnish, Polish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian, Greek, Hebrew, Japanese, Korean, Chinese, Arabic, Hindi, Bengali, Turkish, Thai, Vietnamese, Indonesian, Malay, Filipino, Swahili, Amharic, Zulu

## ❓ Common questions

**Q: Is it free?**  
A: Yes! Completely free and no ads.

**Q: Do I need to create an account?**  
A: Nope! Works instantly after installation.

**Q: Does it work on mobile?**  
A: Designed for desktop browsers. Mobile support depends on your browser.

**Q: Is my data safe?**  
A: Yes! Everything stays in your browser. No data is sent to us.

**Q: Why isn't it working?**  
A: Make sure Tampermonkey is installed and enabled. Try refreshing the page.

**Q: Can I customize it?**  
A: Yes! Access settings through Tampermonkey or modify the code directly.

**Q: The translation seems wrong?**  
A: Try using "Auto-detect" for source language, or select specific languages in settings.

---

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

### Contributing
1. Fork the repo
2. Make your changes
3. Test thoroughly  
4. Submit a pull request

### Issues & Support
- 🐛 [Report bugs](https://github.com/ShrekBytes/WordGlance/issues)
- 💡 [Request features](https://github.com/ShrekBytes/WordGlance/issues)
- 📖 [View source code](https://github.com/ShrekBytes/WordGlance)

## 📄 License

Open source under [GPL-3.0 License](LICENSE). Free to use, modify, and share!

---

**Made with ❤️ by [ShrekBytes](https://github.com/ShrekBytes)**

*Love WordGlance? Give it a ⭐ star on GitHub!*
