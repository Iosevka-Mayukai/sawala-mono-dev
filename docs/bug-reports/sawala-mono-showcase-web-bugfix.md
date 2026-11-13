---
goal: "Remediate Iteration 2 Review Defects Across Spec, Plan, Showcase UI, CSS, JS, Prism & GitHub Pages CI"
version: "1.0.0"
date_created: "2026-11-13"
status: "Resolved"
tags: ["polya", "bug-fix", "first-principles", "problems-to-prove", "review-remediation"]
---
<!-- markdownlint-disable-->

# Bug Remediation Plan: Iteration 2 Showcase Spec/Code Drift, WCAG Contrast, Data Accuracy & Runtime Defects

> [!IMPORTANT]
> **FIRST PRINCIPLES BUG FIXING DIRECTIVE:**  
> Cease blind patching. Isolate every broken seam with failing reproduction checks first (`TDD Red`), then apply minimal, mutually consistent fixes across Spec, Plan, HTML, CSS, JS, Prism, and CI (`TDD Green`), followed by real Chromium runtime verification.

## 1. Problem Classification: Problems to Prove

- **Observed Symptoms:**
  1. Spec, Plan, `index.html`, `distributions.html`, `polyglot-runner.js`, and `glyph-matrix.js` display `Cap 690` (`cap_height = 690`), contradicting compiled parametric engine ground truth `cap = 735` (`params/parameters.toml`), and `#comparison-stage` omits the x-height/cap-height guide lines mandated by `AC-019` while clipping/wrapping poorly on mobile (`375px`).
  2. `distribution-cards.js:72` marks `Sawala Mono NL NF` with `hasNerdFont: false` and introduces extra field `hasNerdFontIcons: true`; NF release filenames/URLs mix `latest` (`SawalaMono-NF-latest.zip`) vs `v1.0.0` (`SawalaMono-v1.0.0.zip`), `installation.html` copies `SawalaMono/*.ttf` instead of `SawalaMono/TTF/*.ttf` (`verdafile.mjs:581`), and `.github/workflows/pages.yml` uploads `path: "."` (~641 repo files) instead of only static showcase assets.
  3. `index.html`, `ligature-playground.js`, `ligatures.html`, and `glyph-matrix.js` list non-`default-calt` sequences (`++`, `__`, `??=`, `=/=`, `=!=`, `/=`, `~=`, `&&`, `<.`, `<.>`) and inaccurate `ss03` variant descriptions (`6`, `9`, `@`, `#`, `?`, `j`, `r`, `ß`) relative to `params/ligation-set.toml` and `params/variants.toml`.
  4. `polyglot-runner.js:216` deletes the fallback `<textarea>` before returning `false` on clipboard failure, destroying user selection; `config-generator.js:342-347` never hides/cleans `.is-visible` on the fallback textarea during the `2000ms` reset timer.
  5. WCAG 2.1 AA failures (`CON-007`): `.button-primary:hover` (`#ffffff` on `#828fff` $\approx 2.87:1 < 4.5:1$), `--syntax-comment` (`#565f89` on `#191a1b`/`#141516` $\approx 2.85\text{--}3.37:1 < 4.5:1$), and `.control-slider` (`min-height: 24px` at mobile breakpoint $< 44\text{px}$).
  6. Spec/Plan/Doc inconsistencies: `CON-004` + `distributions.html:198` still claim $\le 180\text{ KB}$ Tier A web subsets despite Contingency Plan B using full WOFF2 builds (`brotli` unavailable), `distributions.html:218-266` uses inline `style="font-weight: ..."` preventing strict `style-src 'self'`, `REQ-003` vs `AC-005` Card 4 copy mismatch, and `Plan §9` claiming `biome check .` and `update-package-json-version.mjs --dry-run` passed when both exit `1`.
- **The Hypothesis:** Earlier phases copied several discovery assumptions (Ioskeley `Cap 690`, idealized `default-calt`/`ss03` names, `latest` NF zip convention, `180 KB` subset target, passing monorepo commands) without validating each claim directly against `params/*.toml`, `.github/workflows/*.yml`, WCAG contrast formulas, and browser DOM execution.
- **Contradictions / Minimal Counterexamples:**
  - `520 / 735 = 0.7075 < 0.75` (`polyglot-runner.js` ratio assertion fails for real Sawala `cap = 735`).
  - `TIER.id === "sawala-mono-nl-nf"` yields `tier.hasNerdFont === false` (`distribution-cards.js:72`).
  - `contrast("#ffffff", "#828fff") = 2.87 < 4.5` (`typography.css:383-395`).

### 1.1 Remediation Requirements & Constraints
- **REQ-FIX-001:** Align 100% of typographic metrics (`cap = 735`, `xHeight = 520`), `default-calt` ligatures, `ss03` glyph descriptors, release filenames (`v1.0.0`), and `*/TTF/*.ttf` archive layouts across Spec, Plan, HTML, and JS.
- **REQ-FIX-002:** Restore `hasNerdFont: true` contract, clipboard selection fallbacks (`AC-014`), comparison alignment guides (`AC-019`), mobile layout cleanliness, and Prism mini tokenizer accuracy.
- **CON-FIX-001:** Achieve WCAG 2.1 AA contrast $\ge 4.5:1$ across primary buttons and syntax comments, $\ge 44\text{px}$ mobile touch targets, strict CSP `style-src 'self'` (zero inline `style="..."` HTML attributes), and zero modifications to core compiler packages (`CON-005`).

---

## 2. Tracing the Broken Seams

- **Exact Broken Seam Locations:**
  - Metrics & Guides Seam: [`docs/spec/sawala-mono-showcase-web-spec.md:91,429,660,840`](../../docs/spec/sawala-mono-showcase-web-spec.md), [`index.html:106,441-479,1014`](../../index.html), [`web-docs/pages/distributions.html:146-149`](../../web-docs/pages/distributions.html), [`web-docs/js/polyglot-runner.js:75-82`](../../web-docs/js/polyglot-runner.js), [`web-docs/js/glyph-matrix.js:717`](../../web-docs/js/glyph-matrix.js).
  - Release / Packaging / CI Seam: [`web-docs/js/distribution-cards.js:56-82`](../../web-docs/js/distribution-cards.js), [`index.html:1362-1417`](../../index.html), [`web-docs/pages/distributions.html:112,174-184`](../../web-docs/pages/distributions.html), [`web-docs/pages/installation.html:133,143,163,181-190`](../../web-docs/pages/installation.html), [`web-docs/js/terminal-preview.js:135,139`](../../web-docs/js/terminal-preview.js), [`web-docs/js/config-generator.js:30`](../../web-docs/js/config-generator.js), [`.github/workflows/pages.yml:36-40`](../../.github/workflows/pages.yml).
  - Ligation & Variant Metadata Seam: [`index.html:631-635`](../../index.html), [`web-docs/js/ligature-playground.js:4,82-87,114-119`](../../web-docs/js/ligature-playground.js), [`web-docs/js/polyglot-runner.js:12,22`](../../web-docs/js/polyglot-runner.js), [`web-docs/pages/ligatures.html`](../../web-docs/pages/ligatures.html), [`web-docs/js/glyph-matrix.js`](../../web-docs/js/glyph-matrix.js).
  - Clipboard Fallback Seam: [`web-docs/js/polyglot-runner.js:202-218`](../../web-docs/js/polyglot-runner.js), [`web-docs/js/config-generator.js:342-347`](../../web-docs/js/config-generator.js).
  - Contrast, CSP, ARIA & Responsive Seam: [`web-docs/css/tokens.css:27-30,91`](../../web-docs/css/tokens.css), [`web-docs/css/typography.css:383-395`](../../web-docs/css/typography.css), [`web-docs/css/showcase.css:1619-1621`](../../web-docs/css/showcase.css), [`web-docs/pages/distributions.html:7,198,218-266`](../../web-docs/pages/distributions.html), [`web-docs/vendor/prism/prism.min.js`](../../web-docs/vendor/prism/prism.min.js).
- **Root Cause Categories:** *Contract / Schema Drift* + *Domain Logic / Boundary Violation* + *Environment / Packaging Skew*.
- **Caller Grep Sweep Completed:** Grepped `index.html`, `web-docs/pages/*.html`, `web-docs/js/*.js`, `web-docs/css/*.css`, `docs/spec/*.md`, `docs/plan/*.md` for `690`, `latest`, `180`, `hasNerdFont`, `??=`, `++`, `style=`, `unsafe-inline`, `ligation-data`.

---

## 3. Implementation Steps (The Prove-It Pattern)

### Phase 1: Test Writing (Isolate & Prove All Defects — TDD Red)

| Task ID | Description | Ref ID | Target / Script | Completed |
| :--- | :--- | :--- | :--- | :---: |
| `BUG-101` | Write automated reproduction test verifying the failure signatures: `cap 690` drift, `hasNerdFont: false`, `latest` URL skew, non-`default-calt` ligatures, WCAG contrast `< 4.5:1`, inline `style="..."` attrs + `'unsafe-inline'`, clipboard fallback removal, `44px` slider mobile violation, missing comparison guide elements, and `.github/workflows/pages.yml` `path: "."` bloat | `REQ-FIX-001..002`, `CON-FIX-001` | `scratch/repro-review-findings.mjs` | [x] |
| `BUG-10X` | **VERIFY (`TDD Red`):** Run `node scratch/repro-review-findings.mjs` and observe every target defect failing cleanly | - | Terminal Output | [x] |

### Phase 2: Surgical Root-Cause Remediation Across All Seams (`TDD Green`)

| Task ID | Description | Ref ID | Files Impacted | Completed |
| :--- | :--- | :--- | :--- | :---: |
| `BUG-201` | Align Spec & Plan ground truth: `cap = 735`, `v1.0.0` NF archive names, `default-calt` sample set, `REQ-003` Card 4 wording, `CON-004` Contingency Plan B honesty waiver, `CON-006` strict `style-src 'self'`, `CON-008` staged `_site` deploy, accurate `Plan §9` commands | `REQ-FIX-001`, `CON-FIX-001` | [`docs/spec/sawala-mono-showcase-web-spec.md`](../../docs/spec/sawala-mono-showcase-web-spec.md), [`docs/plan/sawala-mono-showcase-web-plan.md`](../../docs/plan/sawala-mono-showcase-web-plan.md) | [x] |
| `BUG-202` | Fix CSS tokens, WCAG AA contrast (`>= 4.5:1`), mobile `>= 44px` touch targets, comparison guide lines styles, `.font-w-100..900` weight utility classes, and mobile comparison wrapping | `CON-FIX-001` | [`web-docs/css/tokens.css`](../../web-docs/css/tokens.css), [`web-docs/css/typography.css`](../../web-docs/css/typography.css), [`web-docs/css/showcase.css`](../../web-docs/css/showcase.css), [`web-docs/vendor/prism/prism-sawala-dark.css`](../../web-docs/vendor/prism/prism-sawala-dark.css) | [x] |
| `BUG-203` | Update `index.html` and all 3 subpages: `Cap 735`, comparison guide markup (`AC-019`), `+++` ligature tile, `v1.0.0` NF release links, `*/TTF/*.ttf` install commands, `.font-w-*` weight classes (zero inline styles), strict CSP `style-src 'self'`, `role="slider"`, social canonical meta, and 55 genuine `default-calt` rows in `ligatures.html` | `REQ-FIX-001`, `CON-FIX-001` | [`index.html`](../../index.html), [`web-docs/pages/distributions.html`](../../web-docs/pages/distributions.html), [`web-docs/pages/installation.html`](../../web-docs/pages/installation.html), [`web-docs/pages/ligatures.html`](../../web-docs/pages/ligatures.html) | [x] |
| `BUG-204` | Fix JS controllers & Prism tokenizer: `distribution-cards.js` (`hasNerdFont: true`, `v1.0.0` URLs), `polyglot-runner.js` (`cap_height = 735`, `>= 0.70`, preserve fallback selection), `config-generator.js` (hide fallback textarea cleanly, JetBrains tip), `ligature-playground.js` (real `default-calt` samples, `Home`/`End`, `aria-labelledby`), `glyph-matrix.js` (accurate `ss03` + `735`), `main.js` (`aria-labelledby`), `terminal-preview.js` (`v1.0.0`), `prism.min.js` (booleans, Rust/Lua tokens, per-language highlights) | `REQ-FIX-001..002` | [`web-docs/js/*.js`](../../web-docs/js/), [`web-docs/vendor/prism/prism.min.js`](../../web-docs/vendor/prism/prism.min.js) | [x] |
| `BUG-205` | Tighten `.github/workflows/pages.yml` to stage only static showcase files (`index.html`, `.nojekyll`, `sawala-mono-hero-img.jpg`, `web-docs/`) into `_site` before `upload-pages-artifact@v3` | `CON-FIX-001` | [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml) | [x] |
| `BUG-20X` | **VERIFY (`TDD Green` + Live Browser):** Re-run `scratch/repro-review-findings.mjs` (all pass), `node --check`, `impeccable detect --json`, WCAG contrast checks, and live Chromium mobile+desktop runtime audit (`http://127.0.0.1:4173`) verifying zero CSP/console errors | `REQ-FIX-001..002`, `CON-FIX-001` | Verification Suite + [`docs/reviews/sawala-mono-showcase-web-review.md`](../reviews/sawala-mono-showcase-web-review.md) | [x] |

---

## 4. Invariant Protection & Regression Defense

- **Restored Invariants:**
  - Every displayed font metric (`cap = 735`, `x-height = 520`, `width = 500`), ligation row (`default-calt`), glyph variant (`ss03`), and release asset (`*/TTF/*.ttf`, `v1.0.0`) matches ground-truth configuration files.
  - Strict CSP (`style-src 'self'` without `'unsafe-inline'`) executes cleanly with 0 console/CSP errors.
  - Primary interactive colors (`>= 4.5:1`) and mobile touch targets (`>= 44px`) conform to WCAG 2.1 AA.
- **Negative Testing (*Reductio ad Absurdum*):** Reproduction suite asserts that `"cap_height: int = 690"`, `"Cap 690"`, `hasNerdFont: false` on NF tiers, `'unsafe-inline'`, `path: "."` in `pages.yml`, and non-`calt` tokens (`??=`, `=/=`, `=!=`, `~/`, `&&`) never re-enter the codebase.

---

## 5. Circuit-Breaker & Incubation Contingency

- **Retry Budget:** Max 2 failed attempts before halting and reporting contradiction telemetry.
- **Escalation Path:** If strict `style-src 'self'` causes any runtime CSSOM CSP error in Chromium on any browser interaction, re-verify exact sink line before falling back or adjusting mechanism.

---

## 6. Rollback Strategy

1. Revert showcase/doc changes cleanly via `git checkout -- index.html web-docs/ .github/workflows/pages.yml docs/`.
2. Core compiler packages (`packages/`, `params/`, `verdafile.mjs`) remain 100% untouched throughout.
