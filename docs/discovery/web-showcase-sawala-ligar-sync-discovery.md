# 🔭 Project Discovery Draft: Web Showcase & Documentation Sync for Sawala Ligar Mono (Wave 2)

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `Iosevka (Sawala Mono)` (`index.html`, `web-docs/`)  
**Status:** **Approved for Spec (Option B Selected)**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable-->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** With release `v1.1.0-release19112026`, the Sawala Mono family expanded from four distributions to six (**Sawala Mono**, **Sawala Mono NL**, **Sawala Ligar Mono**, **Sawala Mono NF**, **Sawala Mono NL NF**, and **Sawala Ligar Mono NF**), alongside italic glyph refinements (`y = "cursive-serifless"` across baseline plans `[VERIFIED: private-build-plans.toml:54,127]` and tuned **Sawala Ligar Mono** italic variants `[VERIFIED: private-build-plans.toml:199-229]`). However, the static documentation site ([index.html](../../index.html) and [web-docs/](../../web-docs)) still represents only the original four-distribution `v1.0.0` lineup, lacks WebFont (`WOFF2`) previews for **Sawala Ligar Mono**, omits **Sawala Ligar Mono** and **Sawala Ligar Mono NF** from the distribution matrix and IDE config generator, and contains minor metadata drift in the Character Inspector.
- **Business Value & Why Now:**
  - Aligns the live GitHub Pages showcase (`iosevka-mayukai.github.io/sawala-mono-dev`) with `v1.1.0-release19112026` and [README.md](../../README.md).
  - Enables prospective users to visually evaluate **Sawala Ligar Mono**'s selective-curly upright and cursive italic forms directly in the browser before downloading ~348 MB desktop archives.
- **Target Persona & Users:** Developers evaluating **Sawala Ligar Mono** vs **Sawala Mono** for IDEs and terminals, as well as existing users copying editor configurations or reading technical distribution/installation docs.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | An updated, zero-build static web showcase & documentation suite (**Option B**) integrating **Sawala Ligar Mono** and **Sawala Ligar Mono NF** across copy, 6-card distribution matrix, subpages, IDE config generator, live `WOFF2` preview playgrounds (`Regular` + `Italic`), and synchronized glyph metadata. |
| **Known Data** | Existing static showcase ([index.html](../../index.html), `web-docs/css/*`, `web-docs/js/*`, `web-docs/pages/*`), 5 bundled Tier A `WOFF2` assets (`web-docs/fonts/sawala-mono/`), ground-truth font plans in `private-build-plans.toml`, canonical glossary in `CONTEXT.md`, and CI `woff2` compiler pipeline in `.github/workflows/build.yml`. |
| **The Conditions & Invariants** | 1. **Engine Isolation:** Zero edits to upstream font engine files (`packages/*`, `verdafile.mjs`, `params/*`) or CI build/patch workflows unless strictly generating `WOFF2` artifacts.<br>2. **Payload Budget & Performance:** Limit new bundled webfont weight to minimal Tier A `SawalaLigarMono` `WOFF2` assets (`Regular` + `Italic`, ~1 MB combined) rather than full 36-weight packs; use `font-display: swap` and avoid render-blocking preload bloat.<br>3. **Strict Static CSP & Zero Build:** Maintain pure vanilla ESM modules, Design System tokens (`web-docs/css/tokens.css`), and strict `'self'` CSP across `web-docs/pages/*` (`CON-006`).<br>4. **Canonical Terminology (`CONTEXT.md`):** Use only official distribution names (`Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`). |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

- **Presentation & Content Entrypoints (`index.html`, `web-docs/pages/*.html`):**
  - Hero & copy still state *"four distinct distributions"* (`[VERIFIED: index.html:127]`), *"Four purpose-built packages"* (`[VERIFIED: index.html:1241]`), and footer label `"4-Tier Distributions"` (`[VERIFIED: index.html:1688]`).
  - Distributions grid renders 4 cards (`[VERIFIED: index.html:1267-1451]`), and IDE Config Generator `<select id="config-family-select">` exposes only 4 `<option>` values (`[VERIFIED: index.html:1568-1573]`).
  - Subpage `web-docs/pages/distributions.html` states `"4 distributions"` and renders a 4-column comparison matrix (`[VERIFIED: web-docs/pages/distributions.html:91-93,113-186]`).
  - Subpage `web-docs/pages/installation.html` lists only standard, NL, NF, and NL NF in CLI steps and *"After Installing"* cards (`[VERIFIED: web-docs/pages/installation.html:222,243,261-268]`).
- **Styling & Webfont Bindings (`web-docs/css/`):**
  - `web-docs/css/typography.css:11-49` (`[VERIFIED]`) declares only 5 `@font-face` rules (`Sawala Mono` 400, 400i, 600, 700 and `Sawala Mono NL` 400).
  - `web-docs/css/tokens.css:56-61` (`[VERIFIED]`) defines `--font-mono` and `--font-mono-nl`, with no `--font-mono-ligar` token.
  - `web-docs/css/showcase.css:1290-1295` (`[VERIFIED]`) sets `.distributions-grid` to `repeat(4, minmax(0, 1fr))` on desktop and `repeat(2, minmax(0, 1fr))` at tablet breakpoint (`[VERIFIED: web-docs/css/showcase.css:1687-1689]`). Adding 2 cards to a 4-column desktop grid would produce an unbalanced 4 + 2 orphan row unless updated to `repeat(3, minmax(0, 1fr))`.
- **Interactive JavaScript Modules (`web-docs/js/`):**
  - `distribution-cards.js:9-78` (`[VERIFIED]`): `DISTRIBUTION_TIERS` array hardcodes 4 tiers; however `setDistributionWidthMode` (`lines 111-142`) is already data-driven via `[data-distribution-card]` attributes.
  - `config-generator.js:125-166` (`[VERIFIED]`): `CONFIG_FONT_FAMILIES` maps 4 keys; `formatEditorConfig` (`line 154`) replaces `/Sawala Mono/g` cleanly and toggles `fontLigatures` via `ligaturesEnabled`.
  - `specimen-tester.js:98,129-133,182` (`[VERIFIED]`): Uses a binary check (`variant === "nl" ? "nl" : "standard"`), coupling CSS font family switching directly to `data-ligature-mode` (`[VERIFIED: web-docs/css/showcase.css:795-799]`). Extending to 3 font choices (`standard`, `nl`, `ligar`) requires decoupling *family selection* (`Sawala Mono` / `Sawala Mono NL` / `Sawala Ligar Mono`) from binary ligation state (`calt: 1` for both `standard` and `ligar`, `calt: 0` for `nl`).
  - `polyglot-runner.js:311-322` (`[VERIFIED]`): Currently exposes a binary `calt` toggle (`Sawala Mono · calt: 1` vs `Sawala Mono NL · calt: 0`).
  - `glyph-matrix.js:24,385` (`[VERIFIED]`): Entry for `y` (`line 385`) lists only `"straight-turn-serifless"` (omitting italic `cursive-serifless` added in commit `caa39a8`), and `0` (`line 24`) still cites `private-build-plans.toml:37,54` whereas `zero` italic shifted to line `55` (`[VERIFIED: private-build-plans.toml:55]`).
  - `terminal-preview.js:24,106,135` (`[VERIFIED]`) and `index.html:1167` (`[VERIFIED]`): Mockup terminal text displays `v1.0.0` (cosmetic simulation text; can be refreshed to `v1.1.0`).
- **Architectural Debt & Premise Critique (Inversion — "Why Might This Fail?"):**
  1. *Repo Bloat & Load Latency:* Committing all 9 weights × 2 widths × 2 slopes of `Sawala Ligar Mono` `WOFF2` files (~18 MB+) would bloat Git history and slow webfont loading. Bundling **only `SawalaLigarMono-Regular.woff2` + `SawalaLigarMono-Italic.woff2`** (~1 MB) keeps payloads lean while demonstrating both selective-curly upright and cursive italic forms.
  2. *Coupled `data-ligature-mode` Attribute:* Reusing `data-ligature-mode="ligar"` naively without updating `calt` inline styles or selector rules in `specimen-tester.js:129-133` and `showcase.css:795` could accidentally keep `"Sawala Mono"` active or disable ligatures. Separating family vs ligature mode cleanly avoids this.
  3. *Responsive Grid Imbalance:* Dropping 6 cards into `repeat(4, 1fr)` leaves 2 dangling cards; switching desktop grid to `repeat(3, minmax(0, 1fr))` pairs Top Row (Standard/Ligar desktop distributions) with Bottom Row (`NF` terminal distributions) cleanly.
  4. *Simpler Alternative Considered:* Option A (copy & cards only, zero `WOFF2` files) eliminates CI artifact extraction completely, but fails user evaluation when visitors compare *Sawala Mono* vs *Sawala Ligar Mono* without downloading a 348 MB ZIP.

### 3.2 Analogous Solutions & Prior Art
- **Internal Analogies:**
  - `Sawala Mono NL` binding in `typography.css:43-49`, `tokens.css:59-61`, and `showcase.css:795-799` already establishes the pattern for binding an additional family without disrupting primary `Sawala Mono` weights.
  - `fast-track-mini-plan-2026-11-16.md` proved incremental enhancement of `#comparison-slider-panel` (`data-comparison-font` CSS custom property switching) without breaking static GitHub Pages deployment (`.github/workflows/pages.yml`).

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: Copy, Matrix & Config Only (Zero New WOFF2) | Option B: 6-Distribution Sync + Minimal 2-WOFF2 Live Preview **[Selected]** | Option C: Full Tier A+B Ligar WOFF2 Pack + Split Showcase App |
| :--- | :--- | :--- | :--- |
| **Summary** | Update 6-distribution copy, 3×2 cards, `distributions.html`, `installation.html`, `config-generator.js`, and `glyph-matrix.js` drift only. | Everything in Option A **plus** `SawalaLigarMono-Regular.woff2` & `Italic.woff2` (~1 MB), `--font-mono-ligar` token, and 3-way variant switcher in Live Specimen Tester (and optional Polyglot Runner / Cards preview). | Bundle all 9 `SawalaLigarMono` weights (`SemiExtended` included) or rewrite showcase as a build-step SPA. |
| **Clean Architecture Seams** | Zero new asset pipeline needed; Presentation-only edits. | Cleanly partitions Token/Font layer (`tokens.css`, `typography.css`), Domain data tables (`distribution-cards.js`, `config-generator.js`), and UI controllers (`specimen-tester.js`). | Violates zero-build static invariant and adds multi-MB binary bloat to git. |
| **Complexity & Risk** | Very low effort; low risk, but zero interactive visual differentiation for `Sawala Ligar Mono`. | Low-moderate effort; requires 1 CI `build.yml` dispatch (`format: woff2, variant: SawalaLigarMono`) to extract 2 `.woff2` files. | High repo bloat and unnecessary build complexity. |
| **Reversibility (Two-Way Door?)** | High. | High (WOFF2 preview and 3-way switcher can be adjusted independently of card/config updates). | Low once large font binaries enter git history. |
| **Recommendation** | Viable fallback if CI `woff2` extraction is deferred | **[RECOMMENDED & SELECTED BY USER]** | Rejected (over-engineered) |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

- **Technical Unknown 1:** How should the 2 required `Sawala Ligar Mono` `WOFF2` files (`SawalaLigarMono-Regular.woff2`, `SawalaLigarMono-Italic.woff2`) be produced given local Windows environment lacks `node_modules` / `docker`?
  - **Spike / Feasibility Check:** Inspected `.github/workflows/build.yml:11-24,80-125` (`[VERIFIED]`). Dispatching `Build Sawala Mono Font` with `variant: SawalaLigarMono`, `format: woff2`, `create_release: false` builds `woff2::SawalaLigarMono` cleanly on `ubuntu-latest` and uploads `Sawala-Mono-Packages.zip` as a workflow artifact without touching releases.
  - **Findings (`[VERIFIED]` CI config / `[HYPOTHESIS]` runtime artifact size):** `[VERIFIED]` CI supports `format: woff2`; `[HYPOTHESIS]` `SawalaLigarMono-Regular.woff2` and `Italic.woff2` expected ~500–580 KB each matching existing `SawalaMono` WOFF2 sizes (`509 KB` and `563 KB`).
- **Technical Unknown 2:** Will adding `SemiBold`/`Bold` synthetic weights for `Sawala Ligar Mono` in the Live Specimen Tester look acceptable if only `400 Regular` and `400 Italic` WOFF2 files are bundled?
  - **Findings (`[VERIFIED]` existing precedent):** `web-docs/fonts/sawala-mono/` already bundles only `Regular (400)` for `Sawala Mono NL`, and `specimen-tester.js:174-179` explicitly labels synthesized weights via `#specimen-tier-badge` (`Tier B Weight · Synthesized from Core`), which can generalize cleanly per selected family!

---

## 6. Strategic Recommendation & Handoff to Specification

- **Selected Architectural Path:** **Option B (6-Distribution Showcase Sync + Minimal 2-WOFF2 Live Preview)**.
  1. Generate `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2` via GitHub Actions (`build.yml` with `variant: SawalaLigarMono`, `format: woff2`, `create_release: false`) and place them in `web-docs/fonts/sawala-mono/`.
  2. Extend `typography.css`, `tokens.css`, and `showcase.css` with `"Sawala Ligar Mono"` `@font-face` bindings, `--font-mono-ligar`, a balanced `3×2` `.distributions-grid` desktop layout, and decoupled font-variant vs ligation preview hooks.
  3. Update JS data/controllers (`distribution-cards.js`, `config-generator.js`, `specimen-tester.js`, plus optional `polyglot-runner.js` variant selector and `glyph-matrix.js` / `terminal-preview.js` metadata sync).
  4. Update markup across `index.html`, `web-docs/pages/distributions.html`, and `web-docs/pages/installation.html` using strictly canonical `CONTEXT.md` distribution names.
- **High-Impact Decisions (ADR Candidate):** Not required as a formal new ADR (strictly within the existing static GitHub Pages showcase architecture established in Wave 1), though `/to-spec` should formalize the font-family vs `calt` decoupling contract and exact Tier A WOFF2 asset list.
- **Domain Vocabulary Candidates (`CONTEXT.md`):** All six required distribution names (`Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`) are already registered in `CONTEXT.md`.

### 6.1 Downstream Readiness Checklist (for `/to-prd` or `/to-spec`)
- [x] **The Unknown:** Full 6-distribution showcase parity + lightweight 2-WOFF2 live preview for `Sawala Ligar Mono` is scoped.
- [x] **The Data:** Exact DOM sections, CSS rules/tokens, ESM controllers, subpages, and CI `woff2` extraction path are identified with `[VERIFIED: file:line]`.
- [x] **The Condition:** Engine isolation, ~1 MB WOFF2 payload budget, `3×2` responsive grid balance, `'self'` subpage CSP, and `CONTEXT.md` terminology invariants are documented.
- [x] **Clean Architecture Seams:** Asset/Token CSS layer, Data/Controller JS modules, and Static HTML presentation views are cleanly partitioned.
- [x] **Risks & Spikes:** CI `woff2` extraction workflow and Tier B weight-synthesis badge behavior are documented.

### 6.2 Forking Handoff Actions (`/to-prd` or `/to-spec`)
Choose the downstream path matching your workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/web-showcase-sawala-ligar-sync-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and acceptance criteria based on this Discovery Draft.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint):**
  ```text
  /to-spec @docs/discovery/web-showcase-sawala-ligar-sync-discovery.md Formulate formal technical specification, UI/controller contracts, and asset requirements based on this approved Discovery Draft.
  ```
