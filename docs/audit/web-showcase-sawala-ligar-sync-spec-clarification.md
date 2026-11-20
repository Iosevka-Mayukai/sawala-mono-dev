> [!SUCCESS]
> **REMEDIATION STATUS: RESOLVED**
> This specification has been remediated by Pólya Specification Architect (`v1.3.0`, `Approved`).
> - **Projected Readiness Score:** 100/100

# 🔍 Clarification Report [Review Iteration 4 — Post-Remediation Verification]

**Target Document:** `docs/spec/web-showcase-sawala-ligar-sync-spec.md` (`v1.3.0`, `Approved`)  
**Canonical Output Path:** `docs/audit/web-showcase-sawala-ligar-sync-spec-clarification.md`  
**Readiness Score:** **100 / 100** *(Upgraded from 98/100 in Iteration 3 after `/to-spec` recorded Option B, Option A, and `specimen-tester.js:257` handler parity into `v1.3.0`)*  
**Status:** **Ready to Proceed (Score >= 80 · Fully Clarified)**  

---
<!-- markdownlint-disable-->

## 📊 Score Breakdown (Quality Gate Rubric — Iteration 4)

- **Completeness (40%):** `40` / 40  
  *Rationale:* The Unknown, Data, `REQ-001`–`REQ-007`, `CON-001`–`CON-006`, `AC-001`–`AC-008`, 5 UI States, `DESIGN.md` component bindings, Non-Goals, `[ASSUMPTION-003]` (**Option B**), and `[ASSUMPTION-001]` (**Option A**) are 100% specified and persisted.
- **Clarity (30%):** `30` / 30  
  *Rationale:* All DOM contracts (`data-font-variant` vs `data-ligature-mode`/`data-ligatures`), click-handler parity (`specimen-tester.js:98,257`), segmented pill controls (`REQ-003` Option B), CI WOFF2 first sequencing (`REQ-001` Option A), and byte ceilings (`[ASSUMPTION-004]`) are crisp, quantified, and testable.
- **Alignment (30%):** `30` / 30  
  *Rationale:* 100% consistent with `CONTEXT.md` canonical terminology, `DESIGN.md` Linear dark-canvas tokens & 3-up card hierarchy, `ADR-0001`/`ADR-0002`, and `docs/ARCHITECTURE.md` presentation-vs-engine boundaries.
- **Critical Flaw Veto:** `None`  
  *(Zero contradictory contracts, security holes, CSP regressions, or broken monorepo seams detected).*

---

## 🧭 5-Axis Structured Interrogation & Epistemic Doubt Matrix

| Interrogation Axis | Coverage & Epistemic Verification | Status |
| :--- | :--- | :---: |
| **1. Goal & Premise Doubt (*Examine Your Guess*)** | Syncs static showcase to all 6 `v1.1.0-release19112026` distributions and adds 2 minimal Tier A WOFF2s without repo bloat; solves root evaluation gap cleanly. | `[VERIFIED]` |
| **2. User Flows & 5 UI States** | `Loading` (`font-display: swap`), `Empty` (watermark placeholder), `Error` (fallback font stack & textarea clipboard fallback), `Partial` (Tier A vs Tier B synthesis badge), and `Populated` (3×2 desktop / 2×3 tablet / 1×6 mobile + `7-col` `.doc-table-wrap` scroll) are explicitly specified. | `[VERIFIED]` |
| **3. Edge Cases & Failure Modes (*Sad Paths*)** | Offline/missing WOFF2 fallback, invalid `variant` / `familyVariantKey` guard, decoupling `"ligar"` from `"nl"` ligation suppression, and JetBrains `Enable ligatures = false` string-match bugfix (`config-generator.js:37,158`) are covered. | `[VERIFIED]` |
| **4. Technical Seams & Quality Ratchets** | Zero edits to `packages/*`, `params/*`, `tools/*`, `build-plans.toml`, `verdafile.mjs` (`CON-004`, `ADR-0001`); strict `'self'` CSP on subpages and `0` inline styles (`CON-003`). | `[VERIFIED]` |
| **5. Scope Boundaries & Non-Goals** | Explicitly locks out `Sawala Ligar Mono NL`, Ligature Playground (`ligature-playground.js`), Terminal NF switcher (`terminal-preview.js`), Comparison Slider (`#comparison-stage`), Anatomy (`#anatomy`), and locks `#polyglot-runner` to Option B 3-pill UI. | `[VERIFIED]` |

---

## 1. 🚨 Critical Findings & Blocking Gaps

*None — zero blocking flaws, zero open decisions, and zero pending spec edits remain (`Critical Flaw Veto: None`). All items from Iterations 1–3 have been cleanly remediated into `docs/spec/web-showcase-sawala-ligar-sync-spec.md` (`v1.3.0`, `Approved`).*

---

## 2. 🧩 Resolved Items & Agreements (The "Grill Me" Log)

- **Resolved Item 1 (Iteration 1 — `[ASSUMPTION-003]` Polyglot Runner Control UX):**
  - **Proposed Options:**
    - Option A: Keep `#polyglot-calt-toggle` as a single 3-mode cycle button (`standard` ➔ `ligar` ➔ `nl`).
    - Option B: Replace the binary toggle inside `.polyglot-runner__meta` with 3 compact segmented pills (`Standard` | `Ligar` | `NL`) using `variant-switcher-tab` and per-button `aria-pressed`.
  - **Engineering Recommendation:** **Option B** (1-click direct A/B switching + clean binary WCAG `aria-pressed` semantics).
  - **Agreed Decision:** **Option B Confirmed by User (2026-11-19).** Spec & Plan lock `#polyglot-runner` to 3 compact segmented pill buttons (`Standard`, `Ligar`, `NL`) instead of a cycle button.

- **Resolved Item 2 (Iteration 2/3 — `[ASSUMPTION-001]` CI `WOFF2` Sequencing):**
  - **Proposed Options:**
    - **Option A (CI `WOFF2` First — Recommended for Full Verification):** User runs `.github/workflows/build.yml` (`variant: SawalaLigarMono`, `format: woff2`, `create_release: false`) and drops `SawalaLigarMono-Regular.woff2` + `SawalaLigarMono-Italic.woff2` into `web-docs/fonts/sawala-mono/` prior to `/to-code` / `/to-review` closure, enabling full verification of `AC-001` (`<= 650 KB` / `<= 1.25 MB`) and visual font rendering immediately.
    - **Option B (Code First, `WOFF2` Drop-In Later):** `/to-code` implements all HTML/CSS/JS changes first and drops in `.woff2` binaries later.
  - **Engineering Recommendation:** **Option A** for zero `BLOCKED ⚠️` items during Phase 3/4 verification.
  - **Agreed Decision:** **Option A Confirmed by User (2026-11-19), with Spec refined first via `/to-spec` prior to `/to-plan`.**

---

## 3. ⚠️ Assumed / Auto-Resolved / Out of Scope (The 20% We Skip)

- **Lazy Font Loading (`[ASSUMPTION-002]`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Keep `index.html:29-32` `<link rel="preload">` tags limited to the 4 core `SawalaMono` weights; load `"Sawala Ligar Mono"` via `@font-face` (`font-display: swap`) without extra preload links.
- **WOFF2 Size Budget (`[ASSUMPTION-004]`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Enforce `<= 650 KB` (`665,600` bytes) per `.woff2` file and `<= 1.25 MB` (`1,310,720` bytes) combined upon extraction.
- **Specimen Tester Click Handler Parity (`specimen-tester.js:253-260`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Both `applySpecimenState` (`line 98`) and the click handler (`line 257`, currently hardcoded to `variant === "nl" ? "nl" : "standard"`) will be updated together in Phase 3 to accept `"ligar"`.
- **Visual Drift Outside Wave 2 Scope (`Section 1.1`):**
  - **Resolution:** `[Assumed / Auto-Resolved]` — Ligature Playground (`ligature-playground.js`), Terminal NF toggle (`terminal-preview.js:213-240`), Comparison Slider (`#comparison-stage`), Anatomy (`#anatomy`), and `1200px` vs `DESIGN.md` `1024px` tablet breakpoint remain unchanged.

---

## 4. 📚 Domain Glossary (`CONTEXT.md`) & ADR Alignment

- **Domain Glossary Updates:** None required (`CONTEXT.md` already defines all 6 canonical distributions and `Build Plan ID`, and Spec Section 2 reproduces them verbatim without any `_Avoid_` terms).
- **ADRs Required:** None (`ADR-0001` and `ADR-0002` remain fully respected; Wave 2 introduces no irreversible backend/compiler architectural precedent).

---

## 5. 📝 Next Actions

- **Proceed to Planning (`/to-plan`):** Specification `v1.3.0` (`Approved`) and all clarification records (`100/100`) are synchronized. Invoke:
  ```text
  /to-plan @docs/spec/web-showcase-sawala-ligar-sync-spec.md @docs/audit/web-showcase-sawala-ligar-sync-spec-clarification.md
  ```

---

> **User Decision Prompt:** (Iteration 4 — Post-Remediation Gate Passed)  
> *The document has achieved a Readiness Score of **100/100**. It is officially viable for the next phase. Do you want to **PROCEED** to `/to-plan`, or do you want to **REFINE** anything further?*
