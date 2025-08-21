# WordGlance 📖

**Instant dictionary definitions and translations for any text on the web**

Select any word or phrase on a webpage and get instant definitions, translations, synonyms, and examples - no typing required!

![WordGlance Demo](https://via.placeholder.com/600x300/3498db/white?text=Select+text+→+Click+📖+→+Get+instant+definitions)

## Table of Contents

- [What is WordGlance?](#what-is-wordglance)
- [Quick Start](#quick-start)
- [How to Use](#how-to-use)
- [Settings](#settings)
- [Supported Languages](#supported-languages)
- [FAQ](#faq)
- [For Developers](#for-developers)

## What is WordGlance?

WordGlance makes learning new words effortless. Instead of opening a dictionary app or Google Translate, just:

1. **Select** any word or phrase on any website
2. **Click** the 📖 icon that appears
3. **Get** instant definitions, translations, and examples

Perfect for:
- 📚 Students learning new vocabulary
- 🌍 Reading foreign websites or documents
- 📖 Book lovers discovering new words
- 💼 Professionals encountering technical terms

## Quick Start

### Install in 30 seconds:

1. **Get Tampermonkey** (if you don't have it):
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) • [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/) • [Safari](https://apps.apple.com/app/tampermonkey/id1482490089) • [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. **Install WordGlance**:
   - [**Click here to install →**](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)

3. **Test it**:
   - Select this word: **serendipity**
   - Click the 📖 icon
   - Enjoy your instant definition!

## How to Use

### Basic Usage
- **Select text**: Highlight any word or phrase (up to 5 words)
- **Click 📖**: The book icon appears near your selection
- **Read results**: See definitions, translations, synonyms, and examples
- **Navigate**: Use ← → arrows for multiple definitions/translations

### What You Get
- **📖 Definitions**: Clear explanations with examples
- **🔄 Translations**: 40+ languages supported
- **📝 Synonyms & Antonyms**: Expand your vocabulary
- **🎯 Examples**: See words used in context
- **🌙 Dark Mode**: Easy on your eyes

## Settings

Access settings: Right-click Tampermonkey icon → WordGlance Settings

| Setting | What it does | 
|---------|--------------|
| **Dark Mode** | Switch between light and dark themes |
| **From Language** | Language to translate from (auto-detect recommended) |
| **To Language** | Your preferred translation language |
| **Clear Cache** | Remove stored definitions to free up space |

## Supported Languages

WordGlance translates between 40+ languages:

**Popular languages**: English, Spanish, French, German, Chinese, Japanese, Arabic, Russian, Portuguese, Italian, Korean, Hindi, Bengali

**Full list**: Auto-detect, English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Bengali, Turkish, Dutch, Swedish, Danish, Norwegian, Finnish, Polish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian, Greek, Hebrew, Thai, Vietnamese, Indonesian, Malay, Filipino, Swahili, Amharic, Zulu

*Note: Dictionary definitions are in English*

## FAQ

### Getting Started

**Q: Is it really free?**  
A: Yes! Completely free, no accounts needed.

**Q: Will it slow down my browser?**  
A: No, WordGlance is lightweight and only works when you select text.

**Q: Does it work on all websites?**  
A: Yes, it works on any website where you can select text.

### Using WordGlance

**Q: What text can I select?**  
A: Any words or short phrases (up to 5 words, 100 characters max).

**Q: Why can't I select certain text?**  
A: WordGlance filters out numbers-only, special characters, and very long selections.

**Q: How accurate are translations?**  
A: Very good for common words and phrases. For complex text, use dedicated translation tools.

**Q: Can I translate entire paragraphs?**  
A: WordGlance is designed for words and short phrases for the best experience.

### Technical Questions

**Q: Does it store my data?**  
A: WordGlance only stores definitions locally in your browser for faster loading. No personal data is collected.

**Q: What if a website blocks it?**  
A: Very rare, but some sites with strict security might block userscripts.

**Q: Can I use it offline?**  
A: No, it needs internet to fetch definitions and translations.

### Problems?

**Q: The 📖 icon doesn't appear**  
A: Make sure Tampermonkey is enabled and try refreshing the page.

**Q: No definitions or translations show up**  
A: Check your internet connection and try again in a few seconds.

**Q: Settings don't save**  
A: Make sure Tampermonkey has permission to store data.

---

## For Developers

### Technical Overview
WordGlance is a userscript built with vanilla JavaScript that provides real-time dictionary and translation services through free APIs.

### Architecture
- **APIs Used**: Dictionary API (dictionaryapi.dev) for definitions, Free Translate API for translations
- **Caching**: LRU cache system with 100-item default limit
- **Performance**: Debounced requests, request cancellation, optimized DOM manipulation
- **Storage**: Uses GM_setValue/GM_getValue for persistent settings and cache

### Key Configuration
```javascript
const CONFIG = {
    debounceTime: 150,
    maxDefinitions: 9,
    maxTranslations: 8,
    cacheSize: 100,
    apiTimeout: 10000
};
```

### Contributing
1. Fork the repository
2. Make your changes
3. Test on multiple websites
4. Submit a pull request

**Issues & Feature Requests**: [GitHub Issues](https://github.com/ShrekBytes/WordGlance/issues)

### License
GPL-3.0 - Free to use, modify, and distribute under the same license.

---

**Made by [ShrekBytes](https://github.com/ShrekBytes) • [Install WordGlance](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js) • [Report Issues](https://github.com/ShrekBytes/WordGlance/issues)**
