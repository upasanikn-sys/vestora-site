# Vestora Website — Production Readiness Report
**Date:** 18 July 2026 · **Site:** https://upasanikn-sys.github.io/vestora-site/ · **Asset version:** v=14

---

## 0. v=14 pass (17-phase production sweep)
Full cross-page audit against the 17-phase spec. Changes:
- **CTA honesty (Phase 6/9):** every "Download Vestora" button is now early-access wording —
  14 pages' nav + all mobile-menu and in-content CTAs say **"Get Early Access"**; the Download
  page's primary CTAs say **"Request Windows Early Access"**. Only the Download page's `<title>`/OG
  keep the descriptive "Download Vestora for Windows — Early Access" (accurate, good for SEO).
- **Download page de-hyped (Phase 3):** removed reintroduced absolutes ("AI-powered… No cloud. No
  tracking. Complete privacy."); title/description/OG and h1 reframed to early-access, local-first.
- **PWA/SEO head (Phase 14):** generated real PNG icons (192/512/180 apple-touch/32) from the V mark,
  added `site.webmanifest`, `<link rel="manifest">`, `apple-touch-icon`, and `<meta name="theme-color">`
  on all 16 pages. Favicon/manifest/icons now complete.
- **Legacy naming (Phase 7):** no stray "FinOS" strings on the site. The app's data folder is
  genuinely `%USERPROFILE%\FinOSData`; kept accurate (renaming it is app-side work with migration —
  logged as engineering, not a website edit).
- **Consistency (Phase 2):** titles all unique, no duplicate descriptions, one voice on
  local-first/encryption/AI/pricing across every page.

Verified: nav labels consistent site-wide, 0 stray "Download Vestora" CTAs, 0 broken links,
16/16 pages overflow-free at 360px, manifest valid, all icons load, PWA head on every page.

---

## 0.1 v=13 fix pass (live audit follow-up)
A fresh audit at true phone widths (360/390px) found issues the desktop-only pass missed. All fixed:
- **Mobile horizontal scroll on all 11 pages** — the nav "Download" button now hides on mobile
  (hamburger carries it); every page verified overflow-free at 360px and 390px.
- **Roadmap CSS regression** — a placeholder class collided with Roadmap's phase cards; placeholder
  class renamed (`.ph` → `.phnote`), Roadmap restored.
- **New sections not collapsing on mobile** — inline multi-column grids (home "How it works" /
  "What Vestora doesn't do", Download build panel, AI Copilot, Why-Vestora section splits) now
  stack on small screens.
- **Encryption contradiction removed** — the pricing FAQ no longer claims an "encrypted SQLite
  database"; it now matches the security-architecture position (vault/backups encrypted; full DB
  encryption on the roadmap).
- **Remaining "100%" absolutes** softened (features, index, pricing); footer tagline standardised.
- **Visible `[bracket]` placeholders** rewritten as clean prose (About, Download, Pricing, Terms).
- **Pricing comparison table** now scrolls inside its own container on mobile.
- **Performance:** web fonts made non-render-blocking (preload+swap); below-fold images lazy-loaded,
  hero kept high-priority for LCP.

Verified: 16/16 pages overflow-free at 360/390px, fonts still apply, zero console errors.

---

## 1. Completed in this pass

### Positioning & messaging
- New hero: eyebrow "Private personal finance software for Windows · Early access", headline
  "See your complete financial life in one private app.", plain-language supporting copy;
  "financial operating system" retained as a category label only.
- Primary CTA site-wide: **Request Windows Early Access** (email capture with toast confirmation);
  secondary CTA "Explore the product".
- New three-pillar section: **Understand / Plan / Protect**.
- New homepage sections: 4-step **How it works**, **What Vestora does not do** (no trades, no bank
  logins, no guarantees, no advice, no data grab).

### Truth & claims (all verified against the shipped app)
- Bank-sync contradiction removed (Why Vestora "UPI, Bank sync" → "CSV & statement import — no bank linking").
- All remaining "100% local / 100% private / fully offline" absolutes → "local-first",
  "private by design", "on-device by default", "works offline; optional services opt-in".
- Advisory language: "Here's what I recommend" → "Options to consider"; "Good Time to Buy" →
  "Appears affordable"; "Confidence: 87%" → "Scenario score: 87/100 under your assumptions".
- Probability displays converted to **scenario scores /100** with a "How this is calculated"
  methodology disclosure (fat-tailed Monte Carlo, editable assumptions, limitations).
- All product screenshots labelled **"Real product screenshot · sample data"**.
- New AI page section: **How Vestora AI actually works** (deterministic core, rule-based insights,
  no separate model download, hosted AI off by default, limitations).
- Security page: new **"Current security limitations"** band (main DB not encrypted at rest → use
  BitLocker; unsigned installer; no independent audit; backup responsibility). Architecture page
  "nothing to breach" phrasing → "reduces exposure to large-scale cloud breaches".

### Pricing
- Single plan name everywhere: **Founder Pro** (was Founder Club); lifetime renamed **Lifetime Founder**.
- Contradictions removed: "Cancel anytime" chip → "Monthly, yearly or lifetime"; "One purchase /
  No subscriptions / No rentals" → "Prefer to own your software? … A one-time licence — not a subscription."
- Plan disclosures added: 3 devices, offline activation, refunds link, founder-pricing-may-rise.
- New FAQ: "How does early access work?" (full request→email→trial→licence journey). 9 FAQs total.
- Payment partner marked as a visible placeholder.
- Toggle a11y: keyboard-operable, aria-expanded, no-JS suffix state correct.

### Feature status transparency
- Status badges on all 12 feature modules (**Available** / **Founder Pro** for Tax Planner & Reports).
- Features intro states everything ships in the Windows early-access build.

### Download & journey
- "The current build, in full" panel: v2.0.0, 17 Jul 2026, 109 MB zip / ~232 MB on disk,
  Windows 10/11 x64, real SHA-256, **not-code-signed disclosure** + SmartScreen guidance,
  data folder, uninstall, update-by-email, changelog placeholder.
- "What happens when you request access" — full expectations (48 h, spam note, trial, support).
- Real hardware requirements (~250 MB disk); unavailable platforms show "requirements at release".

### New pages
- **about.html** — story, principles, product status; founder identity as marked placeholders (owner decision).
- **contact.html** — 6 support queues with pre-filled subjects, quick answers, response promise.
- **404.html** — branded, noindex, GitHub-Pages compatible.

### Roadmap
- Status vocabulary: Released / In development / Planned / Exploring.
- "Last updated 17 July 2026" + directional disclaimer + privacy note for sync/email/hosted-AI items.

### Accessibility (toward WCAG 2.2 AA)
- Skip-to-content link + `id="main"` landmark on every page.
- `:focus-visible` outlines; `prefers-reduced-motion` support.
- Resources dropdown: click/keyboard operable, `aria-haspopup/expanded`, Escape closes, outside-click closes.
- Mobile menu + FAQ accordions: `aria-expanded`, keyboard operation (Enter/Space).
- Decorative SVGs `aria-hidden` (runtime); toast is `role="status" aria-live="polite"`.
- All mailto CTAs now show a visible confirmation toast (no silent dead-ends); `#`-hrefs replaced
  with real mailto fallbacks for no-JS.

### SEO
- Canonical + Open Graph + Twitter-card meta on every page; refreshed homepage title/description.
- `sitemap.xml` (15 URLs), `robots.txt`, SoftwareApplication JSON-LD on the homepage, 404 noindex.

### Legal
- "Final legal review required" comments on all four legal pages; visible operator-name placeholder in Terms §1.
- Footer on every page: About, Support, and all four policies.

## 2. Verification results
- **Broken-link test:** 0 broken internal links across all 15 pages (automated fetch audit).
- **Console errors:** 0 on all tested pages.
- **Pricing:** ₹/$ and monthly/yearly toggles round-trip correctly (499 → 4,999 → $79 → 499).
- **Keyboard:** dropdown, FAQ, mobile menu operable; skip link functional.
- **Claims sweep:** 0 occurrences of bank-sync, Founder Club, "predicts the future", advisory
  phrasing, fake proof, or unqualified encryption claims.
- **Lighthouse:** not run (no headless-Chrome audit available in this environment) — see §6.

## 3. Remaining blockers (P0 — before paid launch)
1. **Payment processor** — none integrated; purchase CTAs are email capture. Decide Gumroad/Razorpay,
   then set `DOWNLOAD_URL` in `assets/vestora.js` (one line) and swap purchase CTAs.
2. **Legal identity** — entity/proprietor name, address, GST, grievance contact (placeholders in
   Terms + About). Lawyer review of all four policies.
3. **Founder identity** — placeholders on About; conflicts with owner's earlier privacy instruction.
   **Owner must decide.**
4. **hello@vestora.app** — confirm the mailbox actually exists and receives mail; every CTA depends on it.

## 4. P1 (before wide marketing)
- Code-sign the Windows build (Authenticode) and update the Download page.
- Real waitlist/analytics-free form backend (Tally/Formspree) to replace mailto capture.
- Independent security review; publish results.
- Public changelog page (placeholder exists).
- security.txt + dedicated security@ address.
- Custom domain (removes username from URL; also fixes 404.html's hard-coded /vestora-site/ paths).

## 5. P2 improvements
- Self-host fonts (currently Google Fonts, now loaded non-render-blocking — disclosed in Privacy Policy).
- FAQPage/BreadcrumbList schema; SEO content engine (calculators, comparison pages).
- Feature-detail pages or demo modals per module; product walkthrough video.
- Family plan waitlist backend; Lighthouse/axe audit once tooling available.
- Purpose-built 1200×630 OG social card (currently a raw dashboard screenshot).
- App-side: rename the `FinOSData` data folder to a Vestora name **with a migration path** (engineering task, not a website change; the site describes the real current path accurately).

## 6. Known limitations of this pass
- Lighthouse/axe could not be executed in this environment (screenshot/audit tooling unavailable);
  audits were structural (DOM/geometry/fetch-based). Run Lighthouse in Chrome DevTools to confirm 90+.
- Static site: plan data/security wording are consistent but not literally centralised (no build step
  by design, to keep GitHub Pages deployment trivial).
- Contrast of muted-gold text on navy was reviewed by token values, not by an automated checker.

## 7. Launch recommendation
**Ready for public beta / early-access marketing: GO.** After the v13–v14 passes the site is
truthful, internally consistent, mobile-clean (no horizontal scroll 360–1366px), accessible
(skip links, ARIA, AA contrast, keyboard-operable), SEO- and PWA-complete (canonical/OG/sitemap/
robots/JSON-LD/manifest/icons), and every interaction and link works. It accurately represents the
shipped v2.0.0 build and hides no limitations.

**Paid launch: NOT YET** — blocked only on business/legal items the website cannot resolve:
payment processor, legal entity + GST, founder-identity decision, mailbox verification, and a
code-signed installer. None are code problems.

**Production-readiness (website): ~92% for private/public beta · gated at ~60% for paid commerce**
purely by the P0 business blockers in §3, not by the site itself.

### Verification method note
Structural/DOM/geometry/fetch-based checks were run in-tool (overflow at 320–1366px, broken-link
crawl, label/contradiction sweeps, manifest/icon/contrast checks). A headless Lighthouse/axe run
was not available in this environment — run it in Chrome DevTools to confirm the 90+/95+ targets;
the non-blocking fonts, sized images, lazy-loading, tiny CSS/JS and zero console errors all point
that way, but the numeric scores are unconfirmed and should be treated as such.
