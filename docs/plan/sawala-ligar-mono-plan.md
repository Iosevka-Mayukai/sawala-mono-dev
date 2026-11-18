---
goal: "Implementation Plan: Sawala Ligar Mono Variant Build Plan, CI/CD & Nerd Font Integration"
version: "1.1.0"
date_created: "2026-11-18"
last_updated: "2026-11-18"
status: "In Progress"
spec_ref: "docs/spec/sawala-ligar-mono-spec.md"
clarification_ref: "docs/audit/sawala-ligar-mono-plan-clarification.md"
tags: ["polya", "plan", "tracer-bullets", "vertical-slicing", "clean-architecture", "iosevka", "nerd-font"]
---
<!-- markdownlint-disable -->

# Implementation Plan: Sawala Ligar Mono Variant

> [!IMPORTANT]
> **THE PAUSE RULE & VERTICAL SLICING MANDATE:**  
> All tasks in this plan are organized into **Vertical Feature Slices (Tracer Bullets)** spanning from Declarative Domain Configuration (`private-build-plans.toml`) through CI/CD Compiler & Nerd Font Patcher Workflows (`.github/workflows/`) to Public Documentation (`README.md`, `docs/ARCHITECTURE.md`). Horizontal layer-by-layer slicing is strictly prohibited.  
> After each phase is verified, execution MUST halt for explicit user approval before proceeding to the next phase. Functional code MUST NOT be written until this plan is approved.

---

## 1. Overview & High-Level Mental Model

This plan implements Wave 1 of **Sawala Ligar Mono** (`[buildPlans.SawalaLigarMono]`, `family = "Sawala Ligar Mono"`), an expressive selective-curly (`ss20`-inherited) monospace sibling family featuring `default-calt` programming ligatures and Nerd Font patched distribution support (`Sawala Ligar Mono NF`), as specified in [`docs/spec/sawala-ligar-mono-spec.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/spec/sawala-ligar-mono-spec.md).

Execution is split into three focused vertical phases:
1. **Phase 1 (Land — Base Font Compilation Slice):** Connects the declarative domain build plan (`private-build-plans.toml`) directly to the CI compiler workflow (`.github/workflows/build.yml`) so `SawalaLigarMono` can be dispatched (`variant: SawalaLigarMono` or `variant: all` with `timeout-minutes: 150`), compiled into hinted TrueType/WOFF2 binaries with `default-calt` ligatures, and packaged into `SawalaLigarMono-<version>.zip`.
2. **Phase 2 (Core Experience — Nerd Font Patcher Pipeline & Edge-Case Guards):** Extends `.github/workflows/patch-nerd-font.yml` across two atomic slices: (a) release download (`Sawala*.zip`), `timeout-minutes: 150`, and exact-prefix archive isolation (`! -name "${VARIANT}-*.zip" -delete`), followed by (b) multi-variant scope staging (`VARIANTS`) and `custom_name` collision protection under `VARIANT=all`.
3. **Phase 3 (Expand & Polish — Public Documentation & Living Architecture Map Alignment):** Synchronizes `README.md` (5 sections) and `docs/ARCHITECTURE.md` (active build plan, distribution, and ratchet references) as independent 1-file (`XS`) slices while keeping `index.html` and `web-docs/` untouched (`CON-003`).

### Topological Data Flow Diagram
```text
[ Domain Layer: private-build-plans.toml ]
  └── [buildPlans.SawalaLigarMono] (ss20 + 29 design / 27 italic keys + default-calt)
        │
        ▼
[ Phase 1 (TASK-001): Base Compiler Pipeline (.github/workflows/build.yml) ]
  └── Inputs: variant (all | SawalaMono | SawalaMonoNL | SawalaLigarMono), timeout: 150m
  └── Engine: verdafile.mjs ──▶ dist/SawalaLigarMono/TTF/SawalaLigarMono-*.ttf (36 files)
  └── Output: GitHub Release Asset `SawalaLigarMono-<version>.zip`
        │
        ▼
[ Phase 2 (TASK-004 & TASK-005): Nerd Font Patcher (.github/workflows/patch-nerd-font.yml) ]
  ├── TASK-004: gh release download --pattern "Sawala*.zip" + exact `${VARIANT}-*.zip` filter + 150m
  └── TASK-005: VARIANTS array + nerdfonts/patcher (--mono, PN=2, custom_name guard)
  └── Output: `SawalaLigarMono-NF-<tag>.zip` / `SawalaLigarMono-Extended-NF-<tag>.zip`
        │
        ▼
[ Phase 3 (TASK-008 & TASK-009): Repository & Architecture Documentation ]
  ├── TASK-008: README.md (Philosophy, Variants Table, Binaries, NF Tip, Methods A–D)
  └── TASK-009: docs/ARCHITECTURE.md (3 active build plans / 6 distributions, INV-007 preserved)
```

---

## 2. 📏 Task Sizing Matrix

Every task must fit into one focused session. AI agents work most reliably on XS to M tasks.

| Size   | Files Impacted | Scope                                           | Example                                                 |
| :----- | :------------: | :---------------------------------------------- | :------------------------------------------------------ |
| **XS** |       1        | Single pure function or config change           | Single workflow or manifest adjustment                  |
| **S**  |      1-2       | Small focused vertical interaction              | Domain build plan + CI compiler workflow slice          |
| **M**  |      3-5       | Standard Vertical Feature Slice (Tracer Bullet) | Multi-file pipeline + documentation synchronization     |
| **L**  |      5-8       | Multi-component vertical flow                   | Full cross-subsystem release & showcase integration     |
| **XL** |       8+       | **Strictly Prohibited (Too Large)**             | Must be decomposed into smaller vertical slices         |

---

## 3. Phased Implementation Sequence (Vertical Tracer Bullets)

> **EXECUTION DIRECTIVE FOR AI AGENTS (`/to-code` & `/to-code auto`):**  
> - **Interactive Mode (`/to-code`):** Execute ticket by ticket. Run `check:task` (from `docs/ARCHITECTURE.md` §8.2) after each slice, then pause for user confirmation at each `APPROVAL` gate.  
> - **Autonomous Mode (`/to-code auto`):** Advance automatically through verified green tickets (`check:task` passing) until all phases complete or one of the **4 Circuit Breakers** triggers (*Ambiguous Spec*, *3x Verification Failure*, *Ratchet Regression*, or *Untracked Dependency/Architecture Change*).

### Implementation Phase 1: Land — Base `SawalaLigarMono` Build Plan & CI Compiler Slice
*Goal: Deliver an end-to-end buildable `Sawala Ligar Mono` configuration wired from `private-build-plans.toml` to `.github/workflows/build.yml` with `default-calt` ligatures and 150-minute CI timeout headroom.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-001** | **Base `SawalaLigarMono` Build Plan & Compiler Pipeline Slice:** Append `[buildPlans.SawalaLigarMono]` to `private-build-plans.toml` matching Spec §4.1 verbatim (`family = "Sawala Ligar Mono"`, `spacing = "normal"`, `serifs = "sans"`, `noCvSs = true`, `exportGlyphNames = false`, `ligations.inherits = "default-calt"`, `variants.inherits = "ss20"`, all 29 `design` keys, all 27 `italic` keys with `k = "cursive-serifless"`, `Normal`/`SemiExtended` widths, and `Upright`/`Italic` slopes). Update `.github/workflows/build.yml` to add `SawalaLigarMono` to `workflow_dispatch.inputs.variant.options` (`lines 11-14`) and increase `jobs.build.timeout-minutes` from `90` to `150` (`line 42`). | REQ-001, REQ-002, REQ-003, CON-001 | AC-001, AC-002, AC-003 | - | 2 (S) | [x] | 2026-11-18 |
| **TASK-002** | **VERIFY (`check:task`):** Verify `private-build-plans.toml` key/value fidelity against Spec §4.1 (all 29 `design` + 27 `italic` keys, `default-calt`, width/slope matrices, zero changes to `SawalaMono` or `SawalaMonoNL`), test `build.yml` plan extraction (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) and `timeout-minutes: 150`, and run scoped `check:task` (local zero-dependency validation per Clarification Iteration 2; no local font compilation). | CON-001, CON-004 | AC-001, AC-003 | TASK-001 | - | [x] | 2026-11-18 |
| **TASK-003** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 2 (unless `/to-code auto`). | - | - | TASK-002 | - | [x] | 2026-11-18 |

### Implementation Phase 2: Core Experience — Nerd Font Patcher Pipeline & Edge-Case Guards
*Goal: Enable isolated Nerd Font patching (`Sawala Ligar Mono NF`) across two focused workflow slices covering release ingestion/filtering and multi-variant staging/custom-name protection.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-004** | **Nerd Font Release Ingestion & Exact-Prefix Archive Filter Slice:** Update `.github/workflows/patch-nerd-font.yml` (`Spec §4.2`): (1) add `SawalaLigarMono` to `workflow_dispatch.inputs.variant.options` (`lines 16-19`), (2) increase `jobs.patch.timeout-minutes` from `90` to `150` (`line 50`), (3) broaden release download glob from `*SawalaMono*.zip` to `--pattern "Sawala*.zip"` (`line 90`), and (4) replace the two-branch exclusion (`lines 96-99`) with positive exact-prefix retention (`if [ "$VARIANT" != "all" ]; then find raw_archives -type f -name "*.zip" ! -name "${VARIANT}-*.zip" -delete; fi`), preserving the `ZIP_COUNT -eq 0` fail-fast barrier (`lines 102-106`). | REQ-004.1, REQ-004.2, REQ-004.3, CON-004 | AC-004, AC-005 | TASK-003 | 1 (XS) | [x] | 2026-11-18 |
| **TASK-005** | **Nerd Font Multi-Variant Scope Staging & Custom Name Guard Slice:** Update `.github/workflows/patch-nerd-font.yml` (`Spec §4.2`): (1) add `"SawalaLigarMono"` to `VARIANTS=("SawalaMono" "SawalaMonoNL" "SawalaLigarMono")` (`line 130`) so `core` (8 weights), `extended-core` (8 weights), and `all` (36 weights) stage `SawalaLigarMono-*.ttf` cleanly, and (2) extend the `CUSTOM_NAME` override block (`lines 212-223`) when `VARIANT="all"` and `v="SawalaLigarMono"` so non-empty `CUSTOM_NAME` values without `"Ligar"` map deterministically via `${CUSTOM_NAME/Mono/Ligar Mono}` (or `" Ligar NF"` / `" Ligar"` fallback) without colliding with `SawalaMono`. | REQ-004.4, REQ-004.5, CON-002, CON-004 | AC-004 | TASK-004 | 1 (XS) | [x] | 2026-11-18 |
| **TASK-006** | **VERIFY (`check:task`):** Run simulated shell tests verifying `patch-nerd-font.yml` archive filtering across all 4 `VARIANT` values (`all`, `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`), verify the 0-zip fail-fast boundary (`AC-005`), verify `CUSTOM_NAME` derivation for `SawalaLigarMono`, and run `check:task`. | CON-001, CON-002, CON-004 | AC-004, AC-005 | TASK-005 | - | [x] | 2026-11-18 |
| **TASK-007** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 3 (unless `/to-code auto`). | - | - | TASK-006 | - | [x] | 2026-11-18 |

### Implementation Phase 3: Expand & Polish — Public Documentation & Living Architecture Map Alignment
*Goal: Synchronize user-facing release/build documentation (`README.md`) and the canonical architecture map (`docs/ARCHITECTURE.md`) in isolated 1-file slices while preserving `CON-003`.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-008** | **Public Repository Documentation Slice (`README.md`):** Update `README.md` across all 5 variant-referencing sections (`Spec §4.3`): (1) `Philosophy & Story Behind the Name` (`lines 43-52`) explaining Sundanese *ligar* (*blooming / opening gracefully*), (2) `Font Variants` table (`lines 55-63`) adding `Sawala Ligar Mono` and `Sawala Ligar Mono NF`, (3) `Pre-built Binaries` (`lines 70-85`) adding `SawalaLigarMono-<version>.zip` and `SawalaLigarMono-NF-<version>.zip`, (4) `Configuration` NF tip (`lines 185-186`) adding `'Sawala Ligar Mono NF'`, and (5) `Building from Source` Methods A–D (`lines 221-294`) adding `SawalaLigarMono` options, archives, and CLI commands. | REQ-005.1..005.5 | AC-006 | TASK-007 | 1 (XS) | [x] | 2026-11-18 |
| **TASK-009** | **Living Architecture Map Synchronization Slice (`docs/ARCHITECTURE.md`):** Update `docs/ARCHITECTURE.md` (`Spec §4.3`, `REQ-005.6`) across active build plan, distribution, and verification references (`lines 20-36, 69-90, 116, 141-172, 209, 258, 274, 295, 303, 329, 341, 355`) to reflect the 3 active build plans (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) and 6 distributions while keeping `INV-007` (`line 193`) explicitly scoped to `SawalaMono` $\leftrightarrow$ `SawalaMonoNL` symmetry and leaving `index.html` and `web-docs/` untouched (`CON-003`). | REQ-005.6, CON-003 | AC-006 | TASK-008 | 1 (XS) | [x] | 2026-11-18 |
| **TASK-010** | **VERIFY (`check:full` — Local Static Gate + CI Compilation Handoff):** Execute full local verification (TOML/variant cross-validation against `params/variants.toml`, workflow YAML & Bash dry-run checks, Biome check if `node_modules` installed), verify `CONTEXT.md` terminology alignment across `README.md` and `docs/ARCHITECTURE.md`, and confirm `git status` shows zero edits to `index.html`, `web-docs/`, or `packages/*` (`CON-001..004`). Binary `.ttf` compilation (`AC-002`) is verified remotely via GitHub Actions `build.yml` (per Clarification Iteration 2; not compiled locally). | CON-001..004 | AC-001..006 | TASK-009 | - | [x] | 2026-11-18 |
| **TASK-011** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to declare the implementation plan complete. | - | - | TASK-010 | - | [ ] | |

### 3.4 Detailed Per-Task Implementation Blueprints (Line-Level Contracts)

- **`TASK-001` (`private-build-plans.toml` & `.github/workflows/build.yml`):**
  - `private-build-plans.toml` (append after line 148): Insert the exact `[buildPlans.SawalaLigarMono]` TOML block from `docs/spec/sawala-ligar-mono-spec.md` §4.1 (`lines 122-218`), containing:
    - Top-level (`5` keys): `family = "Sawala Ligar Mono"`, `spacing = "normal"`, `serifs = "sans"`, `noCvSs = true`, `exportGlyphNames = false`.
    - `[buildPlans.SawalaLigarMono.ligations]`: `inherits = "default-calt"`.
    - `[buildPlans.SawalaLigarMono.variants]`: `inherits = "ss20"`.
    - `[buildPlans.SawalaLigarMono.variants.design]` (`29` keys): `one = "no-base-long-top-serif"`, `four = "closed-serifless"`, `seven = "curly-serifless"`, `zero = "reverse-slashed"`, `a = "double-storey-tailed"`, `b = "toothed-serifless"`, `d = "toothed-serifless"`, `f = "flat-hook-serifed"`, `g = "double-storey"`, `i = "serifed"`, `j = "flat-hook-serifed"`, `k = "straight-serifless"`, `l = "serifed"`, `m = "earless-corner-double-arch-serifless"`, `n = "straight-serifless"`, `p = "eared-serifless"`, `q = "straight-serifless"`, `r = "serifed"`, `s = "serifless"`, `t = "flat-hook"`, `u = "toothed-serifless"`, `v = "straight-serifless"`, `w = "straight-serifless"`, `x = "curly-serifless"`, `y = "straight-turn-serifless"`, `z = "curly-serifless"`, `punctuation-dot = "round"`, `paren = "large-contour"`, `brace = "curly-flat-boundary"`.
    - `[buildPlans.SawalaLigarMono.variants.italic]` (`27` keys): `one = "no-base-long-top-serif"`, `four = "closed-serifless"`, `zero = "reverse-slashed"`, `a = "single-storey-tailed"`, `b = "toothed-serifless"`, `d = "toothed-serifless"`, `f = "flat-hook-tailed"`, `g = "single-storey-serifless"`, `i = "serifed-semi-tailed"`, `j = "flat-hook-serifed"`, `k = "cursive-serifless"`, `l = "serifed-semi-tailed"`, `m = "earless-corner-double-arch-serifless"`, `n = "earless-corner-straight-serifless"`, `p = "earless-corner-serifless"`, `q = "earless-corner-straight-serifless"`, `r = "base-serifed"`, `s = "serifless"`, `t = "flat-hook"`, `u = "toothed-serifless"`, `v = "curly-serifless"`, `w = "curly-serifless"`, `x = "curly-serifless"`, `y = "cursive-serifless"`, `z = "curly-serifless"`, `paren = "large-contour"`, `brace = "curly-flat-boundary"`.
    - `widths.Normal` (`shape = 500`, `menu = 5`, `css = "normal"`), `widths.SemiExtended` (`shape = 548`, `menu = 6`, `css = "semi-expanded"`), `slopes.Upright` (`angle = 0`, `shape = "upright"`, `menu = "upright"`, `css = "normal"`), `slopes.Italic` (`angle = 9.4`, `shape = "italic"`, `menu = "italic"`, `css = "italic"`).
  - `.github/workflows/build.yml`:
    - `lines 11-14`: Add `- SawalaLigarMono` under `on.workflow_dispatch.inputs.variant.options`.
    - `line 42`: Update `timeout-minutes: 90` $\to$ `timeout-minutes: 150`.
- **`TASK-004` (`.github/workflows/patch-nerd-font.yml` — Ingestion & Filter):**
  - `lines 16-19`: Add `- SawalaLigarMono` under `on.workflow_dispatch.inputs.variant.options`.
  - `line 50`: Update `timeout-minutes: 90` $\to$ `timeout-minutes: 150`.
  - `line 90`: Change `--pattern "*SawalaMono*.zip"` $\to$ `--pattern "Sawala*.zip"`.
  - `lines 95-100`: Replace the `if [ "$VARIANT" = "SawalaMono" ] ... elif [ "$VARIANT" = "SawalaMonoNL" ]` block with:
    ```bash
    if [ "$VARIANT" != "all" ]; then
      find raw_archives -type f -name "*.zip" ! -name "${VARIANT}-*.zip" -delete
    fi
    ```
- **`TASK-005` (`.github/workflows/patch-nerd-font.yml` — Staging & Custom Name Guard):**
  - `line 130`: Update `VARIANTS=("SawalaMono" "SawalaMonoNL")` $\to$ `VARIANTS=("SawalaMono" "SawalaMonoNL" "SawalaLigarMono")`.
  - `lines 212-223`: Extend the `if [ "$VARIANT" = "all" ]` custom name logic with an `elif` branch for `v = "SawalaLigarMono"`:
    ```bash
    elif [ "$VARIANT" = "all" ] && [ "$v" = "SawalaLigarMono" ] && [[ "$CUSTOM_NAME" != *"Ligar"* ]]; then
      if [[ "$CUSTOM_NAME" == *"Mono"* ]]; then
        VARIANT_CUSTOM_NAME="${CUSTOM_NAME/Mono/Ligar Mono}"
      elif [[ "$CUSTOM_NAME" == *" NF" ]]; then
        VARIANT_CUSTOM_NAME="${CUSTOM_NAME% NF} Ligar NF"
      else
        VARIANT_CUSTOM_NAME="${CUSTOM_NAME} Ligar"
      fi
    fi
    ```
- **`TASK-008` (`README.md`) & `TASK-009` (`docs/ARCHITECTURE.md`):**
  - `README.md` (`TASK-008`): Update `Philosophy & Story Behind the Name` (`lines 43-52`), `Font Variants` table (`lines 55-63`), `Pre-built Binaries` (`lines 70-85`), `Configuration` NF tip (`lines 185-186`), and `Building from Source` Methods A–D (`lines 221-294`) per Spec §4.3.
  - `docs/ARCHITECTURE.md` (`TASK-009`): Update active build plans (`2` $\to$ `3`: `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) and distributions (`4` $\to$ `6`: adding `Sawala Ligar Mono` and `Sawala Ligar Mono NF`) across `lines 20-36, 69-90, 116, 141-172, 209, 258, 274, 295, 303, 329, 341, 355`, preserving `INV-007` (`line 193`) and `CON-003` (`index.html` and `web-docs/` untouched).
- **Exact Verification Model (`TASK-002`, `TASK-006`, `TASK-010` — Per Clarification Iteration 2):**
  - *Primary Local Verification (Zero-Dependency Static & Dry-Run Gate — No Local Font Compilation):*
    1. Parse and assert all `[buildPlans.SawalaLigarMono]` sections, 29 `design` + 27 `italic` keys (`italic.k == "cursive-serifless"`), `ligations.inherits == "default-calt"`, and `SawalaMono`/`SawalaMonoNL` non-regression via Node.js script against `params/variants.toml` (plus `@iarna/toml` & `npx @biomejs/biome check .` if `node_modules` is present).
    2. Validate YAML key structure and run simulated archive filtering (`SawalaMono-v1.zip`, `SawalaMonoNL-v1.zip`, `SawalaLigarMono-v1.zip`, `SawalaMono-NF-v1.zip`) across all 4 `VARIANT` values plus 0-zip fail-fast (`AC-005`) and `CUSTOM_NAME` derivation (`AC-004`).
    3. Verify `git diff --name-only` contains zero modifications to `index.html`, `web-docs/`, or `packages/*` (`CON-003`).
  - *Remote Binary Compilation & Patching Gate (`AC-002`, `AC-004`):*
    - Font compilation (`ttf::SawalaLigarMono`) and Nerd Font patching execute **exclusively via GitHub Actions** (`.github/workflows/build.yml` and `.github/workflows/patch-nerd-font.yml`) after pushing changes—never on the local host.

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare for potential failure of the primary strategy.*

- **Risk / Failure Point 1 (GitHub Actions Parameter/Variant Resolution Error After Push):**
  - **Primary Strategy (Plan A):** Catch every TOML syntax, variant key, or ligation error locally during `TASK-002` / `TASK-010` by cross-validating all 56 `SawalaLigarMono` keys against `params/variants.toml` before pushing to GitHub Actions (`build.yml`).
  - **Contingency Strategy (Plan B):** If `build.yml` fails during `patel` / `packages/param` compilation on `ubuntu-latest`, dispatch `build.yml` targeting `variant: SawalaLigarMono` and `format: contents` for rapid single-plan iteration without blocking `SawalaMono` or `SawalaMonoNL`.
  - **Trigger Condition:** A GitHub Actions `build.yml` run fails in the `Resolve Build Targets & Run Build` step.
- **Risk / Failure Point 2 (GitHub Actions `variant: all` Approaching 150-Minute Runner Limit):**
  - **Primary Strategy (Plan A):** Single-job sequential compilation of all 3 plans under `timeout-minutes: 150` (`REQ-003`, `REQ-004.1`).
  - **Contingency Strategy (Plan B):** Dispatch `build.yml` and `patch-nerd-font.yml` per-variant (`variant: SawalaLigarMono`, `create_release: true`), which attaches `SawalaLigarMono-<version>.zip` and `SawalaLigarMono-NF-<version>.zip` to the existing release tag via `gh release upload --clobber` (`build.yml:154`, `patch-nerd-font.yml:292`) in ~20–30 minutes.
  - **Trigger Condition:** A `variant: all` CI run exceeds 135 minutes on `ubuntu-latest`.

---

## 5. Symmetry, Invariants & Problem Variation (Pólya, p. 199–214)

- **Symmetric Operations & Round-Trip Invertibility ($f^{-1}(f(x)) = x$):**
  - `build.yml` Base Archive Packaging (`SawalaLigarMono-${SUFFIX}.zip`) $\leftrightarrow$ `patch-nerd-font.yml` Base Archive Acquisition & Extraction (`${VARIANT}-*.zip` $\to$ `in_raw/`).
  - `design` Upright Overrides (`k = "straight-serifless"`, `v/w = "straight-serifless"`, `x/z = "curly-serifless"`) $\leftrightarrow$ `italic` Cursive/Curly Overrides (`k/y = "cursive-serifless"`, `v/w/x/z = "curly-serifless"`).
- **Variation of the Problem (Property-Based & Boundary Exploration):**
  - *Variant Filter Permutations:* Verify that among `{SawalaMono-v1.zip, SawalaMonoNL-v1.zip, SawalaLigarMono-v1.zip, SawalaMono-NF-v1.zip}`, each single `VARIANT` selection isolates exactly 1 zip file (`! -name "${VARIANT}-*.zip" -delete`), while `VARIANT=all` retains all 3 base zips and 0 `NF` zips.
  - *Custom Name Permutations:* Verify `CUSTOM_NAME=""` (auto), `CUSTOM_NAME="Sawala Mono NF"` ($\to$ `"Sawala Ligar Mono NF"`), and `CUSTOM_NAME="Sawala Mono"` ($\to$ `"Sawala Ligar Mono"`) when `VARIANT="all"`.
- **SOLID Checks at Blueprint Stage:**
  - *Single Responsibility (SRP):* `private-build-plans.toml` declares typography parameters; `build.yml` compiles base fonts; `patch-nerd-font.yml` patches Nerd Font icons; `README.md` & `docs/ARCHITECTURE.md` document usage and topology.
  - *Open-Closed Principle (OCP):* Switching `patch-nerd-font.yml` from hardcoded negative exclusions (`rm -f *SawalaMonoNL*.zip`) to positive prefix matching (`! -name "${VARIANT}-*.zip" -delete`) makes the filter open for future variants without modifying exclusion branches.

---

## 6. Risks & Extracted Assumptions

*Extracted from `docs/spec/sawala-ligar-mono-spec.md` Section 3 (All 4 assumptions resolved during Clarification Iteration 2):*

- **[RESOLVED — ASSUMPTION-001 (`italic.k` Variant Choice)]:** Locked to `k = "cursive-serifless"` in `[buildPlans.SawalaLigarMono.variants.italic]` and `k = "straight-serifless"` in `variants.design`. — *Mitigation:* Enforced in `TASK-001` and verified in `TASK-002`.
- **[RESOLVED — ASSUMPTION-002 (CI Timeout Budget for 3 Build Plans)]:** Locked to `timeout-minutes: 150` in `build.yml:42` and `patch-nerd-font.yml:50`. — *Mitigation:* Applied in `TASK-001` & `TASK-004`; Contingency Plan B provides single-variant dispatch fallback.
- **[RESOLVED — ASSUMPTION-003 (`custom_name` Override Derivation in `patch-nerd-font.yml`)]:** Locked to automatic `"Ligar"` substitution/insertion when `VARIANT="all"` and `v="SawalaLigarMono"`. — *Mitigation:* Implemented in `TASK-005` and tested in `TASK-006`.
- **[RESOLVED — ASSUMPTION-004 (`docs/ARCHITECTURE.md` & `CONTEXT.md` Scope)]:** Root `CONTEXT.md` is already created; `docs/ARCHITECTURE.md` synchronization is scheduled in `TASK-009`. — *Mitigation:* Verified in `TASK-010`.
- **[RESOLVED — PLAN-CLARIFY-001 (CI-Only Compilation Boundary)]:** Locked in Plan Clarification Iteration 2: binary `.ttf` compilation (`AC-002`) runs exclusively on GitHub Actions (`build.yml` / `patch-nerd-font.yml`), not locally. Local `/to-code` `VERIFY` gates pass via zero-dependency TOML/variant cross-validation, YAML/Bash dry-runs, and `git diff` scope checks.
- **[RISK-001 (Prefix Collision Between `SawalaMono` and `SawalaMonoNL` / `SawalaLigarMono`)]:** Naive substring matching (`*${VARIANT}*.zip`) would match `SawalaMonoNL-v1.zip` when `VARIANT=SawalaMono`. — *Mitigation:* `TASK-004` strictly enforces the trailing hyphen delimiter (`! -name "${VARIANT}-*.zip" -delete`), ensuring `"SawalaMono-*"` never matches `"SawalaMonoNL-*"` or `"SawalaLigarMono-*"`.

---

## 7. Rollback & Recovery Strategy

Step-by-step instructions to revert to a stable state if execution encounters unrecoverable issues:
1. **Working Tree Rollback (Pre-Commit):**
   `git checkout -- private-build-plans.toml .github/workflows/build.yml .github/workflows/patch-nerd-font.yml README.md docs/ARCHITECTURE.md`
2. **Post-Commit Rollback:**
   `git revert HEAD~N..HEAD`
3. **GitHub Release Asset Cleanup (If erroneous archive uploaded):**
   `gh release delete-asset <tag> SawalaLigarMono-<tag>.zip SawalaLigarMono-NF-<tag>.zip -y`

---

## 8. 🚩 Pre-Flight Self-Correction Checklist (Anti-Patterns)

Before presenting this plan to the user, verify it is free from these anti-patterns:
- [x] **No Horizontal Slicing:** Tasks are NOT grouped layer-by-layer; Phase 1 delivers end-to-end base font compilation (`private-build-plans.toml` $\to$ `build.yml`), Phase 2 delivers Nerd Font release ingestion and multi-variant patching (`patch-nerd-font.yml`), and Phase 3 delivers synchronized user and architecture documentation (`README.md` & `docs/ARCHITECTURE.md`).
- [x] **No Bloated Tasks (XL):** All actionable tasks are sized **XS** (1 file) or **S** (2 files).
- [x] **Strict Traceability:** Every actionable task (`TASK-001`, `TASK-004`, `TASK-005`, `TASK-008`, `TASK-009`) maps explicitly to `REQ-001..005`, `CON-001..004`, and `AC-001..006`.
- [x] **Deterministic Dependencies:** The `Dep` column points strictly bottom-up (`TASK-001` $\to$ `...` $\to$ `TASK-011`).
- [x] **Mandatory Verification & Approval:** All 3 phases terminate with explicit `VERIFY` (`check:task` / `check:full`) and `APPROVAL` checkpoints.
