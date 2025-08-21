# WordGlance Firefox Extension - Installation Guide

## Quick Installation (Temporary - For Testing)

1. **Open Firefox** and navigate to `about:debugging`
2. Click **"This Firefox"** in the left sidebar
3. Click **"Load Temporary Add-on..."** button
4. Navigate to the extension folder and select `manifest.json`
5. The extension will be loaded and you'll see it in the toolbar

## Development Setup

### Prerequisites
- Firefox 57+ (Firefox Developer Edition recommended)
- Node.js (optional, for web-ext tools)

### Using web-ext (Recommended)

1. **Install web-ext globally:**
   ```bash
   npm install -g web-ext
   ```

2. **Navigate to extension directory:**
   ```bash
   cd /path/to/WordGlance/extension
   ```

3. **Run the extension in Firefox:**
   ```bash
   web-ext run
   ```
   This will open a new Firefox instance with the extension loaded.

4. **Build for distribution:**
   ```bash
   web-ext build
   ```
   This creates a `.zip` file in the `web-ext-artifacts` directory.

### Manual Development

1. **Load the extension:**
   - Go to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select `manifest.json`

2. **Reload after changes:**
   - Go back to `about:debugging`
   - Find WordGlance extension
   - Click "Reload" button

## Testing the Extension

1. **Load any webpage** (e.g., Wikipedia, news sites)
2. **Select any text** by highlighting it with your mouse
3. **Click the 📖 icon** that appears near your selection
4. **View the tooltip** with definitions and translations
5. **Test settings** by clicking the extension icon in the toolbar

## Features to Test

- [ ] Text selection and trigger icon appearance
- [ ] Definition fetching and display
- [ ] Translation functionality
- [ ] Pagination (left/right arrows)
- [ ] Dark mode toggle
- [ ] Language selection (source and target)
- [ ] Cache functionality
- [ ] Mobile/touch support
- [ ] Settings persistence across tabs
- [ ] Error handling (try invalid text)

## Troubleshooting

### Extension Not Loading
- Check Firefox version (must be 57+)
- Verify `manifest.json` syntax
- Check browser console for errors (`Ctrl+Shift+J`)

### API Requests Failing
- Check network connectivity
- Verify API endpoints are accessible
- Check browser console for CORS errors

### Settings Not Saving
- Check if storage permission is granted
- Verify browser storage isn't full
- Check background script console

### Icon Not Appearing
- Try different websites
- Check if text selection is working
- Verify content script is injected

## File Structure

```
extension/
├── manifest.json       # Extension configuration
├── background.js       # Background script (API calls, cache)
├── content.js         # Content script (UI, text selection)
├── content.css        # Styles for tooltip
├── popup.html         # Settings popup interface
├── popup.js           # Settings popup logic
├── icons/             # Extension icons (16, 32, 48, 96, 128px)
├── package.json       # npm configuration
└── README.md          # Documentation
```

## Debug Console Access

- **Background Script Console:**
  1. Go to `about:debugging`
  2. Find WordGlance extension
  3. Click "Inspect" next to background script

- **Content Script Console:**
  1. Open any webpage
  2. Press `F12` to open developer tools
  3. Check console for content script logs

- **Popup Console:**
  1. Right-click extension icon
  2. Select "Inspect"

## Building for Distribution

### Create Release Package

1. **Using web-ext:**
   ```bash
   web-ext build --overwrite-dest
   ```

2. **Manual packaging:**
   ```bash
   zip -r wordglance-extension.zip . -x "*.git*" "node_modules/*" "web-ext-artifacts/*"
   ```

### Firefox Add-ons Store Submission

1. Create developer account at https://addons.mozilla.org/developers/
2. Upload the `.zip` file created by `web-ext build`
3. Fill in extension details and descriptions
4. Submit for review

## Performance Monitoring

- Monitor memory usage in `about:memory`
- Check network requests in Developer Tools
- Test with multiple tabs open
- Verify cache efficiency in background script console

## Support

For issues and questions:
- [GitHub Issues](https://github.com/ShrekBytes/WordGlance/issues)
- [Firefox Extension Documentation](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions)
