---
goal: "Implementation Plan: Upstream Iosevka Repository Slimming & Deletion Execution"
version: "1.0.0"
date_created: "2026-11-09"
last_updated: "2026-11-09"
status: "Completed" # Planned | In Progress | Completed | Paused
spec_ref: "docs/spec/repo-cleanup-spec.md"
tags: ["polya", "plan", "tracer-bullets", "repo-cleanup", "clean-architecture", "iosevka-sawalamono"]
---
<!-- markdownlint-disable -->

# Implementation Plan: Upstream Iosevka Repository Slimming & Deletion Execution

> [!IMPORTANT]
> **THE PAUSE RULE & TRACER BULLET MANDATE:**  
> All tasks in this plan are organized into sequential, risk-tiered phases. No production application files will be altered until this plan is formally approved.  
> After each deletion phase, execution halts to verify workspace integrity, linting, and build invariant compliance before proceeding to the next phase.

---

## 1. Overview & High-Level Mental Model

This plan defines the step-by-step tactical execution for removing ~48.4 MB of upstream auxiliary assets (~4,240 files) from the repository while preserving 100% build validity for **Iosevka Sawala Mono**.

The execution is partitioned into 4 phased checkpoints:
1. **Phase 1: Baseline & Safe Auxiliaries Purge** (`sample-text/`, `private-build-plans.sample.toml`, `doc/` backer files).
2. **Phase 2: Upstream CI/CD Workflows Cleanup** (Purge 4 hardcoded `be5invis/Iosevka` workflows in `.github/workflows/`).
3. **Phase 3: Heavyweight Asset Purge** (`changes/` and `images/` directories totaling ~48.4 MB).
4. **Phase 4: Full System & Workspace Verification** (Run linter, verify protected seams, check git working tree).

### Topological Data Flow & Verification Diagram
```text
[Baseline State] ──▶ [Phase 1: Auxiliaries Purge] ──▶ [Verify: doc/ & sample-text]
                                │
                                ▼
                     [Phase 2: CI Workflows Purge] ──▶ [Verify: build.yml intact]
                                │
                                ▼
                     [Phase 3: Heavy Assets Purge] ──▶ [Verify: images/ & changes/ absent]
                                │
                                ▼
                     [Phase 4: Full Verification]  ──▶ [Lint + Workspace Check + Git Status]
```

---

## 2. 📏 Task Sizing Matrix

Every task adheres to strict size limits (XS to M) to prevent context fragmentation and ensure immediate reversibility.

| Size   | Files Impacted | Scope                                           | Example                                                 |
| :----- | :------------: | :---------------------------------------------- | :------------------------------------------------------ |
| **XS** |       1        | Single file removal or config check             | Delete `private-build-plans.sample.toml`                |
| **S**  |      1-2       | Small focused cleanup slice                     | Remove `doc/BackersArchive.md` & `doc/PACKAGE-LIST.md`  |
| **M**  |      3-5       | Directory or multi-file purge slice             | Remove upstream workflows / purge `changes/` directory  |
| **L**  |      5-8       | Multi-component vertical flow                   | Full pipeline smoke test                                |
| **XL** |       8+       | **Strictly Prohibited (Decompose)**             | Handled via discrete directory purges                   |

---

## 3. Phased Implementation Sequence (Vertical Slices)

> **EXECUTION DIRECTIVE FOR AI AGENTS (`/to-code` & `/to-code auto`):**  
> - **Interactive Mode (`/to-code`):** Execute ticket by ticket. Run verification after each slice, then pause for user confirmation at each `APPROVAL` gate.  
> - **Autonomous Mode (`/to-code auto`):** Advance automatically through verified green tickets until all phases complete or a circuit breaker triggers.

---

### Implementation Phase 1: Baseline & Safe Auxiliaries Purge
*Goal: Establish baseline working tree cleanliness and purge low-risk auxiliary sample and backer files.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-101** | **Baseline Inspection:** Verify git status and validate TOML parsing of `build-plans.toml` & `private-build-plans.toml`. | `CON-001` | `AC-003` | - | 0 (XS) | [x] | 2026-11-09 |
| **TASK-102** | **Purge Sample Files:** Delete [`sample-text/`](file:///sample-text) (5 files) and [`private-build-plans.sample.toml`](file:///private-build-plans.sample.toml) (1 file). | `REQ-003`, `REQ-004` | `AC-001` | TASK-101 | 6 (S) | [x] | 2026-11-09 |
| **TASK-103** | **Purge Upstream Sponsor/Catalog Docs:** Delete [`doc/BackersArchive.md`](file:///doc/BackersArchive.md) and [`doc/PACKAGE-LIST.md`](file:///doc/PACKAGE-LIST.md). | `REQ-006` | `AC-001`, `AC-004` | TASK-101 | 2 (S) | [x] | 2026-11-09 |
| **TASK-104** | **VERIFY (`check:task`):** Assert that exactly 5 reference files remain in `doc/` (`character-variants.md`, `custom-build.md`, `cv-influences.md`, `language-specific-ligation-sets.md`, `stylistic-sets.md`). | `CON-004` | `AC-004` | TASK-102, TASK-103 | - | [x] | 2026-11-09 |
| **TASK-105** | **APPROVAL:** 🛑 Halt and request user confirmation before proceeding to Phase 2. | - | - | TASK-104 | - | [x] | 2026-11-09 |

---

### Implementation Phase 2: Upstream CI/CD Workflows Cleanup
*Goal: Remove obsolete upstream GitHub Actions workflows that are hardcoded to `be5invis/Iosevka`.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-201** | **Purge Upstream Workflows:** Delete 4 upstream workflows from `.github/workflows/`: `dev-daily-build.yml`, `pr-build-validation.yml`, `stale.yml`, and `pr-target-branch-check.yml`. | `REQ-005` | `AC-001`, `AC-005` | TASK-105 | 4 (S) | [x] | 2026-11-09 |
| **TASK-202** | **VERIFY (`check:task`):** Assert that `.github/workflows/build.yml` remains intact, syntactically valid, and is the sole workflow active. | `CON-003` | `AC-005` | TASK-201 | 1 (XS) | [x] | 2026-11-09 |
| **TASK-203** | **APPROVAL:** 🛑 Halt and request user confirmation before proceeding to Phase 3. | - | - | TASK-202 | - | [x] | 2026-11-09 |

---

### Implementation Phase 3: Heavyweight Asset Purge (Images & Changes)
*Goal: Purge the primary bloat (~48.4 MB across 4,234 files) in `changes/` and `images/`.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-301** | **Purge Historical Changelogs:** Delete the entire [`changes/`](file:///changes) directory (284 files, 0.20 MB). | `REQ-002` | `AC-001` | TASK-203 | 284 (M) | [x] | 2026-11-09 |
| **TASK-302** | **Purge Specimen Images:** Delete the entire [`images/`](file:///images) directory (3,950 SVG files, 48.20 MB). | `REQ-001` | `AC-001` | TASK-203 | 3,950 (M) | [x] | 2026-11-09 |
| **TASK-303** | **VERIFY (`check:task`):** Assert that `Test-Path images` and `Test-Path changes` both return False. | `REQ-001`, `REQ-002` | `AC-001` | TASK-301, TASK-302 | - | [x] | 2026-11-09 |
| **TASK-304** | **APPROVAL:** 🛑 Halt and request user confirmation before proceeding to Phase 4. | - | - | TASK-303 | - | [x] | 2026-11-09 |

---

### Implementation Phase 4: Full System & Workspace Integrity Verification
*Goal: Execute end-to-end regression testing and verify repository cleanliness.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-401** | **Protected Seams Verification:** Assert that all 9 packages in `packages/`, all 6 files in `params/`, all 4 tools in `tools/`, `docker/`, `build-plans.toml`, and `private-build-plans.toml` are present and readable. | `CON-001`, `CON-002` | `AC-002`, `AC-003` | TASK-304 | - | [x] | 2026-11-09 |
| **TASK-402** | **NPM Workspaces & Linter Check:** Execute `npm run lint` and verify clean exit code 0 across all workspaces. | `CON-002` | `AC-002` | TASK-401 | - | [x] | 2026-11-09 |
| **TASK-403** | **Git Working Tree Summary:** Run `git status` and compute total files deleted and space freed. | `CON-001` | `AC-001` | TASK-402 | - | [x] | 2026-11-09 |
| **TASK-404** | **FINAL APPROVAL:** 🛑 Final review of git diff and prompt user to commit changes. | - | - | TASK-403 | - | [x] | 2026-11-09 |

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare for potential failure of the primary strategy.*

- **Risk / Failure Point:** An unexpected script or tool execution fails due to a missing file from `doc/`, `tools/`, or upstream workflows.
- **Primary Strategy (Plan A - Immediate Git Reversion):**
  Since git tracks the original baseline, any deleted path can be restored with zero loss using:
  ```bash
  git restore <deleted-path>
  ```
- **Contingency Strategy (Plan B - Selective Carving):**
  If a specific sub-file within a deleted directory is strictly required, restore only that specific file while keeping the remaining 99% of bloat purged.
- **Trigger Condition:** Any failure during `npm run lint`, `node` execution, or workspace resolution immediately triggers Plan A for that component.

---

## 5. Symmetry, Invariants & Clean Architecture Alignment

- **Symmetric Reversibility ($f^{-1}(f(x)) = x$):**
  - All file purges in working tree are reversible via `git restore`.
  - No irreversible index or commit history rewrites (`git filter-repo`) are executed during this plan.
- **Protected Seams Guard:**
  - The font synthesis core (`packages/*`), variant parameters (`params/*`), builder image (`docker/*`), active build pipeline (`.github/workflows/build.yml`), and configuration plans (`build-plans.toml`, `private-build-plans.toml`) remain 100% decoupled and untouched.

---

## 6. Assumptions & Risk Mitigation Table

| Ref Tag | Description | Mitigation in Plan |
| :--- | :--- | :--- |
| `[ASSUMPTION-001]` | Deletion is scoped to working tree to avoid rewriting `.git/` history. | Scoped to standard `rm` / `git rm` operations; zero risk of corrupting remote branches. |
