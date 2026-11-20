# 🔍 Code Review & Quality Audit: Web Showcase & Documentation Sync for Sawala Ligar Mono (Wave 2)

**Reviewed Target:** Working Tree Wave 2 Diff (`14` text/source files + `2` new Tier A `.woff2` binaries: `index.html`, `DESIGN.md`, `web-docs/css/{tokens,typography,showcase}.css`, `web-docs/js/{specimen-tester,polyglot-runner,distribution-cards,config-generator,glyph-matrix,terminal-preview}.js`, `web-docs/pages/{distributions,installation,ligatures}.html`, `web-docs/fonts/sawala-mono/SawalaLigarMono-{Regular,Italic}.woff2`)  
**Specification Ref:** [`docs/spec/web-showcase-sawala-ligar-sync-spec.md`](../spec/web-showcase-sawala-ligar-sync-spec.md) (`v1.3.0`, `Approved`)  
**Plan Ref:** [`docs/plan/web-showcase-sawala-ligar-sync-plan.md`](../plan/web-showcase-sawala-ligar-sync-plan.md) (`v1.1.0`, `Completed`)  
**Risk Tier:** **`Medium (Tier 1)`**  
**Review Mode:** **`Standard`**  
**Human Audit Gate:** **`>= 1 Approval (Tier 1)`**  
**Findings Summary:** **`[Important]: 0 | [Nit]: 0 (3 Remediated) | [Pre-existing]: 2 (1 Remediated)`** — **`No blocking issues found`**  
**Review Status:** **Approved**  
**Release Readiness Verdict:** **GO**

---
<!-- markdownlint-disable -->

## 0. Pre-Review Verification Gates (Risk Tier, Mutation Check & Epistemic Doubt)

### 0.0 Risk Tier, Intent & Root-Cause Alignment
- **Blast Radius & Touched Paths:** Zero-build static GitHub Pages documentation frontend (`index.html`, `web-docs/css/*`, `web-docs/js/*`, `web-docs/pages/*`, `web-docs/fonts/sawala-mono/SawalaLigarMono-{Regular,Italic}.woff2`, `DESIGN.md`). Zero modifications to font build engine (`packages/*`, `params/*`, `tools/*`, `build-plans.toml`, `verdafile.mjs`, `biome.json`, `package.json`) or CI/CD workflows (`.github/workflows/*`). PR diff size: **`L`** (`14` source/doc files, `+407` / `-104` lines, strictly scoped within one cohesive presentation seam — below the `XL` `> 800`-line cognitive load threshold).
- **Immutable Base-Branch Governance Check:** `PASS` — Evaluated strictly against base-branch `HEAD` governance files (`AGENTS.md`, `CONTEXT.md`, `docs/ARCHITECTURE.md`, `docs/adr/0001-retain-build-plans-and-tools.md`, `docs/adr/0002-standalone-nerd-font-patcher.md`). Zero governance or workflow files were altered to weaken audit rules.
- **Base-Branch Drift & Git Hygiene Check:** `PASS` — Clean alignment with `main`; `git diff --check` exits `0` with zero whitespace errors; zero leaked scratch files or debug logs in repo. Note on working-tree hygiene: 5 user-updated pre-existing `SawalaMono*.woff2` binaries and `.agents/instructions/memory.instructions.md` are present in the working tree alongside untracked Wave 2 planning/release docs — stage selectively when committing. All Phase 3 `NOTICED BUT NOT TOUCHING` observations are preserved under `[Pre-existing]` below.
- **Intent & Root-Cause Verification:** `PASS` — Every Wave 2 requirement (`REQ-001`–`REQ-007`) and acceptance criterion (`AC-001`–`AC-008`) is satisfied end-to-end: `"Sawala Ligar Mono"` upright & italic WOFF2 assets are bundled and served at HTTP `200`; Live Specimen Tester and Polyglot Runner decouple font family (`data-font-variant`) from ligation mode (`data-ligature-mode` / `data-ligatures`) cleanly; all 6 official distributions render in a balanced `3×2` desktop grid and 7-column subpage table; and the latent JetBrains `"Enable ligatures = false"` mismatch in `config-generator.js:166` is resolved at the formatter seam rather than patched in HTML.

### 0.1 Verify the Tests First (Mutation Check & 5-Way Test Classification)
- **5-Way File Classification Check (`TEST-WRITING-GUIDE.md`):** `PASS` — Proportional coverage verified across all touched classes:
  - `LOGIC` (`specimen-tester.js`, `polyglot-runner.js`, `distribution-cards.js`, `config-generator.js`, `glyph-matrix.js`, `terminal-preview.js`): covered by Node ESM harness assertions (`verify-phase1.mjs`, `verify-phase2.mjs`, `verify-phase3.mjs`) testing all 3 specimen/polyglot modes, 6 tiers × 2 width modes, and 6 families × 7 editors (`42` combinations).
  - `UI_COMPONENT` (`index.html`, `web-docs/pages/*.html`, `web-docs/css/*.css`): covered by live local HTTP browser verification across `1440×900`, `1024×900`, and `375×812` viewports, `impeccable detect --json`, and static HTML/CSP/link/anchor assertions.
  - `SECURITY_SURFACE` (CSP headers, zero inline style, `rel="noopener noreferrer"`, DOM sinks): covered by static HTML regex assertions and live browser `0` CSP violation telemetry.
  - `CONFIG_TRIVIAL` (`DESIGN.md`, `tokens.css`): verified by schema/string parity assertions and `impeccable detect`.
- **Target Mutated Seams:**
  1. `web-docs/js/specimen-tester.js:145` — Inverted `const isLigaturesEnabled = nextState.variant !== "nl";` to `=== "standard"` in a disposable scratch copy.
  2. `web-docs/js/config-generator.js:166` — Removed `.replace("Enable ligatures = true", "Enable ligatures = false")` in a disposable scratch copy.
- **Observed Test Outcome:** **CAUGHT (Both Mutations Failed with `ERR_ASSERTION`)**
  - Mutation A (`specimen-tester.js`): `MUTATION_A_CAUGHT (ERR_ASSERTION on specimen-tester.js:isLigaturesEnabled): nl !== standard`
  - Mutation B (`config-generator.js`): `MUTATION_B_CAUGHT (ERR_ASSERTION on config-generator.js:jetbrains-nl-toggle): formattedContent still had 'Enable ligatures = true'`
- **Isolation / Reversion Confirmed:** `Yes` — Executed strictly in disposable scratch copies (`_tmp_mut_specimen.mjs`, `_tmp_mut_config.mjs`) immediately unlinked in `finally`; main working tree untouched.

### 0.2 Adversarial Doubt Cycle & Verification Ledger (Pólya's "Examine Your Guess")
- **Independent Refutation Audit:** `EXECUTED` — Delegated to an isolated read-only `research` subagent (`Adversarial Quality & Security Auditor`, conversation `9b4f12bb-d1b9-4adf-8cc7-a7225cc40b27`) without passing author rationalizations, evaluating `ARTIFACT` directly against `CONTRACT` (`web-showcase-sawala-ligar-sync-spec.md`, `CONTEXT.md`, `DESIGN.md`, `docs/ARCHITECTURE.md`, `private-build-plans.toml`, and `.github/workflows/{build,patch-nerd-font}.yml`).
- **Candidate Verdict Breakdown:** **`4 Confirmed & Remediated` (`0 [Important]`, `3 [Nit] — FIXED ✅`, `1 [Pre-existing] — FIXED ✅`), `0 Needs Validation`, `5 Rejected`** (all 5 core refutation hypotheses — TOML line drift, `"ligar"` leakage/CSS specificity, 42-combo Config Generator corruption, CI archive mismatch, and CSP/XSS/ARIA/WOFF2/ADR-0001 violations — were refuted by concrete source evidence).
- **Verifier Proof-of-Failure Filter:** `PASS` — Every confirmed candidate was cross-checked directly against source lines (`index.html:1076`, `web-docs/js/polyglot-runner.js:158,292`, `web-docs/js/config-generator.js:159-160`, `web-docs/css/showcase.css:1273`) with explicit Call Chain, Trigger Condition, and Failure Outcome. Zero `[Important]` findings survived refutation.
- **Tautological / Vacuous Assertions Checked:** `PASS` — Confirmed mutation script initially caught a mock `TypeError` before being tightened to assert `err.code === "ERR_ASSERTION"`, preventing false-green mutation proof.
- **Unverified Runtime Seams / Happy-Path Bias Checked:** `PASS` — Exercised both happy paths and negative/fallback boundaries (`"invalid"`, `null`, `""`, weight `100`..`900`, `NaN`, unknown editor/family keys, `375px` mobile touch heights, `7`-column table scroll containment, and live HTTP `200` delivery of both new WOFF2 files).

### 0.3 5-Move Floor-Guard & Quality Ratchet Diff Audit
- **Move 1 (Deleted/Weakened Assertions):** `0 Violations`
- **Move 2 (Skipped Tests — `.skip`, `xit`, `@Disabled`):** `0 Violations`
- **Move 3 (Unapproved Linter/Type Suppressions):** `0 Violations` (Floor-Guard scan across `git diff -- index.html web-docs/` returned empty output)
- **Move 4 (Loosened Compiler/Linter Configs):** `0 Violations` (`biome.json`, `package.json`, `verdafile.mjs` untouched)
- **Move 5 (Lowered Quality Ratchets — Coverage, Bundle, CWV, Complexity):** `0 Violations` (`preload` count stayed strictly at `4`; new WOFF2 files `515,940` B + `571,936` B = `1,087,876` B well below `665,600` B / `1,310,720` B ceilings; `impeccable detect` introduced `0` new warnings/errors)
- **Verification Scope Executed:** `check:full` (`node --check` on all 8 `web-docs/js/*.js`, `impeccable detect --json`, `verify-phase1.mjs`, `verify-phase2.mjs`, `verify-phase3.mjs`, `mutation-check.mjs`, live browser audits on `http://127.0.0.1:8765` & `http://127.0.0.1:8766` across 4 pages × 3 viewports, `git diff --name-only`, `git diff --check`)

### 0.4 Runtime Evidence Ledger, AC Surface Conformance & Review Convergence
- **Trust Boundary Transitions Crossed:** `Static GitHub Pages CDN (Read-Only Assets) ➔ Browser DOM / Client ESM Runtime` (zero backend mutations, zero authentication state, zero telemetry egress; external links constrained to GitHub Releases/Repo/OFL with `rel="noopener noreferrer"`).
- **Prior Run Iteration & Convergence Status:** `Iteration 1 (Initial Audit)` — Converged cleanly with `0` blocking findings.

| AC / Surface ID | Target Surface (Route / Component / Asset) | Conformance Status | Concrete Execution Evidence (Command, HTTP Status, or Byte Measurement) |
| :--- | :--- | :---: | :--- |
| `AC-001` | `web-docs/fonts/sawala-mono/SawalaLigarMono-{Regular,Italic}.woff2`, `typography.css`, `tokens.css`, `index.html` preloads | `MET ✅` | Valid `wOF2` headers (`mutation-check.mjs`); `Regular=515,940` B (`<= 665,600`), `Italic=571,936` B (`<= 665,600`), combined `1,087,876` B (`<= 1,310,720`); live browser HTTP `200 OK` on both files (`http://127.0.0.1:8766`); preload count `= 4` (`0` for `SawalaLigarMono`) |
| `AC-002` | `#specimen` (`specimen-tester.js`, `showcase.css`, `index.html`) | `MET ✅` | `verify-phase1.mjs` PASS + live browser click `[data-specimen-variant="ligar"]` & `[data-specimen-slope="italic"]` verified `data-font-variant="ligar"`, `data-ligature-mode="standard"`, `#specimen-tier-badge` = `"Tier A Core WOFF2 (400)"` (upright & italic) and `"Tier B Weight (700 · Synthesized from Core)"` at `700` |
| `AC-003` | `#polyglot-runner` (`polyglot-runner.js`, `typography.css`, `index.html`) | `MET ✅` | `verify-phase2.mjs` PASS + live browser verified 3 segmented pills (`44px` height at `375px`), exclusive `aria-pressed`, `data-font-variant="ligar"` with `data-ligatures="standard"` (never `"ligar"`), `data-ligatures="nl"` on NL, and `0` horizontal overflow at `375px` |
| `AC-004` | `#distributions`, SEO tags, `distributions.html`, `ligatures.html` | `MET ✅` | `verify-phase2.mjs` + `verify-phase3.mjs` PASS + live browser verified `6` cards (`3×2` at `1440px`, `2×3` at `1024px`, `1×6` at `375px`), 7-column × 9-row table contained inside `.doc-table-wrap` with `scrolledX = 0`, `"6 distributions"` badge, `"seven"` Tier A webfonts prose, and `ligatures.html:91` parity |
| `AC-005` | `#setup` (`config-generator.js`, `index.html`), `installation.html` | `MET ✅` | `verify-phase2.mjs` PASS across all 6 families × 7 editors (`42` combinations) confirming JetBrains `Enable ligatures = false` on NL and `true` on Ligar + live browser verified `#config-code` updates to `'Sawala Ligar Mono', monospace` + `verify-phase3.mjs` confirmed `installation.html` parity |
| `AC-006` | `#glyphs` (`glyph-matrix.js`), `#terminal` (`terminal-preview.js`, `index.html:1198`) | `MET ✅` | `verify-phase3.mjs` PASS + adversarial check verified exact `private-build-plans.toml:36,54` (`'y'`) and `:37,55` (`'0'`) + live browser verified `#terminal-seg-runtime` reads `"v1.1.0 · TS 5.6"` and `0` stale `v1.0.0` strings |
| `AC-007` | All `web-docs/js/*.js`, 4 HTML files, `git diff --name-only` | `MET ✅` | `node --check` PASS on all 8 JS modules; `verify-phase3.mjs` verified strict `'self'` CSP on all 3 subpages, `0` inline styles, `0` broken links/anchors, `0` `CONTEXT.md` `_Avoid_` violations; live browser recorded `0` console errors, `0` CSP violations, `0` failed requests out of `50` requests; `ADR-0001` untouched |
| `AC-008` | `DESIGN.md`, `index.html`, `web-docs/css/*.css` | `MET ✅` | `verify-phase3.mjs` + `impeccable detect --json` (`0` new findings) verified `DESIGN.md` 6-distribution/archive sync, exactly `1` `distribution-card-featured` (`sawala-mono`), `0` secondary chromatic accents, and `44px >= 44px` mobile tap targets |

---

## 1. Uncle Bob's 5 SOLID Principles Audit

| Principle | Assessment | Status | Notes / Findings |
| :--- | :--- | :---: | :--- |
| **SRP** (Single Responsibility) | Does each module/function have only 1 reason to change? | **PASS** | Clean separation preserved across CSS layers (`tokens.css` tokens, `typography.css` `@font-face`/polyglot typography, `showcase.css` layout), ESM registries (`DISTRIBUTION_TIERS`, `CONFIG_FONT_FAMILIES`, `GLYPH_CATALOG`, `TERMINAL_PRESETS`), and DOM controllers (`specimen-tester.js`, `polyglot-runner.js`). |
| **OCP** (Open-Closed) | Are behaviors extendable without modifying core algorithms? | **PASS** | Adding `Sawala Ligar Mono` and `Sawala Ligar Mono NF` extended `DISTRIBUTION_TIERS`, `CONFIG_FONT_FAMILIES`, `TIER_A_WEIGHTS_BY_VARIANT`, `SPECIMEN_FAMILY_NAMES`, and `POLYGLOT_VARIANTS` declaratively without rewriting card iteration or editor templating algorithms. |
| **LSP** (Liskov Substitution) | Can variants/mocks substitute base interfaces cleanly? | **PASS** | `"standard"`, `"nl"`, and `"ligar"` substitute uniformly across `applySpecimenState` and `selectPolyglotVariant`; mock DOM `root` objects substitute seamlessly for browser `document` in Node ESM verification harnesses. |
| **ISP** (Interface Segregation) | Are exported module interfaces lean and cohesive? | **PASS** | Each ESM module exposes only its cohesive pure state/formatter functions (`applySpecimenState`, `selectPolyglotVariant`, `formatEditorConfig`, `resolveDistributionArchive`, `setDistributionWidthMode`) and frozen registries. |
| **DIP** (Dependency Inversion) | Do controllers depend on abstractions rather than globals? | **PASS** | Interactive controllers accept injectable `root = document` boundaries (`specimen-tester.js:126`, `polyglot-runner.js:291`, `distribution-cards.js:145`), enabling deterministic Node.js verification without jsdom or browser coupling. |

---

## 2. Pólya Heuristics Boundary Audit

### 2.1 Specialization & Limiting Cases
- [x] Empty/invalid inputs (`null`, `""`, `"unknown"`) normalize gracefully to `"standard"` / `"sawala-mono"` without uncaught exceptions (note minor prototype-key hardening `[Nit]` #2 below for direct ESM callers).
- [x] Numeric boundaries (`fontSize` clamped `[12, 48]`, `fontWeight` stepped `[100..900]` + `NaN` handling, `lineHeight` clamped `[1.2, 2.0]`) verified across all 3 specimen variants.
- [x] Network failure / offline font degradation handled cleanly via `font-display: swap` + system monospace fallback (`--font-mono-ligar`), verified empirically during Phase 3 live browser test prior to `.woff2` placement (`0` JS runtime errors).

### 2.2 Test by Dimension
- [x] Byte-size thresholds validated strictly in exact binary bytes (`515,940 <= 665,600` B, `571,936 <= 665,600` B, `1,087,876 <= 1,310,720` B).
- [x] Viewport dimensions verified at `375px` (mobile 1-up, `44px` tap targets), `1024px` (tablet 2-up), and `1440px` (desktop 3-up) without mixing CSS breakpoints (`1200px` tablet breakpoint retained untouched).
- [x] Enum domains bounded: `data-font-variant ∈ {"standard", "nl", "ligar"}` while `data-ligature-mode` and `data-ligatures ∈ {"standard", "nl"}` strictly.

### 2.3 Inductive Invariant Verification (Pólya, p. 114)
- [x] Base Case 0: Initial default state renders `Sawala Mono` (`standard`, `calt: 1`, `400`, `upright`) with exactly 1 active pill (`aria-pressed="true"`).
- [x] Base Case 1: Single variant switch (`standard` -> `ligar` or `nl`) updates DOM attributes, tier badge, and status text atomically.
- [x] Inductive Step ($n \to n+1$): Chained transitions across weights (`400` -> `700` -> `400`), slopes (`upright` -> `italic`), polyglot languages, distribution width modes (`normal` <-> `semi-extended`), and 6 × 7 config selections preserve all DOM invariants with zero state leakage.

### 2.4 All Data & Whole Condition Audit (Pólya, p. 33)
- [x] All Data Check: All 6 distributions from `CONTEXT.md` and CI workflows (`build.yml`, `patch-nerd-font.yml`) are accounted for across `index.html`, all 3 subpages, all 6 modified JS modules, and `DESIGN.md`.
- [x] Whole Condition Check: All constraints (`CON-001`–`CON-006`), `ADR-0001`, `ADR-0002`, and `DESIGN.md` Linear rules verified.

### 2.5 Indirect Proof Audit (Reductio ad Absurdum - Pólya, p. 162–171)
- [x] Fail-Fast Contradiction: Negative assertions explicitly confirm `"ligar"` is **never** written to `data-ligature-mode` or `data-ligatures`, and `Sawala Ligar Mono NL` never appears anywhere in the codebase.
- [x] Typed Domain Rejection: Invalid variants fall back cleanly to `"standard"` / `"sawala-mono"` without emitting `"undefined"` in UI clicks or standard invalid strings.

### 2.6 Symmetry & Round-Trip Invariant Audit (Pólya, p. 199–200)
- [x] Reversible Operations: Switching `standard` -> `ligar` -> `nl` -> `standard` restores identical DOM attributes, `fontFeatureSettings`, and badge labels; `formatEditorConfig` never mutates frozen `EDITOR_CONFIG_SNIPPETS`, so switching `sawala-mono-nl` -> `sawala-ligar-mono` cleanly restores `Enable ligatures = true` and `"editor.fontLigatures": true`.
- [x] Resource Lifecycle Symmetry: Pure static client scripts attach event listeners once inside `init*` entrypoints with zero runaway intervals, timers, or leaked background handles.

### 2.7 Variation of the Problem & Boundary Audit (Pólya, p. 209–214)
- [x] Domain Variation: Exhaustively tested all `42` Config Generator combinations (`6` families × `7` editors), `12` distribution archive resolutions (`6` tiers × `2` width scopes), `3` specimen variants × upright/italic × Tier A/B weights, and `4` HTML pages across `3` viewport sizes.

---

## 3. Clean Code & Boy Scout Rule Verification

- **Intention-Revealing Names:** `TIER_A_WEIGHTS_BY_VARIANT`, `SPECIMEN_FAMILY_NAMES`, `POLYGLOT_VARIANTS`, `selectPolyglotVariant`, `normalizeSpecimenVariant`, and `--font-mono-ligar` clearly express domain intent without ambiguity.
- **Small Functions:** All added/updated functions (`normalizeSpecimenVariant`, `selectPolyglotVariant`, `formatEditorConfig`) are concise (< 35 lines), flat, and operate at a single level of abstraction.
- **Boy Scout Rule:** Removed dead `.polyglot-runner__calt-toggle` mobile CSS rules (`typography.css`), fixed the latent JetBrains `"Enable ligatures = false"` bug (`config-generator.js:166`), and updated stale `"4-Tier"` JSDoc comments in `distribution-cards.js` (1 residual CSS comment logged as `[Nit]` #3).
- **Architectural Pragmatism & Scope Check:** Zero over-engineering; adheres strictly to the established zero-build ESM static showcase architecture without introducing bundlers, frameworks, or unnecessary abstractions.
- **Zero Suppression Anti-Cheat:** Verified `0` linter/type suppressions or weakened tests across the entire diff.

---

## 4. Defensive Security & Invariant Audit

| Security Vector | Assessment & Verification Criteria | Status | Notes / Findings & Verification Recipes |
| :--- | :--- | :---: | :--- |
| **Injection & Second-Order Sinks** | SQL/NoSQL queries parameterized; shell/HTML outputs sanitized; data stored safely does not become dangerous in downstream sinks | `PASS` | Static client-only showcase with zero DB/shell sinks; all rendered HTML strings originate strictly from `Object.freeze` in-module constants (`polyglot-runner.js`, `glyph-matrix.js`, `terminal-preview.js`) with `escapeHtml` applied on token outputs. |
| **Tenant & Data Isolation Lifecycle** | Row-level/query-level filtering; cache/path namespacing | `N/A` | Stateless public static documentation site with no user accounts or multi-tenant data stores. |
| **Auth & Access Control (BOLA/IDOR)** | Authentication & RBAC/ABAC checks on mutations | `N/A` | Public read-only static documentation site with zero auth or write APIs. |
| **AI, LLM & MCP Agentic Boundaries** | Code-level authorization & prompt injection isolation | `N/A` | No runtime AI/LLM/MCP integrations in the web showcase. |
| **DoS, Amplification & Cancellation** | Guard against ReDoS, $O(n^2)$ parsing, unbounded client buffering | `PASS` | Simple linear regex/string replacements on fixed small snippet strings (`< 400` chars); zero user-controlled regexes or recursive parsers. |
| **SSRF & Outbound Network Guards** | Outbound URL allowlisting & redirect prevention | `N/A` | Zero server-side outbound fetchers; client CSP restricts `connect-src` to `'self' https://api.github.com`. |
| **Web & Identity Boundaries** | JWT/OAuth/CORS/cookie hygiene | `PASS` | Strict `Referrer-Policy: strict-origin-when-cross-origin` on all 4 HTML pages; zero cookies, zero JWT/OAuth flows, zero permissive CORS headers. |
| **Client-Side Sinks & DOM** | Zero unescaped `innerHTML` with untrusted data; CSP enforcement; prototype-chain lookup hygiene | `PASS` | Strict `'self'` CSP on all 3 subpages (`0` `'unsafe-inline'`, `0` inline `<style>`/`style=""` across all 4 HTML files); all `target="_blank"` links enforce `rel="noopener noreferrer"`; `0` CSP violations observed in live browser. Non-blocking ESM prototype-key hardening logged under `[Nit]` #2 (`Object.hasOwn`). |
| **Destructive File/Path Guards** | `realpath()` containment on dynamic file deletions | `N/A` | No server-side or CLI file operations in Wave 2 scope. |
| **Zero Secret Exposure & Git Hygiene** | Zero hardcoded API keys, tokens, or passwords | `PASS` | `git diff` audited end-to-end; zero credentials, tokens, or private keys present. |
| **CI/CD, Supply-Chain & Provenance** | Lockfiles, workflow injection, SHA pinning | `PASS` | Zero changes to `.github/workflows/*`, `package.json`, or lockfiles; zero new external CDN dependencies introduced (`CON-001`, `CON-003`). |
| **Desktop, Mobile & Local-IPC** | Deep links, webview bridges, local IPC | `N/A` | Web-only static documentation showcase. |
| **Async Queues, Webhooks & Idempotency** | Queue deduplication & HMAC verification | `N/A` | No async queues or webhooks. |
| **Cloud Config & Workload Secret Containment** | Deployment overlays, TLS, IMDSv1 | `N/A` | Static GitHub Pages hosting only. |
| **Binary, Memory & FFI Safety** | Native/FFI bounds & binary header integrity | `PASS` | Both newly added binary assets (`SawalaLigarMono-Regular.woff2`, `SawalaLigarMono-Italic.woff2`) verified with valid `wOF2` magic header bytes (`0x77 0x4F 0x46 0x32`) and bounded file sizes (`<= 650 KB` each). |
| **Wildcard & Code Debt Smells** | `temp`/`hack`/`TODO`, dead comments, subtle DOM mismatches | `PASS` | Audited across all 14 files; zero `TODO`/`FIXME`/`HACK` markers introduced. Minor pre-hydration HTML fallback drift, residual CSS comment, and pre-existing `#polyglot-tabpanel` selector mismatch documented in §6. |

---

## 5. Database, Caching & Performance Audit (Keep-or-Revert Gate)

- **Query & Index Verification (`EXPLAIN ANALYZE`):** `N/A` — Zero database queries (static HTML/CSS/ESM site).
- **Cache Invalidation & Stampede Protection:** `N/A` — Static GitHub Pages asset delivery with standard HTTP caching.
- **Performance Attempt Ledger (Keep-or-Revert Rule):** `Verified` — On-demand loading of `SawalaLigarMono-{Regular,Italic}.woff2` via `@font-face` (`font-display: swap`) with **zero** new `<link rel="preload">` tags (`index.html` retains exactly `4` preloads) preserves initial First Contentful Paint / critical preload budget (`CON-002`, `[ASSUMPTION-002]`). Combined new WOFF2 payload (`1,087,876` B = `1.04 MB`) is comfortably under the `1.25 MB` (`1,310,720` B) ceiling (`[ASSUMPTION-004]`).

### 5.5 Frontend, Accessibility & UI Disqualifier Audit (`UI-ENGINEERING-GUIDE.md`)
- **4 Mandatory UI States & Breakpoints (`375px` / `1024px` / `1440px`):** `Verified` — Tested live across `1440×900`, `1024×900`, and `375×812`:
  - **Loading:** `font-display: swap` renders fallback metrics cleanly with zero layout collapse.
  - **Empty:** Specimen textarea preserves non-collapsing placeholder (`WATERMARK_PLACEHOLDER`).
  - **Error:** Clipboard fallback (`copyConfigWithFallback`) and missing-font fallback both degrade without runtime exceptions.
  - **Populated / Success:** All 6 distribution cards (`3×2` desktop, `2×3` tablet, `1×6` mobile), 7-column comparison table (contained in `.doc-table-wrap`), 3-pill Polyglot Runner, and 3-family Specimen Tester render cleanly with `scrolledX = 0` across all 4 pages.
- **WCAG 2.1 AA & Keyboard Accessibility:** `Verified` — Semantic `<button type="button">` pills with binary `aria-pressed` (exclusive active state), `role="group"` with `aria-label`, `aria-live="polite"` status badges, `>= 44px` (`44px` measured) mobile touch target heights at `375px`, and preserved Linear `#f7f8f8`/`#010102` high-contrast tokens.
- **Zero 6 UI Disqualifiers, 8 Banned AI Defaults & Clean Console:** `Verified` — `0` horizontal overflow, `0` overlapping elements, `0` broken assets (`50/50` HTTP `200` requests across all 4 pages including both `SawalaLigarMono-*.woff2` binaries), `0` raw `undefined` strings, `0` secondary chromatic accents/gradients, and **`0` console errors / `0` CSP violations** in an isolated browser session.

---

## 6. Remediation Action Items

### Categorized Findings (`[Important]` ➔ `[Nit]` ➔ `[Pre-existing]`)

**No blocking issues found (`[Important]: 0`).** All 3 non-blocking `[Nit]` polish items and `[Pre-existing]` #4 were surgically remediated via `/to-code` on `2026-11-20` and verified in `verify-phase3.mjs`.

1. **`[Nit — REMEDIATED ✅]` `index.html:1076` - `shrink:` Sync static pre-hydration TOML line citation for Digit `'0'`**
   - **Status:** **FIXED (`2026-11-20`)** — Updated `#glyph-inspector-toml` static HTML fallback from `private-build-plans.toml:37,54` to `private-build-plans.toml:37,55`.
   - **Bug Class & Sibling Sweep:** `SSR / Pre-Hydration Copy Drift` — Checked sibling initial inspector values (`index.html:1072`, `index.html:1198`); `#terminal-seg-runtime` and `#glyph-inspector-toml` are both in 100% parity with hydrated JS.
   - **What this was:** Initial HTML fallback text inside `<span class="glyph-inspector-field__value" id="glyph-inspector-toml">private-build-plans.toml:37,54</span>`.
   - **Applied Surgical Diff:**
     ```html
     <!-- Before (index.html:1076) -->
     <span class="glyph-inspector-field__value" id="glyph-inspector-toml">private-build-plans.toml:37,54</span>

     <!-- After (index.html:1076) -->
     <span class="glyph-inspector-field__value" id="glyph-inspector-toml">private-build-plans.toml:37,55</span>
     ```

2. **`[Nit — REMEDIATED ✅]` `web-docs/js/polyglot-runner.js:153,294`, `web-docs/js/config-generator.js:159-164`, `web-docs/js/terminal-preview.js:152` - `stdlib:` Guard lookup maps with `Object.hasOwn()` against prototype-chain keys**
   - **Status:** **FIXED (`2026-11-20`)** — Hardened `POLYGLOT_SNIPPETS`, `POLYGLOT_VARIANTS`, `EDITOR_CONFIG_SNIPPETS`, `CONFIG_FONT_FAMILIES`, and `TERMINAL_PRESETS` lookups with `Object.hasOwn(...)` and added `["toString", "constructor", "valueOf", "__proto__"]` regression assertions in `verify-phase3.mjs`.
   - **Bug Class & Sibling Sweep:** `Unchecked Prototype-Chain Dictionary Lookup` — Swept all showcase JS modules (`polyglot-runner.js`, `config-generator.js`, `terminal-preview.js`, `main.js`, `specimen-tester.js`).
   - **Applied Surgical Diff:**
     ```javascript
     // polyglot-runner.js:153 & :294
     const snippet = Object.hasOwn(POLYGLOT_SNIPPETS, langKey)
     	? POLYGLOT_SNIPPETS[langKey]
     	: POLYGLOT_SNIPPETS.typescript;
     const meta = Object.hasOwn(POLYGLOT_VARIANTS, variant)
     	? POLYGLOT_VARIANTS[variant]
     	: POLYGLOT_VARIANTS.standard;

     // config-generator.js:159-164
     const snippet = Object.hasOwn(EDITOR_CONFIG_SNIPPETS, editorId)
     	? EDITOR_CONFIG_SNIPPETS[editorId]
     	: EDITOR_CONFIG_SNIPPETS.vscode;
     const familyMeta = Object.hasOwn(CONFIG_FONT_FAMILIES, familyVariantKey)
     	? CONFIG_FONT_FAMILIES[familyVariantKey]
     	: CONFIG_FONT_FAMILIES["sawala-mono"];

     // terminal-preview.js:152
     const preset = Object.hasOwn(TERMINAL_PRESETS, presetId)
     	? TERMINAL_PRESETS[presetId]
     	: TERMINAL_PRESETS.neovim;
     ```

3. **`[Nit — REMEDIATED ✅]` `web-docs/css/showcase.css:1273` - `shrink:` Update residual `"4-Tier"` CSS section header comment**
   - **Status:** **FIXED (`2026-11-20`)** — Updated `web-docs/css/showcase.css:1273` section banner to `7. 6-Distribution Matrix (#distributions, REQ-004, AC-004)`.
   - **Applied Surgical Diff:**
     ```css
     /* Before (web-docs/css/showcase.css:1273) */
        7. 4-Tier Distribution Matrix (`#distributions`, REQ-006, AC-011, AC-012)

     /* After (web-docs/css/showcase.css:1273) */
        7. 6-Distribution Matrix (`#distributions`, REQ-004, AC-004)
     ```

4. **`[Pre-existing — REMEDIATED ✅]` `web-docs/js/polyglot-runner.js:160` vs `index.html:284` - `reuse:` Polyglot tabpanel `aria-labelledby` targets `#polyglot-viewport`**
   - **Status:** **FIXED (`2026-11-20`)** — Updated `selectLanguage` to query `#polyglot-viewport` so switching Polyglot language tabs dynamically updates `aria-labelledby` to the active tab's `id`.
   - **Applied Surgical Diff:**
     ```javascript
     // Before (web-docs/js/polyglot-runner.js:158)
     const panelEl = root.querySelector("#polyglot-tabpanel");

     // After (web-docs/js/polyglot-runner.js:160)
     const panelEl = root.querySelector("#polyglot-viewport");
     ```

5. **`[Pre-existing]` `index.html:37` - Baseline Google Fonts comparison stylesheet warnings (`impeccable detect`)**
   - **Bug Class & Sibling Sweep:** `Intentional Comparison Baseline` — 7 pre-existing `design-system-font` warnings (`Fira Mono`, `Inconsolata`, `JetBrains Mono`, `Reddit Mono`, `Ubuntu Mono`, `Victor Mono`) introduced in the earlier comparison-slider commit (`fast-track-mini-plan-2026-11-16.md`).
   - **What this is:** External comparison-font `<link>` stylesheet used strictly inside `#comparison-stage`.
   - **Problem:** Flagged by `impeccable detect` because comparison fonts are intentionally external to `DESIGN.md`.
   - **Fix:** No code change required; retain outside Wave 2 scope (`CON-004`).
   - **If we skip it:** Expected baseline detector noise on `index.html` only.

6. **`[Pre-existing]` `web-docs/css/showcase.css:390,1730` - Fluid `clamp()` advisory endpoints (`impeccable detect`)**
   - **Bug Class & Sibling Sweep:** `Pre-existing CSS Typography Advisory` — 2 pre-existing advisories (`clamp(11px, 1.8vw, 18px)` and `clamp(10px, 2.75vw, 13px)`) from commit `52eb606`.
   - **What this is:** Fluid viewport-scaled font sizes on legacy comparison/showcase elements untouched by Wave 2.
   - **Problem:** Minimum fluid endpoint sits slightly below `DESIGN.md` `12px` caption ramp at ultra-narrow widths.
   - **Fix:** Track in future visual polish pass if desired; out of scope for Wave 2.
   - **If we skip it:** Zero functional regression; matches existing deployed GitHub Pages baseline.

---

## 7. Pólya's Two Golden Questions (Looking Back & Knowledge Promotion)

- **Can you use the result?**
  - **Reusable Artifacts:**
    - `TIER_A_WEIGHTS_BY_VARIANT` (`web-docs/js/specimen-tester.js:10-23`) — `(variant, slope, weight)` Tier A webfont lookup table ready for any future variant (e.g., future Sawala Slab or SemiExtended webfont additions).
    - `POLYGLOT_VARIANTS` + `selectPolyglotVariant(variant, root)` (`web-docs/js/polyglot-runner.js:8-27,291-312`) — Reusable decoupled font-family vs. ligation-mode controller pattern.
    - 6-distribution `DISTRIBUTION_TIERS` & `CONFIG_FONT_FAMILIES` registries (`distribution-cards.js`, `config-generator.js`) — Single source of truth for future editor tabs or distribution cards.
- **Can you use the method?**
  - **Promoted Pattern:** **Decoupled Variant vs. Ligation DOM Attributes** (`data-font-variant="standard|nl|ligar"` vs. strictly binary `data-ligature-mode`/`data-ligatures="standard|nl"`) paired with **Injectable `root = document` ESM Unit Harnesses + Scratch-Isolated Mutation Checks + Live Local HTTP Browser Verification**.
  - **Memory Promotion:** Recommend recording Wave 2 completion, exact `SawalaLigarMono-{Regular,Italic}.woff2` sizes (`515,940` B / `571,936` B), the decoupled DOM attribute invariant, and the 3 minor follow-up `[Nit]`/`[Pre-existing]` items into `.agents/instructions/memory.instructions.md` via `/to-memory`.

---

## 8. Can You See It at a Glance? (Holistic Perception - Pólya, p. 59–61)

```text
[ Tier A WOFF2 Assets (web-docs/fonts/sawala-mono/) ]
  ├── SawalaMono-{Regular,Italic,SemiBold,Bold}.woff2 (Preloaded: 4)
  ├── SawalaMonoNL-Regular.woff2
  └── SawalaLigarMono-{Regular (515 KB), Italic (572 KB)}.woff2 (On-Demand swap)
                           │
                           ▼
[ CSS Token & Binding Layer (tokens.css ➔ typography.css ➔ showcase.css) ]
  ├── --font-mono / --font-mono-nl / --font-mono-ligar
  ├── [data-font-variant="ligar"] ➔ var(--font-mono-ligar) + calt: 1
  └── .distributions-grid ➔ 3×2 (>1200px) │ 2×3 (<=1200px) │ 1×6 (<=768px)
                           │
                           ▼
[ Decoupled ESM Controllers & Registries (web-docs/js/*.js) ]
  ├── specimen-tester.js (3-way variant + TIER_A_WEIGHTS_BY_VARIANT)
  ├── polyglot-runner.js (3-pill Standard│Ligar│NL, binary data-ligatures)
  ├── distribution-cards.js (6 tiers × Normal/SemiExtended CI archives)
  ├── config-generator.js (6 families × 7 editors, JetBrains NL fix)
  └── glyph-matrix.js ('y' & '0' TOML sync) + terminal-preview.js (v1.1.0)
                           │
                           ▼
[ Static Surfaces & Manifest (index.html, web-docs/pages/*.html, DESIGN.md) ]
  └── Strict 'self' CSP on subpages · 0 inline styles · 0 console/network errors
```

- **At-a-Glance Summary:** Wave 2 layers two on-demand `Sawala Ligar Mono` WOFF2 files and `--font-mono-ligar` beneath decoupled ESM controllers (`data-font-variant` for family, strictly binary `data-ligature-mode`/`data-ligatures` for `calt`) and 6-entry registries, propagating 100% parity across `index.html`, all 3 documentation subpages, and `DESIGN.md` with zero monorepo leakage.
- **Visual Diagram Validated:** `Yes` — A new engineer can trace assets, CSS selectors, JS controllers, and HTML surfaces in under 30 seconds.

---

## 9. Lean Scoreboard, Transparency & Release Readiness Gate

### 9.1 Lean Scoreboard
- **Lines Deleted:** `104` lines (removed obsolete binary `#polyglot-calt-toggle` markup/CSS/JS, outdated 4-distribution copy, and `v1.0.0` mockup literals)
- **Helpers Reused:** `5` existing showcase components/primitives reused directly (`variant-switcher-tab`, `.doc-table-wrap`, `.distribution-card`, `resolveDistributionArchive`, `applySpecimenState` clamping)
- **Net Diff Impact:** `+407` / `-104` lines (`+303` net across `14` text files + `2` compiled `.woff2` binaries totaling `1,087,876` B)

### 9.2 Scope Limitations & Transparency
- **Not checked:**
  - `document.fonts` JS inspection API inside the isolated `webview_browser` sandbox (`page.evaluate` is disabled by sandbox policy); mitigated by verifying HTTP `200 OK` network telemetry (`content-length: 515940` & `571936`), valid `wOF2` binary magic headers (`mutation-check.mjs`), and visual rendering in browser screenshot.
  - Real-device Safari/iOS and Firefox cross-engine font rendering (verified locally in Chromium-based webview across `375px` / `1024px` / `1440px`).
  - Live GitHub Pages deployment URL post-push (`.github/workflows/pages.yml` deploys automatically on push to `main`).
- **Residual Risks / Upgrade Triggers:**
  - **Working Tree Selective Staging:** Ensure only intended Wave 2 files (plus user-updated `SawalaMono*.woff2` if intentional) are staged before committing; do not accidentally commit unrelated scratch artifacts.
  - **Upgrade Trigger:** If a 7th or 8th distribution (e.g., `Sawala Ligar Mono NL`) is ever introduced in a future wave, migrate `distributions.html` comparison table from horizontal scroll to a filterable variant comparison matrix.

### 9.3 Release & Launch Readiness Gate (`GO | NO-GO`), Pre-Merge Proofs & Rollback Plan
- **Release Decision:** **`GO`** — `0 [Important]` findings, `0 CONFIRMED` security flaws, `0` Floor-Guard violations, `8/8` Acceptance Criteria (`AC-001`–`AC-008`) `MET ✅` with runtime & live HTTP `200` browser evidence.
- **Pre-Merge Runnable Proofs Checklist:**
  - [x] `Get-ChildItem web-docs/js/*.js | ForEach-Object { node --check $_.FullName }` (`ALL JS SYNTAX OK`)
  - [x] `.agents\skills\impeccable\scripts\impeccable.cmd detect --json web-docs/pages/distributions.html web-docs/pages/installation.html web-docs/pages/ligatures.html index.html web-docs/css/tokens.css web-docs/css/typography.css web-docs/css/showcase.css` (`0` new findings)
  - [x] Node ESM assertions (`verify-phase1.mjs`, `verify-phase2.mjs`, `verify-phase3.mjs`, `mutation-check.mjs`) — all passed, `AC-001` WOFF2 byte & `wOF2` header gates passed (`515,940` B + `571,936` B = `1,087,876` B)
  - [x] Live static HTTP server (`python -m http.server`) + browser audit across `1440px` / `1024px` / `375px` (`50/50` HTTP `200` requests including both `SawalaLigarMono-*.woff2`, `0` console errors, `0` CSP violations, `0` horizontal overflow)
  - [x] `git diff --name-only` & `git diff --check` (`0` monorepo/compiler/workflow leakage, `0` whitespace errors)
- **Backward Compatibility & Migration Safety:** `Verified` — Purely additive static showcase assets and progressive UI enhancements; zero database migrations or breaking URL/anchor removals.
- **Timed Rollback Plan (`< 5 Minutes` — How to Revert):**
  1. **Revert Trigger:** Any post-deploy 404 on `SawalaLigarMono-*.woff2`, CSP console error on GitHub Pages, or visual layout breakage reported on mobile/desktop.
  2. **Rollback Command / Action:** Run `git revert <wave2-commit-sha> && git push origin main` (triggers `.github/workflows/pages.yml` redeploy in `~60–90 seconds`; target RTO `< 5 minutes`).
  3. **Post-Rollback Verification:** Load `https://iosevka-mayukai.github.io/sawala-mono-dev/` and confirm HTTP `200`, `0` console errors, and restoration of the previous 4-distribution showcase.
