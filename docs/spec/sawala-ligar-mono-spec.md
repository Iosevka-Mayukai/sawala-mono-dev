---
title: "Sawala Ligar Mono Variant Build Plan, CI/CD & Nerd Font Integration"
version: "1.1.0"
date_created: "2026-11-16"
last_updated: "2026-11-18"
status: "Approved"
discovery_ref: "docs/discovery/sawala-ligar-mono-discovery.md"
tags: ["polya", "spec", "clean-architecture", "build-plan", "iosevka", "nerd-font"]
---
<!-- markdownlint-disable-->

# Technical Specification: Sawala Ligar Mono Variant

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
- **Target Outcome:** Introduce a third official Iosevka build plan, **`[buildPlans.SawalaLigarMono]`** (`family = "Sawala Ligar Mono"`), featuring a user-curated selective-curly (`ss20`-inherited) glyph profile with `default-calt` programming ligatures, full GitHub Actions compilation/release packaging (`build.yml`), automated Nerd Font patching (`Sawala Ligar Mono NF` via `patch-nerd-font.yml`), and updated variant/architecture documentation (`README.md`, `docs/ARCHITECTURE.md`, and `CONTEXT.md`).
- **Definition of Done:**
  1. `private-build-plans.toml` contains `[buildPlans.SawalaLigarMono]` with the complete user-specified `design`/`italic` variants (including `italic.k = "cursive-serifless"`), `Normal`/`SemiExtended` widths, `Upright`/`Italic` slopes, and `[buildPlans.SawalaLigarMono.ligations]` inheriting `"default-calt"`.
  2. `.github/workflows/build.yml` supports dispatching `SawalaLigarMono` individually as well as via `all` (`timeout-minutes: 150`), producing `SawalaLigarMono-<version>.zip`.
  3. `.github/workflows/patch-nerd-font.yml` cleanly downloads, filters, patches (`--mono`, `timeout-minutes: 150`), and packages `SawalaLigarMono` without colliding with `SawalaMono` or `SawalaMonoNL`.
  4. `README.md`, `docs/ARCHITECTURE.md`, and `CONTEXT.md` document the `Sawala Ligar Mono` and `Sawala Ligar Mono NF` distributions and philosophy.
- **Explicit Non-Goals (Out of Scope for Wave 1):**
  - **No `Sawala Ligar Mono NL` variant:** No separate no-ligatures build plan (`noLigation = true`) is created in Wave 1.
  - **No Static Web Showcase Updates:** `index.html`, `web-docs/` (`css/`, `js/`, `pages/`, `fonts/sawala-mono/`), and `.github/workflows/pages.yml` remain untouched until compiled `Sawala Ligar Mono` binaries are visually inspected.
  - **No Engine / Patel Script Modifications:** No changes to `packages/font-glyphs/`, `packages/font-otl/`, `packages/param/`, or `verdafile.mjs`.

### 1.2 The Data (Inputs, State & Source-Grounded Context)
- **Active Build Plans (`[VERIFIED: private-build-plans.toml:7-148]`):**
  - `[buildPlans.SawalaMono]`: `family = "Sawala Mono"`, `inherits = "ss03"`, `ligations.inherits = "default-calt"`, `widths.Normal` (shape 500, menu 5, css `"normal"`), `widths.SemiExtended` (shape 548, menu 6, css `"semi-expanded"`), `slopes.Upright` (0°), `slopes.Italic` (9.4°).
  - `[buildPlans.SawalaMonoNL]`: `family = "Sawala Mono NL"`, `noLigation = true`, matching variant/width/slope matrix.
- **Variant & Ligation Engine (`[VERIFIED]`):**
  - `params/variants.toml`: Contains `[composite.ss20]` Curly Style (`lines 13567-13607`) and prime selectors (`one` at `1-57`, `four` at `138-194`, `seven` at `284-340`, `zero` at `385-457`, `a` at `2319-2656`, `b` at `2673-2746`, `d` at `2827-2839`, `f` at `3006-3153`, `g` at `3187-3354`, `j` at `3666-3740`, `n` at `4341-4429`, `p` at `4507-4576`, `q` at `4587-4674`, `r` at `4852-4910`, `s` at `4914-4954`, `t` at `5013-5123`, `punctuation-dot` at `9585-9600`).
  - `verdafile.mjs`: Parses `[buildPlans.*]` (`lines 294-302, 340-352`) and defaults `ligations: bp.ligations || null`, `noLigation: bp.noLigation || false`.
  - `packages/param/src/ligation.mjs`: Generates `calt` lookup tables only when `argv.ligations` is truthy (`lines 11-13`).
- **CI/CD Workflows (`[VERIFIED]`):**
  - `.github/workflows/build.yml`: Hardcodes `variant` choices (`all`, `SawalaMono`, `SawalaMonoNL` at `lines 11-14`), dynamically discovers plans when `VARIANT=all` (`line 81`), and zips `dist/*/` (`lines 118-126`).
  - `.github/workflows/patch-nerd-font.yml`: Hardcodes `variant` choices (`lines 16-19`), downloads `--pattern "*SawalaMono*.zip"` (`line 90`), applies two-branch `SawalaMono` / `SawalaMonoNL` archive filtering (`lines 96-99`), iterates `VARIANTS=("SawalaMono" "SawalaMonoNL")` (`line 130`), and handles `custom_name` NL suffixing (`lines 212-223`).
- **Container Harness (`[VERIFIED: docker/build.sh:15-24,86-91]`):** Copies `private-build-plans.toml` when run directly, while CI and `check:full` invoke `--entrypoint bash` on `/work` (`[VERIFIED: docs/ARCHITECTURE.md:301,329]`).
- **Documentation (`[VERIFIED: README.md:43-294]`):** Explains the Sundanese *sawala* naming philosophy (`lines 43-52`), lists the 4 existing font distributions (`lines 55-63`), release archive names (`lines 70-85`), terminal Nerd Font tip (`lines 185-186`), Method A & B GitHub Actions instructions (`lines 199-255`), and Method C & D local Docker/native build commands (`lines 256-294`).

### 1.3 The Condition (Requirements, Constraints & Invariants)
- **REQ-001 (Build Plan Definition & Variant Fidelity):** Add `[buildPlans.SawalaLigarMono]` to `private-build-plans.toml` with `family = "Sawala Ligar Mono"`, `spacing = "normal"`, `serifs = "sans"`, `noCvSs = true`, `exportGlyphNames = false`, `variants.inherits = "ss20"`, and the user-specified `[buildPlans.SawalaLigarMono.variants.design]` (29 keys), `[buildPlans.SawalaLigarMono.variants.italic]` (27 keys, updated with `k = "cursive-serifless"` per Clarification Iteration 2), `widths` (`Normal`, `SemiExtended`), and `slopes` (`Upright`, `Italic`) blocks.
- **REQ-002 (Programming Ligatures Enablement):** Configure `[buildPlans.SawalaLigarMono.ligations]` with `inherits = "default-calt"` so all programming ligatures (`=>`, `!==`, `->`, `::`, etc.) are compiled into OpenType `calt` tables identically to `SawalaMono`.
- **REQ-003 (CI Compiler Workflow Support):** Update `.github/workflows/build.yml` `workflow_dispatch.inputs.variant.options` to include `SawalaLigarMono` and increase `jobs.build.timeout-minutes` from `90` to `150` (`line 42`), preserving single-job dynamic `all` discovery and per-plan archive output (`SawalaLigarMono-<version>.zip`).
- **REQ-004 (Nerd Font Patcher Workflow Support):** Update `.github/workflows/patch-nerd-font.yml` to:
  1. Add `SawalaLigarMono` to `workflow_dispatch.inputs.variant.options` (`lines 16-19`) and increase `jobs.patch.timeout-minutes` from `90` to `150` (`line 50`).
  2. Broaden the release download pattern from `*SawalaMono*.zip` to `Sawala*.zip` (`line 90`) so `SawalaLigarMono-*.zip` is fetched alongside `SawalaMono-*.zip` and `SawalaMonoNL-*.zip`.
  3. Replace the brittle two-branch archive filter (`lines 96-99`) with an exact-prefix archive retention rule matching `${VARIANT}-*.zip` whenever `VARIANT != "all"`, preventing cross-variant leakage between `SawalaMono`, `SawalaMonoNL`, and `SawalaLigarMono`.
  4. Include `"SawalaLigarMono"` in `VARIANTS` (`line 130`) so `core` / `extended-core` / `all` weight filtering and `nerdfonts/patcher` execution produce `SawalaLigarMono-NF-<tag>.zip` (or `SawalaLigarMono-Extended-NF-<tag>.zip`).
  5. Guard `custom_name` override logic (`lines 212-223`) when `VARIANT = "all"` so that `v = "SawalaLigarMono"` maps a generic `"Sawala Mono"` / `"Sawala Mono NF"` override to `"Sawala Ligar Mono"` / `"Sawala Ligar Mono NF"` rather than colliding with `SawalaMono`'s family name.
- **REQ-005 (Repository & Architecture Documentation Update):** Update `README.md` and `docs/ARCHITECTURE.md` across all variant-referencing sections (aligned with root `CONTEXT.md`):
  1. `README.md` — `Philosophy & Story Behind the Name` (`lines 43-52`): Explain *Sawala Ligar Mono* (from Sundanese *ligar*, meaning *blooming / opening gracefully*).
  2. `README.md` — `Font Variants` table (`lines 55-63`): Add rows for **Sawala Ligar Mono** and **Sawala Ligar Mono NF**.
  3. `README.md` — `Installation -> Pre-built Binaries` (`lines 70-85`): Add `SawalaLigarMono-<version>.zip` and `SawalaLigarMono-NF-<version>.zip`.
  4. `README.md` — `Configuration` tip (`lines 185-186`): Mention `'Sawala Ligar Mono NF'` alongside existing Nerd Font family names.
  5. `README.md` — `Building from Source` (`lines 221-294`): Update Method A (`variant` choices and release archives), Method B (`variant` choices and NF archives), Method C (Docker build commands), and Method D (Native local build commands) to include `SawalaLigarMono`.
  6. `docs/ARCHITECTURE.md` (`lines 20-29, 69-90, 116, 274, 295, 329, 341`): Update active build plan and distribution references from 2 build plans / 4 distributions to 3 build plans (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) / 6 distributions (adding `Sawala Ligar Mono` and `Sawala Ligar Mono NF`).
- **CON-001 (Quality Ratchets & Zero Regression — `[VERIFIED: docs/ARCHITECTURE.md:313-348]`):**
  - `private-build-plans.toml` must parse cleanly with `@iarna/toml` (`check:fast`).
  - Biome lint/format diagnostics across `.mjs` scope must remain at or below the current baseline (`<= 3 errors / <= 5 warnings`; zero new diagnostics).
  - Existing `SawalaMono` and `SawalaMonoNL` definitions and outputs must remain 100% unchanged.
- **CON-002 (Monospace & Nerd Font Metric Invariant):** `patch-nerd-font.yml` must continue enforcing `--mono` and `PN=2` (`lines 207, 229`) for `SawalaLigarMono` so patched icons stay locked to monospace cell widths.
- **CON-003 (Decoupled Presentation Boundary):** `index.html`, `web-docs/`, and `.github/workflows/pages.yml` must NOT be modified in Wave 1.
- **CON-004 (Workflow Syntax & Shell Safety):** All YAML and inline Bash additions in `.github/workflows/*.yml` must remain quoted against word-splitting (`"$VARIANT"`, `"$v"`) and fail fast (`exit 1`) when `ZIP_COUNT` or `STAGED_COUNT` is zero.

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)
- **Is the condition sufficient to determine the unknown?** Yes. Every field of `[buildPlans.SawalaLigarMono]` (identity, variant overrides, ligations, widths, slopes) and every CI/docs touchpoint has an explicit source or deterministic derivation.
- **Is it insufficient?** No. All previously flagged stylistic, CI timeout capacity, `custom_name` override, and documentation synchronization items (`ASSUMPTION-001`–`004`) have been resolved in Section 3.
- **Is it redundant or contradictory?** No contradictions. Notice that while `variants.inherits = "ss20"` sets curly defaults for `k`, `v`, `w`, `y` in `design`, the user's explicit overrides (`k = "straight-serifless"`, `v = "straight-serifless"`, `w = "straight-serifless"`, `y = "straight-turn-serifless"`) cleanly take precedence in Iosevka's composite resolver (`packages/param/src/variant.mjs:18-20`), leaving `capital-a`, `capital-k`, `capital-r`, `capital-v..z`, `x`, `z`, and `seven` curly in `design` while `italic` uses `k = "cursive-serifless"`, `v/w/x/z = "curly-serifless"`, and `y = "cursive-serifless"`.
- **Did you use ALL the data?** Yes—every key in the user's TOML draft (`design`, `italic`, `widths`, `slopes`, top-level flags) plus all agreed decisions (`default-calt`, `NF`, `italic.k = "cursive-serifless"`, `timeout-minutes: 150`, `README.md`, `docs/ARCHITECTURE.md`, `CONTEXT.md`, and deferred `NL` & `web-docs/`) are preserved.
- **Did you use the WHOLE condition?** Yes—all `REQ-001..005` and `CON-001..004` are traced into Section 4 and Section 6.

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)
- **Negative Hypothesis 1 (Assume `ligations` block is omitted):**
  - *Contradiction & Failure:* `verdafile.mjs:347` evaluates `ligations: null` and `packages/param/src/ligation.mjs:11` skips `taggedBuildups.calt`. The compiled `Sawala Ligar Mono` TTF silently ships without programming ligatures despite NOT being an `NL` variant.
  - *Barrier:* `REQ-002` mandates `[buildPlans.SawalaLigarMono.ligations] inherits = "default-calt"` and `AC-001` verifies its presence.
- **Negative Hypothesis 2 (Assume `patch-nerd-font.yml` keeps `--pattern "*SawalaMono*.zip"` or `rm -f` exclusion):**
  - *Contradiction & Failure:* Running `patch-nerd-font.yml` with `variant: SawalaLigarMono` downloads 0 matching zips and aborts with `No base zip archive found` (`line 104`); or if downloaded with `Sawala*.zip` while `variant: SawalaMono` only deletes `*SawalaMonoNL*.zip`, `SawalaLigarMono` leaks into `SawalaMono`'s run.
  - *Barrier:* `REQ-004` replaces negative exclusion with positive exact-prefix selection (`${VARIANT}-*.zip`) and tests all 4 `variant` dispatch modes (`all`, `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`).
- **Negative Hypothesis 3 (Assume a malformed variant key/value enters `private-build-plans.toml`):**
  - *Contradiction & Failure:* `verda` fails mid-build during parameter resolution (`packages/param/src/variant.mjs`), wasting CI minutes.
  - *Barrier:* `CON-001` requires TOML syntax validation (`check:fast`) and parameter/build verification (`npm run build -- ttf::SawalaLigarMono` inside `iosevka-builder:latest` or `contents::SawalaLigarMono` dry-run).

---

## 2. Ubiquitous Language & Domain Glossary (`CONTEXT.md`)

*(All domain terminology below strictly matches the instantiated root [`CONTEXT.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/CONTEXT.md):)*

- **Sawala Mono:** The baseline monospace family (`[buildPlans.SawalaMono]`, `ss03`-derived with `earless`/`toothless` geometry and `default-calt` ligatures).  
  _Avoid_: Standard Sawala, Sawala Default
- **Sawala Ligar Mono:** The expressive selective-curly monospace sibling family (`[buildPlans.SawalaLigarMono]`, `ss20`-derived with `default-calt` ligatures), named from the Sundanese word *ligar* (*blooming / opening gracefully*).  
  _Avoid_: Sawala Curly, Sawala Mono Curly, Sawala Ligar
- **Sawala Ligar Mono NF:** The Nerd Font patched distribution derived from `Sawala Ligar Mono` TrueType binaries via `nerdfonts/patcher:latest` (`--mono`).  
  _Avoid_: Sawala Ligar NF, Sawala Curly NF
- **Build Plan ID:** The TOML section identifier `[buildPlans.<ID>]` (e.g., `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) used by `verdafile.mjs` and CI scripts for target names and output archive prefixes.  
  _Avoid_: Family Display Name, Variant Label

---

## 3. Assumptions & Resolved Clarifications

- **[RESOLVED — ASSUMPTION-001 (`italic.k` Variant Choice)]:**  
  Resolved in Clarification Iteration 2 (Option B): `[buildPlans.SawalaLigarMono.variants.italic]` sets **`k = "cursive-serifless"`** (harmonizing with `y = "cursive-serifless"`, `ss20`, and `SawalaMono`), while `[buildPlans.SawalaLigarMono.variants.design]` retains **`k = "straight-serifless"`**.
- **[RESOLVED — ASSUMPTION-002 (CI Timeout Budget for 3 Build Plans)]:**  
  Resolved in Clarification Iteration 2 (Option A): `timeout-minutes` is increased from `90` to **`150`** in both `.github/workflows/build.yml:42` and `.github/workflows/patch-nerd-font.yml:50` on the single-job architecture (`REQ-003`, `REQ-004.1`).
- **[RESOLVED — ASSUMPTION-003 (`custom_name` Override Derivation in `patch-nerd-font.yml`)]:**  
  Resolved in Clarification Iteration 2: When `VARIANT = "all"` and a non-empty `custom_name` is supplied, `REQ-004.5` automatically maps `v = "SawalaLigarMono"` to `"Sawala Ligar Mono NF"` / `"Sawala Ligar Mono"`.
- **[RESOLVED — ASSUMPTION-004 (`docs/ARCHITECTURE.md` & `CONTEXT.md` Scope)]:**  
  Resolved in Clarification Iteration 2 (Option A): Root `CONTEXT.md` is instantiated and `docs/ARCHITECTURE.md` synchronization is included in Wave 1 (`REQ-005.6`, `AC-006`).

---

## 4. Setting Up Equations & Expressive Notation (Pólya, p. 134–141)

*Domain configuration contracts translated into exact declarative TOML, CI workflow state rules, and documentation structures.*

### 4.1 Build Plan Contract (`private-build-plans.toml`)

```toml
###################################################################################################
# 3. Sawala Ligar Mono (Selective-Curly Variant with Rich Programming Ligatures)
###################################################################################################
[buildPlans.SawalaLigarMono]
family = "Sawala Ligar Mono"
spacing = "normal"
serifs = "sans"
noCvSs = true
exportGlyphNames = false

[buildPlans.SawalaLigarMono.ligations]
inherits = "default-calt"

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
k = "cursive-serifless"
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

#### Build Plan Completeness & Fidelity Matrix

| Section | Key Count | Included Keys & Values |
| :--- | :---: | :--- |
| `[buildPlans.SawalaLigarMono]` | 5 | `family = "Sawala Ligar Mono"`, `spacing = "normal"`, `serifs = "sans"`, `noCvSs = true`, `exportGlyphNames = false` |
| `[buildPlans.SawalaLigarMono.ligations]` | 1 | `inherits = "default-calt"` *(added per REQ-002 to enable programming ligatures)* |
| `[buildPlans.SawalaLigarMono.variants]` | 1 | `inherits = "ss20"` |
| `[buildPlans.SawalaLigarMono.variants.design]` | 29 | Digits (`one`, `four`, `seven`, `zero`), Letters (`a`, `b`, `d`, `f`, `g`, `i`, `j`, `k`, `l`, `m`, `n`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`), Punctuation/Symbols (`punctuation-dot`, `paren`, `brace`) |
| `[buildPlans.SawalaLigarMono.variants.italic]` | 27 | Digits (`one`, `four`, `zero`), Letters (`a`, `b`, `d`, `f`, `g`, `i`, `j`, `k`, `l`, `m`, `n`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`), Symbols (`paren`, `brace`) |
| `widths.Normal` & `widths.SemiExtended` | 3 each | `Normal` (`shape = 500`, `menu = 5`, `css = "normal"`), `SemiExtended` (`shape = 548`, `menu = 6`, `css = "semi-expanded"`) |
| `slopes.Upright` & `slopes.Italic` | 4 each | `Upright` (`angle = 0`, `shape/menu = "upright"`, `css = "normal"`), `Italic` (`angle = 9.4`, `shape/menu/css = "italic"`) |

### 4.2 CI/CD Workflow Contracts (`.github/workflows/`)

- **`.github/workflows/build.yml` Contract:**
  - `on.workflow_dispatch.inputs.variant.options` MUST enumerate:
    `[all, SawalaMono, SawalaMonoNL, SawalaLigarMono]`.
  - `jobs.build.timeout-minutes` MUST be increased from `90` to `150` (`line 42`) to support 3-plan `variant: all` executions.
  - When `VARIANT=all`, the existing dynamic `grep -Po '^\[buildPlans\.\K[a-zA-Z0-9_-]+(?=\])' private-build-plans.toml` (`line 81`) resolves `SawalaLigarMono`, `SawalaMono`, `SawalaMonoNL` and constructs `${FORMAT}::SawalaLigarMono ...`.
  - Archive step (`lines 118-126`) produces `archives/SawalaLigarMono-${SUFFIX}.zip`.
- **`.github/workflows/patch-nerd-font.yml` Contract:**
  - `on.workflow_dispatch.inputs.variant.options` MUST enumerate:
    `[all, SawalaMono, SawalaMonoNL, SawalaLigarMono]`.
  - `jobs.patch.timeout-minutes` MUST be increased from `90` to `150` (`line 50`).
  - **Download Step (`lines 90-100`):**
    - Download pattern MUST match all Sawala base release zips: `--pattern "Sawala*.zip"`.
    - Exclude any already-patched NF zips (`rm -f raw_archives/*NF*.zip raw_archives/*-NF-*.zip`).
    - When `VARIANT != "all"`, retain **only** archives matching the exact selected plan prefix:
      ```bash
      find raw_archives -type f -name "*.zip" ! -name "${VARIANT}-*.zip" -delete
      ```
      *(Note: Because archive names are `${font_name}-${SUFFIX}.zip` starting with `SawalaMono-`, `SawalaMonoNL-`, or `SawalaLigarMono-`, exact `${VARIANT}-*.zip` matching guarantees zero prefix collisions.)*
  - **Scope Filter Step (`lines 129-133`):**
    - `VARIANTS=("SawalaMono" "SawalaMonoNL" "SawalaLigarMono")` when `VARIANT="all"`; otherwise `VARIANTS=("$VARIANT")`.
  - **Custom Name Override Guard (`lines 212-223`):**
    - When `VARIANT="all"` and `v="SawalaLigarMono"`, if `CUSTOM_NAME` does not already contain `"Ligar"`, derive `VARIANT_CUSTOM_NAME` deterministically so it never collides with `SawalaMono` (e.g., if `CUSTOM_NAME` contains `"Mono"`, substitute the first `"Mono"` with `"Ligar Mono"` via `${CUSTOM_NAME/Mono/Ligar Mono}`; otherwise append `" Ligar NF"` before `" NF"` or `" Ligar"` at the end).
  - **Output Packaging (`lines 257-274`):**
    - Produces `archives/SawalaLigarMono-NF-${TARGET_TAG}.zip` (for `core` / `all`) or `archives/SawalaLigarMono-Extended-NF-${TARGET_TAG}.zip` (for `extended-core`).

### 4.3 Documentation Contract (`README.md`, `docs/ARCHITECTURE.md` & `CONTEXT.md`)
- **`README.md` Updates (`REQ-005.1`–`REQ-005.5`):**
  1. **Philosophy & Story Behind the Name (`lines 43-52`):** Add a brief note explaining *Sawala Ligar Mono* (from Sundanese *ligar*, meaning *blooming / opening gracefully*), complementing *sawala*.
  2. **Font Variants Table (`lines 55-63`):** Add rows for **Sawala Ligar Mono** (selective-curly variant with programming ligatures) and **Sawala Ligar Mono NF** (Nerd Font patched variant).
  3. **Pre-built Binaries & Linux Install Path (`lines 70-85`):** Add `SawalaLigarMono-<version>.zip` and `SawalaLigarMono-NF-<version>.zip` alongside existing archives.
  4. **Terminal Nerd Font Configuration Tip (`lines 185-186`):** Include `'Sawala Ligar Mono NF'` alongside `'Sawala Mono NF'` and `'Sawala Mono NL NF'`.
  5. **Building from Source (`lines 221-294`):** Update Method A (`variant` choices and output zip list), Method B (`variant` choices and NF output zip list), Method C (Docker `ttf::SawalaLigarMono` command), and Method D (Native `npm run build -- ttf::SawalaLigarMono` command).
- **Living Architecture Map Alignment (`docs/ARCHITECTURE.md` — `REQ-005.6`):**
  - Synchronize `docs/ARCHITECTURE.md` (`lines 20-29, 69-90, 116, 274, 295, 329, 341`) as part of Wave 1 so it documents all 3 active build plans (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) and 6 distributions (including `Sawala Ligar Mono` and `Sawala Ligar Mono NF`).

---

## 5. Clean Architecture Seams & Component Boundaries

> [!NOTE]
> **Architectural Pragmatism Check:** This initiative touches declarative configuration, CI orchestration, and repository markdown—requiring **no** changes to core JS/Patel packages (`packages/*`) or the static web runtime (`index.html`, `web-docs/`). Clean Architecture boundaries are respected by confining all edits strictly to the outer declarative Domain manifest, Infrastructure workflows, and Documentation files.

```text
Entities (Domain Layer)
   └── private-build-plans.toml ──▶ [Add SawalaLigarMono + default-calt]
Use Cases (Application Layer)
   └── packages/param, packages/font-glyphs, packages/font-otl ──▶ [UNTOUCHED]
Interface Adapters
   └── packages/font/src/*, tools/* ──▶ [UNTOUCHED]
Frameworks & Drivers (CI Infrastructure)
   └── .github/workflows/build.yml, patch-nerd-font.yml ──▶ [Add SawalaLigarMono, timeout 150m & generalize filters]
Documentation (Repository Docs)
   └── README.md, docs/ARCHITECTURE.md, CONTEXT.md ──▶ [Document Sawala Ligar Mono & NF]
Presentation (Static Web Showcase)
   └── index.html, web-docs/* ──▶ [DEFERRED — Wave 2 (CON-003)]
```

---

## 6. Acceptance Criteria (Given-When-Then)

- **AC-001 (Build Plan Parsing & Ligation Parity — REQ-001, REQ-002):**  
  *Given* `private-build-plans.toml` is updated with `[buildPlans.SawalaLigarMono]`,  
  *When* `@iarna/toml` parses `private-build-plans.toml` and `verdafile.mjs` resolves build plans,  
  *Then* `SawalaLigarMono` parses with zero errors, preserves all 29 `design` and 27 `italic` variant overrides from the specification (including `italic.k = "cursive-serifless"`), sets `family = "Sawala Ligar Mono"`, and enables `ligations.inherits = "default-calt"`.

- **AC-002 (Targeted Font Compilation — REQ-001, REQ-002, CON-001):**  
  *Given* the Docker builder environment (`iosevka-builder:latest`),  
  *When* `npm run build -- ttf::SawalaLigarMono` (or `build.yml` with `variant: SawalaLigarMono`) executes,  
  *Then* hinted TrueType fonts are emitted under `dist/SawalaLigarMono/TTF/SawalaLigarMono-*.ttf` across both `Normal` and `SemiExtended` widths and `Upright` and `Italic` slopes, including OpenType `calt` ligature tables, with zero regressions to `SawalaMono` or `SawalaMonoNL`.

- **AC-003 (Build Workflow Dispatch, Timeout & Packaging — REQ-003):**  
  *Given* `.github/workflows/build.yml`,  
  *When* inspecting `workflow_dispatch.inputs.variant.options`, `jobs.build.timeout-minutes`, and the target resolution logic (`lines 80-87`) for `VARIANT=all` and `VARIANT=SawalaLigarMono`,  
  *Then* `SawalaLigarMono` appears in the selectable options, `timeout-minutes` is `150`, `SawalaLigarMono` resolves to `ttf::SawalaLigarMono`, and the workflow packages `SawalaLigarMono-<suffix>.zip`.

- **AC-004 (Nerd Font Patcher Isolation, Timeout & Download Matching — REQ-004, CON-002):**  
  *Given* a GitHub Release containing `SawalaMono-v1.0.0.zip`, `SawalaMonoNL-v1.0.0.zip`, and `SawalaLigarMono-v1.0.0.zip`,  
  *When* `.github/workflows/patch-nerd-font.yml` (`timeout-minutes: 150`) downloads and filters archives for `variant: SawalaLigarMono`, `variant: SawalaMono`, `variant: SawalaMonoNL`, or `variant: all`,  
  *Then*:
  - `variant: SawalaLigarMono` retains **only** `SawalaLigarMono-v1.0.0.zip` and produces `SawalaLigarMono-NF-v1.0.0.zip` (or `SawalaLigarMono-Extended-NF-v1.0.0.zip`).
  - `variant: SawalaMono` retains **only** `SawalaMono-v1.0.0.zip` (never leaking `SawalaLigarMono` or `SawalaMonoNL`).
  - `variant: all` stages and patches all 3 variants independently with `--mono` and `PN=2`, mapping `SawalaLigarMono`'s `custom_name` safely when non-empty.

- **AC-005 (Negative Boundary — Missing Release Archive — REQ-004, CON-004):**  
  *Given* a GitHub Release that does **not** yet contain `SawalaLigarMono-*.zip`,  
  *When* `patch-nerd-font.yml` runs with `variant: SawalaLigarMono`,  
  *Then* the workflow fails fast with `ZIP_COUNT -eq 0` (`::error::No base zip archive found for variant 'SawalaLigarMono'`), rather than silently producing an empty archive.

- **AC-006 (Documentation, Architecture Map & Non-Regression — REQ-005, CON-001, CON-003):**  
  *Given* all Wave 1 changes are applied,  
  *When* inspecting `README.md`, `docs/ARCHITECTURE.md`, `CONTEXT.md`, `index.html`, `web-docs/`, and running `npx @biomejs/biome check .`,  
  *Then* `README.md`, `docs/ARCHITECTURE.md`, and `CONTEXT.md` document `Sawala Ligar Mono` and `Sawala Ligar Mono NF`, `index.html` and `web-docs/` have zero modifications, and Biome diagnostics remain at or below baseline (`<= 3 errors / <= 5 warnings`).

### 6.1 Value Sourcing & Positive Input Coverage Table

| Required Output / Computed / Displayed Value | AC Ref | Named Source (`Input DTO` / `DB Column [file:line]` / `Derivation Formula` / `Config`) | Boundary / Edge Variation (`Timezone` / `Locale` / `Currency` / `Tenant` / `Null`) |
| :--- | :---: | :--- | :--- |
| `buildPlans.SawalaLigarMono.family` (`"Sawala Ligar Mono"`) | `AC-001`, `AC-002` | `Config: private-build-plans.toml` (Section 4.1 contract) | Space-separated display name vs no-space plan ID `SawalaLigarMono` |
| `SawalaLigarMono` `design` (29 keys) & `italic` (27 keys) variants | `AC-001`, `AC-002` | `Config: private-build-plans.toml` validated against `params/variants.toml` (`[composite.ss20]` + primes) | `design.k = "straight-serifless"` vs `italic.k = "cursive-serifless"` (Clarification Iteration 2) |
| `SawalaLigarMono` `calt` ligature set | `AC-001`, `AC-002` | `Config: [buildPlans.SawalaLigarMono.ligations] inherits = "default-calt"` (`packages/param/src/ligation.mjs:11-13`) | Must NOT be `null` (unlike unconfigured build plans per `verdafile.mjs:347`) |
| `SawalaLigarMono` width & slope matrices (`Normal` 500, `SemiExtended` 548, `0°`, `9.4°`) | `AC-002` | `Config: private-build-plans.toml` (matching `[VERIFIED: private-build-plans.toml:56-76]`) | `Normal` vs `SemiExtended` mapping to `core` vs `extended-core` scopes |
| CI workflow job timeout (`150` minutes) | `AC-003`, `AC-004` | `Config: build.yml:42` & `patch-nerd-font.yml:50` (`timeout-minutes: 150`) | Single-variant dispatch (~15–30m) vs 3-plan `variant: all` (~60–120m) |
| Base release archive name (`SawalaLigarMono-${SUFFIX}.zip`) | `AC-003` | `Derived: "${font_name}-${SUFFIX}.zip"` (`[VERIFIED: build.yml:122]`) where `SUFFIX = CUSTOM_VER \|\| YYYYMMDD` | Custom semver tag (`v1.2.0`) vs empty input fallback (`date +'%Y%m%d'`) |
| Downloaded & filtered zip set in NF patcher | `AC-004`, `AC-005` | `Config/Filter: --pattern "Sawala*.zip"` + `! -name "${VARIANT}-*.zip" -delete` when `VARIANT != "all"` | `VARIANT = "SawalaMono"` must exclude both `SawalaMonoNL` and `SawalaLigarMono`; `0` zips triggers `exit 1` |
| Patched NF archive name (`SawalaLigarMono-NF-${TARGET_TAG}.zip` / `-Extended-NF-`) | `AC-004` | `Derived: "${v}-NF-${TARGET_TAG}.zip"` / `"${v}-Extended-NF-${TARGET_TAG}.zip"` (`[VERIFIED: patch-nerd-font.yml:266-270]`) | `font_scope = core` (8 TTFs) vs `extended-core` (8 TTFs) vs `all` (36 TTFs) |

---

## 7. Testing Strategy & Dimensional Bounds

- **Testing Seams:**
  1. **TOML & Workspace Integrity (`check:fast` / `check:task`):** Validate `private-build-plans.toml` syntax, Biome check (`npx @biomejs/biome check .`), and `npm ls --workspaces` (`[VERIFIED: docs/ARCHITECTURE.md:325-327]`).
  2. **Font Parameter & Compilation Check (`check:full`):** Execute `npm run build -- ttf::SawalaLigarMono` inside `iosevka-builder:latest` (`--entrypoint bash`, `[VERIFIED: docs/ARCHITECTURE.md:329]`) and verify generated `.ttf` file count (36 weights/widths/slopes across `TTF/`) and `calt` GSUB table presence.
  3. **CI Script Dry-Run / Static Verification:** Verify `grep -Po` plan extraction in `build.yml` captures all 3 plans (`SawalaLigarMono`, `SawalaMono`, `SawalaMonoNL`), and test `patch-nerd-font.yml` shell filter logic against simulated zip filenames (`SawalaMono-v1.zip`, `SawalaMonoNL-v1.zip`, `SawalaLigarMono-v1.zip`, `SawalaMono-NF-v1.zip`) for all 4 `VARIANT` values.
- **Extreme Limiting Cases (Specialization):**
  - `VARIANT=SawalaMono` with 3 base zips + 1 already-patched `NF` zip in the same GitHub Release $\to$ only `SawalaMono-v1.zip` survives.
  - `VARIANT=SawalaLigarMono` when release has only `SawalaMono` and `SawalaMonoNL` $\to$ fails fast at `ZIP_COUNT -eq 0`.
  - `private-build-plans.toml` missing `.ligations` $\to$ caught by `AC-001` contract inspection.

---

## 8. Architectural Decision Records (ADRs)

- **Existing Relevant ADRs:**
  - [ADR-0001: Retention of `build-plans.toml` and `tools/` Workspaces](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/adr/0001-retain-build-plans-and-tools.md) — Preserves engine workspace assumptions relied upon by `verdafile.mjs`.
  - [ADR-0002: Standalone Containerized Nerd Font Patching Pipeline](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/adr/0002-standalone-nerd-font-patcher.md) — Establishes the decoupled release-patching pattern extended by `REQ-004`.
- **New ADR Needed?** Not required for Wave 1 (additive variant configuration and generalizing CI glob filters are low-friction, reversible changes). If Wave 2 introduces a shared variant-matrix generator or `web-docs/` multi-family switcher, consider an ADR then.
