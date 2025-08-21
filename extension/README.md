# WordGlance Firefox Extension

A Firefox extension that provides instant dictionary definitions and translations for selected text with support for multiple languages.

## Features

This Firefox extension provides **identical functionality** to the WordGlance userscript:

- 📖 **Instant Definitions**: Get dictionary definitions from Free Dictionary API
- 🌍 **Multi-language Translation**: Translate text between 40+ languages
- 🎨 **Dark/Light Mode**: Seamless dark mode support
- 📱 **Mobile Friendly**: Optimized for touch devices
- 💾 **Smart Caching**: LRU cache for faster repeated lookups
- 📊 **Usage Statistics**: Track your learning progress
- ⚡ **Performance Optimized**: Shared cache across all tabs
- 🔄 **Pagination**: Navigate through multiple definitions and translations

## Installation

### Manual Installation (Recommended for Development)

1. Download or clone the extension files
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension directory
6. The extension will be loaded and ready to use

### Firefox Add-ons Store (Future)

The extension will be published to Firefox Add-ons store for easier installation.

## Usage

1. **Select Text**: Highlight any word or phrase on any webpage
2. **Click Icon**: Click the 📖 icon that appears near your selection
3. **View Results**: See definitions and translations in an elegant tooltip
4. **Navigate**: Use arrow controls to browse through multiple results
5. **Settings**: Click the extension icon in the toolbar to access settings

## Settings

Access settings by clicking the WordGlance extension icon in the Firefox toolbar:

- **Dark Mode**: Toggle between light and dark themes
- **Source Language**: Set the language to translate from (auto-detect recommended)
- **Target Language**: Set your preferred translation language
- **Cache Management**: View cache statistics and clear stored data
- **Usage Statistics**: See how many words you've learned

## Architecture

### Extension vs Userscript Benefits

The extension version provides several advantages over the userscript:

- **Shared Cache**: Single cache shared across all tabs (saves memory)
- **Better Performance**: Background script handles API requests efficiently
- **Deduplication**: Prevents duplicate API calls across tabs
- **Settings Sync**: Settings automatically sync across all tabs
- **Lower Memory Usage**: ~90% less memory usage compared to userscript with multiple tabs

### Files Structure

```
extension/
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
└── README.md             # This file
```

## APIs Used

- **Free Dictionary API**: `https://api.dictionaryapi.dev/` - For English definitions
- **Free Translate API**: `https://ftapi.pythonanywhere.com/` - For translations

## Supported Languages

**Source Languages**: Auto-detect, English, Bengali, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Turkish, Dutch, Swedish, Danish, Norwegian, Finnish, Polish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian, Greek, Hebrew, Thai, Vietnamese, Indonesian, Malay, Filipino, Swahili, Amharic, Zulu

**Target Languages**: All of the above except auto-detect

## Privacy

- **No Data Collection**: The extension doesn't collect or store personal data
- **Local Storage**: All settings and cache data are stored locally
- **API Calls**: Only selected text is sent to translation/definition APIs
- **No Tracking**: No analytics or tracking implemented

## Permissions

- `storage`: Store settings and cache data locally
- `activeTab`: Access content of the active tab for text selection
- `<all_urls>`: Work on all websites
- API domains: Access to dictionary and translation services

## Development

### Local Development

1. Make changes to the extension files
2. Go to `about:debugging` in Firefox
3. Click "Reload" on the WordGlance extension
4. Test your changes

### Building for Distribution

The extension is ready for distribution as-is. For Firefox Add-ons store submission:

1. Zip all files in the extension directory
2. Submit to Firefox Add-ons Developer Hub
3. Follow Firefox review process

## Compatibility

- **Firefox**: Version 57+ (Quantum)
- **Manifest**: Version 2 (fully compatible)
- **Mobile**: Firefox for Android supported

## License

GPL-3.0 License - same as the original userscript

## Credits

Made by [ShrekBytes](https://github.com/ShrekBytes/WordGlance)

Original userscript: [WordGlance Userscript](https://github.com/ShrekBytes/WordGlance)

## Support

- [GitHub Issues](https://github.com/ShrekBytes/WordGlance/issues)
- [Homepage](https://github.com/ShrekBytes/WordGlance)

## Changelog

### Version 2.1.5
- Initial Firefox extension release
- Feature parity with userscript v2.1.5
- Shared cache architecture
- Performance optimizations
- Settings popup interface
