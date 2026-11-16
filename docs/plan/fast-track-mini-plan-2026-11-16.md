---
goal: "Enhance #comparison-slider-panel with a full-alphabet JavaScript function specimen and 6 selectable Google Fonts comparison baselines"
date_created: "2026-11-16"
status: "Completed"
tags: ["fast-track", "mini-plan", "polya", "pedantry-vs-mastery"]
---
<!-- markdownlint-disable -->

# Fast-Track Mini-Plan: Interactive Comparison Font Switcher & Full-Alphabet JS Specimen

> [!NOTE]
> **EXECUTION OWNERSHIP:** This plan is designed specifically to be executed by `/to-quick-fix`. Normal SDLC agents should not execute this hybrid document.

## 1. Problem Triad & Assumptions (Pólya, p. 33)
- **The Unknown (Goal):** Upgrade the **ERGONOMIC X-HEIGHT COMPARISON** panel (`#comparison-slider-panel` in `index.html`) so that:
  1. Both comparison panes display a compact, realistic JavaScript function containing every uppercase (`A–Z`) and lowercase (`a–z`) letter, all digits (`0–9`), classic disambiguation glyphs (`0O`, `1lI`), and programming operators (`=>`, `!==`, `===`, `!=`).
  2. Users can interactively select which competitor font renders on the left comparison pane from 6 Google Fonts options: **JetBrains Mono**, **Inconsolata**, **Fira Mono**, **Reddit Mono**, **Victor Mono**, and **Ubuntu Mono** (defaulting to **JetBrains Mono**).
- **The Data (Inputs & Seams):**
  - Markup & CSP header: `index.html:7, 431-525` (`#comparison-slider-panel`, `#comparison-stage`, `[data-comparison-preset]`).
  - Comparison styling & mobile overrides: `web-docs/css/showcase.css:201-420, 1644-1665` (`.comparison-stage`, `.comparison-pane--generic`, `.comparison-code-line`).
  - Slider & preset controller: `web-docs/js/main.js:225-325` (`setComparisonSplit`, `initComparisonSlider`).
  - Spec & regression contracts: `docs/spec/sawala-mono-showcase-web-spec.md` (`REQ-012`, `CON-006`, `AC-019`) and `scratch/repro-review-findings.mjs` (`BUG-6b`).
- **The Condition (Invariants):**
  - Strict zero `'unsafe-inline'` in CSP; scope external Google Fonts allowances strictly to `index.html` (`style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;`), leaving subpages strictly `'self'`.
  - Reuse existing house controls (`.variant-switcher-tab`) with `>= 44px` mobile touch targets (`CON-007`), `aria-pressed`, and `data-comparison-font` CSS attribute selectors (no inline `style="..."` font assignments).
  - Keep both comparison panes vertically aligned line-for-line under `clip-path: inset(...)` with zero horizontal page overflow at `375px` mobile and `1280px` desktop.
  - Preserve `audit-all-acs.mjs` DOM hooks (`#xheight-comparison-slider`, `.comparison-divider__handle`) and `CON-005` compiler isolation.
- **Assumptions:**
  - All 6 requested fonts (`JetBrains Mono`, `Inconsolata`, `Fira Mono`, `Reddit Mono`, `Victor Mono`, `Ubuntu Mono`) are fetched at weight `400` with `display=swap` via Google Fonts CSS2 API.
  - Because competitor fonts differ slightly in horizontal advance width, horizontal drift between left and right glyphs during 50/50 split accurately reflects real metric differences, while vertical line-height (`1.4`) and row count remain locked 1:1.

## 2. YAGNI & Simplification Decisions (Pedantry vs. Mastery)
- Reuse existing `.variant-switcher-tab` pill buttons for the 6-font selector instead of inventing a new custom dropdown widget.
- Load only weight `400` from Google Fonts CSS2 (`JetBrains+Mono:wght@400`, `Inconsolata:wght@400`, `Fira+Mono:wght@400`, `Reddit+Mono:wght@400`, `Victor+Mono:wght@400`, `Ubuntu+Mono:wght@400`) rather than loading unused weights/italics.
- Store font metadata in a compact static frozen map inside `web-docs/js/main.js` instead of creating a separate JS module just for 6 entries.
- Keep `node` assertions + live Chromium inspection (`1280x800` and `375x812`) as verification rather than adding build tooling.

## 3. Blast Radius & Affected Scope (The Whole Condition, p. 33)
- `index.html` — Update CSP header (`fonts.googleapis.com` / `fonts.gstatic.com`), add `<link rel="preconnect">` + Google Fonts stylesheet, add 6-font switcher controls (`[data-comparison-font]`), update left/right specimen code lines to the full-alphabet JavaScript function (`A–Z`, `a–z`, `0–9`, `0O`, `1lI`, `=>`, `!==`, `===`), and wire dynamic legend/badge IDs.
- `web-docs/css/showcase.css` — Style `.comparison-font-switcher` bar, map `#comparison-stage[data-comparison-font="..."]` CSS custom properties (`--comparison-left-font`, ligature settings), ensure responsive line font sizing at `375px` so 42-char lines display cleanly without awkward truncation, and maintain `>= 44px` touch height.
- `web-docs/js/main.js` — Add `COMPARISON_FONTS` map, `setComparisonFont(fontId, root)`, and click bindings inside `initComparisonSlider(root)` updating `data-comparison-font`, button `aria-pressed`, legend dot text, and pane header badge/notes.
- `docs/spec/sawala-mono-showcase-web-spec.md` — Update `REQ-012`, `CON-006` (Google Fonts CDN scoped to `index.html`), and `AC-019`.
- `scratch/repro-review-findings.mjs` — Update `BUG-6b` CSP check for `index.html` vs subpages and add assertions verifying all 6 comparison fonts + full `A–Z`/`a–z`/`0–9` JS specimen presence.

## 4. Shortcuts & Deferred Work (Relaxing Conditions, p. 50)
- `// shortcut: loads 6 Google Fonts regular weights from CDN on index.html only; migrate to self-hosted WOFF2 subsets if strict air-gapped offline rendering is required later`.
- No subpage (`distributions.html`, `ligatures.html`, `installation.html`) imports Google Fonts to preserve strict `'self'` CSP across docs pages.

## 5. Execution Checklist
- [x] Task 1: Update `docs/spec/sawala-mono-showcase-web-spec.md` (`REQ-012`, `CON-006`, `AC-019`) to reflect the 6 selectable Google Fonts and scoped CDN CSP rules.
- [x] Task 2: Update `index.html` (`<head>` CSP + Google Fonts `<link>`, `#comparison-slider-panel` font selector tabs, and mirrored full-alphabet JS function specimen lines).
- [x] Task 3: Update `web-docs/css/showcase.css` (`[data-comparison-font="..."]` rules, `.comparison-font-switcher` responsive layout, `min-height: 44px` mobile tab targets, and readable `.comparison-code-line` sizing for 42-char JS alphabet rows).
- [x] Task 4: Update `web-docs/js/main.js` (`COMPARISON_FONTS`, `setComparisonFont`, and initialization hooks in `initComparisonSlider`).
- [x] Task 5: Update `scratch/repro-review-findings.mjs` micro-tests and run full verification (`repro-review-findings.mjs`, `node --check`, `impeccable detect --json`, and live Chromium `1280x800` + `375x812` inspection verifying Google Fonts load, CSP `0` errors, and slider/font switching).
