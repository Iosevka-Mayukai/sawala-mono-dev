# ADR-0001: Retention of `build-plans.toml` and `tools/` Workspaces

## Status
**Accepted** (2026-11-09)

## Context
During the repository slimming and cleanup of upstream Iosevka v34.9.1 assets for **Iosevka Sawala Mono**, several non-essential files were identified for purging. Two candidates for potential removal were `build-plans.toml` (which contains upstream build plans for Iosevka, Iosevka Slab, etc.) and the `tools/` monorepo directory (which contains ancillary tools such as `generate-samples` and `amend-readme`).

However, an architectural inspection of the font build engine revealed tight coupling to both assets:
1. `verdafile.mjs:157,159` directly executes `await target.need(sfu(BUILD_PLANS))` and `tryParseToml(BUILD_PLANS)`. Deleting `build-plans.toml` causes `verda` to crash immediately with an unhandled exception before even evaluating `private-build-plans.toml`.
2. `package.json:6` declares `"workspaces": ["packages/*", "tools/*"]`. Furthermore, `tools/misc` contains critical scripts (`ttf-to-woff2.mjs`, `generate-ttfa-ranges.mjs`, `update-package-json-version.mjs`) used during build and version bumping.

## Decision
We retain `build-plans.toml` and the `tools/` directory intact within the repository.

1. `build-plans.toml` will continue to serve as the baseline TOML configuration required by `verdafile.mjs`.
2. `tools/` will remain as a valid workspace in `package.json` to preserve npm dependency resolution and maintain essential build utility scripts in `tools/misc/`.
3. Only purely decoupled assets (`images/`, `changes/`, `sample-text/`, `private-build-plans.sample.toml`, unused upstream workflows, and sponsor documentation) will be purged.

## Consequences
- **Positive:**
  - Zero modification required in `verdafile.mjs` or `package.json`.
  - Zero risk of broken npm workspaces or runtime `verda` execution failures.
  - The repository still eliminates ~48.4 MB of bloat and over 4,240 redundant files.
- **Negative:**
  - `build-plans.toml` (~24 KB) and `tools/` (~80 KB) remain in the repository, representing a negligible ~104 KB footprint.
