---
goal: "Implementation Plan: Web Showcase & Documentation Sync for Sawala Ligar Mono (Wave 2)"
version: "1.1.0"
date_created: "2026-11-19"
last_updated: "2026-11-20"
status: "Completed"
spec_ref: "docs/spec/web-showcase-sawala-ligar-sync-spec.md"
clarification_ref: "docs/audit/web-showcase-sawala-ligar-sync-spec-clarification.md"
tags: ["polya", "plan", "tracer-bullets", "vertical-slicing", "web-showcase", "sawala-ligar-mono", "github-pages"]
---
<!-- markdownlint-disable -->

# Implementation Plan: Web Showcase & Documentation Sync for Sawala Ligar Mono (Wave 2)

> [!IMPORTANT]
> **THE PAUSE RULE & VERTICAL SLICING MANDATE:**  
> All tasks in this plan are organized into **Vertical Feature Slices (Tracer Bullets)** spanning from WebFont assets/tokens and ESM controllers directly to user-visible static HTML and documentation surfaces. Horizontal layer-by-layer slicing is strictly prohibited.  
> After each phase is verified, execution MUST halt for explicit user approval before proceeding to the next phase (unless running `/to-code auto`). Functional code MUST NOT be written until this plan is explicitly approved.

---

## 1. Overview & High-Level Mental Model

This plan implements Wave 2 synchronization of the zero-build GitHub Pages showcase ([index.html](../../index.html), [web-docs/](../../web-docs), and [DESIGN.md](../../DESIGN.md)) with the six official distributions shipped in `v1.1.0-release19112026` (**Sawala Mono**, **Sawala Mono NL**, **Sawala Ligar Mono**, **Sawala Mono NF**, **Sawala Mono NL NF**, and **Sawala Ligar Mono NF**).

Locked decisions from [`docs/audit/web-showcase-sawala-ligar-sync-spec-clarification.md`](../audit/web-showcase-sawala-ligar-sync-spec-clarification.md) (`100/100`):
- **Option A (`[ASSUMPTION-001]`):** `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2` are built via GitHub Actions (`.github/workflows/build.yml` with `variant: SawalaLigarMono`, `format: woff2`, `create_release: false`) and committed to `web-docs/fonts/sawala-mono/` as `TASK-001` before Phase 1–3 code verification closes.
- **Option B (`[ASSUMPTION-003]`):** `#polyglot-runner` replaces its binary `#polyglot-calt-toggle` with 3 compact segmented pill buttons (`Standard` | `Ligar` | `NL`) using `variant-switcher-tab` and per-button binary `aria-pressed`.
- **DOM Attribute Separation (`REQ-002`, `REQ-003`):** `data-font-variant="standard" | "nl" | "ligar"` controls **font family only**, while `data-ligature-mode` (Specimen) and `data-ligatures` (Polyglot) remain strictly `"standard" | "nl"` (`"ligar"` MUST NEVER be written to either ligation attribute).

### Topological Data Flow Diagram

```text
[ GitHub Actions: build.yml (format: woff2, variant: SawalaLigarMono) ]
                        │ (TASK-001 artifact extraction)
                        ▼
[ Asset & Token Layer (CSS) ]
   ├── web-docs/fonts/sawala-mono/SawalaLigarMono-{Regular,Italic}.woff2
   ├── web-docs/css/tokens.css (--font-mono-ligar)
   ├── web-docs/css/typography.css (@font-face swap, polyglot 3-pill + ligar selector)
   └── web-docs/css/showcase.css (3x2 .distributions-grid >1200px, specimen-ligar hook)
                        │
                        ▼
[ ESM Registry & Controller Layer (web-docs/js/) ]
   ├── specimen-tester.js (3-way standard|nl|ligar, TIER_A_WEIGHTS_BY_VARIANT, line 257 fix)
   ├── polyglot-runner.js (3-pill segmented selector + data-font-variant / data-ligatures)
   ├── distribution-cards.js (6-tier DISTRIBUTION_TIERS + width toggle parity)
   ├── config-generator.js (6-family CONFIG_FONT_FAMILIES + JetBrains line 158 fix)
   └── glyph-matrix.js + terminal-preview.js (italic y, zero :37,55, v1.1.0 mockup)
                        │
                        ▼
[ Static Presentation & Manifest Layer ]
   ├── index.html (Hero/SEO/Copy, 3-pill Polyglot, 3-btn Specimen, 6 Cards, 6 Config options)
   ├── web-docs/pages/{distributions,installation,ligatures}.html (7-col table, 7-WOFF2 prose)
   └── DESIGN.md (6-distribution manifest & archive conventions)
                        │
                        ▼
[ .github/workflows/pages.yml (_site staging -> GitHub Pages deploy) ]
```

---

## 2. 📏 Task Sizing Matrix

Every task is bounded to XS–M (`<= 5` files impacted) so each slice remains atomic, reviewable, and independently verifiable.

| Size | Files Impacted | Scope | Example |
| :--- | :---: | :--- | :--- |
| **XS** | 1 | Single pure function or config change | Constant registry addition |
| **S** | 1–2 | Focused vertical slice | Config Generator 6-family update + JetBrains fix |
| **M** | 3–5 | Standard Vertical Feature Slice (Tracer Bullet) | WOFF2 binding + CSS tokens + Specimen controller + HTML |
| **L** | 5–8 | Multi-component vertical flow | *(Not required in this plan)* |
| **XL** | 8+ | **Strictly Prohibited (Too Large)** | Decomposed into Phases 1–3 below |

---

## 3. Phased Implementation Sequence (Vertical Tracer Bullets)

> **EXECUTION DIRECTIVE FOR AI AGENTS (`/to-code` & `/to-code auto`):**  
> - **Interactive Mode (`/to-code`):** Execute ticket by ticket. Run `VERIFY` commands after each phase, then halt at each `APPROVAL` gate for explicit user sign-off.  
> - **Autonomous Mode (`/to-code auto`):** Note that `TASK-001` requires the user to run GitHub Actions (`build.yml`, `format: woff2`) and place the 2 `.woff2` files into `web-docs/fonts/sawala-mono/` first (since the local Windows host has no `docker`/`node_modules`). Once `TASK-001` files are present on disk, `/to-code auto` can execute `TASK-002` through `TASK-012` continuously subject to the **4 Circuit Breakers** (*Ambiguous Spec*, *3x Verification Failure*, *Ratchet Regression*, or *Untracked Dependency/Architecture Change*).

### Implementation Phase 1: Land — CI WOFF2 Prerequisite & Live Specimen Tracer Bullet
*Goal: Obtain the 2 compiled `Sawala Ligar Mono` Tier A WOFF2 binaries and prove live end-to-end 3-way font rendering inside the Live Type Specimen Tester.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-001 | **CI Prerequisite Gate [HIGH RISK — `[ASSUMPTION-001]`, `[ASSUMPTION-004]`]:** Dispatch `.github/workflows/build.yml` (`variant: SawalaLigarMono`, `format: woff2`, `create_release: false`), extract `SawalaLigarMono/WOFF2/SawalaLigarMono-Regular.woff2` & `SawalaLigarMono/WOFF2/SawalaLigarMono-Italic.woff2` (`build.yml:116-127`) from artifact `Sawala-Mono-Packages` into `web-docs/fonts/sawala-mono/`, and verify byte limits (`<= 665,600` B each, `<= 1,310,720` B combined) *(Verified: `Regular=515,940` B, `Italic=571,936` B, `Combined=1,087,876` B)* | REQ-001, CON-002 | AC-001 | - | 2 (S) | [x] | 2026-11-20 |
| TASK-002 | **Live Specimen 3-Way Family & `@font-face` Tracer Bullet:** Register `"Sawala Ligar Mono"` `400` normal & italic `@font-face` (`font-display: swap`, zero new `<link rel="preload">`) in `web-docs/css/typography.css`; add `--font-mono-ligar` in `web-docs/css/tokens.css`; add `.specimen-textarea[data-font-variant="ligar"]` in `web-docs/css/showcase.css`; upgrade `web-docs/js/specimen-tester.js` (`applySpecimenState` line `98` & click handler line `257`, replacing binary `isStandardVariant` at `lines 115,129-133,182` with `const isLigaturesEnabled = nextState.variant !== "nl"` + 3-entry `SPECIMEN_FAMILY_NAMES` map, setting `data-font-variant` and `data-ligature-mode = isLigaturesEnabled ? "standard" : "nl"`, and `TIER_A_WEIGHTS_BY_VARIANT`); add the `"Sawala Ligar Mono"` button (`data-specimen-variant="ligar"`) to `#specimen` in `index.html:806-837` | REQ-001, REQ-002, CON-002, CON-006 | AC-001, AC-002 | TASK-001 | 5 (M) | [x] | 2026-11-19 |
| TASK-003 | **VERIFY (`check:task`):** Run `check:fast` (Web) (`node --check web-docs/js/specimen-tester.js`), `check:task` (Web) (`.agents/skills/impeccable/scripts/impeccable.cmd detect --json` -> `[]`), verify `.woff2` presence & byte thresholds (`<= 665,600` B each, `<= 1,310,720` B total), verify `0` new `SawalaLigarMono` `<link rel="preload">` tags in `index.html`, and execute Node ESM assertions on `applySpecimenState` (`standard`/`nl`/`ligar`, `400` vs `700` badge, unknown fallback, `"ligar"` never written to `data-ligature-mode`) | REQ-001, REQ-002, CON-002 | AC-001, AC-002 | TASK-002 | - | [x] | 2026-11-19 |
| TASK-004 | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 2 (unless `/to-code auto`) *(Approved under Contingency Plan B — `TASK-001` `.woff2` files still pending CI drop-in)* | - | - | TASK-003 | - | [x] | 2026-11-19 |

### Implementation Phase 2: Core Experience — Polyglot 3-Pill Switcher, 6-Distribution Matrix & IDE Config Generator
*Goal: Deliver complete interactive 6-distribution discovery, direct 1-click Polyglot font comparison, and accurate 6-family IDE snippet generation.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-005 | **Polyglot Runner 3-Pill Segmented Switcher Slice (Option B):** Replace binary `#polyglot-calt-toggle` in `index.html:236-245` with a 3-button segmented pill group (`Standard` \| `Ligar` \| `NL`, `role="group"`, `data-polyglot-variant="standard\|ligar\|nl"`, class `variant-switcher-tab`, binary `aria-pressed`) + accessible status text; add `.polyglot-runner__variants` & `.polyglot-runner__viewport[data-font-variant="ligar"]` rules in `web-docs/css/typography.css` (`>= 44px` mobile touch target, `flex-wrap: wrap`, preserving `.polyglot-runner__gutter` metric parity at `line 691`); export pure `selectPolyglotVariant(variant, root = document)` in `web-docs/js/polyglot-runner.js` setting `data-font-variant` & `data-ligatures` (`"standard"\|"nl"` strictly, never `"ligar"`) | REQ-003, CON-005, CON-006 | AC-003 | TASK-002 | 3 (M) | [x] | 2026-11-19 |
| TASK-006 | **6-Distribution `3×2` Card Grid & Hero/SEO Copy Slice:** Expand `DISTRIBUTION_TIERS` in `web-docs/js/distribution-cards.js` with `sawala-ligar-mono` & `sawala-ligar-mono-nf` (`SawalaLigarMono-*.zip`, `SawalaLigarMono-NF-*.zip`, `SawalaLigarMono-Extended-NF-*.zip`) and update stale JSDoc (`lines 2,106,145`); update `.distributions-grid` desktop (`> 1200px`) in `web-docs/css/showcase.css:1292` to `repeat(3, minmax(0, 1fr))` (retaining `<= 1200px` 2-up and `<= 768px` 1-up) and add `.distribution-card__specimen--ligar` below `line 1402`; add the 2 standard `surface-1` cards (`distribution-card`, keeping only `Sawala Mono` featured, with selective-curly specimen e.g. `fn(x, z) => x !== 7 && z >= 1`), and update `index.html:20,127,1233,1241,1266,1688` (SEO `og:description`, hero/section/footer copy & comments) | REQ-004, CON-005, CON-006 | AC-004, AC-008 | TASK-002 | 3 (M) | [x] | 2026-11-19 |
| TASK-007 | **6-Family IDE Config Generator & JetBrains Ligatures Fix Slice:** Add `"sawala-ligar-mono"` (`ligaturesEnabled: true`) and `"sawala-ligar-mono-nf"` (`ligaturesEnabled: true`) to `CONFIG_FONT_FAMILIES` in `web-docs/js/config-generator.js:125-142` and `<select id="config-family-select">` in `index.html:1568-1573`; fix latent JetBrains toggle mismatch at `config-generator.js:37,158` (`"Enable ligatures = true"` -> `"Enable ligatures = false"` for NL families) | REQ-005, CON-005 | AC-005 | TASK-002 | 2 (S) | [x] | 2026-11-19 |
| TASK-008 | **VERIFY (`check:task`):** Run `check:fast` (Web) (`node --check` on `polyglot-runner.js`, `distribution-cards.js`, `config-generator.js`), `check:task` (Web) (`.agents/skills/impeccable/scripts/impeccable.cmd detect --json` -> `[]`), and Node ESM unit tests validating `selectPolyglotVariant` (`data-ligatures` never `"ligar"`), `DISTRIBUTION_TIERS` (6 entries × `normal`/`semi-extended`), and `formatEditorConfig` (6 families × 7 editors verifying JetBrains `Enable ligatures = false` on NL and `true` on Ligar + unknown key fallback) | REQ-003, REQ-004, REQ-005 | AC-003, AC-004, AC-005 | TASK-005, TASK-006, TASK-007 | - | [x] | 2026-11-19 |
| TASK-009 | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 3 (unless `/to-code auto`) | - | - | TASK-008 | - | [x] | 2026-11-20 |

### Implementation Phase 3: Expand & Polish — Documentation Subpages, Metadata Sync & `DESIGN.md` Parity
*Goal: Bring all subpages, glyph/terminal metadata, and `DESIGN.md` into 100% parity with Wave 2 and execute full verification ratchets.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-010 | **Documentation Subpages 6-Distribution Parity Slice:** Update `web-docs/pages/distributions.html` (`lines 10,22,27` SEO/OG/Twitter tags, `lines 91-93` `"6 distributions"` copy/badge, `lines 110-188` 7-column comparison table inside `.doc-table-wrap` with contained horizontal scroll, `lines 197-199` Weight Ladder prose updated to **seven** Tier A webfonts); update `web-docs/pages/installation.html` (`lines 121,222,243,261-268` adding `Sawala Ligar Mono` & `Sawala Ligar Mono NF`); update `web-docs/pages/ligatures.html:91` lead copy (`"shipped in Sawala Mono and Sawala Ligar Mono"`) | REQ-004, REQ-005, CON-003, CON-005 | AC-004, AC-005 | TASK-006, TASK-007 | 3 (M) | [x] | 2026-11-20 |
| TASK-011 | **Character Inspector, Terminal Mockup & `DESIGN.md` Sync Slice:** Update `web-docs/js/glyph-matrix.js:24,385` (`'y'` -> `"straight-turn-serifless (upright) · cursive-serifless (italic)"` citing `private-build-plans.toml:36,54`, and `'0'` citing `:37,55`); refresh mockup `v1.0.0` labels to `v1.1.0` in `web-docs/js/terminal-preview.js:24,106,135` and `index.html:1167`; synchronize `DESIGN.md:4,113,414-418,494,501-506,558-566` to 6 distributions, `"Sawala Ligar Mono"` mono stack note, `3×2` desktop grid parity, and `SawalaLigarMono` archive naming conventions | REQ-006, REQ-007, CON-006 | AC-006, AC-008 | TASK-006 | 4 (M) | [x] | 2026-11-20 |
| TASK-012 | **VERIFY (`check:full`):** Execute full verification gate across `AC-001`–`AC-008`: (1) `check:fast` (Web) (`node --check` on every `web-docs/js/*.js`) & `check:task` (Web) (`.agents/skills/impeccable/scripts/impeccable.cmd detect --json` -> `[]`); (2) Node ESM assertions covering all modified controllers; (3) Python/Node static HTML/CSS audit checking strict `'self'` CSP on subpages, zero inline `<style>`/`style="..."` attributes, zero broken internal links/anchors, `CONTEXT.md` `_Avoid_` blacklist check, single `distribution-card-featured` check, and zero secondary chromatic colors (`CON-003`, `CON-005`, `CON-006`); (4) Live static HTTP server (`python -m http.server`) + browser viewport check at `375px`, `1024px`, and `1440px` confirming `documentElement.scrollWidth <= innerWidth`, `>= 44px` mobile touch targets, `0` console/CSP errors, and HTTP `200` on `SawalaLigarMono-{Regular,Italic}.woff2`; (5) `git diff --name-only` verifying `packages/*`, `params/*`, `tools/*`, `build-plans.toml`, `verdafile.mjs`, `biome.json`, `package.json` untouched (`CON-004`, `ADR-0001`) + `git diff --check` clean | CON-001..CON-006 | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008 | TASK-010, TASK-011 | - | [x] | 2026-11-20 |
| TASK-013 | **APPROVAL:** 🛑 Stop and wait for explicit user sign-off to mark plan complete and hand off to `/to-review` | - | - | TASK-012 | - | [x] | 2026-11-20 |

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare concrete fallback strategies with explicit pivot triggers before encountering runtime friction.*

- **Contingency 1 — CI `WOFF2` Build Delayed or Unavailable Before Coding (`TASK-001`):**
  - **Primary Strategy (Plan A — Locked):** Run `.github/workflows/build.yml` (`variant: SawalaLigarMono`, `format: woff2`, `create_release: false`) first and drop `SawalaLigarMono-Regular.woff2` + `SawalaLigarMono-Italic.woff2` into `web-docs/fonts/sawala-mono/`.
  - **Contingency Strategy (Plan B):** Execute `TASK-002` through `TASK-012` cleanly ahead of binary drop-in (CSS `@font-face` + `--font-mono-ligar` fallback stack guarantees zero runtime errors), record `AC-001` file-existence/byte checks transparently as `BLOCKED ⚠️`, and re-verify `AC-001` immediately once the user drops the 2 `.woff2` files in place.
  - **Trigger Condition:** GitHub Actions queue outage or user requests proceeding with static code edits prior to triggering CI.

- **Contingency 2 — Compiled `SawalaLigarMono` WOFF2 Exceeds `[ASSUMPTION-004]` Threshold (`> 650 KB` / `> 1.25 MB`):**
  - **Primary Strategy (Plan A):** Ship full-repertoire `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2` directly from `build.yml` (`format: woff2`).
  - **Contingency Strategy (Plan B):** Subset Latin + coding symbols (`U+0020–00FF`, `U+2000–206F`, `U+2190–21FF`, `U+2500–257F`, retaining `calt`/`liga`) via `pyftsubset` (if available) OR request explicit user waiver updating `[ASSUMPTION-004]` ceiling.
  - **Trigger Condition:** Either extracted `.woff2` exceeds `665,600` bytes or combined total exceeds `1,310,720` bytes.

---

## 5. Symmetry, Invariants & Problem Variation (Pólya, p. 199–214)

- **Symmetric Operations & Round-Trip Invertibility ($f^{-1}(f(x)) = x$):**
  - Specimen family switching: `standard` $\leftrightarrow$ `ligar` $\leftrightarrow$ `nl` restores identical DOM state (`data-font-variant`, `data-ligature-mode`, `fontFeatureSettings`, `#specimen-tier-badge`, `#specimen-status-summary`) regardless of click sequence.
  - Polyglot 3-pill switching: `Standard` $\leftrightarrow$ `Ligar` $\leftrightarrow$ `NL` toggles `aria-pressed="true"` on exactly 1 pill and `"false"` on the other 2, while preserving active language tab (`TypeScript`..`Lua`) and Prism syntax classes.
  - Distribution width switching: `normal` $\leftrightarrow$ `semi-extended` updates all 6 cards (`aria-label` and `[data-distribution-width-note]`) symmetrically.
  - Config Generator ligature flags: selecting `sawala-mono-nl` sets `"editor.fontLigatures": false` / `Enable ligatures = false`; switching back to `sawala-ligar-mono` restores `true` cleanly without mutating base `EDITOR_CONFIG_SNIPPETS`.
- **Variation of the Problem (Boundary & Edge Assertions):**
  - Invalid/unknown `variant` (`"invalid"`, `null`, `""`) in `applySpecimenState` & Polyglot handler normalizes cleanly to `"standard"`.
  - Unknown `familyVariantKey` in `formatEditorConfig` falls back cleanly to `"sawala-mono"` without emitting `"undefined"`.
  - Weight boundaries (`100`, `400`, `600`, `700`, `900`, `NaN`) × slopes (`upright`, `italic`) × 3 families assert exact `Tier A Core WOFF2` vs `Tier B Weight` badge transitions.
- **SOLID Checks at Blueprint Stage:**
  - *Single Responsibility (SRP):* Font assets (`web-docs/fonts/`), design tokens (`tokens.css`), font bindings (`typography.css`), layout rules (`showcase.css`), registries (`distribution-cards.js`, `config-generator.js`), and interactive DOM controllers (`specimen-tester.js`, `polyglot-runner.js`) each retain one cohesive responsibility.
  - *Open/Closed (OCP):* Data-driven registries (`DISTRIBUTION_TIERS`, `CONFIG_FONT_FAMILIES`, `TIER_A_WEIGHTS_BY_VARIANT`) extend cleanly to `Sawala Ligar Mono` without rewriting core formatting or card loop algorithms.

---

## 6. Risks & Extracted Assumptions

*Extracted from `docs/spec/web-showcase-sawala-ligar-sync-spec.md` (`v1.3.0`) and `docs/audit/web-showcase-sawala-ligar-sync-spec-clarification.md` (`100/100`):*

- **[ASSUMPTION-001 — Resolved: Option A] (`TASK-001` — High Risk):** Local Windows host lacks `node_modules`/`docker`, so `SawalaLigarMono-Regular.woff2` and `SawalaLigarMono-Italic.woff2` require a GitHub Actions `build.yml` run (`format: woff2`, `variant: SawalaLigarMono`, `create_release: false`). — *Mitigation:* Scheduled explicitly as `TASK-001` gate with Contingency Plan B documented in Section 4.
- **[ASSUMPTION-002 — Resolved: Accepted] (`TASK-002`):** Keep `<link rel="preload">` in `index.html:29-32` restricted to 4 core `SawalaMono` weights; load `"Sawala Ligar Mono"` on-demand via `@font-face` (`font-display: swap`). — *Mitigation:* Assert preload count remains `4` in `TASK-003`.
- **[ASSUMPTION-003 — Resolved: Option B] (`TASK-005`):** Replace `#polyglot-calt-toggle` with 3 compact segmented pill buttons (`Standard` | `Ligar` | `NL`) inside `.polyglot-runner__meta`. — *Mitigation:* Verify `.polyglot-runner__meta` `flex-wrap: wrap` and `variant-switcher-tab` `min-height: 44px` on `<= 768px` mobile (`[RISK-001]`).
- **[ASSUMPTION-004 — Provisional Ceiling] (`TASK-001`, `TASK-003`):** Enforce `<= 650 KB` (`665,600` B) per `.woff2` file and `<= 1.25 MB` (`1,310,720` B) combined. — *Mitigation:* Measure exact byte sizes in `TASK-001` / `TASK-003` and trigger Contingency 2 if exceeded.
- **[RISK-001] Mobile Toolbar Crowding (`TASK-005`):** Adding 3 segmented pills alongside filename + copy button in `.polyglot-runner__meta` could crowd `375px` viewports. — *Mitigation:* Use concise labels (`Standard`, `Ligar`, `NL`) and rely on existing `flex-wrap: wrap` (`typography.css:592`) with `gap: var(--space-xs)`.
- **[RISK-002] 7-Column Table Overflow (`TASK-010`):** Expanding `distributions.html` from 5 to 7 columns increases minimum table width. — *Mitigation:* Keep table strictly inside `.doc-table-wrap` (`overflow-x: auto`) so page `documentElement.scrollWidth <= innerWidth` holds at `375px` and `1024px`.

---

## 7. Rollback & Recovery Strategy

Because Wave 2 modifies only static showcase files (`index.html`, `web-docs/*`, `DESIGN.md`) and leaves font compilation packages and release workflows untouched:
1. Revert the Wave 2 commit(s) cleanly: `git revert <commit-range>` (or `git checkout HEAD -- index.html web-docs/ DESIGN.md` if uncommitted).
2. Remove `web-docs/fonts/sawala-mono/SawalaLigarMono-{Regular,Italic}.woff2` if reverting prior to push.
3. Pushing the reverted `main` branch automatically triggers `.github/workflows/pages.yml`, restoring the prior 4-distribution GitHub Pages site within ~1 minute with zero database or release-tag side effects.

---

## 8. 🚩 Pre-Flight Self-Correction Checklist (Anti-Patterns)

- [x] **No Horizontal Slicing:** Every implementation ticket (`TASK-002`, `TASK-005`, `TASK-006`, `TASK-007`, `TASK-010`, `TASK-011`) delivers an end-to-end user-visible vertical slice.
- [x] **No Bloated Tasks (XL):** Maximum file footprint per task is `5` (`M`); zero tasks touch $\ge 8$ files.
- [x] **Strict Traceability:** Every actionable task links explicitly to `REQ-001`–`REQ-007`, `CON-001`–`CON-006`, and `AC-001`–`AC-008` with zero orphaned tasks.
- [x] **Deterministic Dependencies:** `Dep` flows strictly bottom-up from `TASK-001` (CI WOFF2 prerequisite) $\to$ `TASK-002` (Specimen + tokens/`@font-face`) $\to$ Phase 2 (`TASK-005`..`007`) $\to$ Phase 3 (`TASK-010`..`011`).
- [x] **Mandatory Verification & Approval:** Every phase terminates in explicit `VERIFY` (`check:task` / `check:full`) and `APPROVAL` pause gates.
