# WordGlance

Simple pop‑up meanings and translations for any word you highlight on the web.

Highlight. Click 📖. Read. Switch language. Done.

<p align="center"><img src="icon.png" alt="WordGlance icon" width="96"/></p>

---

## Table of Contents
1. [What It Does](#what-it-does)
2. [Install](#install)
3. [Quick Use](#quick-use)
4. [The Settings Menu](#the-settings-menu)
5. [Change Languages](#change-languages)
6. [Dark Mode](#dark-mode)
7. [Where Meanings & Translations Come From](#where-meanings--translations-come-from)
8. [FAQ](#faq)
9. [Advanced (Optional)](#advanced-optional)
10. [Privacy](#privacy)
11. [License](#license)

---

## What It Does
WordGlance adds a tiny floating 📖 button whenever you select a word or short phrase (up to 5 words). Click it to see:
* Clean definition pages (with examples when available)
* Quick translation tiles (can be multiple pages)
* Synonyms & antonyms (if found)
* Smooth animations + dark mode

You stay on the page—no new tabs, no clutter.

---

## Install
1. Install a userscript manager:
   * Chrome / Edge: Tampermonkey
   * Firefox: Tampermonkey or Violentmonkey
   * Safari: Tampermonkey
2. Click the raw script link to install:
   https://github.com/ShrekBytes/WordGlance/raw/main/wordglance.user.js
3. Approve it. Reload a page. Highlight a word.

That’s it.

---

## Quick Use
1. Select a word (or short phrase).
2. A circular 📖 button appears right nearby.
3. Click it: a compact panel fades in.
4. Switch pages of definitions / translations with the little ‹ › arrows.
5. Press Esc or click outside to close.

Tip: If nothing appears, make sure the selection isn’t only numbers or punctuation.

---

## The Settings Menu
Open it through your userscript manager menu: `⚙️ WordGlance Settings`.

Inside you can:
* Change FROM (source) language (or leave on Auto)
* Change TO (target) language
* Toggle Dark Mode
* Clear the internal cache (frees space / refreshes results)

Everything saves automatically.

---

## Change Languages
In the settings panel you’ll see two dropdowns:
* From Language – choose a language or leave on Auto‑detect
* To Language – your translation target (must be a real language, not Auto)

Supported examples: en, bn, es, fr, de, it, pt, ru, ja, ko, zh, ar, hi, tr, nl, sv, da, no, fi, pl, cs, sk, hu, ro, bg, hr, sr, sl, et, lv, lt, uk, el, he, th, vi, id, ms, tl, sw, am, zu

You can change these any time—future lookups will use the new pair.

---

## Dark Mode
Click the Dark Mode toggle in settings. The panel + button restyle instantly. Your choice is remembered.

---

## Where Meanings & Translations Come From
* Meanings: Free Dictionary API (English entries)
* Translations: Free Translate API (auto‑detect supported)

No login, no API keys needed.

---

## FAQ
**The 📖 icon didn’t show up**  
The selection may be too long, empty, only numbers, or blocked by a special viewer (like an embedded PDF). Try plain text on a normal site.

**Definitions missing but translation works**  
The dictionary API only gives English definitions. Non‑English words may still translate.

**“No translation found”**  
Try a simpler root form or fewer words.

**How do I clear old results?**  
Open settings ➜ Clear (Cache section).

**Can I use the keyboard instead of clicking?**  
Not yet. A shortcut is planned—feel free to request it.

**Does it slow pages down?**  
It stays idle until you select text. Results are cached to reduce repeat calls.

**Dark mode automatic?**  
Currently manual. Toggle lives in settings.

**Want it inside iframes?**  
By default it skips them. Advanced users can remove the `@noframes` line in the script.

---

## Advanced (Optional)
Curious or tweaking? Near the top of `wordglance.user.js` there’s a small config block (limits, timeouts, page sizes). Most users never need to touch it.

---

## Privacy
Only the text you highlight is sent to the public APIs for meaning / translation. No analytics. Cache + preferences stay in your browser’s userscript storage.

---

## License
GPL‑3.0 – see the [`LICENSE`](LICENSE) file.

---

Made with care by [ShrekBytes](https://github.com/ShrekBytes). Enjoy faster reading ✨
