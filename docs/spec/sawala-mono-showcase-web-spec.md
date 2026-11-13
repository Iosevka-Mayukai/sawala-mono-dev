---
title: "Iosevka Sawala Mono Showcase & Technical Documentation Web Platform"
version: "1.0.0"
date_created: "2026-11-11"
last_updated: "2026-11-12"
status: "Ready for Plan"
prd_ref: "docs/discovery/sawala-mono-showcase-web-discovery.md"
tags: ["polya", "spec", "web-showcase", "typography", "linear-design", "sawala-mono", "github-pages"]
---
<!-- markdownlint-disable -->

# Technical Specification: Sawala Mono Showcase & Documentation Web Platform

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)

- **Target Output:** A zero-build, ultra-fast, dark-first interactive font specimen and technical documentation web platform hosted on **GitHub Pages**, accessible via the repository root [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) and backed by modular resources in [`web-docs/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs).
- **Core User Outcomes:**
  1. Developers can immediately experience and test **Sawala Mono** in their web browser across multiple programming languages (TypeScript, Rust, Go, Python, Lua) before installing.
  2. Developers can interactively inspect character differentiation (slashed `0` vs `O`, `1` vs `l` vs `I`, distinctive curly braces `{ }`) and test programming ligatures (`=>`, `!==`, `->`, `::`, `<=>`).
  3. Developers can understand the Sundanese philosophical foundation of *sawala* (intellectual discussion, code as a medium for human reading and peer review).
  4. Developers can choose between the 4 compiled distributions ([`Sawala Mono`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L7), `Sawala Mono NL`, `Sawala Mono NF`, `Sawala Mono NL NF`) and copy IDE configuration snippets with a single click.
- **Explicit Non-Goals (Out of Scope):**
  - In-browser font compiling or custom TTF glyph generation (font compilation remains the sole responsibility of the containerized Docker/Verda build pipeline).
  - Light-mode marketing theme: Strictly rejected per [`DESIGN.md:584`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L584) (*"Don't ship a light-mode marketing page; keep it dark-first, terminal-native"*).
  - Dynamic server runtimes, server-side rendering (SSR), or database dependencies: All capabilities must execute statically on GitHub Pages / client browser.

### 1.2 The Data (Inputs, State & Source-Grounded Context)

- **Design System Manifest:** [`DESIGN.md:6-286`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L6-L286) — Defines `{colors.canvas}` (`#010102`), four-step surface ladder (`#0f1011` through `#191a1b`), hairlines (`#23252a`), lavender accent (`#5e6ad2`), typography scale, and components.
- **Font Variant Declarations:** [`private-build-plans.toml:7-112`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L7-L112) for `SawalaMono` and [`private-build-plans.toml:116-218`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L116-L218) for `SawalaMonoNL`.
- **Packaging & CI/CD Pipeline:** [`.github/workflows/build.yml:15-34`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/build.yml#L15-L34) and [`.github/workflows/patch-nerd-font.yml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/patch-nerd-font.yml).
- **Existing Upstream Webfont Generator:** [`tools/misc/src/make-webfont-css.mjs`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/misc/src/make-webfont-css.mjs) and [`verdafile.mjs:639-656`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/verdafile.mjs#L639-L656).
- **Ligation & Variant Extraction Data Sources:** [`tools/data-export/src/ligation-data.mjs:7-60`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/data-export/src/ligation-data.mjs#L7-L60) (`ligationSamplesNarrow` matrix) and [`tools/data-export/src/variants-data.mjs`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/data-export/src/variants-data.mjs) (Character variant sampling).
- **Prior Art References:**
  - JetBrains Mono Specimen (`https://www.jetbrains.com/lp/mono/`) — Pedagogical legibility storytelling, polyglot runner, ligature comparisons.
  - Ioskeley Mono Specimen (`https://ahatem.github.io/IoskeleyMono/`) — Parametric metrics display, interactive tester slider, distribution breakdown.

### 1.3 The Condition (Requirements, Constraints & Invariants)

#### Functional Requirements (Capabilities)
- **REQ-001 `[Discovery Ref: Sec 6.2]`:** The platform must provide a responsive landing page at root [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) with 10 primary content sections: Top Navigation, Hero & Philosophy, Ergonomic Anatomy Breakdown, Interactive Ligature Matrix, Live Type Specimen Playground, Character Inspector Glyph Matrix, Nerd Font Terminal Mockup, 4-Tier Distribution Matrix, Quick Setup Config Generator, and Footer.
- **REQ-002 `[Discovery Ref: Sec 1]`:** The Hero section must articulate the cultural and ergonomic origin of *Sawala* (Sundanese: intellectual discussion, code written for peer review) alongside primary CTAs ("Download v1.0.0" and "GitHub") and a polyglot live code specimen runner supporting at least 5 languages (TypeScript, Rust, Go, Python, Lua).
- **REQ-003 `[Discovery Ref: Sec 3.2.A]`:** The Anatomy section must highlight high-contrast glyph pairs with zoomed-in visual tiles: slashed `0` vs capital `O`, numeral `1` vs lowercase `l` vs uppercase `I`, distinctive curly braces `{ }`, and dual-slope upright double-storey `a` vs 9.4° cursive italic single-storey `a`.
- **REQ-004 `[Discovery Ref: Sec 3.2.A]`:** The Ligature Playground must feature an interactive toggle between `Sawala Mono` (ligatures enabled via OpenType `calt`) and `Sawala Mono NL` (literal symbols), accompanied by an interactive grid demonstrating real `default-calt` substitutions (`=>`, `!==`, `===`, `!=`, `==`, `->`, `<-`, `::`, `<=>`, `<<=`, `<=`, `>=`, `<!--`, `+++`, `|>`, `...`).
- **REQ-005 `[Discovery Ref: Sec 3.2.B]`:** The Live Specimen Playground must provide an editable textarea with real-time reactive controls for Font Size (12px–48px), Font Weight (100–900), Line Height (1.2–2.0), and Slope Toggle (Upright vs 9.4° Italic).
- **REQ-006 `[Discovery Ref: Sec 6.2]`:** The Distribution Matrix must present 4 distinct cards for `Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, and `Sawala Mono NL NF` detailing target environments, feature summaries, and direct GitHub Release `.zip` download links conforming to CI/CD naming conventions.
- **REQ-007 `[Discovery Ref: Sec 6.2]`:** The Configuration Generator must offer tabbed setup cards for 7 environments (VS Code, JetBrains IDEs, Neovim, Alacritty, Kitty, WezTerm, and Windows Terminal) with a 1-click clipboard copy button and animated confirmation feedback.
- **REQ-008 `[Discovery Ref: Sec 6]`:** The platform must provide modular documentation subpages in [`web-docs/pages/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs) (`ligatures.html`, `distributions.html`, and `installation.html`).
- **REQ-009 `[DESIGN.md:202-207]` (Character Inspector & Glyph Browser):** The platform must incorporate an interactive glyph inspection matrix utilizing `{components.glyph-grid-tile}` grouped into 5 categories (Basic Latin, Digits & Math, Punctuation & Delimiters, Programming Symbols, Accented Latin). Clicking a tile must display a modal or tooltip revealing its Unicode codepoint (`U+XXXX`), character name, and anatomical variant design selection from [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml).
- **REQ-010 `[DESIGN.md:208-213]` (Nerd Font Terminal Preview Mockup):** The platform must provide an authentic terminal environment mockup card (`product-screenshot-card`) showcasing Powerline statusline glyphs (``, ``), Git branch status, and developer filetype icons without incurring multi-megabyte Nerd Font webfont downloads by employing inline SVG / UTF-8 vector symbols.
- **REQ-011 (SEO, Social Graph & Metadata):** All pages must declare complete search engine and social graph `<meta>` tags: canonical Open Graph title/description, Twitter Card (`summary_large_image`), theme color `#010102`, and preview image linking to [`sawala-mono-hero-img.jpg`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/sawala-mono-hero-img.jpg).
- **REQ-012 (Interactive Proportional Font Comparison Slider):** The platform must include an interactive before/after overlay comparison slider allowing users to visually compare Sawala Mono's generous x-height (520) and open apertures against standard monospace typefaces (Consolas / Menlo / Cascadia Code) in real-time.

#### Constraints & Invariants (System Rules)
- **CON-001 (Zero-Build GitHub Pages Compatibility & Static Serving Protocol):** The web platform must be entirely servable as static files directly from the Git repository root (`/`) on GitHub Pages without requiring a client-side or server-side build step before deployment. An empty `.nojekyll` file at root prevents GitHub Pages from invoking Jekyll processors. For local development, static HTTP serving (e.g., `npx serve .` or `python -m http.server`) is prescribed to ensure standard ES module resolution without browser `file://` CORS restrictions.
- **CON-002 (Design Token Strictness):** All styles MUST strictly bind to tokens specified in [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md): Canvas `#010102`, Surface Ladder 1–4, Hairline borders `#23252a`, Primary Accent `#5e6ad2`, and Inter/Geist Sans display typography.
- **CON-003 (Monospace Dogfooding Invariant):** All code snippets, ligature playgrounds, terminal previews, and keyboard shortcut tokens MUST dogfood `Sawala Mono` WOFF2 fonts loaded via `@font-face`.
- **CON-004 (Webfont Tiering & Performance SLA):**
  - Initial page load MUST download only **Tier A (Startup Core)** webfonts: `SawalaMono-Regular.woff2` (400), `SawalaMono-Italic.woff2` (400 Italic), `SawalaMono-SemiBold.woff2` (600), `SawalaMono-Bold.woff2` (700), and `SawalaMonoNL-Regular.woff2` (400 NL). Target subsetted initial font budget is $\le 180\text{ KB}$; **Contingency Plan B Waiver (Active):** While local WOFF2 `brotli` subsetting tooling is unavailable, full-repertoire checked-in Tier A WOFF2 binaries (~2.04 MB preloaded across 4 files) are shipped directly to guarantee 100% OpenType `calt` and multi-script glyph coverage without broken glyphs, with `font-display: swap` and system metric fallback preserving CLS $= 0$.
  - Tier B extended weights (100, 300, 500, 900) gracefully map across available Tier A weights (`font-weight` synthesis/mapping) until subsetted Tier B WOFF2 slices are generated in CI.
  - Cumulative Layout Shift (CLS) must equal $0$ by enforcing font metric match and `font-display: swap`.
- **CON-005 (Decoupled Monorepo Seam):** No web documentation file or script may modify or import from font compilation packages (`packages/*`), build task engine (`verdafile.mjs`), or root npm workspaces.
- **CON-006 (Content Security Policy & Privacy):** The platform must declare a strict Content Security Policy (`default-src 'self'; style-src 'self'; font-src 'self'; script-src 'self'; img-src 'self' data: https://img.shields.io; connect-src 'self' https://api.github.com;`) with zero inline `<style>` / `style="..."` HTML attributes and zero third-party telemetry, trackers, or cookies. All external links must include `rel="noopener noreferrer"`.
- **CON-007 (Accessibility & WCAG 2.1 AA Compliance):** All interactive elements must maintain a minimum contrast ratio $\ge 4.5:1$ against their respective surface backgrounds, full keyboard focus rings (`2px solid var(--primary-focus)`), $\ge 44\text{px}$ mobile touch targets, explicit ARIA semantics (`role="tablist"`, `aria-selected`, `aria-live="polite"` for copy feedback), and support for `@media (prefers-reduced-motion: reduce)`.
- **CON-008 (Automated GitHub Actions Deployment Pipeline):** Deployment to GitHub Pages must be supported either via native root branch serving or an automated GitHub Actions workflow (`.github/workflows/pages.yml`) utilizing `actions/deploy-pages@v4` triggered on changes to `index.html` or `web-docs/**`. The workflow uses permissions `pages: write` and `id-token: write` and stages only static showcase files (`index.html`, `.nojekyll`, `sawala-mono-hero-img.jpg`, `web-docs/`) into `_site` before calling `actions/upload-pages-artifact@v3` (path: `'_site'`).

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)

- **Is the condition sufficient to determine the unknown?** Yes. The 12 functional requirements, 8 strict constraints, and the verified design tokens in `DESIGN.md` provide complete, deterministic boundaries for building the static web application.
- **Is it insufficient?** No. All data sources (character variant tables in `private-build-plans.toml`, release filenames in CI/CD workflows, color/typography tokens in `DESIGN.md`) are verified and cited directly from the repository.
- **Is it redundant or contradictory?** No. The decision to use static zero-build files resolves any conflict between npm workspaces and frontend bundlers.
- **Did you use ALL the data?** Yes. All 4 distributions, character anatomical features, and 7 editor configuration blocks from `README.md` are accounted for.
- **Did you use the WHOLE condition?** Yes. Every performance SLA, design token constraint, and GitHub Pages invariant is mapped to explicit acceptance criteria.

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)

- **Hypothesis 1 (Assume WOFF2 fails to load or CDN network drops):** If local `@font-face` WOFF2 assets fail to fetch (e.g. offline dev or broken path), the system must NOT crash or render an unreadable blank screen. It must fallback gracefully to `ui-monospace, SF Mono, Menlo, monospace` while displaying a non-intrusive indicator in the specimen panel.
- **Hypothesis 2 (Assume browser disables OpenType Contextual Alternates):** If a user browser or webview ignores `font-feature-settings: "calt"`, ligature tokens will render as literal discrete characters. The Ligature Playground must detect or visually explain that ligatures require standard OpenType support (`font-variant-ligatures: normal; font-feature-settings: "calt" 1;`).
- **Hypothesis 3 (Assume clipboard permissions denied):** If `navigator.clipboard.writeText` is blocked by browser security policy, the copy action must fallback gracefully to an HTML input selection (`document.execCommand('copy')`) or highlight the text box with a prompt to press `Ctrl+C` / `Cmd+C`, preventing silent failure.

### 1.6 Design References & Prior Art Synthesis Matrix

*Pólya Heuristic: Analogy (p. 37). Systematic synthesis of external design references and repository artifacts into Sawala Mono's architectural specification:*

| Design Reference | Canonical Source / URL | Key Concepts & Patterns Borrowed | Concrete Adaptation in Sawala Mono Web Showcase | Design Token / Specification Anchor |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Design System** | [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md) (`linear.app`) | • Deep dark canvas `#010102`<br>• 4-step surface ladder (`#0f1011` $\to$ `#191a1b`)<br>• 1px hairline borders (`#23252a`)<br>• Signature lavender accent (`#5e6ad2`)<br>• Aggressive negative display tracking (`-3.0px`)<br>• 100% Monospace code dogfooding | Serves as the **foundational design system** for the entire showcase platform. All backgrounds, cards, typography, and button states strictly bind to Linear design tokens without generic styling. | [`tokens.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/spec/sawala-mono-showcase-web-spec.md#L225), `CON-002`, Section 4.6 Master Token Table |
| **JetBrains Mono** | `https://www.jetbrains.com/lp/mono/` | • Human-centric code reading storytelling<br>• Anatomical glyph breakdown (0 vs O, 1 vs l vs I)<br>• Interactive code ligatures demonstration<br>• Polyglot code runner (5 languages)<br>• Proportional x-Height comparison slider | • Hero storytelling: Sundanese *sawala* (code written for peer review)<br>• Polyglot runner with language switching<br>• 3-up anatomical cards with zoomed-in glyph comparisons<br>• Interactive ligature grid (`=>`, `!==`, `->`)<br>• Real-time x-height comparison slider | `REQ-002`, `REQ-003`, `REQ-004`, `REQ-012`, `AC-004`, `AC-005`, `AC-006`, `AC-019`, Sec 4.5.1, Sec 4.5.4 |
| **Ioskeley Mono** | `https://ahatem.github.io/IoskeleyMono/` | • Iosevka parametric lineage transparency<br>• Typographic metrics display (Cap 735, x-height 520, width 500)<br>• Live editable specimen tester with reactive sliders (size, weight, line-height, slope)<br>• 4-tier distribution clarity (Standard, NL, NF, NL NF)<br>• Compact WOFF2 web subsets | • Live specimen tester with real-time sliders (12–48px, 100–900 weight, 1.2–2.0 line-height)<br>• Character inspector glyph matrix (`glyph-grid-tile`)<br>• 4-tier distribution grid<br>• Tier A / Tier B webfont delivery SLA | `REQ-005`, `REQ-006`, `REQ-009`, `CON-004`, `AC-008`, `AC-009`, `AC-011`, `AC-016`, Sec 4.5.1 |
| **Sawala Mono Repository Context** | [`README.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md) & [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml) | • Meaning of *Sawala* (discussion/deliberation)<br>• Declarative glyph variant selections<br>• Standard configuration snippets for 7 editors<br>• Release archive naming conventions | • Hero philosophy copy<br>• Quick Setup Config Generator (VS Code, JetBrains, Neovim, Alacritty, Kitty, WezTerm, Windows Terminal)<br>• Direct GitHub Releases asset download URLs | `REQ-002`, `REQ-007`, `AC-003`, `AC-013`, `AC-014`, Sec 4.5.1 Sec 9 |

---

## 2. Ubiquitous Language & Domain Glossary (`CONTEXT.md`)

- **Sawala Mono (Standard Variant):** The flagship monospace font distribution featuring rich programming ligatures (`=>`, `!==`, `->`, `::`, etc.) designed for modern IDEs.  
  _Avoid_: Sawala Regular, Sawala Code, Mayukai Mono.
- **Sawala Mono NL (No Ligatures Variant):** The clean monospace font distribution compiled without OpenType ligation lookups (`noLigation = true`) for developers demanding literal symbol separation.  
  _Avoid_: Sawala Plain, Sawala Non-Ligature.
- **Sawala Mono NF (Nerd Font Patched):** The terminal-tailored distribution patched with Powerline, Devicons, Font Awesome, and Material Design icons (~10,000+ developer glyphs).  
  _Avoid_: Sawala Icons, Sawala Terminal.
- **Sawala Mono NL NF:** The Nerd Font patched distribution without programming ligatures.
- **Ligation / Contextual Alternates (CALT):** The OpenType GSUB feature transforming sequences of ASCII programming operators into unified ligature glyphs.
- **Surface Ladder:** The 4-step progressive elevation system defined in `DESIGN.md` (`canvas` $\to$ `surface-1` $\to$ `surface-2` $\to$ `surface-3` $\to$ `surface-4`) that replaces drop shadows with chromatic lightness steps.
- **Tier A Webfont:** The minimal set of core WOFF2 font files (400, 400 Italic, 600, 700 + NL 400) bundled for immediate initial page rendering.
- **Tier B Webfont:** Extended weight font files (100, 300, 500, 900) loaded on-demand during live specimen testing.

---

## 3. Assumptions & Open Clarifications

> [!WARNING] [ASSUMPTION-001]: Initial Webfont Asset Availability  
> *Description:* It is assumed that during initial page development, placeholder or base WOFF2 files compiled from the latest font build will be placed into `web-docs/fonts/sawala-mono/` (or mocked via system `@font-face` during local preview before CI compilation).  
> *Risk / Trade-off:* If compiled WOFF2 files are missing from disk during initial load, fallback monospace will render until fonts are placed.  
> *Proposed Verification:* Verify existence of `web-docs/fonts/sawala-mono/SawalaMono-Regular.woff2` before GitHub Pages deployment.

> [!WARNING] [ASSUMPTION-002]: Zero-Build Syntax Highlighter Selection  
> *Description:* To avoid external npm build tooling while delivering instant client-side syntax highlighting, lightweight standalone Prism.js (or micro-highlight) will be placed in `web-docs/vendor/prism/` (~18 KB minified).  
> *Risk / Trade-off:* Relies on a standalone vendor script rather than a Node-bundled Shiki runtime.  
> *Proposed Verification:* Verified that Prism.js executes client-side in pure HTML with zero compilation pipelines.

---

## 4. Setting Up Equations & Expressive Notation (Pólya, p. 134–141)

### 4.1 Type-Driven Domain Invariants & Component Contracts

The client-side interactivity is structured into single-responsibility ES modules with explicit interfaces:

```typescript
// web-docs/js/types.ts (Informational Contract Definition)

export type SupportedLanguage = 'typescript' | 'rust' | 'go' | 'python' | 'lua';

export type FontVariantMode = 'standard' | 'nl';

export type FontWeightValue = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface CodeSnippet {
  readonly language: SupportedLanguage;
  readonly filename: string;
  readonly code: string;
}

export interface LigatureSample {
  readonly sequence: string;        // e.g. "=>"
  readonly category: string;        // e.g. "Arrow / Function"
  readonly description: string;     // e.g. "Fat arrow function"
  readonly standardOutput: string;  // Rendered with calt ON
  readonly nlOutput: string;        // Rendered with calt OFF
}

export interface DistributionTier {
  readonly id: 'sawala-mono' | 'sawala-mono-nl' | 'sawala-mono-nf' | 'sawala-mono-nl-nf';
  readonly name: string;
  readonly subtitle: string;
  readonly description: string;
  readonly hasLigatures: boolean;
  readonly hasNerdFont: boolean;
  readonly recommendedFor: string;
  readonly archiveFilename: string;
  readonly downloadUrl: string;
  readonly isFeatured: boolean;
}

export interface EditorConfigSnippet {
  readonly editorId: 'vscode' | 'jetbrains' | 'neovim' | 'alacritty' | 'kitty' | 'wezterm' | 'windows-terminal';
  readonly displayName: string;
  readonly filename: string;
  readonly languageMode: 'json' | 'lua' | 'toml' | 'conf';
  readonly configContent: string;
}

export interface GlyphDetail {
  readonly char: string;
  readonly unicodeHex: string;          // e.g. "U+0030"
  readonly name: string;                // e.g. "DIGIT ZERO"
  readonly category: 'latin' | 'digits' | 'punctuation' | 'operators' | 'accented';
  readonly variantName: string;         // e.g. "tall-reverse-slashed" from private-build-plans.toml
}

export interface TerminalPromptState {
  readonly currentDirectory: string;    // e.g. "~/projects/sawala-mono"
  readonly gitBranch: string;           // e.g. "main"
  readonly hasChanges: boolean;
  readonly nodeVersion: string;         // e.g. "v20.18.0"
  readonly commandText: string;
}
```

### 4.2 Web Assets & File Topology

The physical layout strictly adheres to the approved Discovery Draft:

```text
Iosevka/
├── .nojekyll                              # Bypasses Jekyll processing on GitHub Pages
├── .github/
│   └── workflows/
│       └── pages.yml                      # GitHub Actions static deployment workflow (deploy-pages@v4)
├── index.html                             # Showcase Landing Page (GitHub Pages Root Entry)
└── web-docs/
    ├── css/
    │   ├── tokens.css                     # Linear Design Tokens (Colors, Typography, Radii, Spacing)
    │   ├── reset.css                      # Modern CSS reset with box-sizing border-box
    │   ├── typography.css                 # Inter/Geist UI font-face + Sawala Mono font-face rules
    │   └── showcase.css                   # Showcase sections, cards, playgrounds, and responsive grids
    ├── js/
    │   ├── main.js                        # App orchestrator (nav scroll, active observer, theme setup)
    │   ├── polyglot-runner.js             # Language tabs & live snippet renderer
    │   ├── ligature-playground.js         # Interactive ligature matrix & Sawala Mono vs NL toggle
    │   ├── specimen-tester.js             # Live editable textarea with size/weight/slope controls
    │   ├── glyph-matrix.js                # Character matrix grid & anatomical inspection tooltip
    │   ├── terminal-preview.js            # Nerd Font terminal mockup with Powerline symbols
    │   ├── distribution-cards.js          # Distribution metadata & dynamic release URL resolution
    │   └── config-generator.js            # Tabbed editor snippets & 1-click copy-to-clipboard
    ├── fonts/
    │   └── sawala-mono/                   # Curated WOFF2 assets (Tier A Core)
    │       ├── SawalaMono-Regular.woff2
    │       ├── SawalaMono-Italic.woff2
    │       ├── SawalaMono-SemiBold.woff2
    │       ├── SawalaMono-Bold.woff2
    │       └── SawalaMonoNL-Regular.woff2
    ├── vendor/
    │   └── prism/                         # Lightweight standalone syntax highlighter
    │       ├── prism.min.js
    │       └── prism-sawala-dark.css      # Tailored syntax theme using DESIGN.md tokens
    └── pages/                             # Documentation subpages
        ├── ligatures.html                 # Complete catalog of ~50+ programming ligatures
        ├── distributions.html             # Deep-dive into technical metrics & packaging
        └── installation.html              # Comprehensive step-by-step installation guides
```

### 4.3 Design Token Mapping (`web-docs/css/tokens.css`)

All CSS variables are extracted verbatim from [`DESIGN.md:6-130`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L6-L130):

```css
:root {
  /* Surface Ladder */
  --canvas: #010102;
  --surface-1: #0f1011;
  --surface-2: #141516;
  --surface-3: #18191a;
  --surface-4: #191a1b;

  /* Hairlines & Borders */
  --hairline: #23252a;
  --hairline-strong: #34343a;
  --hairline-tertiary: #3e3e44;

  /* Brand Accents */
  --primary: #5e6ad2;
  --primary-hover: #828fff;
  --primary-focus: #5e69d1;
  --on-primary: #ffffff;
  --brand-secure: #7a7fad;

  /* Text & Inks */
  --ink: #f7f8f8;
  --ink-muted: #d0d6e0;
  --ink-subtle: #8a8f98;
  --ink-tertiary: #62666d;

  /* Semantics */
  --semantic-success: #27a644;
  --semantic-overlay: rgba(0, 0, 0, 0.7);

  /* Typography Font Stacks */
  --font-display: "Linear Display", "SF Pro Display", -apple-system, system-ui, "Inter", "Geist Sans", sans-serif;
  --font-body: "Linear Text", "Inter", -apple-system, system-ui, "Geist Sans", sans-serif;
  --font-mono: "Sawala Mono", "Iosevka Sawala Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --font-mono-nl: "Sawala Mono NL", "Iosevka Sawala Mono NL", ui-monospace, "SF Mono", Menlo, monospace;

  /* Radii Scale */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;

  /* Spacing Scale */
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  --space-section: 96px;

  /* Syntax Highlighting Tokens (Tokyo Night / Catppuccin Mocha Dark Spec, DESIGN.md:645) */
  --syntax-keyword: #bb9af7;     /* Purple / Keywords, control flow, declarations */
  --syntax-function: #7aa2f7;    /* Blue / Function names, method calls */
  --syntax-string: #9ece6a;      /* Green / String literals, paths */
  --syntax-number: #ff9e64;      /* Orange / Numeric constants, booleans */
  --syntax-comment: #565f89;     /* Muted / Inline comments, docstrings */
  --syntax-operator: #89ddff;    /* Cyan / Mathematical, comparison, and arrow ligatures */
  --syntax-variable: #c0caf5;    /* Light ink / Identifiers & parameters */
  --syntax-type: #2ac3de;        /* Teal / Types, interfaces, classes */

  /* Responsive Breakpoints (DESIGN.md:598-606) */
  --bp-desktop-xl: 1440px;
  --bp-desktop: 1280px;
  --bp-tablet: 1024px;
  --bp-mobile-lg: 768px;
  --bp-mobile: 480px;
}
```

### 4.4 The 5 UI States Matrix

| Component / Surface | `Loading` State | `Empty` State | `Error` State | `Partial` State | `Populated` (Ideal) State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Webfont Renderer** | System monospace fallback with `font-display: swap`; zero layout shift. | N/A (Always has fallback). | System fallback monospace retained; warning badge in specimen panel. | Regular 400 loaded while Bold/Italic stream in background. | Native Sawala Mono WOFF2 rendered with crisp autohinting. |
| **Polyglot Code Runner** | Skeleton code block container with pulsing `#141516` surface. | Displays default `TypeScript` snippet if local storage selection is empty. | Displays raw un-highlighted code block if Prism script fails. | Code displayed without line numbers or syntax tags. | Full syntax-highlighted code with language tab indicator and line numbers. |
| **Specimen Custom Tester** | Skeleton textarea with `#0f1011` background. | Watermark placeholder: *"The quick brown fox jumps over the lazy dog. 0123456789 => !== ->"*. | Invalid font size capped to min 12px / max 48px boundary. | Custom text rendered at default Regular 400 weight. | Custom text dynamically rendered with user-selected weight, size, and slope. |
| **Character Inspector** | 20 pulsing skeleton tiles in `surface-1`. | N/A (Standard glyph catalog is predefined). | Failed font render falls back to system monospace. | Basic Latin loaded; extended blocks render on category select. | 5 categories populated with 80+ glyph tiles with interactive detail tooltip. |
| **Terminal Mockup** | Skeleton dark terminal window. | N/A (Static mock prompt is populated). | Fallback SVG arrows if custom Unicode fails to display. | Prompt displayed without command output history. | High-fidelity Starship/Neovim terminal prompt with Powerline arrows and git status. |
| **Config 1-Click Copy** | Default state: Copy button with SVG clipboard icon. | N/A (Predefined configs exist). | Clipboard permission rejected $\to$ text selected with prompt *"Press Ctrl+C to copy"*. | N/A. | Checkmark icon + *"Copied!"* label in `#27a644` green for 2000ms. |

---

### 4.5 Visual Text Wireframes & ASCII UI Mockups

*Pólya Heuristic: "Draw a figure" (p. 99). Visual representation of all 10 page sections, interactive controls, and subpage layouts on the Linear dark canvas.*

#### 4.5.1 Global Page Topography Wireframe (`index.html`)

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP NAV] Sawala Mono [v1.0.0]     Overview  Anatomy  Ligatures  Specimen  Distributions  Setup │ [GitHub] [Download ZIP] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [HERO SECTION]                                                                                  │
│  • Eyebrow: INTELLECTUAL EXCHANGE IN CODE                                                       │
│  • Title:   Code is written for human deliberation.                                              │
│  • Subhead: Derived from the Sundanese word sawala. An ergonomic, high-legibility coding         │
│             monospace built on Iosevka, tuned for reading, review, and focused programming.       │
│                                                                                                  │
│  [Download v1.0.0] (button-primary)    [View on GitHub] (button-secondary)   [Copy npm/curl]     │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ POLYGLOT CODE SPECIMEN RUNNER [surface-1 / rounded.xl / 1px hairline]                      │  │
│  │ [ TypeScript ] [ Rust ] [ Go ] [ Python ] [ Lua ]                copy • Sawala Mono Regular│  │
│  │ 1 │ interface DeliberationSession<T> {                                                     │  │
│  │ 2 │   readonly participants: ReadonlyArray<Developer>;                                     │  │
│  │ 3 │   evaluate: (pr: PullRequest) => Promise<Result<T, ReviewError>>;                      │  │
│  │ 4 │ }                                                                                      │  │
│  │ 5 │ const reviewOutcome = async (pr: PullRequest): Promise<boolean> => {                   │  │
│  │ 6 │   const isApproved = pr.approvals.length >= 2 && pr.blockingDiscussions === 0;         │  │
│  │ 7 │   return isApproved ? pr.merge() : pr.requestRevision();                               │  │
│  │ 8 │ };                                                                                     │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [ERGONOMIC ANATOMICAL BREAKDOWN]                                                                │
│  • Eyebrow: ERGONOMIC TYPOGRAPHY                                                                │
│  • Title:   Engineered for Effortless Code Reading                                               │
│                                                                                                  │
│  ┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐      │
│  │ Slashed Zero vs Capital O │ │ Distinct 1 / l / I        │ │ High-Contrast Delimiters  │      │
│  │        0   vs   O         │ │        1   l   I          │ │        {   [   (   )   ]  } │      │
│  │ Reverse-slashed interior  │ │ Distinct serifed foot,    │ │ Generous flat-boundary    │      │
│  │ eliminates hex/digit      │ │ hook, and apex remove     │ │ curly braces keep nested  │      │
│  │ ambiguities at 12px.      │ │ lexical collisions.       │ │ scopes obvious at a glance│      │
│  └───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘      │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [INTERACTIVE LIGATION PLAYGROUND]                                                               │
│  • Eyebrow: CONTEXTUAL ALTERNATES                                                                │
│  • Title:   Tailored Programming Ligatures                                                       │
│  • Switcher: (•) Sawala Mono (Ligatures Active)     ( ) Sawala Mono NL (Literal Symbols)        │
│                                                                                                  │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐       │
│  │    =>    │   !==    │   ===    │    !=    │    ==    │    ->    │    <-    │    ::    │       │
│  │ fat-arrow│ strict-ne│ strict-eq│ not-equal│   equal  │  arrow   │ left-arr │ scope-res│       │
│  ├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤       │
│  │   <=>    │   ??=    │    <=    │    >=    │   <!--   │    ++    │    \|>   │   ...    │       │
│  │ spaceship│ null-asgn│ less-eq  │ great-eq │ xml-cmnt │ increment│ pipeline │  vararg  │       │
│  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘       │
│  [View Full Ligature Catalog (50+ Symbols) ->] (web-docs/pages/ligatures.html)                   │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [LIVE TYPE SPECIMEN & PLAYGROUND]                                                               │
│  • Eyebrow: INTERACTIVE SPECIMEN                                                                 │
│  • Title:   Test Your Own Code and Expressions                                                  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ CONTROLS TOOLBAR [surface-2 / rounded.md / padding: 12px 16px]                             │  │
│  │ Size: [───○────────] 16px  │ Weight: [ Regular (400) ▼ ] │ Line Height: [──○───────] 1.5   │  │
│  │ Slope: [ Upright (0°) ] [ Italic (9.4°) ]                │ Variant: [ Sawala Mono (calt) ] │  │
│  ├────────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ EDITABLE SPECIMEN TEXTAREA [surface-1 / rounded-bottom / font: Sawala Mono / 16px]          │  │
│  │ // Type anything here to test rendering, ligatures, and weights:                           │  │
│  │ function calculateHammingDistance(a: string, b: string): number {                          │  │
│  │   if (a.length !== b.length) throw new Error("Strings must be of equal length!");          │  │
│  │   let distance = 0;                                                                        │  │
│  │   for (let i = 0; i < a.length; i++) {                                                     │  │
│  │     if (a[i] !== b[i]) distance++; // => count differences                                 │  │
│  │   }                                                                                        │  │
│  │   return distance;                                                                         │  │
│  │ }                                                                                          │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [CHARACTER INSPECTOR & GLYPH BROWSER]                                                           │
│  • Eyebrow: ANATOMICAL GLYPH MATRIX                                                              │
│  • Title:   Inspect Individual Glyphs & Unicode Codepoints                                       │
│  • Tabs:    [ All ] [ Basic Latin ] [ Digits & Math ] [ Delimiters ] [ Programming ] [ Accents ] │
│                                                                                                  │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ A │ │ B │ │ C │ │ D │ │ E │ │ F │ │ G │ │ H │ │ I │ │ J │ │ K │ │ L │ │ M │ │ N │ │ O │  ...   │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘       │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ 0 │ │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 │ │ 7 │ │ 8 │ │ 9 │ │ = │ │ + │ │ - │ │ * │ │ / │  ...   │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘       │
│                                                                                                  │
│  ┌─ SELECTED GLYPH INSPECTION CARD ───────────────────────────────────────────────────────────┐  │
│  │ [ 0 ]   Unicode: U+0030   Name: DIGIT ZERO                                                 │  │
│  │         Design Choice: tall-reverse-slashed (params/variants.toml)                         │  │
│  │         Metrics: Advance Width 500 | Cap Height 735 | x-Height 520                         │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [NERD FONT TERMINAL ENVIRONMENT MOCKUP]                                                         │
│  • Eyebrow: TERMINAL NATIVE                                                                      │
│  • Title:   Engineered for Modern Shells, Neovim & Multiplexers                                  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ TERMINAL WINDOW [product-screenshot-card / surface-1 / rounded.xl]                         │  │
│  │ ● ● ●  ~/work/sawala-mono (main) - nvim                                                    │  │
│  │ ┌────────────────────────────────────────────────────────────────────────────────────────┐ │  │
│  │ │  src/   app.ts   main*  󰏗 v1.0.0   14:42:01                                   │ │  │
│  │ │                                                                                        │ │  │
│  │ │ 1  import { SawalaSession } from "@sawala/core";                                       │ │  │
│  │ │ 2                                                                                      │ │  │
│  │ │ 3  //  Powerline glyphs (   ) render seamlessly aligned with terminal cell grids  │ │  │
│  │ │ 4  export const session: SawalaSession = new SawalaSession({                           │ │  │
│  │ │ 5    terminalFont: "Sawala Mono NF",                                                   │ │  │
│  │ │ 6    iconsEnabled: true, //  Verified Nerd Font 3.3.0 patch                            │ │  │
│  │ │ 7  });                                                                                 │ │  │
│  │ │                                                                                        │ │  │
│  │ │ NORMAL   main   +2 ~1   typescript  100%  7:2                                  │ │  │
│  │ └────────────────────────────────────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [4-TIER DISTRIBUTION MATRIX]                                                                    │
│  • Eyebrow: PACKAGING & RELEASES                                                                 │
│  • Title:   Choose Your Optimal Distribution                                                     │
│                                                                                                  │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐ │
│  │ Sawala Mono         │ │ Sawala Mono NL      │ │ Sawala Mono NF      │ │ Sawala Mono NL NF   │ │
│  │ [FEATURED / FLAGSHIP│ │ [NO LIGATURES]      │ │ [NERD FONT PATCHED] │ │ [NERD FONT + NO LIG]│ │
│  │                     │ │                     │ │                     │ │                     │ │
│  │ Standard coding     │ │ Strict symbolic     │ │ 10,000+ developer   │ │ Terminal glyphs     │ │
│  │ ligatures active.   │ │ separation.         │ │ icons & Powerline.  │ │ without ligatures.  │ │
│  │ Modern IDEs         │ │ Pure literals       │ │ Neovim, Tmux, Kitty │ │ Terminals/Pure      │ │
│  │                     │ │                     │ │                     │ │                     │ │
│  │ [Download ZIP]      │ │ [Download ZIP]      │ │ [Download ZIP]      │ │ [Download ZIP]      │ │
│  │ SawalaMono-v1.0.0   │ │ SawalaMonoNL-v1.0.0 │ │ SawalaMono-NF-v1.0.0│ │ SawalaMonoNL-NF-v1. │ │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘ └─────────────────────┘ │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [QUICK SETUP & IDE CONFIG GENERATOR]                                                            │
│  • Eyebrow: INSTANT SETUP                                                                        │
│  • Title:   Configure Your Favorite Environment in Seconds                                       │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ TABS: [ VS Code ] [ JetBrains ] [ Neovim ] [ Alacritty ] [ Kitty ] [ WezTerm ] [ Windows ] │  │
│  ├────────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ // VS Code settings.json                                              [ Copy Configuration ]│  │
│  │ {                                                                                          │  │
│  │   "editor.fontFamily": "'Sawala Mono', monospace",                                         │  │
│  │   "editor.fontLigatures": true,                                                            │  │
│  │   "editor.fontSize": 14,                                                                   │  │
│  │   "editor.lineHeight": 1.5                                                                 │  │
│  │ }                                                                                          │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [CALL-TO-ACTION RELEASE BANNER (cta-banner)]                                                    │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Ready for human deliberation in your editor?                                              │  │
│  │ Download Sawala Mono v1.0.0 today and elevate your daily code reviews.                     │  │
│  │                                                                                            │  │
│  │ [ Download All Distributions (ZIP) ] (button-primary)      [ Star on GitHub ] (button-sec) │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  [FOOTER & OPEN SOURCE CREDITS]                                                                  │
│  • Wordmark: Sawala Mono • Ergonomic Coding Typeface                                             │
│  • License: Distributed under the SIL Open Font License 1.1 (OFL).                               │
│  • Credits: Heartfelt thanks to Belleve Invis (Iosevka creator) and Ryan L. McIntyre (Nerd Fonts).│
│  • Links: GitHub Repo • Releases • Issues • Ligatures Catalog • Install Guide                    │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 4.5.2 Mobile Responsive Wireframe (`index.html` at Viewports $< 768\text{px}$)

```text
┌───────────────────────────────────────────────┐
│ [=] Sawala Mono [v1.0.0]         [Download]   │ (Top Nav: height 56px, hamburger toggle)
├───────────────────────────────────────────────┤
│ INTELLECTUAL EXCHANGE IN CODE                 │
│                                               │
│ Code is written for                           │
│ human deliberation.                           │ (display-md: 36px font size, letter-spacing: -1.0px)
│                                               │
│ Derived from the Sundanese word sawala. An    │
│ ergonomic coding monospace built on Iosevka.  │
│                                               │
│ [ Download v1.0.0 (ZIP) ] (Full width button) │
│ [ View on GitHub ]                            │
│                                               │
│ ┌─ POLYGLOT CODE RUNNER ────────────────────┐ │
│ │ [TS] [Rust] [Go] [Py] [Lua] (Touch-scroll)│ │
│ │ 1 │ const review = async () => {          │ │ (Horizontal code scroll preserved)
│ │ 2 │   return pr.isApproved();             │ │
│ │ 3 │ };                                    │ │
│ └───────────────────────────────────────────┘ │
│                                               │
│ ┌─ ANATOMY (1-Up Vertical Stack) ───────────┐ │
│ │ Slashed Zero: 0 vs O                      │ │
│ ├───────────────────────────────────────────┤ │
│ │ Distinct 1 / l / I                        │ │
│ ├───────────────────────────────────────────┤ │
│ │ High-Contrast Delimiters: { [ ( ) ] }     │ │
│ └───────────────────────────────────────────┘ │
│                                               │
│ ┌─ LIVE SPECIMEN (Stacked Controls) ────────┐ │
│ │ Size: [ 16px ] │ Weight: [ Regular 400 ]  │ │
│ │ Slope: [ Upright ] [ Italic ]             │ │
│ ├───────────────────────────────────────────┤ │
│ │ // Live editable textarea...              │ │
│ │ function helloWorld() => true;            │ │
│ └───────────────────────────────────────────┘ │
│                                               │
│ ┌─ DISTRIBUTIONS (1-Up Cards Stack) ────────┐ │
│ │ Sawala Mono (Standard)         [Download] │ │
│ ├───────────────────────────────────────────┤ │
│ │ Sawala Mono NL (No Ligatures)  [Download] │ │
│ ├───────────────────────────────────────────┤ │
│ │ Sawala Mono NF (Nerd Font)     [Download] │ │
│ ├───────────────────────────────────────────┤ │
│ │ Sawala Mono NL NF              [Download] │ │
│ └───────────────────────────────────────────┘ │
│                                               │
│ (c) 2026 Sawala Mono • SIL OFL 1.1            │
└───────────────────────────────────────────────┘
```

#### 4.5.3 Subpage Wireframes (`web-docs/pages/`)

##### A. Complete Ligatures Catalog (`web-docs/pages/ligatures.html`)
```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP NAV] Sawala Mono [v1.0.0]     Overview  Anatomy  Ligatures  Specimen  Distributions  Setup │ [Download ZIP] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumb: Home > Documentation > Full Ligature Catalog                                         │
│                                                                                                  │
│ Title: Complete Programming Ligatures Catalog                                                    │
│ Subhead: Exhaustive reference of ~50+ contextual alternate (calt) glyph substitutions.           │
│                                                                                                  │
│ Filter: [ All (52) ] [ Arrows (14) ] [ Equality & Logical (16) ] [ Scopes (8) ] [ Markup (6) ]    │
│                                                                                                  │
│ ┌──────────────────────┬──────────────────────┬────────────────────────┬──────────────────────┐  │
│ │ ASCII INPUT SEQUENCE │ LIGATURE RENDERING   │ UNICODE LOOKUP / NAME  │ TARGET LANGUAGES     │  │
│ ├──────────────────────┼──────────────────────┼────────────────────────┼──────────────────────┤  │
│ │ =>                   │         =>           │ Fat Right Arrow        │ JS, TS, Rust, Scala  │  │
│ │ !==                  │        !==           │ Strict Not Equal       │ JS, TS, PHP          │  │
│ │ ===                  │        ===           │ Strict Equal           │ JS, TS, PHP          │  │
│ │ !=                   │         !=           │ Not Equal              │ C, C++, Go, Python   │  │
│ │ ->                   │         ->           │ Thin Right Arrow       │ C, C++, Rust, Haskell│  │
│ │ <-                   │         <-           │ Thin Left Arrow        │ Go, R, OCaml         │  │
│ │ ::                   │         ::           │ Double Colon / Scope   │ C++, Rust, Ruby      │  │
│ │ <=>                  │        <=>           │ Spaceship Comparison   │ C++20, Ruby, PHP     │  │
│ │ ??=                  │        ??=           │ Nullish Assignment     │ TS, C#, PHP          │  │
│ │ |>                   │         |>           │ Pipeline Operator      │ Elixir, F#, OCaml    │  │
│ └──────────────────────┴──────────────────────┴────────────────────────┴──────────────────────┘  │
│                                                                                                  │
│ [<- Return to Main Showcase]                                                                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

##### B. Comprehensive Installation Guide (`web-docs/pages/installation.html`)
```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP NAV] Sawala Mono [v1.0.0]     Overview  Anatomy  Ligatures  Specimen  Distributions  Setup │ [Download ZIP] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumb: Home > Documentation > Installation Guide                                            │
│                                                                                                  │
│ Title: Installing Sawala Mono on Your System                                                     │
│ Subhead: Step-by-step instructions for Windows, macOS, Linux, and terminal environments.         │
│                                                                                                  │
│ OS Selector: [ Windows 10/11 ] [ macOS (Font Book) ] [ Linux (fc-cache) ] [ Homebrew / Arch ]   │
│                                                                                                  │
│ ┌─ WINDOWS INSTRUCTIONS ──────────────────────────────────────────────────────────────────────┐  │
│ │ 1. Download SawalaMono-v1.0.0.zip from GitHub Releases.                                     │  │
│ │ 2. Extract the archive into a folder.                                                       │  │
│ │ 3. Select all .ttf font files -> Right-click -> Select "Install for all users".              │  │
│ │    [!] TIP: "Install for all users" prevents permission errors in Java IDEs & Neovim.       │  │
│ │ 4. Open Windows Terminal or VS Code and configure "'Sawala Mono', monospace".              │  │
│ └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│ [<- Return to Main Showcase]                                                                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

##### C. Distributions Technical Comparison Guide (`web-docs/pages/distributions.html`)
```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP NAV] Sawala Mono [v1.0.0]     Overview  Anatomy  Ligatures  Specimen  Distributions  Setup │ [Download ZIP] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumb: Home > Documentation > Font Distributions Matrix                                     │
│                                                                                                  │
│ Title: Choosing the Right Sawala Mono Variant                                                    │
│ Subhead: Detailed technical breakdown of ligation tables, icon coverage, and target use cases.  │
│                                                                                                  │
│ ┌──────────────────────┬──────────────────────┬──────────────────────┬────────────────────────┐  │
│ │ FEATURE / SPEC       │ SAWALA MONO (STD)    │ SAWALA MONO NL       │ SAWALA MONO NF         │  │
│ ├──────────────────────┼──────────────────────┼──────────────────────┼────────────────────────┤  │
│ │ Primary Use Case     │ Modern IDEs (VS Code)│ Strict literal coding│ Terminal / Neovim      │  │
│ │ Programming Ligatures│ Yes (~50+ OpenType)  │ No (Strict discrete) │ Yes (~50+ OpenType)    │  │
│ │ Nerd Font Icons      │ No (Clean unicode)   │ No (Clean unicode)   │ Yes (10,000+ glyphs)   │  │
│ │ Metrics Match        │ Width: 500 / x-H: 520│ Width: 500 / x-H: 520│ Width: 500 / x-H: 520  │  │
│ │ Recommended Terminal │ Windows Term / Alac  │ Any terminal         │ Kitty / WezTerm / Tmux │  │
│ │ Direct Archive Asset │ SawalaMono-v1.0.0.zip│ SawalaMonoNL-v1.0.zip│ SawalaMono-NF-v1.0.zip │  │
│ └──────────────────────┴──────────────────────┴──────────────────────┴────────────────────────┘  │
│                                                                                                  │
│ [<- Return to Main Showcase]                                                                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 4.5.4 Interactive Comparative Specimen Overlay Wireframe

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [PROPORTIONAL COMPARISON SLIDER]                                                                │
│  • Eyebrow: ERGONOMIC X-HEIGHT COMPARISON                                                        │
│  • Title:   Generous x-Height Engineered for Reduced Eye Strain                                  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ SLIDER CONTAINER [surface-1 / rounded.xl / 1px hairline]                                   │  │
│  │                                                                                            │  │
│  │  Generic Monospace Font              │  Sawala Mono (x-height: 520, cap-height: 735)       │  │
│  │                                      │                                                     │  │
│  │  const a = 10;                       │  const a = 10;                                      │  │
│  │  function readCode(x) {              │  function readCode(x) {                             │  │
│  │    return x !== null ? x : 0;        │    return x !== null ? x : 0;                       │  │
│  │  }                                   │  }                                                  │  │
│  │                               ◄───[○]───►                                                  │  │
│  │                                (Drag to compare proportions & aperture openness)           │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.6 Design System Component Binding & Token Matrix

*Exhaustive cross-reference verifying 100% traceability to [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md):*

| Section / UI Surface | `DESIGN.md` Component Identifier | Background Surface Token | Border / Hairline Token | Typography Token | Radius Token | Padding / Height Token |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Top Navigation Bar** | [`top-nav`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L274) | `{colors.canvas}` (`#010102`) | 1px `{colors.hairline}` bottom rule | `{typography.body-sm}` (`14px/400`) | `{rounded.xs}` (`4px`) | Height: `56px`, Padding: `0 32px` |
| **Version Status Badge** | [`status-badge`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L268) | `{colors.surface-2}` (`#141516`) | None | `{typography.caption}` (`12px/400`) | `{rounded.pill}` (`9999px`) | Padding: `2px 8px` |
| **Primary CTA Button** | [`button-primary`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L132) | `{colors.primary}` (`#5e6ad2`) | None (Hover: `#828fff`, Focus: `#5e69d1`) | `{typography.button}` (`14px/500`) | `{rounded.md}` (`8px`) | Padding: `8px 14px` |
| **Secondary Button** | [`button-secondary`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L148) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (`#23252a`) | `{typography.button}` (`14px/500`) | `{rounded.md}` (`8px`) | Padding: `8px 14px` |
| **Hero Title Headline** | Display Type | Transparent | None | `{typography.display-xl}` (`80px/600/track -3.0px`) | None | Margin-bottom: `24px` |
| **Hero Lead Paragraph** | Body Lead | Transparent | None | `{typography.body-lg}` (`18px/400/track -0.1px`) | None | Margin-bottom: `32px` |
| **Polyglot Runner Frame** | [`specimen-playground-panel`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L196) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (`#23252a`) | `{typography.mono}` (`14px/400/1.65`) | `{rounded.xl}` (`16px`) | Padding: `24px` |
| **Anatomical Cards (3-up)** | [`feature-card`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L190) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (`#23252a`) | `{typography.body}` (`16px/400`) | `{rounded.lg}` (`12px`) | Padding: `24px` |
| **Ligature Toggle Tab** | [`variant-switcher-tab`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L238) | Selected: `{colors.surface-2}` / Idle: `{colors.canvas}` | 1px `{colors.hairline}` | `{typography.button}` (`14px/500`) | `{rounded.pill}` (`9999px`) | Padding: `6px 14px` |
| **Ligature Symbol Cells** | [`glyph-grid-tile`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L202) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (Hover: `#34343a`) | `{typography.mono}` (`20px/400`) | `{rounded.md}` (`8px`) | Padding: `16px` |
| **Tester Controls Bar** | Sub-nav Toolbar | `{colors.surface-2}` (`#141516`) | 1px `{colors.hairline-strong}` (`#34343a`) | `{typography.body-sm}` (`14px/400`) | `{rounded.md}` top | Padding: `12px 16px` |
| **Live Specimen Textarea** | [`specimen-playground-panel`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L196) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` bottom/sides | `{typography.mono}` (Dynamic size/weight) | `{rounded.md}` bottom | Padding: `24px` |
| **Character Matrix Tiles** | [`glyph-grid-tile`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L202) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (Active: `#5e69d1`) | `{typography.mono}` (`18px/400`) | `{rounded.md}` (`8px`) | Padding: `14px 10px` |
| **Terminal Mockup Card** | [`product-screenshot-card`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L208) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (`#23252a`) | `{typography.mono}` (`13.5px/400/1.5`) | `{rounded.xl}` (`16px`) | Padding: `24px` |
| **Distribution Card (Std)** | [`distribution-card`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L166) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (`#23252a`) | `{typography.body}` (`16px/400`) | `{rounded.lg}` (`12px`) | Padding: `24px` |
| **Distribution Card (Feat)**| [`distribution-card-featured`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L172) | `{colors.surface-2}` (`#141516`) | 1px `{colors.hairline-strong}` (`#34343a`) | `{typography.body}` (`16px/400`) | `{rounded.lg}` (`12px`) | Padding: `24px` |
| **Editor Config Tabs** | [`pricing-tab-default`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L244) | Active: `{colors.surface-2}`, Inactive: `{colors.canvas}` | 1px `{colors.hairline}` | `{typography.button}` (`14px/500`) | `{rounded.pill}` (`9999px`) | Padding: `6px 14px` |
| **CTA Release Banner** | [`cta-banner`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L527) | `{colors.surface-1}` (`#0f1011`) | 1px `{colors.hairline}` (`#23252a`) | `{typography.headline}` (`32px/600`) | `{rounded.lg}` (`12px`) | Padding: `48px` |
| **Footer Link Grid** | [`footer`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L280) | `{colors.canvas}` (`#010102`) | 1px `{colors.hairline}` top rule | `{typography.caption}` (`12px/400`) | `{rounded.xs}` (`4px`) | Padding: `64px 32px` |

---

## 5. Clean Architecture Seams & Component Boundaries

```text
====================================================================================================
                        WEB PLATFORM CLEAN ARCHITECTURE SEAMS
====================================================================================================

Presentation & HTML Shell (Outer Boundary / GitHub Pages Entry)
   └── index.html, web-docs/pages/*.html

Interface Adapters & Interaction Controllers (UI Logic Layer)
   ├── web-docs/js/polyglot-runner.js       (Manages language tabs & snippet state)
   ├── web-docs/js/ligature-playground.js   (Manages font-variant-ligatures toggle & matrix)
   ├── web-docs/js/specimen-tester.js       (Binds slider inputs to CSS font properties)
   ├── web-docs/js/glyph-matrix.js          (Orchestrates character grid & detail inspection)
   ├── web-docs/js/terminal-preview.js      (Simulates interactive terminal prompt & Powerline icons)
   ├── web-docs/js/distribution-cards.js    (Renders release download links & tags)
   └── web-docs/js/config-generator.js      (Binds tab selection & clipboard API)

Domain Contracts & Visual Tokens (Design System Layer)
   ├── web-docs/css/tokens.css              (Color, typography, surface ladder, spacing tokens)
   ├── web-docs/css/typography.css          (@font-face declarations for Sawala Mono & fallbacks)
   └── web-docs/css/showcase.css            (Card specs, playground layout, hairlines)

Infrastructure Assets (Inert Web Storage)
   ├── web-docs/fonts/sawala-mono/*.woff2   (Tier A WOFF2 webfonts)
   └── web-docs/vendor/prism/*              (Client-side syntax highlighter)
```

- **Dependency Rule:** Presentation scripts depend inward on Design Tokens (`tokens.css`) and static contracts (`types.ts`). They NEVER reference the root font compiler (`packages/*`, `verdafile.mjs`).
- **Isolation Invariant:** Modifying or adding pages in `web-docs/` cannot trigger font re-compilations or break Docker builds.

---

## 6. Acceptance Criteria (Given-When-Then)

### REQ-001: Root Showcase Landing Page
- **AC-001 (Happy Path - Initial Page Load):**  
  *Given* a developer navigates to the GitHub Pages URL,  
  *When* the page completes initial load,  
  *Then* `index.html` renders with background `#010102`, the sticky top navigation bar (56px height) displays the Sawala Mono wordmark, and the Hero section appears above the fold with zero layout shift.
- **AC-002 (Responsive Navigation Collapse):**  
  *Given* a viewport width $< 768\text{px}$ (Mobile breakpoint),  
  *When* the page renders,  
  *Then* the centered navigation links collapse into a hamburger menu or horizontal touch-scrolling row while preserving the primary Download CTA button.

### REQ-002: Hero & Cultural Identity
- **AC-003 (Philosophy & Storytelling Display):**  
  *Given* the Hero section is rendered,  
  *When* inspecting the content,  
  *Then* the headline displays `"Code is written for human deliberation"` (`display-xl` font size with negative tracking `-3.0px`), accompanied by the explanation of Sundanese *Sawala*.
- **AC-004 (Polyglot Code Runner Language Switch):**  
  *Given* the Hero code runner is displaying TypeScript by default,  
  *When* the user clicks the "Rust" tab,  
  *Then* the code snippet transitions immediately to the Rust sample exhibiting pattern matching and ligatures (`match`, `=>`, `->`, `::`), styled with Sawala Mono monospace type.

### REQ-003: Ergonomic Typographic Anatomy Breakdown
- **AC-005 (Anatomical Tiles Rendering):**  
  *Given* the user scrolls to the Anatomy section,  
  *When* the section is visible,  
  *Then* 4 distinct cards rendered on `surface-1` (`#0f1011`) with 1px hairline borders (`#23252a`) showcase:
  1. Slashed `0` vs capital `O` with superimposed center-stroke comparison.
  2. Distinct glyphs for `1`, `l`, and `I`.
  3. Geometric curly braces `{ }` with flat boundary curves.
  4. Dual slope comparison showing upright `a` vs cursive italic tailed `a`.

### REQ-004: Interactive Ligature Matrix
- **AC-006 (Ligature Mode Toggle):**  
  *Given* the Ligature Playground is in standard mode (Sawala Mono with ligatures active),  
  *When* the user toggles the variant switcher to "No Ligatures (Sawala Mono NL)",  
  *Then* the CSS property `font-variant-ligatures` shifts from `normal` to `none`, and all symbols in the preview matrix instantly render as discrete literal ASCII characters without page reload.
- **AC-007 (Interactive Symbol Hover):**  
  *Given* the 10-symbol ligature transformation grid,  
  *When* the user hovers over the `=>` symbol tile,  
  *Then* the tile elevates to `surface-2` (`#141516`) with hairline-strong border (`#34343a`), displaying the sequence breakdown (`=` followed by `>`).

### REQ-005: Live Specimen Playground
- **AC-008 (Real-Time Custom Text Editing):**  
  *Given* the Live Specimen Playground textarea,  
  *When* the user types custom code or arbitrary Unicode text,  
  *Then* the text renders live in `Sawala Mono` at the exact size, weight, and slope specified by the controls.
- **AC-009 (Font Size Slider Reactive Binding):**  
  *Given* the Font Size slider is currently at 16px,  
  *When* the user slides the control to 32px,  
  *Then* the specimen preview text updates smoothly to `font-size: 32px` with the current line height maintained at the selected ratio.
- **AC-010 (Slope Toggle Binding):**  
  *Given* the Slope control is set to "Upright",  
  *When* the user clicks "Italic (9.4°)",  
  *Then* the specimen text shifts to `font-style: italic`, activating the cursive italic glyph variants (`SawalaMono-Italic.woff2`).

### REQ-006: 4-Tier Distribution Matrix
- **AC-011 (Distribution Cards Display):**  
  *Given* the Distributions section,  
  *When* rendered on desktop ($\ge 1024\text{px}$),  
  *Then* a 4-card grid displays `Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, and `Sawala Mono NL NF`, each listing recommended environments and target archive filenames (`SawalaMono-v1.0.0.zip`, `SawalaMonoNL-v1.0.0.zip`, `SawalaMono-NF-v1.0.0.zip`, `SawalaMonoNL-NF-v1.0.0.zip`).
- **AC-012 (Direct Download Linking):**  
  *Given* the user clicks "Download ZIP" on any distribution card,  
  *When* the link is activated,  
  *Then* the browser initiates download directly targeting the repository's GitHub Releases asset endpoint (`https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases/download/...`).

### REQ-007: Quick Setup & Config Generator
- **AC-013 (Editor Tab Switch & Copy-to-Clipboard):**  
  *Given* the Configuration Generator section,  
  *When* the user clicks the "VS Code" tab and presses the "Copy Configuration" button,  
  *Then* the JSON snippet is copied to the system clipboard, the button icon changes to a checkmark in `#27a644` green, and the button text displays *"Copied!"* for 2000 milliseconds before resetting.
- **AC-014 (Clipboard Fallback Execution):**  
  *Given* a browser environment where `navigator.clipboard` is restricted,  
  *When* the user clicks "Copy Configuration",  
  *Then* the configuration textarea auto-selects its entire contents, prompting the user with a non-blocking toast *"Press Ctrl+C to copy"*.

### REQ-008: Documentation Subpages
- **AC-015 (Subpage Navigation & Breadcrumb):**  
  *Given* the user is on `index.html`,  
  *When* clicking "View Full Ligature Catalog" in Section 4,  
  *Then* the browser navigates to `web-docs/pages/ligatures.html`, rendering the comprehensive catalog with consistent navigation, typography tokens, and a back-link to the home showcase.

### REQ-009: Character Inspector & Glyph Browser
- **AC-016 (Glyph Matrix Interaction & Codepoint Tooltip):**  
  *Given* the Character Inspector section displaying the 5 category tabs,  
  *When* the user clicks the "Digits & Math" tab and selects the `'0'` tile,  
  *Then* an interactive detail card displays: Unicode `U+0030`, Character Name `"DIGIT ZERO"`, Active Variant `"tall-reverse-slashed"` (per `private-build-plans.toml:61`), and a 96px magnified preview rendered in Sawala Mono.

### REQ-010: Nerd Font Terminal Preview Mockup
- **AC-017 (Terminal Mockup with Powerline Glyphs):**  
  *Given* the Nerd Font section on `index.html`,  
  *When* inspecting the terminal mockup card (`product-screenshot-card`),  
  *Then* the terminal simulates a Starship/Neovim prompt displaying Powerline segment glyphs (``, ``), Git branch indicator, execution duration, and directory icon without downloading additional font files, styled with `surface-1` background and 16px corner radius (`rounded.xl`).

### REQ-011: SEO, Social Graph & Security Invariants
- **AC-018 (Metadata & CSP Tag Verification):**  
  *Given* the `<head>` element of `index.html`,  
  *When* parsed by search engines or social scrapers,  
  *Then* it contains valid `<meta>` tags for `og:image` pointing to `sawala-mono-hero-img.jpg`, `twitter:card` set to `summary_large_image`, `theme-color` set to `#010102`, and a `<meta http-equiv="Content-Security-Policy">` enforcing zero external tracker scripts.

### REQ-012: Interactive Proportional Font Comparison Slider
- **AC-019 (Comparative Split Slider Drag):**  
  *Given* the Proportional Comparison Slider on `index.html`,  
  *When* the user drags the split divider handle horizontally,  
  *Then* the container smoothly reveals the proportional contrast between generic monospace and Sawala Mono in real-time, showing x-height alignment guides (x-height 520, cap-height 735) without layout flickering.

---

### 6.1 Value Sourcing & Positive Input Coverage Table

*Every value that the feature displays, computes, or persists in `AC-001..019` has an explicit named source:*

| Required Output / Displayed Value | AC Ref | Named Source (`DESIGN.md` / Repo File / Derivation Formula) | Boundary / Edge Variation |
| :--- | :---: | :--- | :--- |
| **Canvas Background Color (`#010102`)** | `AC-001` | [`DESIGN.md:15`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L15) (`colors.canvas`) | Zero deviation; must not default to `#000000` |
| **Surface-1 Card Fill (`#0f1011`)** | `AC-005` | [`DESIGN.md:16`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L16) (`colors.surface-1`) | Contrast ratio against `#f7f8f8` text $\ge 16:1$ |
| **Primary CTA Fill (`#5e6ad2`)** | `AC-001` | [`DESIGN.md:7`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L7) (`colors.primary`) | Button hover uses `#4c58c6` (`5.97:1` WCAG AA with `#ffffff` ink); dark-bg link hover uses `#828fff`; focus uses `#5e69d1` |
| **Hero Display Headline** | `AC-003` | Derived: *"Code is written for human deliberation"* | 80px desktop, downscales to 36px on mobile ($< 480\text{px}$) |
| **Hero Tracking (-3.0px)** | `AC-003` | [`DESIGN.md:37`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L37) (`letterSpacing: -3.0px`) | Scaled to $-1.0\text{px}$ on mobile |
| **Polyglot Code Snippets (5 langs)** | `AC-004` | Inline static contracts in `web-docs/js/polyglot-runner.js` | TS, Rust, Go, Python, Lua snippets containing `=>`, `->`, `::` |
| **Ligature Sequences & Transformations** | `AC-006` | [`params/ligation-set.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/params/ligation-set.toml) (`[composite.default-calt]`) | Tested with `calt: normal` vs `calt: none` |
| **Ligature Toggle CSS Property** | `AC-006` | Derived: `font-variant-ligatures: normal` vs `none` | Cross-browser fallback: `font-feature-settings: "calt" 1` vs `0` |
| **Specimen Font Size Range** | `AC-009` | Slider bounded: `min="12" max="48" step="1" value="16"` | Input clamps strictly between 12 and 48 |
| **Specimen Font Weights** | `AC-010` | Tier A Core: `400`, `600`, `700` (`build-plans.toml`) | Tier B weights (`100`..`900`) preview via CSS synthesis until subsetted Tier B slices are built |
| **Distribution Archive Names** | `AC-011` | [`DESIGN.md:550-557`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L550-L557) & [`.github/workflows/build.yml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/build.yml) | Standard, NL, NF, NL NF release filenames (`v1.0.0` release tag) |
| **Editor Config Snippets (7 tools)** | `AC-013` | [`README.md:91-184`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md#L91-L184) (VS Code, JetBrains, Neovim, etc.) | Indentation normalized to 2 spaces for JSON/Lua |
| **Copy Feedback Accent (`#27a644`)** | `AC-013` | [`DESIGN.md:28`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L28) (`colors.semantic-success`) | Resets to default ink color after 2000ms timeout |
| **Glyph Inspector Metadata & Variants** | `AC-016` | [`private-build-plans.toml:18-61`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L18-L61) & [`params/variants.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/params/variants.toml) | Codepoints U+0000 to U+007F, exact `ss03` + design overrides |
| **Terminal Mockup Powerline Symbols** | `AC-017` | Standard Nerd Font Unicode: `U+E0B0` (``), `U+E0B1` (``), Git `U+E0A0` (``) | SVG fallback for systems without NF installed |
| **Social Preview Image URL** | `AC-018` | Root asset: [`sawala-mono-hero-img.jpg`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/sawala-mono-hero-img.jpg) | `2400x1792` (~4:3) hero showcase image with `og:url` + `canonical` |
| **Comparative Slider Proportions** | `AC-019` | [`params/parameters.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/params/parameters.toml) | x-height: 520, cap-height: 735, width: 500 |

---

## 7. Testing Strategy & Dimensional Bounds

- **Testing Seam:** Client-side static browser runtime. Verification is asserted via:
  1. Static HTML/CSS validation: W3C validation pass on `index.html` and `web-docs/pages/*.html`.
  2. Token compliance: Zero rogue color hexes outside the tokens defined in `tokens.css`.
  3. Interactive DOM Unit / Seam Checks:
     - Language tab click changes code runner contents.
     - Ligature switch toggles CSS classes and OpenType attributes.
     - Size/weight sliders update textarea inline styles.
     - Copy button populates clipboard mock.
- **Dimensional Bounds & Viewport Limits:**
  - Viewports: `320px` (min mobile), `375px` (iPhone), `768px` (tablet portrait), `1024px` (tablet landscape), `1280px` (standard desktop), `1440px` (large desktop).
  - Font Size Bounds: Minimum `12px`, default `16px`, maximum `48px`.
  - Line Height Bounds: Minimum `1.2`, default `1.5`, maximum `2.0`.
  - Copy Feedback Timer: Exactly `2000ms` duration before resetting button icon and text.

- **Core Web Vitals & Performance Budget SLA:**

| Metric / Dimension | Budget Threshold | Measurement Seam | Enforcing Architecture |
| :--- | :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | $< 1.0\text{s}$ | Chrome DevTools Lighthouse (Fast 4G) | Zero-build static HTML, critical CSS in `<head>` |
| **Largest Contentful Paint (LCP)** | $< 1.5\text{s}$ | Hero typography render | Tier A Core WOFF2 preload (`font-display: swap`) |
| **Cumulative Layout Shift (CLS)** | $= 0.00$ | Page lifecycle | Fallback font metrics matching + fixed aspect containers |
| **Interaction to Next Paint (INP)** | $< 50\text{ms}$ | Slider & tab interactions | Vanilla DOM manipulation without virtual DOM overhead |
| **Tier A Fonts Payload** | $\le 180\text{KB}$ target (Contingency Plan B active: full repertoire ~2.04 MB preloaded across 4 WOFF2s until `brotli` subsetting runs in CI) | Network transfer / Disk footprint | 5 checked-in WOFF2 files (400, 400i, 600, 700 + NL 400) |
| **Total CSS + JS Budget** | $\le 255\text{KB}$ raw (measured ~181 KB raw, ~44 KB gzip) | Static stylesheet & module sum | Modular zero-build vanilla CSS + ES modules |

- **Keyboard Navigation & ARIA Accessibility Invariants (WCAG 2.1 AA):**
  - **Tab Order Sequence:** Unbroken top-to-bottom tab order: Skip to main content $\to$ Top Nav links $\to$ Primary CTAs $\to$ Polyglot tabs $\to$ Playground sliders $\to$ Config tabs $\to$ Footer links.
  - **Tablist Semantics:** All tab switchers (`polyglot-runner`, `ligatures`, `glyph-matrix`, `config-generator`) declare `role="tablist"` on container, `role="tab"` on buttons, `aria-selected="true|false"`, and `aria-controls="panel-id"`.
  - **Keyboard Arrow Cycling:** Arrow keys (`ArrowLeft`, `ArrowRight`) cycle focus between sibling tabs; `Enter` or `Space` activates selection.
  - **Slider Accessibility:** Reactive sliders implement `role="slider"`, `aria-label`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`, supporting `ArrowUp`/`ArrowRight` (+step) and `ArrowDown`/`ArrowLeft` (-step).
  - **Reduced Motion:** When `@media (prefers-reduced-motion: reduce)` is active, all CSS transitions, copy indicator animations, and blinking mock terminal cursors are disabled immediately.

- **Extreme Limiting Cases (Specialization):**
  - **Zero Input in Specimen:** If user clears the textarea, the placeholder watermark text remains visible without collapsing container height.
  - **Very Long Custom Text:** Specimen textarea supports vertical scrolling with custom dark scrollbar matching `surface-3` (`#18191a`).
  - **Offline Browsing:** All core assets (CSS, JS, Tier A WOFF2 fonts, vendor Prism) are local relative files in `web-docs/`, allowing 100% offline functionality.

---

## 8. Architectural Decision Records (ADRs)

- [ADR-0001: Retention of `build-plans.toml` and Monorepo Workspaces](docs/adr/0001-retain-build-plans-and-tools.md) — Protects font build graph while keeping root clean.
- [ADR-0002: Standalone Containerized Nerd Font Patching Pipeline](docs/adr/0002-standalone-nerd-font-patcher.md) — Decouples NF asset creation for releases.
- **ADR-0003 (Proposed): Modular Zero-Build Architecture for Web Showcase on GitHub Pages:**  
  *Context:* Delivering a world-class font showcase directly on GitHub Pages without adding heavy npm frontend build dependencies to the font compiler repository.  
  *Decision:* Deploy directly from repository root using [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) and modular [`web-docs/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs) with vanilla ES modules and scoped CSS variables.  
  *Consequence:* Ultra-fast development, instant GitHub Pages deployment from `main`, zero risk of dependency collision with `verda` or Node runtimes.
