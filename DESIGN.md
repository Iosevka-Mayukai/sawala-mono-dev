---
version: alpha
name: Linear-Sawala-Mono-Design
description: "A near-black product-focused documentation canvas built around Linear's design system (#010102 canvas, four-step surface ladder, hairline borders, and signature lavender-blue accent #5e6ad2), tailored for Iosevka Sawala Mono font specimen, interactive ligature playground, and technical documentation across all four distributions (Sawala Mono, Sawala Mono NL, Sawala Mono NF, Sawala Mono NL NF). Monospace tokens and code contexts strictly dogfood Sawala Mono with full OpenType ligature support."

colors:
  primary: "#5e6ad2"
  on-primary: "#ffffff"
  primary-hover: "#828fff"
  primary-focus: "#5e69d1"
  ink: "#f7f8f8"
  ink-muted: "#d0d6e0"
  ink-subtle: "#8a8f98"
  ink-tertiary: "#62666d"
  canvas: "#010102"
  surface-1: "#0f1011"
  surface-2: "#141516"
  surface-3: "#18191a"
  surface-4: "#191a1b"
  hairline: "#23252a"
  hairline-strong: "#34343a"
  hairline-tertiary: "#3e3e44"
  inverse-canvas: "#ffffff"
  inverse-surface-1: "#f5f6f6"
  inverse-surface-2: "#f6f7f7"
  inverse-ink: "#000000"
  brand-secure: "#7a7fad"
  semantic-success: "#27a644"
  semantic-overlay: "#000000"
  syntax-keyword: "#bb9af7"
  syntax-function: "#7aa2f7"
  syntax-string: "#9ece6a"
  syntax-number: "#ff9e64"
  syntax-comment: "#565f89"
  syntax-operator: "#89ddff"
  syntax-variable: "#c0caf5"
  syntax-type: "#2ac3de"

typography:
  display-xl:
    fontFamily: Linear Display
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -3.0px
  display-lg:
    fontFamily: Linear Display
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -1.8px
  display-md:
    fontFamily: Linear Display
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -1.0px
  headline:
    fontFamily: Linear Display
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.6px
  card-title:
    fontFamily: Linear Display
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.4px
  subhead:
    fontFamily: Linear Display
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: -0.2px
  body-lg:
    fontFamily: Linear Text
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.1px
  body:
    fontFamily: Linear Text
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.05px
  body-sm:
    fontFamily: Linear Text
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  caption:
    fontFamily: Linear Text
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  button:
    fontFamily: Linear Text
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0
  eyebrow:
    fontFamily: Linear Text
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0.4px
  mono:
    fontFamily: "Sawala Mono, Sawala Mono NL, Iosevka Sawala Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-primary-pressed:
    backgroundColor: "{colors.primary-focus}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-tertiary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-inverse:
    backgroundColor: "{colors.inverse-canvas}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  distribution-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  distribution-card-featured:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-card-featured:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  feature-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  specimen-playground-panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.xl}"
    padding: 24px
  glyph-grid-tile:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: 16px
  product-screenshot-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 24px
  testimonial-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  customer-logo-tile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 16px
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  variant-switcher-tab:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 6px 14px
  pricing-tab-default:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 6px 14px
  pricing-tab-selected:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 6px 14px
  cta-banner:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.lg}"
    padding: 48px
  changelog-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: 24px 0
  status-badge:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    height: 56px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 64px 32px
---

# DESIGN.md - Iosevka Sawala Mono (Linear Design System)

## Overview

Linear's marketing canvas is the deepest dark surface in this collection — `{colors.canvas}` is `#010102`, essentially pure black with a faint blue tint. On top sits a four-step surface ladder (`{colors.surface-1}` through `{colors.surface-4}`) for cards, panels, and lifted tiles, with hairline borders running from `{colors.hairline}` (`#23252a`) up through `{colors.hairline-strong}` and `{colors.hairline-tertiary}`. Light gray text (`{colors.ink}` `#f7f8f8`) carries the body and headlines.

The single chromatic accent is **Linear lavender-blue** `{colors.primary}` (`#5e6ad2`) — used on the brand mark, focus rings, and the primary CTA button. A lighter hover state (`{colors.primary-hover}` `#828fff`) and a focus-tinted variant (`{colors.primary-focus}` `#5e69d1`) extend the same hue. Linear avoids saturated greens, oranges, reds, etc. on the marketing canvas — the only semantic color is `{colors.semantic-success}` (`#27a644`) for status pills and the rare success indicator.

Display type runs Linear's custom sans (with `SF Pro Display` / `Inter` fallback) at weight 500–700 with negative letter-spacing scaling from -3.0px at 80px down to 0 at body. The body family is Linear's text cut, and **Sawala Mono** (`"Sawala Mono", "Iosevka Sawala Mono"`) is dogfooded for all monospace tokens, code snippets, interactive ligature playgrounds, and glyph matrices.

The page rhythm is **dense product screenshots & live font specimens** — leading with high-fidelity captures of code blocks, terminal environments, and interactive ligature testing framed in `{colors.surface-1}` panels with `{rounded.xl}` 16px corners. The chrome is intentionally minimal so the typography and code ligatures do the heavy lifting.

**Key Characteristics:**

- **Dark-canvas marketing & documentation system** — `{colors.canvas}` (`#010102`) is the deepest dark in this collection.
- **Lavender-blue brand accent** (`{colors.primary}` `#5e6ad2`) — used scarcely on brand mark, focus, and primary CTA.
- Four-step surface ladder (canvas → surface-1 → surface-2 → surface-3 → surface-4) carries hierarchy without shadow.
- Display tracking pulls aggressively negative (-3.0px at 80px); body holds at -0.05px.
- Cards use `{rounded.lg}` 12px corners with 1px hairline borders — never pill, rarely 16px.
- **Interactive Type Specimen & Code Playground** dominate the page. The marketing chrome is a dark frame for the font.
- No second chromatic color. No atmospheric gradients. No spotlight cards.

---

## Colors

> Source pages: linear.app (home), /intake, /pricing, /contact/sales, /build.

### Brand & Accent

- **Lavender-Blue** (`{colors.primary}`): The signature Linear accent — primary CTA, brand mark, link emphasis (`#5e6ad2`).
- **On-Primary** (`{colors.on-primary}`): Pure white text (`#ffffff`) for labels situated on top of `{colors.primary}` surfaces.
- **Lavender Hover** (`{colors.primary-hover}`): Lighter lavender (`#828fff`) — hovered state of the primary CTA.
- **Lavender Focus** (`{colors.primary-focus}`): Focus-ring tint (`#5e69d1`) — focused inputs, focused buttons.
- **Brand Secure** (`{colors.brand-secure}`): Muted lavender-gray (`#7a7fad`) — used in security/compliance surfaces.

### Surface

- **Canvas** (`{colors.canvas}`): Default page background — `#010102`, near-pure black with a faint blue tint.
- **Surface 1** (`{colors.surface-1}`): One step above canvas (`#0f1011`) — feature cards, type specimen panels, code playground.
- **Surface 2** (`{colors.surface-2}`): Two steps above (`#141516`) — featured distribution cards, hovered cards, active tabs.
- **Surface 3** (`{colors.surface-3}`): Three steps above (`#18191a`) — line-tertiary backgrounds, sub-nav.
- **Surface 4** (`{colors.surface-4}`): Four steps above (`#191a1b`) — bg-level-3, deepest lifted surface.
- **Hairline** (`{colors.hairline}`): 1px borders on cards and dividers (`#23252a`).
- **Hairline Strong** (`{colors.hairline-strong}`): Stronger 1px borders — input focus rings (`#34343a`).
- **Hairline Tertiary** (`{colors.hairline-tertiary}`): Tertiary borders for nested surfaces (`#3e3e44`).
- **Inverse Canvas** (`{colors.inverse-canvas}`): Pure white (`#ffffff`) — surface of the inverse pill CTA.
- **Inverse Surface 1** (`{colors.inverse-surface-1}`): One step above inverse canvas (`#f5f6f6`).
- **Inverse Surface 2** (`{colors.inverse-surface-2}`): Two steps above inverse canvas (`#f6f7f7`).

### Text

- **Ink** (`{colors.ink}`): All headlines and emphasized body type — light gray `#f7f8f8`.
- **Ink Muted** (`{colors.ink-muted}`): Secondary type at `#d0d6e0` — meta info on hero panels, variant descriptions.
- **Ink Subtle** (`{colors.ink-subtle}`): Tertiary type at `#8a8f98` — deselected tabs, footer columns.
- **Ink Tertiary** (`{colors.ink-tertiary}`): Quaternary at `#62666d` — disabled states, footnotes, copyright.
- **Inverse Ink** (`{colors.inverse-ink}`): Pure black (`#000000`) for text rendered on inverse white canvas surfaces.

### Semantic

- **Success Green** (`{colors.semantic-success}`): Status pills, copy-to-clipboard confirmation indicators (`#27a644`).
- **Overlay** (`{colors.semantic-overlay}`): Pure black overlay scrim for modals (`#000000`).

---

## Typography

### Font Family

- **Linear Display** — Linear's custom display sans; fallback `SF Pro Display, -apple-system, system-ui, Segoe UI, Inter, Roboto, sans-serif`. Carries display-xl through subhead.
- **Linear Text** — Linear's custom text sans (tuned for body sizes); fallback `Inter, -apple-system, system-ui, Segoe UI, Roboto, sans-serif`. Carries body sizes, button labels, captions.
- **Sawala Mono (Primary Monospace)** — `"Sawala Mono", "Iosevka Sawala Mono", ui-monospace, SF Mono, Menlo, monospace`. Dedicated for code blocks, terminal guides, glyph matrices, ligature specimens, and status/ID tokens.

### Hierarchy

| Token                     | Size | Weight | Line Height | Letter Spacing | Use                                              |
| :------------------------ | :--- | :----- | :---------- | :------------- | :----------------------------------------------- |
| `{typography.display-xl}` | 80px | 600    | 1.05        | -3.0px         | Largest hero headline                            |
| `{typography.display-lg}` | 56px | 600    | 1.10        | -1.8px         | Section opener headlines                         |
| `{typography.display-md}` | 40px | 600    | 1.15        | -1.0px         | Sub-section headlines                            |
| `{typography.headline}`   | 28px | 600    | 1.20        | -0.6px         | Feature group titles, CTA banner heading         |
| `{typography.card-title}` | 22px | 500    | 1.25        | -0.4px         | Feature card title, variant title                |
| `{typography.subhead}`    | 20px | 400    | 1.40        | -0.2px         | Lead body, intro paragraphs                      |
| `{typography.body-lg}`    | 18px | 400    | 1.50        | -0.1px         | Hero subhead, lead paragraphs                    |
| `{typography.body}`       | 16px | 400    | 1.50        | -0.05px        | Default body documentation text                  |
| `{typography.body-sm}`    | 14px | 400    | 1.50        | 0              | Card body, footer columns                        |
| `{typography.caption}`    | 12px | 400    | 1.40        | 0              | Captions, meta, status                           |
| `{typography.button}`     | 14px | 500    | 1.20        | 0              | All button labels                                |
| `{typography.eyebrow}`    | 13px | 500    | 1.30        | +0.4px         | Section eyebrow (slight positive tracking)       |
| `{typography.mono}`       | 14px | 400    | 1.65        | 0              | Sawala Mono for code blocks, ligature playground |

### Principles

- **Aggressive negative tracking on display** (-3.0px at 80px ≈ 4% of size).
- **Single voice from display to body.** Display-xl at 600 → body at 400 — same family, narrower weights.
- **Eyebrow uses positive tracking** (+0.4px) — contrast against the negative-tracked display marks the eyebrow as taxonomy.
- **Sawala Mono in all code contexts.** Monospace is strictly reserved for code blocks, ligature testers, glyph showcases, and keyboard badges.

### Note on Font Substitutes & Dogfooding

Linear's custom sans is proprietary; **Inter** at weights 500 / 600 / 700 or **Geist Sans** are the recommended UI substitutes. For all monospace applications, this documentation site **strictly dogfoods Sawala Mono** (`Sawala Mono` / `Iosevka Sawala Mono`) with standard font fallbacks.

---

## Layout

### Spacing System

- **Base unit**: 4px.
- **Tokens (front matter)**: `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- Card interior padding: `{spacing.lg}` 24px on feature, distribution, and specimen cards; `{spacing.xl}` 32px on testimonial cards; `{spacing.xxl}` 48px on CTA banners.
- Pill button padding: 8px vertical · 14px horizontal — Linear's compact button spec.
- Form input / terminal box padding: 8px vertical · 12px horizontal.

### Grid & Container

- Max content width sits around 1280px.
- Card grids are 3-up at desktop, 2-up at tablet, 1-up at mobile.
- Distribution tier grid is structured as 4-up at desktop-xl (or 2×2 at desktop/tablet, 1-up at mobile), encompassing all four compiled targets:
  1. **`Sawala Mono`** (Standard with tailored ligatures)
  2. **`Sawala Mono NL`** (No Ligatures for symbolic separation)
  3. **`Sawala Mono NF`** (Nerd Font patched with ligatures)
  4. **`Sawala Mono NL NF`** (Nerd Font patched without ligatures)
- Specimen & playground panels span full content width — they are the protagonists.

### Whitespace Philosophy

The dark canvas IS the whitespace. Sections separate by lift onto surface-1 panels, not by gaps in white. Within a panel, generous `{spacing.lg}` 24px gaps between content blocks; `{spacing.section}` 96px between sections.

---

## Elevation & Depth

| Level              | Treatment                                                          | Use                                             |
| :----------------- | :----------------------------------------------------------------- | :---------------------------------------------- |
| 0 (flat)           | No shadow, no border                                               | Default for body type, hero text, footer        |
| 1 (charcoal lift)  | `{colors.surface-1}` background on canvas, 1px `{colors.hairline}` | Default cards, specimen panels                  |
| 2 (surface-2 lift) | `{colors.surface-2}` background, 1px `{colors.hairline-strong}`    | Active variant card, hovered cards              |
| 3 (surface-3 lift) | `{colors.surface-3}` background                                    | Sub-nav, dropdown menus, code language selector |
| 4 (focus ring)     | 2px `{colors.primary-focus}` outline at 50% opacity                | Focused input, focused code playground          |

Linear's depth is carried by the surface ladder + hairline borders. The brand resists drop shadows on dark almost entirely.

### Decorative Depth

- **Live Code & Ligature Playgrounds** dominate as decorative depth.
- **No atmospheric gradients, no spotlight cards.**
- **Subtle white edge highlight** on the top edge of lifted panels — gives the dark surface a faint "pixel rendered" feel.

---

## Shapes

### Border Radius Scale

| Token            | Value  | Use                                           |
| :--------------- | :----- | :-------------------------------------------- |
| `{rounded.xs}`   | 4px    | Small chips, status badges                    |
| `{rounded.sm}`   | 6px    | Inline tags, keyboard shortcuts (`kbd`)       |
| `{rounded.md}`   | 8px    | All buttons, form inputs, copy boxes          |
| `{rounded.lg}`   | 12px   | Distribution cards, feature cards             |
| `{rounded.xl}`   | 16px   | Specimen panels, interactive code playgrounds |
| `{rounded.xxl}`  | 24px   | Oversized CTA banners (rare)                  |
| `{rounded.pill}` | 9999px | Variant tab toggles, status pills             |
| `{rounded.full}` | 9999px | Avatar circles                                |

### Geometry & Rhythms

- Product & font specimen panels sit in `{rounded.xl}` 16px tiles with `{spacing.lg}` 24px outer padding.
- Customer/ecosystem logos render at ~24px height on `{colors.canvas}` with no border.
- Avatar circles in developer quote/testimonial cards use `{rounded.full}` at 32–40px sizes.

---

## Components

### Buttons

**`button-primary`** — Lavender CTA. The default primary CTA across all pages.

- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}`, padding 8px 14px, rounded `{rounded.md}`.
- Pressed state (`button-primary-pressed`): background shifts to `{colors.primary-focus}`.
- Hover state (`button-primary-hover`): background shifts to `{colors.primary-hover}` (lighter lavender).

**`button-secondary`** — Charcoal button. Used for secondary CTAs ("View on GitHub", "Read Changelog").

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.button}`, padding 8px 14px, rounded `{rounded.md}`, 1px `{colors.hairline}` border.

**`button-tertiary`** — Plain text button.

- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.button}`, rounded `{rounded.md}`, padding 8px 14px.

**`button-inverse`** — White-on-dark inverse CTA.

- Background `{colors.inverse-canvas}`, text `{colors.inverse-ink}`, type `{typography.button}`, rounded `{rounded.md}`, padding 8px 14px.

### Distribution & Variant Tabs

**`variant-switcher-tab`** (aliases `pricing-tab-selected` / `pricing-tab-default`) — Pill-toggle for switching distributions across all 4 release targets (`Sawala Mono`, `Sawala Mono NL`, `Sawala Mono NF`, `Sawala Mono NL NF`).

- Default: `{colors.canvas}` background, `{colors.ink-subtle}` text, rounded `{rounded.pill}`, padding 6px 14px.
- Selected: `{colors.surface-2}` background, `{colors.ink}` text — selected = surface lift.

### Cards & Containers

**`distribution-card`** (aliases `pricing-card`) — Distribution showcase card for the 4 compiled release targets. Each card details features, recommended usage, target archive filename, and quick-download actions:

- **`Sawala Mono`** — Base variant with rich programming ligatures (`=>`, `!==`, `->`). Archive: `SawalaMono-${SUFFIX}.zip`.
- **`Sawala Mono NL`** — *No Ligatures* variant for strict symbolic separation. Archive: `SawalaMonoNL-${SUFFIX}.zip`.
- **`Sawala Mono NF`** — *Nerd Font* patched variant with ligatures + Powerline/developer icons. Archive: `SawalaMono-NF-${TARGET_TAG}.zip` (or `SawalaMono-Extended-NF-${TARGET_TAG}.zip` for SemiExtended width).
- **`Sawala Mono NL NF`** — *Nerd Font* patched variant without ligatures + Powerline/developer icons. Archive: `SawalaMonoNL-NF-${TARGET_TAG}.zip` (or `SawalaMonoNL-Extended-NF-${TARGET_TAG}.zip` for SemiExtended width).
- Card styling: Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.lg}`, padding 24px. 1px `{colors.hairline}` border.

**`distribution-card-featured`** (aliases `pricing-card-featured`) — Highlighted distribution card (e.g. `Sawala Mono` as the flagship standard, or `Sawala Mono NF` for terminal users) — surface lift to surface-2 (`{colors.surface-2}` background, 1px `{colors.hairline-strong}` border).

**`feature-card`** — Feature highlight tile (e.g. "Clean Legibility", "Tailored Ligatures", "Nerd Font Integration").

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.lg}`, padding 24px. 1px `{colors.hairline}` border.

**`specimen-playground-panel`** — The protagonist container — frames the interactive code editor with syntax highlighting and live ligature rendering.

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.mono}`, rounded `{rounded.xl}`, padding 24px. 1px `{colors.hairline}` border.

**`glyph-grid-tile`** — Individual character preview cell in the glyph inspection matrix.

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.mono}`, rounded `{rounded.md}`, padding 16px. 1px `{colors.hairline}` border.

**`product-screenshot-card`** — Frames high-fidelity code editor and terminal screenshots.

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.xl}`, padding 24px.

**`testimonial-card`** — Community developer quote with avatar + name + role.

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body-lg}`, rounded `{rounded.lg}`, padding 32px.

**`customer-logo-tile`** — Small tile for ecosystem integrations and tool logos.

- Background `{colors.canvas}`, text `{colors.ink-subtle}`, type `{typography.caption}`, rounded `{rounded.xs}`, padding 16px.

**`cta-banner`** — Closing download / release banner near page bottom.

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.headline}`, rounded `{rounded.lg}`, padding 48px.

### Inputs & Forms

**`text-input`** + **`text-input-focused`** — Form fields and custom text entry in the interactive font tester.

- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.md}`, padding 8px 12px.
- Focused state retains the same surface; the focus ring is a 2px `{colors.primary-focus}` outline at 50% opacity.

### Status & Releases

**`status-badge`** — Small status pill (`Latest Release vX.Y.Z`, `Nerd Font v3.x ready`).

- Background `{colors.surface-2}`, text `{colors.ink-muted}`, type `{typography.caption}`, rounded `{rounded.pill}`, padding 2px 8px.

**`changelog-row`** — Each row in releases/changelog listing version, date, and changes.

- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.xs}`, padding 24px 0. 1px `{colors.hairline}` bottom rule.

**Release Archive Naming Convention (CI/CD Ground Truth):**

- Standard Builds ([`.github/workflows/build.yml`](file:///.github/workflows/build.yml) / artifact `Sawala-Mono-Packages`):
  - `SawalaMono-${SUFFIX}.zip` (e.g., `SawalaMono-v1.0.0.zip` or `SawalaMono-20261111.zip`)
  - `SawalaMonoNL-${SUFFIX}.zip` (e.g., `SawalaMonoNL-v1.0.0.zip` or `SawalaMonoNL-20261111.zip`)
- Nerd Font Patched Builds ([`.github/workflows/patch-nerd-font.yml`](file:///.github/workflows/patch-nerd-font.yml) / artifact `Sawala-Mono-NF-Packages`):
  - `SawalaMono-NF-${TARGET_TAG}.zip` (Core Normal width)
  - `SawalaMonoNL-NF-${TARGET_TAG}.zip` (Core Normal width, No Ligatures)
  - `SawalaMono-Extended-NF-${TARGET_TAG}.zip` (Extended-Core SemiExtended width)
  - `SawalaMonoNL-Extended-NF-${TARGET_TAG}.zip` (Extended-Core SemiExtended width, No Ligatures)

### Navigation & Footer

**`top-nav`** — Sticky dark bar with the Sawala Mono wordmark left, nav links centered (Overview, Ligatures, Glyphs, Install), and action buttons right ("GitHub", "Download").

- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-sm}`, height 56px.

**`footer`** — Clean link grid on `{colors.canvas}` with font credit, licensing (SIL OFL), and build info.

- Background `{colors.canvas}`, text `{colors.ink-subtle}`, type `{typography.caption}`, padding 64px 32px.

---

## Do's and Don'ts

### Do

- Reserve `{colors.canvas}` (`#010102`) as the system's anchor surface — the faint blue tint is intentional.
- Use `{colors.primary}` lavender ONLY for: brand mark, primary CTA, focus ring, link emphasis.
- Use the four-step surface ladder for hierarchy. Avoid skipping levels.
- Pair display weight 600 with body weight 400.
- Apply negative letter-spacing aggressively on display.
- Strictly use **Sawala Mono** for all code blocks, syntax samples, ligature playgrounds, and terminal examples.
- Compose CTAs as `{rounded.md}` 8px corners.

### Don't

- Don't ship a light-mode marketing page (keep it dark-first, terminal-native).
- Don't use lavender as a section background or card fill.
- Don't introduce a second chromatic accent (orange, pink, etc.) for marketing UI chrome.
- Don't add atmospheric gradients or spotlight cards.
- Don't pill-round CTAs.
- Don't use `#000000` true black as the canvas.
- Don't use generic system monospace when presenting Sawala Mono samples.

---

## Responsive Behavior

### Breakpoints

| Name       | Width  | Key Changes                                               |
| :--------- | :----- | :-------------------------------------------------------- |
| Desktop-XL | 1440px | Default desktop layout                                    |
| Desktop    | 1280px | Card grid 3-up maintained                                 |
| Tablet     | 1024px | Card grid 3-up → 2-up                                     |
| Mobile-Lg  | 768px  | Nav hamburger; code tester collapses extra control panels |
| Mobile     | 480px  | Single-column; display-xl scales 80px → ~36px             |

### Touch Targets

- CTAs hold ≥40px tap height across viewports.
- Variant tab pills hold ≥36px tap height; touch viewports grow to ≥44px.
- Form / tester inputs hold ≥44px tap target on touch.

### Collapsing Strategy

- **Top nav**: links collapse to hamburger below 768px.
- **Card grids**: 3-up → 2-up at 1024px → 1-up below 768px.
- **Interactive tester**: controls stack vertically above the code editor below 768px.
- **Display type**: `{typography.display-xl}` 80px scales toward `{typography.display-md}` 40px on mobile.

### Image & Specimen Behavior

- Code editor and terminal screenshots maintain aspect ratio and never crop.
- Partner and tool logos collapse from 6-up to 3-up below 768px.
- Font playground preserves horizontal code scrolling with smooth inertia and visible indentation guide lines.

---

## Iteration Guide

1. Focus on ONE component at a time and reference it by its `components:` token name.
2. When introducing a section, decide first which surface lift it lives on.
3. Default body to `{typography.body}` at weight 400.
4. Run `npx @google/design.md lint DESIGN.md` after edits.
5. Add new variants as separate component entries.
6. Treat lavender as scarce: brand mark, primary CTA, focus, link emphasis.
7. Lead every section with live font specimen and ligature interaction.

---

## Known Gaps

- The four-step surface ladder values are extracted directly from Linear's `--color-bg-level-3`, `--color-line-tint`, etc. CSS variables; they are Linear's canonical surface spec.
- Form-field error and validation styling is not visible on the inspected pages.
- Light mode is not documented because the documentation site is dark-first by architectural mandate.
- Syntax highlighting within code playgrounds uses a curated dark palette (e.g., Tokyo Night or Catppuccin) rather than the monochrome marketing chrome.
- The custom Linear display and text sans families are proprietary; **Inter** or **Geist Sans** is the recommended open-source fallback stack for UI chrome.
