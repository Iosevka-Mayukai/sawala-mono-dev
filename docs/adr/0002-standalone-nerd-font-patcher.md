# ADR-0002: Standalone Containerized Nerd Font Patching Pipeline

## Status
**Accepted** (2026-11-09)

## Context
The project goals specify distributing `Sawala Mono NF` (Nerd Font) alongside standard distributions (`AGENTS.md:4`). However, Nerd Font patching requires FontForge and Python font libraries, which are heavy and slow to install on CI runners. Furthermore, injecting complete icon sets (~10,000+ glyphs) across 36 font files takes 40–70 minutes of CPU time.

Embedding this patching step directly into the primary `.github/workflows/build.yml` would:
1. Bloat standard font compilation runs from ~15 minutes to ~90 minutes.
2. Severely consume monthly GitHub Actions runner quotas.
3. Couple base font release success to patcher stability (introducing high blast-radius if FontForge crashes).

## Decision
We decouple Nerd Font patching into a dedicated, standalone GitHub Actions workflow (`.github/workflows/patch-nerd-font.yml`) using the official `nerdfonts/patcher:latest` Docker image.

1. **Decoupled Workflow:** Base compilation (`build.yml`) publishes the standard release archives immediately. The patcher workflow runs separately on-demand via `workflow_dispatch`.
2. **Containerized Engine:** The patcher uses `nerdfonts/patcher:latest` with zero runner host dependencies.
3. **Selective Scope & Parallelism:** The workflow supports `font_scope: core` (8 files in ~6–8 mins) and `font_scope: all` (36 files in ~40 mins), utilizing `PN=2` parallel worker processes to leverage the 2 vCPUs of `ubuntu-latest`.
4. **Release Asset Seam:** The workflow downloads base TrueType fonts from an existing GitHub Release (`gh release download`), patches them, and uploads `SawalaMono-NF-<tag>.zip` back to that same release (`gh release upload --clobber`).

## Consequences
- **Positive:**
  - Base font build remains fast, lightweight, and independent (~15 mins).
  - Zero blast-radius: A patch failure never blocks standard font distribution.
  - Operators can selectively generate Nerd Fonts on-demand for specific releases.
  - Preserves strict monospace cell metrics via `--mono`.
- **Negative:**
  - Nerd Font releases require a distinct manual dispatch trigger (or downstream event) after base release publication.
