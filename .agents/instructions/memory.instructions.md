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

## 📝 Session Checkpoint: 2026-11-12

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 2: Implementation Planning Complete (`/to-plan`) ➔ Gate: The Pause Rule
- **Active Artifacts:**
  - `docs/discovery/sawala-mono-showcase-web-discovery.md` — Status: ✅ Finalized (Option A Static GitHub Pages approved)
  - `docs/spec/sawala-mono-showcase-web-spec.md` — Status: ✅ Finalized (12 REQs, 8 CONs, 19 ACs, ADR-0003)
  - `docs/plan/sawala-mono-showcase-web-plan.md` — Status: ✅ Finalized (10 Vertical Tracer Bullets, 8 Checkpoints, Size S/M)
  - `docs/reviews/sawala-mono-showcase-web-review.md` — Status: ⏳ Pending (Phase 4 post-implementation)
- **Achieved Milestones:**
  - Completed Problem Discovery & Feasibility Spikes for the Iosevka Sawala Mono Showcase & Documentation Web Platform (`/to-explore`).
  - Authored comprehensive Technical Specification (`docs/spec/sawala-mono-showcase-web-spec.md`) adhering to Linear Design System (`DESIGN.md`), JetBrains Mono, and Ioskeley Mono pedagogical benchmarks (`/to-spec`).
  - Authored tactical Implementation Plan (`docs/plan/sawala-mono-showcase-web-plan.md`) following the 4-phase Land-and-Expand progression with 10 vertical tracer bullets (`TASK-001` through `TASK-016`) and 8 verification/approval gates (`TASK-003`, `004`, `008`, `009`, `013`, `014`, `017`, `018`) (`/to-plan`).
  - Integrated complete visual ASCII wireframes for desktop (10 sections + CTA banner + footer), mobile (`< 768px`), 3 documentation subpages (`ligatures.html`, `installation.html`, `distributions.html`), and x-height comparison slider (§1.4).
  - Formulated full CSS token extraction (`tokens.css`), 5 UI states matrix (§1.6), master token binding table (§1.7), and Contingency Plan B (§4).
  - Verified on-disk presence of all 5 Tier A core WOFF2 webfonts in `web-docs/fonts/sawala-mono/` (400, 400i, 600, 700, NL 400).
- **Dead-Ends (Do NOT Repeat):**
  - **Attempted:** Running Biome linter directly on markdown files (`npx @biomejs/biome check docs/spec/...`).
  - **Reason:** Root `biome.json` ignores markdown files; command exits with error when pointed directly at markdown. Run Biome on root workspace for JS/JSON or verify markdown structure via dedicated scripts.
  - **Note:** See KB Dead-End #4 (Scope Proportionality).
- **Updated Files:**
  - `docs/discovery/sawala-mono-showcase-web-discovery.md` — Created discovery draft
  - `docs/spec/sawala-mono-showcase-web-spec.md` — Created technical specification (918 lines)
  - `docs/plan/sawala-mono-showcase-web-plan.md` — Created implementation plan (689 lines)
  - `.agents/instructions/memory.instructions.md` — Appended session checkpoint
- **Decisions Made:**
  - Approved pure static zero-build deployment architecture targeting GitHub Pages via root `index.html`, `web-docs/`, `.nojekyll`, and GitHub Actions (`actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`).
  - Strictly decoupled web showcase runtime from core Iosevka compiler engine (`packages/*`, `verdafile.mjs`, `package.json` remain untouched).
  - Adopted Linear Design System (`#010102` canvas, 4-tier surface ladder `#0f1011`–`#191a1b`, 1px hairlines `#23252a`, signature lavender `#5e6ad2`, zero light mode) synthesized with JetBrains Mono and Ioskeley Mono benchmarks.
- **Next Action / Pending:**
  - Await user approval across The Pause Rule to begin Phase 3: Carrying Out the Plan (`/to-code` or `/to-code auto`).
  - Execute Phase 1 (Land): `TASK-001` (Hero & Polyglot Code Runner Tracer Bullet) and `TASK-002` (Syntax highlighter & navigation orchestrator).

<!-- checkpoint-tail: Finalized Phase 0 (Discovery), Phase 1 (Spec), and Phase 2 (Plan) for Sawala Mono showcase web platform with full ASCII wireframes, tokens, and 10 tracer bullets; paused at The Pause Rule awaiting /to-code approval. -->

---

## 📝 Session Checkpoint: 2026-11-12 (Session 2: Phases 1–3 Implementation Complete)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 3: Implementation Complete (`/to-code`) ➔ Gate: Ready for Phase 4 Subpages & Hardening
- **Active Artifacts:**
  - `index.html` — Status: ✅ Complete (10 primary semantic sections + sticky nav + footer)
  - `web-docs/css/tokens.css` — Status: ✅ Complete (Linear canvas `#010102`, surface ladder 1–4, hairlines, primary `#5e6ad2`)
  - `web-docs/css/reset.css` — Status: ✅ Complete (Box-sizing, dark scrollbars, selection, reduced-motion guard)
  - `web-docs/css/typography.css` — Status: ✅ Complete (@font-face for 5 Tier A WOFF2 webfonts)
  - `web-docs/css/showcase.css` — Status: ✅ Complete (0 raw hexes, fully tokenized components)
  - `web-docs/js/main.js` — Status: ✅ Complete (Sticky nav, mobile drawer, x-height slider controller, scroll-spy)
  - `web-docs/js/polyglot-runner.js` — Status: ✅ Complete (5-language runner, line numbers, calt toggle, 1-click copy)
  - `web-docs/js/ligature-playground.js` — Status: ✅ Complete (16 coding ligatures, standard vs NL switcher)
  - `web-docs/js/specimen-tester.js` — Status: ✅ Complete (Live specimen textarea, size/weight/slope controls, placeholder guard)
  - `web-docs/js/glyph-matrix.js` — Status: ✅ Complete (86-glyph catalog, 5 categories, 96px magnified preview card)
  - `web-docs/js/terminal-preview.js` — Status: ✅ Complete (Starship/Neovim presets, inline SVG & UTF-8 Powerline symbols)
  - `web-docs/js/distribution-cards.js` — Status: ✅ Complete (4 distribution cards, Normal vs SemiExtended width switcher)
  - `web-docs/js/config-generator.js` — Status: ✅ Complete (7 editor configs, family selector, clipboard fallback)
  - `docs/plan/sawala-mono-showcase-web-plan.md` — Status: ✅ Updated (`TASK-001` through `TASK-014` marked complete with Execution Log §9)
  - `docs/ARCHITECTURE.md` — Status: ✅ Updated (Topography §6.1 & Seams §6.2)
- **Achieved Milestones:**
  - Implemented and verified Phase 1: Land (`TASK-001`..`TASK-004`) — Minimal viable tracer bullet with Hero, Tier A WOFF2 webfonts, and 5-language Polyglot runner.
  - Implemented and verified Phase 2: Core Experience (`TASK-005`..`TASK-009`) — 4-up ergonomic anatomy, split-curtain x-height slider, 16-operator ligature matrix, and live type specimen workbench.
  - Implemented and verified Phase 3: Expand (`TASK-010`..`TASK-014`) — 86-glyph character inspector with private-build-plans.toml metadata, Nerd Font terminal environment mockup, 4-tier distribution cards, and 7-editor quick setup generator with clipboard fallback.
  - Passed all automated verification assertions and Impeccable design detector (`impeccable detect --json` output: `[]`, 0 findings).
- **Decisions Made:**
  - Added Tokyo Night `--syntax-*` tokens to `DESIGN.md` colors to formally register the code syntax highlighting palette with zero design drift.
  - Preserved upstream monorepo compiler packages strictly untouched (`CON-005`).
- **Next Action / Pending:**
  - Proceed to Phase 4: Modular Documentation Subpages (`web-docs/pages/{ligatures,distributions,installation}.html`), SEO/CSP hardening, root `.nojekyll`, and automated GitHub Pages CI/CD workflow (`.github/workflows/pages.yml`).

<!-- checkpoint-tail: Successfully implemented and verified Phases 1, 2, and 3 (TASK-001 through TASK-014) of the Sawala Mono showcase web platform; planning document and architecture map updated, ready for Phase 4. -->

---

## 📝 Session Checkpoint: 2026-11-12 (Session 3: Phase 4 Complete — Full Web Showcase & CI/CD Ready)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 3: Implementation Complete (`/to-code`) ➔ Gate: Ready for Phase 4 Quality Review (`/to-review`)
- **Active Artifacts:**
  - `index.html` — Status: ✅ Complete (10 semantic sections, strict CSP, Open Graph/Twitter cards, WCAG 2.1 AA landmarks)
  - `web-docs/pages/ligatures.html` — Status: ✅ Complete (55 OpenType `calt` programming ligatures catalog across 5 filter categories + All)
  - `web-docs/pages/distributions.html` — Status: ✅ Complete (4-variant specification matrix, 9 weights table, Normal 500 vs SemiExtended 548 widths)
  - `web-docs/pages/installation.html` — Status: ✅ Complete (OS-tabbed installation guide for Windows, macOS Font Book, Linux `fc-cache`, Homebrew/Arch CLI)
  - `.nojekyll` — Status: ✅ Complete (Empty file bypassing Jekyll on GitHub Pages)
  - `.github/workflows/pages.yml` — Status: ✅ Complete (`actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`)
  - `docs/plan/sawala-mono-showcase-web-plan.md` — Status: ✅ Updated (`TASK-001` through `TASK-017` marked complete; paused at `TASK-018` user sign-off)
  - `docs/ARCHITECTURE.md` — Status: ✅ Updated (Topography §6.1 includes `web-docs/pages/`, `.nojekyll`, and `.github/workflows/pages.yml`)
- **Achieved Milestones:**
  - Implemented `TASK-015` (Modular Documentation Subpages Slice): generated `web-docs/pages/ligatures.html` (55 ligatures), `web-docs/pages/distributions.html`, and `web-docs/pages/installation.html`, wired to `filterCatalog`, `initCatalogFilters`, `activateDocTab`, and `initDocTabPanels` in `web-docs/js/main.js` and Section 11 styles in `web-docs/css/showcase.css`.
  - Implemented `TASK-016` (SEO Social Graph, CSP, WCAG 2.1 AA Hardening & GitHub Pages CI/CD Slice): created `.nojekyll` and `.github/workflows/pages.yml`, verified strict CSP, Open Graph / Twitter Card tags, `rel="noopener noreferrer"` on external links, and keyboard `ArrowLeft`/`ArrowRight`/`Home`/`End` tab navigation.
  - Executed `TASK-017` (`check:full`): ran `npx @biomejs/biome check .` (0 errors across 284 files), `.agents/skills/impeccable/scripts/impeccable.cmd detect --json` (`[]` zero findings across `index.html`, all 3 subpages, and all 5 CSS files), and `verify-phase4.mjs` (all 25 deliverables, links, and unit tests passing).
- **Next Action / Pending:**
  - Await user confirmation at `TASK-018` (`APPROVAL` gate) or proceed to `/to-review` for formal Phase 4 SOLID & Security Audit (`docs/reviews/sawala-mono-showcase-web-review.md`).

<!-- checkpoint-tail: Completed all 4 phases (TASK-001 through TASK-017) of the Iosevka Sawala Mono showcase and documentation web platform with 0 Impeccable findings and 0 Biome errors; ready for user sign-off (TASK-018) and /to-review. -->

---

## 📝 Session Checkpoint: 2026-11-13 (Architecture Topography Sync & Quality Ratchet Calibration)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Cross-Cutting Utility: Architecture Topography Mapping (`/to-map`) Complete
- **Active Artifacts:**
  - `docs/ARCHITECTURE.md` — Status: ✅ Updated (`last_updated: 2026-11-13`, aligned across §§1–9 with current repo state)
  - `private-build-plans.toml` — Status: ✅ Verified (current design/italic variant selections cross-checked)
  - `biome.json` — Status: ✅ Audited (scope verified: 97 `.mjs` files across `packages/*/src`, `tools/*/src`, `verdafile.mjs`)
- **Achieved Milestones:**
  - Conducted full source-driven reality scan of the repository on branch `dev` (after commits through `7b45eba`) and identified drift in `docs/ARCHITECTURE.md` (`2026-11-11`).
  - Surgically updated `docs/ARCHITECTURE.md` across §§1–9:
    - Aligned §1 variant examples with `private-build-plans.toml` (`a = "double-storey-tailed"` / `"single-storey-earless-corner-tailed"`, `zero = "reverse-slashed"` / `"tall-reverse-slashed"`, `i`/`l = "serifed-semi-tailed"`, `ss03` baseline).
    - Integrated the 3rd CI/CD & Presentation pipeline (`.github/workflows/pages.yml`, `index.html`, `.nojekyll`, `web-docs/`) into §2 Tech Stack, §3.1 C4 Topology, §4.1 Layer Breakdown, §5.1 Phase C, §5.2 `INV-008`, §7 Entry Points, and §9 Extension Seams.
    - Updated §6.1–§6.2 topography with `docs/bug-reports/`, `docs/releases/`, `web-docs/assets/`, `web-docs/vendor/prism/`, `sawala-mono-hero-img.jpg`, `packages/geometry-cache/`, `packages/util/`, and `tools/`.
    - Calibrated §8.2–§8.4 verification commands and Biome ratchet ceiling to match observed output (`npx @biomejs/biome check .` checked 97 `.mjs` files: 3 pre-existing upstream errors, 5 warnings in `packages/font-kits` & `packages/util`, 1 deprecation info on `biome.json`; recorded under `EX-002`, expiring `2027-02-11`; noted `npm ci` requirement for `@iarna/toml` local parse check since `node_modules` is absent locally).
    - Verified `npm ls --workspaces --depth=0` exits with code `0`.
- **Dead-Ends (Do NOT Repeat):**
  - **Attempted:** Running `node -e "require('@iarna/toml')..."` directly in a fresh local workspace without `node_modules/`.
  - **Reason:** Local `node_modules/` does not exist until `npm ci` runs (or inside `iosevka-builder:latest` Docker container); `npx @biomejs/biome check .` works standalone, while `@iarna/toml` requires `npm ci` first.
  - **Note:** Documented in `docs/ARCHITECTURE.md` §8.2 note; also note Biome scope excludes `web-docs/js/*.js`.
- **Updated Files:**
  - `docs/ARCHITECTURE.md` — Surgically updated §§1–9 to reflect current 3-pipeline architecture, web showcase seam, directory tree, and calibrated Biome/verification ratchets
  - `.agents/instructions/memory.instructions.md` — Appended session checkpoint for 2026-11-13
- **Decisions Made:**
  - Calibrated `docs/ARCHITECTURE.md` §8.3 Biome ratchet ceiling to `<= 3 errors / <= 5 warnings` with time-bounded exception `EX-002` (`2027-02-11`) rather than claiming `0 errors / 0 warnings` against untouched upstream Iosevka v34.9.1 `.mjs` files.
  - Preserved `AGENTS.md` and `README.md` untouched since both already contain valid discovery links to `docs/ARCHITECTURE.md`.
- **Next Action / Pending:**
  - Working tree contains changes to `docs/ARCHITECTURE.md` and `.agents/instructions/memory.instructions.md` ready for user review and on-demand git commit.

<!-- checkpoint-tail: Synced docs/ARCHITECTURE.md with current 3-pipeline architecture (font compiler, Nerd Font patcher, GitHub Pages showcase), updated private-build-plans.toml variant docs, and calibrated Biome quality ratchets (EX-002). -->

---

## 📝 Session Checkpoint: 2026-11-16 (Review Remediation, Releases Decoupling, Favicons, README & Comparison Font Switcher)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 5 Bug Remediation (`GO`) + Fast-Track Feature Polish (`/to-quick-fix`) Complete
- **Active Artifacts:**
  - `docs/reviews/sawala-mono-showcase-web-review.md` — Status: ✅ Approved (Iteration 3 `GO`: `0 [Important]`, `0 [Nit]`, `1 [Pre-existing]` upstream Biome)
  - `docs/bug-reports/sawala-mono-showcase-web-bugfix.md` — Status: ✅ Resolved (`BUG-101`..`BUG-20X` verified)
  - `docs/spec/sawala-mono-showcase-web-spec.md` — Status: ✅ Synced (`cap = 735`, `REQ-012`, `CON-004` Plan B waiver, `CON-006` scoped Google Fonts CSP on `index.html`, `AC-011`, `AC-012`, `AC-019`)
  - `docs/plan/sawala-mono-showcase-web-plan.md` — Status: ✅ Synced (`735` metrics & truthful §9 monorepo verification log)
  - `docs/plan/fast-track-mini-plan-2026-11-16.md` — Status: ✅ Completed (6 Google Fonts comparison baselines + full-alphabet JS function specimen)
- **Achieved Milestones:**
  - Closed all 6 `[Important]` and 3 `[Nit]` findings from Iteration 2 review across Spec, Plan, HTML, CSS, JS, Prism tokenizer, and `_site` staging in `.github/workflows/pages.yml` (`TOTAL: 24 | PASS: 24 | FAIL: 0` at review closure, with live desktop & mobile Chromium checks at `0` console/CSP/overflow errors).
  - Decoupled hardcoded `v1.0.0` version/download links so distribution cards (`index.html`, `web-docs/js/distribution-cards.js`) and `web-docs/pages/distributions.html` route directly to `https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases`, removed `.distribution-card__archive` captions and navbar/hero/CTA/footer `v1.0.0` badges, and updated `web-docs/pages/installation.html` CLI commands to `<tag>` placeholders.
  - Created 4 brand-mark favicons matching `.top-nav__brand-mark` (`#141516`, `#34343a`, `#828fff` `=>` arrow) in `web-docs/assets/` (`favicon.svg`, `favicon-32x32.png`, `favicon.ico`, `apple-touch-icon.png`) and linked them across all 4 HTML pages.
  - Updated `README.md` with live showcase badge/links (`https://iosevka-mayukai.github.io/sawala-mono-dev/`), enabled the public GitHub Release badge, added Pages deploy badge, removed `Private Development` badge, and corrected Linux `.ttf` copy path (`SawalaMono/TTF/*.ttf`).
  - Executed `fast-track-mini-plan-2026-11-16.md`: upgraded `#comparison-slider-panel` with a mirrored 5-line JavaScript function (`const scan = ...` showcasing `A–Z`, `a–z`, `0–9`, `0O`, `1lI`, `=>`, `!==`, `===`) and a 6-font Google Fonts CDN selector (`JetBrains Mono`, `Inconsolata`, `Fira Mono`, `Reddit Mono`, `Victor Mono`, `Ubuntu Mono`) verified at `TOTAL: 27 | PASS: 27 | FAIL: 0` (`repro-review-findings.mjs`), `node --check` exit `0`, compiler seam clean, and live Chromium (`0` console/CSP errors, all 6 `.woff2` fonts HTTP 200).
- **Dead-Ends (Do NOT Repeat):**
  - **Attempted:** Pushing old shallow-grafted local `main` (`60e51ec`, parent `cea353b` in `.git/shallow`) to `github/main`.
  - **Reason:** Shallow repository missing object `2487637bb71f41b2a66134afd9faa6c316e5a438` caused `remote unpack failed: index-pack failed`, and old `main` lacked `dev` history (`d0d45ce..HEAD`).
  - **Correct Solution:** Push standalone `dev` history via `git push github dev:refs/heads/main`, then sync local `main` with `git fetch github && git branch -f main github/main`.
- **Updated Files:**
  - `index.html` — Removed version badges/captions, pointed distributions to Releases page, wired favicons, scoped Google Fonts CSP (`fonts.googleapis.com` / `fonts.gstatic.com`), added 6-font comparison selector & full-alphabet JS specimen
  - `web-docs/js/main.js` — Added `COMPARISON_FONTS` & `setComparisonFont` controller inside `initComparisonSlider`
  - `web-docs/js/distribution-cards.js` — Switched `RELEASES_PAGE_URL` routing across both Normal and SemiExtended scopes
  - `web-docs/css/showcase.css` — Removed `.distribution-card__archive`, added `.comparison-font-bar` & `[data-comparison-font]` font/ligature mapping with `white-space: pre` code lines
  - `web-docs/css/typography.css` — Cleaned up unused `.top-nav__brand .status-badge` mobile rule
  - `web-docs/assets/{favicon.svg,favicon-32x32.png,favicon.ico,apple-touch-icon.png}` — Created brand favicons
  - `web-docs/pages/{distributions,installation,ligatures}.html` — Linked favicons, removed `v1.0.0` navbar/footer labels, updated release links/CLI `<tag>` placeholders
  - `README.md` — Replaced `Private Development` badge with live Release + Pages + Web Docs links/badges and accurate Linux TTF path
  - `docs/spec/sawala-mono-showcase-web-spec.md`, `docs/plan/sawala-mono-showcase-web-plan.md`, `docs/plan/fast-track-mini-plan-2026-11-16.md`, `docs/reviews/sawala-mono-showcase-web-review.md`, `docs/bug-reports/sawala-mono-showcase-web-bugfix.md` — Synced spec, plan, review (`GO`), bugfix (`Resolved`), and mini-plan (`Completed`)
- **Decisions Made:**
  - Loaded the 6 comparison baseline fonts (`JetBrains Mono`, `Inconsolata`, `Fira Mono`, `Reddit Mono`, `Victor Mono`, `Ubuntu Mono`) via Google Fonts CDN (`wght@400&display=swap`), scoping CSP `fonts.googleapis.com`/`fonts.gstatic.com` exclusively to `index.html` while keeping documentation subpages strictly `'self'`.
  - Decoupled static showcase release CTAs to GitHub Releases landing page rather than hardcoding tag-specific `.zip` URLs on cards.
- **Next Action / Pending:**
  - Commit all uncommitted showcase, favicon, `README.md`, spec/plan, and memory updates on `dev` and push to `github dev` and `github dev:refs/heads/main` for GitHub Pages deployment.

<!-- checkpoint-tail: Completed Iteration 2 remediation (GO), Releases CTA decoupling, version badge removal, brand favicons, README live links, and 6-font full-alphabet JS comparison switcher; ready to commit and push to dev/main. -->


---

## 📝 Session Checkpoint: 2026-11-18 (Sawala Ligar Mono Variant: Plan Clarification, Implementation & Iteration 2 Review GO)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 4: Code Review Complete (Iteration 2 `GO`) ➔ Gate: Tier 2 Human Approval (`>= 2 Approvals`) & GitHub Actions CI Compilation
- **Active Artifacts:**
  - `docs/discovery/sawala-ligar-mono-discovery.md` — Status: ✅ Finalized (committed at `60a007f`)
  - `docs/spec/sawala-ligar-mono-spec.md` — Status: ✅ Approved (`v1.1.0`, committed at `60a007f`)
  - `docs/audit/sawala-ligar-mono-spec-clarification.md` — Status: ✅ Finalized (Readiness Score: 100/100, committed at `60a007f`)
  - `docs/audit/sawala-ligar-mono-plan-clarification.md` — Status: ✅ Finalized (Readiness Score: 100/100, committed at `60a007f`)
  - `docs/plan/sawala-ligar-mono-plan.md` — Status: 🔄 In Progress (`v1.1.0`, `TASK-001`–`TASK-010` implemented, `TASK-011` `APPROVAL` open pending human sign-off)
  - `docs/reviews/sawala-ligar-mono-review.md` — Status: ✅ Approved (Iteration 2 `GO`: `0 [Important]`, `0 [Nit]`, `3 [Pre-existing]`; Tier 2 `[MANDATORY HUMAN AUDIT REQUIRED]`)
- **Achieved Milestones:**
  - Refined and clarified `docs/plan/sawala-ligar-mono-plan.md` (`PLAN-CLARIFY-001`, 100/100 readiness), locking binary `.ttf` compilation exclusively to GitHub Actions while keeping local engine/static checks deterministic.
  - Added `[buildPlans.SawalaLigarMono]` (`private-build-plans.toml:152-248`) inheriting `ss20`, `default-calt`, `29` `design` + `27` `italic` keys with explicit `italic.k = "cursive-serifless"`, verified directly against `packages/param/src/variant.mjs` & `ligation.mjs` (`variantsResolved=535, calt=35` across all 3 plans, `0` errors).
  - Updated `.github/workflows/build.yml` (`- SawalaLigarMono`, `timeout-minutes: 150`) and `.github/workflows/patch-nerd-font.yml` (`Sawala*.zip`, `${VARIANT}-*.zip` exact-prefix filter, `timeout-minutes: 150`, and `VARIANT="all"` `CUSTOM_NAME` collision guard at lines `211-236`).
  - Updated `README.md` (all 6 variants including TOC anchor sync at line `35` -> `237`) and `docs/ARCHITECTURE.md` (`<fmt>::SawalaMono[NL] / Ligar` at line `71`), keeping `SawalaMono`, `SawalaMonoNL`, `packages/*`, `verdafile.mjs`, `index.html`, and `web-docs/` untouched (`CON-003`).
  - Completed Iteration 1 adversarial review (`NO-GO`: 2 `[Important]`, 2 `[Nit]`), remediated all 4 findings via `/to-code`, and verified Iteration 2 `GO` (`20/20` README anchors valid, `7/7` Node `CUSTOM_NAME` assertions passed, `2/2` `yaml.safe_load` valid, `git diff --shortstat`: `6 files changed, 190 insertions(+), 64 deletions(-)`, `git diff --check` clean).
- **Dead-Ends (Do NOT Repeat):**
  - **Attempted:** Generic `CUSTOM_NAME` substitution matching only `"Mono"` under `VARIANT="all"` and editing a `README.md` heading (`line 237`) without updating its matching Table of Contents anchor (`line 35`).
  - **Reason:** Generic `"Mono"` replacement breaks `"SawalaMono NF"` into `"SawalaLigar Mono NF"` and causes cross-variant name collision when `CUSTOM_NAME` includes `'NL'` or `'Ligar'` under `VARIANT="all"`; out-of-sync TOC links silently break in-page navigation.
  - **Correct Solution:** Replace `" Mono"` before `"Mono"` and fail-fast when `VARIANT="all"` receives `'NL'`/`'Ligar'` tokens in `CUSTOM_NAME`; run an internal anchor check whenever `README.md` headings change. Also remember local host lacks `node_modules`/`docker` (defer live TTF/Docker builds to GitHub Actions per `PLAN-CLARIFY-001`).
- **Updated Files:**
  - `private-build-plans.toml` — Added `[buildPlans.SawalaLigarMono]` (`ss20`, `default-calt`, `italic.k = "cursive-serifless"`)
  - `.github/workflows/build.yml` — Added `SawalaLigarMono` dispatch option and raised `timeout-minutes` to `150`
  - `.github/workflows/patch-nerd-font.yml` — Added `SawalaLigarMono` support, exact `${VARIANT}-*.zip` isolation, `150m` timeout, and `CUSTOM_NAME` multi-variant guard
  - `README.md` — Documented `Sawala Ligar Mono` and `Sawala Ligar Mono NF` across TOC, variant tables, release assets, and Build Methods A–D
  - `docs/ARCHITECTURE.md` — Added `SawalaLigarMono` build target reference without implying non-existent `SawalaLigarMonoNL`
  - `docs/plan/sawala-ligar-mono-plan.md` — Updated task completion (`TASK-001`–`TASK-010`) while keeping `status: "In Progress"` and `TASK-011` open for human approval
  - `docs/reviews/sawala-ligar-mono-review.md` — Created Iteration 1 audit (`NO-GO`) and updated Iteration 2 delta audit (`GO`, `0` blocking findings, Tier 2 human gate)
  - `.agents/instructions/memory.instructions.md` — Appended session checkpoint for 2026-11-18
- **Decisions Made:**
  - Locked `SawalaLigarMono` Wave 1 scope strictly to `SawalaLigarMono` + `SawalaLigarMono NF`; deferred `Sawala Ligar Mono NL`, `index.html`, and `web-docs/` out of Wave 1 (`CON-003`).
  - Confirmed CI-only binary TTF compilation and Nerd Font patching on GitHub Actions (`PLAN-CLARIFY-001`) instead of local Windows execution.
  - Agreed `README.md` needs no extra `/to-docs` pass now; defer `/to-docs` until post-CI Release Notes or optional PR description if desired.
- **Next Action / Pending:**
  - Obtain `>= 2` human approvals (Tier 2 `[MANDATORY HUMAN AUDIT REQUIRED]` for `.github/workflows/*`) and close `TASK-011`.
  - Selectively stage and commit working-tree files (`private-build-plans.toml`, `.github/workflows/build.yml`, `.github/workflows/patch-nerd-font.yml`, `README.md`, `docs/ARCHITECTURE.md`, `docs/plan/sawala-ligar-mono-plan.md`, `docs/reviews/sawala-ligar-mono-review.md`, `.agents/instructions/memory.instructions.md`).
  - Push and trigger `.github/workflows/build.yml` (`variant: SawalaLigarMono` or `all`) and `.github/workflows/patch-nerd-font.yml` on GitHub Actions to verify runtime `AC-002`–`AC-004`.

<!-- checkpoint-tail: Completed SawalaLigarMono implementation and Iteration 2 review (Verdict: GO, 0 blocking findings); ready for Tier 2 human sign-off, commit, and GitHub Actions CI build/patch verification. -->


---

## 📝 Session Checkpoint: 2026-11-19 (Release v1.1.0-release19112026 Published & Release Notes Finalized)

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Current SDLC Phase:** Phase 6: Documentation Complete (`/to-docs`) — Release `v1.1.0-release19112026`
- **Active Artifacts:**
  - `docs/releases/v1.1.0-release19112026-release-notes.md` — Status: ✅ Finalized (Verified 6/6 download URLs, SHA-256 checksums, and `CONTEXT.md` glossary compliance)
  - `private-build-plans.toml` — Status: ✅ Updated & Committed (`caa39a8`, `281e2d9`, `c85a7d7`)
  - `docs/spec/sawala-ligar-mono-spec.md` — Status: ✅ Approved (`v1.1.0`)
  - `docs/plan/sawala-ligar-mono-plan.md` — Status: ✅ Implemented (`281e2d9`; CI release verified via `v1.1.0-release19112026`)
  - `docs/reviews/sawala-ligar-mono-review.md` — Status: ✅ Approved (Iteration 2 `GO`)
- **Achieved Milestones:**
  - Committed all Wave 1 `SawalaLigarMono` changes (`281e2d9`, `d1dece4`) and refined `[buildPlans.SawalaLigarMono.variants.italic]` in `c85a7d7` (`capital-a = "straight-serifless"`, `m = "earless-rounded-double-arch-serifless"`, `n`/`q = "straight-serifless"`, `p = "eared-serifless"`), following `y = "cursive-serifless"` on `SawalaMono` & `SawalaMonoNL` (`caa39a8`).
  - Successfully compiled and published all 6 font distribution archives via GitHub Actions under release tag `v1.1.0-release19112026` (`SawalaMono`, `SawalaMonoNL`, `SawalaLigarMono`, `SawalaMono-NF`, `SawalaMonoNL-NF`, `SawalaLigarMono-NF`), validating runtime `AC-002`–`AC-004`.
  - Authored and verified GitHub Release notes in `docs/releases/v1.1.0-release19112026-release-notes.md` via `/to-docs` with natural English prose, immutable tag-anchored repository links, 6 direct release download links, and verified SHA-256 checksums (`ALL RELEASE NOTES VERIFICATION CHECKS PASSED`).
- **Dead-Ends (Do NOT Repeat):**
  - None encountered in this session. *(Tip retained: always inspect `git log` up to `HEAD` before drafting release notes — commit `c85a7d7` refined `SawalaLigarMono` italic glyphs after the initial `v1.1.0` spec was written, and `caa39a8` added italic `y = "cursive-serifless"` to baseline variants).*
- **Updated Files:**
  - `docs/releases/v1.1.0-release19112026-release-notes.md` — Created final GitHub Release notes for `v1.1.0-release19112026`
  - `.agents/instructions/memory.instructions.md` — Appended session checkpoint for 2026-11-19
- **Decisions Made:**
  - Used immutable tag URLs (`.../blob/v1.1.0-release19112026/...` and `.../releases/download/v1.1.0-release19112026/...`) in release notes so copy-pasting directly into GitHub Releases produces zero broken relative links.
  - Documented the 6 published archives in the main distribution table while keeping `extended-core` (`SemiExtended` Nerd Font) noted as an optional fork workflow output.
- **Next Action / Pending:**
  - Paste the release notes into `https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases/tag/v1.1.0-release19112026` (if not yet saved on GitHub).
  - Commit `docs/releases/v1.1.0-release19112026-release-notes.md` and `.agents/instructions/memory.instructions.md`.
  - Optional Wave 2 follow-up: integrate `Sawala Ligar Mono` / `Sawala Ligar Mono NF` WOFF2 specimens and distribution cards into the live web showcase (`index.html`, `web-docs/`), or run `/to-memory` Compaction Mode when ready (8 session checkpoints now accumulated).

<!-- checkpoint-tail: Published Sawala Mono v1.1.0-release19112026 (all 6 font archives built via GitHub Actions) and finalized verified release notes in docs/releases/v1.1.0-release19112026-release-notes.md; ready to commit docs and plan Wave 2 showcase integration. -->
