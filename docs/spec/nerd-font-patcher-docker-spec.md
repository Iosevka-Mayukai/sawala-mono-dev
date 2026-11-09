---
title: "Nerd Font Containerized Patching Pipeline via Docker"
version: "1.0.0"
date_created: "2026-11-09"
last_updated: "2026-11-09"
status: "Draft"
discovery_ref: "docs/discovery/nerd-font-patcher-docker-discovery.md"
tags: ["polya", "spec", "nerd-font", "docker", "github-actions", "clean-architecture"]
---
<!-- markdownlint-disable-->

# Technical Specification: Nerd Font Containerized Patching Pipeline via Docker

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
- **Primary Unknown:** A standalone, idempotent, containerized GitHub Actions workflow (`.github/workflows/patch-nerd-font.yml`) that ingests pre-compiled base TrueType (`.ttf`) font releases of Iosevka Sawala Mono, executes the official `nerdfonts/patcher:latest` Docker image to inject programming glyph sets, bundles the resulting fonts into standardized archives, and attaches `SawalaMono-NF` release assets to the designated GitHub Release without coupling to or endangering the base font build pipeline.
- **Completion Definition:**
  1. The workflow can be invoked on-demand via `workflow_dispatch` with parameter options for `release_tag`, `patch_mode`, and `font_scope`.
  2. The workflow downloads the target base release assets using `gh release download`.
  3. The workflow selectively filters fonts according to `font_scope` (`all` vs `core`).
  4. The containerized patcher completes with `PN=2` parallel execution and `--mono` strict monospace cell enforcement.
  5. The output fonts are packaged into `SawalaMono-NF-<suffix>.zip` and attached to the target GitHub release via `gh release upload --clobber`.
- **Explicit Non-Goals (Out of Scope):**
  1. Recompiling base Iosevka fonts from source (Patel/Node.js) in this workflow.
  2. Modifying `.github/workflows/build.yml` or coupling base font releases to Nerd Font patching.
  3. Generating Nerd Font WOFF2 or variable-font (`.ttc`) assets (TrueType desktop fonts are the sole target).

### 1.2 The Data (Inputs, State & Source-Grounded Context)
- **Input Parameters (`workflow_dispatch`):**
  - `release_tag`: Target GitHub Release tag to patch (e.g. `v1.0.0` or `latest`).
  - `patch_mode`: Patch preset (`complete` vs `default`).
  - `font_scope`: Font weight selection (`core` [8 files] vs `all` [36 files]).
- **Existing Codebase Assets & Infrastructure Seams:**
  - Standard base build workflow: [`.github/workflows/build.yml:37`](file:///.github/workflows/build.yml#L37) (`ubuntu-latest`: 2 vCPUs, 7 GB RAM, 14 GB SSD, 360-minute job timeout).
  - Iosevka plan specifications: [`private-build-plans.toml:75-95`](file:///private-build-plans.toml#L75-L95) producing 2 widths (`Normal`, `SemiExtended`) and 2 slopes (`Upright`, `Italic`), across 9 default weights (total 36 TTF files).
  - Distribution goal: [`AGENTS.md:4`](file:///AGENTS.md#L4) establishing `Sawala Mono NF` as a first-class distribution variant.
  - Official Container Patcher: Docker image `nerdfonts/patcher:latest` with volume mounts `/in` and `/out`.
  - Authentication Seam: `GITHUB_TOKEN` secret providing read/write permissions to release assets.

### 1.3 The Condition (Requirements, Constraints & Invariants)

- **REQ-001 (Decoupled Pipeline Seam):** The Nerd Font patching workflow MUST reside in its own dedicated workflow file at `.github/workflows/patch-nerd-font.yml` and run independently from `.github/workflows/build.yml`.
- **REQ-002 (Parameterizable Dispatch Contract):** The workflow MUST expose a `workflow_dispatch` trigger accepting:
  - `release_tag` (type: string, required, default: `'latest'`).
  - `patch_mode` (type: choice, options: `['complete', 'default']`, default: `'complete'`).
  - `font_scope` (type: choice, options: `['core', 'all']`, default: `'core'`).
- **REQ-003 (Deterministic Release Asset Ingestion):** The workflow MUST resolve the target tag and download the base TrueType font archive using the GitHub CLI (`gh release download <release_tag> --pattern "*SawalaMono*.zip"`).
- **REQ-004 (Scope-Based Font Filtering):**
  - When `font_scope == 'core'`, the workflow MUST extract only the 8 essential developer weights in `Normal` width: `Regular`, `Italic`, `Medium`, `MediumItalic`, `SemiBold`, `SemiBoldItalic`, `Bold`, and `BoldItalic`.
  - When `font_scope == 'all'`, the workflow MUST process all 36 TrueType files present in the base archive.
- **REQ-005 (Containerized Execution & Monospace Preservation):** The workflow MUST execute `docker run --rm` using `nerdfonts/patcher:latest` mounting local input/output directories. It MUST pass `-e "PN=2"` and the `--mono` (or `--use-single-width-glyphs`) flag to guarantee terminal character cell width integrity.
- **REQ-006 (Mode-Specific Glyph Injection):**
  - If `patch_mode == 'complete'`, pass `--complete` (`-c`) to inject all ~10,000+ glyphs (Font Awesome, Material Design Icons, Codicons, Devicons, Octicons, Weather, etc.).
  - If `patch_mode == 'default'`, omit `--complete` to inject only core Powerline and standard icon sets.
- **REQ-007 (Artifact Bundling & Idempotent Release Attachment):** The workflow MUST compress patched fonts into `SawalaMono-NF-${SUFFIX}.zip` (where `SUFFIX` is the resolved tag or date) and upload the archive directly to the target GitHub Release via `gh release upload <release_tag> archives/*.zip --clobber`.

#### Operational Constraints (Non-Functional Requirements)
- **CON-001 (CI Execution Latency Bound):** For `font_scope: core`, total workflow runtime MUST NOT exceed 15 minutes. For `font_scope: all`, total workflow runtime MUST NOT exceed 60 minutes.
- **CON-002 (Zero Host Pollution):** The runner host MUST NOT install FontForge, Python font libraries, or native compile dependencies; all font synthesis MUST occur strictly inside the Docker container.
- **CON-003 (Zero Blast Radius):** Any failure during Nerd Font patching MUST NOT modify, corrupt, or delete previously published base font assets on GitHub Releases.
- **CON-004 (Monospace Cell Rigidity):** Patched fonts MUST pass strict monospace validation, verifying that all standard Latin glyphs retain a consistent advance width equal to 500 units (`Normal` width).

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)
- **Is the condition sufficient to determine the unknown?**  
  **Yes.** The input parameters (`release_tag`, `patch_mode`, `font_scope`) combined with the `nerdfonts/patcher:latest` container and `gh` CLI provide deterministic inputs, clear transformation steps, and an unambiguous delivery sink.
- **Is it insufficient?**  
  No missing states: Fallback resolution for `release_tag == 'latest'` is handled via `gh release view --json tagName -q .tagName`.
- **Is it redundant or contradictory?**  
  No contradictions. The standalone workflow removes any temporal coupling with base build tasks.
- **Did you use ALL the data?**  
  Yes. Container image, GitHub runner hardware limits (`2 vCPUs`), release assets, and typographical weight mappings are fully accounted for.
- **Did you use the WHOLE condition?**  
  Yes. Time latency bounds, `--mono` preservation, and `--clobber` idempotency are incorporated into the operational contracts.

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)

*Reductio ad Absurdum: Assume the negation of critical invariants to verify defensive barriers:*

1. **Scenario 1: Specified `release_tag` does not exist or has no TTF assets.**
   - *Negative Hypothesis:* The runner proceeds to invoke Docker with an empty `/in` directory.
   - *Contradiction & Safe Rejection:* Docker patcher exits with an error or zero files processed. Downstream packaging finds zero TTFs and fails fast with a non-zero exit code before attempting `gh release upload`.
   - *Defensive Guard:* An explicit bash validation step `[ -d "./in" ] && [ "$(ls -A ./in/*.ttf 2>/dev/null)" ] || (echo "Error: No TTF font files found to patch." && exit 1)` will fail the job immediately.
2. **Scenario 2: Nerd Font patcher produces proportional/variable-width glyphs that deform terminal layout.**
   - *Negative Hypothesis:* Missing `--mono` flag allows wide glyphs to expand the font's fixed cell advance width, causing text clipping and misaligned columns in terminal emulators.
   - *Contradiction & Safe Rejection:* The workflow contract explicitly hardcodes `--mono` in the container entry command, ensuring FontForge scales icons into the exact monospace bounding box.
3. **Scenario 3: Runner network flakiness causes `gh release upload` to fail on existing asset name collision.**
   - *Negative Hypothesis:* Upload aborts because `SawalaMono-NF-<tag>.zip` already exists from a prior run.
   - *Contradiction & Safe Rejection:* Passing `--clobber` ensures idempotent overwrite of the release asset.

---

## 2. Ubiquitous Language & Domain Glossary

*All terminology aligns with `docs/ARCHITECTURE.md` Section 1:*

- **Base Font:** The original compiled TrueType (`.ttf`) typeface generated by the Iosevka parametric compiler before icon injection.
- **Nerd Font (NF):** A patched version of a base typeface injected with developer-centric iconic glyphs (Powerline, Font Awesome, Material Design Icons, Codicons, Devicons).
- **Patch Preset (`patch_mode`):**
  - **`complete`:** Injects the exhaustive set of all supported Nerd Font icon glyphs (~10,000+ symbols).
  - **`default`:** Injects a minimal core symbol subset (Powerline symbols and basic indicators).
- **Font Scope (`font_scope`):**
  - **`core`:** The 8 developer-essential weights in `Normal` width (`Regular`, `Italic`, `Medium`, `MediumItalic`, `SemiBold`, `SemiBoldItalic`, `Bold`, `BoldItalic`).
  - **`all`:** All 36 weights and width variations generated by the full Iosevka build plan.
- **Single-Width / Mono Flag (`--mono`):** Patcher flag instructing FontForge to enforce strict 1-cell advance widths on all injected glyphs, preventing terminal column misalignment.
- **Parallel Workers (`PN`):** The patcher environment variable configuring parallel FontForge worker processes across available host vCPUs.

---

## 3. Assumptions & Open Clarifications

> [!WARNING] [ASSUMPTION-001]: Release Asset Pattern Matching  
> *Description:* Base release archives are assumed to follow the naming convention `SawalaMono-*.zip` or `SawalaMono-TTF-*.zip` uploaded by `build.yml` [VERIFIED: `.github/workflows/build.yml:108`].  
> *Risk:* If archive naming diverges, `gh release download` will fail to locate the archive.  
> *Mitigation:* The download command utilizes a wildcard pattern `*SawalaMono*.zip` and checks for extracted `.ttf` files regardless of archive folder nesting.

> [!WARNING] [ASSUMPTION-002]: GitHub CLI Token Permissions  
> *Description:* `GITHUB_TOKEN` in the workflow execution context has `contents: write` permission to upload assets to GitHub Releases [VERIFIED: `.github/workflows/build.yml:32`].  
> *Risk:* Insufficient permissions will fail at the final upload step.  
> *Mitigation:* Explicitly declare `permissions: contents: write` at the top of `patch-nerd-font.yml`.

---

## 4. Setting Up Equations & Expressive Notation (Pólya, p. 134–141)

### 4.1 Workflow Dispatch Contract (YAML Schema)

```yaml
name: Patch Nerd Font

on:
  workflow_dispatch:
    inputs:
      release_tag:
        description: 'GitHub Release Tag to patch (e.g. v1.0.0, or latest)'
        required: true
        default: 'latest'
        type: string
      patch_mode:
        description: 'Nerd Font patch preset'
        required: true
        default: 'complete'
        type: choice
        options:
          - complete
          - default
      font_scope:
        description: 'Font scope to patch'
        required: true
        default: 'core'
        type: choice
        options:
          - core
          - all

permissions:
  contents: write
```

### 4.2 Script Execution State Machine & Container Seam

```text
┌─────────────────┐
│ Workflow Trigger│ (workflow_dispatch: release_tag, patch_mode, font_scope)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Resolve Tag     │ tag == "latest" ? gh release view --json tagName : tag
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ingest Base TTFs│ gh release download <tag> -p "*SawalaMono*.zip" -> unzip to ./in_raw
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Filter Scope    │ core -> filter 8 files (Normal: Reg, Ita, Med, MedIta, Semi, SemiIta, Bold, BoldIta)
│                 │ all  -> copy all TTF files to ./in
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Docker Patcher  │ docker run --rm -v ./in:/in -v ./out:/out -e "PN=2" nerdfonts/patcher
│                 │ flags: [patch_mode == 'complete' ? '--complete' : ''] + '--mono'
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Bundle Archive  │ zip -r archives/SawalaMono-NF-${SUFFIX}.zip ./out/*.ttf
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Publish Release │ gh release upload <tag> archives/*.zip --clobber
└─────────────────┘
```

### 4.3 Error Handling & Idempotency Contract

| Failure Point | Detection Mechanism | Recovery / Remediation |
| :--- | :--- | :--- |
| **Invalid `release_tag`** | `gh release view` returns exit code 1 | Workflow terminates immediately with clear error log: `"Target release tag not found"`. |
| **Missing Base Archive** | `unzip` finds zero archives matching `*SawalaMono*.zip` | Workflow terminates with `"No SawalaMono zip archive present in release"`. |
| **Empty Input Directory** | Bash test `[ -z "$(ls -A in/*.ttf 2>/dev/null)" ]` | Fails fast before Docker run to prevent idle container spin. |
| **Docker Engine Failure** | Non-zero exit code from `docker run` | Workflow marks step as failed; no release upload occurs. |
| **Asset Collision** | `SawalaMono-NF-*.zip` already attached | `gh release upload --clobber` overwrites the existing asset idempotently. |

### 4.4 Observability, Telemetry & Logging
- **Workflow Logging:**
  - Log resolved `RELEASE_TAG`, `PATCH_MODE`, and `FONT_SCOPE` at start.
  - Print count and file list of TTFs staged for patching.
  - Print container execution duration.
  - Print post-patch TTF file inventory and archive size (`ls -lh archives/`).

---

## 5. Clean Architecture Seams & Component Boundaries

> [!NOTE]
> **Architectural Pragmatism Check:** This capability is implemented within the CI/CD Automation & Tooling layer. Rather than introducing artificial software domain layers, we enforce decoupled boundaries between:
> 1. **Trigger / Presentation Adapter:** GitHub Actions `workflow_dispatch` interface.
> 2. **Asset Retrieval Gateway:** GitHub CLI (`gh`) release communication seam.
> 3. **Transformation Domain:** Containerized FontForge runtime (`nerdfonts/patcher:latest`).
> 4. **Packaging & Delivery Gateway:** Native Unix `zip` and `gh release upload` publisher.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Interface Adapter: GitHub Actions Workflow Dispatch (patch-nerd-font.yml)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ 1. Triggers job & passes inputs
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Asset Ingestion Gateway: GitHub CLI (gh release download)                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ 2. Stages raw TTF fonts to runner
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Scope Filter Interactor (Bash Staging Script)                               │
│  - Evaluates 'core' (8 files) vs 'all' (36 files)                           │
│  - Prepares isolated /in directory                                          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ 3. Mounts volumes /in and /out
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Isolated Transformation Engine (Docker: nerdfonts/patcher:latest)           │
│  - Injects glyph palettes (--complete or default)                           │
│  - Enforces monospace cell geometry (--mono)                                │
│  - Distributes workload across 2 vCPUs (PN=2)                               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ 4. Outputs patched TTFs to /out
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Release Publisher Gateway (zip & gh release upload --clobber)               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Acceptance Criteria (Given-When-Then)

- **AC-001 (Happy Path - Core Scope with Complete Glyphs):**  
  *Given* a published GitHub Release `v1.0.0` containing base `SawalaMono-v1.0.0.zip`,  
  *When* the user triggers `patch-nerd-font.yml` with `release_tag: "v1.0.0"`, `patch_mode: "complete"`, and `font_scope: "core"`,  
  *Then* exactly 8 TrueType fonts (Normal width: Regular, Italic, Medium, MediumItalic, SemiBold, SemiBoldItalic, Bold, BoldItalic) are patched with complete glyph sets, packaged into `SawalaMono-NF-v1.0.0.zip`, and uploaded to release `v1.0.0` within 15 minutes.

- **AC-002 (Happy Path - All Scope with Complete Glyphs):**  
  *Given* a published GitHub Release `v1.0.0` containing base `SawalaMono-v1.0.0.zip`,  
  *When* the user triggers `patch-nerd-font.yml` with `release_tag: "v1.0.0"`, `patch_mode: "complete"`, and `font_scope: "all"`,  
  *Then* all 36 TrueType fonts are patched with complete glyph sets, packaged into `SawalaMono-NF-v1.0.0.zip`, and uploaded to release `v1.0.0` within 60 minutes.

- **AC-003 (Happy Path - Default Core Preset):**  
  *Given* a valid release tag,  
  *When* the user triggers `patch-nerd-font.yml` with `patch_mode: "default"`,  
  *Then* the container executes without `--complete`, injecting only core Powerline symbols, completing in less than 5 minutes for `font_scope: "core"`.

- **AC-004 (Resolution of 'latest' Tag):**  
  *Given* the user supplies `release_tag: "latest"`,  
  *When* the workflow initializes,  
  *Then* `gh release view --json tagName -q .tagName` resolves the exact semantic tag, and artifacts are uploaded to that release without error.

- **AC-005 (Monospace Compliance Verification):**  
  *Given* patched TrueType font files in `./out`,  
  *When* inspecting font metrics or rendering in terminal emulators,  
  *Then* all Latin alphabet characters retain strict monospaced advances without overlapping adjacent cells.

- **AC-006 (Negative Path - Non-Existent Release Tag):**  
  *Given* the user supplies an invalid or non-existent `release_tag: "v99.99.99"`,  
  *When* the workflow attempts to fetch assets,  
  *Then* the workflow fails at the download step with a descriptive log message and exits with status 1 without launching Docker.

- **AC-007 (Idempotent Overwrite / Rerun):**  
  *Given* a release that already has `SawalaMono-NF-v1.0.0.zip` attached,  
  *When* `patch-nerd-font.yml` is re-run for `v1.0.0`,  
  *Then* `gh release upload --clobber` replaces the existing archive cleanly without raising an asset duplicate error.

### 6.1 Value Sourcing & Positive Input Coverage Table

| Required Output / Computed / Displayed Value | AC Ref | Named Source (`Input DTO` / `CLI Output` / `Derivation Formula` / `Config`) | Boundary / Edge Variation (`Tag Format` / `Missing File` / `Null`) |
| :--- | :---: | :--- | :--- |
| `TARGET_TAG` | `AC-001`, `AC-004` | `Derived: [ inputs.release_tag == 'latest' ? $(gh release view --json tagName -q .tagName) : inputs.release_tag ]` | `v1.0.0`, `1.0.0`, `latest`, `non-existent` |
| `BASE_ZIP_NAME` | `AC-001` | `CLI: $(ls archives/*SawalaMono*.zip 2>/dev/null | head -n 1)` | `Single zip`, `Multiple zips`, `Zero zips` |
| `SELECTED_TTF_FILES` | `AC-001`, `AC-002` | `Derived: if font_scope == 'core' then grep -E '(Regular|Italic|Medium|MediumItalic|SemiBold|SemiBoldItalic|Bold|BoldItalic)\.ttf' else '*.ttf'` | `8 files for core`, `36 files for all`, `case-sensitivity` |
| `PATCH_ARGS` | `AC-001`, `AC-003` | `Derived: [ inputs.patch_mode == 'complete' ? '--complete --mono' : '--mono' ]` | `'complete'` vs `'default'` |
| `PN_WORKERS` | `AC-001` | `Config: 2 (matching runner 2 vCPUs)` | Fixed constant `2` |
| `OUTPUT_ARCHIVE` | `AC-001` | `Formula: "SawalaMono-NF-${TARGET_TAG}.zip"` | Archive naming consistency with base releases |

---

## 7. Testing Strategy & Dimensional Bounds

- **Verification Seams:**
  - **YAML Linter:** Ensure `.github/workflows/patch-nerd-font.yml` passes structural syntax validation.
  - **Workflow Dry-Run / Staging Test:** Execute the workflow on a test draft release (e.g. `v0.0.0-test`) to confirm container mounting, process parallelism (`PN=2`), and asset upload.
- **Dimension Checks:**
  - **Core Weight Verification:** Assert that exactly 8 TTF files are passed to Docker when `font_scope: core`.
  - **Timeout Safeguard:** Set `timeout-minutes: 90` at the GitHub Actions job level to safeguard against unexpected container deadlocks.
- **Extreme Limiting Cases:**
  - Empty or corrupt base ZIP archive.
  - Tag containing special characters or release draft states.

---

## 8. Architectural Decision Records (ADRs)

- [ADR-0002: Standalone Containerized Nerd Font Patching Pipeline](docs/adr/0002-standalone-nerd-font-patcher.md) — Documenting the decision to decouple Nerd Font generation into a dedicated, on-demand workflow utilizing Docker and GitHub Release asset seams.
