---
title: "Web Showcase & Documentation Sync for Sawala Ligar Mono (Wave 2)"
version: "1.3.0"
date_created: "2026-11-19"
last_updated: "2026-11-19"
status: "Approved"
prd_ref: "docs/discovery/web-showcase-sawala-ligar-sync-discovery.md"
tags: ["polya", "spec", "web-showcase", "sawala-ligar-mono", "typography", "github-pages"]
---
<!-- markdownlint-disable -->

# Technical Specification: Web Showcase & Documentation Sync for Sawala Ligar Mono

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
- **Target Output:** Update the zero-build static web showcase ([index.html](../../index.html)) and documentation subpages ([web-docs/](../../web-docs)) so the live GitHub Pages site (`https://iosevka-mayukai.github.io/sawala-mono-dev/`) accurately reflects all **six official distributions** shipped in `v1.1.0-release19112026`, enables **live browser WebFont (`WOFF2`) preview** of **Sawala Ligar Mono** (`Regular` & `Italic`), integrates **Sawala Ligar Mono** and **Sawala Ligar Mono NF** into the 3×2 Distribution Matrix and IDE Config Generator, and corrects observed metadata drift in the Character Inspector and Terminal Mockup.
- **Core User Outcomes:**
  1. Visitors can switch interactively between **Sawala Mono**, **Sawala Mono NL**, and **Sawala Ligar Mono** inside the Live Type Specimen Tester and Polyglot Code Runner to compare upright `curly-serifless` (`7`, `x`, `z`) and cursive italic forms directly in-browser.
  2. Visitors see a balanced **3×2 Distribution Matrix** (top row: 3 base coding distributions; bottom row: 3 Nerd Font terminal distributions) on desktop `index.html` and a matching **6-column specification table** in `web-docs/pages/distributions.html`.
  3. Visitors can generate copy-paste editor/terminal snippets for `Sawala Ligar Mono` and `Sawala Ligar Mono NF` in the IDE Configuration Generator and follow updated installation steps in `web-docs/pages/installation.html`.
- **Explicit Non-Goals (Out of Scope):**
  - No `Sawala Ligar Mono NL` distribution card, build plan, or config option (Wave 1 constraint `CON-003` in [`docs/spec/sawala-ligar-mono-spec.md`](sawala-ligar-mono-spec.md) remains enforced; not to be confused with `CON-003` in this document).
  - No `Sawala Ligar Mono` integration into these existing interactive surfaces, which keep their current binary behavior unchanged:
    - Interactive Ligature Playground (`web-docs/js/ligature-playground.js`, `Sawala Mono` vs `Sawala Mono NL`).
    - Nerd Font Terminal Mockup family toggle (`web-docs/js/terminal-preview.js:213-240`, `Sawala Mono NF` vs `Sawala Mono NL NF`); only its `v1.0.0` labels are refreshed (`REQ-006`).
    - Proportional x-Height Comparison Slider (`#comparison-stage`, Sawala pane stays `Sawala Mono`).
    - Ergonomic Anatomy cards (`#anatomy`).
  - No bundling of full 9-weight / `SemiExtended` `WOFF2` binaries for `Sawala Ligar Mono` (strictly capped at `Regular` + `Italic` 400 weights to protect Git footprint and page performance).
  - No edits to upstream font engine code (`packages/*`, `params/*`, `verdafile.mjs`) or Nerd Font patching CI (`patch-nerd-font.yml`).
  - No build-tool migration (no Vite, Webpack, TypeScript compilation, or server runtime; pure zero-build ESM + CSS + static HTML).

### 1.2 The Data (Inputs, State & Source-Grounded Context)
- **Domain Ground Truth:**
  - `private-build-plans.toml:7-250` `[VERIFIED]` — Declares `[buildPlans.SawalaMono]` (`lines 7-77`, italic `y = "cursive-serifless"` at `line 54`, italic `zero = "tall-reverse-slashed"` at `line 55`), `[buildPlans.SawalaMonoNL]` (`lines 82-150`, `y = "cursive-serifless"` at `line 127`), and `[buildPlans.SawalaLigarMono]` (`lines 155-250`: `ss20`, `default-calt`, 29 `design` + 27 `italic` keys).
  - `CONTEXT.md:7-33` `[VERIFIED]` — Canonical names (`Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`, and Build Plan IDs).
  - `docs/releases/v1.1.0-release19112026-release-notes.md` `[VERIFIED]` — Release archive conventions (`SawalaLigarMono-v1.1.0-release19112026.zip`, `SawalaLigarMono-NF-v1.1.0-release19112026.zip`).
- **Design System & Showcase Presentation Surfaces:**
  - `DESIGN.md:4,113,174-185,246-251,316,413-418,494,501-509,558-566,584-597,610-619` `[VERIFIED]` — Defines Linear dark-canvas tokens (`#010102`, `surface-1`..`surface-4`, single chromatic accent `#5e6ad2`, `3-up` desktop / `2-up` tablet / `1-up` mobile card grids, `>= 44px` touch targets); prose and archive lists (`lines 4,113,414-418,494,501-506,558-566`) still reflect only the 4 original distributions.
  - `index.html:20,127,164-302,806-860,1167,1234-1451,1566-1575,1688` `[VERIFIED]` — `og:description` (`"and 4 compiled distributions."`), narrative copy (`"four distinct distributions"`), Polyglot Runner, Live Specimen Tester variant buttons, Terminal Mockup (`v1.0.0`), 4-card Distribution Grid, Config Family `<select>`, Footer label.
  - `web-docs/css/tokens.css:56-62` `[VERIFIED]` — `--font-mono` and `--font-mono-nl` font stack variables.
  - `web-docs/css/typography.css:11-49,676-708` `[VERIFIED]` — 5 `@font-face` declarations (`Sawala Mono` 400, 400i, 600, 700 and `Sawala Mono NL` 400) and `.polyglot-runner__viewport[data-ligatures="nl"]` rules.
  - `web-docs/css/showcase.css:780-800,1290-1315,1674,1687-1690,1702,1777-1779` `[VERIFIED]` — `.specimen-textarea[data-ligature-mode="nl"]` and responsive `.distributions-grid` (`repeat(4, ...)` desktop, `repeat(2, ...)` inside `@media (max-width: 1200px)`, `1fr` inside `@media (max-width: 768px)`). Note: this implemented `1200px` tablet breakpoint differs from `DESIGN.md:611` (`Tablet 1024px`); the drift is pre-existing and intentionally NOT changed in Wave 2.
  - `index.html:1233,1266` and `web-docs/js/distribution-cards.js:2,106,145` `[VERIFIED]` — Code comments / JSDoc still read `"4-Tier"` / `"4-Card"` / `"4 distribution cards"`.
  - `web-docs/pages/distributions.html:10,22,27,91-96,110-200` `[VERIFIED]` — SEO/OG/Twitter descriptions (`"four Sawala Mono distributions"`), 4-distribution badge, 4-column feature matrix, and Weight Ladder copy (`"bundles five full-repertoire Tier A webfonts"` at `lines 197-199`).
  - `web-docs/pages/installation.html:121,222,243,261-268` `[VERIFIED]` — Download prompts, CLI archive note, and "After Installing" summary cards.
  - `web-docs/pages/ligatures.html:91` `[VERIFIED]` — Hero lead states `"55 OpenType default-calt substitutions shipped in Sawala Mono"` without mentioning `Sawala Ligar Mono`.
- **Existing Interactive ESM Controllers:**
  - `web-docs/js/distribution-cards.js:9-142` `[VERIFIED]` — 4-item `DISTRIBUTION_TIERS` registry and `resolveDistributionArchive` / `setDistributionWidthMode`.
  - `web-docs/js/config-generator.js:37,125-166,213-250` `[VERIFIED]` — 4-key `CONFIG_FONT_FAMILIES` registry and `formatEditorConfig` snippet formatter; latent defect at `line 158` attempts `.replace("\"Enable_Ligatures\": true", ...)` which fails to match JetBrains snippet `"Enable ligatures = true"` at `line 37`.
  - `web-docs/js/specimen-tester.js:8,37-43,92-188,253-260` `[VERIFIED]` — `TIER_A_NATIVE_WEIGHTS` (`{400, 600, 700}`), binary `variant` normalization (`"nl" | "standard"`) at `line 98` and in click handler (`line 257`), and status badge logic.
  - `web-docs/js/polyglot-runner.js:311-322` `[VERIFIED]` — Binary `calt` toggle between `"Sawala Mono · calt: 1"` and `"Sawala Mono NL · calt: 0"`.
  - `web-docs/js/glyph-matrix.js:24,385` `[VERIFIED]` — Glyph `y` (`line 385`) omits italic `cursive-serifless`; glyph `0` (`line 24`) still points to stale line `54` instead of `55`.
  - `web-docs/js/terminal-preview.js:24,106,135` `[VERIFIED]` — Mockup strings still reference `v1.0.0`.
- **CI Webfont Compilation Pipeline:**
  - `.github/workflows/build.yml:16-24,80-125` `[VERIFIED]` — Supports `workflow_dispatch` with `variant: SawalaLigarMono`, `format: woff2`, `create_release: false` to produce `WOFF2` webfont binaries.

### 1.3 The Condition (Requirements, Constraints & Invariants)

#### Functional Requirements
- **REQ-001 `[Discovery Ref: Sec 2 & Sec 6]` (Tier A `Sawala Ligar Mono` Webfont Assets & CSS Tokens):**
  - **CI Prerequisite (Option A Locked):** Trigger `.github/workflows/build.yml` (`variant: SawalaLigarMono`, `format: woff2`, `create_release: false`), extract `SawalaLigarMono-Regular.woff2` (`400`, normal) and `SawalaLigarMono-Italic.woff2` (`400`, italic), and commit both files inside `web-docs/fonts/sawala-mono/` prior to `/to-code` & `/to-review` verification closure.
  - Declare matching `@font-face` rules for `"Sawala Ligar Mono"` (`font-weight: 400`, `normal` and `italic`, `font-display: swap`) in `web-docs/css/typography.css`, and register `--font-mono-ligar` in `web-docs/css/tokens.css`.
- **REQ-002 `[Discovery Ref: Sec 3.1]` (Live Specimen Tester 3-Way Family Support):**
  - Extend `web-docs/js/specimen-tester.js` (updating both `applySpecimenState` at `line 98` AND the click handler at `line 257` so `"ligar"` is never coerced back to `"standard"`) and `#specimen` controls in `index.html:806-837` to support a 3-way variant selector: `"standard"` (`Sawala Mono`), `"nl"` (`Sawala Mono NL`), and `"ligar"` (`Sawala Ligar Mono`).
  - Decouple **font family selection** from **OpenType ligation state** using this locked DOM attribute contract:
    - `data-font-variant="standard" | "nl" | "ligar"` → controls **font family only** (`--font-mono` / `--font-mono-nl` / `--font-mono-ligar`).
    - `data-ligature-mode="standard" | "nl"` on `#specimen-textarea` → controls **ligation only** (`calt: 1, liga: 1` for `"standard"` and `"ligar"` families; `calt: 0, liga: 0` strictly for `"nl"`). The value `"ligar"` MUST NEVER be written to `data-ligature-mode`.
    - Existing selector `.specimen-textarea[data-ligature-mode="nl"]` (`showcase.css:795-799`) remains valid without regression.
  - Make `#specimen-tier-badge` reflect true Tier A availability per active family (`Sawala Mono`: native `400, 600, 700`; `Sawala Ligar Mono`: native `400` upright/italic; `Sawala Mono NL`: native `400` upright), labeling all other weight/slope combinations accurately as synthesized (`Tier B`).
- **REQ-003 `[Discovery Ref: Sec 3.1 & Sec 6]` (Polyglot Runner 3-Pill Family Switcher):**
  - *Scope note:* The Discovery Draft listed Polyglot Runner support as optional ("and/or"); this specification deliberately promotes it to mandatory so both primary interactive specimens offer `Sawala Ligar Mono`.
  - Apply the same attribute contract as `REQ-002`: `#polyglot-viewport[data-font-variant]` controls family (`"standard" | "ligar" | "nl"`), while existing `data-ligatures="standard" | "nl"` controls ligation (`typography.css:676-681` remains valid; `"ligar"` MUST NEVER be written to `data-ligatures`).
  - **Locked Control UI (Option B from Clarification Report):** Replace the binary `#polyglot-calt-toggle` button inside `.polyglot-runner__meta` (`index.html:236-245`, `web-docs/js/polyglot-runner.js:311-322`) with a compact **3-button segmented pill group** (`role="group"`, `data-polyglot-variant="standard" | "ligar" | "nl"`) styled with `variant-switcher-tab` (`>= 44px` touch target on mobile, wrapping via `.polyglot-runner__meta` `flex-wrap: wrap` at `typography.css:592`):
    - **`Standard`** (`Sawala Mono`, `calt: 1`, initial `aria-pressed="true"`)
    - **`Ligar`** (`Sawala Ligar Mono`, `calt: 1`, `aria-pressed="false"`)
    - **`NL`** (`Sawala Mono NL`, `calt: 0`, `aria-pressed="false"`)
  - Maintain explicit visible/accessible status indication (`Sawala Mono · calt: 1`, `Sawala Ligar Mono · calt: 1`, `Sawala Mono NL · calt: 0` via `#polyglot-variant-status` or `aria-live="polite"`) and preserve monospace gutter parity.
- **REQ-004 `[Discovery Ref: Sec 3.1]` (6-Distribution Matrix, SEO Metadata & Editorial Parity):**
  - Update hero/section/footer copy (`index.html:127,1241,1688`) and social/SEO metadata (`index.html:20` `og:description`, `web-docs/pages/distributions.html:10,22,27` `meta`/`og`/`twitter` descriptions) from 4 distributions to **6 distributions** (`Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`).
  - Expand `DISTRIBUTION_TIERS` in `web-docs/js/distribution-cards.js` and `#distributions` in `index.html` with cards for **Sawala Ligar Mono** (top row, after `Sawala Mono NL`) and **Sawala Ligar Mono NF** (bottom row, after `Sawala Mono NL NF`), giving both cards CSS `--font-mono-ligar` on `.distribution-card__specimen`.
  - Update `.distributions-grid` in `web-docs/css/showcase.css:1292` on desktop (`> 1200px`) from `repeat(4, minmax(0, 1fr))` to `repeat(3, minmax(0, 1fr))` (yielding two symmetrical 3-card rows aligned with `DESIGN.md:413,610`), keeping the existing `repeat(2, ...)` rule inside `@media (max-width: 1200px)` (`showcase.css:1687-1689`) and `1fr` inside `@media (max-width: 768px)` (`showcase.css:1777-1779`).
  - Update stale code comments / JSDoc in `index.html:1233,1266` and `web-docs/js/distribution-cards.js:2,106,145` from `"4-Tier"` / `"4-Card"` / `"4 distribution cards"` to the 6-distribution wording.
  - Update `web-docs/pages/distributions.html` hero copy, badge (`"6 distributions"`), Weight Ladder webfont summary (`lines 197-199`: **seven** bundled Tier A webfonts — 4 `Sawala Mono` + 1 `Sawala Mono NL` + 2 `Sawala Ligar Mono`), and 7-column comparison `<table>` (1 feature column + 6 distributions) wrapped cleanly inside `.doc-table-wrap` (`overflow-x: auto`) so mobile (`375px`) and tablet (`1024px`) viewports experience `0` page-level horizontal overflow.
  - Update `web-docs/pages/ligatures.html:91` hero lead to note `default-calt` substitutions ship in both **Sawala Mono** and **Sawala Ligar Mono**.
- **REQ-005 `[Discovery Ref: Sec 3.1]` (IDE Configuration Generator & Installation Subpage Parity):**
  - Extend `CONFIG_FONT_FAMILIES` in `web-docs/js/config-generator.js:125-142` and `<select id="config-family-select">` in `index.html:1568-1573` with `"sawala-ligar-mono"` (`familyName: "Sawala Ligar Mono"`, `ligaturesEnabled: true`) and `"sawala-ligar-mono-nf"` (`familyName: "Sawala Ligar Mono NF"`, `ligaturesEnabled: true`).
  - Fix the latent JetBrains ligature substitution mismatch in `web-docs/js/config-generator.js:37,158` (`"Enable ligatures = true"` vs `"\"Enable_Ligatures\": true"`) so `formatEditorConfig` toggles both VS Code (`"editor.fontLigatures": false`) and JetBrains (`Enable ligatures = false`) accurately for NL families while keeping them `true` for `Sawala Mono` / `Sawala Ligar Mono` families.
  - Update `web-docs/pages/installation.html:121,222,243,261-268` so download prompts, CLI instructions, and *"After Installing"* cards explicitly include `Sawala Ligar Mono` and `Sawala Ligar Mono NF`.
- **REQ-006 `[Discovery Ref: Sec 3.1]` (Character Inspector Metadata & Visual Mockup Sync):**
  - Update `web-docs/js/glyph-matrix.js:385` (`y`) to document both `straight-turn-serifless (upright) · cursive-serifless (italic)` and cite `private-build-plans.toml:36,54`, and fix `zero` (`line 24`) citation to `private-build-plans.toml:37,55`.
  - Refresh stale `v1.0.0` version labels in Terminal Mockup (`index.html:1167` and `web-docs/js/terminal-preview.js:24,106,135`) to `v1.1.0` (`SawalaMono-NF-v1.1.0.zip` / `v1.1.0 · TS 5.6`) for temporal consistency.
- **REQ-007 `[Design System Ref: DESIGN.md:4,113,414-566]` (`DESIGN.md` Documentation Parity):**
  - Synchronize `DESIGN.md` (`lines 4, 113, 414-418, 494, 501-506, 558-566`) so the canonical design manifest reflects all 6 distributions (`Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`), includes `"Sawala Ligar Mono"` in `typography.mono` notes, aligns `.distributions-grid` documentation to the 3-up (`3×2`) desktop card grid rule (`DESIGN.md:413`), and lists `SawalaLigarMono-${SUFFIX}.zip`, `SawalaLigarMono-NF-${TARGET_TAG}.zip`, and `SawalaLigarMono-Extended-NF-${TARGET_TAG}.zip`.

#### Constraints & Invariants
- **CON-001 (Zero-Build Static GitHub Pages Compatibility):** Everything remains pure vanilla HTML, CSS, and ES modules staged untouched by `.github/workflows/pages.yml` (`index.html`, `web-docs/**`, `.nojekyll`, `sawala-mono-hero-img.jpg`). No npm build/bundler step.
- **CON-002 (Lean Webfont Footprint & Non-Blocking Paint):** New bundled WOFF2 files are restricted to `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2`, bounded by `[ASSUMPTION-004]` (`<= 650 KB` / `665,600` bytes each, `<= 1.25 MB` / `1,310,720` bytes combined). Existing `<link rel="preload">` tags in `index.html:29-32` MUST NOT add additional blocking preload requests for `SawalaLigarMono`; `Sawala Ligar Mono` loads lazily/on-demand when its `@font-face` family is activated in CSS, preserving `CLS = 0` via `font-display: swap` and system monospace metrics fallback.
- **CON-003 (Strict CSP, Token Purity & Zero Inline Styles):** Subpages (`web-docs/pages/*.html`) preserve strict `'self'` CSP; zero `'unsafe-inline'`, zero inline `<style>` or `style="..."` HTML attributes in markup; zero hardcoded hex colors outside `tokens.css` (and existing verified prism theme). Note existing Google Fonts comparison CSP stays scoped exclusively to `index.html` (`fast-track-mini-plan-2026-11-16.md`).
- **CON-004 (Monorepo Seam Isolation & Clean Quality Ratchets):** Zero modifications to `packages/*`, `params/*`, `tools/*`, `build-plans.toml`, `verdafile.mjs`, `biome.json`, or `package.json` (`ADR-0001`). Preserve clean `node --check` across all `web-docs/js/*.js` modules and valid Biome ceiling per `docs/ARCHITECTURE.md` §8.3.
- **CON-005 (Accessibility WCAG 2.1 AA & `CONTEXT.md` Vocabulary):** Maintain `>= 4.5:1` contrast, `2px solid var(--primary-focus)` focus rings, `>= 44px` mobile touch targets, valid ARIA `aria-pressed` / `aria-live="polite"`, responsive horizontal overflow `0` at `375px` and `1440px`, and strict use of canonical names from `CONTEXT.md`.
- **CON-006 (`DESIGN.md` Linear Aesthetic & Visual Hierarchy Invariant):**
  - Strictly obey the **single chromatic accent** rule (`{colors.primary}` `#5e6ad2` for primary CTA/focus/brand mark only; `{colors.semantic-success}` `#27a644` for status/copy success only; zero secondary marketing accent colors for `Sawala Ligar Mono` per `DESIGN.md:316,584,594-595`).
  - Keep **only one** flagship featured card (`Sawala Mono` using `distribution-card-featured` on `surface-2` + `hairline-strong`); `Sawala Ligar Mono` and `Sawala Ligar Mono NF` MUST use standard `distribution-card` (`surface-1`, `rounded.lg` `12px`, `24px` padding, `1px hairline`, zero atmospheric gradients or spotlight cards per `DESIGN.md:174-185,507-509,596`).
  - Keep CTAs at `rounded.md` (`8px`, never pill per `DESIGN.md:589,597`) and variant switcher buttons using `variant-switcher-tab` (`rounded.pill`, `>= 44px` on touch viewports per `DESIGN.md:246-251,617-619`).

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)
- **Is the condition sufficient to determine the unknown?** Yes. Every visual surface (`index.html`, `distributions.html`, `installation.html`, `ligatures.html`, `DESIGN.md`), token/font file (`tokens.css`, `typography.css`, `showcase.css`), JS controller (`distribution-cards.js`, `config-generator.js`, `specimen-tester.js`, `polyglot-runner.js`, `glyph-matrix.js`, `terminal-preview.js`), and binary artifact dependency (`SawalaLigarMono-{Regular,Italic}.woff2`) is bounded and named.
- **Is it insufficient?** No. All binary prerequisites (`Option A` CI `WOFF2` build prior to `/to-code` verification closure), UI control ergonomics (`Option B` segmented pills), CSS breakpoints, DOM attributes, and file byte limits are now locked and sufficient.
- **Is it redundant or contradictory?** No. Separating `data-font-variant` / `data-ligature-mode` resolves the binary assumption where `nl` previously overloaded both ligatures and family name.
- **Did you use ALL the data?** Yes. All 6 `CONTEXT.md` distributions, italic `y` commit `caa39a8`, `c85a7d7` Ligar adjustments, `DESIGN.md` visual rules, `ADR-0001`/`ADR-0002`, and CSS breakpoints are incorporated.
- **Did you use the WHOLE condition?** Yes. Payload cap, CSP isolation, accessibility, `DESIGN.md` token hierarchy, zero-build Pages deployment, and monorepo isolation are mapped cleanly to `AC-001`–`AC-008`.

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)
- **Hypothesis 1 (Assume `SawalaLigarMono-Regular.woff2` fails to download or is absent offline):**
  - *Contradiction & Safe Rejection:* If `--font-mono-ligar` has no fallback stack, text becomes invisible (`FOIT`) or collapses to proportional sans-serif. Including `"Sawala Ligar Mono", "Iosevka Sawala Ligar Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` with `font-display: swap` guarantees legible fallback rendering at `0` layout crash.
- **Hypothesis 2 (Assume a user passes an unknown `familyVariantKey` or `variant` string to `formatEditorConfig` / `applySpecimenState`):**
  - *Contradiction & Safe Rejection:* Unvalidated lookup could emit `"undefined"` into IDE JSON snippets or break textarea styles. Type guards fall back deterministically to `"sawala-mono"` (`"standard"`) without throwing runtime exceptions.
- **Hypothesis 3 (Assume `"ligar"` mode reuses `data-ligatures="nl"` or disables `calt` in `specimen-tester.js`):**
  - *Contradiction & Safe Rejection:* Because **Sawala Ligar Mono** uses `default-calt` (`private-build-plans.toml:162-163`), conflating non-standard with `noLigation` would render discrete operators (`= >`) instead of ligatures (`=>`). Explicit enumeration guarantees `calt: 1, liga: 1` for both `"standard"` and `"ligar"`, and `calt: 0, liga: 0` strictly for `"nl"`.

### 1.6 `DESIGN.md` Compliance & Component Token Binding

| UI Surface / Component | Canonical `DESIGN.md` Anchor | Enforced Token & Layout Contract |
| :--- | :--- | :--- |
| **Distribution Cards (`Sawala Ligar Mono`, `Sawala Ligar Mono NF`)** | `DESIGN.md:174-185,507-509,594-596` | Standard `distribution-card` (`--surface-1` `#0f1011`, `1px solid --hairline` `#23252a`, `--radius-lg` `12px`, `--space-lg` `24px` padding, zero gradients/spotlight). Only `Sawala Mono` remains `distribution-card-featured` (`--surface-2`). |
| **Distribution Grid Breakpoints** | `DESIGN.md:413,607-613` + `showcase.css:1674,1702` | Desktop `> 1200px`: `repeat(3, minmax(0, 1fr))` (`3×2` symmetrical rows); Tablet `<= 1200px`: `repeat(2, minmax(0, 1fr))` (`2×3`); Mobile `<= 768px`: `1fr`. The implemented `1200px` breakpoint (vs `DESIGN.md:611` `1024px`) is a pre-existing drift left unchanged. |
| **Variant Switcher Pills (Specimen & Polyglot)** | `DESIGN.md:246-251,494-497,618` | `variant-switcher-tab` (`--radius-pill`, `6px 14px`, default `--canvas` + `--ink-subtle`, selected `--surface-2` + `--ink`, `>= 44px` tap target on touch viewports). |
| **Primary / Secondary CTAs** | `DESIGN.md:140-161,584,589,597` | `--radius-md` (`8px`, never pill); `--primary` `#5e6ad2` strictly reserved for flagship CTA, focus rings, and brand mark (no second chromatic accent color). |
| **7-Column Distributions Matrix Table** | `DESIGN.md:412,607-613` | Wrapped inside `.doc-table-wrap` (`overflow-x: auto`) so horizontal scrolling stays contained inside the table container with `0` page-level overflow at `375px` and `1024px`. |

---

## 2. Ubiquitous Language & Domain Glossary (`CONTEXT.md`)

All copy, comments, UI labels, and technical identifiers MUST adhere strictly to [`CONTEXT.md`](../../CONTEXT.md):

- **Sawala Mono:** The baseline monospace coding typeface distribution with standard earless/toothless glyph geometry and contextual programming ligatures.  
  _Avoid_: Standard Sawala, Sawala Default
- **Sawala Mono NL:** The no-ligatures monospace coding typeface distribution preserving strict literal operator symbol separation.  
  _Avoid_: Sawala Unligated, Sawala Without Ligatures
- **Sawala Ligar Mono:** The expressive selective-curly monospace coding typeface distribution inspired by the Sundanese word *ligar* (blooming or opening gracefully) with contextual programming ligatures.  
  _Avoid_: Sawala Curly, Sawala Mono Curly, Sawala Ligar
- **Sawala Mono NF:** The Nerd Font patched distribution of Sawala Mono containing developer and Powerline icon glyphs.  
  _Avoid_: Sawala Nerd Font, Sawala Icons
- **Sawala Mono NL NF:** The Nerd Font patched distribution of Sawala Mono NL combining unligated operator glyphs with developer icons.  
  _Avoid_: Sawala Unligated Nerd Font
- **Sawala Ligar Mono NF:** The Nerd Font patched distribution of Sawala Ligar Mono combining selective-curly letterforms and programming ligatures with developer icons.  
  _Avoid_: Sawala Ligar NF, Sawala Curly NF
- **Build Plan ID:** The exact alphanumeric section key (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) identifying a font family build plan and its release archive prefix.  
  _Avoid_: Family Display Name, Variant Label

---

## 3. Assumptions & Resolved Clarifications

*All clarification items from [`docs/audit/web-showcase-sawala-ligar-sync-spec-clarification.md`](../audit/web-showcase-sawala-ligar-sync-spec-clarification.md) (`Iterations 1–3`) are resolved below:*

> [!NOTE] [ASSUMPTION-001 — RESOLVED: Option A (CI `WOFF2` First)] Acquisition of `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2`
> *Decision:* Because local Windows host lacks `node_modules` and `docker` (`PLAN-CLARIFY-001`), the user triggers `.github/workflows/build.yml` (`variant: SawalaLigarMono`, `format: woff2`, `create_release: false`) and places `SawalaLigarMono-Regular.woff2` + `SawalaLigarMono-Italic.woff2` into `web-docs/fonts/sawala-mono/` **before closing `/to-code` & `/to-review`**. This guarantees `AC-001` (`<= 650 KB` / `<= 1.25 MB`) and live browser WebFont rendering pass cleanly without `BLOCKED ⚠️` deferrals.

> [!NOTE] [ASSUMPTION-002 — RESOLVED: Accepted] On-Demand Loading Without Additional `<link rel="preload">` Tags
> *Decision:* Keep `index.html:29-32` preloads restricted to the 4 core `SawalaMono` weights (~2.04 MB total). Declare `"Sawala Ligar Mono"` `@font-face` (`font-display: swap`) in `web-docs/css/typography.css` without extra `<link rel="preload">` tags; browsers load the font on-demand when `.distribution-card__specimen--ligar` or `"ligar"` specimen views are active.

> [!NOTE] [ASSUMPTION-003 — RESOLVED: Option B] Polyglot Runner Control UX (3 Compact Segmented Pills)
> *Decision:* Replace `#polyglot-calt-toggle` (`index.html:236-245`, `polyglot-runner.js:311-322`) with a compact 3-button segmented pill group (`Standard` | `Ligar` | `NL`, `[data-polyglot-variant="standard" | "ligar" | "nl"]`) using `variant-switcher-tab` and binary `aria-pressed` per button inside `.polyglot-runner__meta` (`flex-wrap: wrap`, `>= 44px` mobile tap height). Enables 1-click direct comparison and crisp WCAG screen-reader semantics.

> [!WARNING] [ASSUMPTION-004]: Provisional Size Threshold for `Sawala Ligar Mono` WOFF2 Binaries
> *Context:* Pending execution of the CI `WOFF2` build (`[ASSUMPTION-001]`), actual `.woff2` sizes have not yet been measured on disk.  
> *Decision (`Accepted`):* Enforce `<= 650 KB` (`665,600` bytes) per `.woff2` file and `<= 1.25 MB` (`1,310,720` bytes) combined for `SawalaLigarMono-Regular.woff2` + `SawalaLigarMono-Italic.woff2`, calibrated against existing `SawalaMono-Regular.woff2` (`~509 KB`) + `SawalaMono-Italic.woff2` (`~564 KB`) (`~1.07 MB` combined).  
> *Contingency:* If CI outputs exceed `650 KB` / `1.25 MB`, investigate `--woff2` subsetting or escalate before acceptance.

---

## 4. Setting Up Equations & Expressive Notation (Pólya, p. 134–141)

- **Type-Driven Domain Invariants:**
  - `ShowcaseFontVariant = "standard" | "nl" | "ligar"` — Makes invalid font states unrepresentable across Live Specimen Tester and Polyglot Runner.
  - `ConfigFamilyId = "sawala-mono" | "sawala-mono-nl" | "sawala-ligar-mono" | "sawala-mono-nf" | "sawala-mono-nl-nf" | "sawala-ligar-mono-nf"` — Exact 6-entry union for Config Generator and Distribution Cards.
  - **Ligation Derivation Formula:**  
    `caltEnabled(variant) = (variant !== "nl")`  
    `cssFontToken(variant) = { standard: "var(--font-mono)", nl: "var(--font-mono-nl)", ligar: "var(--font-mono-ligar)" }[variant]`

### 4.1 Data Transfer Objects (DTOs) & JavaScript Contracts

```typescript
export type ShowcaseFontVariant = "standard" | "nl" | "ligar";
export type SpecimenSlope = "upright" | "italic";

export interface SpecimenStateDTO {
	readonly fontSize: number; // clamped [12, 48]
	readonly fontWeight: number; // stepped [100..900]
	readonly lineHeight: number; // clamped [1.2, 2.0]
	readonly slope: SpecimenSlope;
	readonly variant: ShowcaseFontVariant;
}

export type ConfigFamilyId =
	| "sawala-mono"
	| "sawala-mono-nl"
	| "sawala-ligar-mono"
	| "sawala-mono-nf"
	| "sawala-mono-nl-nf"
	| "sawala-ligar-mono-nf";

export interface ConfigFamilyMetaDTO {
	readonly familyName: string;
	readonly ligaturesEnabled: boolean;
}

export interface DistributionTierDTO {
	readonly id: ConfigFamilyId;
	readonly name: string;
	readonly badge: string;
	readonly subtitle: string;
	readonly description: string;
	readonly hasLigatures: boolean;
	readonly hasNerdFont: boolean;
	readonly recommendedFor: string;
	readonly archiveFilename: string;
	readonly extendedArchiveFilename: string;
	readonly downloadUrl: string;
	readonly extendedDownloadUrl: string;
	readonly isFeatured: boolean;
	readonly specimenPreview: string;
}
```

- **Tier-A Availability Predicate (`specimen-tester.js`):**
  ```javascript
  export const TIER_A_WEIGHTS_BY_VARIANT = Object.freeze({
    standard: Object.freeze({ upright: new Set([400, 600, 700]), italic: new Set([400]) }),
    nl: Object.freeze({ upright: new Set([400]), italic: new Set() }),
    ligar: Object.freeze({ upright: new Set([400]), italic: new Set([400]) })
  });
  ```
  *(Rationale: Replaces the prior weight-only `TIER_A_NATIVE_WEIGHTS` set with a `(variant, slope, weight)` lookup so `#specimen-tier-badge` accurately reports native Tier A WOFF2 coverage — including `Sawala Ligar Mono` 400 upright & italic — vs browser-synthesized Tier B weights.)*

### 4.2 Asset Manifest & CSS Layer Strategy
- **New Font Assets (`web-docs/fonts/sawala-mono/`):**
  - `SawalaLigarMono-Regular.woff2` (`@font-face` `font-family: "Sawala Ligar Mono"; font-style: normal; font-weight: 400;`)
  - `SawalaLigarMono-Italic.woff2` (`@font-face` `font-family: "Sawala Ligar Mono"; font-style: italic; font-weight: 400;`)
- **CSS Custom Property & Selector Binding:**
  - `tokens.css`: `--font-mono-ligar: "Sawala Ligar Mono", "Iosevka Sawala Ligar Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;`
  - `showcase.css`: `.specimen-textarea[data-font-variant="ligar"]` & `.distribution-card__specimen--ligar` apply `font-family: var(--font-mono-ligar);` with `calt: 1`.
  - `typography.css`: `.polyglot-runner__viewport[data-font-variant="ligar"] code, .polyglot-runner__viewport[data-font-variant="ligar"] pre` apply `font-family: var(--font-mono-ligar); font-variant-ligatures: normal; font-feature-settings: "calt" 1, "liga" 1;`.

### 4.3 Error Contract & 5 UI States Matrix
- **Invalid State Guard:** Unknown variant/family keys default safely to `"standard"` / `"sawala-mono"` without uncaught exceptions or empty CSS `font-family`.
- **5 UI States Matrix:**
  - **Loading:** While `SawalaLigarMono-*.woff2` downloads upon first activation, `font-display: swap` renders monospace system fallback metrics cleanly with `0` layout shift.
  - **Empty:** Specimen textarea clears user text down to non-blocking `WATERMARK_PLACEHOLDER` (`specimen-tester.js:22-23`), never collapsing editor height.
  - **Error:** If clipboard API is denied in Config Generator, `copyConfigWithFallback` reveals `#config-fallback-textarea` with pre-selected text (`"Press Ctrl+C to copy"`). If `WOFF2` asset returns 404/network failure, system fallback remains readable and `document.fonts` check does not throw.
  - **Partial:** When selecting `Sawala Ligar Mono` at weights != `400` (e.g., `600` or `700`), `#specimen-tier-badge` displays `"Tier B Weight (<weight> · Synthesized from Core)"` (`REQ-002`).
  - **Populated:** All 6 distribution cards render in balanced `3×2` desktop grid (`> 1200px`), `2×3` tablet grid (`<= 1200px`), and `1×6` mobile stack (`<= 768px`), all 6 options work in Config Generator, and Specimen / Polyglot render crisp `Sawala Ligar Mono` upright + italic with `calt: 1`, full keyboard focusability, and `aria-pressed` / `aria-selected` accuracy.

### 4.4 Observability & SLIs
- Static client showcase emits **zero network telemetry** (`CON-003`). Runtime DOM state transitions remain inspectable via deterministic attributes (`data-font-variant`, `data-ligature-mode`, `data-ligatures`, `#specimen-tier-badge`, `#specimen-status-summary`, and `#config-copy-btn[data-copied]`).

---

## 5. Clean Architecture Seams & Component Boundaries

> [!NOTE]
> **Architectural Pragmatism Check:** This showcase is a zero-build static web documentation frontend cleanly decoupled from the Iosevka Node/Verda compiler packages (`CON-004`). It applies modular ESM single-responsibility separation without heavyweight framework overhead.

```text
[ Asset & Token Layer (CSS) ]
   ├── web-docs/fonts/sawala-mono/ (+ SawalaLigarMono-Regular.woff2, Italic.woff2)
   ├── web-docs/css/tokens.css (+ --font-mono-ligar)
   ├── web-docs/css/typography.css (+ @font-face & polyglot ligar selector)
   └── web-docs/css/showcase.css (+ 3x2 .distributions-grid & specimen-ligar hook)
          │
          ▼
[ Registry & Pure Formatter Layer (ESM Data / Pure Functions) ]
   ├── web-docs/js/distribution-cards.js (DISTRIBUTION_TIERS 4 -> 6)
   ├── web-docs/js/config-generator.js (CONFIG_FONT_FAMILIES 4 -> 6, Enable ligatures fix)
   ├── web-docs/js/glyph-matrix.js (y italic variantName + zero TOML line sync)
   └── web-docs/js/terminal-preview.js (v1.1.0 mockup refresh)
          │
          ▼
[ Presentation, Docs & Design Manifest (HTML + DESIGN.md) ]
   ├── web-docs/js/specimen-tester.js (3-way standard | nl | ligar + Tier A matrix)
   ├── web-docs/js/polyglot-runner.js (3-mode variant preview)
   ├── index.html (SEO og:description, copy, 3-btn specimen bar, 6 cards, 6 config options)
   ├── web-docs/pages/{distributions,installation,ligatures}.html (7-col table, 7-WOFF2 prose, install & calt notes)
   └── DESIGN.md (6-distribution manifest, typography.mono & archive conventions sync)
```

---

## 6. Acceptance Criteria (Given-When-Then)

- **AC-001 (Webfont Asset Binding & Non-Preload Budget for REQ-001, CON-002):**  
  *Given* `web-docs/fonts/sawala-mono/` contains `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2`,  
  *When* `web-docs/css/typography.css`, `web-docs/css/tokens.css`, and file sizes (`[ASSUMPTION-004]`) are verified,  
  *Then* `@font-face` rules for `"Sawala Ligar Mono"` (`400 normal` & `400 italic`, `font-display: swap`) and `--font-mono-ligar` resolve cleanly to existing relative file paths, each `.woff2` is `<= 665,600` bytes (`<= 1,310,720` bytes combined), and `index.html` adds zero new `<link rel="preload">` tags for `SawalaLigarMono`.

- **AC-002 (Live Specimen 3-Way Variant & Tier Badge for REQ-002):**  
  *Given* the Live Type Specimen Tester (`#specimen`) is rendered,  
  *When* a user clicks the `"Sawala Ligar Mono"` variant button (`data-specimen-variant="ligar"`), toggles `Italic 9.4°`, and switches weight between `400` and `700`,  
  *Then* `applySpecimenState` sets `data-font-variant="ligar"` while keeping `data-ligature-mode="standard"` (`"ligar"` never written to `data-ligature-mode`), maintains `fontFeatureSettings = "\"calt\" 1, \"liga\" 1"`, updates `#specimen-status-summary` to `"Sawala Ligar Mono · ..."`, and updates `#specimen-tier-badge` to `Tier A Core WOFF2 (400)` at weight `400` vs `Tier B Weight (700 · Synthesized from Core)` at weight `700`.

- **AC-003 (Polyglot Runner 3-Pill Variant Switcher for REQ-003):**  
  *Given* `#polyglot-runner` is visible on `index.html`,  
  *When* the user clicks the `Standard`, `Ligar`, or `NL` segmented pill buttons (`[data-polyglot-variant="standard" | "ligar" | "nl"]`),  
  *Then* `#polyglot-viewport` sets `data-font-variant` (`"standard" | "ligar" | "nl"`) and `data-ligatures` (`"standard"` for `Sawala Mono` / `Sawala Ligar Mono`, `"nl"` strictly for `Sawala Mono NL` — never `"ligar"`), sets `aria-pressed="true"` exclusively on the active pill (`"false"` on siblings), applies `--font-mono` (`calt: 1`), `--font-mono-ligar` (`calt: 1`), and `--font-mono-nl` (`calt: 0`), updates the accessible variant status indicator cleanly, and wraps without horizontal overflow at `375px` mobile.

- **AC-004 (Balanced 6-Distribution Matrix, SEO Metadata & Subpage Parity for REQ-004):**  
  *Given* `index.html`, `web-docs/pages/distributions.html`, and `web-docs/pages/ligatures.html` are loaded across desktop (`1440px`), tablet (`1024px`), and mobile (`375px`) viewports,  
  *When* the Distributions sections and page `<meta>` tags are inspected,  
  *Then* `index.html:20,127,1241,1688` and `distributions.html:10,22,27,91-93` reflect **6 distributions**, `DISTRIBUTION_TIERS` and DOM contain all 6 cards (`Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`), `.distributions-grid` uses `repeat(3, minmax(0, 1fr))` on desktop, width-scope toggling updates all 6 cards including `SawalaLigarMono-*.zip` / `SawalaLigarMono-NF-*.zip`, `distributions.html` renders all 7 table columns inside `.doc-table-wrap` with `0` page-level horizontal overflow and updates Weight Ladder copy (`lines 197-199`) to **seven** Tier A webfonts, and `ligatures.html:91` references both `Sawala Mono` and `Sawala Ligar Mono`.

- **AC-005 (6-Family IDE Config Generator & Installation Guide for REQ-005):**  
  *Given* `#config-family-select` and `web-docs/pages/installation.html` are inspected,  
  *When* all 6 family keys (`sawala-mono`, `sawala-mono-nl`, `sawala-ligar-mono`, `sawala-mono-nf`, `sawala-mono-nl-nf`, `sawala-ligar-mono-nf`) are tested across all 7 editor tabs (VS Code, JetBrains IDEs, Neovim, Alacritty, Kitty, WezTerm, Windows Terminal),  
  *Then* `formatEditorConfig` substitutes the exact canonical family name without string corruption, sets `"editor.fontLigatures": false` AND `Enable ligatures = false` (fixing `config-generator.js:37,158`) for `sawala-mono-nl` / `sawala-mono-nl-nf` while keeping both `true` for `sawala-ligar-mono` / `sawala-ligar-mono-nf`, and `installation.html` documents `Sawala Ligar Mono` & `Sawala Ligar Mono NF` archive/family names.

- **AC-006 (Character Inspector & Terminal Mockup Metadata Sync for REQ-006):**  
  *Given* `web-docs/js/glyph-matrix.js` and `web-docs/js/terminal-preview.js` are loaded,  
  *When* glyph `'y'` (`U+0079`) and `'0'` (`U+0030`) are inspected and the Terminal Mockup renders,  
  *Then* `'y'` displays `"straight-turn-serifless (upright) · cursive-serifless (italic)"` (`private-build-plans.toml:36,54`), `'0'` cites `private-build-plans.toml:37,55`, and terminal release mockup strings reflect `v1.1.0`.

- **AC-007 (CSP, Zero-Inline-Style & Static ESM Quality Gates for CON-001..CON-005):**  
  *Given* all modifications are complete,  
  *When* running `node --check` on every file in `web-docs/js/*.js`, CSP / inline-style / internal link validation on `index.html` and `web-docs/pages/*.html`, and `git diff --name-only`,  
  *Then* zero JS syntax errors occur, zero inline `<style>` / `style="..."` / `CON-003` violations exist, zero files inside `packages/*`, `params/*`, `tools/*`, `build-plans.toml`, or `verdafile.mjs` are modified (`ADR-0001`), and all canonical terminology checks against `CONTEXT.md` pass.

- **AC-008 (`DESIGN.md` Sync & Linear Visual Hierarchy Audit for REQ-007, CON-006):**  
  *Given* `DESIGN.md`, `index.html`, and `web-docs/css/showcase.css` are inspected after implementation,  
  *When* verifying visual design token adherence and manifest parity,  
  *Then* `DESIGN.md` reflects all 6 distributions and `SawalaLigarMono` archive naming conventions, exactly **1** card (`Sawala Mono`) carries `distribution-card-featured`, `Sawala Ligar Mono` & `Sawala Ligar Mono NF` cards use standard `distribution-card` (`--surface-1`, `--radius-lg`, zero secondary chromatic accent colors or gradients), and all CTAs/variant pills obey `DESIGN.md` radii and `>= 44px` touch target constraints.

### 6.1 Value Sourcing & Positive Input Coverage Table

| Required Output / Computed / Displayed Value | AC Ref | Named Source (`Input DTO` / `File [file:line]` / `Derivation` / `Config`) | Boundary / Edge Variation |
| :--- | :---: | :--- | :--- |
| `Sawala Ligar Mono` upright & italic `@font-face` source URLs | `AC-001` | Assets: `web-docs/fonts/sawala-mono/SawalaLigarMono-{Regular,Italic}.woff2` (built via `.github/workflows/build.yml` `format: woff2`) | Missing/404 offline asset falls back cleanly to system monospace stack |
| `--font-mono-ligar` CSS stack | `AC-001`, `AC-002` | Config constant in `web-docs/css/tokens.css` | Quoted family name + system monospace fallback |
| Active `SpecimenStateDTO.variant` | `AC-002` | Input UI `[data-specimen-variant]` (`"standard" \| "nl" \| "ligar"`) validated in `applySpecimenState` | Invalid string (e.g. `"unknown"`, `null`) normalizes to `"standard"` |
| Specimen `#specimen-tier-badge` text | `AC-002` | Derived from `TIER_A_WEIGHTS_BY_VARIANT[variant][slope].has(fontWeight)` | Weight `400` vs `600`/`700` across `standard`, `nl`, and `ligar` |
| 6 distribution card metadata, SEO tags & Weight Ladder count (`7`) | `AC-004` | Registry `DISTRIBUTION_TIERS` (`distribution-cards.js`), `CONTEXT.md`, and bundled WOFF2 count (`4 + 1 + 2 = 7`) | Width toggle `"normal"` vs `"semi-extended"`; `375px` / `1024px` 7-column table scroll containment |
| Formatted IDE config snippet string & JetBrains ligature flag | `AC-005` | Registry `CONFIG_FONT_FAMILIES` + `EDITOR_CONFIG_SNIPPETS` (`config-generator.js:37,154-159`) | Selection across 6 families × 7 editors, verifying `Enable ligatures = false` for NL vs `true` for Ligar |
| Glyph `'y'` & `'0'` `variantName` / `tomlSource` | `AC-006` | `private-build-plans.toml:36-37,54-55` `[VERIFIED]` | Upright vs italic label clarity + valid TOML line anchor |
| `DESIGN.md` distribution list & visual token constraints | `AC-008` | `DESIGN.md:4,113,174-185,413-418,494-509,558-566,584-619` `[VERIFIED]` | Single chromatic accent (`#5e6ad2`), single featured card, `>= 44px` touch targets |

---

## 7. Testing Strategy & Dimensional Bounds

- **Testing Seam:** Modular browser-agnostic ESM exports (`applySpecimenState`, `formatEditorConfig`, `resolveDistributionArchive`, `setDistributionWidthMode`, `selectLanguage`) tested via Node.js mock/DOM harnesses plus static HTML/CSS/CSP/link verification scripts.
- **Dimension Checks:**
  - `fontSize` clamped `[12, 48]`, `fontWeight` stepped `[100..900]`, `lineHeight` clamped `[1.2, 2.0]`.
  - Desktop grid `3` columns (`> 1200px`), tablet `2` columns (`<= 1200px`), mobile `1` column (`<= 768px`), zero horizontal overflow at `375px` and `1440px`.
  - New `.woff2` files must satisfy `[ASSUMPTION-004]`: each file `<= 650 KB` (`665,600` bytes) and combined `<= 1.25 MB` (`1,310,720` bytes); exact sizes recorded upon CI artifact extraction.
- **Extreme Limiting Cases:**
  - Unknown `variant` / `familyVariantKey` fallback to `"standard"` / `"sawala-mono"`.
  - Empty specimen textarea retains non-collapsing `placeholder`.
  - All 6 distribution names verified against `CONTEXT.md` `_Avoid_` blacklist via regex assertion.

---

## 8. Architectural Decision Records

- Existing [ADR-0001: Retain build-plans and tools](../adr/0001-retain-build-plans-and-tools.md) and [ADR-0002: Standalone Nerd Font Patcher](../adr/0002-standalone-nerd-font-patcher.md) remain respected and unmodified. No new ADR is required because Wave 2 strictly extends the established zero-build GitHub Pages showcase seam (`sawala-mono-showcase-web-spec.md`).
