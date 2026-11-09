---
title: "Technical Specification: Upstream Iosevka Repository Slimming & Deletion Manifest"
version: "1.0.0"
date_created: "2026-11-09"
last_updated: "2026-11-09"
status: "Approved"
prd_ref: null
tags: ["polya", "spec", "clean-architecture", "iosevka-sawalamono", "repo-cleanup"]
---
<!-- markdownlint-disable -->

# Technical Specification: Upstream Iosevka Repository Slimming & Deletion Manifest

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
- **Primary Goal:** Safely excise ~48.4 MB of upstream auxiliary bloat (~4,240 obsolete files) originating from the upstream Iosevka v34.9.1 fork [VERIFIED: `package.json:3`], transforming the repository into a clean, focused, high-performance workspace dedicated exclusively to **Iosevka Sawala Mono**.
- **Completion Definition:**
  1. The target manifest of unused upstream files/directories (`images/`, `changes/`, `sample-text/`, `private-build-plans.sample.toml`, upstream-only `.github/workflows/`, and upstream sponsor archives in `doc/`) is completely purged from the repository tree.
  2. The font compilation engine executes cleanly for all Sawala Mono targets (`ttf::SawalaMono`, `woff2::SawalaMono`) without missing dependency errors.
  3. All npm workspaces (`packages/*`, `tools/*`) and the Docker CI pipeline remain 100% operational.
- **Explicit Non-Goals (Out of Scope):**
  - **No Engine Refactoring:** Do not modify `verdafile.mjs` or refactor `@iosevka/*` core packages.
  - **No Font Parameter Alterations:** Do not modify `params/*` or `private-build-plans.toml`.
  - **No Workspace Stripping:** Do not delete `tools/` or remove workspaces from `package.json`.
  - **No Reference Documentation Loss:** Do not delete the 5 essential font variant/ligation guide files in `doc/` (`character-variants.md`, `custom-build.md`, `cv-influences.md`, `language-specific-ligation-sets.md`, `stylistic-sets.md`).

### 1.2 The Data (Inputs, State & Source-Grounded Context)
- **Repository Manifest:**
  - `package.json` workspaces: `"packages/*"`, `"tools/*"` [VERIFIED: `package.json:4-7`].
  - `package.json` build scripts: `"build": "verda -f verdafile.mjs"`, `"bump-ver"`, `"clean"` [VERIFIED: `package.json:8-15`].
- **Build Engine & Configuration Seams:**
  - `verdafile.mjs`: Entry points for font synthesis `ttf` [VERIFIED: `verdafile.mjs:667`] and `woff2` [VERIFIED: `verdafile.mjs:673`] resolve via `GroupTtfsImpl` [VERIFIED: `verdafile.mjs:716`] and `GroupFontsOf` [VERIFIED: `verdafile.mjs:269`].
  - `verdafile.mjs:157,159`: Hard dependency on `BUILD_PLANS` (`build-plans.toml`) via `tryParseToml(BUILD_PLANS)`.
  - `private-build-plans.toml`: Active Sawala Mono specification defining `SawalaMono` variants [VERIFIED: `private-build-plans.toml:1-95`].
- **CI/CD Pipeline Seams:**
  - `.github/workflows/build.yml:48-56`: Builds runner image `iosevka-builder:latest` using context `docker/` [VERIFIED: `docker/Dockerfile:1-12`, `docker/build.sh:1-68`].
  - `.github/workflows/build.yml:84-88`: Executes `npm ci && npm run build -- $BUILD_ARGS` inside container.

### 1.3 The Condition (Requirements, Constraints & Invariants)

#### Functional Requirements (Deletion Manifest)
- **REQ-001 (Purge Specimen Images):** Delete the entire [`images/`](file:///images) directory containing 3,950 pre-rendered SVG specimens (~48.2 MB).
- **REQ-002 (Purge Historical Changelogs):** Delete the entire [`changes/`](file:///changes) directory containing 284 legacy markdown release logs (~0.20 MB).
- **REQ-003 (Purge Test Sample Texts):** Delete the entire [`sample-text/`](file:///sample-text) directory containing 5 arbitrary symbol text files (~6 KB).
- **REQ-004 (Purge Sample Plan):** Delete [`private-build-plans.sample.toml`](file:///private-build-plans.sample.toml) (~6.9 KB).
- **REQ-005 (Purge Upstream Workflows):** Delete the 4 upstream-specific workflows in [`.github/workflows/`](file:///.github/workflows):
  - `.github/workflows/dev-daily-build.yml` [VERIFIED: `dev-daily-build.yml:15`]
  - `.github/workflows/pr-build-validation.yml` [VERIFIED: `pr-build-validation.yml:8`]
  - `.github/workflows/stale.yml` [VERIFIED: `stale.yml:9`]
  - `.github/workflows/pr-target-branch-check.yml` [VERIFIED: `pr-target-branch-check.yml:15`]
- **REQ-006 (Purge Upstream Sponsor/Catalog Docs):** Delete upstream backer and distribution catalogue files in [`doc/`](file:///doc):
  - `doc/BackersArchive.md` (~655 bytes)
  - `doc/PACKAGE-LIST.md` (~84.9 KB)
- **REQ-007 (Preserve Core Architecture Invariants):** Guarantee that all files outside the explicit deletion manifest remain completely untouched.

#### Constraints & Operational Invariants
- **CON-001 (Zero Build Degradation):** Executing `npm run build -- ttf::SawalaMono` must produce bit-for-bit valid font binaries in `dist/SawalaMono` without requiring any missing files.
- **CON-002 (Workspace Resolution Invariant):** Executing `npm ci` or `npm install` must succeed cleanly with exit code 0, verifying that npm workspace resolution across `packages/*` and `tools/*` is fully intact.
- **CON-003 (Containerized CI Invariant):** The Docker build context (`docker/Dockerfile`, `docker/build.sh`) and `.github/workflows/build.yml` must remain 100% operational.
- **CON-004 (Design Reference Retention):** The 5 core glyph design reference guides in `doc/` must remain in place for maintainer consultation.

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)
- **Is the condition sufficient to determine the unknown?** Yes. The manifest explicitly defines every file and directory to be removed.
- **Is it insufficient?** No. All target files have been mapped and verified against codebase references.
- **Is it redundant or contradictory?** No. There is zero overlap between the deletion manifest and the required build dependencies.
- **Did you use ALL the data?** Yes. All 11 directories and 14 root files were audited; only verified auxiliary assets are scheduled for deletion.
- **Did you use the WHOLE condition?** Yes. Build invariants and workspace integrity constraints are enforced.

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)

*Reductio ad Absurdum (Proof by Contradiction):*
1. **Hypothesis 1: What if `build-plans.toml` were added to the deletion manifest?**
   - *Contradiction:* Line 157 and 159 of `verdafile.mjs` execute `await target.need(sfu(BUILD_PLANS))` and `tryParseToml(BUILD_PLANS)`. Deleting `build-plans.toml` causes `verda` to crash immediately with `Failed to parse configuration file build-plans.toml`.
   - *Conclusion:* `build-plans.toml` MUST be preserved.
2. **Hypothesis 2: What if `tools/` were deleted to save space?**
   - *Contradiction:* `package.json:6` declares `"workspaces": ["packages/*", "tools/*"]`. Deleting `tools/` causes npm to log warnings/errors on missing workspace paths, and breaks scripts calling `tools/misc/src/*` [VERIFIED: `package.json:10,14`].
   - *Conclusion:* `tools/` MUST be preserved.
3. **Hypothesis 3: What if `images/` is deleted while compiling `ttf::SawalaMono`?**
   - *Analysis:* Tracing `_Entry_GroupTTFs` in `verdafile.mjs:667` shows it only needs `GroupTtfsImpl`, which requires `GroupFontsOf`, `BuildPlanOf`, and glyph generators in `packages/*`. It never calls `SampleImages` or `IMAGES`.
   - *Conclusion:* Deleting `images/` produces zero side-effects during standard font builds.

---

## 2. Ubiquitous Language & Domain Glossary (`CONTEXT.md`)

- **Auxiliary Asset:** Static preview, specimen, or documentation artifact generated for the upstream Iosevka website that does not participate in font binary synthesis.  
  _Avoid_: Core asset, font source.
- **Build Plan (`private-build-plans.toml`):** The TOML configuration file specifying family name, weight, slope, width, and character variant assignments for Sawala Mono.  
  _Avoid_: Font plan, custom script.
- **Font Engine (`packages/*`):** The modular Node.js compilation pipeline that parses glyph geometries, applies OpenType features, hints contours, and emits TTF/WOFF2 binaries.  
  _Avoid_: Monorepo tools.
- **Deletion Manifest:** The exhaustive, deterministic inventory of file paths approved for permanent removal.

---

## 3. Assumptions & Open Clarifications

> [!NOTE] [ASSUMPTION-001]: Git History vs Working Tree
> Deleting these files reduces the working tree footprint immediately (~48.4 MB freed; 4,240+ files removed). Permanent reduction of the `.git/` packfile history requires `git filter-repo` / BFG, which rewrites commit hashes. This specification scopes deletion strictly to the working tree and future commits to avoid breaking existing branch references.

---

## 4. Deletion Manifest & Operational Contracts

### 4.1 Exhaustive Deletion Manifest Matrix

| Target Path | Type | File Count | Size | Requirement Ref | Verification Pre-check |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `images/` | Directory | 3,950 | 48.20 MB | `REQ-001` | Verify not referenced in `GroupTtfsImpl` [VERIFIED: `verdafile.mjs:716`] |
| `changes/` | Directory | 284 | 0.20 MB | `REQ-002` | Verify only used in `ChangeLog` task [VERIFIED: `verdafile.mjs:1374`] |
| `sample-text/` | Directory | 5 | ~6 KB | `REQ-003` | Verify zero references in workspace [VERIFIED] |
| `private-build-plans.sample.toml` | File | 1 | 6.9 KB | `REQ-004` | Verify `private-build-plans.toml` exists [VERIFIED] |
| `.github/workflows/dev-daily-build.yml` | File | 1 | 1.4 KB | `REQ-005` | Verify upstream repo guard [VERIFIED: line 15] |
| `.github/workflows/pr-build-validation.yml` | File | 1 | 1.1 KB | `REQ-005` | Verify upstream repo guard [VERIFIED: line 8] |
| `.github/workflows/stale.yml` | File | 1 | 0.5 KB | `REQ-005` | Verify upstream repo guard [VERIFIED: line 9] |
| `.github/workflows/pr-target-branch-check.yml` | File | 1 | 0.5 KB | `REQ-005` | Verify upstream branch policy [VERIFIED: line 15] |
| `doc/BackersArchive.md` | File | 1 | 0.6 KB | `REQ-006` | Upstream donor list; safe to delete [VERIFIED] |
| `doc/PACKAGE-LIST.md` | File | 1 | 84.9 KB | `REQ-006` | Upstream package list; safe to delete [VERIFIED] |
| **Total Scope** | — | **4,246 files** | **~48.49 MB** | — | **Zero core engine files touched** |

### 4.2 Invariant Retention Manifest (Strict Non-Deletion Guard)

The following paths are explicitly designated as **PROTECTED SEAMS** and must never be modified or removed during cleanup:

```text
PROTECTED SEAMS:
├── packages/                   [All 9 packages: font, font-glyphs, font-kits, font-otl, geometry, geometry-cache, glyph, param, util]
├── params/                     [All 6 files: parameters.toml, variants.toml, shape-*.toml, ligation-set.toml]
├── tools/                      [All 4 tools: amend-readme, data-export, generate-samples, misc]
├── docker/                     [Dockerfile, build.sh, README.md]
├── .github/workflows/build.yml [Primary CI/CD pipeline]
├── doc/
│   ├── character-variants.md   [Essential design reference]
│   ├── custom-build.md         [Essential build reference]
│   ├── cv-influences.md        [Essential design reference]
│   ├── language-specific-ligation-sets.md [Essential ligation reference]
│   └── stylistic-sets.md       [Essential stylistic reference]
├── build-plans.toml            [Hardcoded verdafile.mjs requirement]
├── private-build-plans.toml    [Sawala Mono definition]
├── verdafile.mjs               [Build engine orchestrator]
├── package.json                [NPM workspace definition]
└── package-lock.json           [Lockfile]
```

---

## 5. Clean Architecture Seams & Component Boundaries

```text
====================================================================================================
                        CLEAN ARCHITECTURE SEAMS & REPOSITORY BOUNDARIES
====================================================================================================

      [ EXPENDABLE UPSTREAM SEAM ]                          [ PROTECTED CORE SEAM ]
  (Marked for Permanent Deletion)                         (Protected by Invariant Guard)
  ┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
  │ - images/          (Specimens)  │                 │ - packages/     (Engine Core)   │
  │ - changes/         (Changelogs) │                 │ - params/       (Shape/Variant) │
  │ - sample-text/     (Ad-hoc txt) │    DECOUPLED    │ - tools/misc/   (Build helpers) │
  │ - *.sample.toml    (Samples)    │ ─────────────── │ - docker/       (Runner image)  │
  │ - Upstream CI/CD   (4 workflows)│                 │ - build.yml     (Active CI)     │
  │ - BackersArchive   (Sponsors)   │                 │ - private-build-plans.toml      │
  │ - PACKAGE-LIST     (Upstream pk)│                 │ - build-plans.toml              │
  └─────────────────────────────────┘                 └─────────────────────────────────┘
                   │                                                   │
                   ▼                                                   ▼
            [ Action: Purge ]                                 [ Action: Preserve ]
```

> [!NOTE]
> **Architectural Pragmatism Scope:** This initiative constitutes **Repository Maintenance & Monorepo Optimization**. While no new application layers are created, the filesystem boundaries are strictly partitioned between the *Expendable Upstream Seam* and the *Protected Core Seam*.

---

## 6. Acceptance Criteria (Given-When-Then)

- **AC-001 (Purge Execution Completeness - REQ-001 to REQ-006):**  
  *Given* the current repository state with 11 top-level directories and 14 root files,  
  *When* the deletion manifest is executed,  
  *Then* `images/`, `changes/`, `sample-text/`, `private-build-plans.sample.toml`, `doc/BackersArchive.md`, `doc/PACKAGE-LIST.md`, and the 4 upstream workflows must no longer exist in the filesystem.

- **AC-002 (NPM Workspace Integrity Verification - CON-002):**  
  *Given* the cleanup execution has been performed,  
  *When* `npm run lint` or `npm install --dry-run` is executed,  
  *Then* the command completes with exit code 0 and reports no missing workspace packages or broken symlinks.

- **AC-003 (Font Compilation Invariant Verification - CON-001):**  
  *Given* the cleanup execution has been performed,  
  *When* the font plan loader evaluates `RawPlans` and `BuildPlanOf("SawalaMono")`,  
  *Then* `build-plans.toml` and `private-build-plans.toml` parse successfully, and font build targets resolve without error.

- **AC-004 (Documentation Seam Integrity - CON-004):**  
  *Given* the cleanup execution has been performed,  
  *When* inspecting the `doc/` directory,  
  *Then* exactly 5 design reference files remain: `character-variants.md`, `custom-build.md`, `cv-influences.md`, `language-specific-ligation-sets.md`, and `stylistic-sets.md`.

- **AC-005 (CI Workflow Integrity - CON-003):**  
  *Given* the cleanup execution has been performed,  
  *When* inspecting `.github/workflows/`,  
  *Then* `.github/workflows/build.yml` is present, valid YAML, and retains its full execution steps.

### 6.1 Value Sourcing & Positive Input Coverage Table

| Required State / Validated Element | AC Ref | Named Source (`File Path [file:line]` / `Manifest`) | Boundary / Invariant Variation |
| :--- | :---: | :--- | :--- |
| `images/` deleted | `AC-001` | Manifest `REQ-001` | Directory must be absent (`Test-Path images == False`) |
| `changes/` deleted | `AC-001` | Manifest `REQ-002` | Directory must be absent (`Test-Path changes == False`) |
| `sample-text/` deleted | `AC-001` | Manifest `REQ-003` | Directory must be absent (`Test-Path sample-text == False`) |
| Workflows deleted | `AC-001` | Manifest `REQ-005` | Exactly 4 upstream files deleted; `build.yml` preserved |
| `packages/` intact | `AC-002` | Protected Seam `CON-002` | All 9 `@iosevka/*` packages present and readable |
| `tools/` intact | `AC-002` | Protected Seam `CON-002` | All 4 tools packages present and readable |
| `build-plans.toml` present | `AC-003` | `verdafile.mjs:157,159` | File exists and parses valid TOML |
| `private-build-plans.toml` | `AC-003` | `private-build-plans.toml:4` | Contains `[buildPlans.SawalaMono]` |
| `doc/` retained count | `AC-004` | Protected Seam `CON-004` | Exactly 5 `.md` reference files in `doc/` |

---

## 7. Testing & Verification Strategy

### 7.1 Pre-Deletion Baseline Verification
1. Record git status and commit baseline: `git status --short`.
2. Verify font build target resolution dry-run.

### 7.2 Post-Deletion Verification Pipeline
Execute the following verification sequence immediately after deletion:

```bash
# 1. Verify Manifest Absences (All must return False)
Test-Path images, changes, sample-text, private-build-plans.sample.toml, doc/BackersArchive.md, doc/PACKAGE-LIST.md

# 2. Verify Protected Seams (All must return True)
Test-Path packages, params, tools, docker, build-plans.toml, private-build-plans.toml, verdafile.mjs, .github/workflows/build.yml

# 3. Verify NPM Workspaces & Linter
npm run lint

# 4. Verify Git Working Tree Cleanliness
git status
```

---

## 8. Architectural Decision Records (ADRs)

- [ADR-0001: Retention of `build-plans.toml` and `tools/` Workspaces](docs/adr/0001-retain-build-plans-and-tools.md) — Documenting why `build-plans.toml` and `tools/` are retained despite containing upstream defaults, preventing unhandled `verdafile.mjs` dependency crashes and npm workspace degradation.
