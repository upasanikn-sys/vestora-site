# Vestora marketing website

A single self-contained `index.html` — no build step, no dependencies. The whole page
(nav, hero + live dashboard mock, privacy pillars, AI Copilot demo, feature grid, download
CTA, footer) is inline HTML/CSS/JS using the Vestora navy-and-gold palette.

## Preview locally
```
python -m http.server 8790 --directory website
# open http://127.0.0.1:8790
```

## Go live with downloads (one line)
Open `index.html`, find near the bottom of the `<script>`:
```js
var DOWNLOAD_URL = "";   // e.g. "https://vestora.gumroad.com/l/vestora"
```
Set it to your **Gumroad product page** (recommended — it handles the free tier and issues
paid license keys) or a public direct link to `Vestora_windows.zip`. Every "Download for
Windows" button then points there. While it's empty, those buttons show a friendly
"launching soon" message instead of a broken link — nothing 404s.

macOS / Android / iOS / Linux buttons stay "coming soon" until those builds exist.

## Hosting
It's a static folder — drop it on GitHub Pages, Netlify, Vercel or Cloudflare Pages.
Do **not** host the 126 MB `Vestora_windows.zip` inside this repo (private source + GitHub's
100 MB file limit); serve the app through Gumroad or a separate public release instead.

## Notes
- The dashboard preview in the hero is real HTML/CSS (crisp at any zoom), not a screenshot.
- Social proof is honest ("Early access — be among the first"), not a fabricated user count.
- Footer disclaimer matches the app: personal tracking & planning tool, not investment advice.
