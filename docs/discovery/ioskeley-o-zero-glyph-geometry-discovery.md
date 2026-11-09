# 🔭 Project Discovery Draft: Ioskeley Mono Flat-Sided Geometry for 'o' and '0'

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `Iosevka Sawala Mono`  
**Status:** **Under Review**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable -->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** In the current configuration of Iosevka Sawala Mono (`private-build-plans.toml`), digit `0` is configured with `oval-tall-reverse-slashed`. The `oval-` prefix explicitly forces `0` to render via `OvalShapeT`, producing continuously rounded, convex outer bezier curves with zero vertical flat segments. Meanwhile, letter `o` uses `OShapeT` with default Iosevka metrics (`smallArchDepth = 200`), producing relatively short flat side segments (~100 emu). In contrast, [Ioskeley Mono](https://github.com/ahatem/IoskeleyMono/blob/main/private-build-plans.toml) (an emulation of Berkeley Mono) features distinct, pronounced flat vertical sides and squarish super-elliptical curves across `o` and `0`. The user wants to achieve these flat sides for both `o` and `0` while maintaining the slashed zero variant specified in Sawala Mono.
- **Business Value & Why Now:** Code reading ergonomics rely heavily on glyph disambiguation and character rhythm. A squarish, flat-sided super-ellipse for `o` and `0` improves scanning cadence in monospace terminals and code editors, providing an industrial, modern aesthetic akin to Berkeley Mono without sacrificing the slashed zero distinction.
- **Target Persona & Users:** Developers and terminal power-users who prefer Berkeley Mono's geometric, flat-sided glyph structure combined with Sawala Mono's specific ligature and variant choices.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | How to configure or customize Iosevka Sawala Mono so that letter `o` and digit `0` have flat vertical sides like Ioskeley Mono, while keeping digit `0` slashed according to the project's build plan preferences. |
| **Known Data** | 1. Current Sawala Mono build plan (`private-build-plans.toml:47`): `zero = "oval-tall-reverse-slashed"`, `widths.Normal.shape = 500`.<br>2. Reference Ioskeley Mono build plan (`private-build-plans.toml`): `archDepth = 152`, `smallArchDepth = 157`, `xHeight = 520`, `cap = 690`, `sb = 85`, `widths.Normal.shape = 600`, `zero = "dotted"`.<br>3. Iosevka engine glyph generation code: `packages/font-glyphs/src/number/0.ptl`, `packages/font-glyphs/src/letter/latin/o.ptl`, `packages/font-glyphs/src/common/shapes.ptl`, `packages/font-glyphs/src/common/o-shape-variants.ptl`, `packages/param/src/metric-override.mjs`. |
| **The Conditions & Invariants** | 1. Digit `0` MUST remain slashed (`slashed`, `reverse-slashed`, `tall-slashed`, or `tall-reverse-slashed`), NOT dotted.<br>2. Maintain build configuration purity: Prefer declarative adjustments in `private-build-plans.toml` over ad-hoc monkey-patching of upstream PTL engine source files unless strictly necessary.<br>3. Blast Radius Management: Understand that `metricOverride.smallArchDepth` and `metricOverride.archDepth` are global font engine parameters affecting all arch/ring glyphs (`o`, `O`, `c`, `e`, `b`, `d`, `p`, `q`, `n`, `m`, `u`, etc.). |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

- **Zero Glyph Generator (`[VERIFIED: packages/font-glyphs/src/number/0.ptl:24-26, 123-147]`):**
  The digit `0` shape family is controlled by `ZeroConfig` which weaves two axes: outline shape and overlay.
  - When the variant string contains the prefix `'oval'` (e.g. `oval-tall-reverse-slashed` as currently set in `[VERIFIED: private-build-plans.toml:47]`), the engine assigns `Oval` (`ZeroShapeBase OvalShapeT`).
  - In `[VERIFIED: packages/font-glyphs/src/common/o-shape-variants.ptl:18-28]`, `OvalShapeT` delegates to `g4 (r - OX)` and `g4 (l + OX)` using continuous Bezier curvature with NO flat vertical segment.
  - When the `'oval'` prefix is omitted (e.g. `tall-reverse-slashed` or `reverse-slashed`), the engine selects `Capsule` (`ZeroShapeBase OShapeT`).
  - In `[VERIFIED: packages/font-glyphs/src/common/shapes.ptl:190-208]`, `OShapeT` invokes `flatside.ld` and `flatside.ru`.

- **Flat Side Computation in the Engine (`[VERIFIED: packages/font-glyphs/src/common/shapes.ptl:555-561]`):**
  In `flatside.ld` and `flatside.ru`:
  ```ptl
  return : if (u - d > ada + adb)
      list
          flat (x + ox) (u - ada) startAf
          curl (x + ox) (d + adb) endAf
      list
          g4   (x + ox) [YSmoothMidL u d ada adb] af
  ```
  A straight vertical segment exists if and only if the glyph height `(u - d)` exceeds the sum of top and bottom arch depths `(ada + adb)`. The length of this flat edge is exactly:
  $$\text{FlatEdgeLength} = (u - d) - (ada + adb)$$

- **Lowercase 'o' Generator (`[VERIFIED: packages/font-glyphs/src/letter/latin/o.ptl:26-28]`):**
  ```ptl
  create-glyph 'o' 'o' : glyph-proc
      include : MarkSet.e
      include : OShape XH 0 SB RightSB nothing nothing nothing
  ```
  Letter `o` has NO independent variant selector (there is no `variants.design.o` in Iosevka). It always uses `OShape` with `XH` (x-height) and falls back to `SmallArchDepthA` / `SmallArchDepthB`.
  - Default parameters (`[VERIFIED: params/shape-weight.toml:26]`): `smallArchDepth = 200`. With default $XH \approx 485\text{--}500$, the flat segment is only $500 - (200 + 200) \approx 100\text{ emu}$ (barely perceptible).
  - Ioskeley Mono override (`[VERIFIED: raw.githubusercontent.com/.../private-build-plans.toml]`):
    `smallArchDepth = 157`, `xHeight = 520`.
    Flat segment length becomes $520 - (157 + 157) = 206\text{ emu}$—more than double the straight edge length!

- **Proportion and Width Influence (`[VERIFIED: private-build-plans.toml:75-84]`):**
  Sawala Mono uses `widths.Normal.shape = 500` (standard compact Iosevka). Ioskeley Mono uses `widths.Normal.shape = 600` and `sb = 85`. At width 600, glyphs are 20% wider, allowing the top and bottom arches to flatten horizontally while the vertical sides flatten vertically, achieving Berkeley Mono's iconic "stadium / squarish" shape.

### 3.2 Analogous Solutions & Prior Art

- **Ioskeley Mono Implementation:**
  Ioskeley Mono achieves its squarish round glyphs via two coordinated mechanisms:
  1. Setting `zero = "dotted"` (which uses `Capsule` / `OShapeT`, giving `0` flat sides).
  2. Overriding global arch metrics in `metricOverride`:
     ```toml
     archDepth = 152
     smallArchDepth = 157
     ```
- **Sawala Mono's Invariant:**
  Sawala Mono strictly requires a slashed zero. By replacing `oval-tall-reverse-slashed` with `tall-reverse-slashed` (or `tall-slashed`), `0` retains its slashed identity while adopting the exact same `OShapeT` geometry as `o`.

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: Native Capsule Sync (Pure TOML, Zero Only) | Option B: Metric Override (Full Berkeley Typeface) | Option C: Surgical Engine Patch (Strictly 'o', 'O', '0' Isolated) |
| :--- | :--- | :--- | :--- |
| **Summary** | Change `zero = "tall-reverse-slashed"` in `private-build-plans.toml`. `0` becomes flat-sided like existing `o`. | Strip `oval-` and set `metricOverride.smallArchDepth = 157` & `archDepth = 152` in `private-build-plans.toml`. | Patch `o.ptl` and `0.ptl` to pass custom `ArchDepth` (152/157) directly into `OShapeT`, leaving all other letters untouched. |
| **Clean Architecture Seams** | Pure configuration seam (`private-build-plans.toml`). Zero engine tampering. | Pure configuration seam (`private-build-plans.toml`). Standard parameter compiler seam. | Modifies engine glyph generators (`packages/font-glyphs/src/`). Creates local fork diff. |
| **Visual Result for 'o' & '0'** | `0` gets flat sides matching existing `o` (~100 emu flat run). Slashed retained. | Both `o` and `0` get exaggerated flat sides (~206 emu flat run). | `o` and `0` get exaggerated flat sides (~206 emu flat run). Exactly meets "only o and 0". |
| **Impact on Other Letters** | **ZERO.** Other letters remain completely unchanged. | **GLOBAL.** Letters `c`, `e`, `b`, `d`, `p`, `q`, `n`, `m`, `u` also adopt Berkeley squarish arches. | **ZERO.** Letters `c`, `e`, `b`, `d`, etc. stay at standard Iosevka curvature. |
| **Typographic Harmony** | High. `0` and `o` use matching default Iosevka capsule geometry. | Very High. All round letters share identical curve tension and rhythm. | Medium-Low. `o` and `0` may appear boxier than neighboring round letters (`c`, `e`). |
| **Reversibility / Upstream Sync** | 100% reversible via TOML. Zero upstream merge friction. | 100% reversible via TOML. Zero upstream merge friction. | Requires tracking local git patch over upstream PTL files. |
| **User Suitability** | **Recommended if standard flat sides suffice.** | **Recommended if full Berkeley aesthetic is desired.** | **Recommended if strict isolation of exaggerated flat sides is required.** |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

- **Technical Unknown 1: Does `metricOverride` support `archDepth` and `smallArchDepth` in Sawala Mono's Iosevka version?**
  - **Spike / Verification:** Verified in `packages/param/src/metric-override.mjs:47-48`.
  - **Findings:** Confirmed. `archDepth` and `smallArchDepth` are explicitly defined in `validMetricOverrideFields` and handled natively during parameter compilation.
- **Technical Unknown 2: What happens to digit '0' when stripping `oval-` while retaining the slash?**
  - **Spike / Verification:** Inspected `packages/font-glyphs/src/number/0.ptl:124-147`.
  - **Findings:**
    - `tall-reverse-slashed` generates glyph with `Capsule` outline + `ZeroTallRevSlash` overlay.
    - `reverse-slashed` generates glyph with `Capsule` outline + `ZeroRevSlash` overlay.
    - `tall-slashed` generates glyph with `Capsule` outline + `ZeroTallSlash` overlay.
    All of these produce flat vertical sides while keeping the slash intact.
- **Technical Unknown 3: How does width (500 vs 600) affect the perception of flat sides?**
  - **Findings:** Sawala Mono's `shape = 500` is narrower than Ioskeley Mono's `shape = 600`. At width 500, reduced `archDepth` creates a distinct "tall pill / stadium" shape. If the user also wants the broader proportions of Berkeley Mono, `widths.Normal.shape` would need adjustment, which changes character tracking across all glyphs.

---

## 6. Strategic Recommendation & Handoff to Specification

- **Strategic Evaluation for Strict Isolation Request:**
  If the explicit hard constraint is **"strictly isolate only 'o' and '0' without affecting any other letters"**:
  1. **Option A (Pure Config - Standard Flat Sides):** Simply change `zero = "oval-tall-reverse-slashed"` to `zero = "tall-reverse-slashed"` in `private-build-plans.toml`. This immediately gives `0` flat vertical sides identical to `o`, with zero engine patching and zero impact on other glyphs.
  2. **Option C (Surgical PTL Patch - Exaggerated Berkeley Flat Sides):** If the user insists on having the exaggerated ~206 emu flat run of Ioskeley Mono *exclusively* on `o` and `0`:
     - In `packages/font-glyphs/src/letter/latin/o.ptl`: pass `[ArchDepthAOf 157]` and `[ArchDepthBOf 157]` to `OShape`.
     - In `packages/font-glyphs/src/number/0.ptl`: configure `Capsule` outline to use `ArchDepth = 152`.
     - In `private-build-plans.toml`: set `zero = "tall-reverse-slashed"`.

- **High-Impact Decisions (ADR Candidate):**
  Document the trade-off between pure TOML configuration (Option A) vs engine fork patch (Option C) in `docs/adr/0002-isolated-glyph-flat-sides.md`.

- **Domain Vocabulary Candidates (`CONTEXT.md`):**
  - `Capsule Shape`: Iosevka's flat-sided stadium contour (`OShapeT`) with straight vertical edges.
  - `Oval Shape`: Iosevka's continuously curved convex contour (`OvalShapeT`) with no straight segments.
  - `Arch Depth (`archDepth` / `smallArchDepth`)`: Vertical dimension in emu occupied by curved corner segments.

### 6.1 Downstream Readiness Checklist (for `/to-prd` or `/to-spec`)

- [x] **The Unknown:** Fully analyzed. Flat sides for `o` and `0` with slashed zero require `Capsule` zero variant + `metricOverride` arch depth tuning.
- [x] **The Data:** Verified engine source files (`0.ptl`, `o.ptl`, `shapes.ptl`, `metric-override.mjs`) and reference TOML configs.
- [x] **The Condition:** Slashed zero invariant maintained via `tall-reverse-slashed`.
- [x] **Clean Architecture Seams:** Confined strictly to declarative configuration seam `private-build-plans.toml`.
- [x] **Risks & Spikes:** Font-wide blast radius of `metricOverride` documented in Trade-Off Matrix.

### 6.2 Forking Handoff Actions (`/to-prd` or `/to-spec`)

Choose the downstream path matching your project's workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/ioskeley-o-zero-glyph-geometry-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and visual acceptance criteria based on this Discovery Draft.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint):**
  ```text
  /to-spec @docs/discovery/ioskeley-o-zero-glyph-geometry-discovery.md Formulate formal technical specification, build plan diff contracts, and visual test criteria based on this approved Discovery Draft.
  ```
