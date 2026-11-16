---
goal: Repository Architecture and Clean Architecture Seams Documentation
date_created: 2026-11-09
last_updated: 2026-11-16
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
  - **Variant:** Discrete design choices for individual glyphs (e.g., `double-storey-tailed` `'a'` in design / `single-storey-earless-corner-tailed` in italic, `reverse-slashed` `'0'` in design / `tall-reverse-slashed` in italic, `toothless-corner-serifless` `'b'`/`'d'`, `serifed-semi-tailed` `'i'`/`'l'` in italic, inheriting `ss03` baseline) defined in `params/variants.toml` and selected in `private-build-plans.toml`.
  - **Ligation / CALT:** Contextual Alternates OpenType features transforming programming symbol sequences into cohesive ligature glyphs.
  - **Build Plan:** Declarative specification specifying family name, weights, slopes, widths, export formats, and variant substitutions. Defined as dual sibling plans: `[buildPlans.SawalaMono]` and `[buildPlans.SawalaMonoNL]`.
  - **Width Grades:** Two configured advance width grades: `Normal` (shape: 500, menu: 5, css: "normal") and `SemiExtended` (shape: 548, menu: 6, css: "semi-expanded").
  - **Slopes:** Two typographical slopes: `Upright` (angle: 0°, upright geometry) and `Italic` (angle: 9.4°, true cursive italic forms).
  - **Font Scopes:** Packaging scopes for compilation and patching: `core` (8 Normal coding weights), `extended-core` (8 SemiExtended coding weights), and `all` (all 36 weights across the matrix).
  - **Verda Task Graph:** Reactive, self-tracking dependency build engine (implemented in `verdafile.mjs`) orchestrating compilation rules across worker threads.
  - **Nerd Font Patching:** Decoupled containerized post-processing pipeline using FontForge to inject developer symbols into pre-compiled TrueType fonts.
- **Target Environments:** Desktop developer operating systems (Windows, macOS, Linux terminals and IDEs), web typography (self-hosted WOFF2 webfonts), and static GitHub Pages documentation (`index.html`, `web-docs/`).
- **Licensing & Distribution Boundary:** Licensed under the SIL Open Font License 1.1 (`LICENSE.md`), permitting free use, modification, and redistribution across all four font distributions.

---

## 2. High-Level Tech Stack & Tooling

| Dimension | Technologies / Tools | Configuration Files |
| :--- | :--- | :--- |
| **Primary Language(s)** | JavaScript (ES Modules, Node.js `>=16.0.0`), Patel (`.ptl` Lisp-like DSL), TOML, Bash | `package.json`, `biome.json`, `private-build-plans.toml` |
| **Core Frameworks & Build** | `verda` (v1.14.0 task runner), `patel` (v0.41.1 compiler) | `verdafile.mjs` |
| **Font Assembly & Serialization** | `ot-builder` (v1.8.1), `otb-ttc-bundle` (v1.8.1), `harfbuzzjs` (v1.6.4), `@msgpack/msgpack` (v3.1.3), `ttfautohint` | `packages/font/package.json` |
| **Nerd Font Patching Engine** | Docker (`nerdfonts/patcher:latest`, FontForge + Python 3 + icon glyph databases) | `.github/workflows/patch-nerd-font.yml` |
| **Linter & Formatter** | Biome v2.6.2 (scoped to `packages/*/src/**/*.mjs`, `tools/*/src/**/*.mjs`, `verdafile.mjs`) | `biome.json` |
| **Web Showcase Runtime** | Zero-build static HTML5, CSS Design Tokens, Vanilla ES Modules, vendored Prism.js | `index.html`, `web-docs/`, `.nojekyll` |
| **Design System Tokens** | Linear-inspired Near-Black (`#010102`) Design Tokens & Specimen Canvas | `DESIGN.md`, `web-docs/css/tokens.css` |
| **Containerization** | Docker (`node:lts-slim` + `ttfautohint` for compiler; `nerdfonts/patcher:latest` for patching) | `docker/Dockerfile`, `docker/build.sh` |
| **CI / CD Pipelines** | GitHub Actions Workflows (`build.yml`, `patch-nerd-font.yml`, `pages.yml`) | `.github/workflows/build.yml`, `.github/workflows/patch-nerd-font.yml`, `.github/workflows/pages.yml` |
| **Workspace Architecture** | npm workspaces monorepo (`packages/*`, `tools/*`) | `package.json` |

---

## 3. Pólya's Topological Map ("Draw a Figure")

*Pólya Heuristic (How to Solve It, p. 99): "Draw a figure... to find a lucid representation for your nongeometrical problem is an important step."*

### 3.1 C4 / High-Level System Container Topology

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              Maintainer / CI Automation                                │
│ [ build.yml (manual) ]      [ patch-nerd-font.yml (manual) ]   [ pages.yml (push/main) ]
└──────────────┬───────────────────────────────┬────────────────────────────┬────────────┘
               │ npm run build --              │ gh release download        │ stage _site/
               │ <fmt>::SawalaMono[NL]         │ -> fontforge patch         │ (static copy)
               ▼                               ▼                            ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────┐
│  Primary Compiler Pipeline   │ │ Nerd Font Container Patcher  │ │ Static Web Showcase  │
│ [ Docker: iosevka-builder ]  │ │ [ Docker: nerdfonts/patcher] │ │ [ index + web-docs ] │
│ • verdafile.mjs (Task Graph) │ │ • Scope: core|ext-core|all   │ │ • Zero-build ES/CSS  │
│ • SawalaMono & SawalaMonoNL  │ │ • Injects ~10,000+ dev icons │ │ • Tier A WOFF2 fonts │
│ • ot-builder + ttfautohint   │ │ • Enforces --mono & PN=2     │ │ • Strict CSP + .noj. │
└──────────────┬───────────────┘ └──────────────┬───────────────┘ └──────────┬───────────┘
               │                                │                            │
               ▼                                ▼                            ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────┐
│     Base Font Packages       │ │   Nerd Font Distributions    │ │  GitHub Pages Live   │
│ • dist/SawalaMono (TTF/WOFF2)│ │ • SawalaMono-NF-*.zip        │ │ • Landing + 3 Guides │
│ • dist/SawalaMonoNL          │ │ • SawalaMonoNL-NF-*.zip      │ │ • Interactive Tester │
└──────────────┬───────────────┘ └──────────────┬───────────────┘ └──────────────────────┘
               │                                │
               └───────────────┬────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         GitHub Releases / Distribution Hub                             │
│        [ Sawala Mono | Sawala Mono NL | Sawala Mono NF | Sawala Mono NL NF ]           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Clean Architecture Seams & Component Boundaries

*Dependency Rule: Source code dependencies MUST point inwards toward high-level domain policies.*

```text
Entities (Domain Layer)
   └── packages/glyph, packages/geometry, params/*.toml, private-build-plans.toml
Use Cases (Application Layer)
   └── packages/font-glyphs, packages/font-otl, packages/param, packages/font-kits, packages/geometry-cache, packages/util
Interface Adapters (Converters, Exporters, Serializers)
   └── packages/font (otd-conv, font-io, cleanup, naming, validate), tools/misc, tools/data-export, tools/amend-readme, tools/generate-samples
Frameworks & Drivers (Build Runners, External Tools, Containers, CI)
   └── verdafile.mjs, docker/, .github/workflows/*, ot-builder, ttfautohint, nerdfonts/patcher
Presentation & Static Web Showcase (Zero-Build Runtime)
   └── DESIGN.md, index.html, .nojekyll, web-docs/ (css, fonts, js, pages, assets, vendor/prism)
```

### 4.1 Layer Breakdown

- **Domain Layer (`packages/glyph/`, `packages/geometry/`, `params/`, `private-build-plans.toml`):**
  - **Contains:** Pure geometric models (`Point`, `Segment`, `Bezier`, `Box`), mathematical curve utilities (`quadify`, `spiro-pen-expand`), foundational glyph data structures (`Glyph`, `Store`, `Relation`), declarative domain tables (`variants.toml`, `parameters.toml`, `ligation-set.toml`), and the active dual-plan specifications (`[buildPlans.SawalaMono]` and `[buildPlans.SawalaMonoNL]`).
  - **Invariant:** Zero dependencies on external file serialization formats, CLI flags, or OpenType binary tables.
- **Application Layer (`packages/font-glyphs/`, `packages/font-otl/`, `packages/param/`, `packages/font-kits/`, `packages/geometry-cache/`, `packages/util/`):**
  - **Contains:** Parametric character drawing scripts in Patel DSL (`letter/*.ptl`, `symbol/*.ptl`), OpenType feature compilers (`gsub-ligation.ptl`, `gsub-cv-ss.ptl`), parameter resolver (`variant.mjs`, `ligation.mjs`, `subset-filter.mjs`), high-level geometry kits (`boole-kit`, `spiro-kit`), math/interpolation helpers (`packages/util/`), and caching workers.
  - **Invariant:** Orchestrates typography rules and feature sets without direct coupling to disk I/O or binary packing.
- **Interface Adapters (`packages/font/src/`, `tools/misc/`, `tools/data-export/`, `tools/amend-readme/`, `tools/generate-samples/`):**
  - **Contains:** Font build worker entrypoint (`index.mjs`, `build-font/index.mjs`), OpenType Data translators (`otd-conv/`), naming metadata generator (`naming/`), unused glyph garbage collection (`cleanup/`), compatibility ligature builder (`hb-compat-ligature/`), post-processing (`post-processing/`), `ttfautohint` control generator (`ttfa-controls/`), metric validation (`validate/metrics.mjs`), gzipped MessagePack charmap/geometry cache I/O, SVG/data exporters (`tools/data-export/`, `tools/generate-samples/`), and standalone conversion scripts (`ttf-to-woff2.mjs`, `make-webfont-css.mjs`).
  - **Invariant:** Converts domain/application structures into formats consumable by external drivers (`ot-builder`, `ttfautohint`).
- **Frameworks & Infrastructure (`verdafile.mjs`, `docker/`, `.github/workflows/`):**
  - **Contains:** Task dependency graph scheduler (`verda`), container build harness (`docker/Dockerfile`, `docker/build.sh`), CI compiler workflow (`build.yml`), standalone Nerd Font patcher workflow (`patch-nerd-font.yml`), and GitHub Pages deployment workflow (`pages.yml`).
  - **Invariant:** Entry point orchestrators that drive inner layers via command-line arguments, static staging, and configuration files.
- **Presentation & Static Web Showcase (`DESIGN.md`, `index.html`, `.nojekyll`, `web-docs/`):**
  - **Contains:** Linear-inspired Near-Black design tokens (`DESIGN.md`, `web-docs/css/tokens.css`), landing showcase (`index.html`), 3 standalone technical guide pages (`web-docs/pages/{ligatures,distributions,installation}.html`), 8 modular Vanilla ES controllers (`web-docs/js/*.js`), preloaded Tier A WOFF2 webfonts (`web-docs/fonts/sawala-mono/`), vendored Prism.js syntax highlighter (`web-docs/vendor/prism/`), and brand icon assets (`web-docs/assets/`).
  - **Internal Cascade & Script Topology:** Stylesheets load strictly in order (`tokens.css` ➔ `reset.css` ➔ `typography.css` ➔ `showcase.css` ➔ `vendor/prism/prism-sawala-dark.css` on landing). `index.html` initializes `prism.min.js` and all 8 ES modules (`main.js` imports `copyTextWithFallback` from `polyglot-runner.js` and drives shared nav/slider/scroll-spy logic), while subpages in `web-docs/pages/*.html` load only the 4 core stylesheets and `main.js`.
  - **Invariant:** Zero-build static runtime strictly decoupled from `packages/*` and `verdafile.mjs` (`CON-005`), enforcing strict Content Security Policy (`CON-006`) and WCAG 2.1 AA landmarks (`CON-007`).

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
5. OpenType Data Conversion, Pruning & Post-Processing (`packages/font/src/index.mjs`, `build-font/index.mjs`)
   └── `cleanup/` eliminates unreachable glyphs; `otd-conv/` maps domain glyphs into OTD using `@iosevka/geometry-cache`.
   └── `hb-compat-ligature/`, `post-processing/`, `ttfa-controls/`, and `validate/metrics.mjs` finalize tables, hinting controls, and monospace invariants.
6. Binary Assembly, Cache Persistence & Autohinting
   └── `font-io/` (`ot-builder`) compiles OTD into TrueType binary (`.ttf`) alongside gzipped `@msgpack/msgpack` charmap and geometry cache updates.
   └── `ttfautohint` processes TrueType instructions using generated `ttfaControls` for crisp rendering.
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

#### Phase C: Static Web Showcase & Documentation Deployment (`pages.yml`, CON-008)
```text
1. Push / Manual Dispatch Trigger
   └── Triggered on push to `main` touching `index.html`, `web-docs/**`, `.nojekyll`, or `.github/workflows/pages.yml` (or `workflow_dispatch`).
2. Static Site Staging (Zero-Build)
   └── Workflow copies `index.html`, `.nojekyll`, `sawala-mono-hero-img.jpg`, and `web-docs/` into `_site/`.
   └── No Node.js compilation or bundler step executes during web deployment.
3. GitHub Pages Publication
   └── `actions/upload-pages-artifact@v3` packages `_site` and `actions/deploy-pages@v4` deploys to GitHub Pages.
```

### 5.2 Architectural Invariants

- **INV-001 (Plan Baseline Preservation):** As decided in ADR-0001, `build-plans.toml` must remain present in the root directory because `verdafile.mjs:157,159` hard-depends on its existence; customized fonts are declared inside `private-build-plans.toml`.
- **INV-002 (Dependency Inversion Direction):** Inner domain packages (`packages/glyph`, `packages/geometry`) must NEVER import from outer adapter packages (`packages/font`) or framework utilities.
- **INV-003 (Workspace Integrity):** Both `packages/*` and `tools/*` directories must remain valid npm workspaces in `package.json:workspaces` to preserve clean dependency resolution without phantom dependencies.
- **INV-004 (Reproducible Hinting & Compilation):** All production releases MUST execute inside the Docker container (`docker/Dockerfile`, `docker/build.sh`) to guarantee bit-identical glyph rasterization and hinting across platforms.
- **INV-005 (Nerd Font Monospace Cell Width Isolation):** All executions of the Nerd Font patcher pipeline MUST include the `--mono` flag to preserve strict monospace cell dimensions, preventing terminal column distortion and code alignment breakage.
- **INV-006 (Decoupled Patcher Blast-Radius):** The primary font compiler pipeline (`build.yml`) MUST NOT depend on FontForge or Python libraries. As decided in ADR-0002, all Nerd Font patching is strictly decoupled into a standalone workflow to guarantee zero blast-radius on base releases.
- **INV-007 (Dual Plan Design Symmetry):** `SawalaMono` and `SawalaMonoNL` must maintain 100% identical character variant configurations in `private-build-plans.toml`. The sole architectural divergence permitted between the plans is the ligation policy (`ligations.inherits = "default-calt"` vs `noLigation = true`).
- **INV-008 (Decoupled Zero-Build Web Showcase & Strict CSP):** The static showcase (`index.html`, `web-docs/`) MUST remain strictly decoupled from font compiler packages (`packages/*`, `verdafile.mjs`), deploy without a build step (`CON-001`, `CON-005`), and enforce the strict Content Security Policy with zero inline styles/scripts (`CON-006`).

---

## 6. Directory Tree Map & Responsibilities

### 6.1 Repository Topography

```text
[Project Root]
├── .agents/                 # AI agent configurations, skills, and SDLC standards
├── .github/
│   ├── ISSUE_TEMPLATE/      # Issue templates (bug, feature, character/variant/ligation requests)
│   ├── PULL_REQUEST_TEMPLATE/ # PR templates (character addition & variant checklists)
│   └── workflows/
│       ├── build.yml        # CI/CD compiler pipeline for Sawala Mono & Sawala Mono NL
│       ├── pages.yml        # Automated GitHub Pages deployment for static web showcase (CON-008)
│       └── patch-nerd-font.yml # Decoupled containerized Nerd Font patching pipeline (ADR-0002)
├── doc/                     # Essential font variant & ligation reference documentation
├── docker/                  # Docker container build context & runner script
│   ├── Dockerfile           # Ubuntu + Node LTS + ttfautohint container image
│   └── build.sh             # Container entrypoint for font compilation
├── docs/                    # Architectural documents, ADRs, specs, plans, releases, and reviews
│   ├── adr/                 # Architecture Decision Records (ADR-0001, ADR-0002)
│   ├── bug-reports/         # Root-cause diagnostics and bugfix reports
│   ├── discovery/           # Discovery drafts & exploration notes
│   ├── plan/                # Sliced implementation plans
│   ├── releases/            # Curated release notes (e.g., v1.0.0-release-notes.md)
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
│   ├── assets/              # Favicons & touch icons (favicon.svg, favicon-32x32.png, favicon.ico, apple-touch-icon.png)
│   ├── css/                 # Design system tokens (tokens.css), reset, typography, and showcase rules
│   ├── fonts/sawala-mono/   # Tier A WOFF2 webfont binaries (400, 400i, 600, 700, NL 400)
│   ├── js/                  # Modular ES controllers (polyglot-runner, ligature-playground, specimen-tester, glyph-matrix, terminal-preview, distribution-cards, config-generator, main)
│   ├── pages/               # Standalone technical documentation subpages (ligatures.html, distributions.html, installation.html)
│   └── vendor/prism/        # Zero-build CSP-compliant syntax highlighter (prism.min.js, prism-sawala-dark.css)
├── .nojekyll                # Disables Jekyll processing for static GitHub Pages deployment (CON-001)
├── index.html               # Root GitHub Pages interactive showcase landing page
├── sawala-mono-hero-img.jpg # Hero & Open Graph preview banner image
├── build-plans.toml         # Upstream baseline build plans (Required by verdafile per ADR-0001)
├── private-build-plans.toml # Dual build plan specification (SawalaMono & SawalaMonoNL)
├── package.json             # Root npm monorepo manifest and script definitions
├── biome.json               # Biome linter & formatter configuration
├── DESIGN.md                # Linear-inspired product canvas tokens & specimen design system
├── LICENSE.md               # SIL Open Font License 1.1 governing font distribution & modification
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
| `packages/geometry-cache/` | Intermediate geometry computation cache | Use Cases | `packages/geometry`, `packages/util` | Caches evaluated contour geometry |
| `packages/util/` | Math, clamping, and waveform utilities | Use Cases | None | Pure JS helpers shared across engine packages |
| `packages/font/` | OTD conversion, validation, and font serialization | Interface Adapters | All inner packages, `ot-builder`, `harfbuzzjs` | Converts domain models to OpenType tables |
| `tools/` | Conversion, specimen, data export, and doc scripts | Interface Adapters | `packages/*` | Standalone CLI workspaces (`misc`, `data-export`, `amend-readme`, `generate-samples`) |
| `DESIGN.md` | Design system tokens for specimen canvas | Presentation | None | Governs UI tokens for web specimen and docs |
| `index.html`, `.nojekyll` & `web-docs/` | Static showcase & documentation platform | Presentation & UI Adapters | `DESIGN.md` tokens, local WOFF2 assets | Zero-build static runtime; strictly decoupled from `packages/*` (`CON-005`) |
| `verdafile.mjs` | Reactive build graph task definitions | Frameworks & Drivers | All packages, `verda`, `@iarna/toml` | Orchestrates build pipeline; do not refactor unnecessarily |
| `docker/` | Isolated Docker build harness | Frameworks & Drivers | Node.js, `ttfautohint` | Standard environment for reproducible builds |
| `.github/workflows/` | Automated CI/CD build, patch & deploy pipelines | Frameworks & Drivers | Docker, GitHub Actions | Manages compilation (`build.yml`), patching (`patch-nerd-font.yml`), and Pages (`pages.yml`) |

---

## 7. Key Configuration Files & Entry Points

- **Build Engine Orchestrator:** `verdafile.mjs` — Bootstraps the `verda` reactive task graph, defines build targets (`ttf::*`, `woff2::*`), and manages parallel node worker jobs.
- **Font Worker Entrypoint:** `packages/font/src/index.mjs` (delegating to `build-font/index.mjs`) — Per-variant font assembly pipeline invoked by `verdafile.mjs` to resolve parameters, load/save gzipped MessagePack geometry caches, and serialize `.ttf` binaries.
- **Sawala Mono Dual Specifications:** `private-build-plans.toml` — Defines the active configurations for both `SawalaMono` and `SawalaMonoNL`, their variant mappings, width grades, and slope settings.
- **Baseline Build Plan (ADR-0001):** `build-plans.toml` — Upstream build plan retained to satisfy `verdafile.mjs:157,159` parsing requirements.
- **Root Monorepo Manifest:** `package.json` — Defines workspaces (`packages/*`, `tools/*`), dependencies (`verda`, `ot-builder`, `patel`), and lifecycle scripts (`npm run build`, `npm run lint`, `npm run clean`, `npm run bump-ver`).
- **Linter & Formatter Config:** `biome.json` — Governs code formatting and linting rules across 97 scoped `.mjs` files (`packages/*/src/**/*.mjs`, `tools/*/src/**/*.mjs`, `verdafile.mjs`).
- **Design System Tokens:** `DESIGN.md` & `web-docs/css/tokens.css` — Defines color ladder, typography scale, surface hierarchy, Tokyo Night syntax tokens, and specimen rendering tokens.
- **Static Showcase Entry & Orchestrator:** `index.html`, `.nojekyll`, and `web-docs/js/main.js` — Serves the zero-build interactive landing page, loads Tier A WOFF2 webfonts, and initializes modular UI controllers and subpage helpers.
- **Container Compiler Context:** `docker/Dockerfile` and `docker/build.sh` — Defines the portable Linux build environment with `ttfautohint`. By default, `ENTRYPOINT` runs `/build.sh` (which downloads upstream `be5invis/Iosevka` tarballs into `/iosevka` and overlays `private-build-plans.toml`); fork compilation in CI and local builds overrides `--entrypoint bash` to build `/work` directly.
- **CI/CD Compiler Workflow:** `.github/workflows/build.yml` — Orchestrates container builds (`--entrypoint bash` on `/work`) and publishes base font release archives.
- **Nerd Font Patch Pipeline:** `.github/workflows/patch-nerd-font.yml` — Decoupled containerized patcher pipeline using Docker (`nerdfonts/patcher:latest`) to generate and attach `Sawala Mono NF` assets.
- **GitHub Pages Deploy Workflow:** `.github/workflows/pages.yml` — Stages `index.html`, `.nojekyll`, `sawala-mono-hero-img.jpg`, and `web-docs/` into `_site/` and deploys to GitHub Pages on pushes to `main`.
- **Licensing Manifest:** `LICENSE.md` — SIL Open Font License 1.1 governing redistribution and modification rights.

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
| **`check:fast` (Web)** | `< 5s` | Edits to `index.html` or `web-docs/` | `node -e "const fs=require('fs'),{execFileSync}=require('child_process');for(const f of fs.readdirSync('web-docs/js'))if(f.endsWith('.js'))execFileSync(process.execPath,['--check','web-docs/js/'+f])"` |
| **`check:task`** | `< 90s` | End of each Vertical Tracer Bullet / Task | `npx @biomejs/biome check . && npm ls --workspaces` |
| **`check:task` (Web)** | `< 30s` | Web Showcase / Design Token changes | `.agents/skills/impeccable/scripts/impeccable.cmd detect --json` |
| **`check:full`** | `< 5m` | Macro Phase Checkpoint / `/to-review` / CI | `docker run --rm -v ${PWD}:/work --entrypoint bash iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMono ttf::SawalaMonoNL"` |

> [!NOTE]
> `biome.json` scopes `npx @biomejs/biome check .` exclusively to `packages/*/src/**/*.mjs`, `tools/*/src/**/*.mjs`, and `verdafile.mjs` (97 files). The `@iarna/toml` parse check in `check:fast` requires dependencies installed via `npm ci` (locally or inside the Docker builder). Static showcase assets (`index.html`, `web-docs/css/*.css`, `web-docs/js/*.js`) are outside Biome's include globs and are verified via `node --check`, `impeccable detect --json`, and browser/DOM assertions.

### 8.3 Non-Regressing Quality Ratchets (Measure & Hold)

| Metric / Dimension | Current Ratchet Floor | Required Direction | Checked By |
| :--- | :--- | :--- | :--- |
| **Biome Lint Diagnostics (`.mjs` scope)** | `<= 3 errors / <= 5 warnings` (baseline upstream drift in `packages/font-kits` & `packages/util`) | Must not grow (`<= Ceiling 3e / 5w`, target `0`) | `npx @biomejs/biome check .` |
| **Unused Upstream File Bloat** | `0 MB` (Excised per Spec REQ-001–006) | Must not regress (`<= 0`) | Repository file auditor |
| **Workspace Resolution** | `0 errors` | Must remain 0 | `npm ls --workspaces` |
| **Dual-Variant Build Integrity** | `100% valid TTF/WOFF2 output for both variants` | Must not fail | `verda -f verdafile.mjs ttf::SawalaMono ttf::SawalaMonoNL` |

### 8.4 Approved Rule Exceptions (Time-Bounded)

| ID | Rule / Check Bypassed | File Path & Line | Technical Rationale | Approved By | Expires On |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `EX-001` | Upstream plan excision | `build-plans.toml:1` | Retained per ADR-0001 to prevent unhandled `verdafile.mjs:157` parser crash | Principal Engineer | 2027-11-09 |
| `EX-002` | Pre-existing upstream Biome lint/format diagnostics | `packages/util/src/index.mjs`, `packages/font-kits/src/{letter-model,spiro-kit}.mjs` | Untouched upstream Iosevka v34.9.1 files preserved clean from fork diffs; tracked at current ceiling (`3 errors / 5 warnings`) until dedicated upstream cleanup | Principal Engineer | 2027-02-11 |

---

## 9. Architectural Health & Known Seams

- **Primary Seams (Extension Points):**
  - **Dual Build Plans:** `private-build-plans.toml` provides the declarative entry points for customizing glyph shapes, ligature rules, and metric slopes for both `SawalaMono` and `SawalaMonoNL`.
  - **Glyph Variant Library:** `params/variants.toml` serves as the catalog of available character variations; new shape options can be introduced here.
  - **Patel Glyph Outlines:** `packages/font-glyphs/src/` contains the parametric outlines; adding new character blocks or language support takes place in this layer.
  - **Decoupled Patching Scope:** `.github/workflows/patch-nerd-font.yml` exposes parameter seams (`variant`, `font_scope`, `patch_mode`, `custom_name`) for generating specialized Nerd Font subfamilies.
  - **Static Web Showcase Modules:** `web-docs/js/` and `web-docs/pages/` expose modular ES controllers and static HTML guides bound strictly to `web-docs/css/tokens.css` (`DESIGN.md`), independently deployable via `.github/workflows/pages.yml`.
- **Technical Debt & Architectural Hotspots:**
  - **Monolithic Build Orchestrator:** `verdafile.mjs` spans 1,761 lines and encapsulates cross-cutting logic (environment detection, task compilation, webfont CSS generation, archive bundling). Edits must be approached surgically to avoid destabilizing the task graph.
  - **Coupling to Baseline `build-plans.toml`:** The build engine tightly couples plan resolution with `build-plans.toml`. As recorded in ADR-0001, deleting this file breaks the engine; any future decoupling will require patching `verdafile.mjs:155-170`.
  - **Docker Entrypoint Dual Behavior (`docker/build.sh`):** Running `docker run iosevka-builder:latest` with the default entrypoint executes `/build.sh`, which pulls upstream `be5invis/Iosevka` tarballs instead of compiling local `packages/*` changes. Always pass `--entrypoint bash` (matching `build.yml` and `check:full`) when building the fork's working tree.
  - **Upstream Biome Configuration & Lint Drift:** `biome.json` uses the deprecated `linter.recommended` field (Biome v2.6.2 notice) and currently emits 3 errors and 5 warnings in untouched upstream files (`packages/util/src/index.mjs`, `packages/font-kits/src/letter-model.mjs`, `packages/font-kits/src/spiro-kit.mjs`). Additionally, `web-docs/js/*.js` is not yet covered by `biome.json` include globs.
- **Recorded Architecture Decisions:**
  - [ADR-0001: Retention of `build-plans.toml` and `tools/` Workspaces](adr/0001-retain-build-plans-and-tools.md) — Documented decision to preserve essential workspace structures and the baseline TOML manifest while purging auxiliary bloat.
  - [ADR-0002: Standalone Containerized Nerd Font Patching Pipeline](adr/0002-standalone-nerd-font-patcher.md) — Documented decision to decouple Nerd Font generation into a dedicated on-demand Docker workflow targeting existing GitHub Releases.
