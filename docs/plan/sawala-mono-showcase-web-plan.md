---
goal: "Implementation Plan for Iosevka Sawala Mono Showcase & Technical Documentation Web Platform"
version: "1.0.0"
date_created: "2026-11-12"
last_updated: "2026-11-12"
status: "Completed (All 4 Phases Implemented & Verified — Awaiting TASK-018 Sign-Off)"
spec_ref: "docs/spec/sawala-mono-showcase-web-spec.md"
tags: ["polya", "plan", "tracer-bullets", "vertical-slicing", "clean-architecture", "sawala-mono", "github-pages", "linear-design"]
---
<!-- markdownlint-disable -->

# Implementation Plan: Sawala Mono Showcase & Documentation Web Platform

> [!IMPORTANT]
> **THE PAUSE RULE & VERTICAL SLICING MANDATE:**  
> All tasks in this plan are organized into **Vertical Feature Slices (Tracer Bullets)** spanning from Design System Tokens & Static Data Contracts to Modular ES Interaction Controllers and Semantic HTML Presentation. Horizontal layer-by-layer slicing is strictly prohibited.  
> After each phase is verified, execution MUST halt for explicit user approval before proceeding to the next phase. Functional production code MUST NOT be written until this plan is explicitly approved by the user.

---

## 1. Overview & High-Level Mental Model

This implementation plan sequences the construction of the **Iosevka Sawala Mono Interactive Showcase & Technical Documentation Web Platform** deployed natively on **GitHub Pages** from the repository root [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) and modular [`web-docs/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs) directory.

The execution strategy follows a **4-Phase Land-and-Expand Vertical Tracer Bullet** progression:
1. **Phase 1 (Land — Minimal Viable Tracer Bullet):** Establish the Linear dark-canvas design token system (`#010102`), bind the 5 verified Tier A WOFF2 webfonts in [`web-docs/fonts/sawala-mono/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/fonts/sawala-mono), and ship a working above-the-fold Hero + 5-Language Polyglot Code Specimen Runner with zero-build syntax highlighting.
2. **Phase 2 (Core Experience — Interactive Typography):** Deliver the core typographic evaluation capabilities inspired by JetBrains Mono and Ioskeley Mono: the 4-up Ergonomic Anatomy Breakdown, the interactive Proportional x-Height Comparison Slider, the 16-symbol Ligature Transformation Playground (`Sawala Mono` vs `Sawala Mono NL`), and the Live Editable Specimen Tester (`12px–48px`, weights `100–900`, `0°` vs `9.4°` italic).
3. **Phase 3 (Expand — Ecosystem, Distributions & Tooling):** Complete the 10-section root showcase with the 5-category Character Inspector & Glyph Browser (sourced from [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml)), the Nerd Font Terminal Preview Mockup, the 4-Tier Distribution Matrix with direct GitHub Release `.zip` links, and the 7-Editor Quick Setup Configuration Generator with 1-click clipboard copy and graceful fallback.
4. **Phase 4 (Subpages, Hardening & CI/CD):** Deliver the 3 standalone documentation subpages (`ligatures.html`, `distributions.html`, `installation.html`), enforce Content Security Policy (`CON-006`), WCAG 2.1 AA keyboard/ARIA accessibility (`CON-007`), Open Graph social metadata (`REQ-011`), root `.nojekyll` bypass (`CON-001`), and automated GitHub Pages deployment via `.github/workflows/pages.yml` (`CON-008`).

### Topological Data Flow & Clean Architecture Seam Diagram

```text
====================================================================================================
                  VERTICAL TRACER BULLET DATA FLOW (ZERO-BUILD STATIC RUNTIME)
====================================================================================================

[User Interaction / Browser Viewport]
        │
        ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. PRESENTATION SHELL (Outer Boundary — GitHub Pages Entry)                                      │
│    ├── index.html (10 Semantic Sections + Skip-Nav + ARIA Landmarks + CSP/OG Meta)               │
│    └── web-docs/pages/{ligatures,distributions,installation}.html                                │
└───────────────────────────────────────────────┬──────────────────────────────────────────────────┘
                                                │ DOM Events (input, click, keydown, pointermove)
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 2. INTERFACE ADAPTERS & INTERACTION CONTROLLERS (Single-Responsibility ES Modules)               │
│    ├── web-docs/js/main.js                (Sticky nav observer, mobile drawer, x-height slider)  │
│    ├── web-docs/js/polyglot-runner.js     (5-language tablist state & Prism syntax trigger)      │
│    ├── web-docs/js/ligature-playground.js (OpenType calt toggle & 16-operator hover matrix)      │
│    ├── web-docs/js/specimen-tester.js     (Reactive size/weight/line-height/slope bindings)      │
│    ├── web-docs/js/glyph-matrix.js        (80+ glyph grid filter & codepoint/variant inspector)  │
│    ├── web-docs/js/terminal-preview.js    (Starship/Neovim prompt simulator & Powerline SVGs)    │
│    ├── web-docs/js/distribution-cards.js  (4-tier release metadata & download URL resolver)      │
│    └── web-docs/js/config-generator.js    (7-editor tablist & Clipboard API + execCommand guard) │
└───────────────────────────────────────────────┬──────────────────────────────────────────────────┘
                                                │ CSS Custom Properties & Immutable Static Catalogs
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 3. DOMAIN CONTRACTS & DESIGN SYSTEM LAYER (Source-Grounded Tokens & Typography)                  │
│    ├── web-docs/css/tokens.css            (DESIGN.md Surface Ladder #010102..#191a1b, #5e6ad2)   │
│    ├── web-docs/css/reset.css             (Box-sizing, reduced-motion guard, focus-visible ring) │
│    ├── web-docs/css/typography.css        (@font-face Tier A WOFF2 rules & metric-matched stack) │
│    └── web-docs/css/showcase.css          (Component surfaces, hairline grids, responsive rules) │
└───────────────────────────────────────────────┬──────────────────────────────────────────────────┘
                                                │ Static Asset Fetch (HTTP/2 GitHub Pages CDN)
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 4. INFRASTRUCTURE ASSETS (Inert Local Storage — Strictly Decoupled from Font Compiler)           │
│    ├── web-docs/fonts/sawala-mono/*.woff2 (5 Verified Tier A Core WOFF2 Fonts: 400,400i,600,700) │
│    ├── web-docs/vendor/prism/*            (Standalone zero-build syntax highlighter + dark theme)│
│    └── .nojekyll & .github/workflows/pages.yml (GitHub Pages deployment & Jekyll bypass)         │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Design References & Prior Art Synthesis Matrix

*Pólya Heuristic: Analogy (p. 37). Systematic synthesis of external design benchmarks and repository artifacts directly anchoring execution:*

| Design Reference | Canonical Source / URL | Key Concepts & Patterns Borrowed | Concrete Adaptation in Sawala Mono Web Showcase | Design Token / Specification Anchor |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Design System** | [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md) (`linear.app`) | • Deep dark canvas `#010102`<br>• 4-step surface ladder (`#0f1011` $\to$ `#191a1b`)<br>• 1px hairline borders (`#23252a`)<br>• Signature lavender accent (`#5e6ad2`)<br>• Aggressive negative display tracking (`-3.0px`)<br>• 100% Monospace code dogfooding | Serves as the **foundational design system** for the entire showcase platform. All backgrounds, cards, typography, and button states strictly bind to Linear design tokens without generic styling. | [`tokens.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/tokens.css), `CON-002`, Section 1.5 Master Token Table |
| **JetBrains Mono** | `https://www.jetbrains.com/lp/mono/` | • Human-centric code reading storytelling<br>• Anatomical glyph breakdown (0 vs O, 1 vs l vs I)<br>• Interactive code ligatures demonstration<br>• Polyglot code runner (5 languages)<br>• Proportional x-Height comparison slider | • Hero storytelling: Sundanese *sawala* (code written for peer review)<br>• Polyglot runner with language switching<br>• 4-up anatomical cards with zoomed-in glyph comparisons<br>• Interactive ligature grid (`=>`, `!==`, `->`)<br>• Real-time x-height comparison slider | `REQ-002`, `REQ-003`, `REQ-004`, `REQ-012`, `AC-004`, `AC-005`, `AC-006`, `AC-019`, Sec 1.4.1, Sec 1.4.4 |
| **Ioskeley Mono** | `https://ahatem.github.io/IoskeleyMono/` | • Iosevka parametric lineage transparency<br>• Typographic metrics display (Cap 735, x-height 520, width 500)<br>• Live editable specimen tester with reactive sliders (size, weight, line-height, slope)<br>• 4-tier distribution clarity (Standard, NL, NF, NL NF)<br>• Compact WOFF2 web subsets | • Live specimen tester with real-time sliders (12–48px, 100–900 weight, 1.2–2.0 line-height)<br>• Character inspector glyph matrix (`glyph-grid-tile`)<br>• 4-tier distribution grid<br>• Tier A / Tier B webfont delivery SLA | `REQ-005`, `REQ-006`, `REQ-009`, `CON-004`, `AC-008`, `AC-009`, `AC-011`, `AC-016`, Sec 1.4.1 |
| **Sawala Mono Repository Context** | [`README.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md) & [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml) | • Meaning of *Sawala* (discussion/deliberation)<br>• Declarative glyph variant selections<br>• Standard configuration snippets for 7 editors<br>• Release archive naming conventions | • Hero philosophy copy<br>• Quick Setup Config Generator (VS Code, JetBrains, Neovim, Alacritty, Kitty, WezTerm, Windows Terminal)<br>• Direct GitHub Releases asset download URLs | `REQ-002`, `REQ-007`, `AC-003`, `AC-013`, `AC-014`, Sec 1.4.1 |

### 1.4 Visual Text Wireframes & ASCII UI Mockups

*Pólya Heuristic: "Draw a figure" (p. 99). Precise structural blueprints for the HTML templates authored across TASK-001, TASK-005, TASK-006, TASK-007, TASK-010, TASK-011, TASK-012, and TASK-015:*

#### 1.4.1 Desktop Showcase Wireframe (`index.html`)

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
│  │ SawalaMono-v1.0.0   │ │ SawalaMonoNL-v1.0.0 │ │ SawalaMono-NF-latest│ │ SawalaMonoNL-NF-lat │ │
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

#### 1.4.2 Mobile Responsive Wireframe (`index.html` at Viewports $< 768\text{px}$)

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

#### 1.4.3 Subpage Wireframes (`web-docs/pages/`)

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
│ └──────────────────────┴──────────────────────┴────────────────────────┴────────────────────────┘  │
│                                                                                                  │
│ [<- Return to Main Showcase]                                                                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1.4.4 Interactive Comparative Specimen Overlay Wireframe

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

### 1.5 Design Token Specifications (`web-docs/css/tokens.css`)

*All CSS variables extracted verbatim from [`DESIGN.md:6-130`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md#L6-L130) to anchor TASK-001:*

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

### 1.6 The 5 UI States Matrix

*Defines the 5 mandatory UI states across components to prevent unhandled render conditions during implementation:*

| Component / Surface | `Loading` State | `Empty` State | `Error` State | `Partial` State | `Populated` (Ideal) State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Webfont Renderer** | System monospace fallback with `font-display: swap`; zero layout shift. | N/A (Always has fallback). | System fallback monospace retained; warning badge in specimen panel. | Regular 400 loaded while Bold/Italic stream in background. | Native Sawala Mono WOFF2 rendered with crisp autohinting. |
| **Polyglot Code Runner** | Skeleton code block container with pulsing `#141516` surface. | Displays default `TypeScript` snippet if local storage selection is empty. | Displays raw un-highlighted code block if Prism script fails. | Code displayed without line numbers or syntax tags. | Full syntax-highlighted code with language tab indicator and line numbers. |
| **Specimen Custom Tester** | Skeleton textarea with `#0f1011` background. | Watermark placeholder: *"The quick brown fox jumps over the lazy dog. 0123456789 => !== ->"*. | Invalid font size capped to min 12px / max 48px boundary. | Custom text rendered at default Regular 400 weight. | Custom text dynamically rendered with user-selected weight, size, and slope. |
| **Character Inspector** | 20 pulsing skeleton tiles in `surface-1`. | N/A (Standard glyph catalog is predefined). | Failed font render falls back to system monospace. | Basic Latin loaded; extended blocks render on category select. | 5 categories populated with 80+ glyph tiles with interactive detail tooltip. |
| **Terminal Mockup** | Skeleton dark terminal window. | N/A (Static mock prompt is populated). | Fallback SVG arrows if custom Unicode fails to display. | Prompt displayed without command output history. | High-fidelity Starship/Neovim terminal prompt with Powerline arrows and git status. |
| **Config 1-Click Copy** | Default state: Copy button with SVG clipboard icon. | N/A (Predefined configs exist). | Clipboard permission rejected $\to$ text selected with prompt *"Press Ctrl+C to copy"*. | N/A. | Checkmark icon + *"Copied!"* label in `#27a644` green for 2000ms. |

### 1.7 Master Design System Component & Token Binding Matrix

*Exhaustive cross-reference verifying 100% traceability to [`DESIGN.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/DESIGN.md) for all authored templates:*

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

## 2. 📏 Task Sizing Matrix

Every task is scoped to fit reliably within a single focused engineering session (Size **XS** to **M**). Tasks touching $\ge 8$ files (**XL**) are strictly prohibited.

| Size   | Files Impacted | Scope                                           | Example in This Plan                                                       |
| :----- | :------------: | :---------------------------------------------- | :------------------------------------------------------------------------- |
| **XS** |       1        | Single pure module or configuration manifest    | `.nojekyll` or single-component controller update                          |
| **S**  |      1–2       | Focused vertical component slice                | Ligature Playground (`ligature-playground.js` + `index.html` section)      |
| **M**  |      3–5       | Standard Vertical Feature Slice (Tracer Bullet) | Phase 1 Land Slice (`tokens.css`, `typography.css`, `polyglot-runner.js`, `index.html`) |
| **L**  |      5–7       | Multi-component cohesive flow                   | Reserved only when coupling requires simultaneous multi-page updates       |
| **XL** |       8+       | **Strictly Prohibited (Too Large)**             | Decomposed into smaller Size S and M slices below                          |

---

## 3. Phased Implementation Sequence (Vertical Tracer Bullets)

> **EXECUTION DIRECTIVE FOR AI AGENTS (`/to-code` & `/to-code auto`):**  
> - **Interactive Mode (`/to-code`):** Execute ticket by ticket. Run `check:task` (from [`docs/ARCHITECTURE.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/ARCHITECTURE.md#L283) §8.2) plus slice-specific DOM/asset verification after each slice, then pause for user confirmation at each `APPROVAL` gate.  
> - **Autonomous Mode (`/to-code auto`):** Advance automatically through verified green tickets (`check:task` passing) until all phases complete or one of the **4 Circuit Breakers** triggers (*Ambiguous Spec*, *3x Verification Failure*, *Ratchet Regression*, or *Untracked Dependency/Architecture Change*).

### Implementation Phase 1: Land — Minimal End-to-End Tracer Bullet (Tokens, Webfonts, Hero & Polyglot Runner)
*Goal: Establish the Linear `#010102` design system, wire the 5 existing Tier A WOFF2 font files, and render a live, interactive above-the-fold Hero + 5-Language Polyglot Code Specimen Runner at root `index.html`.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-001 | **Hero & Polyglot Code Runner Tracer Bullet** — Author [`web-docs/css/tokens.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/tokens.css) (Linear surface ladder `#010102`–`#191a1b`, hairlines `#23252a`, accent `#5e6ad2`, syntax & breakpoint variables), [`web-docs/css/reset.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/reset.css), [`web-docs/css/typography.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/typography.css) (`@font-face` declarations binding the 5 verified Tier A WOFF2 files in `web-docs/fonts/sawala-mono/`), [`web-docs/js/polyglot-runner.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/polyglot-runner.js) (TypeScript, Rust, Go, Python, Lua snippets), and root [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) (Sticky `top-nav`, Sundanese *Sawala* Hero section with `display-xl` `-3.0px` tracking, Polyglot Code Runner panel, and `footer` shell) *[Wireframe Ref: §1.4.1 Hero, Top-Nav, Polyglot Runner, Footer; High Risk: ASSUMPTION-001]*. | REQ-001, REQ-002, CON-001, CON-002, CON-003, CON-004 | AC-001, AC-002, AC-003, AC-004 | - | 5 (M) | [x] | 2026-11-12 |
| TASK-002 | **Zero-Build Syntax Highlighter & Navigation Orchestrator Slice** — Create standalone syntax highlighter [`web-docs/vendor/prism/prism.min.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/vendor/prism/prism.min.js) and Tokyo Night / Catppuccin theme [`web-docs/vendor/prism/prism-sawala-dark.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/vendor/prism/prism-sawala-dark.css) bound to `--syntax-*` tokens, plus [`web-docs/js/main.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/main.js) orchestrating responsive mobile hamburger navigation (`< 768px`) and active section scroll-spy *[Wireframe Ref: §1.4.1 & §1.4.2; High Risk: ASSUMPTION-002]*. | REQ-001, REQ-002, CON-002, CON-005 | AC-001, AC-002, AC-004 | TASK-001 | 3 (M) | [x] | 2026-11-12 |
| TASK-003 | **VERIFY (`check:task`):** Run repository sanity check (`npx @biomejs/biome check . && node tools/misc/src/update-package-json-version.mjs --dry-run`) and verify via Node script that `index.html`, all 5 Tier A `.woff2` paths, `tokens.css`, and `polyglot-runner.js` resolve with zero broken references or rogue color hexes. | CON-002, CON-004, CON-005 | AC-001, AC-003, AC-004 | TASK-002 | - | [x] | 2026-11-12 |
| TASK-004 | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 2 (unless `/to-code auto`). | - | - | TASK-003 | - | [x] | 2026-11-12 |

### Implementation Phase 2: Core Experience — Typographic Anatomy, Comparison Slider, Ligatures & Live Specimen
*Goal: Deliver the interactive typographic inspection tools enabling developers to evaluate character disambiguation, x-height proportions, OpenType `calt` ligatures, and custom text rendering.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-005 | **Ergonomic Anatomy Breakdown & Proportional x-Height Comparison Slider Slice** — Author component layout styles in [`web-docs/css/showcase.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/showcase.css), add the 4-up Ergonomic Anatomy cards (`0` vs `O`, `1`/`l`/`I`, `{ [ ( ) ] }` flat-boundary braces, upright vs `9.4°` cursive italic `a`) and the interactive draggable split-view x-Height Comparison Slider (Sawala Mono `x-height: 520, cap-height: 735` vs generic monospace) into [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) and [`web-docs/js/main.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/main.js) *[Wireframe Ref: §1.4.1 Anatomy & §1.4.4 Proportional Slider]*. | REQ-003, REQ-012, CON-002, CON-003 | AC-005, AC-019 | TASK-002 | 3 (M) | [x] | 2026-11-12 |
| TASK-006 | **Interactive Ligature Playground & Variant Switcher Slice** — Implement [`web-docs/js/ligature-playground.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/ligature-playground.js) and the Ligature Playground section in [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) featuring the `variant-switcher-tab` pill (`Sawala Mono` `calt: 1` vs `Sawala Mono NL` `calt: 0`) and a 16-operator transformation matrix sourced from [`tools/data-export/src/ligation-data.mjs:7-60`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/tools/data-export/src/ligation-data.mjs#L7-L60) (`=>`, `!==`, `===`, `!=`, `==`, `->`, `<-`, `::`, `<=>`, `??=`, `<=`, `>=`, `<!--`, `++`, `\|>`, `...`) with `surface-2` hover sequence breakdown *[Wireframe Ref: §1.4.1 Ligature Playground]*. | REQ-004, CON-002, CON-003 | AC-006, AC-007 | TASK-005 | 2 (S) | [x] | 2026-11-12 |
| TASK-007 | **Live Type Specimen Playground & Reactive Controls Slice** — Implement [`web-docs/js/specimen-tester.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/specimen-tester.js) and the Live Specimen section in [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) with an editable code textarea, watermark placeholder guard, and reactive controls for Font Size (`12px–48px`), Font Weight (`100–900` with graceful Tier B lazy-load/synthesis handling), Line Height (`1.2–2.0`), and Slope Toggle (`Upright 0°` vs `Italic 9.4°`) *[Wireframe Ref: §1.4.1 Live Specimen; High Risk: ASSUMPTION-001]*. | REQ-005, CON-003, CON-004, CON-007 | AC-008, AC-009, AC-010 | TASK-006 | 2 (S) | [x] | 2026-11-12 |
| TASK-008 | **VERIFY (`check:task`):** Run `check:task` and verify via automated script that all 16 ligature sequences, slider bounds (`min="12" max="48"`, `min="1.2" max="2.0"`), anatomy cards, and comparison slider controls are present and conform to `DESIGN.md` surface tokens. | REQ-003, REQ-004, REQ-005, REQ-012 | AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-019 | TASK-007 | - | [x] | 2026-11-12 |
| TASK-009 | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 3 (unless `/to-code auto`). | - | - | TASK-008 | - | [x] | 2026-11-12 |

### Implementation Phase 3: Expand — Character Inspector, Nerd Font Terminal, Distributions & IDE Config Generator
*Goal: Complete all 10 sections of the main showcase page by adding deep glyph inspection, terminal icon simulation, release packaging cards, and 1-click editor setup snippets.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-010 | **Character Inspector & Glyph Browser Matrix Slice** — Implement [`web-docs/js/glyph-matrix.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/glyph-matrix.js) and the Character Inspector section in [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) with 5 category filter tabs (`Basic Latin`, `Digits & Math`, `Punctuation & Delimiters`, `Programming Symbols`, `Accented Latin`), 80+ interactive `glyph-grid-tile` cells, and a live inspection card displaying Unicode codepoint (`U+XXXX`), character name, 96px preview, and exact variant identifier from [`private-build-plans.toml:18-61`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml#L18-L61) *[Wireframe Ref: §1.4.1 Character Inspector]*. | REQ-009, CON-002, CON-003 | AC-016 | TASK-007 | 2 (S) | [x] | 2026-11-12 |
| TASK-011 | **Nerd Font Terminal Mockup & 4-Tier Distribution Matrix Slice** — Implement [`web-docs/js/terminal-preview.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/terminal-preview.js) (Starship/Neovim `product-screenshot-card` using inline SVG/UTF-8 Powerline glyphs ``, ``, `` with zero multi-MB webfont overhead), [`web-docs/js/distribution-cards.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/distribution-cards.js) (4-up cards for `Sawala Mono` featured on `surface-2`, `Sawala Mono NL`, `Sawala Mono NF`, and `Sawala Mono NL NF` targeting CI/CD release archive URLs), and the closing `cta-banner` in [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) *[Wireframe Ref: §1.4.1 Terminal Mockup, Distributions, CTA Banner]*. | REQ-006, REQ-010, CON-002, CON-004 | AC-011, AC-012, AC-017 | TASK-010 | 3 (M) | [x] | 2026-11-12 |
| TASK-012 | **Quick Setup IDE Configuration Generator & Clipboard Fallback Slice** — Implement [`web-docs/js/config-generator.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/config-generator.js) and the Quick Setup section in [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) providing 7 editor tabs (`VS Code`, `JetBrains IDEs`, `Neovim`, `Alacritty`, `Kitty`, `WezTerm`, `Windows Terminal`) sourced from [`README.md:91-184`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/README.md#L91-L184), 1-click `navigator.clipboard.writeText` copy with `#27a644` green checkmark + `"Copied!"` state (`2000ms` reset), and automatic textarea selection fallback (`"Press Ctrl+C to copy"`) when clipboard permissions are denied *[Wireframe Ref: §1.4.1 Quick Setup & IDE Config]*. | REQ-007, CON-007 | AC-013, AC-014 | TASK-011 | 2 (S) | [x] | 2026-11-12 |
| TASK-013 | **VERIFY (`check:task`):** Run `check:task` and verify via script that all 10 semantic sections exist in `index.html`, all 4 distribution archive names match CI/CD conventions, all 7 editor configurations are populated, and clipboard fallback logic is wired. | REQ-001, REQ-006, REQ-007, REQ-009, REQ-010 | AC-011, AC-012, AC-013, AC-014, AC-016, AC-017 | TASK-012 | - | [x] | 2026-11-12 |
| TASK-014 | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 4 (unless `/to-code auto`). | - | - | TASK-013 | - | [x] | 2026-11-12 |

### Implementation Phase 4: Documentation Subpages, Hardening (SEO, CSP, WCAG AA) & CI/CD Pipeline
*Goal: Build the 3 modular documentation subpages in `web-docs/pages/`, enforce strict CSP, SEO/OpenGraph metadata, and WCAG 2.1 AA accessibility across all pages, and configure automated GitHub Pages deployment.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| TASK-015 | **Modular Documentation Subpages Slice (`ligatures.html`, `distributions.html`, `installation.html`)** — Author [`web-docs/pages/ligatures.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages/ligatures.html) (complete catalog of 50+ OpenType `calt` ligatures with category filter tabs: All, Arrows, Equality & Logical, Scopes, Markup), [`web-docs/pages/distributions.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages/distributions.html) (technical specification & metric comparison matrix across all 4 variants + Normal/SemiExtended widths), and [`web-docs/pages/installation.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages/installation.html) (OS-tabbed installation guide for Windows, macOS, Linux `fc-cache`, and Homebrew/Arch with breadcrumb navigation back to `../../index.html`) *[Wireframe Ref: §1.4.3 Subpages A, B, C]*. | REQ-008, CON-001, CON-002, CON-003 | AC-015 | TASK-012 | 3 (M) | [x] | 2026-11-12 |
| TASK-016 | **SEO Social Graph, CSP, WCAG 2.1 AA Hardening & GitHub Pages CI/CD Slice** — Create root [`.nojekyll`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.nojekyll) and automated GitHub Actions deployment workflow [`.github/workflows/pages.yml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/pages.yml) (`actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`), and audit/harden [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html) and [`web-docs/css/showcase.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/showcase.css) for Open Graph / Twitter Card `<meta>` tags pointing to [`sawala-mono-hero-img.jpg`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/sawala-mono-hero-img.jpg), strict Content Security Policy header (`CON-006`), `rel="noopener noreferrer"` on external links, keyboard `ArrowLeft`/`ArrowRight` tab cycling, `aria-live="polite"` copy status, and `@media (prefers-reduced-motion: reduce)` *[Wireframe Ref: §1.4.2 Mobile Responsive & §1.4.1 Hardening]*. | REQ-011, CON-001, CON-005, CON-006, CON-007, CON-008 | AC-018 | TASK-015 | 4 (M) | [x] | 2026-11-12 |
| TASK-017 | **VERIFY (`check:full`):** Execute full verification suite (`npx @biomejs/biome check .` + comprehensive verification script auditing all 19 Acceptance Criteria `AC-001..AC-019`, internal/external link integrity, CSS token compliance, CSP header presence, and zero modification to font compiler packages). | CON-001, CON-002, CON-003, CON-004, CON-005, CON-006, CON-007, CON-008 | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012, AC-013, AC-014, AC-015, AC-016, AC-017, AC-018, AC-019 | TASK-016 | - | [x] | 2026-11-12 |
| TASK-018 | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to declare the implementation plan complete. | - | - | TASK-017 | - | [ ] | |

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare concrete fallback strategies for potential failure points in the primary strategy (p. 199).*

| Failure Point / Risk | Primary Strategy (Plan A) | Contingency Strategy (Plan B) | Pivot Trigger Condition |
| :--- | :--- | :--- | :--- |
| **1. Tier B Extended Weights (100, 300, 500, 900) Missing in Static Folder** | Load Tier A Core WOFF2 files (`400`, `400 Italic`, `600`, `700`, `NL 400`) immediately from `web-docs/fonts/sawala-mono/` and map intermediate slider steps cleanly across available `@font-face` weight ranges with browser font synthesis / closest compiled weight indicator. | Dynamically fetch extended weight `.woff2` files if added to `web-docs/fonts/sawala-mono/` via the browser `FontFace` API, falling back seamlessly to Tier A weights with a non-blocking status badge in the specimen toolbar. | Triggered immediately when user selects weight `100`, `300`, `500`, or `900` while only the 5 Tier A files reside in `web-docs/fonts/sawala-mono/`. |
| **2. Standalone Syntax Highlighter (`prism.min.js`) Load or CSP Conflict** | Bundle a minimal, self-contained zero-dependency syntax tokenizer in `web-docs/vendor/prism/prism.min.js` executing strictly under `script-src 'self'` without `eval` or inline script injection. | Render pre-tokenized semantic `<span class="token ...">` markup directly in `polyglot-runner.js` so syntax highlighting works with 0 external parser overhead and 100% deterministic token coloring. | Triggered if external library minification introduces CSP violations or exceeds the `30KB` JS transfer budget. |
| **3. Browser Clipboard API Blocked (`navigator.clipboard` Permission Denied)** | Use asynchronous `navigator.clipboard.writeText(snippet)` and trigger the `#27a644` green `"Copied!"` confirmation state for `2000ms`. | Catch permission/insecure-context rejection, programmatically select the `<pre><code>` / hidden `<textarea>` text range, execute `document.execCommand('copy')`, and display `"Press Ctrl+C to copy"` in the status pill. | Triggered whenever `navigator.clipboard` is undefined (e.g., non-HTTPS local IP preview) or throws `NotAllowedError`. |

---

## 5. Symmetry, Invariants & Problem Variation (Pólya, p. 199–214)

- **Symmetric Operations & Round-Trip Invertibility ($f^{-1}(f(x)) = x$):**
  - **Ligature Variant Toggle:** `enableLigatures('standard')` (`font-variant-ligatures: normal; font-feature-settings: "calt" 1`) $\leftrightarrow$ `disableLigatures('nl')` (`font-variant-ligatures: none; font-feature-settings: "calt" 0`). Toggling Standard $\to$ NL $\to$ Standard must deterministically restore identical glyph rendering.
  - **Slope Toggle:** `setSlope('upright')` (`font-style: normal`) $\leftrightarrow$ `setSlope('italic')` (`font-style: italic`).
  - **Mobile Drawer State:** `openMobileNav()` (`aria-expanded="true"`) $\leftrightarrow$ `closeMobileNav()` (`aria-expanded="false"` on Escape key or backdrop click).
  - **Copy Button State Machine:** `Idle ("Copy Configuration")` $\xrightarrow{\text{click}}$ `Active ("Copied!", #27a644)` $\xrightarrow{2000\text{ms}}$ `Idle ("Copy Configuration")`.
- **Variation of the Problem (Boundary & Property Exploration):**
  - *Font Size Slider Clamping:* Values $< 12\text{px}$ clamp to `12px`; values $> 48\text{px}$ clamp to `48px`.
  - *Empty Specimen Input:* Clearing all text in the live specimen textarea reveals the non-collapsing watermark placeholder (`"The quick brown fox jumps over the lazy dog. 0123456789 => !== ->"`).
  - *Viewport Extremes:* Layouts remain overflow-free from `320px` (Mobile-XS) through `1440px+` (Desktop-XL), with code blocks preserving smooth horizontal scrolling.
- **SOLID Checks at Blueprint Stage:**
  - *Single Responsibility Principle (SRP):* Each file in `web-docs/js/` governs exactly one interactive showcase seam (`polyglot-runner.js`, `ligature-playground.js`, `specimen-tester.js`, `glyph-matrix.js`, `terminal-preview.js`, `distribution-cards.js`, `config-generator.js`).
  - *Open/Closed Principle (OCP):* Adding a new programming language snippet, ligature sample, or editor config requires only appending a declarative entry to the static catalog array without modifying DOM controller logic.
  - *Dependency Inversion Principle (DIP):* UI controllers manipulate semantic `data-*` attributes and CSS Custom Properties (`--specimen-size`, `--specimen-weight`, `--specimen-line-height`) rather than hardcoding inline hex styles.

---

## 6. Risks & Extracted Assumptions

*Extracted directly from [`docs/spec/sawala-mono-showcase-web-spec.md`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/docs/spec/sawala-mono-showcase-web-spec.md#L113-L124) Section 3:*

- **[ASSUMPTION-001] (Initial Webfont Asset Availability — *Verified on Disk, High-Risk Dependency for TASK-001 & TASK-007*):**
  - *Upstream Description:* Assumed that Tier A WOFF2 files compiled from the latest font build are placed in `web-docs/fonts/sawala-mono/`.
  - *Pre-Plan Verification Status:* **VERIFIED PRESENT.** Inspection of `web-docs/fonts/sawala-mono/` confirmed all 5 Tier A files exist on disk (`SawalaMono-Regular.woff2`, `SawalaMono-Italic.woff2`, `SawalaMono-SemiBold.woff2`, `SawalaMono-Bold.woff2`, `SawalaMonoNL-Regular.woff2`).
  - *Mitigation in TASK-001 & TASK-007:* Bind `@font-face` `src: url('../fonts/sawala-mono/...') format('woff2')` with metric-matched fallback (`ui-monospace, 'SF Mono', Menlo, monospace`) and map weight slider selections cleanly across the available Tier A weights with CSS synthesis / status feedback for unbundled Tier B weights.
- **[ASSUMPTION-002] (Zero-Build Syntax Highlighter Selection — *High-Risk Dependency for TASK-002*):**
  - *Upstream Description:* To avoid external npm build tooling while delivering instant client-side syntax highlighting, a standalone lightweight syntax highlighter (`prism.min.js` + `prism-sawala-dark.css`) is placed in `web-docs/vendor/prism/`.
  - *Mitigation in TASK-002:* Author a clean, self-contained zero-dependency syntax highlighter in `web-docs/vendor/prism/prism.min.js` paired with `prism-sawala-dark.css` using the exact `--syntax-*` Tokyo Night / Catppuccin tokens defined in `tokens.css`, ensuring zero external CDN requests and strict compliance with `CON-006` (`script-src 'self'`).
- **[RISK-001] (Monorepo Build Graph Contamination):**
  - *Hazard:* Accidental modification of `package.json`, `verdafile.mjs`, or `biome.json` could destabilize the Iosevka font compiler.
  - *Mitigation:* Enforce `CON-005` strictly—all web showcase files reside exclusively in `index.html`, `web-docs/**`, `.nojekyll`, and `.github/workflows/pages.yml`. Verified at every `check:task` gate via `git status`, JS syntax validation (`node --check`), DOM/logic unit tests, and `impeccable detect --json`.

---

## 7. Rollback & Recovery Strategy

If any implementation slice introduces regressions or needs to be reverted:
1. **Isolated File Revert (Uncommitted Work):**
   ```powershell
   git checkout -- index.html
   Remove-Item -Recurse -Force web-docs/css, web-docs/js, web-docs/vendor, web-docs/pages, .nojekyll, .github/workflows/pages.yml -ErrorAction SilentlyContinue
   ```
   *(Note: Preserve `web-docs/fonts/sawala-mono/*.woff2` so compiled webfont assets are never lost).*
2. **Commit-Level Rollback (Committed Work):**
   ```powershell
   git revert HEAD~N..HEAD
   ```
3. **Compiler Integrity Verification:**
   Run `git status --short packages params tools verdafile.mjs package.json biome.json` to confirm the core font monorepo remains 100% untouched. *(Note: Upstream `npx @biomejs/biome check .` reports pre-existing diagnostics in untouched `packages/*`, and `update-package-json-version.mjs` requires monorepo `semver` dependency not installed in static-showcase context.)*

---

## 8. 🚩 Pre-Flight Self-Correction Checklist (Anti-Patterns)

Before presenting this plan to the user, it has been audited against all 7 Pólya planning anti-patterns:
- [x] **No Horizontal Slicing:** Tasks are NOT grouped layer-by-layer. Every task (`TASK-001` through `TASK-016`) is a vertical feature slice cutting across CSS tokens/styles, JS controllers, and HTML sections.
- [x] **No Bloated Tasks (XL):** Every actionable task impacts between 2 and 5 files (Size **S** or **M**). Zero tasks touch $\ge 8$ files.
- [x] **Strict Traceability:** Every actionable task maps explicitly to `REQ-001..REQ-012`, `CON-001..CON-008`, and `AC-001..AC-019` with zero orphaned requirements or acceptance criteria.
- [x] **Deterministic Dependencies:** The `Dep` column forms a strict bottom-up DAG (`TASK-001` $\to$ `TASK-002` $\to$ `TASK-005` $\to$ `TASK-006` $\to$ `TASK-007` $\to$ `TASK-010` $\to$ `TASK-011` $\to$ `TASK-012` $\to$ `TASK-015` $\to$ `TASK-016`).
- [x] **Mandatory Verification & Approval:** Every phase concludes with explicit `VERIFY` (`check:task` / `check:full`) and `APPROVAL` pause gates.

---

## 9. 📋 Implementation Progress & Execution Log

### 9.1 Milestone Execution Matrix

| Phase | Milestone Scope | Tasks | Target Files | Verification Gate | Status | Completion Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **Phase 1: Land** | Linear Design Tokens, Tier A WOFF2 Webfonts, Hero & 5-Language Polyglot Runner | `TASK-001` – `TASK-004` | `tokens.css`, `reset.css`, `typography.css`, `polyglot-runner.js`, `main.js`, `prism.*`, `index.html` | `TASK-003` (`node` test + `check:fast`) | ✅ Completed | 2026-11-12 |
| **Phase 2: Core Experience** | Ergonomic Anatomy Breakdown, x-Height Comparison Slider, Ligature Transformation Matrix, Live Specimen Workbench | `TASK-005` – `TASK-009` | `showcase.css`, `main.js`, `ligature-playground.js`, `specimen-tester.js`, `index.html` | `TASK-008` (`node` test + `impeccable detect`) | ✅ Completed | 2026-11-12 |
| **Phase 3: Expand** | Character Inspector & Glyph Browser, Nerd Font Terminal Mockup, 4-Tier Distribution Cards, Quick Setup IDE Config Generator, CTA Banner | `TASK-010` – `TASK-014` | `glyph-matrix.js`, `terminal-preview.js`, `distribution-cards.js`, `config-generator.js`, `showcase.css`, `index.html` | `TASK-013` (`node` test + `impeccable detect`) | ✅ Completed | 2026-11-12 |
| **Phase 4: Hardening & CI/CD** | 3 Standalone Subpages (`ligatures.html`, `distributions.html`, `installation.html`), SEO/CSP Hardening, `.nojekyll`, GitHub Actions Workflow | `TASK-015` – `TASK-018` | `web-docs/pages/*.html`, `.nojekyll`, `.github/workflows/pages.yml`, `showcase.css` | `TASK-017` (`check:full` + 19 AC Audit) | ✅ Completed | 2026-11-12 |

### 9.2 Completed Phase Summary Notes

- **Phase 1 (`TASK-001`..`TASK-004`):**
  - Linear `#010102` dark canvas token system established in [`web-docs/css/tokens.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/tokens.css) with 4-step surface ladder, 1px hairlines (`#23252a`), and lavender accent (`#5e6ad2`).
  - Preloaded 5 verified Tier A WOFF2 font files (`SawalaMono-Regular.woff2`, `SawalaMono-Italic.woff2`, `SawalaMono-SemiBold.woff2`, `SawalaMono-Bold.woff2`, `SawalaMonoNL-Regular.woff2`) via `@font-face` in [`web-docs/css/typography.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/typography.css).
  - Built interactive 5-language Polyglot Code Specimen Runner ([`web-docs/js/polyglot-runner.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/polyglot-runner.js)) supporting TypeScript, Rust, Go, Python, and Lua with line-number generator, live `calt` toggle, and 1-click clipboard copy.
  - Zero-build client-side syntax highlighter integrated via standalone [`web-docs/vendor/prism/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/vendor/prism) adhering to strict CSP (`CON-006`).
- **Phase 2 (`TASK-005`..`TASK-009`):**
  - 4-up Ergonomic Anatomy cards (`0` vs `O`, `1`/`l`/`I`, `{ [ ( ) ] }` flat-boundary braces, upright vs `9.4°` cursive italic `a`) added in [`web-docs/css/showcase.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/showcase.css) and [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html).
  - Interactive split-curtain x-Height Comparison Slider ([`web-docs/js/main.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/main.js)) with pointer drag, range slider, x-height (`520`) / cap-height (`735`) alignment guides, and 0%/50%/100% presets comparing Sawala Mono (`x-height: 520, cap: 735, width: 500`) against Generic System Monospace.
  - 16-operator Ligature Transformation Matrix ([`web-docs/js/ligature-playground.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/ligature-playground.js)) with symmetric standard (`calt: 1`) vs NL (`calt: 0`) switcher and hover sequence breakdown.
  - Live Type Specimen Workbench ([`web-docs/js/specimen-tester.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/specimen-tester.js)) with bounded font size (`12px–48px`), line height (`1.2–2.0`), 9 weights (`100–900`), upright vs italic slope, and watermark placeholder fallback (`INV-006`).
- **Phase 3 (`TASK-010`..`TASK-014`):**
  - Character Inspector & Glyph Browser ([`web-docs/js/glyph-matrix.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/glyph-matrix.js)): 86 curated glyphs categorized into 5 functional tabs + All, with interactive detail card displaying 96px magnified preview (upright + italic companion), Unicode hex, character name, active design variant, and TOML source from [`private-build-plans.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/private-build-plans.toml).
  - Nerd Font Terminal Mockup ([`web-docs/js/terminal-preview.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/terminal-preview.js)): 3 interactive presets (`Neovim + Lualine`, `Starship + PR Review`, `Tmux + Nerd Font Patcher`), inline SVG and UTF-8 Powerline glyphs (`U+E0B0`, `U+E0B1`, `U+E0B2`, `U+E0A0`) with zero webfont payload overhead, and NF standard vs NL variant switcher.
  - 4-Tier Distribution Matrix ([`web-docs/js/distribution-cards.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/distribution-cards.js)): 4 cards (`Sawala Mono` featured on `surface-2`, `Sawala Mono NL`, `Sawala Mono NF`, `Sawala Mono NL NF`) linking directly to GitHub Releases archives, with Normal (500) vs SemiExtended (548) width scope switcher.
  - Quick Setup IDE Config Generator ([`web-docs/js/config-generator.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/config-generator.js)): 7 editor tabs (`VS Code`, `JetBrains IDEs`, `Neovim`, `Alacritty`, `Kitty`, `WezTerm`, `Windows Terminal`), reactive family selector, 1-click clipboard copy (`#27a644`), and automatic `<textarea>` selection fallback.
  - Section 9 CTA Release Banner (`cta-banner`) and updated top navigation links wired for all 10 sections of [`index.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/index.html).
  - Audited via `.agents/skills/impeccable/scripts/impeccable.cmd detect --json` (0 findings) and automated node test script asserting all section IDs, glyph counts, archive URLs, and editor configs.
- **Phase 4 (`TASK-015`..`TASK-018`):**
  - Authored 3 standalone modular documentation subpages in [`web-docs/pages/`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages):
    1. [`web-docs/pages/ligatures.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages/ligatures.html): Complete catalog of 55 OpenType `default-calt` programming ligature sequences sourced from [`params/ligation-set.toml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/params/ligation-set.toml) across 5 category filter tabs (`Arrows`, `Equality & Logical`, `Scopes & Pipelines`, `Markup & Tags`, `Arithmetic & Misc`) + `All`, with live `Sawala Mono` (`calt: 1`) vs `Sawala Mono NL` (`calt: 0`) rendering comparison and breadcrumb navigation back to `../../index.html`.
    2. [`web-docs/pages/distributions.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages/distributions.html): Comprehensive technical specification matrix comparing all 4 variants (`Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, `Sawala Mono NL NF`), 9 weights (`100`–`900` via `.font-w-*` utility classes under strict `style-src 'self'`), and 2 widths (`Normal 500` vs `SemiExtended 548`) with direct `v1.0.0` GitHub Release `.zip` download links.
    3. [`web-docs/pages/installation.html`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/pages/installation.html): Step-by-step OS-tabbed installation guide (`Windows 10/11`, `macOS Font Book`, `Linux fc-cache`, `Homebrew / Arch CLI`) using accurate `*/TTF/*.ttf` archive paths, powered by `initDocTabPanels` in [`web-docs/js/main.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/main.js) with ARIA `tablist`/`tabpanel` semantics and `ArrowLeft`/`ArrowRight`/`Home`/`End` keyboard cycling.
  - Added Section 11 (`Documentation Subpages`) and `.font-w-100..900` utility classes to [`web-docs/css/showcase.css`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/css/showcase.css) and subpage controllers (`filterCatalog`, `initCatalogFilters`, `activateDocTab`, `initDocTabPanels`) to [`web-docs/js/main.js`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/web-docs/js/main.js).
  - Created root [`.nojekyll`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.nojekyll) and GitHub Actions deployment workflow [`.github/workflows/pages.yml`](file:///d:/WebstormProject/iosevka-sawalamono/Iosevka/.github/workflows/pages.yml) staging static showcase files into `_site` (`actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`).
  - Verified via `.agents/skills/impeccable/scripts/impeccable.cmd detect --json index.html web-docs` (`[]` zero findings), `node --check` across all 9 JS files, Node regression & contract suite (`AC-001`..`AC-019`), WCAG 2.1 AA contrast validation, and live Chromium runtime verification. *(Note: Upstream `npx @biomejs/biome check .` is excluded as a showcase pass gate because untouched `packages/*` contains pre-existing upstream lint errors.)*
