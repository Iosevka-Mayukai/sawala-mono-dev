> [!SUCCESS]
> **REMEDIATION STATUS: RESOLVED**
> This specification has been remediated by Pólya Specification Architect.
> - **Projected Readiness Score:** 100/100

# 🔍 Clarification Report [Review Iteration 2]

**Target Document:** `docs/spec/sawala-ligar-mono-spec.md`  
**Canonical Output Path:** `docs/audit/sawala-ligar-mono-spec-clarification.md`  
**Readiness Score:** **100 / 100** *(Upgraded from 95/100 in Iteration 1 after resolving all 3 REFINE items)*  
**Status:** **Ready to Proceed (Score >= 80)**  

---
<!-- markdownlint-disable-->

## 📊 Score Breakdown (Quality Gate Rubric — Iteration 2)

- **Completeness (40%):** `40` / 40  
  *Rationale:* All requirements (`REQ-001`–`REQ-005`), constraints (`CON-001`–`CON-004`), acceptance criteria (`AC-001`–`AC-006`), Value Sourcing Table, CI timeout capacity (`timeout-minutes: 150` in `build.yml` and `patch-nerd-font.yml`), and mandatory Wave 1 `docs/ARCHITECTURE.md` synchronization are 100% resolved.
- **Clarity (30%):** `30` / 30  
  *Rationale:* Zero remaining `[ASSUMPTION]` ambiguity: `italic.k` in `[buildPlans.SawalaLigarMono.variants.italic]` is explicitly locked to `k = "cursive-serifless"` per user decision in Iteration 2.
- **Alignment (30%):** `30` / 30  
  *Rationale:* Root `CONTEXT.md` is now instantiated with strict `_Avoid_:` syntax per `.agents/standards/CONTEXT-FORMAT.md`, and `docs/ARCHITECTURE.md` updates are locked into Wave 1 scope.
- **Critical Flaw Veto:** `None`  
  *(Zero contradictions, security vulnerabilities, or broken architectural seams identified).*

---

## 🧩 Iteration 2 Resolved Items (REFINE Session Log)

- **Item 4 (`[ASSUMPTION-001]` Resolution — `italic.k` Variant Choice):**
  - **Proposed Options:**
    - Option A: Keep `k = "straight-serifless"` in `[buildPlans.SawalaLigarMono.variants.italic]`.
    - Option B: Change `k` in `[buildPlans.SawalaLigarMono.variants.italic]` to `k = "cursive-serifless"` (matching `y = "cursive-serifless"`, `ss20`, and `SawalaMono`).
  - **Engineering Recommendation:** Option A (if upright consistency is preferred) or Option B (for cursive italic harmony).
  - **Agreed Decision:** **Option B (`k = "cursive-serifless"` in `variants.italic`; `k = "straight-serifless"` remains in `variants.design`)**.

- **Item 5 (`[ASSUMPTION-002]` Resolution — CI Timeout & Execution Strategy for 3 Build Plans):**
  - **Proposed Options:**
    - Option A: Increase `timeout-minutes` from `90` to `150` in both `.github/workflows/build.yml` and `.github/workflows/patch-nerd-font.yml` while keeping the single-job architecture.
    - Option B: Keep `timeout-minutes: 90` unchanged.
    - Option C: Refactor `build.yml` into a parallel matrix job across variants.
  - **Engineering Recommendation:** Option A to provide safe headroom for 3 build plans (`variant: all`) without introducing multi-job release race conditions.
  - **Agreed Decision:** **Option A (`timeout-minutes: 150` in `build.yml` and `patch-nerd-font.yml`)**.

- **Item 6 (Wave 1 `docs/ARCHITECTURE.md` Synchronization & `CONTEXT.md` Instantiation):**
  - **Proposed Options:**
    - Option A: Include `docs/ARCHITECTURE.md` synchronization (updating 2 build plans / 4 distributions to 3 build plans / 6 distributions) in Wave 1 scope (`REQ-005` / `AC-006`) and instantiate root `CONTEXT.md`.
    - Option B: Defer `docs/ARCHITECTURE.md` updates to a separate `/to-map` session and skip `CONTEXT.md`.
  - **Engineering Recommendation:** Option A to prevent documentation drift and satisfy the Living Architecture Map & Domain Glossary mandates immediately.
  - **Agreed Decision:** **Option A (`CONTEXT.md` created at repository root; `docs/ARCHITECTURE.md` locked into Wave 1 scope)**.

### Required Surgical Updates to `docs/spec/sawala-ligar-mono-spec.md` (via `/to-spec` or ingested directly by `/to-plan`)
1. In `Section 4.1` (`[buildPlans.SawalaLigarMono.variants.italic]`): Set `k = "cursive-serifless"` (replacing `k = "straight-serifless"` in the italic block only) and mark `[ASSUMPTION-001]` resolved.
2. In `REQ-003`, `REQ-004`, `Section 4.2`, and `AC-003`/`AC-004`: Specify `timeout-minutes: 150` in `.github/workflows/build.yml:42` and `.github/workflows/patch-nerd-font.yml:50`, marking `[ASSUMPTION-002]` resolved.
3. In `REQ-005`, `Section 4.3`, `Section 5`, and `AC-006`: Require updating `docs/ARCHITECTURE.md` (`lines 20-29, 69-90, 116, 274, 295, 329, 341`) as part of Wave 1 and reference the newly created root `CONTEXT.md`.

---

## 📜 Iteration 1 Archive [Review Iteration 1 — Score: 95 / 100]

**Target Document:** `docs/spec/sawala-ligar-mono-spec.md`  
**Canonical Output Path:** `docs/audit/sawala-ligar-mono-spec-clarification.md`  
**Readiness Score (Iteration 1):** **95 / 100**  
**Status:** **Ready to Proceed (Score >= 80)**  

---

## 📊 Score Breakdown (Quality Gate Rubric)

- **Completeness (40%):** `38` / 40  
  *Rationale:* The Unknown, Known Data (`[VERIFIED]` file and line citations), Conditions (`REQ-001`–`REQ-005`, `CON-001`–`CON-004`), Negative Invariants, Value Sourcing Table, and the complete `[buildPlans.SawalaLigarMono]` TOML contract (including `ligations.inherits = "default-calt"`, 29 `design` keys, 27 `italic` keys, 2 `widths`, and 2 `slopes`) are exhaustively documented. Minor 2-point deduction for unmeasured 3-plan CI wall-clock duration (`[ASSUMPTION-002]`) and optional timing of `docs/ARCHITECTURE.md` synchronization.
- **Clarity (30%):** `28` / 30  
  *Rationale:* All TOML keys/values, CI workflow options, shell filter expressions (`! -name "${VARIANT}-*.zip" -delete`), and `README.md` line ranges (`43-52`, `55-63`, `70-85`, `185-186`, `221-294`) are deterministic and free of ambiguous adjectives. Minor 2-point deduction for `[ASSUMPTION-001]` (`italic.k = "straight-serifless"` vs `y = "cursive-serifless"`), which is preserved verbatim from user input.
- **Alignment (30%):** `29` / 30  
  *Rationale:* Strictly aligned with `docs/ARCHITECTURE.md` Clean Architecture boundaries, Section 8 quality ratchets (`check:fast`, `check:task`, `check:full`), `ADR-0001`, and `ADR-0002`. Minor 1-point deduction as root `CONTEXT.md` is not yet instantiated in the repository.
- **Critical Flaw Veto:** `None`  
  *(Zero contradictions, security vulnerabilities, or broken architectural seams identified).*

---

## 🧭 5-Axis Structured Interrogation & Epistemic Doubt Matrix

| Interrogation Axis | Coverage & Epistemic Verification | Status |
| :--- | :--- | :---: |
| **1. Goal & Premise Doubt (*Examine Your Guess*)** | Root premise is sound: `Sawala Ligar Mono` (`ss20` selective-curly + `default-calt`) requires a dedicated build plan entry in `private-build-plans.toml` and cannot be achieved via a single CV/SS toggle because `noCvSs = true` is enforced across the family (`[VERIFIED: private-build-plans.toml:10,84]`). | `[VERIFIED]` |
| **2. User Flows & 5 UI States** | Static web UI (`index.html`, `web-docs/`) is explicitly out of scope for Wave 1 (`CON-003`). CI `workflow_dispatch` input states (`all`, `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) are deterministically specified. | `[N/A (UI Deferred) / VERIFIED (CI)]` |
| **3. Edge Cases & Failure Modes (*Sad Paths*)** | Silent no-ligation omission (`REQ-002`), cross-variant zip leakage in `patch-nerd-font.yml` (`REQ-004.3`), missing release zip fail-fast (`AC-005`), and `custom_name` collision under `VARIANT=all` (`REQ-004.5`) are all explicitly guarded. | `[VERIFIED]` |
| **4. Technical Seams & Quality Ratchets** | Changes are strictly confined to Domain config (`private-build-plans.toml`), CI workflows (`.github/workflows/build.yml`, `patch-nerd-font.yml`), and Docs (`README.md`). Zero modifications to `packages/*` or `verdafile.mjs`; Section 8 ratchets enforced (`CON-001`). | `[VERIFIED]` |
| **5. Scope Boundaries & Non-Goals** | Explicit Non-Goals lock out `Sawala Ligar Mono NL`, `index.html` / `web-docs/` updates, and Patel/JS engine edits in Wave 1. | `[VERIFIED]` |

---

## 1. 🚨 Critical Findings & Blocking Gaps

*None. All load-bearing architectural requirements, TOML variant selectors (`[VERIFIED: params/variants.toml]`), ligation inheritance (`default-calt`), and CI archive filtering rules are sufficient, non-contradictory, and deterministic.*

---

## 2. 🧩 Resolved Items & Agreements (The "Grill Me" Log)

*Decisions resolved across Phase 0 / Phase 1 alignment and verified against `docs/spec/sawala-ligar-mono-spec.md`:*

- **Item 1:** Family Naming & Build Plan Identifier
  - **Proposed Options:**
    - Option A: `Sawala Ligar Mono` (`[buildPlans.SawalaLigarMono]`)
    - Option B: `Sawala Ligar` (`[buildPlans.SawalaLigar]`)
  - **Engineering Recommendation:** Option A for consistency with `Sawala Mono` and `Sawala Mono NL` in IDE font pickers.
  - **Agreed Decision:** Option A (`Sawala Ligar Mono` / `SawalaLigarMono`).

- **Item 2:** Ligation Strategy & Derivative Distributions
  - **Proposed Options:**
    - Option A: Enable `[buildPlans.SawalaLigarMono.ligations]` (`inherits = "default-calt"`) + Nerd Font patching (`Sawala Ligar Mono NF`), omitting `NL` in Wave 1.
    - Option B: Include `Sawala Ligar Mono NL` or build without ligatures.
  - **Engineering Recommendation:** Option A to prevent the silent no-ligation fallback (`verdafile.mjs:347`) while avoiding unnecessary CI build time multiplication.
  - **Agreed Decision:** Option A (`REQ-002`, `REQ-004`).

- **Item 3:** Wave 1 Integration Scope Boundary
  - **Proposed Options:**
    - Option A: Core font build plan (`private-build-plans.toml`) + CI workflows (`build.yml`, `patch-nerd-font.yml`) + `README.md`, deferring `web-docs/` showcase to Wave 2.
    - Option B: Full integration including `index.html` and `web-docs/` WOFF2 assets in Wave 1.
  - **Engineering Recommendation:** Option A so compiled binaries can be visually inspected before updating static web showcase assets.
  - **Agreed Decision:** Option A (`CON-003`).

---

## 3. ⚠️ Assumed / Auto-Resolved / Out of Scope (The 20% We Skip)

*Secondary details and non-blocking assumptions tracked for implementation:*

- **Scenario 1 (`[ASSUMPTION-001]` — `italic.k = "straight-serifless"`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Preserved verbatim as `"straight-serifless"` per the user's explicit TOML configuration (twice confirmed). Can be switched to `"cursive-serifless"` in a 1-line edit if desired after visual specimen inspection.
- **Scenario 2 (`[ASSUMPTION-002]` — CI 90-Minute Timeout Budget for `variant: all`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Retain `timeout-minutes: 90` in `build.yml:42` and rely on per-variant dispatch (`variant: SawalaLigarMono`, `REQ-003`) if 3-plan `all` runs approach runner limits.
- **Scenario 3 (`[ASSUMPTION-003]` — `custom_name` Override Guard in `patch-nerd-font.yml`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Resolved deterministically via `REQ-004` item 5 (`Section 4.2`): when `VARIANT="all"` and `v="SawalaLigarMono"`, automatically map a generic `CUSTOM_NAME` to `"Sawala Ligar Mono NF"` / `"Sawala Ligar Mono"`.
- **Scenario 4 (`docs/ARCHITECTURE.md` Synchronization Timing):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Update `docs/ARCHITECTURE.md` references (or run `/to-map`) after `private-build-plans.toml` and CI changes are verified, keeping the task plan focused on the 4 core files (`private-build-plans.toml`, `build.yml`, `patch-nerd-font.yml`, `README.md`).

---

## 4. 📚 Domain Glossary (`CONTEXT.md`) & ADR Alignment

- **Domain Glossary Updates:** Root `CONTEXT.md` created following `.agents/standards/CONTEXT-FORMAT.md` with canonical definitions and strict `_Avoid_:` entries for `Sawala Mono`, `Sawala Mono NL`, `Sawala Ligar Mono`, `Sawala Mono NF`, `Sawala Mono NL NF`, `Sawala Ligar Mono NF`, and `Build Plan ID`.
- **ADRs Required:** None (Wave 1 changes are additive and reversible, conforming to `ADR-0001` and `ADR-0002`).

---

## 5. 📝 Next Actions

- **Score $\ge 80$ Achieved (`100/100` in Review Iteration 2):** Sync the 3 resolved REFINE items into `docs/spec/sawala-ligar-mono-spec.md` via `/to-spec` or proceed directly to `/to-plan @docs/spec/sawala-ligar-mono-spec.md @docs/audit/sawala-ligar-mono-spec-clarification.md`.

---

> **User Decision Prompt:**  
> *The document has achieved a Readiness Score of **100/100** after Iteration 2 refinement. It is ready for the next phase. Do you want to **PROCEED** to the next phase (`/to-spec` remediation or `/to-plan`), or do you want to **REFINE** further?*
