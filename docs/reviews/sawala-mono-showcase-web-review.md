# 🔍 Code Review & Quality Audit: Iosevka Sawala Mono Showcase & Technical Documentation Web Platform

**Reviewed Target:** `Working Tree (index.html, web-docs/**, .nojekyll, .github/workflows/pages.yml)`  
**Specification Ref:** [`docs/spec/sawala-mono-showcase-web-spec.md`](../spec/sawala-mono-showcase-web-spec.md)  
**Plan Ref:** [`docs/plan/sawala-mono-showcase-web-plan.md`](../plan/sawala-mono-showcase-web-plan.md)  
**Risk Tier:** **`High/Critical (Tier 2)`** *(Triggered by CI/CD workflow in `.github/workflows/pages.yml` per `to-review/SKILL.md` §0.1)*  
**Review Mode:** **`Deep`**  
**Human Audit Gate:** **`🚨 >= 2 Approvals [MANDATORY HUMAN AUDIT REQUIRED] (Tier 2)`**  
**Review Iteration:** **`Iteration 3 (Post-Fix Re-Verification & Spec/Plan/Runtime Closure)`**  
**Findings Summary:** **`[Important]: 0 | [Nit]: 0 (3/3 resolved) | [Pre-existing]: 1`** — **`"All 6 [Important] and 3 [Nit] defects from Iteration 2 remediated and verified"`**  
**Review Status:** **Approved (Ready for Tier 2 Human Merge Approvals)**  
**Release Readiness Verdict:** **GO**  

---
<!-- markdownlint-disable-->

## 0. Iteration 2 Re-Audit Summary & Ground-Truth Corrections

> [!CAUTION]
> **Iteration 1 Audit Invalidation:** Iteration 1 previously marked `GO` with `0 [Important]` findings and cited nonexistent code (`distributions.html:420` when the file ends at line 357), unverified monorepo verification commands (`biome check .` and `update-package-json-version.mjs --dry-run` both fail in this workspace), and overlooked multiple factual inaccuracies in spec/code (`cap = 690` vs ground-truth `cap = 735`, `hasNerdFont: false` on NF tier 4, non-`calt` operators labeled as `default-calt`, broken clipboard selection fallback, and WCAG AA contrast failures). Iteration 2 replaces Iteration 1 with verified ground truth from direct file reads, automated checks, and a live isolated Chromium session (`http://127.0.0.1:4173`).

### 0.1 Verified Baseline Tooling & Asset Telemetry (Iteration 2)
- **`node --check` on all 9 JS files (`web-docs/js/*.js`, `web-docs/vendor/prism/prism.min.js`):** Exit `0` (`JS_SYNTAX_OK`).
- **Impeccable mechanical detector (`impeccable.exe detect --json index.html web-docs`):** Exit `0` (`[]`).
- **Internal href/src/hash integrity:** `BROKEN_LOCAL_REFS: []`.
- **Bundle & Binary Footprints (Measured on Disk):**
  - `htmlBytes`: `141,983 B`; `cssRaw`: `69,165 B` (`cssGzip`: `11,880 B`); `jsRaw`: `112,326 B` (`jsGzip`: `32,396 B`); combined `css+js`: `181,491 B` raw (`44,276 B` gzip).
  - 5 checked-in WOFF2 files (`web-docs/fonts/sawala-mono/*.woff2`): `2,586,236 B` (~2.53 MB); 4 preloaded WOFF2s on `index.html`: `2,088,976 B` (~2.04 MB). `brotli` / WOFF2 subset compression is unavailable in the local Python environment (`ModuleNotFoundError: No module named 'brotli'`).
  - Hero asset `sawala-mono-hero-img.jpg`: `777,512 B` (`2400 x 1792` JPEG).
- **Upstream Monorepo Checks (Honesty Correction for Plan §9):**
  - `npx @biomejs/biome check .` exits `1` due to 3 errors, 5 warnings, and 1 info in untouched upstream `packages/util/src/index.mjs` and `packages/font-kits/src/`; `biome check web-docs` exits `1` because `web-docs` is listed as ignored in `biome.json`.
  - `node tools/misc/src/update-package-json-version.mjs --dry-run` exits `1` (`ERR_MODULE_NOT_FOUND: Cannot find package 'semver'`).

---

## 1. Confirmed Findings Ledger (Iteration 2 — `NO-GO`)

### Blocking Findings (`[Important]` — 6 Confirmed)

1. **`[Important]` `[index.html:106,441,465; web-docs/js/polyglot-runner.js:76,81; docs/spec:91,429,660,840]` — Spec/UI Factual Drift: Wrong `cap-height: 690` Metric & Missing Comparison Alignment Guides (`AC-019`)**
   - **What is wrong:** `params/parameters.toml` sets `cap = 735` (with `ascender = 735`, `xHeight = 520`), yet `index.html`, `polyglot-runner.js`, the Spec, and the Plan all claim `Cap 690` (`690` copied from Ioskeley Mono reference). Additionally, `AC-019` promises visual x-height/cap-height alignment guides in `#comparison-stage` (`index.html:446-479`), which are missing from DOM/CSS, and mobile comparison panes wrap/clip awkwardly at `375px`.
   - **Required fix:** Update `690` $\to$ `735` across Spec, Plan, `index.html`, `distributions.html`, and `polyglot-runner.js` (adjusting ratio threshold to `>= 0.70` since `520 / 735 = 0.7075`), add crisp non-intrusive x-height (`520`) / cap-height (`735`) / baseline reference guide lines in `#comparison-stage`, and fix mobile comparison layout.

2. **`[Important]` `[web-docs/js/distribution-cards.js:56-82; index.html:1360-1418; web-docs/pages/installation.html; .github/workflows/build.yml & patch-nerd-font.yml]` — Distribution Tier Data Bug (`hasNerdFont: false`), Release Tag/URL Drift (`latest` vs `v1.0.0`), Install Path Mismatch (`TTF/*.ttf`), and Missing CI Directory Staging**
   - **What is wrong:**
     - `distribution-cards.js:72` sets `hasNerdFont: false` on `Sawala Mono NL NF` alongside an un-specced `hasNerdFontIcons: true`.
     - Standard cards use `v1.0.0` while NF cards hardcode `/releases/download/latest/*-NF-latest.zip`; ground-truth `.github/workflows/patch-nerd-font.yml` names files `${v}-NF-${TARGET_TAG}.zip` uploaded to concrete tag `$TARGET_TAG` (`latest` resolves to concrete tag, never literal `latest` tag), and `build.yml` packages `SawalaMono/TTF/*.ttf` (`verdafile.mjs:581`), whereas `installation.html` tells Linux/macOS users to copy `SawalaMono/*.ttf`.
     - `pages.yml` uploads `path: "."`, bundling ~641 repository compiler source files instead of staging only the static showcase files (`index.html`, `.nojekyll`, `sawala-mono-hero-img.jpg`, `web-docs/`).
   - **Required fix:** Set `hasNerdFont: true`, remove `hasNerdFontIcons`, standardize release links consistently on `v1.0.0` (`SawalaMono-NF-v1.0.0.zip`, `SawalaMonoNL-NF-v1.0.0.zip`, `SawalaMono-Extended-NF-v1.0.0.zip`, `SawalaMonoNL-Extended-NF-v1.0.0.zip`), fix `installation.html` copy commands to `*/TTF/*.ttf`, align JetBrains instructions with `README.md` (`config-generator.js`), and stage only static showcase files into `_site` in `pages.yml`.

3. **`[Important]` `[web-docs/js/glyph-matrix.js; web-docs/js/ligature-playground.js; web-docs/pages/ligatures.html; index.html:631-635]` — Inaccurate `default-calt` Ligatures & `ss03` Variant Metadata vs Compiler Ground Truth**
   - **What is wrong:**
     - `index.html:631-635` and `ligature-playground.js` display `++` (label `increment`, breakdown `+ + +` mismatch!) and `??=` as `default-calt` ligatures, whereas `params/ligation-set.toml` and `gsub-ligation.ptl` show `++` (`plus-plus`), `__`, `&&` (absent), `??=`, `=/=`, `/=`, `~=`, `=!=`, `<.`, `<.>` are NOT in `default-calt`.
     - `ligatures.html` claims `"55 OpenType calt substitutions"` and `"Source: ligation-data.mjs"`, listing ~15 entries not present in `default-calt`.
     - `glyph-matrix.js` attributes incorrect `ss03` variant descriptions (`six`/`nine` described as half-serif/open instead of `closed-contour`, `#` as upright instead of `slanted`, `@` as 3-fold instead of `fourfold`, `?` as `flat-hooked` instead of `corner-flat-hooked`, `j` as flat-top instead of `serifed`, `r` as hooked instead of `serifless`, `ß` as canonical instead of `longs-s-lig-serifless`) per `params/variants.toml:11146-11245`.
   - **Required fix:** Align every ligature in `index.html`, `ligature-playground.js`, `ligatures.html`, and the Spec against genuine `default-calt` sequences from `params/ligation-set.toml` (e.g., `+++`, `<!--`, `--->`, `<=>`, `<|>`, `=:=`, `<=`, `>=`, `===`, `!==`, etc.), correct `++` $\to$ `+++` matching `+ + +`, and update all `GLYPH_CATALOG` variant notes in `glyph-matrix.js` to match `private-build-plans.toml` + `params/variants.toml`.

4. **`[Important]` `[web-docs/js/polyglot-runner.js:202-218; web-docs/js/config-generator.js:325-355]` — Broken Fallback Clipboard Flow (`AC-014`) & Stale Fallback Textarea State**
   - **What is wrong:** `polyglot-runner.js:216` calls `document.body.removeChild(tempArea)` unconditionally before returning `copied = false`, destroying text selection in fallback mode when `navigator.clipboard` fails. In `config-generator.js:342-347`, if clipboard fails and makes the fallback textarea `.is-visible`, the 2000ms reset clears `data-copied` but leaves `.is-visible` on the textarea indefinitely.
   - **Required fix:** Keep fallback selection visible/selectable cleanly when copy fails (`config-generator.js` reveals & selects `.is-visible` fallback textarea and hides it appropriately or on next copy/reset; `polyglot-runner.js` preserves selectable `<pre>`/element range or temporary visible fallback cleanly until focus blur/copy completion).

5. **`[Important]` `[web-docs/css/tokens.css; web-docs/css/typography.css:383-395; web-docs/css/showcase.css:1619-1621; web-docs/vendor/prism/prism-sawala-dark.css:34]` — WCAG 2.1 AA Contrast Failures & Touch Target / Mobile Layout Violations (`CON-007`)**
   - **What is wrong:**
     - `.button-primary:hover` (`#ffffff` on `#828fff`) computes to `2.87:1` contrast ($< 4.5:1$).
     - `--syntax-comment: #565f89` computes to `2.85:1`–`3.37:1` against `--surface-4` (`#191a1b`) and `--surface-2` (`#141516`) ($< 4.5:1$).
     - `.control-slider` sets `min-height: 24px` at mobile breakpoint (`showcase.css:1620`), below the `44px` touch target requirement, and `.variant-switcher-tab` / runner pills shrink below `44px` on mobile.
   - **Required fix:** Adjust button hover contrast (e.g., darken hover fill `--button-primary-hover: #4955c4` with `#ffffff` giving `~5.87:1` OR dark `--on-primary` `#010102` on `#828fff`), lighten `--syntax-comment` to `#828cba` (`>= 4.5:1` on `--surface-4`), enforce `>= 44px` touch targets on mobile interactive controls, and polish comparison/mobile wrapping.

6. **`[Important]` `[docs/spec/sawala-mono-showcase-web-spec.md; docs/plan/sawala-mono-showcase-web-plan.md; web-docs/pages/distributions.html:198,218-266]` — Honest Spec/Plan Alignment for Webfont Budget (`CON-004`), `REQ-003` Copy, `Plan §9` Commands, and Inline Style Removal for Strict CSP**
   - **What is wrong:**
     - `distributions.html:198` falsely tells users the site bundles a "Tier A web subset ... to stay within the 180 KB font budget", while the shipped Tier A WOFF2s are full ~500 KB builds (`~2.04 MB` preloaded) and Tier B lazy-loading is deferred. Spec `CON-004` still asserts $\le 180\text{ KB}$ + Tier B lazy-load.
     - `distributions.html:218-266` uses 9 inline `style="font-weight: 100..900"` attributes forcing `'unsafe-inline'` in CSP across all pages.
     - `REQ-003` mentions "enlarged punctuation marks", while implemented Card 4 (`AC-005`) shows upright `a` vs italic `a`.
     - `Plan §9` reports `npx @biomejs/biome check .` and `update-package-json-version.mjs --dry-run` as green despite both exiting `1`.
   - **Required fix:** Update Spec `CON-004` / Contingency status and `distributions.html:198` copy honestly (documenting Contingency Plan B waiver pending CI `pyftsubset` + `brotli` optimization), move `.font-w-100..900` to `showcase.css`, tighten CSP (`style-src 'self'`), reconcile `REQ-003` with `AC-005`, and record truthful verification commands in `Plan §9`.

### Non-Blocking Suggestions (`[Nit]` — 3 Confirmed)

1. **`[Nit]` `[index.html:12-20]` — Relative Social Meta URLs & Missing `canonical` / `og:url` / `og:image:alt`**
   - Relative `og:image="sawala-mono-hero-img.jpg"` and missing `canonical` / `og:url` / `og:image:alt` limit strict scraper fidelity; switch to absolute GitHub Pages URLs (`https://iosevka-mayukai.github.io/sawala-mono-dev/` + repo fallback metadata) and add `og:image:alt`.
2. **`[Nit]` `[web-docs/js/ligature-playground.js; web-docs/js/main.js; index.html]` — Minor ARIA Tablist & Slider Semantics Gaps**
   - `ligature-playground.js` lacks `Home`/`End` keyboard navigation on `[role="tab"]`; `aria-labelledby` isn't updated dynamically on active tabpanel switch in JS; native `<input type="range">` benefits from explicit `role="slider"` per Spec §7.
3. **`[Nit]` `[web-docs/vendor/prism/prism.min.js]` — Prism Mini Tokenizer Edge Cases**
   - Emits booleans under `.token.number` instead of `.token.boolean`, misses Rust attributes (`#[...]`) / raw strings (`r#"..."#`) / Lua `--[[ ... ]]` block comments, and shares one keyword table across TypeScript/TOML/JSON/Bash.

### Pre-existing Technical Debt (`[Pre-existing]` — 1 Confirmed)

1. **`[Pre-existing]` `[packages/util/src/index.mjs; packages/font-kits/src/]` — Upstream Iosevka Biome Lint Diagnostics**
   - Untouched upstream compiler files fail `npx @biomejs/biome check .` (3 errors, 5 warnings, 1 info). Kept untouched per `CON-005`.

---

## 2. Iteration 3 — Post-Fix Re-Verification & Closure Ledger (`GO`)

- **Remediation Plan:** [`docs/bug-reports/sawala-mono-showcase-web-bugfix.md`](../bug-reports/sawala-mono-showcase-web-bugfix.md) (`status: "Resolved"` — all tasks `BUG-101..BUG-20X` verified).
- **Previous Status:** `NO-GO` under Iteration 2 -> **Current Verdict:** **`GO`** *(subject to standard Tier 2 `>= 2` human merge approvals due to `.github/workflows/pages.yml`)*.

### 2.1 Finding Resolution Matrix (Iteration 2 -> Iteration 3)

| Iteration 2 Finding | Remediation Task(s) | Verified Resolution Summary |
| :--- | :---: | :--- |
| `[Important] #1`: `cap = 690` drift & missing `AC-019` alignment guides | `BUG-201`, `BUG-202`, `BUG-203`, `BUG-204` | Unified `cap-height = 735` across Spec, Plan, `index.html`, `distributions.html`, `polyglot-runner.js` (`>= 0.70`), and `glyph-matrix.js`; added `.comparison-guides` / `.comparison-code-line--guided` (`Cap 735`, `x-height 520`, `Baseline 0`) and mobile `.comparison-pane__badge-row` wrapping. |
| `[Important] #2`: `hasNerdFont: false`, `latest` NF drift, `TTF/*.ttf` path, CI `path: "."` | `BUG-201`, `BUG-203`, `BUG-204`, `BUG-205` | Set `hasNerdFont: true` on `Sawala Mono NL NF` (removed `hasNerdFontIcons`); aligned NF archives on `v1.0.0`; fixed install commands to `SawalaMono/TTF/*.ttf` + JetBrains GUI checklist; staged only `index.html`, `.nojekyll`, `sawala-mono-hero-img.jpg`, and `web-docs/` into `_site` in `.github/workflows/pages.yml`. |
| `[Important] #3`: Non-`default-calt` ligatures & `ss03` variant drift | `BUG-201`, `BUG-203`, `BUG-204` | Replaced invalid ligatures (`??=`, `++`, `=/=`, `=!=`, `/=`, `~=`, `&&`, `<.`, `<.>`, `__`) with verified `default-calt` entries (`<<=`, `+++`, `!===`, `!!`, `<~`, `<~>`, `///`, `|||`, `/*`, `*/`, `---`, `___`) from `params/ligation-set.toml`; updated `ligatures.html` header & category counts (`19 / 13 / 10 / 7 / 6`); aligned `glyph-matrix.js` `ss03` descriptors with `params/variants.toml`. |
| `[Important] #4`: Broken clipboard fallback (`AC-014`) & stale textarea | `BUG-204` | Preserved selectable range / visible `tempArea` until `blur` on fallback in `polyglot-runner.js`; cleaned up `.is-visible` on `blur` and timer reset in `config-generator.js`. |
| `[Important] #5`: WCAG AA contrast & `44px` mobile touch target failures (`CON-007`) | `BUG-202`, `BUG-203` | Set `--button-primary-hover: #4c58c6` (`5.97:1` vs `#ffffff`) and `--syntax-comment: #848eb8` (`5.43:1` vs `#191a1b`); enforced `min-height: 44px` on mobile sliders, tabs, and action buttons; hid brand badge at `max-width: 480px` so mobile header controls remain inside `375px` without clipping. |
| `[Important] #6`: Spec `CON-004` / `REQ-003` / `Plan §9` honesty & CSP `'unsafe-inline'` removal | `BUG-201`, `BUG-202`, `BUG-203` | Recorded `CON-004` Contingency Plan B waiver and updated `distributions.html` copy honestly; replaced inline `style="font-weight: ..."` attributes with `.font-w-100..900`; tightened CSP to `style-src 'self'` across all 4 HTML pages; aligned `REQ-003` and `Plan §9` command reporting. |
| `[Nit] #1–#3`: Canonical social meta, ARIA tablist/slider roles, Prism tokenizer | `BUG-202`, `BUG-203`, `BUG-204` | Added `rel="canonical"`, `og:url`, absolute `og:image` + `og:image:alt`; added `role="slider"`, `Home`/`End` navigation, and dynamic `aria-labelledby`; updated `prism.min.js` with `.token.boolean`, Rust attributes/raw strings, Lua `--[[ ... ]]`, scoped `#` comments, and isolated keyword lookups. |
| `[Pre-existing] #1`: Upstream Iosevka Biome lint diagnostics | Retained per `CON-005` | Confirmed untouched (`packages/`, `params/`, `tools/`, `verdafile.mjs`, `package.json`, `biome.json` clean in `git status`). |

### 2.2 Post-Fix Verification Evidence (Iteration 3)

- **Automated Regression Suite (`repro-review-findings.mjs`):** `TOTAL: 24 | PASS: 24 | FAIL: 0` (exit `0`) — validates metrics, `hasNerdFont`, `v1.0.0` URLs, `*/TTF/*.ttf`, `_site` CI staging, `default-calt` membership, `ss03` descriptors, clipboard fallback, WCAG contrast ratios, strict CSP `style-src 'self'`, comparison guide elements, slider `min-height: 44px`, and Prism token rules.
- **JS Syntax Check (`node --check` across all 9 JS files in `web-docs/`):** Exit `0`.
- **Impeccable Detector (`impeccable.exe detect --json index.html web-docs`):** `[]` (exit `0`).
- **Compiler Seam Isolation (`git status --short packages params tools verdafile.mjs package.json biome.json`):** Empty output (exit `0`).
- **Live Chromium Verification (`http://127.0.0.1:4173`, desktop `1280x800` & mobile `375x812`):** `0` console errors, `0` CSP violations under strict `style-src 'self'`, `0` 404/failed requests, `0` horizontal overflow across all 4 pages, mobile header controls unclipped inside `375px`, and `ligatures.html` `Arrows (19)` filter verified at `19` rows.
