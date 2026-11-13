---
goal: Repository Architecture and Clean Architecture Seams Documentation
date_created: 2026-11-09
last_updated: 2026-11-11
status: 'Active'
tags: ["architecture", "clean-architecture", "polya-topography", "system-map", "iosevka-sawalamono"]
---
<!-- markdownlint-disable -->

# Repository Architecture Documentation

![Status: Active](https://img.shields.io/badge/status-active-brightgreen)

This document serves as the canonical architectural map of the repository. It outlines the system topology, Clean Architecture seams, directory responsibilities, and module constraints to assist developers and AI agents in navigating and maintaining the codebase safely.

---

## 1. Executive Overview & Domain Context

- **System Purpose:** Iosevka Sawala Mono is a tailored, developer-centric monospace coding typeface built upon the modular Iosevka (v34.9.1) parametric font compilation engine. The engine transforms declarative typographical parameters, variant selections, and Patel glyph vector scripts into production-ready OpenType/TrueType font packages across four canonical distributions:
  1. **`Sawala Mono`**: Standard monospace family featuring rich, context-aware programming ligatures (`=>`, `!==`, `->`, `::`, etc.).
  2. **`Sawala Mono NL`**: *No Ligatures* variant designed for developers requiring strict symbolic separation without contextual character merging.
  3. **`Sawala Mono NF`**: *Nerd Font* distribution injecting ~10,000+ developer and powerline icons into `Sawala Mono`.
  4. **`Sawala Mono NL NF`**: *Nerd Font No Ligatures* distribution combining the unligated glyph structure with developer icons.
- **Domain Ubiquitous Language:**
  - **Glyph / Contour / Anchor:** Fundamental geometric entities representing outline paths, on/off-curve coordinates, and attachment points for diacritics.
  - **Variant:** Discrete design choices for individual glyphs (e.g., `double-storey-toothless-corner` 'a', `tall-reverse-slashed` '0', `closed-contour` '6'/'9', `toothless-corner-serifless` 'b'/'d') defined in `params/variants.toml` and selected in `private-build-plans.toml`.
  - **Ligation / CALT:** Contextual Alternates OpenType features transforming programming symbol sequences into cohesive ligature glyphs.
  - **Build Plan:** Declarative specification specifying family name, weights, slopes, widths, export formats, and variant substitutions. Defined as dual sibling plans: `[buildPlans.SawalaMono]` and `[buildPlans.SawalaMonoNL]`.
  - **Width Grades:** Two configured advance width grades: `Normal` (shape: 500, menu: 5, css: "normal") and `SemiExtended` (shape: 548, menu: 6, css: "semi-expanded").
  - **Slopes:** Two typographical slopes: `Upright` (angle: 0°, upright geometry) and `Italic` (angle: 9.4°, true cursive italic forms).
  - **Font Scopes:** Packaging scopes for compilation and patching: `core` (8 Normal coding weights), `extended-core` (8 SemiExtended coding weights), and `all` (all 36 weights across the matrix).
  - **Verda Task Graph:** Reactive, self-tracking dependency build engine (implemented in `verdafile.mjs`) orchestrating compilation rules across worker threads.
  - **Nerd Font Patching:** Decoupled containerized post-processing pipeline using FontForge to inject developer symbols into pre-compiled TrueType fonts.
- **Target Environments:** Desktop developer operating systems (Windows, macOS, Linux terminals and IDEs) and web typography (self-hosted WOFF2 webfonts).

---

## 2. High-Level Tech Stack & Tooling

| Dimension | Technologies / Tools | Configuration Files |
| :--- | :--- | :--- |
| **Primary Language(s)** | JavaScript (ES Modules, Node.js `>=16.0.0`), Patel (`.ptl` Lisp-like DSL), TOML, Bash | `package.json`, `biome.json`, `private-build-plans.toml` |
| **Core Frameworks & Build** | `verda` (v1.14.0 task runner), `patel` (v0.41.1 compiler) | `verdafile.mjs` |
| **Font Assembly & Serialization** | `ot-builder` (v1.8.1), `otb-ttc-bundle` (v1.8.1), `harfbuzzjs` (v1.6.4), `ttfautohint` | `packages/font/package.json` |
| **Nerd Font Patching Engine** | Docker (`nerdfonts/patcher:latest`, FontForge + Python 3 + icon glyph databases) | `.github/workflows/patch-nerd-font.yml` |
| **Linter & Formatter** | Biome v2.6.2 | `biome.json` |
| **Design System Tokens** | Linear-inspired Near-Black (`#010102`) Design Tokens & Specimen Canvas | `DESIGN.md` |
| **Containerization** | Docker (`node:lts-slim` + `ttfautohint` for compiler; `nerdfonts/patcher:latest` for patching) | `docker/Dockerfile`, `docker/build.sh` |
| **CI / CD Pipelines** | GitHub Actions Workflows (`build.yml`, `patch-nerd-font.yml`) | `.github/workflows/build.yml`, `.github/workflows/patch-nerd-font.yml` |
| **Workspace Architecture** | npm workspaces monorepo (`packages/*`, `tools/*`) | `package.json` |

---

## 3. Pólya's Topological Map ("Draw a Figure")

*Pólya Heuristic (How to Solve It, p. 99): "Draw a figure... to find a lucid representation for your nongeometrical problem is an important step."*

### 3.1 C4 / High-Level System Container Topology

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Maintainer / CI Automation                            │
│  [ GitHub Actions (build.yml) ]           [ Actions (patch-nerd-font.yml) ] │
└───────────────────────┬─────────────────────────────────────┬───────────────┘
                        │ triggers build:                     │ triggers on-demand patch:
                        │ npm run build -- ttf::all           │ gh release download -> patch
                        ▼                                     ▼
┌───────────────────────────────────────────┐ ┌───────────────────────────────┐
│        Primary Compiler Pipeline          │ │  Nerd Font Container Patcher  │
│    [ Docker: iosevka-builder:latest ]     │ │ [ Docker: nerdfonts/patcher ] │
│  • verdafile.mjs (Reactive Task Graph)    │ │ • Scope: core | ext | all     │
│  • Compiles: SawalaMono & SawalaMonoNL    │ │ • Injects: ~10,000+ dev icons │
│  • Tools: ot-builder + ttfautohint        │ │ • Engine: FontForge / Python  │
└─────────────────────┬─────────────────────┘ └───────────────┬───────────────┘
                      │                                       │
                      ▼                                       ▼
┌───────────────────────────────────────────┐ ┌───────────────────────────────┐
│            Base Font Packages             │ │     Nerd Font Distributions   │
│   • dist/SawalaMono (TTF / WOFF2)         │ │   • SawalaMono-NF-*.zip       │
│   • dist/SawalaMonoNL (TTF / WOFF2)       │ │   • SawalaMonoNL-NF-*.zip     │
└─────────────────────┬─────────────────────┘ └───────────────┬───────────────┘
                      │                                       │
                      └───────────────────┬───────────────────┘
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GitHub Releases / Distribution Hub                       │
│    [ Sawala Mono | Sawala Mono NL | Sawala Mono NF | Sawala Mono NL NF ]    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Clean Architecture Seams & Component Boundaries

*Dependency Rule: Source code dependencies MUST point inwards toward high-level domain policies.*

```text
Entities (Domain Layer)
   └── packages/glyph, packages/geometry, params/*.toml, private-build-plans.toml
Use Cases (Application Layer)
   └── packages/font-glyphs, packages/font-otl, packages/param, packages/font-kits, packages/geometry-cache
Interface Adapters (Converters, Exporters, Serializers)
   └── packages/font (otd-conv, font-io, cleanup, naming), tools/misc, tools/data-export, tools/amend-readme
Frameworks & Drivers (Build Runners, External Tools, Container)
   └── verdafile.mjs, docker/, .github/workflows/*, ot-builder, ttfautohint, nerdfonts/patcher
Presentation & Design Tokens
   └── DESIGN.md (Product canvas, specimen guidelines, color ladder, typography scale)
```

### 4.1 Layer Breakdown

- **Domain Layer (`packages/glyph/`, `packages/geometry/`, `params/`, `private-build-plans.toml`):**
  - **Contains:** Pure geometric models (`Point`, `Segment`, `Bezier`, `Box`), mathematical curve utilities (`quadify`, `spiro-pen-expand`), foundational glyph data structures (`Glyph`, `Store`, `Relation`), declarative domain tables (`variants.toml`, `parameters.toml`, `ligation-set.toml`), and the active dual-plan specifications (`[buildPlans.SawalaMono]` and `[buildPlans.SawalaMonoNL]`).
  - **Invariant:** Zero dependencies on external file serialization formats, CLI flags, or OpenType binary tables.
- **Application Layer (`packages/font-glyphs/`, `packages/font-otl/`, `packages/param/`, `packages/font-kits/`, `packages/geometry-cache/`):**
  - **Contains:** Parametric character drawing scripts in Patel DSL (`letter/*.ptl`, `symbol/*.ptl`), OpenType feature compilers (`gsub-ligation.ptl`, `gsub-cv-ss.ptl`), parameter resolver (`variant.mjs`, `ligation.mjs`, `subset-filter.mjs`), high-level geometry kits (`boole-kit`, `spiro-kit`), and caching workers.
  - **Invariant:** Orchestrates typography rules and feature sets without direct coupling to disk I/O or binary packing.
- **Interface Adapters (`packages/font/src/`, `tools/misc/`, `tools/data-export/`, `tools/amend-readme/`):**
  - **Contains:** Translators converting high-level glyph definitions into OpenType Data (`otd-conv/`), naming metadata generator (`naming/`), unused glyph garbage collection (`cleanup/gc.mjs`), metric validation (`validate/metrics.mjs`), and standalone conversion scripts (`ttf-to-woff2.mjs`, `make-webfont-css.mjs`).
  - **Invariant:** Converts domain/application structures into formats consumable by external drivers (`ot-builder`, `ttfautohint`).
- **Frameworks & Infrastructure (`verdafile.mjs`, `docker/`, `.github/workflows/`):**
  - **Contains:** Task dependency graph scheduler (`verda`), container build harness (`docker/Dockerfile`, `docker/build.sh`), CI compiler workflow (`build.yml`), and standalone Nerd Font patcher workflow (`patch-nerd-font.yml`).
  - **Invariant:** Entry point orchestrators that drive inner layers via command-line arguments and configuration files.

---

## 5. Data Flow Lifecycle & Core Invariants

### 5.1 Standard Execution Flow

#### Phase A: Base Font Compilation (`build.yml` or Local Docker)
```text
1. Trigger / Build Invocation
   └── User or CI executes `npm run build -- ttf::all` (or specific `ttf::SawalaMono` / `ttf::SawalaMonoNL`).
2. Plan Ingestion & Parameter Resolution
   └── `verdafile.mjs` reads `build-plans.toml` and overlays `private-build-plans.toml`.
   └── `packages/param` validates variants against `params/variants.toml` and resolves weights/widths.
3. Parametric Glyph & Geometry Synthesis
   └── `verda` invokes `patel-c` to compile `.ptl` scripts in `packages/font-glyphs`.
   └── Glyph contours are evaluated using `packages/geometry` and stored in `packages/glyph`.
4. OpenType Layout Feature Assembly
   └── `packages/font-otl` compiles GSUB lookup tables (ligatures for SawalaMono; bypassed for SawalaMonoNL) and GPOS mark positioning.
5. OpenType Data Conversion & Pruning
   └── `packages/font/src/otd-conv` maps domain glyphs into OpenType Data (OTD) schema.
   └── `packages/font/src/cleanup/gc.mjs` runs unreachable glyph elimination.
6. Binary Assembly & Autohinting
   └── `ot-builder` compiles OTD into TrueType binary (`.ttf`).
   └── `ttfautohint` processes TrueType instructions for crisp rendering.
7. Base Output Delivery
   └── Compiled fonts are saved to `dist/SawalaMono/` and `dist/SawalaMonoNL/`, packaged into `.zip` archives, and published to GitHub Releases.
```

#### Phase B: Decoupled Nerd Font Patching (`patch-nerd-font.yml`, ADR-0002)
```text
1. On-Demand Dispatch Trigger
   └── Operator triggers `patch-nerd-font.yml` targeting a published release tag (e.g., `latest` or `v1.0.0`).
2. Release Asset Acquisition
   └── Workflow downloads base TrueType archives (`SawalaMono-<tag>.zip`, `SawalaMonoNL-<tag>.zip`) via `gh release download`.
3. Parallel Containerized Patching
   └── Docker runner executes `nerdfonts/patcher:latest` with `--mono` flag and parallel workers (`PN=2`).
   └── Injects Font Awesome, Material Design Icons, Octicons, and Powerline glyphs into base fonts.
4. Release Re-Attachment
   └── Patched fonts are bundled into `SawalaMono-NF-<tag>.zip` and `SawalaMonoNL-NF-<tag>.zip`.
   └── Uploaded directly to the existing GitHub Release via `gh release upload --clobber`.
```

### 5.2 Architectural Invariants

- **INV-001 (Plan Baseline Preservation):** As decided in ADR-0001, `build-plans.toml` must remain present in the root directory because `verdafile.mjs:157,159` hard-depends on its existence; customized fonts are declared inside `private-build-plans.toml`.
- **INV-002 (Dependency Inversion Direction):** Inner domain packages (`packages/glyph`, `packages/geometry`) must NEVER import from outer adapter packages (`packages/font`) or framework utilities.
- **INV-003 (Workspace Integrity):** Both `packages/*` and `tools/*` directories must remain valid npm workspaces in `package.json:workspaces` to preserve clean dependency resolution without phantom dependencies.
- **INV-004 (Reproducible Hinting & Compilation):** All production releases MUST execute inside the Docker container (`docker/Dockerfile`, `docker/build.sh`) to guarantee bit-identical glyph rasterization and hinting across platforms.
- **INV-005 (Nerd Font Monospace Cell Width Isolation):** All executions of the Nerd Font patcher pipeline MUST include the `--mono` flag to preserve strict monospace cell dimensions, preventing terminal column distortion and code alignment breakage.
- **INV-006 (Decoupled Patcher Blast-Radius):** The primary font compiler pipeline (`build.yml`) MUST NOT depend on FontForge or Python libraries. As decided in ADR-0002, all Nerd Font patching is strictly decoupled into a standalone workflow to guarantee zero blast-radius on base releases.
- **INV-007 (Dual Plan Design Symmetry):** `SawalaMono` and `SawalaMonoNL` must maintain 100% identical character variant configurations in `private-build-plans.toml`. The sole architectural divergence permitted between the plans is the ligation policy (`ligations.inherits = "default-calt"` vs `noLigation = true`).

---

## 6. Directory Tree Map & Responsibilities

### 6.1 Repository Topography

```text
[Project Root]
├── .agents/                 # AI agent configurations, skills, and SDLC standards
├── .github/
│   └── workflows/
│       ├── build.yml        # CI/CD compiler pipeline for Sawala Mono & Sawala Mono NL
│       ├── pages.yml        # Automated GitHub Pages deployment for static web showcase (CON-008)
│       └── patch-nerd-font.yml # Decoupled containerized Nerd Font patching pipeline (ADR-0002)
├── doc/                     # Essential font variant & ligation reference documentation
├── docker/                  # Docker container build context & runner script
│   ├── Dockerfile           # Ubuntu + Node LTS + ttfautohint container image
│   └── build.sh             # Container entrypoint for font compilation
├── docs/                    # Architectural documents, ADRs, specs, plans, and reviews
│   ├── adr/                 # Architecture Decision Records (ADR-0001, ADR-0002)
│   ├── discovery/           # Discovery drafts & exploration notes
│   ├── plan/                # Sliced implementation plans
│   ├── reviews/             # Formal review & audit reports
│   ├── spec/                # Technical specifications
│   └── ARCHITECTURE.md      # This canonical living architecture map
├── packages/                # Monorepo core font compiler packages
│   ├── font/                # Assembler, OTD converter, cleanup GC, naming tables
│   ├── font-glyphs/         # Glyph synthesis rules written in Patel DSL (.ptl)
│   ├── font-kits/           # High-level contour & spiro composition helpers
│   ├── font-otl/            # OpenType Layout features (GSUB/GPOS ligatures)
│   ├── geometry/            # Pure mathematical vector geometry primitives
│   ├── geometry-cache/      # Intermediate geometry computation cache
│   ├── glyph/               # Foundational Glyph, Contour, and Metric models
│   ├── param/               # Font parameter parsing, variant resolution, metric overrides
│   └── util/                # Common math & array manipulation utilities
├── params/                  # Declarative domain configuration tables (TOML)
│   ├── ligation-set.toml    # Ligation tag sets and character mappings
│   ├── parameters.toml      # Baseline font metrics, standard dimensions
│   ├── shape-slope.toml     # Slope definitions (upright, italic, oblique)
│   ├── shape-weight.toml    # Weight grades and stroke widths
│   ├── shape-width.toml     # Advance width grades
│   └── variants.toml        # Complete catalog of glyph shape variations
├── tools/                   # Ancillary monorepo tools & build scripts
│   ├── amend-readme/        # Automated README documentation generator
│   ├── data-export/         # Language coverage & ligation data exporter
│   ├── generate-samples/    # SVG specimen and sample text generator
│   └── misc/                # Utility scripts (ttf-to-woff2, ttfa-ranges, bump-version)
├── web-docs/                # Static web showcase & documentation assets (CON-005 decoupled seam)
│   ├── css/                 # Design system tokens (tokens.css), reset, typography, and showcase rules
│   ├── fonts/sawala-mono/   # Tier A WOFF2 webfont binaries (400, 400i, 600, 700, NL 400)
│   ├── js/                  # Modular ES controllers (polyglot-runner, ligature-playground, specimen-tester, glyph-matrix, terminal-preview, distribution-cards, config-generator, main)
│   ├── pages/               # Standalone technical documentation subpages (ligatures.html, distributions.html, installation.html)
│   └── vendor/prism/        # Zero-build CSP-compliant syntax highlighter & dark theme
├── .nojekyll                # Disables Jekyll processing for static GitHub Pages deployment (CON-001)
├── index.html               # Root GitHub Pages interactive showcase landing page
├── build-plans.toml         # Upstream baseline build plans (Required by verdafile per ADR-0001)
├── private-build-plans.toml # Dual build plan specification (SawalaMono & SawalaMonoNL)
├── package.json             # Root npm monorepo manifest and script definitions
├── biome.json               # Biome linter & formatter configuration
├── DESIGN.md                # Linear-inspired product canvas tokens & specimen design system
├── README.md                # Public repository documentation & build instructions
└── verdafile.mjs            # Declarative reactive build graph definition
```

### 6.2 Directory Responsibilities Matrix

| Directory / Module | Primary Purpose | Clean Architecture Layer | Allowed Dependencies | Rules & Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `packages/glyph/` | Glyph, contour, and metric domain models | Entities (Core Domain) | None | Pure JS; no build tools or IO imports |
| `packages/geometry/` | Vector math, points, curves, and transformations | Entities (Core Domain) | None | Pure mathematical functions |
| `params/` | Declarative typography parameters (TOML) | Entities (Core Domain) | None | Pure data tables; syntax validated via TOML parser |
| `private-build-plans.toml` | Sawala Mono & Sawala Mono NL specifications | Entities (Core Domain) | None | Must define valid variant keys from `variants.toml` |
| `packages/font-glyphs/` | Glyph outline drawing rules (Patel DSL) | Use Cases | `packages/geometry`, `packages/glyph`, `packages/param` | Written in `.ptl`; compiled by `patel-c` |
| `packages/font-otl/` | OpenType Layout feature assembly | Use Cases | `packages/glyph`, `packages/param` | Defines GSUB/GPOS lookup tables |
| `packages/param/` | Variant and metric resolution | Use Cases | `params/`, `packages/util` | Interprets build plans against parameter tables |
| `packages/font-kits/` | Contour & spiro manipulation utilities | Use Cases | `packages/geometry`, `packages/glyph` | Higher-level vector construction helpers |
| `packages/font/` | OTD conversion, validation, and font serialization | Interface Adapters | All inner packages, `ot-builder`, `harfbuzzjs` | Converts domain models to OpenType tables |
| `tools/misc/` | Conversion and versioning helper scripts | Interface Adapters | `packages/*` | Standalone CLI tools (e.g. `ttf-to-woff2.mjs`) |
| `DESIGN.md` | Design system tokens for specimen canvas | Presentation | None | Governs UI tokens for web specimen and docs |
| `index.html` & `web-docs/` | Static showcase & documentation platform | Presentation & UI Adapters | `DESIGN.md` tokens, local WOFF2 assets | Zero-build static runtime; strictly decoupled from `packages/*` (`CON-005`) |
| `verdafile.mjs` | Reactive build graph task definitions | Frameworks & Drivers | All packages, `verda`, `@iarna/toml` | Orchestrates build pipeline; do not refactor unnecessarily |
| `docker/` | Isolated Docker build harness | Frameworks & Drivers | Node.js, `ttfautohint` | Standard environment for reproducible builds |
| `.github/workflows/` | Automated CI/CD build & patch pipelines | Frameworks & Drivers | Docker, GitHub Actions | Manages compilation (`build.yml`) and patching (`patch-nerd-font.yml`) |

---

## 7. Key Configuration Files & Entry Points

- **Build Engine Orchestrator:** `verdafile.mjs` — Bootstraps the `verda` reactive task graph, defines build targets (`ttf::*`, `woff2::*`), and manages parallel node worker jobs.
- **Sawala Mono Dual Specifications:** `private-build-plans.toml` — Defines the active configurations for both `SawalaMono` and `SawalaMonoNL`, their variant mappings, width grades, and slope settings.
- **Baseline Build Plan (ADR-0001):** `build-plans.toml` — Upstream build plan retained to satisfy `verdafile.mjs:157,159` parsing requirements.
- **Root Monorepo Manifest:** `package.json` — Defines workspaces (`packages/*`, `tools/*`), dependencies (`verda`, `ot-builder`, `patel`), and lifecycle scripts (`npm run build`, `npm run lint`).
- **Linter & Formatter Config:** `biome.json` — Governs code formatting and linting rules across ES modules.
- **Design System Tokens:** `DESIGN.md` — Defines color ladder, typography scale, surface hierarchy, and specimen rendering tokens.
- **Container Compiler Context:** `docker/Dockerfile` and `docker/build.sh` — Defines the portable Linux build environment with `ttfautohint`.
- **CI/CD Compiler Workflow:** `.github/workflows/build.yml` — Orchestrates container builds and publishes base font release archives.
- **Nerd Font Patch Pipeline:** `.github/workflows/patch-nerd-font.yml` — Decoupled containerized patcher pipeline using Docker (`nerdfonts/patcher:latest`) to generate and attach `Sawala Mono NF` assets.

---

## 8. Mechanical Quality Constraints, Verification Commands & Ratchets

*Inspired by Constraint-Driven Development: Quality bars are enforced mechanically via speed-tiered commands, non-regressing ratchets, and Floor-Guard anti-tampering rules.*

### 8.1 The Immutable Quality Floor (Zero Setup, Always Enforced)

- **Zero Suppressions:** No `@ts-ignore`, `@ts-nocheck`, `biome-ignore`, `eslint-disable`, or comment bypasses in source files.
- **Zero Test Weakening:** No skipped targets, deleted assertions, or suppressed validation checks in `packages/font/src/validate`.
- **Zero Unimplemented Stubs:** No empty placeholder functions, unhandled promises, or silent `catch {}` blocks in build scripts.
- **Zero Secrets in VCS:** All commits must adhere to clean secret practices (`.gitignore` enforces private keys, credentials, and temp caches).
- **Zero Bar-Lowering:** Agents and maintainers MUST NEVER delete core packages or lower build validation standards.

### 8.2 Speed-Tiered Verification Commands (`check:fast`, `check:task`, `check:full`)

| Tier | Target Latency | When Executed | Exact CLI Command(s) |
| :--- | :--- | :--- | :--- |
| **`check:fast`** | `< 5s` | Every file edit (Micro level) | `node -e "require('@iarna/toml').parse(require('fs').readFileSync('private-build-plans.toml'))" && npx @biomejs/biome check .` |
| **`check:task`** | `< 90s` | End of each Vertical Tracer Bullet / Task | `npx @biomejs/biome check . && node tools/misc/src/update-package-json-version.mjs --dry-run` |
| **`check:full`** | `< 5m` | Macro Phase Checkpoint / `/to-review` / CI | `docker run --rm -v ${PWD}:/work iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMono ttf::SawalaMonoNL"` |

### 8.3 Non-Regressing Quality Ratchets (Measure & Hold)

| Metric / Dimension | Current Ratchet Floor | Required Direction | Checked By |
| :--- | :--- | :--- | :--- |
| **Biome Lint Diagnostics** | `0 errors / 0 warnings` | Must not grow (`<= Ceiling 0`) | `npx @biomejs/biome check .` |
| **Unused Upstream File Bloat** | `0 MB` (Excised per Spec REQ-001–006) | Must not regress (`<= 0`) | Repository file auditor |
| **Workspace Resolution** | `0 errors` | Must remain 0 | `npm ls --workspaces` |
| **Dual-Variant Build Integrity** | `100% valid TTF/WOFF2 output for both variants` | Must not fail | `verda -f verdafile.mjs ttf::SawalaMono ttf::SawalaMonoNL` |

### 8.4 Approved Rule Exceptions (Time-Bounded)

| ID | Rule / Check Bypassed | File Path & Line | Technical Rationale | Approved By | Expires On |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `EX-001` | Upstream plan excision | `build-plans.toml:1` | Retained per ADR-0001 to prevent unhandled `verdafile.mjs:157` parser crash | Principal Engineer | 2027-11-09 |

---

## 9. Architectural Health & Known Seams

- **Primary Seams (Extension Points):**
  - **Dual Build Plans:** `private-build-plans.toml` provides the declarative entry points for customizing glyph shapes, ligature rules, and metric slopes for both `SawalaMono` and `SawalaMonoNL`.
  - **Glyph Variant Library:** `params/variants.toml` serves as the catalog of available character variations; new shape options can be introduced here.
  - **Patel Glyph Outlines:** `packages/font-glyphs/src/` contains the parametric outlines; adding new character blocks or language support takes place in this layer.
  - **Decoupled Patching Scope:** `.github/workflows/patch-nerd-font.yml` exposes parameter seams (`variant`, `font_scope`, `patch_mode`, `custom_name`) for generating specialized Nerd Font subfamilies.
- **Technical Debt & Architectural Hotspots:**
  - **Monolithic Build Orchestrator:** `verdafile.mjs` spans 1,761 lines and encapsulates cross-cutting logic (environment detection, task compilation, webfont CSS generation, archive bundling). Edits must be approached surgically to avoid destabilizing the task graph.
  - **Coupling to Baseline `build-plans.toml`:** The build engine tightly couples plan resolution with `build-plans.toml`. As recorded in ADR-0001, deleting this file breaks the engine; any future decoupling will require patching `verdafile.mjs:155-170`.
- **Recorded Architecture Decisions:**
  - [ADR-0001: Retention of `build-plans.toml` and `tools/` Workspaces](adr/0001-retain-build-plans-and-tools.md) — Documented decision to preserve essential workspace structures and the baseline TOML manifest while purging auxiliary bloat.
  - [ADR-0002: Standalone Containerized Nerd Font Patching Pipeline](adr/0002-standalone-nerd-font-patcher.md) — Documented decision to decouple Nerd Font generation into a dedicated on-demand Docker workflow targeting existing GitHub Releases.
