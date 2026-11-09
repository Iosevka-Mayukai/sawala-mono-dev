---
goal: "Implementation Plan: Nerd Font Containerized Patching Pipeline via Docker"
version: "1.0.0"
date_created: "2026-11-09"
last_updated: "2026-11-09"
status: "Completed"
spec_ref: "docs/spec/nerd-font-patcher-docker-spec.md"
tags: ["polya", "plan", "tracer-bullets", "vertical-slicing", "clean-architecture"]
---
<!-- markdownlint-disable -->

# Implementation Plan: Nerd Font Containerized Patching Pipeline via Docker

> [!IMPORTANT]
> **THE PAUSE RULE & VERTICAL SLICING MANDATE:**  
> All tasks in this plan are organized into **Vertical Feature Slices (Tracer Bullets)** spanning from CI Trigger to Container Ingestion and Release Publishing. Horizontal layer-by-layer slicing is strictly prohibited.  
> After each phase is verified, execution MUST halt for explicit user approval before proceeding to the next phase. Functional code MUST NOT be written until this plan is approved.

---

## 1. Overview & High-Level Mental Model

This plan establishes a decoupled, standalone GitHub Actions workflow (`.github/workflows/patch-nerd-font.yml`) to patch pre-compiled TrueType releases of Iosevka Sawala Mono with Nerd Font icons using the official `nerdfonts/patcher:latest` Docker image.

By isolating this capability into a dedicated on-demand workflow, base font builds remain fast (~15 mins) and free from blast-radius risks. The patcher operates concurrently (`PN=2`) and enforces strict monospace metrics (`--mono`).

### Topological Data Flow Diagram

```text
[ Maintainer Trigger: workflow_dispatch ]
  │ Inputs: release_tag, patch_mode, font_scope
  ▼
[ Step 1: Release Fetcher Seam ] ──▶ gh release download <tag> -p "*SawalaMono*.zip"
  │
  ▼
[ Step 2: Scope Filter Seam ]   ──▶ core (8 Normal weights) vs all (36 full weights)
  │
  ▼
[ Step 3: Docker Patcher Engine] ──▶ docker run nerdfonts/patcher:latest (PN=2, --mono)
  │
  ▼
[ Step 4: Release Gateway ]      ──▶ gh release upload <tag> SawalaMono-NF-*.zip --clobber
```

---

## 2. 📏 Task Sizing Matrix

| Size   | Files Impacted | Scope                                           | Example                                                 |
| :----- | :------------: | :---------------------------------------------- | :------------------------------------------------------ |
| **XS** |       1        | Single pure function or config change           | Workflow permissions / parameter schema tuning          |
| **S**  |      1-2       | Small focused vertical interaction              | Scope filter script / asset download validation         |
| **M**  |      3-5       | Standard Vertical Feature Slice (Tracer Bullet) | Full workflow pipeline slice (Trigger -> Docker -> Zip) |
| **L**  |      5-8       | Multi-component vertical flow                   | End-to-end matrix deployment pipeline                   |
| **XL** |       8+       | **Strictly Prohibited (Too Large)**             | Must be decomposed into smaller vertical slices         |

---

## 3. Phased Implementation Sequence (Vertical Tracer Bullets)

> **EXECUTION DIRECTIVE FOR AI AGENTS (`/to-code` & `/to-code auto`):**  
> - **Interactive Mode (`/to-code`):** Execute ticket by ticket. Run `check:task` (from `docs/ARCHITECTURE.md` §8.2) after each slice, then pause for user confirmation at each `APPROVAL` gate.  
> - **Autonomous Mode (`/to-code auto`):** Advance automatically through verified green tickets (`check:task` passing) until all phases complete or one of the **4 Circuit Breakers** triggers (*Ambiguous Spec*, *3x Verification Failure*, *Ratchet Regression*, or *Untracked Dependency/Architecture Change*).

### Implementation Phase 1: Land — Minimal End-to-End Tracer Bullet (`font_scope: core`)
*Goal: Implement the complete vertical pipeline for the core developer coding suite (8 font files) using Docker with complete icon sets and release upload.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-001** | **Workflow Trigger & Ingestion Seam:** Create `.github/workflows/patch-nerd-font.yml` with `workflow_dispatch` inputs (`release_tag`, `patch_mode`, `font_scope`), `contents: write` permissions, and automated tag resolution (`latest` -> semantic tag). Download base archive via `gh release download` and implement fail-fast empty check. | REQ-001, REQ-002, REQ-003 | AC-004, AC-006 | - | 1 (S) | [x] | 2026-11-09 |
| **TASK-002** | **Core Scope Filter & Container Patcher Slice:** Implement staging logic extracting the 8 `Normal` width coding weights (`Regular`, `Italic`, `Medium`, `MediumItalic`, `SemiBold`, `SemiBoldItalic`, `Bold`, `BoldItalic`) into `./in/`. Wire `docker run --rm` with volume mounts, `PN=2` concurrency, `--mono` enforcement, and dynamic `${PATCH_FLAG}` based on `patch_mode`. | REQ-004, REQ-005, REQ-006 | AC-001, AC-003, AC-005 | TASK-001 | 1 (M) | [x] | 2026-11-09 |
| **TASK-003** | **Packaging & Release Gateway Slice:** Package patched fonts from `./out` into `SawalaMono-NF-${TARGET_TAG}.zip`, add `actions/upload-artifact@v4` step for workflow run persistence, and execute `gh release upload --clobber` to attach the archive directly to the release. Include host permission fixup (`sudo chown -R $USER:$USER .`). | REQ-007 | AC-007 | TASK-002 | 1 (S) | [x] | 2026-11-09 |
| **TASK-004** | **VERIFY (`check:task`):** Validate YAML workflow structure, assert schema correctness, and run repository lint checks (`docs/ARCHITECTURE.md` §8.2). | CON-001, CON-002 | AC-001..007 | TASK-003 | - | [x] | 2026-11-09 |
| **TASK-005** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 2 (unless `/to-code auto`). | - | - | TASK-004 | - | [x] | 2026-11-09 |

### Implementation Phase 2: Expand — Full Scope Combinatorial Coverage & Guardrails
*Goal: Expand the pipeline to support `font_scope: all` (36 files), incorporate timeout guards, and verify non-regression.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-006** | **All-Scope Branching & Resilience Guard:** Expand staging script to handle `font_scope: all` (copying all 36 `.ttf` files regardless of width/slope), configure job-level `timeout-minutes: 90`, and add descriptive logging tracking font counts before and after patching. | REQ-004, CON-001 | AC-002 | TASK-005 | 1 (S) | [x] | 2026-11-09 |
| **TASK-007** | **Documentation & Workflow Discovery Integration:** Update repository documentation to reference the new Nerd Font patcher workflow and document dispatch usage instructions. | REQ-001 | AC-001 | TASK-006 | 1-2 (S) | [x] | 2026-11-09 |
| **TASK-008** | **VERIFY (`check:full`):** Run full quality ratchets and verification suite (`docs/ARCHITECTURE.md` §8.2–8.3), verifying 0 Biome diagnostics and clean git status. | CON-001..004 | AC-001..007 | TASK-007 | - | [x] | 2026-11-09 |
| **TASK-009** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to declare implementation plan complete. | - | - | TASK-008 | - | [x] | 2026-11-09 |

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare for potential failure of the primary strategy.*

- **Risk / Failure Point:** Docker container volume file permissions cause `Permission denied` on GitHub Actions host runner when writing output files to `./out/`.
- **Primary Strategy (Plan A):** Run container as current host UID/GID or execute post-run `sudo chown -R $USER:$USER ${{ github.workspace }}` (matching verified pattern in `.github/workflows/build.yml:93`).
- **Contingency Strategy (Plan B):** Run Docker with `--user $(id -u):$(id -g)` explicitly, or extract fonts via `docker cp` from container to runner filesystem.
- **Trigger Condition:** Docker step exits with code 1 due to filesystem write permission error in `./out`.

---

## 5. Symmetry, Invariants & Problem Variation (Pólya, p. 199–214)

- **Symmetric Operations & Round-Trip Invertibility:**
  - Base Release TTF Download $\leftrightarrow$ Patched Release NF TTF Upload
  - `unzip` Base Archive $\leftrightarrow$ `zip` Patched Archive
- **Variation of the Problem:**
  - *Mode Variation:* `complete` (10k+ glyphs) vs `default` (Powerline only).
  - *Scope Variation:* `core` (8 files) vs `all` (36 files).
- **SOLID Checks at Blueprint Stage:**
  - *Single Responsibility (SRP):* `.github/workflows/patch-nerd-font.yml` has exactly one reason to change: modifications to Nerd Font patching or packaging requirements.
  - *Dependency Inversion (DIP):* Relies on stable GitHub CLI contracts and standard container volume mount interfaces rather than host-coupled binaries.

---

## 6. Risks & Extracted Assumptions

- **[ASSUMPTION-001]:** Base release archives match `*SawalaMono*.zip`.  
  *Mitigation:* Task-001 uses wildcard pattern and checks for extracted `.ttf` files recursively.
- **[ASSUMPTION-002]:** `GITHUB_TOKEN` has write permissions.  
  *Mitigation:* Task-001 explicitly sets `permissions: contents: write`.
- **[RISK-001]:** Docker image pull latency on cold runner cache.  
  *Mitigation:* Standard Docker Hub caching on `ubuntu-latest` is typically < 30 seconds for `nerdfonts/patcher:latest`.

---

## 7. Rollback & Recovery Strategy

1. If `.github/workflows/patch-nerd-font.yml` fails or encounters issues, it has **zero blast-radius** on `.github/workflows/build.yml` or base releases.
2. To rollback completely: delete `.github/workflows/patch-nerd-font.yml` via git revert.
3. If an erroneous patched release asset was uploaded, delete it via:
   `gh release delete-asset <tag> SawalaMono-NF-*.zip -y`.

---

## 8. 🚩 Pre-Flight Self-Correction Checklist (Anti-Patterns)

- [x] **No Horizontal Slicing:** Every task is a vertical slice connecting trigger $\to$ download $\to$ patch $\to$ package.
- [x] **No Bloated Tasks (XL):** All tasks are sized S or M.
- [x] **Strict Traceability:** All tasks map directly to `REQ-001..007` and `AC-001..007`.
- [x] **Deterministic Dependencies:** `Dep` column is strictly sequential and bottom-up.
- [x] **Mandatory Verification & Approval:** Both Phase 1 and Phase 2 terminate with `VERIFY` and `APPROVAL` gates.
