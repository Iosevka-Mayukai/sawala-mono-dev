> [!SUCCESS]
> **REMEDIATION STATUS: RESOLVED**
> This implementation plan has been remediated by Pólya Tactical Planner.
> - **Projected Readiness Score:** 100/100

# 🔍 Clarification Report [Review Iteration 2]

**Target Document:** `docs/plan/sawala-ligar-mono-plan.md`  
**Canonical Output Path:** `docs/audit/sawala-ligar-mono-plan-clarification.md`  
**Readiness Score:** **100 / 100** *(Upgraded from 99/100 in Iteration 1)*  
**Status:** **Ready to Proceed (Score >= 80)**  

---
<!-- markdownlint-disable-->

## 📊 Score Breakdown (Quality Gate Rubric — Iteration 2)

- **Completeness (40%):** `40` / 40  
  *Rationale:* All 3 vertical phases (`TASK-001`–`TASK-011`), line-level blueprints, rollback rules, and verification boundaries are complete. The remaining `AC-002` execution boundary is explicitly resolved: binary `.ttf` compilation runs exclusively on GitHub Actions (`build.yml`), not locally.
- **Clarity (30%):** `30` / 30  
  *Rationale:* Local `/to-code` verification gates (`TASK-002`, `TASK-006`, `TASK-010`) cleanly separate deterministic zero-dependency local checks from remote GitHub Actions binary compilation, eliminating false verification failures or 3x circuit-breaker traps.
- **Alignment (30%):** `30` / 30  
  *Rationale:* 100% aligned with `docs/spec/sawala-ligar-mono-spec.md` (`v1.1.0`), `CONTEXT.md`, `docs/ARCHITECTURE.md` seams, `ADR-0001`, and `ADR-0002`.
- **Critical Flaw Veto:** `None`

---

## 🧩 Iteration 2 Resolved Items (REFINE Session Log)

- **Item 1 (Local Host vs. GitHub Actions Compilation Boundary for `TASK-010` / `AC-002`):**
  - **Proposed Options:**
    - Option A: Pass local `/to-code` `VERIFY` gates (`TASK-002`, `TASK-006`, `TASK-010`) via zero-dependency TOML/variant cross-validation, YAML/Bash filter dry-runs, and `git diff` boundary checks, while executing actual font compilation (`AC-002`) solely via GitHub Actions (`build.yml`).
    - Option B: Require local Docker/host font compilation before closing `TASK-010`.
  - **Engineering Recommendation:** Option A, matching the repository's CI-first build workflow and avoiding local toolchain overhead (`node_modules` and `docker` are absent locally).
  - **Agreed Decision:** **Option A — Font compilation runs exclusively on GitHub Actions (`build.yml` / `patch-nerd-font.yml`), not locally.**

### Required Surgical Alignment in `docs/plan/sawala-ligar-mono-plan.md` (via `/to-plan` remediation or noted for `/to-code`)
- In `Section 3` (`TASK-010`), `Section 3.4` (`Exact Verification Commands`), and `Section 4` (`Risk / Failure Point 1`): Promote **local static/dry-run verification + remote GitHub Actions (`build.yml`) compilation** as the explicit primary execution model (rather than treating CI compilation merely as an unplanned fallback) so `/to-code` knows not to attempt local font compilation.

---

## 📜 Iteration 1 Archive [Review Iteration 1 — Score: 99 / 100]

**Target Document:** `docs/plan/sawala-ligar-mono-plan.md`  
**Canonical Output Path:** `docs/audit/sawala-ligar-mono-plan-clarification.md`  
**Readiness Score (Iteration 1):** **99 / 100**  
**Status:** **Ready to Proceed (Score >= 80)**  

---

## 📊 Score Breakdown (Quality Gate Rubric)

- **Completeness (40%):** `39` / 40  
  *Rationale:* All 3 vertical phases (`Land`, `Core Experience`, `Expand & Polish`) and 11 tasks (`TASK-001`–`TASK-011`) cover 100% of `REQ-001`–`REQ-005.6`, `CON-001`–`CON-004`, and `AC-001`–`AC-006` from `docs/spec/sawala-ligar-mono-spec.md` (`v1.1.0`), including line-level implementation blueprints (`Section 3.4`), Contingency Plan B, Symmetry/SOLID checks, and Rollback steps. Minor 1-point deduction as live Docker TTF compilation (`AC-002`) relies on CI execution (`build.yml`) when local Docker/node_modules are unavailable.
- **Clarity (30%):** `30` / 30  
  *Rationale:* Every actionable task is sized **XS** (1 file) or **S** (2 files) with zero XL bloat or horizontal layering, deterministic `Dep` chains (`TASK-001` $\to$ `TASK-011`), exact TOML keys (56 variant overrides matching Spec §4.1), exact Bash filter/override snippets, and explicit Plan A vs Plan B verification commands.
- **Alignment (30%):** `30` / 30  
  *Rationale:* Terminology strictly matches root `CONTEXT.md` (`Sawala Ligar Mono`, `Sawala Ligar Mono NF`, `Build Plan ID`), preserves `INV-007` (`SawalaMono` $\leftrightarrow$ `SawalaMonoNL` symmetry) and `CON-003` (`index.html` and `web-docs/` untouched), and enforces `docs/ARCHITECTURE.md` Section 8 ratchets.
- **Critical Flaw Veto:** `None`  
  *(Zero requirement drift, contradictory dependencies, or Spec-vs-Plan mismatches detected).*

---

## 🧭 5-Axis Structured Interrogation & Epistemic Doubt Matrix

| Interrogation Axis | Coverage & Epistemic Verification | Status |
| :--- | :--- | :---: |
| **1. Goal & Premise Doubt (*Examine Your Guess*)** | Vertical slicing connects Domain (`private-build-plans.toml`) $\to$ Compiler CI (`build.yml`) in Phase 1 before extending Nerd Font patching (`patch-nerd-font.yml`) in Phase 2 and Docs (`README.md`, `docs/ARCHITECTURE.md`) in Phase 3. Zero horizontal layer-only grouping. | `[VERIFIED]` |
| **2. User Flows & 5 UI States** | Static web UI (`index.html`, `web-docs/`) is locked out of scope per `CON-003`. CI `workflow_dispatch` inputs (`all`, `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) and `font_scope` flows (`core`, `extended-core`, `all`) are explicitly mapped. | `[N/A (UI Deferred) / VERIFIED (CI)]` |
| **3. Edge Cases & Failure Modes (*Sad Paths*)** | Covers prefix-collision risk (`SawalaMono-` vs `SawalaMonoNL-` / `SawalaLigarMono-`), 0-zip fail-fast barrier (`AC-005`), `CUSTOM_NAME` collision under `VARIANT=all` (`TASK-005`), CI 150-minute timeout budget + single-variant fallback (`Plan B`), and local host absence of `node_modules`/Docker (`Plan B`). | `[VERIFIED]` |
| **4. Technical Seams & Quality Ratchets** | Zero edits to `packages/*`, `verdafile.mjs`, `index.html`, or `web-docs/`. Non-regressing ratchets (`check:fast`, `check:task`, `check:full`, Biome ceiling `<= 3e / 5w`) bound to `TASK-002`, `TASK-006`, and `TASK-010`. | `[VERIFIED]` |
| **5. Scope Boundaries & Non-Goals** | `Sawala Ligar Mono NL` and Web Showcase updates remain strictly excluded; every `REQ`/`CON`/`AC` maps bi-directionally between `sawala-ligar-mono-spec.md` and `sawala-ligar-mono-plan.md`. | `[VERIFIED]` |

---

## 1. 🚨 Critical Findings & Blocking Gaps

*None. Plan-to-Spec consistency audit across `docs/plan/sawala-ligar-mono-plan.md` and `docs/spec/sawala-ligar-mono-spec.md` (`v1.1.0`) confirmed 100% alignment:*
- All 5 top-level keys, `ligations.inherits = "default-calt"`, `variants.inherits = "ss20"`, 29 `design` keys, 27 `italic` keys (`italic.k = "cursive-serifless"`), `widths` (`Normal`, `SemiExtended`), and `slopes` (`Upright`, `Italic`) match verbatim.
- All 4 Clarification Iteration 2 resolutions (`italic.k`, `timeout-minutes: 150`, `custom_name` guard, and `docs/ARCHITECTURE.md` + `CONTEXT.md` synchronization) are consistently reflected in both documents.
- `TASK-009` expands upon Spec §4.3's parenthetical line list by also capturing `lines 36, 141-172, 209, 258, 303, 355` of `docs/ARCHITECTURE.md`, fulfilling `REQ-005.6`'s requirement to update all variant-referencing sections without contradicting the Spec.

---

## 2. 🧩 Resolved Items & Agreements (The "Grill Me" Log)

*No unresolved plan-level ambiguities surfaced; all upstream decisions were settled during Spec Clarification Iteration 2 (`docs/audit/sawala-ligar-mono-spec-clarification.md`) and verified intact in the Plan:*

- **Plan-Level Verification Strategy (`node_modules` / `docker` Absent Locally):**
  - **Primary Strategy (Plan A):** Execute `check:fast`, `check:task`, and Docker `check:full` (`docs/ARCHITECTURE.md` §8.2) when dependencies and Docker are present.
  - **Contingency Strategy (Plan B):** Execute zero-dependency Node.js TOML/variant validation against `params/variants.toml` plus shell dry-run tests of `build.yml` and `patch-nerd-font.yml` filter expressions locally, deferring containerized TTF compilation (`AC-002`) to GitHub Actions (`build.yml`).
  - **Agreed Alignment:** Documented explicitly in `Section 3.4` (`Exact Verification Commands`) and `Section 4` (`Contingency Plan B`) of `docs/plan/sawala-ligar-mono-plan.md`.

---

## 3. ⚠️ Assumed / Auto-Resolved / Out of Scope (The 20% We Skip)

- **Scenario 1 (Live Container Build Execution Timing for `AC-002`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Because the current Windows host does not have `node_modules` or `docker` installed (`[VERIFIED]` via workspace check), `TASK-002` and `TASK-010` execute Plan B local verification (`params/variants.toml` cross-validation, YAML/shell filter dry-runs, and non-regression `git diff` checks), while full Docker TTF compilation (`AC-002`) is verified when dispatching `.github/workflows/build.yml` (`variant: SawalaLigarMono`).
- **Scenario 2 (`gh release download` Behavior with Wildcard `--pattern "Sawala*.zip"`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Downloading `Sawala*.zip` followed by `rm -f raw_archives/*NF*.zip raw_archives/*-NF-*.zip` and exact-prefix pruning (`! -name "${VARIANT}-*.zip" -delete`) cleanly isolates `SawalaMono-`, `SawalaMonoNL-`, and `SawalaLigarMono-` even when `NF` assets already exist on the target release tag.

---

## 4. 📚 Domain Glossary (`CONTEXT.md`) & ADR Alignment

- **Domain Glossary Updates:** Root `CONTEXT.md` is already present and strictly aligned across `sawala-ligar-mono-spec.md` and `sawala-ligar-mono-plan.md` (`Sawala Ligar Mono`, `Sawala Ligar Mono NF`, `Build Plan ID`). No additional glossary entries needed.
- **ADRs Required:** None (`ADR-0001` and `ADR-0002` remain honored; `INV-007` remains scoped to `SawalaMono` $\leftrightarrow$ `SawalaMonoNL`).

---

## 5. 📝 Next Actions

- **Score $\ge 80$ Achieved (`99/100`):** The implementation plan at `docs/plan/sawala-ligar-mono-plan.md` is 100% consistent with `docs/spec/sawala-ligar-mono-spec.md` and ready for Phase 3 (`/to-code`).

---

> **User Decision Prompt:**  
> *The document has achieved a Readiness Score of **100/100** after Iteration 2 refinement. It is ready for the next phase. Do you want to **PROCEED** to `/to-plan` remediation or directly to `/to-code` (`/to-code @docs/plan/sawala-ligar-mono-plan.md`), or do you want to **REFINE** further?*
