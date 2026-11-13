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

