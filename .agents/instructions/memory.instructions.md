# Project Memory Log

> Active Location: `.agents/instructions/memory.instructions.md`
> This file is managed by the `/to-memory` skill.
> It persists context across AI chat sessions to prevent knowledge loss.
> Do NOT manually edit this file unless necessary.

---

## 🧠 Knowledge Base

> This section accumulates cross-session knowledge that must survive compaction.
> Updated during Compaction Mode (Workflow 4). Do NOT delete entries here.

### Architecture & Patterns

- **Clean Architecture Seams:** Decoupled boundaries enforced (Entities ➔ Use Cases ➔ Adapters ➔ Frameworks).
- **Pólya Heuristic Pipeline:** Spec ➔ Clarify ➔ Plan ➔ Pause Rule ➔ Implement ➔ Review / Bug Fix.
- **Vertical Slicing Mandate:** All tasks organized into DB-to-UI tracer bullets; horizontal slicing prohibited.
- **Surgical Seam Partitioning for Monorepo Forks:** When maintaining downstream forks of complex monolithic engines (e.g., Iosevka), decouple auxiliary assets (specimens, historical changelogs) while preserving strict parser entry dependencies (`build-plans.toml`, `packages/*`, `tools/misc`) to yield maximum bloat reduction (~91%) with zero engine breakage (ADR-0001).

### Dead-Ends (Do NOT Repeat)

| # | Attempted | Why It Failed | Correct Solution |
|---|-----------|---------------|------------------|
| 1 | Premature Coding | Bypassing Spec/Plan leads to 90% rework | Enforce Polya Phase 1 & The Pause Rule |
| 2 | Horizontal Slicing | Slicing by technical layer breaks incremental demoability | Formulate end-to-end vertical tracer bullets |
| 3 | Blind Shotgun Patching | Patching without First Principles & reproduction test leads to infinite error loops | Apply Bisection search & Incubation Circuit-Breaker (Hard-Stop after 2-3 fails) |
| 4 | Dogmatic Over-engineering | Forcing 4-layer directories onto single-file scripts / CLI tools creates useless overhead | Apply Scope Proportionality & Clean Code micro-principles (SRP, pure functions) |
| 5 | Deleting upstream `build-plans.toml` or `tools/` | `verdafile.mjs:157,159` hard-requires `build-plans.toml` via `sfu(BUILD_PLANS)`, and `package.json:6` declares `tools/*` as workspace | Retain `build-plans.toml` and `tools/` intact, purging only purely decoupled asset directories (ADR-0001) |

### Key Metrics & Baselines

- **Target Test Coverage:** 100% test pass with zero linter suppressions (Floor-Guard).
- **Readiness Score Gate:** Minimum 80/100 to proceed between SDLC phases.
- **Repository Working Tree Footprint:** Reduced from ~53.2 MB (4,700+ files) to ~4.8 MB (~460 files) post-slimming (2026-11-09).

---

## 📝 Session Checkpoint: 2026-11-09

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 6: Documentation Complete (`/to-docs`)
- **Active Artifacts:**
  - `README.md` — Status: ✅ Finalized (Tailored project README with accurate build instructions and editor configurations)
  - `docs/discovery/repo-cleanup-discovery.md` — Status: ✅ Finalized (Option A approved)
  - `docs/spec/repo-cleanup-spec.md` — Status: ✅ Finalized
  - `docs/adr/0001-retain-build-plans-and-tools.md` — Status: ✅ Accepted
  - `docs/plan/repo-cleanup-plan.md` — Status: ✅ Completed (All 12 tickets passed)
  - `docs/reviews/repo-cleanup-review.md` — Status: ✅ Finalized (Verdict: GO)
- **Achieved Milestones:**
  - Explored and mapped full repository topography of the Iosevka v34.9.1 upstream fork (`/to-explore`).
  - Drafted comprehensive technical specification and deletion manifest (`/to-spec`).
  - Generated tactical 4-phase implementation plan with strict task sizing (`/to-plan`).
  - Executed autonomous staged removal of 4,246 unused upstream files via `/to-code auto` (`images/`, `changes/`, `sample-text/`, `private-build-plans.sample.toml`, 4 upstream CI workflows, and sponsor archives).
  - Reduced repository working tree from ~53.2 MB to ~4.8 MB (~91% physical size reduction).
  - Verified 100% integrity of protected seams: `packages/*`, `params/*`, `tools/*`, `build-plans.toml`, `private-build-plans.toml`, `docker/*`, `.github/workflows/build.yml`, and 5 glyph reference guides in `doc/`.
  - Conducted Phase 4 Quality & Architecture review with `Verdict: GO` (`/to-review`).
  - Authored and polished canonical [README.md](README.md) with verified Docker & Verda build instructions, multi-platform installation guides, and editor/terminal configurations (`/to-docs`).
- **Dead-Ends (Do NOT Repeat):**
  - **Attempted:** Deleting `build-plans.toml` or `tools/` to maximize space savings.
  - **Reason:** `verdafile.mjs:157,159` hard-requires `build-plans.toml` via `sfu(BUILD_PLANS)`, and `package.json:6` declares `tools/*` as npm workspace. Deleting them crashes verda and npm.
  - **Note:** See KB Dead-End #5 and ADR-0001.
- **Updated Files:**
  - `README.md` — Overhauled upstream generic README into polished Sawala Mono documentation
  - `docs/discovery/repo-cleanup-discovery.md` — Created discovery draft
  - `docs/spec/repo-cleanup-spec.md` — Created technical specification
  - `docs/adr/0001-retain-build-plans-and-tools.md` — Created ADR-0001
  - `docs/plan/repo-cleanup-plan.md` — Created implementation plan (Completed)
  - `docs/reviews/repo-cleanup-review.md` — Created review report (Verdict: GO)
- **Decisions Made:**
  - Approved Option A (Pragmatic Slimming): Purge auxiliary web/specimen assets and upstream CI, but retain build engine parser dependencies and glyph design guides.
  - Retain manual `workflow_dispatch` trigger for CI builds and GitHub Releases in `.github/workflows/build.yml` to prevent accidental resource consumption or unexpected release publishing on tag push.
- **Next Action / Pending:**
  - Ready for git commit and staging verification (`git add . && git commit`).

<!-- checkpoint-tail: Successfully completed repository slimming of 4,246 upstream files (~48.4 MB) while preserving all font engine build invariants and protected seams; ready for commit and /to-docs. -->

---

## 📝 Session Checkpoint: 2026-11-09 (Session 2: Architecture Topography Mapping)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Cross-Cutting Utility: Architecture Topography Mapping (`/to-map`)
- **Active Artifacts:**
  - `docs/ARCHITECTURE.md` — Status: ✅ Created & Finalized
  - `AGENTS.md` — Status: ✅ Updated with reference link
  - `README.md` — Status: ✅ Updated with reference link
  - `docs/adr/0001-retain-build-plans-and-tools.md` — Status: ✅ Referenced
- **Achieved Milestones:**
  - Executed comprehensive reality scan of the font compiler engine and mapped entire repository directory hierarchy.
  - Classified modules into 4 Clean Architecture layers (Entities, Use Cases, Interface Adapters, Frameworks & Drivers).
  - Drafted Pólya topological C4 container diagram for 30-second at-a-glance comprehension.
  - Formulated the 3-tiered speed verification commands (`check:fast`, `check:task`, `check:full`) and non-regressing quality ratchets.
  - Formally generated canonical repository architecture documentation in `docs/ARCHITECTURE.md`.
  - Surgically updated `AGENTS.md` and `README.md` to link directly to `docs/ARCHITECTURE.md`.
- **Dead-Ends (Do NOT Repeat):**
  - See KB Dead-End #5: Never purge `build-plans.toml` or `tools/` workspace due to strict coupling with `verdafile.mjs:157,159`.
- **Updated Files:**
  - `docs/ARCHITECTURE.md` — Created canonical living architecture map
  - `AGENTS.md` — Surgically added architecture documentation link
  - `README.md` — Added architecture documentation link under Building from Source
  - `.agents/instructions/memory.instructions.md` — Recorded architecture mapping checkpoint
- **Decisions Made:**
  - Established `docs/ARCHITECTURE.md` as the living canonical single source of truth for repository structure and Clean Architecture seams.
- **Next Action / Pending:**
  - Ready for git commit of staged deletions and architecture documentation.
  - Proceed to Phase 6 (`/to-docs`) or next scheduled engineering phase.

<!-- checkpoint-tail: Successfully mapped repository architecture and Clean Architecture seams into docs/ARCHITECTURE.md and linked references in AGENTS.md and README.md; ready for commit and /to-docs. -->

---
