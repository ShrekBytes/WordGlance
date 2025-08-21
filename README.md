# WordGlance

Instant dictionary definitions + translations anywhere you select text on the web.

Select a word (or up to 5 words), click the floating 📖 icon, and a sleek tooltip slides in with:
- Paginated definitions (with part of speech & example sentences)
- Synonyms & antonyms (when available)
- Fast multi-translation grid (2×2 pages)
- Smart caching & dark mode
- One‑click language switching (auto-detect supported for source language)

<p align="center"><img src="icon.png" alt="WordGlance icon" width="96"/></p>

---

## Table of Contents
1. [Features](#features)
2. [Live Demo (How It Works)](#live-demo-how-it-works)
3. [Installation](#installation)
4. [How to Use](#how-to-use)
5. [APIs Used](#apis-used)
6. [Language Switching](#language-switching)
7. [Caching & Performance](#caching--performance)
8. [Configuration (Advanced)](#configuration-advanced)
9. [Privacy Notes](#privacy-notes)
10. [Troubleshooting / FAQ](#troubleshooting--faq)
11. [Contributing](#contributing)
12. [License](#license)

---

## Features
- Universal: Works on (almost) any webpage (`*://*/*`).
- Lightweight UI: Floating trigger icon ➜ animated tooltip.
- Smooth Pagination: Definitions (3 per page), translations (2×2 grid pages).
- Synonyms & Antonyms: Auto-collected and de‑duplicated.
- Dark Mode: Toggle in the settings panel.
- Language Auto‑Detect: Source can be `auto` for smart translation.
- Multi‑Word Support: Up to 5 words per selection; filters out pure numbers / punctuation.
- Caching Layer: LRU caching of definitions + per language pair translations.
- Resilient: Request race cancellation & timeout handling.
- No external frameworks – pure userscript.

---

## Live Demo (How It Works)
1. Select a word or small phrase on any page.
2. A small blue (or coral in dark mode) circular 📖 icon appears near the selection.
3. Click it: Tooltip animates in with two sections:
   - Definitions (with pagination controls ‹ ›)
   - Translations (grid; multiple pages if more results)
4. Synonyms / antonyms appear below when available.
5. Use the Tampermonkey/Greasemonkey menu command: `⚙️ WordGlance Settings` to open the settings panel.

---

## Installation
1. Install a userscript manager (choose one):
   - Chrome / Edge: [Tampermonkey](https://www.tampermonkey.net/)
   - Firefox: Tampermonkey or Violentmonkey
   - Safari: Tampermonkey (App Store)
2. Click this raw install link: 
   - https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js
3. Confirm install in your userscript manager.
4. Reload any open pages and start selecting text.

---

## How to Use
- Select text (word or short phrase).
- Click the appearing 📖 icon.
- Navigate pages with ‹ › buttons.
- Open settings via the userscript manager’s menu ➜ `⚙️ WordGlance Settings`.
- Change languages / toggle dark mode / clear cache.
- Press `Esc` to close tooltip or settings.

Keyboard Focus: The script is designed not to interfere with normal selection or typing.

---

## APIs Used
| Type | API | Endpoint Pattern | Notes |
|------|-----|------------------|-------|
| Dictionary | Free Dictionary API | `https://api.dictionaryapi.dev/api/v2/entries/en/{word}` | English definitions only (currently). |
| Translation | Free Translate API | `https://ftapi.pythonanywhere.com/translate?dl={target}&text={text}&sl={source?}` | Supports `sl` (source) omitted when auto-detect. |

All requests are client-side; no proxy or backend.

---

## Language Switching
Accessible via the in‑app settings panel.

Source ("From") Language:
- May be set to `Auto-detect` (code: `auto`).
- When set to `auto`, the translation API attempts to infer the source language.

Target ("To") Language:
- Must be one of the defined target language codes (see list below).

Supported Codes (subset):
`en, bn, es, fr, de, it, pt, ru, ja, ko, zh, ar, hi, tr, nl, sv, da, no, fi, pl, cs, sk, hu, ro, bg, hr, sr, sl, et, lv, lt, uk, el, he, th, vi, id, ms, tl, sw, am, zu`

Persistence:
- Choices are stored via `GM_setValue` under keys:
  - `wordglance-source-language`
  - `wordglance-target-language`

Programmatic Change (advanced):
Inside `wordglance.user.js`, initial values are loaded here:
```js
let targetLanguage = GM_getValue('wordglance-target-language', 'bn');
let sourceLanguage = GM_getValue('wordglance-source-language', 'auto');
```
Change the fallback defaults (`'bn'`, `'auto'`) before installation if you want a different initial pairing globally.

---

## Caching & Performance
- Two separate LRU-like maps for definitions and translations (size limit: 100 entries by default).
- Key format (translations): `{text}-{source}-{target}`.
- Eviction: Oldest entry removed when exceed size.
- Stored to userscript storage (`GM_setValue`) using JSON snapshots.
- Clearing: Use the `Clear` button in settings.

---

## Configuration (Advanced)
At top of the script:
```js
const CONFIG = {
  debounceTime: 150,
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
```
You can fork and adjust values (e.g., increase `cacheSize`, lower `apiTimeout`, change pagination sizes). Keep totals small to avoid layout jumps.

---

## Privacy Notes
- Only the selected text is sent to the translation API (and the dictionary API for English words).
- No analytics, tracking pixels, or third-party storage.
- Everything else (UI state, cache) stays local in userscript storage.

---

## Troubleshooting / FAQ
**Q: The 📖 icon doesn’t appear.**  
A: Ensure you actually selected text (drag or double-click). Some embedded apps (e.g., PDFs in iframes) block selection events. Try on a plain article page.

**Q: Can I translate longer sentences?**  
A: The script currently limits to 5 words and < 100 chars for speed and signal quality. You can adjust validation logic inside `handleSelection()` if you fork it.

**Q: How do I switch languages?**  
A: Open the userscript manager menu ➜ `⚙️ WordGlance Settings` ➜ choose From / To languages from searchable dropdowns.

**Q: Why are definitions only English?**  
A: The Free Dictionary API endpoint used is English-specific. For multilingual definitions, a future enhancement could select different dictionary sources based on language.

**Q: What if translation says “No translation found”?**  
A: The API returned no usable `destination-text`. Try selecting fewer words or a simpler form.

**Q: How do I clear cached results?**  
A: Open settings ➜ click `Clear` in the Cache section.

**Q: Does it run inside iframes?**  
A: The script uses `@noframes`, so it avoids iframe clutter by design. Remove the `@noframes` directive if you want inner-frame behavior.

**Q: How do I disable on a specific site?**  
A: In Tampermonkey: Dashboard ➜ select the script ➜ Settings ➜ add the site to Excludes. Or fork and refine `@match` patterns.

**Q: Can I map a hotkey instead of clicking the icon?**  
A: Not yet. A keyboard activation (e.g., Alt+D) is a reasonable enhancement—PRs welcome.

**Q: How is dark mode decided?**  
A: Manual toggle stored under `wordglance-dark-mode`. Automatic detection could be added using `matchMedia`—see Issues to request it.

---

## Contributing
1. Fork the repo.
2. Make focused changes (keep style minimal & dependency‑free).
3. Test on a few pages (news site, documentation, blog).
4. Open a PR describing:
   - What changed & why
   - Screenshots/GIF if UI related
5. Keep functions small & comment only where non-obvious.

Ideas / Roadmap:
- Keyboard shortcut activation
- Multi-dictionary support per language
- Offline fallback / local wordlist
- Copy button for translations
- Pronunciation audio

---

## License
Distributed under the GPL-3.0 License. See [`LICENSE`](LICENSE).

---

## Attribution / Credit
Created by [ShrekBytes](https://github.com/ShrekBytes). Open to improvements—feel free to file Issues or PRs.

---

Happy reading ✨
