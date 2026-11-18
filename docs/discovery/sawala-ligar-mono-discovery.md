# 🔭 Project Discovery Draft: Sawala Ligar Mono Variant

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `Iosevka (Sawala Mono)`  
**Status:** **Draft**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable-->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** The repository currently builds and distributes only two base build plans—`SawalaMono` (Consolas-derived `ss03` with strict `earless`/`toothless` geometry and `calt` programming ligatures) and `SawalaMonoNL` (its no-ligature sibling)—plus their Nerd Font patched derivatives `[VERIFIED: private-build-plans.toml:7-148]`, `[VERIFIED: docs/ARCHITECTURE.md:20-24]`. Developers who appreciate Sawala Mono's proportions, slashed zero, and ligatures but prefer a warmer, more expressive, and slightly more editorial/curly letterform aesthetic have no official sibling variant to choose from.
- **Business Value & Why Now:**
  - Expands the Sawala typeface family with a distinct stylistic voice (**Sawala Ligar Mono** — Sundanese *ligar*, meaning *blooming, opening gracefully, unconstrained*) while preserving Sawala's cultural identity (`[VERIFIED: README.md:45]`) and 2-width/2-slope coding ergonomics (`Normal` 500 + `SemiExtended` 548, `Upright` 0° + `Italic` 9.4°).
  - Delivers the core font and Nerd Font (`Sawala Ligar Mono NF`) first—maximizing immediate utility for IDE and terminal users without blocking on web-showcase asset refactoring.
- **Target Persona & Users:** Developers, technical writers, and terminal/Neovim users who want a curly-expressive, humanist-leaning monospace coding typeface with full `default-calt` ligatures and Nerd Font icon support.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | A third official build plan `[buildPlans.SawalaLigarMono]` (`family = "Sawala Ligar Mono"`) integrated into the Iosevka build graph, GitHub Actions build/release workflow, Nerd Font patching pipeline (`Sawala Ligar Mono NF`), and `README.md` documentation. |
| **Known Data** | Existing `SawalaMono`/`SawalaMonoNL` build plans (`private-build-plans.toml`), Iosevka v34.9.1 variant catalog (`params/variants.toml`, including `[composite.ss20]` Curly Style), Verda build engine (`verdafile.mjs`), Docker build/patch pipelines (`.github/workflows/build.yml`, `.github/workflows/patch-nerd-font.yml`), and the user-crafted selective-curly variant recipe. |
| **The Conditions & Invariants** | 1. **Ligation Parity:** Must enable `[buildPlans.SawalaLigarMono.ligations]` inheriting `"default-calt"` (omitting it would silently disable `calt` ligatures per `verdafile.mjs:347` and `ligation.mjs:11-13`).<br>2. **Metric & Matrix Consistency:** Must match `SawalaMono` widths (`Normal` = 500, `SemiExtended` = 548) and slopes (`Upright` = 0°, `Italic` = 9.4°).<br>3. **CI/CD & Nerd Font Compatibility:** Release artifacts and Nerd Font patching must cleanly support `SawalaLigarMono` without breaking `SawalaMono` or `SawalaMonoNL` (`--mono` and single-column icon metrics preserved).<br>4. **Scoped Delivery (Wave 1):** Exclude `Sawala Ligar Mono NL` and defer static web showcase updates (`index.html`, `web-docs/`) to a later phase after compiled binaries are visually verified. |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

- **Relevant Directories & Modules (`[VERIFIED: docs/ARCHITECTURE.md:100-130]`):**
  - `private-build-plans.toml` (Domain Layer): Declares `[buildPlans.SawalaMono]` (`lines 7-76`) and `[buildPlans.SawalaMonoNL]` (`lines 81-148`).
  - `params/variants.toml` (Domain Layer): Defines `[composite.ss03]` (`lines 11146-11249`, Consolas Style used by `SawalaMono`), `[composite.ss20]` (`lines 13567-13607`, Curly Style), and individual glyph prime selectors (`one`, `four`, `seven`, `zero`, `a`, `b`, `d`, `f`, `j`, `n`, `p`, `q`, `r`, `s`, `t`, `punctuation-dot`, etc.).
  - `verdafile.mjs` & `packages/param/src/` (Frameworks & Application Layers): Resolves `bp.ligations || null` (`verdafile.mjs:347`) and builds OpenType `calt` lookups only when `argv.ligations` is present (`packages/param/src/ligation.mjs:11-13`).
  - `.github/workflows/build.yml` (Frameworks/CI): `all` dynamically discovers build plans via `grep -Po '^\[buildPlans\.\K[a-zA-Z0-9_-]+(?=\])' private-build-plans.toml` (`line 81`), and packages every folder under `dist/` into `archives/*.zip` (`lines 118-126`).
  - `.github/workflows/patch-nerd-font.yml` (Frameworks/CI): Downloads base release archives, filters by `font_scope` (`core`, `extended-core`, `all`), and patches via `nerdfonts/patcher:latest`.
  - `README.md` & `web-docs/` (Documentation & Presentation): Documents the 4 current variants (`README.md:57-62`) and powers the static showcase (`web-docs/js/distribution-cards.js:29`, `web-docs/js/specimen-tester.js:182`, `web-docs/css/typography.css:44`).
- **Architectural Debt & Seam Vulnerabilities (Premise Critique):**
  1. **Hardcoded Variant Coupling in CI Workflows (`[VERIFIED]`):**
     - `build.yml:11-14` and `patch-nerd-font.yml:16-19` hardcode `workflow_dispatch` `variant` dropdown choices (`all`, `SawalaMono`, `SawalaMonoNL`).
     - `patch-nerd-font.yml:90` downloads release zips using `--pattern "*SawalaMono*.zip"`, which **silently skips** `SawalaLigarMono-*.zip` because `"Ligar"` sits between `"Sawala"` and `"Mono"`.
     - `patch-nerd-font.yml:96-99` and `line 130` (`VARIANTS=("SawalaMono" "SawalaMonoNL")`) use two-branch string logic that assumes every variant starts with `SawalaMono`.
  2. **Silent No-Ligation Trap (`[VERIFIED]`):**
     - Omitting `[buildPlans.SawalaLigarMono.ligations]` in `private-build-plans.toml` does not throw a build error; `verdafile.mjs:347` sets `ligations: null` and `ligation.mjs:11` skips `calt` generation, producing an unintended no-ligation font unless explicitly configured.
  3. **Inversion — "Why Might This Fail?":**
     - *CI Runtime & Matrix Bloat:* Adding a third full 36-weight build plan increases full `all` build duration in GitHub Actions (currently capped at `timeout-minutes: 90` in `build.yml:42` and `patch-nerd-font.yml:50`) and increases release zip count.
     - *Inconsistent Variant Filtering:* If `patch-nerd-font.yml` is updated partially (e.g., dropdown updated without updating the download glob on `line 90` and `VARIANTS` array on `line 130`), dispatching `variant: SawalaLigarMono` will fail with `Zero TrueType (.ttf) font files found to patch`.
  4. **Simpler Alternative (20% Effort / 80% Value):**
     - Instead of introducing `SawalaLigarMono` + `SawalaLigarMonoNL` + full `web-docs/` showcase updates in one batch, shipping **only `SawalaLigarMono` (with `default-calt`) + `Sawala Ligar Mono NF` + `README.md`** delivers 80% of user value while keeping CI build time and diff blast radius minimal.

### 3.2 Analogous Solutions & Prior Art
- **Internal Analogies:**
  - `SawalaMono` and `SawalaMonoNL` in `private-build-plans.toml` demonstrate the canonical width/slope/feature configuration pattern (`exportGlyphNames = false`, `noCvSs = true`, `serifs = "sans"`, `spacing = "normal"`).
  - Upstream `IosevkaCurly` (`build-plans.toml:56-63`) demonstrates `inherits = "ss20"` as the curly-style baseline.
- **External Analogies:**
  - Popular coding fonts often publish an expressive/cursive/curly sibling family alongside their standard sans monospace family while sharing metric grids (`Normal` + `SemiExtended`), allowing seamless IDE fallback and side-by-side installation.

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: `private-build-plans.toml` Only (Local Build) | Option B: Generalized CI + `SawalaLigarMono` + `NF` + `README.md` (Wave 1) | Option C: Full Matrix (`SawalaLigarMono` + `NL` + `NF` + `web-docs/` Showcase) |
| :--- | :--- | :--- | :--- |
| **Summary** | Add `[buildPlans.SawalaLigarMono]` locally without updating workflows or docs. | Add `SawalaLigarMono` (with `default-calt`), generalize `patch-nerd-font.yml` & `build.yml` variant handling, and update `README.md`. Defer `web-docs/`. | Ship both `Ligar` and `Ligar NL` variants, CI/CD, `README.md`, WOFF2 assets, and interactive `web-docs/` switcher immediately. |
| **Clean Architecture Seams** | Domain-only change; CI/CD remains coupled to `SawalaMono*` assumptions. | Respects Domain (`private-build-plans.toml`), Frameworks/CI (`build.yml`, `patch-nerd-font.yml`), and Docs (`README.md`) while keeping Presentation (`web-docs/`) cleanly decoupled (`CON-005`). | Crosses all layers simultaneously, multiplying verification surface (`WOFF2` subsets, CSS, JS, CSP, a11y). |
| **Complexity & Risk** | Low effort, but CI Nerd Font patching silently breaks/skips the new variant. | Moderate effort, low risk; fixes CI glob coupling cleanly for any future `Sawala*Mono` variant. | High effort, high risk of CI timeout (>90 min) and showcase regression before visual font QA. |
| **Reversibility (Two-Way Door?)** | Easy to add CI later, but unreleasable via GitHub Actions today. | High reversibility; `NL` and `web-docs/` can be layered cleanly in Wave 2. | Harder to roll back published showcase assets and release artifacts. |
| **Recommendation** | Incomplete | **[RECOMMENDED]** | Deferred (Wave 2) |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

- **Technical Unknown 1:** Does every selector and value in the user's draft `[buildPlans.SawalaLigarMono.variants.design]` and `[buildPlans.SawalaLigarMono.variants.italic]` resolve cleanly in Iosevka v34.9.1?
  - **Spike / Feasibility Check:** Inspected `params/variants.toml` definitions for `one`, `four`, `seven`, `zero`, `a`, `b`, `d`, `f`, `j`, `n`, `p`, `q`, `r`, `s`, `t`, and `punctuation-dot` alongside `[composite.ss20]` (`lines 13567-13607`) and `[composite.ss03]` (`lines 11146-11249`).
  - **Findings (`[VERIFIED]` + `[HYPOTHESIS]`):** Key tricky selectors (`seven = "curly-serifless"`, `four = "closed-serifless"`, `n = "straight-serifless"`, `p = "eared-serifless"`, `t = "flat-hook"`, `a = "single-storey-tailed"`, `punctuation-dot = "round"`) exist in `params/variants.toml`. Remaining selectors (`g`, `i`, `k`, `l`, `m`, `u`, `v`, `w`, `x`, `y`, `z`, `paren`, `brace`) align with `SawalaMono`/`ss20` patterns `[HYPOTHESIS: full runtime validation via Iosevka parameter resolver / Docker build pending in implementation/verification phase]`.
- **Technical Unknown 2:** Will `SawalaLigarMono` + `SawalaMono` + `SawalaMonoNL` fit comfortably within the 90-minute `ubuntu-latest` timeout when `variant: all` is triggered in `build.yml`?
  - **Spike / Feasibility Check:** `[HYPOTHESIS]` Not yet measured with 3 plans; `build.yml` already supports per-variant dispatch (`variant: SawalaLigarMono`), which provides an immediate fallback if `all` approaches timeout.
- **Technical Unknown 3 (Design Polish):** In the draft italic table, `k = "straight-serifless"` is paired with `y = "cursive-serifless"` and `v/w/x/z = "curly-serifless"` (whereas both `SawalaMono` and `ss20` use `k = "cursive-serifless"` in italic). Confirm during `/to-spec` whether upright-like `k` in italic is an intentional stylistic choice.

---

## 6. Strategic Recommendation & Handoff to Specification

- **Selected Architectural Path:** **Option B (Wave 1: Core Build Plan + Generalized CI/Nerd Font + `README.md`)**.
  - Add `[buildPlans.SawalaLigarMono]` (family `"Sawala Ligar Mono"`) with `[buildPlans.SawalaLigarMono.ligations]` (`inherits = "default-calt"`).
  - Generalize `.github/workflows/patch-nerd-font.yml` (`*Sawala*.zip` download glob, `SawalaLigarMono` in dropdown & `VARIANTS` array, exact prefix matching so `SawalaMono` does not collide with `SawalaMonoNL` or `SawalaLigarMono`) and update `.github/workflows/build.yml` dropdown choices.
  - Update `README.md` Variant Matrix & Installation instructions; defer `Sawala Ligar Mono NL` and `web-docs/` showcase integration to Wave 2 after binary QA.
- **High-Impact Decisions (ADR Candidate):** Optional — adding a new public font family (`Sawala Ligar Mono`) and generalizing CI glob patterns (`*Sawala*.zip`) is straightforward and reversible, though documenting the variant-naming & CI matching convention in an ADR or `docs/ARCHITECTURE.md` update during implementation is beneficial.
- **Domain Vocabulary Candidates (`CONTEXT.md`):** (`CONTEXT.md` does not yet exist at root; if created later, register canonical terms):
  - **Sawala Ligar Mono** — Expressive selective-curly coding distribution (`ss20`-derived with `default-calt` ligatures), distinct from `Sawala Mono` (`ss03`-derived).
  - **Ligar** — Sundanese term meaning *blooming / opening gracefully*, designating Sawala's curly-stroke family line.

### 6.1 Downstream Readiness Checklist (for `/to-prd` or `/to-spec`)
- [x] **The Unknown:** `SawalaLigarMono` build plan (`default-calt` + `NF` support + `README.md`) is clearly defined.
- [x] **The Data:** Exact draft TOML recipe, `params/variants.toml`, `verdafile.mjs`, and workflow files are identified.
- [x] **The Condition:** Metric parity, `default-calt` ligation invariant, Nerd Font `--mono` compatibility, and Wave 1 scope boundary (no `NL`, no `web-docs/`) are documented.
- [x] **Clean Architecture Seams:** Domain (`private-build-plans.toml`), Infra/CI (`build.yml`, `patch-nerd-font.yml`), and Docs (`README.md`) boundaries are mapped, leaving Presentation (`web-docs/`) untouched in Wave 1.
- [ ] **Risks & Spikes:** Full parameter-resolver validation (`npm run build -- contents::SawalaLigarMono` or Docker dry-run) and `italic.k` preference check remain to be verified in Spec/Plan/Code.

### 6.2 Forking Handoff Actions (`/to-prd` or `/to-spec`)
Choose the downstream path matching your project's workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/sawala-ligar-mono-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and acceptance criteria based on this Discovery Draft.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint):**
  ```text
  /to-spec @docs/discovery/sawala-ligar-mono-discovery.md Formulate formal technical specification, configuration contracts, and CI/workflow seam changes based on this approved Discovery Draft.
  ```

---

## 7. Appendix: Candidate Build Plan Input (Reference Data Only)

> [!NOTE]
> This TOML snippet is the exact user-provided **candidate input** captured during Phase 0 discovery for downstream `/to-spec` processing. It has **not** yet been applied to `private-build-plans.toml`. Per Section 2 (Condition #1: **Ligation Parity**), `[buildPlans.SawalaLigarMono.ligations]` (`inherits = "default-calt"`) must be added when formalizing the specification.

```toml
[buildPlans.SawalaLigarMono]
family = "Sawala Ligar Mono"
spacing = "normal"
serifs = "sans"
noCvSs = true
exportGlyphNames = false

  [buildPlans.SawalaLigarMono.variants]
  inherits = "ss20"

    [buildPlans.SawalaLigarMono.variants.design]
    one = "no-base-long-top-serif"
    four = "closed-serifless"
    seven = "curly-serifless"
    zero = "reverse-slashed"
    a = "double-storey-tailed"
    b = "toothed-serifless"
    d = "toothed-serifless"
    f = "flat-hook-serifed"
    g = "double-storey"
    i = "serifed"
    j = "flat-hook-serifed"
    k = "straight-serifless"
    l = "serifed"
    m = "earless-corner-double-arch-serifless"
    n = "straight-serifless"
    p = "eared-serifless"
    q = "straight-serifless"
    r = "serifed"
    s = "serifless"
    t = "flat-hook"
    u = "toothed-serifless"
    v = "straight-serifless"
    w = "straight-serifless"
    x = "curly-serifless"
    y = "straight-turn-serifless"
    z = "curly-serifless"
    punctuation-dot = "round"
    paren = "large-contour"
    brace = "curly-flat-boundary"

    [buildPlans.SawalaLigarMono.variants.italic]
    one = "no-base-long-top-serif"
    four = "closed-serifless"
    zero = "reverse-slashed"
    a = "single-storey-tailed"
    b = "toothed-serifless"
    d = "toothed-serifless"
    f = "flat-hook-tailed"
    g = "single-storey-serifless"
    i = "serifed-semi-tailed"
    j = "flat-hook-serifed"
    k = "straight-serifless"
    l = "serifed-semi-tailed"
    m = "earless-corner-double-arch-serifless"
    n = "earless-corner-straight-serifless"
    p = "earless-corner-serifless"
    q = "earless-corner-straight-serifless"
    r = "base-serifed"
    s = "serifless"
    t = "flat-hook"
    u = "toothed-serifless"
    v = "curly-serifless"
    w = "curly-serifless"
    x = "curly-serifless"
    y = "cursive-serifless"
    z = "curly-serifless"
    paren = "large-contour"
    brace = "curly-flat-boundary"

[buildPlans.SawalaLigarMono.widths.Normal]
shape = 500
menu = 5
css = "normal"

[buildPlans.SawalaLigarMono.widths.SemiExtended]
shape = 548
menu = 6
css = "semi-expanded"

[buildPlans.SawalaLigarMono.slopes.Upright]
angle = 0
shape = "upright"
menu = "upright"
css = "normal"

[buildPlans.SawalaLigarMono.slopes.Italic]
angle = 9.4
shape = "italic"
menu = "italic"
css = "italic"
```
