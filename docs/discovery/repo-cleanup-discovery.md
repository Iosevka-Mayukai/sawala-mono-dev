# 🔭 Project Discovery Draft: Upstream Iosevka Repository Slimming & Cleanup

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `Iosevka (Sawala Mono)`  
**Status:** **Approved for Spec (Option A - Pragmatic Slimming Selected)**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable -->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** 
  The `Iosevka Sawala Mono` repository was initialized by forking upstream Iosevka v34.9.1 [VERIFIED: `package.json:3`]. Upstream Iosevka contains significant auxiliary assets required solely for Belleve Invis's distribution website, specimen SVG rendering, historical changelog archives, and upstream GitHub Actions infrastructure. These auxiliary files inflate clone times, clutter repository navigation, and introduce noise into workspace indexing without contributing to the compilation of Sawala Mono font binaries.
- **Business Value & Why Now:** 
  Eliminating obsolete upstream files frees up ~48 MB of repository bloat and removes over 4,200 redundant files (principally `images/` and historical `changes/`). This significantly speeds up git operations, reduces CI checkout overhead [VERIFIED: `.github/workflows/build.yml:41-43`], simplifies cognitive load for font maintainers, and clarifies the boundary between core font synthesis logic and custom Sawala Mono configurations.
- **Target Persona & Users:** 
  Sawala Mono maintainers, CI runners, and downstream contributors seeking a lean, focused coding font repository.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | A vetted, prioritized list of upstream Iosevka files and directories that can be safely excised from the repository without breaking `npm run build` font synthesis, GitHub Actions pipelines, or package workspaces. |
| **Known Data** | 1. Root topography: 11 top-level directories and 14 root files totaling ~91.8 MB (excluding `.git`).<br>2. Build engine: Node.js-based build system driven by `verdafile.mjs` and npm workspaces (`packages/*`, `tools/*`) [VERIFIED: `package.json:4-7`].<br>3. CI workflow: `.github/workflows/build.yml` executing `docker run ... iosevka-builder:latest -c "npm ci && npm run build -- $BUILD_ARGS"` [VERIFIED: `.github/workflows/build.yml:84-88`].<br>4. Custom configuration: `private-build-plans.toml` defining the Sawala Mono font variants [VERIFIED: `private-build-plans.toml:1-95`]. |
| **The Conditions & Invariants** | 1. **Zero Build Breakage:** Font synthesis targets (`ttf::SawalaMono`, `woff2::SawalaMono`) must execute cleanly without missing dependency errors.<br>2. **Workspace Integrity:** NPM workspaces (`packages/*`, `tools/*`) in `package.json` must remain syntactically and functionally valid.<br>3. **CI Pipeline Safety:** Docker build context (`docker/`) and active workflow (`.github/workflows/build.yml`) must remain intact.<br>4. **Documentation Preservation:** Essential upstream reference documentation for glyph variants and stylistic sets should remain accessible for font design maintenance. |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

A comprehensive audit of repository disk usage and file inventory reveals four distinct architectural strata:

```text
====================================================================================================
                        REPOSITORY TOPOGRAPHY & SIZE BREAKDOWN
====================================================================================================
Path / Component              File Count    Disk Size    Role & Functional Coupling
────────────────────────────────────────────────────────────────────────────────────────────────────
images/                       3,950 files   48.20 MB     [AUXILIARY / UNUSED] Upstream SVG specimens
changes/                        284 files    0.20 MB     [LEGACY / UNUSED] Upstream v3-v34 changelogs
doc/                              7 files    1.40 MB     [HYBRID] Upstream docs (references & backers)
sample-text/                      5 files    0.01 MB     [TEST / UNUSED] Upstream sample texts
.github/workflows/ (upstream)     4 files    0.01 MB     [UPSTREAM ONLY] Hardcoded be5invis/Iosevka CI
private-build-plans.sample.toml   1 file     0.01 MB     [SAMPLE / UNUSED] Redundant template
────────────────────────────────────────────────────────────────────────────────────────────────────
tools/ (amend-readme, etc.)      53 files    0.08 MB     [WORKSPACE TIED] Ancillary utilities
packages/                       411 files    2.69 MB     [CRITICAL CORE] Font engine & glyph synthesis
params/                           6 files    0.43 MB     [CRITICAL CORE] Core font shape/slope/variant rules
build-plans.toml                  1 file     0.02 MB     [CRITICAL CORE] Read directly by verdafile.mjs
docker/                           3 files    0.01 MB     [CRITICAL CI] Container build context
.github/workflows/build.yml       1 file     0.01 MB     [CRITICAL CI] Active Sawala Mono build pipeline
====================================================================================================
```

#### Detailed Findings by Component

1. **`images/` (3,950 files, 48.2 MB):**
   - **Coupling Analysis:** Referenced in `verdafile.mjs:23,1281-1335` exclusively within the `sample-images` task and `ReleaseAncillary` [VERIFIED: `verdafile.mjs:1407`].
   - **Build Impact:** Standard font synthesis (`verda ttf::SawalaMono`) traverses `GroupTtfsImpl` [VERIFIED: `verdafile.mjs:667,716-724`], which depends solely on `GroupFontsOf` and font compilation steps. It never accesses `images/`.
   - **Verdict:** Safe to purge immediately.

2. **`changes/` (284 files, 0.20 MB):**
   - **Coupling Analysis:** Contains granular changelog entries for Iosevka releases from v3.x through v34.9.1 [VERIFIED: `changes/archives/*`, `changes/34.*.md`]. Referenced in `verdafile.mjs:1374` via `FileList({ under: "changes", pattern: "*.md" })` for building upstream's monolithic `CHANGELOG.md`.
   - **Build Impact:** Zero impact on font compilation.
   - **Verdict:** Safe to purge immediately.

3. **`sample-text/` (5 files, ~6 KB):**
   - **Coupling Analysis:** Contains test text files (`agda-stdlib-symbols-matrix.txt`, `agda-stdlib-symbols.txt`, `bug1159.txt`, `legibility-test-matrix.txt`, `tie-marks.txt`).
   - **Build Impact:** Zero references across the entire codebase.
   - **Verdict:** Safe to purge immediately.

4. **Upstream GitHub Workflows (`.github/workflows/`):**
   - [`.github/workflows/dev-daily-build.yml:15`](file:///.github/workflows/dev-daily-build.yml#L15): Hardcoded guard `if: github.repository == 'be5invis/Iosevka'`. Never executes on Sawala Mono; targets upstream fonts (`Iosevka`, `IosevkaSlab`, `IosevkaAile`, `IosevkaEtoile`).
   - [`.github/workflows/pr-build-validation.yml:8`](file:///.github/workflows/pr-build-validation.yml#L8): Hardcoded guard `if: github.repository == 'be5invis/Iosevka'`. Never executes on Sawala Mono.
   - [`.github/workflows/stale.yml:9`](file:///.github/workflows/stale.yml#L9): Hardcoded guard `if: github.repository == 'be5invis/Iosevka'`.
   - [`.github/workflows/pr-target-branch-check.yml:15`](file:///.github/workflows/pr-target-branch-check.yml#L15): Specific branch enforcement policy for upstream repository.
   - **Verdict:** Safe to delete. Only [`.github/workflows/build.yml`](file:///.github/workflows/build.yml) is active and required.

5. **Upstream Issue & PR Templates (`.github/ISSUE_TEMPLATE/` & `.github/PULL_REQUEST_TEMPLATE/`):**
   - Tailored specifically to upstream character design requests (`character-request.md`, `character-variant-request.md`, `ligation-request.md`).
   - **Verdict:** Safe to delete or replace with Sawala Mono-specific issue templates.

6. **`private-build-plans.sample.toml`:**
   - Sample documentation file provided by upstream. Superseded by active [`private-build-plans.toml`](file:///private-build-plans.toml).
   - **Verdict:** Safe to delete.

7. **`doc/` (7 files, 1.40 MB):**
   - `doc/BackersArchive.md`: Upstream Patreon/PayPal financial backer list. (Safe to delete).
   - `doc/PACKAGE-LIST.md`: Upstream listing of all 36+ pre-packaged font distributions. (Safe to delete).
   - `doc/character-variants.md`, `doc/custom-build.md`, `doc/cv-influences.md`, `doc/language-specific-ligation-sets.md`, `doc/stylistic-sets.md`: Comprehensive reference catalogues for character variant tags and ligation sets.
   - **Verdict:** Retain the 5 variant/ligation reference files for design guidance; delete `BackersArchive.md` and `PACKAGE-LIST.md`.

8. **`tools/` (53 files, ~80 KB across 4 workspaces):**
   - `tools/generate-samples`: Builds SVG specimens for `images/`.
   - `tools/amend-readme`: Injects upstream data into README and changelog.
   - `tools/data-export`: Exports character maps and variant JSONs.
   - `tools/misc`: **CRITICAL.** Contains `ttf-to-woff2.mjs`, `generate-ttfa-ranges.mjs`, and `update-package-json-version.mjs` [VERIFIED: `package.json:10,14`].
   - **Verdict:** Keep `tools/` intact for now to prevent breaking npm workspace resolution [VERIFIED: `package.json:6`].

9. **`build-plans.toml` (24 KB):**
   - **Crucial Invariant:** `verdafile.mjs:157,159` directly executes `await target.need(sfu(BUILD_PLANS))` and `tryParseToml(BUILD_PLANS)`. Deleting this file without modifying `verdafile.mjs` will cause `verda` to throw a fatal unhandled error.
   - **Verdict:** Retain `build-plans.toml`.

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: Pragmatic Slimming [SELECTED & APPROVED] | Option B: Radical Purge (Engine-Only Stripping) | Option C: Minimal Cleanup (Status Quo) |
| :--- | :--- | :--- | :--- |
| **Summary** | Delete `images/`, `changes/`, `sample-text/`, `private-build-plans.sample.toml`, upstream GitHub workflows, upstream issue templates, and upstream backer docs. Retain design references in `doc/` and npm workspaces in `tools/`. | Delete everything outside `packages/`, `params/`, and `private-build-plans.toml`. Refactor `verdafile.mjs` and `package.json` to strip all unused tasks and workspaces. | Delete only `sample-text/`, `private-build-plans.sample.toml`, and inactive `.github/workflows`. |
| **Space Recovered** | **~48.4 MB (4,240+ files eliminated)** | ~49.9 MB (4,300+ files eliminated) | ~0.02 MB (< 10 files) |
| **Build Stability** | **100% stable; zero changes required in `verdafile.mjs` or `package.json`** | Moderate risk; requires rewriting build orchestrator and workspace configurations. | 100% untouched |
| **Design Reference** | **Preserved (`character-variants.md`, etc. retained)** | Lost (must refer to external upstream repo) | Preserved |
| **Reversibility** | **Clean two-way door via Git history** | High effort to re-align with future upstream engine updates. | Immediate |
| **Recommendation** | **[SELECTED BY USER]** | Over-engineered for current phase | Insufficient impact |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

- **Risk 1: Does `npm run build -- ttf::SawalaMono` depend on any deleted file?**
  - **Verification:** Inspected `verdafile.mjs` execution graph. The `ttf` group entry point [VERIFIED: `verdafile.mjs:667`] resolves:
    `_Entry_GroupTTFs` ➔ `GroupTtfsImpl` ➔ `GroupFontsOf` ➔ `BuildPlanOf` ➔ `BuildPlans` ➔ `RawPlans` (`BUILD_PLANS` + `PRIVATE_BUILD_PLANS`).
  - **Conclusion:** Neither `images/`, `changes/`, `sample-text/`, nor `doc/` are touched during standard font compilation.
- **Risk 2: Will Git repository size actually shrink?**
  - **Finding:** Deleting files from the working tree will immediately reduce local checkout footprint and zip download sizes. To permanently shrink `.git/` packfile history, an aggressive filter-repo would be needed, but for standard development, working tree deletion provides immediate index and IDE responsiveness benefits.

---

## 6. Strategic Recommendation & Handoff to Specification

### 6.1 Actionable File Categorization for Deletion

#### Tier 1: Immediately Safe for Deletion (Zero Code Coupling)
- [ ] `images/` (3,950 SVG files, 48.2 MB) — Upstream web specimens and assets.
- [ ] `changes/` (284 files, 0.20 MB) — Upstream historical changelog entries.
- [ ] `sample-text/` (5 files, ~6 KB) — Upstream arbitrary symbol tests.
- [ ] `private-build-plans.sample.toml` (1 file, 6.9 KB) — Redundant sample plan.
- [ ] `.github/workflows/dev-daily-build.yml` — Upstream daily build (hardcoded to `be5invis/Iosevka`).
- [ ] `.github/workflows/pr-build-validation.yml` — Upstream PR validator (hardcoded to `be5invis/Iosevka`).
- [ ] `.github/workflows/stale.yml` — Upstream stale bot (hardcoded to `be5invis/Iosevka`).
- [ ] `.github/workflows/pr-target-branch-check.yml` — Upstream branch check policy.
- [ ] `doc/BackersArchive.md` — Upstream sponsor archives.
- [ ] `doc/PACKAGE-LIST.md` — Upstream package catalog.

#### Tier 2: Deletion or Customization Candidates (Repository Maintenance)
- [ ] `.github/ISSUE_TEMPLATE/*` (5 files) — Upstream issue templates.
- [ ] `.github/PULL_REQUEST_TEMPLATE/*` (2 files) — Upstream PR templates.
- [ ] `.github/pull_request_template.md` (1 file).
- [ ] `CHANGELOG.md` — Can be reset/initialized for Sawala Mono versioning.
- [ ] `README.md` — Should be rewritten to describe Sawala Mono features and installation.

#### Tier 3: CRITICAL - DO NOT DELETE (Engine & Build Invariants)
- ⛔ `packages/` (all 9 packages) — Core glyph drawing and OpenType tables.
- ⛔ `params/` (all 6 TOML files) — Essential glyph dimensions and variant definitions.
- ⛔ `tools/` (all 4 tools) — Required for npm workspaces and utility scripts (`tools/misc`).
- ⛔ `build-plans.toml` — Hardcoded dependency in `verdafile.mjs:157,159`.
- ⛔ `private-build-plans.toml` — Core Sawala Mono build configuration.
- ⛔ `verdafile.mjs` — Build engine script.
- ⛔ `docker/` — Required for containerized build in CI.
- ⛔ `.github/workflows/build.yml` — Active font building and GitHub release pipeline.
- ⛔ `doc/character-variants.md`, `doc/custom-build.md`, `doc/cv-influences.md`, `doc/language-specific-ligation-sets.md`, `doc/stylistic-sets.md` — Essential reference docs for font tweaking.

---

### 6.2 Forking Handoff Actions (`/to-prd` or `/to-spec`)

Choose the downstream path matching your project's workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/repo-cleanup-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and acceptance criteria based on this Discovery Draft.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint):**
  ```text
  /to-spec @docs/discovery/repo-cleanup-discovery.md Formulate formal technical specification, deletion manifests, and Clean Architecture verification steps based on this approved Discovery Draft.
  ```
