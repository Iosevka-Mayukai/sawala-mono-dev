---
goal: Repository Architecture and Clean Architecture Seams Documentation
date_created: 2026-11-09
last_updated: 2026-11-09
status: 'Active'
tags: ["architecture", "clean-architecture", "polya-topography", "system-map", "iosevka-sawalamono"]
---
<!-- markdownlint-disable -->

# Repository Architecture Documentation

![Status: Active](https://img.shields.io/badge/status-active-brightgreen)

This document serves as the canonical architectural map of the repository. It outlines the system topology, Clean Architecture seams, directory responsibilities, and module constraints to assist developers and AI agents in navigating and maintaining the codebase safely.

---

## 1. Executive Overview & Domain Context

- **System Purpose:** Iosevka Sawala Mono is a tailored, developer-centric monospace coding typeface built upon the modular Iosevka (v34.9.1) parametric font compilation engine. The engine transforms declarative typographical parameters, variant selections, and Patel glyph vector scripts into production-ready OpenType/TrueType font packages (`.ttf`, `.woff2`, `.ttc`).
- **Domain Ubiquitous Language:**
  - **Glyph / Contour / Anchor:** Fundamental geometric entities representing outline paths, on/off-curve coordinates, and attachment points for diacritics.
  - **Variant:** Discrete design choices for individual glyphs (e.g., `double-storey-toothless-corner` 'a', `oval-tall-reverse-slashed` '0') defined in `params/variants.toml` and selected in `private-build-plans.toml`.
  - **Ligation / CALT:** Contextual Alternates OpenType features transforming programming symbol sequences (e.g., `->`, `!=`, `===`) into cohesive ligature glyphs.
  - **Build Plan:** Declarative specification specifying family name, weights, slopes, widths, export formats, and variant substitutions.
  - **Verda Task Graph:** Reactive, self-tracking dependency build engine (implemented in `verdafile.mjs`) that orchestrates compilation rules across worker threads.
- **Target Environments:** Desktop environments (Windows, macOS, Linux IDEs/terminals) and web typography (self-hosted WOFF2 webfonts).

---

## 2. High-Level Tech Stack & Tooling

| Dimension | Technologies / Tools | Configuration Files |
| :--- | :--- | :--- |
| **Primary Language(s)** | JavaScript (ES Modules, Node.js `>=16.0.0`), Patel (`.ptl` Lisp-like DSL), TOML | `package.json`, `biome.json`, `private-build-plans.toml` |
| **Core Frameworks & Build** | `verda` (v1.14.0 task runner), `patel` (v0.41.1 compiler) | `verdafile.mjs` |
| **Font Assembly & Serialization** | `ot-builder` (v1.8.1), `otb-ttc-bundle` (v1.8.1), `harfbuzzjs` (v1.6.4), `ttfautohint` | `packages/font/package.json` |
| **Linter & Formatter** | Biome v2.6.2 | `biome.json` |
| **Containerization** | Docker (`node:lts-slim` + `ttfautohint`) | `docker/Dockerfile`, `docker/build.sh` |
| **CI / CD Pipeline** | GitHub Actions Workflow | `.github/workflows/build.yml` |
| **Workspace Architecture** | npm workspaces monorepo (`packages/*`, `tools/*`) | `package.json` |

---

## 3. Pólya's Topological Map ("Draw a Figure")

*Pólya Heuristic (How to Solve It, p. 99): "Draw a figure... to find a lucid representation for your nongeometrical problem is an important step."*

### 3.1 C4 / High-Level System Container Topology

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Maintainer / CI Automation                            │
│         [ GitHub Actions (build.yml) / Local CLI / Docker Runner ]          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ triggers: npm run build -- ttf::SawalaMono
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Build Orchestrator & Task DAG Layer                         │
│                    [ verdafile.mjs / verda 1.14 ]                           │
└───────────────────┬─────────────────────────────────────┬───────────────────┘
                    │ Reads Plans                         │ Orchestrates Jobs
                    ▼                                     ▼
┌──────────────────────────────────────┐  ┌───────────────────────────────────┐
│     Plan Ingestion & Resolution      │  │        Synthesis Pipeline         │
│  • build-plans.toml (Baseline)       │  │  • patel-c (Compiles *.ptl DSL)   │
│  • private-build-plans.toml (Sawala) │  │  • packages/font-glyphs (Shapes)  │
│  • params/*.toml (Metrics & Sets)    │  │  • packages/font-otl (GSUB/GPOS)  │
└──────────────────────────────────────┘  └─────────────────┬─────────────────┘
                                                            │ Raw Glyphs & OTL
                                                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Interface Adapter Layer                              │
│  • packages/font/src/otd-conv (Converts Glyphs & OTL to OpenType Data)      │
│  • packages/font/src/cleanup (Glyph garbage collection & metrics validation)│
│  • tools/misc (ttf-to-woff2, make-webfont-css)                              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ OTD Structure
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                  Binary Generation & Hinting Infrastructure                 │
│  • ot-builder (OpenType Table Binary Serializer)                            │
│  • ttfautohint (TrueType Bytecode Autohinter)                               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Output Files
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Output Artifacts & Packages                          │
│     [ dist/SawalaMono/*.ttf | dist/SawalaMono/*.woff2 | archives/*.zip ]    │
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
   └── verdafile.mjs, docker/, .github/workflows/build.yml, ot-builder, ttfautohint, patel
```

### 4.1 Layer Breakdown

- **Domain Layer (`packages/glyph/`, `packages/geometry/`, `params/`, `private-build-plans.toml`):**
  - **Contains:** Pure geometric abstractions (`Point`, `Segment`, `Bezier`, `Box`), mathematical curve utilities (`quadify`, `spiro-pen-expand`), foundational glyph data structures (`Glyph`, `Store`, `Relation`), and declarative domain rules (`variants.toml`, `parameters.toml`, `ligation-set.toml`).
  - **Invariant:** Zero dependencies on external file serialization formats, CLI flags, or OpenType binary tables.
- **Application Layer (`packages/font-glyphs/`, `packages/font-otl/`, `packages/param/`, `packages/font-kits/`, `packages/geometry-cache/`):**
  - **Contains:** Parametric character drawing scripts in Patel DSL (`letter/*.ptl`, `symbol/*.ptl`), OpenType feature compilers (`gsub-ligation.ptl`, `gsub-cv-ss.ptl`), parameter resolver (`variant.mjs`, `ligation.mjs`, `subset-filter.mjs`), high-level geometry kits (`boole-kit`, `spiro-kit`), and caching workers.
  - **Invariant:** Orchestrates typography rules without direct coupling to disk I/O or binary packing.
- **Interface Adapters (`packages/font/src/`, `tools/misc/`, `tools/data-export/`, `tools/amend-readme/`):**
  - **Contains:** Translators converting high-level glyph definitions into OpenType Data (`otd-conv/`), naming metadata generator (`naming/`), unused glyph garbage collection (`cleanup/gc.mjs`), metric validation (`validate/metrics.mjs`), and standalone conversion scripts (`ttf-to-woff2.mjs`).
  - **Invariant:** Converts domain/application structures into formats consumable by external drivers (`ot-builder`, `ttfautohint`).
- **Frameworks & Infrastructure (`verdafile.mjs`, `docker/`, `.github/workflows/`):**
  - **Contains:** Task dependency graph scheduler (`verda`), container build harness (`docker/Dockerfile`, `docker/build.sh`), and CI packaging workflows.
  - **Invariant:** Entry point orchestrators that drive inner layers via command-line arguments and configuration files.

---

## 5. Data Flow Lifecycle & Core Invariants

### 5.1 Standard Request/Execution Flow

```text
1. Trigger / Build Invocation
   └── User or CI executes `npm run build -- ttf::SawalaMono` (or via Docker container).
2. Plan Ingestion & Parameter Resolution
   └── `verdafile.mjs` reads `build-plans.toml` and overlays `private-build-plans.toml`.
   └── `packages/param` validates variants against `params/variants.toml` and resolves weights/widths.
3. Parametric Glyph & Geometry Synthesis
   └── `verda` invokes `patel-c` to compile `.ptl` scripts in `packages/font-glyphs`.
   └── Glyph contours are evaluated using `packages/geometry` and stored in `packages/glyph`.
4. OpenType Layout Feature Assembly
   └── `packages/font-otl` compiles GSUB lookup tables (ligatures, stylistic sets) and GPOS mark positioning.
5. OpenType Data Conversion & Pruning
   └── `packages/font/src/otd-conv` maps domain glyphs into OpenType Data (OTD) schema.
   └── `packages/font/src/cleanup/gc.mjs` runs unreachable glyph elimination.
6. Binary Assembly & Autohinting
   └── `ot-builder` compiles OTD into TrueType binary (`.ttf`).
   └── `ttfautohint` processes TrueType instructions for crisp rendering.
7. Output Delivery
   └── Compiled fonts are saved to `dist/SawalaMono/` and optionally packaged into `.zip` archives.
```

### 5.2 Architectural Invariants

- **INV-001 (Plan Baseline Preservation):** As decided in ADR-0001, `build-plans.toml` must remain present in the root directory because `verdafile.mjs:157,159` hard-depends on its existence; customized fonts are declared inside `private-build-plans.toml`.
- **INV-002 (Dependency Inversion Direction):** Inner domain packages (`packages/glyph`, `packages/geometry`) must NEVER import from outer adapter packages (`packages/font`) or framework utilities.
- **INV-003 (Workspace Integrity):** Both `packages/*` and `tools/*` directories must remain valid npm workspaces in `package.json:workspaces` to preserve clean dependency resolution without phantom dependencies.
- **INV-004 (Reproducible Hinting & Compilation):** All production releases MUST execute inside the Docker container (`docker/Dockerfile`, `docker/build.sh`) to guarantee bit-identical glyph rasterization and hinting across platforms.

---

## 6. Directory Tree Map & Responsibilities

### 6.1 Repository Topography

```text
[Project Root]
├── .agents/                 # AI agent configurations, skills, and SDLC standards
├── .github/
│   └── workflows/
│       └── build.yml        # CI/CD pipeline for containerized Sawala Mono builds
├── doc/                     # Essential font variant & ligation reference documentation
├── docker/                  # Docker container build context & runner script
│   ├── Dockerfile           # Ubuntu + Node LTS + ttfautohint container image
│   └── build.sh             # Container entrypoint for font compilation
├── docs/                    # Architectural documents, ADRs, specs, plans, and reviews
│   ├── adr/                 # Architecture Decision Records (e.g., ADR-0001)
│   ├── discovery/           # Discovery drafts & exploration notes
│   ├── plan/                # Sliced implementation plans
│   ├── reviews/             # Formal review & audit reports
│   ├── spec/                # Technical specifications
│   └── ARCHITECTURE.md      # This canonical architecture map
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
├── build-plans.toml         # Upstream baseline build plans (Required by verdafile)
├── private-build-plans.toml # Active Iosevka Sawala Mono font variant specification
├── package.json             # Root npm monorepo manifest and script definitions
├── biome.json               # Biome linter & formatter configuration
└── verdafile.mjs            # Declarative reactive build graph definition
```

### 6.2 Directory Responsibilities Matrix

| Directory / Module | Primary Purpose | Clean Architecture Layer | Allowed Dependencies | Rules & Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `packages/glyph/` | Glyph, contour, and metric domain models | Entities (Core Domain) | None | Pure JS; no build tools or IO imports |
| `packages/geometry/` | Vector math, points, curves, and transformations | Entities (Core Domain) | None | Pure mathematical functions |
| `params/` | Declarative typography parameters (TOML) | Entities (Core Domain) | None | Pure data tables; syntax validated via TOML parser |
| `private-build-plans.toml` | Sawala Mono variant & family configuration | Entities (Core Domain) | None | Must define valid variant keys from `variants.toml` |
| `packages/font-glyphs/` | Glyph outline drawing rules (Patel DSL) | Use Cases | `packages/geometry`, `packages/glyph`, `packages/param` | Written in `.ptl`; compiled by `patel-c` |
| `packages/font-otl/` | OpenType Layout feature assembly | Use Cases | `packages/glyph`, `packages/param` | Defines GSUB/GPOS lookup tables |
| `packages/param/` | Variant and metric resolution | Use Cases | `params/`, `packages/util` | Interprets build plans against parameter tables |
| `packages/font-kits/` | Contour & spiro manipulation utilities | Use Cases | `packages/geometry`, `packages/glyph` | Higher-level vector construction helpers |
| `packages/font/` | OTD conversion, validation, and font serialization | Interface Adapters | All inner packages, `ot-builder`, `harfbuzzjs` | Converts domain models to OpenType tables |
| `tools/misc/` | Conversion and versioning helper scripts | Interface Adapters | `packages/*` | Standalone CLI tools (e.g. `ttf-to-woff2.mjs`) |
| `verdafile.mjs` | Reactive build graph task definitions | Frameworks & Drivers | All packages, `verda`, `@iarna/toml` | Orchestrates build pipeline; do not refactor unnecessarily |
| `docker/` | Isolated Docker build harness | Frameworks & Drivers | Node.js, `ttfautohint` | Standard environment for reproducible builds |
| `.github/workflows/` | Automated CI/CD release pipeline | Frameworks & Drivers | Docker, GitHub Actions | Triggers containerized builds on dispatch/tag |

---

## 7. Key Configuration Files & Entry Points

- **Build Engine Orchestrator:** `verdafile.mjs` — Bootstraps the `verda` reactive task graph, defines build targets (`ttf::*`, `woff2::*`), and manages parallel node worker jobs.
- **Sawala Mono Specification:** `private-build-plans.toml` — Defines the active `SawalaMono` font configuration, character variants, italic behaviors, and stylistic sets.
- **Baseline Build Plan (ADR-0001):** `build-plans.toml` — Upstream build plan retained to satisfy `verdafile.mjs:157,159` parsing requirements.
- **Root Monorepo Manifest:** `package.json` — Defines workspaces (`packages/*`, `tools/*`), dependencies (`verda`, `ot-builder`, `patel`), and lifecycle scripts (`npm run build`, `npm run lint`).
- **Linter & Formatter Config:** `biome.json` — Governs code formatting and linting rules across ES modules.
- **Container Build Context:** `docker/Dockerfile` and `docker/build.sh` — Defines the portable Linux build environment with `ttfautohint`.
- **CI/CD Pipeline Entry Point:** `.github/workflows/build.yml` — Orchestrates container builds and publishes font release archives.

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
| **`check:full`** | `< 5m` | Macro Phase Checkpoint / `/to-review` / CI | `docker run --rm -v ${PWD}:/work iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMono"` |

### 8.3 Non-Regressing Quality Ratchets (Measure & Hold)

| Metric / Dimension | Current Ratchet Floor | Required Direction | Checked By |
| :--- | :--- | :--- | :--- |
| **Biome Lint Diagnostics** | `0 errors / 0 warnings` | Must not grow (`<= Ceiling 0`) | `npx @biomejs/biome check .` |
| **Unused Upstream File Bloat** | `0 MB` (Excised per Spec REQ-001–006) | Must not regress (`<= 0`) | Repository file auditor |
| **Workspace Resolution** | `0 errors` | Must remain 0 | `npm ls --workspaces` |
| **Sawala Mono Build Integrity** | `100% valid TTF/WOFF2 output` | Must not fail | `verda -f verdafile.mjs ttf::SawalaMono` |

### 8.4 Approved Rule Exceptions (Time-Bounded)

| ID | Rule / Check Bypassed | File Path & Line | Technical Rationale | Approved By | Expires On |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `EX-001` | Upstream plan excision | `build-plans.toml:1` | Retained per ADR-0001 to prevent unhandled `verdafile.mjs:157` parser crash | Principal Engineer | 2027-11-09 |

---

## 9. Architectural Health & Known Seams

- **Primary Seams (Extension Points):**
  - **Font Variant Customization:** `private-build-plans.toml` provides the declarative entry point for customizing glyph shapes, ligature rules, and metric slopes.
  - **Glyph Variant Library:** `params/variants.toml` serves as the catalog of available character variations; new shape options can be introduced here.
  - **Patel Glyph Definitions:** `packages/font-glyphs/src/` contains the parametric outlines; adding new character blocks or language support takes place in this layer.
- **Technical Debt & Architectural Hotspots:**
  - **Monolithic Build Orchestrator:** `verdafile.mjs` spans 1,761 lines and encapsulates cross-cutting logic (environment detection, task compilation, webfont CSS generation, archive bundling). Edits must be approached surgically to avoid destabilizing the task graph.
  - **Coupling to Baseline `build-plans.toml`:** The build engine tightly couples plan resolution with `build-plans.toml`. As recorded in ADR-0001, deleting this file breaks the engine; any future decoupling will require patching `verdafile.mjs:155-170`.
- **Recent Architecture Decisions:**
  - [ADR-0001: Retention of `build-plans.toml` and `tools/` Workspaces](adr/0001-retain-build-plans-and-tools.md) — Documented decision to preserve essential workspace structures and the baseline TOML manifest while purging auxiliary bloat.
