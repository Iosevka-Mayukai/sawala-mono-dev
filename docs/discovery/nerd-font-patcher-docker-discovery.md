# 🔭 Project Discovery Draft: Nerd Font Patcher Integration via Docker

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `Iosevka (Sawala Mono)`  
**Status:** **Approved for Specification**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable -->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** 
  The project specification explicitly envisions distributing `Sawala Mono NF` (Nerd Font) alongside standard and no-ligature variants [VERIFIED: `AGENTS.md:4`]. However, the current CI workflow only builds base TTF/WOFF2 font binaries using the internal Iosevka builder [VERIFIED: `.github/workflows/build.yml:84-89`]. Currently, users seeking modern developer terminal/IDE iconography (e.g., Neovim, Starship, Oh-My-Posh, eza) must patch the font manually on their local machines.
- **Business Value & Why Now:** 
  Automating Nerd Font patching inside GitHub Actions allows automated release packaging for `Sawala Mono NF`. Containerizing this step via Docker eliminates the heavy, brittle local installation of FontForge, Python dependencies, and font metrics libraries on runner environments.
- **Target Persona & Users:** 
  Software engineers, terminal power users, and developers using modal editors (Neovim/Vim) and command-line interfaces who rely on the Nerd Font glyph symbol palette.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | A decoupled, standalone GitHub Actions workflow (`.github/workflows/patch-nerd-font.yml`) executing containerized Nerd Font patching via Docker (`nerdfonts/patcher:latest`) with configurable parameters (`release_tag`, `patch_mode: complete | default`, and `font_scope: all | core`), targeting pre-built font releases without polluting the primary font compilation pipeline. |
| **Known Data** | 1. Official Docker image: `nerdfonts/patcher:latest`<br>2. Existing base build workflow: `.github/workflows/build.yml`<br>3. Iosevka plan: `private-build-plans.toml` defining 2 widths & 2 slopes (yielding 36 font files per variant)<br>4. GitHub Actions standard runner specifications (`ubuntu-latest`: 2 vCPUs, 7 GB RAM, 14 GB SSD, 360-minute hard job timeout). |
| **The Conditions & Invariants** | 1. **Zero Coupling to Base Build:** Base font synthesis in `build.yml` remains untouched, lightweight, and fast (~15 mins).<br>2. **Decoupled Failure Blast-Radius:** Failures or delays in Nerd Font patching must not block or cancel standard font releases.<br>3. **Zero Host Pollution:** Font patching must execute strictly inside the container.<br>4. **Glyph Integrity & Strict Monospace:** Patched monospace fonts must enforce `--mono` to preserve uniform cell widths.<br>5. **Explicit Parameterization:** Operators must be able to specify the release tag and patch depth (`complete` vs `default`). |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

- **Relevant Directories & Modules:**
  - [`.github/workflows/build.yml:37`](file:///.github/workflows/build.yml#L37): Runs on `ubuntu-latest`. It features a parameterizable `workflow_dispatch` trigger handling `variant`, `format`, `create_release`, and `version`.
  - [`.github/workflows/build.yml:84-89`](file:///.github/workflows/build.yml#L84-L89): Invokes `docker run --rm -v ${{ github.workspace }}:/work iosevka-builder:latest` to execute the Node.js/ttfautohint font synthesis.
  - [`private-build-plans.toml:75-95`](file:///private-build-plans.toml#L75-L95): Defines 2 widths (`Normal`, `SemiExtended`) and 2 slopes (`Upright`, `Italic`). Combined with Iosevka's 9 standard weights (`Thin` through `Heavy`), each variant generates **36 TTF files**.
- **Architectural Debt & Seam Vulnerabilities:**
  - **Coupled Build & Package Step:** Currently, font synthesis, archive compression, and GitHub Release deployment exist in a single sequential monolithic job (`jobs.build`).
  - **Exploding Combinatorial Volume:** 36 TTF files per variant means that applying heavy CPU-bound glyph patching across all weights will multiply processing time thirty-six-fold.

### 3.2 Analogous Solutions & Prior Art

- **Industry Prior Art (Nerd Fonts Official Docker Patcher):**
  - Image: `nerdfonts/patcher:latest`.
  - Mount convention: `-v /path/to/in:/in -v /path/to/out:/out nerdfonts/patcher [flags]`.
  - Parallelism control: Environment variable `PN=<number>` enables concurrent worker sub-processes.
- **Glyph Ingestion Differences:**
  - `default` (no flags): Patches only core minimal symbols (Powerline + minimal icons). Fast (~10–20 seconds per font), but modern terminal/Neovim plugins will display blank tofu boxes for missing Codicons/MDI.
  - `complete` (`-c`): Injects ~10,000+ glyphs (Font Awesome, Material Design Icons, Codicons, Devicons, Octicons, Weather, etc.). Requires ~90–150 seconds per font file, swelling file size from ~300 KB to ~3.5–4.5 MB per font file.

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: Monolithic In-Job Patching (`build.yml`) | Option B: Dedicated Standalone Workflow (`patch-nerd-font.yml`) [RECOMMENDED] | Option C: Downstream Auto-Trigger Matrix (`workflow_run`) |
| :--- | :--- | :--- | :--- |
| **Summary** | Embed patching directly inside the main `build.yml` job as an optional step. | Create a separate, dedicated `.github/workflows/patch-nerd-font.yml` triggered on-demand via `workflow_dispatch` with parameter options for `release_tag` and `patch_mode`. | Automatically trigger a secondary matrix pipeline upon completion of any release tag in `build.yml`. |
| **Separation of Concerns (SRP)** | Poor (Coupled CI concerns). | **Clean Seam:** Base build is isolated from heavy font transformation. | Decoupled, but higher event trigger orchestration complexity. |
| **Blast Radius & Reliability** | High: A patch failure invalidates the entire base font release. | **Zero Blast Radius:** Base font release is already safe and published before patching begins. | Low blast radius, but automatic triggers consume minutes on every release. |
| **Execution Duration** | 90+ minutes monolithic run. | Base build: ~15 mins.<br>NF Patch workflow: ~35–45 mins (isolated). | Base: ~15 mins.<br>Matrix parallel: ~20 mins. |
| **Operational Control** | All or nothing during build dispatch. | **High control:** Patch on-demand for specific releases, tags, or test fonts. | Automated on every tag release. |
| **Recommendation** | Rejection | **[RECOMMENDED]** | Future Scale (Phase 2) |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

### 5.1 Failure Inversion & Risk Analysis ("Why Might This Fail?")

1. **GitHub Release Asset Ingestion Seam:**
   - *Risk:* In a standalone workflow, how does the patcher get the base TTF files?
   - *Mitigation:* The patch workflow can use `gh release download <tag> -p "*.zip"` or accept a manual upload / artifact ID, unpack the TTFs, run the container, and use `gh release upload <tag> archives/*.zip --clobber` to append the NF archives directly to the existing GitHub release!
2. **CPU & Concurrency Saturation:**
   - *Risk:* FontForge may saturate CPU cores, causing throttling on shared GHA virtual machines.
   - *Mitigation:* Explicitly pass `PN=2` to match the exact 2 vCPUs provided by `ubuntu-latest`.
3. **Monospace Cell Integrity:**
   - *Invariant:* Always include `--mono` (or `--use-single-width-glyphs`) to ensure terminal emulator cursor alignment is never broken.

---

## 6. Strategic Recommendation & Handoff to Specification

- **Selected Architectural Path:**
  Adopt **Option B (Dedicated Standalone Workflow: `patch-nerd-font.yml`)**:
  
  ### 6.1 Workflow Dispatch Contract
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
          default: 'all'
          type: choice
          options:
            - all
            - core
  ```

  ### 6.2 Data Flow & Execution Sequence
  1. Operator invokes workflow selecting target tag (e.g., `v1.0.0`), mode (`complete`), and scope (`all` or `core`).
  2. Runner downloads existing font archive via `gh release download ${{ inputs.release_tag }} --pattern "*SawalaMono*.zip"`.
  3. Extract TTF files into input directory `./in/`.
  4. If `font_scope == 'core'`, filter the essential coding weights in Normal width (Regular, Italic, Medium, MediumItalic, SemiBold, SemiBoldItalic, Bold, BoldItalic — 8 files total). If `font_scope == 'all'`, process all 36 files across all widths and weights.
  5. Run container:
     ```bash
     docker run --rm \
       -v $(pwd)/in:/in \
       -v $(pwd)/out:/out \
       -e "PN=2" \
       nerdfonts/patcher:latest \
       ${PATCH_FLAG} --mono
     ```
  6. Package `./out` into `SawalaMono-NF-${{ inputs.release_tag }}.zip`.
  7. Append to the existing GitHub Release:
     ```bash
     gh release upload ${{ inputs.release_tag }} archives/*.zip --clobber
     ```

### 6.3 Downstream Readiness Checklist (for `/to-prd` or `/to-spec`)
- [x] **The Unknown:** Dedicated standalone Nerd Font patcher workflow using Docker with parameterized UI.
- [x] **The Data:** Base TTF release assets, `nerdfonts/patcher:latest`, GitHub CLI `gh`.
- [x] **The Condition:** Independent lifecycle, zero blast radius on base build, `--mono` compliance, `PN=2` concurrency.
- [x] **Clean Architecture Seams:** Decoupled GitHub Actions workflows connected via GitHub Release assets seam.
- [x] **Risks & Spikes:** Verified release asset download/upload patterns via `gh` CLI.

### 6.4 Forking Handoff Actions (`/to-prd` or `/to-spec`)

Choose the downstream path matching your project's workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/nerd-font-patcher-docker-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and acceptance criteria based on this Discovery Draft.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint):**
  ```text
  /to-spec @docs/discovery/nerd-font-patcher-docker-discovery.md Formulate formal technical specification, DTO contracts, and Clean Architecture seams based on this approved Discovery Draft.
  ```
