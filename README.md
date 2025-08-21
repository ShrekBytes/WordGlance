# WordGlance - Dictionary & Translation Tooltip

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/ShrekBytes/WordGlance)
[![Userscript](https://img.shields.io/badge/userscript-tampermonkey-orange.svg)](https://www.tampermonkey.net/)

A powerful userscript that provides instant dictionary definitions and translations for selected text on any webpage. Simply select text and click the 📖 icon to get comprehensive definitions, examples, synonyms, antonyms, and translations in 40+ languages.

![WordGlance Demo](https://via.placeholder.com/600x300/3498db/white?text=WordGlance+Demo)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Settings](#settings)
- [Supported Languages](#supported-languages)
- [API Sources](#api-sources)
- [Performance & Caching](#performance--caching)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Q&A](#qa)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Features

### 🔍 **Smart Dictionary Lookup**
- Comprehensive English definitions from Dictionary API
- Part of speech classification
- Real-world usage examples
- Pronunciation and etymology information
- Synonyms and antonyms for better vocabulary building

### 🌍 **Multi-Language Translation**
- Support for 40+ languages including:
  - European: Spanish, French, German, Italian, Portuguese, Russian, etc.
  - Asian: Chinese, Japanese, Korean, Hindi, Thai, Vietnamese, etc.
  - Regional: Bengali, Arabic, Turkish, Swahili, and more
- Auto-detection of source language
- Multiple translation variants for better accuracy

### ⚡ **Performance Optimized**
- Intelligent caching system (100 items by default)
- Debounced API calls to prevent spam
- Background request handling
- Lightweight tooltip with smooth animations
- Responsive design that works on all screen sizes

### 🎨 **User Experience**
- Clean, modern interface with smooth animations
- Dark mode support
- Configurable settings menu
- Non-intrusive trigger icon
- Pagination for multiple definitions/translations
- Grid layout for translations (2x2)

### 🔧 **Highly Configurable**
- Customizable language preferences
- Adjustable cache size and timeout settings
- Flexible API configuration
- Theme customization options

## Installation

### Prerequisites
- A userscript manager (recommended: [Tampermonkey](https://www.tampermonkey.net/))
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Install Steps
1. **Install Tampermonkey** (if not already installed):
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. **Install WordGlance**:
   - Click [here to install](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)
   - Or manually copy the script from `wordglance.user.js`

3. **Verify Installation**:
   - Navigate to any webpage
   - Select some text
   - Look for the 📖 icon near your selection

## Usage

### Basic Usage
1. **Select Text**: Highlight any word or phrase on a webpage
2. **Click Icon**: Click the 📖 icon that appears near your selection
3. **View Results**: See definitions, translations, synonyms, and examples in the tooltip

### Navigation
- **Pagination**: Use ‹ › arrows to navigate between multiple definitions/translations
- **Settings**: Click the gear icon in your userscript manager or use the registered menu command
- **Dark Mode**: Toggle in settings for comfortable nighttime browsing
- **Close**: Click outside the tooltip, press Escape, or click the × button

### Text Selection Tips
- **Single Words**: Best for dictionary definitions
- **Short Phrases**: Good for translations (max 5 words)
- **Supported Characters**: Letters, numbers, hyphens, apostrophes, and accented characters
- **Length Limit**: Maximum 100 characters

## Settings

Access settings through your userscript manager menu or the ⚙️ Settings command.

### Available Settings

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Dark Mode** | Toggle dark/light theme | Light | On/Off |
| **From Language** | Source language for translation | Auto-detect | 40+ languages |
| **To Language** | Target language for translation | Bengali | 40+ languages |
| **Cache Management** | View and clear cached data | - | Clear button |

### Language Configuration
- **Auto-detect**: Automatically identifies the source language (recommended)
- **Manual Selection**: Choose specific source language for better accuracy
- **Target Language**: Set your preferred translation language
- **Language Search**: Filter languages by name or code in the dropdown

### Cache Settings
- **Cache Size**: Stores up to 100 definitions and translations by default
- **Cache Persistence**: Data persists across browser sessions
- **Cache Clearing**: Manual option to clear all cached data

## Supported Languages

WordGlance supports 40+ languages for translation:

### European Languages
| Code | Language | Code | Language |
|------|----------|------|----------|
| `en` | English | `es` | Spanish |
| `fr` | French | `de` | German |
| `it` | Italian | `pt` | Portuguese |
| `ru` | Russian | `nl` | Dutch |
| `sv` | Swedish | `da` | Danish |
| `no` | Norwegian | `fi` | Finnish |
| `pl` | Polish | `cs` | Czech |
| `sk` | Slovak | `hu` | Hungarian |
| `ro` | Romanian | `bg` | Bulgarian |
| `hr` | Croatian | `sr` | Serbian |
| `sl` | Slovenian | `et` | Estonian |
| `lv` | Latvian | `lt` | Lithuanian |
| `uk` | Ukrainian | `el` | Greek |

### Asian & Other Languages
| Code | Language | Code | Language |
|------|----------|------|----------|
| `ja` | Japanese | `ko` | Korean |
| `zh` | Chinese | `ar` | Arabic |
| `hi` | Hindi | `bn` | Bengali |
| `tr` | Turkish | `he` | Hebrew |
| `th` | Thai | `vi` | Vietnamese |
| `id` | Indonesian | `ms` | Malay |
| `tl` | Filipino | `sw` | Swahili |
| `am` | Amharic | `zu` | Zulu |

*Note: Dictionary definitions are currently available in English only.*

## API Sources

WordGlance uses reliable, free APIs for its functionality:

### Dictionary API
- **Source**: [Dictionary API](https://dictionaryapi.dev/)
- **Features**: Definitions, examples, synonyms, antonyms, phonetics
- **Language**: English
- **Rate Limits**: Reasonable usage limits

### Translation API
- **Source**: [Free Translate API](https://ftapi.pythonanywhere.com/)
- **Features**: Multi-language translation, alternative suggestions
- **Languages**: 40+ supported languages
- **Rate Limits**: Reasonable usage limits

### Privacy & Data
- **No Registration**: No API keys or accounts required
- **No Data Collection**: WordGlance doesn't store your personal data
- **Local Caching**: All cache data is stored locally in your browser

## Performance & Caching

### Caching System
- **LRU Cache**: Least Recently Used eviction policy
- **Dual Cache**: Separate caches for definitions and translations
- **Persistent Storage**: Cache survives browser restarts
- **Configurable Size**: Default 100 items, adjustable in code

### Performance Features
- **Debouncing**: 150ms delay prevents excessive API calls
- **Request Cancellation**: Outdated requests are cancelled automatically
- **Lazy Loading**: Content loads on-demand
- **Smooth Animations**: Optimized CSS transitions and transforms

### Memory Management
- **Auto Cleanup**: Event listeners and DOM elements are properly cleaned up
- **Timeout Handling**: 10-second timeout prevents hanging requests
- **Error Recovery**: Graceful handling of API failures

## Customization

### Configuration Options
You can modify the `CONFIG` object in the script for advanced customization:

```javascript
const CONFIG = {
    debounceTime: 150,        // API call delay (ms)
    tooltipZIndex: 999999,    // Tooltip layer priority
    maxDefinitions: 9,        // Max definitions to show
    maxTranslations: 8,       // Max translations to show
    definitionsPerPage: 3,    // Definitions per page
    translationsPerPage: 4,   // Translations per page (2x2 grid)
    maxSynonyms: 6,          // Max synonyms to display
    maxAntonyms: 6,          // Max antonyms to display
    cacheSize: 100,          // Cache size limit
    apiTimeout: 10000        // Request timeout (ms)
};
```

### CSS Customization
The script includes comprehensive CSS that can be modified for custom styling:
- **Colors**: Modify color schemes for light/dark modes
- **Fonts**: Change typography and sizing
- **Animations**: Adjust transition speeds and effects
- **Layout**: Modify tooltip dimensions and positioning

### Language Support
To add support for additional languages:
1. Add the language code to the `LANGUAGES` object
2. Ensure the translation API supports the language
3. Test functionality with the new language

## Troubleshooting

### Common Issues

#### Tooltip Not Appearing
- **Check Selection**: Ensure text meets selection criteria (1-100 chars, valid characters)
- **Browser Compatibility**: Verify your browser supports userscripts
- **Script Conflicts**: Disable other userscripts temporarily to test
- **Console Errors**: Check browser console for error messages

#### Translation/Definition Errors
- **API Status**: Check if external APIs are accessible
- **Network Issues**: Verify internet connection
- **Rate Limiting**: Wait a moment if making many requests quickly
- **Language Support**: Ensure selected languages are supported

#### Performance Issues
- **Clear Cache**: Use the settings menu to clear cached data
- **Reduce Cache Size**: Modify `CONFIG.cacheSize` for lower memory usage
- **Check Network**: Slow responses may indicate network issues

#### Settings Not Saving
- **Userscript Permissions**: Ensure Tampermonkey has proper permissions
- **Storage Quota**: Check if browser storage quota is exceeded
- **Script Updates**: Settings might reset after script updates

### Debug Mode
To enable debug logging, add this to the script:
```javascript
const DEBUG = true;
```

### Browser Console
Use F12 to open developer tools and check the console for error messages and debug information.

## Q&A

### General Questions

**Q: Is WordGlance free to use?**
A: Yes, WordGlance is completely free and open-source under the GPL-3.0 license.

**Q: Do I need to create an account or register?**
A: No, WordGlance works without any registration or API keys.

**Q: Does WordGlance work on mobile devices?**
A: WordGlance is designed for desktop browsers. Mobile support depends on the userscript manager availability.

**Q: Can I use WordGlance offline?**
A: No, WordGlance requires internet access to fetch definitions and translations from APIs.

### Technical Questions

**Q: How much data does WordGlance cache?**
A: By default, WordGlance caches up to 100 definitions and 100 translations locally in your browser.

**Q: Will WordGlance slow down my browsing?**
A: No, WordGlance is optimized for performance with minimal impact on page loading and browsing speed.

**Q: Can I modify the script for my needs?**
A: Yes, WordGlance is open-source. You can modify it according to the GPL-3.0 license terms.

**Q: Does WordGlance collect my personal data?**
A: No, WordGlance doesn't collect or transmit any personal data. All processing is done locally.

### Usage Questions

**Q: Why can't I select certain text?**
A: WordGlance filters text based on length (max 100 chars), character types (letters, numbers, basic punctuation), and word count (max 5 words).

**Q: How accurate are the translations?**
A: Translation accuracy depends on the external API. For best results, use auto-detect for source language and select clear, contextual text.

**Q: Can I translate entire paragraphs?**
A: WordGlance is optimized for words and short phrases. For longer text, consider dedicated translation services.

**Q: Why do some words not have definitions?**
A: Dictionary coverage depends on the external API. Specialized terms, slang, or very new words might not be available.

### Customization Questions

**Q: Can I change the appearance of the tooltip?**
A: Yes, you can modify the CSS styles in the script to customize colors, fonts, sizes, and animations.

**Q: How do I add support for a new language?**
A: Add the language code to the `LANGUAGES` object in the script, ensuring the translation API supports it.

**Q: Can I increase the cache size?**
A: Yes, modify `CONFIG.cacheSize` in the script. Be aware that larger caches use more browser storage.

**Q: How do I disable specific features?**
A: You can modify the script to hide or disable features like synonyms, translations, or specific UI elements.

## Contributing

We welcome contributions to WordGlance! Here's how you can help:

### Reporting Issues
- Use the [GitHub Issues](https://github.com/ShrekBytes/WordGlance/issues) page
- Provide detailed descriptions and steps to reproduce
- Include browser and userscript manager information
- Check existing issues before creating new ones

### Feature Requests
- Submit feature requests through GitHub Issues
- Explain the use case and benefits
- Consider implementation complexity
- Be open to discussion and alternatives

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with clear, commented code
4. Test thoroughly across different browsers
5. Commit with descriptive messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test on multiple browsers and websites
- Consider performance impact of changes
- Update documentation when necessary

### Translation Help
- Help improve language support and accuracy
- Test translations in your native language
- Report translation errors or suggestions
- Suggest additional language support

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Freedom to use**: Use WordGlance for any purpose
- ✅ **Freedom to study**: Examine and learn from the source code
- ✅ **Freedom to share**: Distribute copies to help others
- ✅ **Freedom to modify**: Adapt the software to your needs
- ⚠️ **Copyleft**: Derivative works must also be GPL-licensed
- ⚠️ **No warranty**: Software is provided as-is without guarantees

## Credits

### Author
**ShrekBytes** - [GitHub Profile](https://github.com/ShrekBytes)

### External APIs
- **Dictionary API** - [dictionaryapi.dev](https://dictionaryapi.dev/) - Free English dictionary
- **Free Translate API** - [ftapi.pythonanywhere.com](https://ftapi.pythonanywhere.com/) - Multi-language translation

### Technologies
- **JavaScript (ES6+)** - Core functionality
- **CSS3** - Modern styling and animations
- **Userscript APIs** - Tampermonkey/Greasemonkey integration
- **Web APIs** - Selection, DOM manipulation, and storage

### Inspiration
- Modern dictionary applications and browser extensions
- User feedback and feature requests from the community
- Open-source philosophy and collaborative development

### Special Thanks
- The userscript community for testing and feedback
- API providers for offering free, reliable services
- Contributors who help improve the project

---

## Quick Links

- 🏠 **Homepage**: [GitHub Repository](https://github.com/ShrekBytes/WordGlance)
- 📥 **Install**: [Direct Download](https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js)
- 🐛 **Issues**: [Report Problems](https://github.com/ShrekBytes/WordGlance/issues)
- 💬 **Support**: [Get Help](https://github.com/ShrekBytes/WordGlance/issues)
- 📖 **Documentation**: This README

---

*Made with ❤️ by ShrekBytes | Star ⭐ this repo if WordGlance helps you!*
