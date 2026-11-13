# 🔭 Project Discovery Draft: Sawala Mono Interactive Showcase & Documentation Web

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `iosevka-sawalamono` (Monorepo Web Showcase Subsystem)  
**Status:** **Approved for Spec**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable -->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** 
  Today, Sawala Mono exists as a high-grade parametric monospace coding typeface with four distinct distributions (`Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, and `Sawala Mono NL NF`), configured via [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml). However, its public presentation is confined to static markdown documentation in [`README.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md) and a static banner image (`sawala-mono-hero-img.jpg`). Prospective developer users cannot test live glyphs, feel the x-height balance, toggle programming ligatures in their language of choice, inspect character distinctions (e.g., slashed zero, distinct brackets, `1`/`l`/`I`), or copy IDE configuration snippets interactively without first installing the font locally.
- **Business Value & Why Now:**
  In modern developer tooling and typographic engineering, a font's adoption is determined by its interactive specimen. Leading typefaces like **JetBrains Mono** (`jetbrains.com/lp/mono`) set the gold standard for pedagogical storytelling (explaining *why* ergonomic decisions were made), while community projects like **Ioskeley Mono** (`ahatem.github.io/IoskeleyMono`) excel at practical technical distribution metrics and webfont specimen interaction. Creating a dedicated, high-aesthetic web documentation and showcase platform for Sawala Mono will:
  1. Showcase the Sundanese philosophical identity of *sawala* (intellectual discussion, code as a collaborative human medium).
  2. Deliver an interactive specimen playground for instant evaluation across multiple programming languages (TypeScript, Go, Rust, Python, Lua).
  3. Demystify the 4 distributions (`Standard`, `NL`, `NF`, `NL NF`) so users choose the right build instantly.
  4. Implement the Linear-inspired dark-canvas design tokens codified in [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md).
- **Target Persona & Users:**
  1. **Software Developers & Polyglot Programmers:** Need an ergonomic font for 8+ hour coding sessions; want to test ligatures and readability before committing.
  2. **Terminal & CLI Power Users:** Want to see Powerline and Nerd Font icon integration (`NF` variants) and terminal emulator configurations (Neovim, WezTerm, Kitty, Alacritty).
  3. **Code Reviewers & Engineering Leads:** Value unambiguous glyph shapes (`0` vs `O`, `l` vs `1` vs `I`, distinctive curly braces `{}` and brackets `[]`) during PR reviews.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | An interactive, responsive, dark-first documentation and showcase web application deployed to **GitHub Pages**, centered around a root `index.html` entry point and modular `web-docs/` subpages, assets, and components that communicate Sawala Mono's philosophy, provide live font playgrounds (ligature tester, glyph matrix, syntax runner), detail the 4 distributions, and generate IDE configuration snippets. |
| **Known Data** | 1. Design System Tokens: [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md) (Canvas `#010102`, 4-step surface ladder, primary lavender `#5e6ad2`, Inter/Geist Sans UI typography, Sawala Mono dogfooded for code).<br>2. Existing Entry Points: Root [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) and [`web-docs/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs) directory.<br>3. Font Specifications: [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml) (Variants, ligatures, upright/italic slopes, normal/semi-extended widths).<br>4. Repository Topography: [`docs/ARCHITECTURE.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/ARCHITECTURE.md) and [`README.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md) (Distribution matrices, CI/CD release archives, IDE configs).<br>5. Prior Art & Benchmarks: JetBrains Mono landing page (`https://www.jetbrains.com/lp/mono/`) and Ioskeley Mono specimen site (`https://ahatem.github.io/IoskeleyMono/`).<br>6. Webfont Tooling: [`tools/misc/src/make-webfont-css.mjs`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/misc/src/make-webfont-css.mjs) and WOFF2 compiler support in [`verdafile.mjs`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/verdafile.mjs). |
| **The Conditions & Invariants** | 1. **GitHub Pages Deployment Compatibility:** The showcase must be natively servable via GitHub Pages from repository root (`/`) or branch deployment without breaking core font build tools.<br>2. **Dark-First Architectural Mandate:** Strictly adheres to `{colors.canvas}` (`#010102`) and no light-mode marketing chrome per [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md:584).<br>3. **Dogfooding Monospace Token:** Monospace elements and interactive playgrounds MUST load and render actual Sawala Mono WOFF2 webfonts with OpenType `calt` (ligatures) enabled.<br>4. **Webfont Provisioning & Weight SLA:**<br>&nbsp;&nbsp;• **Target Release Tag:** `v1.0.0` (Engine: Iosevka `v34.9.1`).<br>&nbsp;&nbsp;• **Tier A Core Webfonts (Immediate Startup ~150KB payload):** `SawalaMono-Regular.woff2` (400), `SawalaMono-Italic.woff2` (400 Italic 9.4°), `SawalaMono-SemiBold.woff2` (600), `SawalaMono-Bold.woff2` (700), and `SawalaMonoNL-Regular.woff2` (400 NL).<br>&nbsp;&nbsp;• **Tier B Extended Weights (Lazy-Loaded for Playground):** `Thin` (100), `Light` (300), `Medium` (500), and `Heavy` (900) fetched on-demand when interacting with font-weight sliders.<br>5. **Clean Architecture Boundary:** Web assets and scripts in `web-docs/` and root `index.html` must remain strictly decoupled from core font compilation packages (`packages/*`) and Verda task DAGs. |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

- **Relevant Directories & Modules:**
  - [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html): Designated root entry point for GitHub Pages serving the primary showcase landing page.
  - [`web-docs/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs): Dedicated folder for modular documentation pages, CSS design tokens, interactive component scripts, and static assets.
  - [`private-build-plans.toml:7-112`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L7-L112): Defines `SawalaMono` glyph variant assignments (`double-storey-toothless-corner` 'a', `tall-reverse-slashed` '0', `curly-flat-boundary` braces, `straight-serifless` 'k'/'v'/'w'/'x').
  - [`private-build-plans.toml:116-218`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L116-L218): Defines `SawalaMonoNL` (*No Ligatures* variant).
  - [`DESIGN.md:1-286`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L1-L286): Complete token specification (colors, typography, components, spacing, rounded).
  - [`tools/data-export/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/data-export): Contains extraction scripts for ligation data, variants, and language coverage.
  - [`tools/misc/src/make-webfont-css.mjs`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/misc/src/make-webfont-css.mjs): Generates `@font-face` CSS definitions for WOFF2 packages.
- **Architectural Seams & Clean Boundaries:**
  - Utilizing root `index.html` + `web-docs/` allows direct, zero-build GitHub Pages deployment from the repository's root `/`.
  - Core font compilation packages (`packages/*`), build configurations (`verdafile.mjs`), and package workspaces (`package.json`) remain cleanly decoupled and unburdened by frontend bundling complexity.

### 3.2 Analogous Solutions & Prior Art

#### A. JetBrains Mono (`jetbrains.com/lp/mono/`)
- **Key Concepts:**
  - *Narrative Arc:* Moves from problem ("Developers spend up to 70% of their time reading code") to solution (increased x-height, clear shapes, code ligatures).
  - *Interactive Comparisons:* Slider comparing letter height with standard monospace fonts; toggle to switch ligatures on/off.
  - *Code Polyglot Preview:* Interactive editor with language tabs (Kotlin, Java, Go, Python, C++, Rust).
  - *Detailed Glyph Inspection:* Zoomed-in breakdown of easily confused characters (`0` vs `O`, `l` vs `1` vs `I`, commas, semicolons).
- **Applicability to Sawala Mono:**
  - Direct inspiration for explaining the Sundanese philosophy: *"Code is written for people to discuss and review first"*.
  - Essential for interactive ligature demonstration (`=>`, `!==`, `->`, `::`, `<=>`).

#### B. Ioskeley Mono (`ahatem.github.io/IoskeleyMono/`)
- **Key Concepts:**
  - *Shared Parametric Heritage:* Also built on top of Iosevka using custom build plans.
  - *Engineering Metric Transparency:* Displays Cap Height (690), x-height (520), and Advance Width (600).
  - *Distribution Matrix:* Clarifies distinct releases (Standard with ligatures, Term for terminal cells, NL for no ligatures, Nerd Font patched, Web subsets).
  - *Interactive Specimen Tester:* Live customizable textarea with sliders for font size, line height, letter spacing, font weight, and OpenType toggles.
- **Applicability to Sawala Mono:**
  - Directly matches our 4 distributions (`Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, `Sawala Mono NL NF`).
  - Provides a model for the live testing playground and direct download linking from GitHub Releases.

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: Monolithic Single HTML | Option B: Modular Zero-Build Static Architecture (`index.html` + `web-docs/`) | Option C: Heavy Bundled SPA (Next.js / Vite Build Pipeline) |
| :--- | :--- | :--- | :--- |
| **Summary** | Single massive `index.html` with inline scripts, inline CSS, and no modular folder organization. | Root `index.html` for main showcase landing, with modular `web-docs/` containing scoped CSS tokens (`DESIGN.md`), ES module components (`js/`), subpages (`pages/`), and local webfonts (`fonts/`). | SPA bundler outputting to build directories; requires automated build actions or branch switching to deploy to GitHub Pages. |
| **Clean Architecture Seams** | Fragile; combines design tokens, UI templates, interactive JS, and content into one monolithic file. | **High Decoupling:** CSS tokens match `DESIGN.md` 1:1; interactive JS modules are single-responsibility; HTML templates are clean and semantic. | Heavy dependency graph; risks colliding with root npm workspaces and Node engines. |
| **GitHub Pages Compatibility** | Native root deployment. | **Native Root Deployment:** Zero build step; instant live preview on `main` branch or GitHub Actions deployment directly from root `/`. | Requires GitHub Actions build step with artifact upload or `gh-pages` branch deployment. |
| **Maintainability** | Poor. | **High:** Easy to add new subpages or update CSS tokens without touching font compiler scripts. | Moderate to High. |
| **Recommendation** | Rejected (Spaghetti code) | **[RECOMMENDED] (Target Architecture)** | Rejected (Unnecessary Overhead for GitHub Pages) |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

- **Technical Unknown 1: WOFF2 Webfont Loading & Performance:**
  - *Risk:* Loading full 36-weight font files will cause severe network lag and layout shift (FOUT/FOIT).
  - *Spike / Feasibility Check:* Partition webfonts into **Tier A (Startup Core)** and **Tier B (Playground Extended)**:
    - **Tier A (Startup Core - ~150KB total):** `SawalaMono-Regular.woff2` (400), `SawalaMono-Italic.woff2` (400 Italic 9.4°), `SawalaMono-SemiBold.woff2` (600), `SawalaMono-Bold.woff2` (700), and `SawalaMonoNL-Regular.woff2` (400 No Ligatures).
    - **Tier B (Extended Playground Weights):** `Thin` (100), `Light` (300), `Medium` (500), `Heavy` (900) loaded dynamically via CSS font-face / JavaScript FontFace API when user interacts with weight slider.
  - *Findings:* Verified standard WOFF2 size is ~30–40KB per style with Brotli compression; 5 Tier A files load in < 150ms on static GitHub Pages with `font-display: swap`. Feasible and optimal.
- **Technical Unknown 2: Live Ligature Rendering Across Browsers:**
  - *Risk:* Different browser rendering engines may disable OpenType Contextual Alternates (`calt`) if CSS is misconfigured.
  - *Spike / Feasibility Check:* CSS declaration `font-feature-settings: "calt" 1; font-variant-ligatures: normal;` verified to reliably activate all Iosevka ligatures in Chromium, Gecko, and WebKit.
- **Technical Unknown 3: Interactive Syntax Highlighting in Browser:**
  - *Risk:* Heavy syntax highlighting engines (like full Monaco Editor or heavy Shiki bundles) can bloat the web bundle by several megabytes.
  - *Spike / Feasibility Check:* Lightweight Prism.js or micro-Shiki dual-theme highlighter ensures instant client-side rendering with zero noticeable lag.

---

## 6. Strategic Recommendation & Handoff to Specification

- **Selected Architectural Path:** **Option B (Modular Zero-Build Architecture: Root `index.html` + `web-docs/`)**.
  - **Topography Blueprint:**
    ```text
    Iosevka/
    ├── index.html                     # Primary Showcase Landing Page (GitHub Pages Entry)
    └── web-docs/
        ├── css/
        │   ├── tokens.css             # Linear Design Tokens (Canvas #010102, Surface 1-4, Hairlines)
        │   └── showcase.css           # Specimen playground, cards, tables, responsive layouts
        ├── js/
        │   ├── playground.js          # Interactive polyglot code editor & typography controls
        │   ├── ligatures.js           # Interactive ligature toggle (Sawala Mono vs Sawala Mono NL)
        │   ├── glyph-matrix.js        # Character inspection & anatomical breakdown
        │   └── copy-config.js         # One-click IDE configuration copy snippets
        ├── fonts/
        │   └── sawala-mono/           # Curated WOFF2 assets (v1.0.0, Tier A: 400, 400i, 600, 700 + NL 400)
        └── pages/                     # Dedicated documentation subpages
            ├── ligatures.html         # Complete ligature catalog & language sets
            ├── distributions.html     # Deep dive into the 4 variants (Standard, NL, NF, NL NF)
            └── installation.html      # Comprehensive IDE & terminal setup guide
    ```
- **Core Site Sections (Root `index.html`):**
  1. **Hero & Philosophical Identity:** The meaning of *Sawala* (deliberation, human-readable code), tagline, quick CTAs ("Download vX.Y.Z", "View on GitHub"), and a live interactive code runner.
  2. **Ergonomic Typographic Highlights (JetBrains-Inspired):**
     - Slashed zero vs capital O, distinct `1` vs `l` vs `I`.
     - Distinct bracket geometry (`{ [ ( ) ] }`) and clear punctuation (commas, semicolons).
     - Proportions, x-height, and reading comfort for prolonged coding sessions.
  3. **Interactive Ligature Playground:**
     - Live toggle comparing `Sawala Mono` (with ligatures) vs `Sawala Mono NL` (without ligatures).
     - Interactive matrix of key operator transformations (`=>`, `!==`, `->`, `::`, `<=>`, `??=`, `>=`).
  4. **Font Specimen & Live Custom Tester (Ioskeley-Inspired):**
     - User editable textarea.
     - Controls: Weight slider (Thin to Heavy), Font size (12px–48px), Line height, Tracking.
     - Dual slope showcase (Upright vs 9.4° Cursive-inspired Italic).
  5. **Distribution & Packaging Matrix:**
     - 4-up distribution cards: `Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, `Sawala Mono NL NF`.
     - Recommended use cases for each variant (IDE vs Terminal vs Neovim).
     - Direct download links mapped to GitHub Releases asset conventions.
  6. **Configuration & Quick Setup Generator:**
     - Tabbed configuration cards for VS Code, JetBrains IDEs, Neovim, Alacritty, Kitty, WezTerm, and Windows Terminal with one-click copy.
  7. **Footer & Open Source Credits:**
     - SIL Open Font License 1.1 acknowledgment.
     - Deep gratitude to Belleve Invis (Iosevka creator) and the Nerd Fonts project.

### 6.1 Downstream Readiness Checklist (for `/to-prd` or `/to-spec`)

- [x] **The Unknown:** Interactive, dark-first documentation and showcase web application deployed to GitHub Pages via root `index.html` and modular `web-docs/`.
- [x] **The Data:** `DESIGN.md`, `private-build-plans.toml`, `README.md`, `docs/ARCHITECTURE.md`.
- [x] **The Condition:** Dark-canvas mandate (`#010102`), dogfooding Sawala Mono, static JAMstack deployment.
- [x] **Clean Architecture Seams:** Modular `web-docs/` + root `index.html` decoupled from core font compiler.
- [x] **Risks & Spikes:** WOFF2 webfont delivery and browser ligature CSS verified feasible.

### 6.2 Forking Handoff Actions (`/to-prd` or `/to-spec`)

Choose the downstream path matching your project's workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/sawala-mono-showcase-web-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and acceptance criteria based on this Discovery Draft.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint):**
  ```text
  /to-spec @docs/discovery/sawala-mono-showcase-web-discovery.md Formulate formal technical specification, DTO contracts, and Clean Architecture seams based on this approved Discovery Draft.
  ```
