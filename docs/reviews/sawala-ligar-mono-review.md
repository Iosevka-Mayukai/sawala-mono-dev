# 🔍 Code Review & Quality Audit: Sawala Ligar Mono Variant

**Reviewed Target:** Working-tree diff (`private-build-plans.toml`, `.github/workflows/build.yml`, `.github/workflows/patch-nerd-font.yml`, `README.md`, `docs/ARCHITECTURE.md`, `docs/plan/sawala-ligar-mono-plan.md`)  
**Specification Ref:** `docs/spec/sawala-ligar-mono-spec.md` (`v1.1.0`, `Approved`)  
**Plan Ref:** `docs/plan/sawala-ligar-mono-plan.md` (`v1.1.0`)  
**Risk Tier:** **`High/Critical (Tier 2)`** *(Triggered by CI/CD workflow modifications in `.github/workflows/build.yml` and `.github/workflows/patch-nerd-font.yml` with `permissions: contents: write`)*  
**Review Mode:** **`Deep`**  
**Human Audit Gate:** **`🚨 >= 2 Approvals [MANDATORY HUMAN AUDIT REQUIRED] (Tier 2)`** *(AI-authored PR modifying CI/CD workflows; requires manual review and sign-off from designated code owner and directing engineer prior to merge)*  
**Findings Summary:** **`[Important]: 0 (2 Resolved) | [Nit]: 0 (2 Resolved) | [Pre-existing]: 3`** — **`"No blocking issues found"`**  
**Review Status:** **Approved (Remediated)**  
**Release Readiness Verdict:** **GO**  

> [!SUCCESS] REMEDIATION STATUS: RESOLVED (Iteration 2)
> All `2 [Important]` and `2 [Nit]` findings from Iteration 1 were remediated and verified in Iteration 2. Remote CI build/patching (`AC-002`/`AC-003`/`AC-004`) and local `Biome` (`node_modules` absent) remain `BLOCKED ⚠️` locally per `PLAN-CLARIFY-001`. Tier 2 `[MANDATORY HUMAN AUDIT REQUIRED]` (`>= 2 Approvals`) still applies prior to merge.

---
<!-- markdownlint-disable-->

## 0. Pre-Review Verification Gates (Risk Tier, Mutation Check & Epistemic Doubt)

### 0.0 Risk Tier, Intent & Root-Cause Alignment
- **Blast Radius & Touched Paths:**
  - Domain Configuration: `private-build-plans.toml` (`+98/-0` lines adding `[buildPlans.SawalaLigarMono]`).
  - CI/CD Workflows (Tier 2): `.github/workflows/build.yml` (`+2/-1` lines) and `.github/workflows/patch-nerd-font.yml` (`+15/-8` lines).
  - Documentation & Plan Tracking: `README.md` (`+32/-22` lines), `docs/ARCHITECTURE.md` (`+26/-25` lines), `docs/plan/sawala-ligar-mono-plan.md` (`+12/-12` lines).
  - Zero edits to `packages/*`, `verdafile.mjs`, `index.html`, `web-docs/`, or `.github/workflows/pages.yml` (`CON-003`).
- **Immutable Base-Branch Governance Check:** `[PASS — Evaluated strictly against base-branch AGENTS.md and docs/ARCHITECTURE.md rules]`
- **Base-Branch Drift & Git Hygiene Check:** `[PASS — Working tree built cleanly on HEAD 60a007f; git diff --check returned 0 whitespace/conflict errors; Phase 3 NOTICED items carried into [Pre-existing]]`
- **Intent & Root-Cause Verification:** `[PASS — Build plan, CI filtering, README TOC anchor (line 35), and patch-nerd-font.yml CUSTOM_NAME guard (lines 211-236) cleanly satisfy root spec requirements]`

### 0.1 Verify the Tests First (Mutation Check & 5-Way Test Classification)
- **5-Way File Classification Check (`TEST-WRITING-GUIDE.md`):** `[PASS — Modified files classify as CONFIG_TRIVIAL (private-build-plans.toml), CI_PIPELINE (.github/workflows/*.yml), and DOCS (README.md, ARCHITECTURE.md)]`
- **Target Mutated Seam:** `private-build-plans.toml:155-248` & `.github/workflows/patch-nerd-font.yml:97-99` (static assertion-strength & resolver check: verified via custom Node.js variant-catalog checker AND actual engine resolvers `packages/param/src/variant.mjs` + `packages/param/src/ligation.mjs` that invalid variant names or missing `default-calt` fail/drop `calt`, and omitting the trailing hyphen in `${VARIANT}-*.zip` leaks `SawalaMonoNL` / `SawalaLigarMono` into `VARIANT=SawalaMono`).
- **Observed Test Outcome:** `[CAUGHT (Variant & filter logic assertions fail on inverted conditions); RUNTIME CI GAPS REMAIN BLOCKED ⚠️]`
- **Isolation / Reversion Confirmed:** `[Yes — All checks ran read-only without mutating working-tree source files]`

### 0.2 Adversarial Doubt Cycle & Verification Ledger (Pólya's "Examine Your Guess")
- **Independent Refutation Audit:** `[EXECUTED — Isolated read-only research subagent (7da9857d) performed an independent adversarial pass across git diff, params/variants.toml, params/ligation-set.toml, packages/param/src/*, README.md anchors, and workflow YAML/Bash edge cases]`
- **Candidate Verdict Breakdown:** `[Iteration 1: 2 [Important], 2 [Nit], 3 [Pre-existing] ➔ Iteration 2 Delta Audit: 4 Remediated & Verified, 0 New Findings, 3 [Pre-existing] Retained]`
- **Verifier Proof-of-Failure Filter:** `[PASS — Both remediated [Important] findings verified fixed on disk with passing Python anchor check (20/20) and Node CUSTOM_NAME simulation (7/7)]`
- **Tautological / Vacuous Assertions Checked:** `[PASS — Local verification tested real engine parameter resolution (variantsResolved=535, calt=35) and Python YAML/anchor checks]`
- **Unverified Runtime Seams / Happy-Path Bias Checked:** `[FLAGGED — See Section 0.4 Blocked Ledger (node_modules/Biome and Docker/GitHub Actions compilation not executable locally)]`

### 0.3 5-Move Floor-Guard & Quality Ratchet Diff Audit
- **Move 1 (Deleted/Weakened Assertions):** `[0 Violations]`
- **Move 2 (Skipped Tests — `.skip`, `xit`, `@Disabled`):** `[0 Violations]`
- **Move 3 (Unapproved Linter/Type Suppressions):** `[0 Violations]`
- **Move 4 (Loosened Compiler/Linter Configs):** `[0 Violations — biome.json and package.json unchanged]`
- **Move 5 (Lowered Quality Ratchets):** `[0 Violations — docs/ARCHITECTURE.md §8.3 ratchets preserved and expanded to Multi-Variant Build Integrity]`
- **Verification Scope Executed:** `[Scoped Static + Engine Resolver + Remediation Delta Gate — Node v24 variant/ligation resolver (6/6 passes), 56-key catalog check, PyYAML safe_load (2/2 workflows), README link checker (20/20 valid), Node CUSTOM_NAME 7-case edge check (7/7 pass), git diff --check (0 errors), npm ls --workspaces (0 errors); Biome & Docker TTF build BLOCKED ⚠️ locally]`

### 0.4 Runtime Evidence Ledger, AC Surface Conformance & Review Convergence
- **Trust Boundary Transitions Crossed:** `GitHub Actions workflow_dispatch inputs (operator/maintainer) ➔ runner env bindings ➔ bash filter/docker args ➔ GitHub Release upload (contents: write)`
- **Prior Run Iteration & Convergence Status:** `Iteration 2 of 3 (Converged — Carried Forward: 0, Revalidated: 4, Validly Dismissed: 0)`

| AC / Surface ID | Target Surface | Conformance Status | Concrete Execution Evidence |
| :--- | :--- | :---: | :--- |
| `AC-001` | `private-build-plans.toml` (`[buildPlans.SawalaLigarMono]`) | `MET ✅` | Verified `29` `design` + `27` `italic` (`k = "cursive-serifless"`) keys, `ligations.inherits = "default-calt"`, and executed `packages/param/src/variant.mjs` & `ligation.mjs` across all 3 plans (`variantsResolved=535`, `calt=35`) with 0 errors. |
| `AC-002` | `npm run build -- ttf::SawalaLigarMono` (`iosevka-builder:latest`) | `BLOCKED ⚠️` | `docker` CLI and `node_modules` are absent on the local Windows host; deferred to GitHub Actions `build.yml` per `PLAN-CLARIFY-001`. |
| `AC-003` | `.github/workflows/build.yml` (`variant` options, `150m` timeout, packaging) | `BLOCKED ⚠️` | Static `yaml.safe_load` (`options: ['all', 'SawalaMono', 'SawalaMonoNL', 'SawalaLigarMono']`) and `grep -Po` extraction (`['SawalaLigarMono', 'SawalaMono', 'SawalaMonoNL']`) passed; live GitHub Actions runner execution pending push. |
| `AC-004` | `.github/workflows/patch-nerd-font.yml` (isolation, `150m`, `CUSTOM_NAME`) | `BLOCKED ⚠️` *(Static/Sim PASS)* | Archive prefix filter simulated across 4 `VARIANT` modes (`PASS`), YAML `safe_load` (`PASS`), and remediated `CUSTOM_NAME` logic (`lines 211-236`) passed `7/7` Node assertions (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`, plus fail-fast collision rejection under `VARIANT="all"`); live Docker `nerdfonts/patcher` CI execution deferred to GitHub Actions. |
| `AC-005` | `patch-nerd-font.yml` missing release archive fail-fast | `MET ✅` *(Static Sim)* | JS simulation confirmed `filterArchives(["SawalaMono-v1.0.0.zip", "SawalaMonoNL-v1.0.0.zip"], "SawalaLigarMono").length === 0` reaches `ZIP_COUNT -eq 0`. *(Note `[Pre-existing]` edge case if tag has 0 `Sawala*.zip` assets).* |
| `AC-006` | `README.md`, `docs/ARCHITECTURE.md`, `CONTEXT.md`, `CON-003`, Biome | `MET ✅` *(Docs/Static)* / `BLOCKED ⚠️` *(Biome)* | `git diff --name-only` confirmed `index.html`, `web-docs/`, `packages/*` untouched (`PASS`); Python anchor validation passed `20/20` (`README.md:35` fixed); `docs/ARCHITECTURE.md:71` no longer implies `SawalaLigarMonoNL`; local `Biome` check `BLOCKED ⚠️` (`node_modules` absent). |

---

## 1. Uncle Bob's 5 SOLID Principles Audit

| Principle | Assessment | Status | Notes / Findings |
| :--- | :--- | :---: | :--- |
| **SRP** | Does each file/workflow have 1 reason to change? | **PASS** | Domain params (`private-build-plans.toml`), base compilation (`build.yml`), NF patching (`patch-nerd-font.yml`), and docs (`README.md`, `ARCHITECTURE.md`) remain cleanly separated. |
| **OCP** | Can new variants be added without brittle exclusion branches? | **PASS** | `patch-nerd-font.yml:97-99` replaces hardcoded `SawalaMonoNL` exclusions with positive exact-prefix matching (`! -name "${VARIANT}-*.zip" -delete`), though `CUSTOM_NAME` branching (`lines 213-227`) still requires per-variant rules under `VARIANT="all"`. |
| **LSP** | Do all 3 build plans conform to `verdafile.mjs` contracts? | **PASS** | `SawalaLigarMono` supplies identical `widths`, `slopes`, and `variants`/`ligations` contract shape as `SawalaMono`. |
| **ISP** | Are workflow dispatch inputs lean and cohesive? | **PASS** | Both workflows expose minimal, domain-specific inputs (`variant` choices strictly constrained). |
| **DIP** | Do inner packages remain decoupled from CI/docs? | **PASS** | Zero coupling introduced into `packages/*` or `web-docs/*`. |

---

## 2. Pólya Heuristics Boundary Audit

### 2.1 Specialization & Limiting Cases
- [x] `SawalaMono` vs `SawalaMonoNL` vs `SawalaLigarMono` exact-prefix archive delimiter (`${VARIANT}-*.zip`) prevents substring leakage (`SawalaMono` never retains `SawalaMonoNL` or `SawalaLigarMono`).
- [x] `CUSTOM_NAME` edge cases under `VARIANT="all"` (`RESOLVED ✅` — Finding #2): `patch-nerd-font.yml:211-236` now rejects `'NL'`/`'Ligar'` in `CUSTOM_NAME` when `VARIANT="all"` and substitutes `" Mono"` before `"Mono"` cleanly (`7/7` Node assertions pass).
- [x] `git diff` confirms `0` removed/modified lines in `SawalaMono` and `SawalaMonoNL`.

### 2.2 Test by Dimension
- [x] Widths (`Normal = 500`, `SemiExtended = 548`) and slopes (`Upright = 0°`, `Italic = 9.4°`) match `SawalaMono` dimensions identically.
- [x] CI job timeouts scaled proportionally (`90` $\to$ `150` minutes) for 3 full build plans (`+50%` workload).

### 2.3 Inductive Invariant Verification (Pólya, p. 114)
- [x] Base Case 0 (`0` matching zips after filter) triggers fail-fast `exit 1` (`patch-nerd-font.yml:102-105`).
- [x] Base Case 1 (`1` selected variant) stages strictly that single variant.
- [x] Inductive Step ($2 \to 3$ variants) iterates cleanly over `VARIANTS=("SawalaMono" "SawalaMonoNL" "SawalaLigarMono")` (`line 129`).

### 2.4 All Data & Whole Condition Audit (Pólya, p. 33)
- [x] All `56` variant overrides (`29` `design` + `27` `italic` with `k = "cursive-serifless"`), `default-calt`, `widths`, and `slopes` from `docs/spec/sawala-ligar-mono-spec.md` §4.1 are preserved in `private-build-plans.toml`.
- [x] `README.md:35` TOC link now matches `README.md:237` heading (`RESOLVED ✅` — Finding #1; Python anchor check `20/20` valid).

### 2.5 Indirect Proof Audit (Reductio ad Absurdum - Pólya, p. 162–171)
- [x] Negative Hypothesis (*`ligations` omitted*) proved false: `[buildPlans.SawalaLigarMono.ligations]` `inherits = "default-calt"` resolves `calt=35` ligature rules via `ligation.mjs`.
- [x] Negative Hypothesis (*`*SawalaMono*.zip` skips `SawalaLigarMono`*) proved fixed via `--pattern "Sawala*.zip"` + `! -name "${VARIANT}-*.zip" -delete`.

### 2.6 Symmetry & Round-Trip Invariant Audit (Pólya, p. 199–200)
- [x] `build.yml` archive output (`${font_name}-${SUFFIX}.zip`) pairs symmetrically with `patch-nerd-font.yml` input acquisition (`${VARIANT}-*.zip`).
- [x] `README.md` TOC anchor (`line 35`) now preserves heading-link symmetry with `line 237` (`RESOLVED ✅` — Finding #1).

### 2.7 Variation of the Problem & Boundary Audit (Pólya, p. 209–214)
- [x] Tested all 4 `VARIANT` values (`all`, `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`) against simulated base + `NF` + `Extended-NF` release assets.

---

## 3. Clean Code & Boy Scout Rule Verification

- **Intention-Revealing Names:** `SawalaLigarMono`, `"Sawala Ligar Mono"`, and `VARIANT_CUSTOM_NAME` follow `CONTEXT.md` canonical terminology (`_Avoid_` terms absent from source/docs except `README.md` cultural explanation).
- **Boy Scout Rule:** Workflows and docs updated cleanly without unsolicited refactors; `INV-007` preserved accurately.
- **Architectural Pragmatism & Scope Check:** Changes stay within outer declarative/CI/docs layers (`CON-003` honored).
- **Zero Suppression Anti-Cheat:** Zero suppressions or config relaxations introduced.

---

## 4. Defensive Security & Invariant Audit

| Security Vector | Assessment & Verification Criteria | Status | Notes / Findings & Verification Recipes |
| :--- | :--- | :---: | :--- |
| **Injection & Second-Order Sinks** | GitHub Actions `${{ ... }}` interpolation in `run:` scripts | **`PASS`** | All new & existing `${{ ... }}` inputs/outputs in `build.yml` and `patch-nerd-font.yml` are bound via step-level `env:`; bash variables (`"$VARIANT"`, `"$CUSTOM_NAME"`, `"$VARIANT_CUSTOM_NAME"`) are double-quoted. |
| **Tenant & Data Isolation Lifecycle** | N/A | **`N/A`** | Public font build repo. |
| **Auth & Access Control (BOLA/IDOR)** | Workflow token permissions | **`PASS`** | Scoped to `contents: write` for release asset publishing (`build.yml:36`, `patch-nerd-font.yml:44`). |
| **AI, LLM & MCP Agentic Boundaries** | N/A | **`N/A`** | No agentic runtime code modified. |
| **DoS, Amplification & Cancellation** | Bounded CI runner time & concurrency | **`PASS`** | `timeout-minutes: 150` bounds 3-plan jobs; `PN=2` caps Docker patcher workers. |
| **SSRF & Outbound URL Guards** | Network calls in CI | **`PASS`** | `gh release download` / `upload` restricted to repository releases. |
| **Web & Identity Boundaries** | N/A | **`N/A`** | `index.html` and `web-docs/` untouched (`CON-003`). |
| **Client-Side Sinks & DOM** | N/A | **`N/A`** | Static web UI untouched. |
| **Destructive File/Path Guards** | `find ... -delete` in `patch-nerd-font.yml:98` | **`PASS`** | Scoped strictly inside `raw_archives` (`-type f -name "*.zip" ! -name "${VARIANT}-*.zip" -delete`); `VARIANT` comes from fixed `choice` options (`all`, `SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`). |
| **Zero Secret Exposure & Git Hygiene** | Secrets & credentials audit | **`PASS`** | Zero hardcoded tokens/keys in diff; only `${{ secrets.GITHUB_TOKEN }}` referenced in `env:`. |
| **CI/CD, Supply-Chain & Provenance** | Action pinning & Docker image tags | **`PASS (Diff) / Pre-existing`** | Diff adds no new third-party actions/dependencies; existing `@v3`/`@v4`/`@v6` action tags and `:latest` Docker images noted in `[Pre-existing]` Finding #6. |
| **Desktop, Mobile & Local-IPC** | N/A | **`N/A`** | — |
| **Async Queues, Webhooks & Idempotency** | Release asset uploads | **`PASS`** | `gh release upload --clobber` (`build.yml:154`, `patch-nerd-font.yml:299`) remains idempotent. |
| **Cloud Config & Workload Secret Containment** | Runner environment isolation | **`PASS`** | `GITHUB_TOKEN` passed via step `env:`, never CLI args. |
| **Binary, Memory & FFI Safety** | Containerized FontForge/Node execution | **`PASS`** | Isolated inside `iosevka-builder` and `nerdfonts/patcher` containers (`--mono`). |
| **Wildcard & Code Debt Smells** | Incomplete TOC sync & bash substitution edge cases | **`PASS (Remediated)`** | Caught `README.md:35` broken anchor (`Finding #1`) and `patch-nerd-font.yml:219-227` `CUSTOM_NAME` flaws (`Finding #2`) in Iteration 1; both verified fixed in Iteration 2. |

---

## 5. Database, Caching & Performance Audit (Keep-or-Revert Gate)

- **Query & Index Verification (`EXPLAIN ANALYZE`):** `N/A`
- **Cache Invalidation & Stampede Protection:** `N/A` (Existing `package-lock.json` node cache key in `build.yml:64-69` untouched).
- **Performance Attempt Ledger (Keep-or-Revert Rule):** `N/A` (`timeout-minutes: 150` raises runner ceiling for 3-plan jobs without adding code complexity).

### 5.5 Frontend, Accessibility & UI Disqualifier Audit
- **`N/A`:** `index.html` and `web-docs/` were untouched per `CON-003`.

---

## 6. Remediation Action Items

### Categorized Findings (`[Important]` ➔ `[Nit]` ➔ `[Pre-existing]`)

1. **`RESOLVED ✅` ~~`[Important]`~~ [`README.md:35`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md#L35) - `reuse:` Broken Table of Contents Anchor Link** *(Fixed in Iteration 2: anchor and label updated to match `README.md:237`; Python check `20/20` valid)*
   - **Bug Class & Sibling Sweep:** `Stale Documentation Cross-Reference / Broken Internal Anchor` — Swept all 20 internal links in `README.md`; 19 passed, 1 failed (`line 35`).
   - **What this is:** Table of Contents link `[Method B: Generating Nerd Font (Sawala Mono NF / Sawala Mono NL NF) on Your Fork](#method-b-generating-nerd-font-sawala-mono-nf--sawala-mono-nl-nf-on-your-fork)`.
   - **Problem:** `README.md:237` updated the target heading to include `/ Sawala Ligar Mono NF`, changing its GitHub Markdown anchor slug so the TOC link at `line 35` now points to a non-existent anchor (`REQ-005` / `AC-006`).
   - **Fix (Actionable Surgical Diff):**
     ```markdown
     # BEFORE (README.md:35):
       - [Method B: Generating Nerd Font (Sawala Mono NF / Sawala Mono NL NF) on Your Fork](#method-b-generating-nerd-font-sawala-mono-nf--sawala-mono-nl-nf-on-your-fork)

     # AFTER (README.md:35):
       - [Method B: Generating Nerd Font (Sawala Mono NF / Sawala Mono NL NF / Sawala Ligar Mono NF) on Your Fork](#method-b-generating-nerd-font-sawala-mono-nf--sawala-mono-nl-nf--sawala-ligar-mono-nf-on-your-fork)
     ```
   - **If we skip it:** Clicking Method B in the GitHub README Table of Contents silently fails to scroll to the section.

2. **`RESOLVED ✅` ~~`[Important]`~~ [`.github/workflows/patch-nerd-font.yml:211-236`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/patch-nerd-font.yml#L211-L236) - `shrink:` `CUSTOM_NAME` Spacing Defect & Cross-Variant Collision Under `VARIANT="all"`** *(Fixed in Iteration 2: added `VARIANT="all"` fail-fast guard against `'NL'`/`'Ligar'` tokens and separate `" Mono"` vs `"Mono"` substitution; Node 7-case edge check `7/7` passed)*
   - **Bug Class & Sibling Sweep:** `String Normalization Mismatch / Multi-Variant Identifier Collision` — Checked sibling branch `SawalaMonoNL` (`lines 213-218`); both `SawalaMono` and `SawalaLigarMono` share the collision risk if a non-default variant keyword (`"NL"` or `"Ligar"`) is supplied in `CUSTOM_NAME` under `VARIANT="all"`.
   - **What this is:** The `elif [ "$VARIANT" = "all" ] && [ "$v" = "SawalaLigarMono" ]` custom family name derivation block.
   - **Problem:**
     1. **Spacing defect:** `${CUSTOM_NAME/Mono/Ligar Mono}` turns `"SawalaMono NF"` (spaceless, matching the build plan ID) into `"SawalaLigar Mono NF"` (no space before `Ligar`, space before `Mono`).
     2. **Cross-variant collision:** If a user sets `VARIANT="all"` and `CUSTOM_NAME="Sawala Ligar Mono NF"`, `v="SawalaMono"` receives `--name "Sawala Ligar Mono NF"` and `v="SawalaLigarMono"` also receives `--name "Sawala Ligar Mono NF"`, stamping two distinct variants with the exact same OS font family name.
   - **Fix (Actionable Surgical Diff):**
     ```bash
     # BEFORE (.github/workflows/patch-nerd-font.yml:211-228):
                 if [ -n "$CUSTOM_NAME" ]; then
                   VARIANT_CUSTOM_NAME="$CUSTOM_NAME"
                   if [ "$VARIANT" = "all" ] && [ "$v" = "SawalaMonoNL" ] && [[ "$CUSTOM_NAME" != *"NL"* ]]; then
                     if [[ "$CUSTOM_NAME" == *" NF" ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME% NF} NL NF"
                     else
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME} NL"
                     fi
                   elif [ "$VARIANT" = "all" ] && [ "$v" = "SawalaLigarMono" ] && [[ "$CUSTOM_NAME" != *"Ligar"* ]]; then
                     if [[ "$CUSTOM_NAME" == *"Mono"* ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME/Mono/Ligar Mono}"
                     elif [[ "$CUSTOM_NAME" == *" NF" ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME% NF} Ligar NF"
                     else
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME} Ligar"
                     fi
                   fi
                   echo "[$v] Custom Font Name Override: $VARIANT_CUSTOM_NAME"
                   PATCH_ARGS+=("--name" "$VARIANT_CUSTOM_NAME")
                 fi

     # AFTER (.github/workflows/patch-nerd-font.yml:211-228):
                 if [ -n "$CUSTOM_NAME" ]; then
                   if [ "$VARIANT" = "all" ] && { [[ "$CUSTOM_NAME" == *"NL"* ]] || [[ "$CUSTOM_NAME" == *"Ligar"* ]]; }; then
                     echo "::error::Do not include variant-specific tokens ('NL' or 'Ligar') in custom_name when variant='all'. Use a single variant or pass a base name such as 'Sawala Mono NF'."
                     exit 1
                   fi
                   VARIANT_CUSTOM_NAME="$CUSTOM_NAME"
                   if [ "$VARIANT" = "all" ] && [ "$v" = "SawalaMonoNL" ]; then
                     if [[ "$CUSTOM_NAME" == *" NF" ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME% NF} NL NF"
                     else
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME} NL"
                     fi
                   elif [ "$VARIANT" = "all" ] && [ "$v" = "SawalaLigarMono" ]; then
                     if [[ "$CUSTOM_NAME" == *" Mono"* ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME/ Mono/ Ligar Mono}"
                     elif [[ "$CUSTOM_NAME" == *"Mono"* ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME/Mono/LigarMono}"
                     elif [[ "$CUSTOM_NAME" == *" NF" ]]; then
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME% NF} Ligar NF"
                     else
                       VARIANT_CUSTOM_NAME="${CUSTOM_NAME} Ligar"
                     fi
                   fi
                   echo "[$v] Custom Font Name Override: $VARIANT_CUSTOM_NAME"
                   PATCH_ARGS+=("--name" "$VARIANT_CUSTOM_NAME")
                 fi
     ```
   - **If we skip it:** `SawalaMono NF` produces malformed `"SawalaLigar Mono NF"`, and passing `"Sawala Ligar Mono NF"` with `variant: all` silently overwrites `SawalaMono`'s font family metadata with `Sawala Ligar Mono NF`.

3. **`RESOLVED ✅` ~~`[Nit]`~~ [`docs/ARCHITECTURE.md:71`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/ARCHITECTURE.md#L71) - `shrink:` Architecture Diagram Implies Non-Existent `SawalaLigarMonoNL`** *(Fixed in Iteration 2: updated to `<fmt>::SawalaMono[NL] / Ligar`)*
   - **Bug Class & Sibling Sweep:** `Ambiguous Notation in Architecture Map` — Checked all remaining lines in `docs/ARCHITECTURE.md`; only `line 71` uses bracketed Cartesian shorthand.
   - **What this is:** ASCII container diagram edge label `<fmt>::Sawala[Ligar]Mono[NL]`.
   - **Problem:** Expands combinatorially to include `SawalaLigarMonoNL`, contradicting `Spec §1.1` Explicit Non-Goals (*"No `Sawala Ligar Mono NL` variant"*).
   - **Fix (Actionable Surgical Diff):**
     ```text
     # BEFORE (docs/ARCHITECTURE.md:71):
                    │ <fmt>::Sawala[Ligar]Mono[NL]  │ -> fontforge patch         │ (static copy)

     # AFTER (docs/ARCHITECTURE.md:71):
                    │ <fmt>::SawalaMono[NL] / Ligar │ -> fontforge patch         │ (static copy)
     ```
   - **If we skip it:** Minor reader confusion about whether `SawalaLigarMonoNL` exists.

4. **`RESOLVED ✅` ~~`[Nit]`~~ [`docs/plan/sawala-ligar-mono-plan.md:6,103`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/plan/sawala-ligar-mono-plan.md#L6) - `yagni:` Premature Completion Status Before Human Approval** *(Fixed in Iteration 2: reverted status to `"In Progress"` and `TASK-011` to `[ ]`)*
   - **Bug Class & Sibling Sweep:** `Premature Gate Marking` — `TASK-011` (`APPROVAL: Stop and wait for explicit user confirmation`) and `status: "Completed"` were marked `[x]` autonomously, and `README.md:233` (`~5-10 minutes`, pre-existing) understates `variant: all` CI runtime for 3 plans.
   - **What this is:** Plan frontmatter `status: "Completed"` and `TASK-011` `[x] 2026-11-18`.
   - **Problem:** Final human approval (and remote CI `AC-002` binary check + remediation of Findings #1–#2) has not completed yet.
   - **Fix (Actionable Surgical Diff):**
     ```markdown
     # BEFORE (docs/plan/sawala-ligar-mono-plan.md:6 & 103):
     status: "Completed"
     | **TASK-011** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to declare the implementation plan complete. | - | - | TASK-010 | - | [x] | 2026-11-18 |

     # AFTER (until remediation & user sign-off):
     status: "In Progress"
     | **TASK-011** | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to declare the implementation plan complete. | - | - | TASK-010 | - | [ ] | |
     ```
   - **If we skip it:** Plan tracking appears finalized while remediation items remain open.

5. **`[Pre-existing]` [`.github/workflows/build.yml:47-64,97`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/build.yml#L47-L64) & [`.github/workflows/patch-nerd-font.yml:55,237,287`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/patch-nerd-font.yml#L55) - Mutable Action Tags, `:latest` Docker Tags & Partial-Release Silent Skip**
   - **Bug Class & Sibling Sweep:** `Supply-Chain Tag Mutability & Partial Release Silent Skip` — Observed in both `build.yml` and `patch-nerd-font.yml`.
   - **What this is:** Actions pinned by major version tags (`@v3`, `@v4`, `@v6`), Docker `:latest` tags, pre-existing unquoted `$USER` / `$GITHUB_OUTPUT` / `*.ttf`, and `patch-nerd-font.yml:91,157-160` (`gh release download` exiting directly on 0 assets; `VARIANT="all"` silently skipping a missing variant when 1–2 others exist).
   - **Fix:** Intentionally deferred (`NOTICED BUT NOT TOUCHING` — out of scope for Wave 1; consider pinning action SHAs and image digests in a dedicated CI hardening PR).

---

## 7. Pólya's Two Golden Questions (Looking Back & Knowledge Promotion)

- **Can you use the result?**
  - **Reusable Pattern:** The exact-prefix release filter (`! -name "${VARIANT}-*.zip" -delete`) in `patch-nerd-font.yml:97-99` cleanly scales to any future `Sawala*` variant without needing new negative exclusion branches.
- **Can you use the method?**
  - **Promoted Pattern:** Running Iosevka's real `packages/param/src/variant.mjs` and `ligation.mjs` resolvers directly against `params/variants.toml` and `params/ligation-set.toml` in Node v24 proves parameter validity in `< 1s` even when `node_modules` and Docker are absent locally.
  - **Memory Promotion:** Recommend saving this zero-dependency Node resolver validation pattern and CI-only compilation boundary to `.agents/instructions/memory.instructions.md` via `/to-memory` once Findings #1–#2 are fixed.

---

## 8. Can You See It at a Glance? (Holistic Perception - Pólya, p. 59–61)

```text
[ private-build-plans.toml ]
  └── [buildPlans.SawalaLigarMono] (ss20 + 29 design / 27 italic + default-calt)
        │
        ├──▶ [ build.yml (timeout: 150m) ] ──▶ SawalaLigarMono-<ver>.zip
        │                                             │
        ▼                                             ▼
[ README.md + ARCHITECTURE.md ]        [ patch-nerd-font.yml (150m, Sawala*.zip) ]
  (Docs & 6-dist topology)               ├── Exact-prefix filter: ${VARIANT}-*.zip
  ✅ TOC anchor synced (line 35)          ├── ✅ CUSTOM_NAME guard & spacing (lines 211-236)
                                         └── SawalaLigarMono-NF-<tag>.zip
```

- **At-a-Glance Summary:** `SawalaLigarMono` cleanly extends the domain build plan, CI compiler, Nerd Font patcher, and repository docs while keeping `SawalaMono`, `SawalaMonoNL`, `packages/*`, and `web-docs/` untouched; all 4 Iteration 1 findings (`README.md:35`, `patch-nerd-font.yml:211-236`, `docs/ARCHITECTURE.md:71`, `docs/plan/sawala-ligar-mono-plan.md:6,103`) are verified resolved in Iteration 2.
- **Visual Diagram Validated:** Yes.

---

## 9. Lean Scoreboard, Transparency & Release Readiness Gate

### 9.1 Lean Scoreboard
- **Lines Added:** +190 lines across 6 modified files (`private-build-plans.toml`, `.github/workflows/build.yml`, `.github/workflows/patch-nerd-font.yml`, `README.md`, `docs/ARCHITECTURE.md`, `docs/plan/sawala-ligar-mono-plan.md`)
- **Lines Deleted:** -64 lines
- **Net Diff Impact:** +126 lines across 6 files *(exact `git diff --shortstat`)*

### 9.2 Scope Limitations & Transparency
- **Not checked locally (`BLOCKED ⚠️`):**
  - `npx @biomejs/biome check .` and `@iarna/toml` (`node_modules` not installed locally; no `.mjs` files were touched).
  - Live Docker `ttf::SawalaLigarMono` compilation (`AC-002`), live `.github/workflows/build.yml` run (`AC-003`), and live `nerdfonts/patcher:latest` container run (`AC-004`) — deferred exclusively to GitHub Actions per `PLAN-CLARIFY-001`.
- **Residual Risks / Upgrade Triggers:**
  - If `variant: all` runtime across 3 build plans approaches `150` minutes on `ubuntu-latest`, pivot to Contingency Plan B (per-variant `variant: SawalaLigarMono` dispatch).

### 9.3 Release & Launch Readiness Gate (`GO | NO-GO`), Pre-Merge Proofs & Rollback Plan
- **Release Decision:** **`GO`** *(All 2 `[Important]` and 2 `[Nit]` findings resolved and verified in Iteration 2; Tier 2 `🚨 >= 2 Approvals [MANDATORY HUMAN AUDIT REQUIRED]` applies for `.github/workflows/*` changes before merge)*
- **Pre-Merge Runnable Proofs Checklist:**
  - [x] Remediated Finding #1 (`README.md:35`), Finding #2 (`patch-nerd-font.yml:211-236`), Finding #3 (`docs/ARCHITECTURE.md:71`), and Finding #4 (`docs/plan/sawala-ligar-mono-plan.md:6,103`).
  - [x] Re-ran `README.md` internal anchor verification script (`20/20` valid), `patch-nerd-font.yml` `CUSTOM_NAME` 7-case Node simulation (`7/7` pass), PyYAML `safe_load` (`2/2` valid), and `git diff --check` (`0` errors).
  - [ ] Obtain `>= 2` human approvals (Code Owner + Directing Engineer) for Tier 2 CI workflow changes (`[MANDATORY HUMAN AUDIT REQUIRED]`).
  - [ ] Post-push CI proof: run `.github/workflows/build.yml` (`variant: SawalaLigarMono` or `all`) and `.github/workflows/patch-nerd-font.yml` (`variant: SawalaLigarMono`).
- **Backward Compatibility & Migration Safety:** `Verified` — `SawalaMono` and `SawalaMonoNL` build plans and web showcase assets remain 100% unchanged.
- **Timed Rollback Plan (`< 5 Minutes` — How to Revert):**
  1. **Revert Trigger:** Broken `build.yml` / `patch-nerd-font.yml` workflow dispatch, malformed font output, or `timeout-minutes: 150` failure.
  2. **Rollback Command / Action (`< 2 min`):**
     - Pre-commit: `git checkout -- private-build-plans.toml .github/workflows/build.yml .github/workflows/patch-nerd-font.yml README.md docs/ARCHITECTURE.md`
     - Post-commit: `git revert <commit-sha>`
     - Release asset cleanup (if published): `gh release delete-asset <tag> SawalaLigarMono-<tag>.zip SawalaLigarMono-NF-<tag>.zip -y`
  3. **Post-Rollback Verification (`< 3 min`):** Re-run `SawalaMono` and `SawalaMonoNL` checks and verify `git status` is clean.
