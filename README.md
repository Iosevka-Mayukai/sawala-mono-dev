# Sawala Mono
<!-- markdownlint-disable  -->
[![Build Font](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/build.yml/badge.svg)](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/build.yml)
[![Patch Nerd Font](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/patch-nerd-font.yml/badge.svg)](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/patch-nerd-font.yml)
[![Deploy Showcase to Pages](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/pages.yml/badge.svg)](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/pages.yml)
[![GitHub release](https://img.shields.io/github/v/release/Iosevka-Mayukai/sawala-mono-dev?include_prereleases)](https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases)
[![Web Documentation](https://img.shields.io/badge/Docs-Live%20Showcase-5e6ad2)](https://iosevka-mayukai.github.io/sawala-mono-dev/)
[![License: SIL OFL 1.1](https://img.shields.io/badge/License-OFL%201.1-blue.svg)](https://scripts.sil.org/OFL)

![Sawala Mono Banner](sawala-mono-hero-img.jpg)

A clean, ergonomic monospace coding typeface built on top of [Iosevka](https://github.com/be5invis/Iosevka), customized for focused programming sessions, terminal workflows, and code reviews.

> **Live Web Documentation & Interactive Showcase:** Explore side-by-side coding specimens, interactive ligature tests, glyph inspection, and IDE configs at **[iosevka-mayukai.github.io/sawala-mono-dev](https://iosevka-mayukai.github.io/sawala-mono-dev/)** ([Ligatures Catalog](https://iosevka-mayukai.github.io/sawala-mono-dev/web-docs/pages/ligatures.html) · [Distributions Matrix](https://iosevka-mayukai.github.io/sawala-mono-dev/web-docs/pages/distributions.html) · [Installation Guide](https://iosevka-mayukai.github.io/sawala-mono-dev/web-docs/pages/installation.html)).

---

## Table of Contents

- [Philosophy & Story Behind the Name](#philosophy--story-behind-the-name)
- [Font Variants](#font-variants)
- [Installation](#installation)
  - [Pre-built Binaries (GitHub Releases)](#pre-built-binaries-github-releases)
- [Configuration](#configuration)
  - [Visual Studio Code / VSCodium](#visual-studio-code--vscodium)
  - [JetBrains IDEs (IntelliJ IDEA, WebStorm, PyCharm)](#jetbrains-ides-intellij-idea-webstorm-pycharm)
  - [Neovim / Neovide](#neovim--neovide)
  - [Alacritty](#alacritty)
  - [Kitty](#kitty)
  - [WezTerm](#wezterm)
  - [Windows Terminal](#windows-terminal)
- [Building from Source](#building-from-source)
  - [Prerequisites](#prerequisites)
  - [Method A: GitHub Actions on Your Fork (Automated Cloud CI)](#method-a-github-actions-on-your-fork-automated-cloud-ci)
  - [Method B: Generating Nerd Font (Sawala Mono NF / Sawala Mono NL NF) on Your Fork](#method-b-generating-nerd-font-sawala-mono-nf--sawala-mono-nl-nf-on-your-fork)
  - [Method C: Containerized Docker Build (Recommended)](#method-c-containerized-docker-build-recommended)
  - [Method D: Native Local Build](#method-d-native-local-build)
- [Architecture & Customization](#architecture--customization)
- [License & Acknowledgments](#license--acknowledgments)

---

## Philosophy & Story Behind the Name

**Sawala Mono** draws its name from the **Sundanese** word ***sawala***, meaning *discussion*, *deliberation*, or *intellectual exchange*.

In modern software development, code is written for people first and compilers second. We spend far more time reading, discussing, and reviewing code in pull requests, pair programming sessions, and architecture reviews than actually typing it out. Sawala Mono embraces that collaborative reality with glyph choices and proportions tuned for effortless legibility during long sessions.

- **Human-Centric Reading:** High-distinction glyph shapes (such as clear slashed zeros, distinct brackets, and unambiguous punctuation) keep symbols crisp even at small font sizes.
- **Natural Pronunciation:** The open three-syllable name (`Sa-wa-la`) is easy to pronounce globally and sits comfortably alongside monospace staples like *Iosevka*, *Fira*, and *Cascadia*.
- **Dedicated Family Namespace:** Registered under its own font family name so it installs cleanly side-by-side with upstream Iosevka without font naming conflicts.

---

## Font Variants

| Variant               | Description                                                                       | Recommended Environments                              |
| :-------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **Sawala Mono**       | Standard variant with rich programming ligatures (`=>`, `!==`, `->`, `::`, etc.). | Modern IDEs (VS Code, JetBrains IntelliJ / WebStorm). |
| **Sawala Mono NL**    | *No Ligatures* variant for strict symbolic separation.                            | Developers preferring literal operator glyphs.        |
| **Sawala Mono NF**    | *Nerd Font* patched variant featuring full Powerline and developer icons.         | Terminal emulators, Neovim, Tmux, Starship prompt.    |
| **Sawala Mono NL NF** | *Nerd Font* patched *No Ligatures* variant with Powerline and developer icons.    | Terminals for developers preferring literal symbols.  |

---

## Installation

### Pre-built Binaries (GitHub Releases)

1. Download the release `.zip` archive for your preferred variant from the [GitHub Releases](https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases) page:
   - **`SawalaMono-<version>.zip`**: Standard variant with programming ligatures.
   - **`SawalaMonoNL-<version>.zip`**: No Ligatures variant for strict symbol separation.
   - **`SawalaMono-NF-<version>.zip`**: Nerd Font patched variant (with ligatures).
   - **`SawalaMonoNL-NF-<version>.zip`**: Nerd Font patched No Ligatures variant.
2. Extract the downloaded archive.
3. Install the font files:
   - **Windows:** Select all `.ttf` files $\to$ right-click $\to$ select **"Install for all users"** (recommended on Windows 10/11 to avoid per-user permission issues in Java runtimes and JetBrains IDEs).
   - **macOS:** Open **Font Book** (`Cmd + Space` $\to$ `Font Book`), then drag and drop the extracted `.ttf` files into the window.
   - **Linux:** Copy the `.ttf` files to your user fonts directory and refresh the font cache:
     ```bash
     mkdir -p ~/.local/share/fonts/SawalaMono
     cp SawalaMono/TTF/*.ttf ~/.local/share/fonts/SawalaMono/   # or *.ttf for Nerd Font archives
     fc-cache -f -v
     ```

---

## Configuration

### Visual Studio Code / VSCodium

Add the following configuration to your `settings.json`:

```json
{
  "editor.fontFamily": "'Sawala Mono', monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.5
}
```

> [!TIP]
> If you are using the **Sawala Mono NL** (*No Ligatures*) variant, set `"editor.fontLigatures": false`.

### JetBrains IDEs (IntelliJ IDEA, WebStorm, PyCharm)

1. Open **Settings / Preferences** (`Ctrl + Alt + S` on Windows/Linux, `Cmd + ,` on macOS).
2. Navigate to **Editor** $\to$ **Font**.
3. Set **Font** to `Sawala Mono`.
4. Ensure **Enable ligatures** is checked (or unchecked if using `Sawala Mono NL`).
5. Recommended font size: `13.5` or `14` with line spacing `1.2` to `1.3`.

### Neovim / Neovide

For Neovim GUI clients (such as Neovide), configure your `init.lua`:

```lua
-- init.lua (Neovim GUI / Neovide)
vim.o.guifont = "Sawala Mono:h14"
```

### Alacritty

Add to your `alacritty.toml`:

```toml
[font.normal]
family = "Sawala Mono"
style = "Regular"

[font.bold]
family = "Sawala Mono"
style = "Bold"

[font.italic]
family = "Sawala Mono"
style = "Italic"

[font]
size = 14.0
```

### Kitty

Add to your `kitty.conf`:

```conf
font_family      Sawala Mono
bold_font        auto
italic_font      auto
bold_italic_font auto
font_size        14.0
```

### WezTerm

Add to your `wezterm.lua`:

```lua
local wezterm = require 'wezterm'
local config = wezterm.config_builder()

config.font = wezterm.font('Sawala Mono')
config.font_size = 14.0

return config
```

### Windows Terminal

Add to your `settings.json` under `profiles.defaults`:

```json
"profiles": {
  "defaults": {
    "font": {
      "face": "Sawala Mono",
      "size": 12
    }
  }
}
```

> [!TIP]
> When using the Nerd Font patched variants in terminal emulators or Neovim, configure the font family as `'Sawala Mono NF'` (or `'Sawala Mono NL NF'` for the No Ligatures version).

---

## Building from Source

Sawala Mono compiles using containerized Docker runners and the official Iosevka parametric build engine.

### Prerequisites

- [Docker Desktop](https://www.docker.com/) (recommended for isolated, reproducible builds), OR
- [Node.js](https://nodejs.org/) (`>= 16.0.0`), `npm`, and [`ttfautohint`](https://www.freetype.org/ttfautohint/) installed on the host system.

### Method A: GitHub Actions on Your Fork (Automated Cloud CI)

You can build Sawala Mono entirely in the cloud with zero local toolchain setup by running the workflow in your own GitHub fork:

1. **Fork the Repository:**
   Click the **Fork** button at the top right of this repository to create a copy under your personal or organization GitHub account.

2. **Enable GitHub Actions on Your Fork:**
   - By default, GitHub disables Actions workflows on newly forked repositories for security.
   - In your forked repository, navigate to the **Actions** tab.
   - Click the green button: **"I understand my workflows, go ahead and enable them"**.
   - *(Optional for Automated GitHub Releases)* Go to **Settings** $\to$ **Actions** $\to$ **General** $\to$ **Workflow permissions**, select **"Read and write permissions"**, and click **Save**. This allows GitHub Actions to automatically publish release tags and attach packaged ZIP archives.

3. **(Optional) Customize Font Parameters:**
   - Modify glyph designs, weights, or ligation variants in [`private-build-plans.toml`](private-build-plans.toml).
   - Commit and push your changes to your fork's branch.

4. **Trigger the Build:**
   - Go to the **Actions** tab in your forked repository.
   - In the left sidebar, select **Build Sawala Mono Font**.
   - Click the **Run workflow** dropdown button on the right:
     - **Branch**: Select your working branch (e.g. `main` or `dev`).
     - **Variant to build (`variant`)**: Choose `all` (default, compiles both `SawalaMono` and `SawalaMonoNL`), `SawalaMono` (standard with ligatures), or `SawalaMonoNL` (no ligatures).
     - **Format output (`format`)**: Choose `ttf` (default), `woff2`, or `contents`.
     - **Publish as a GitHub Release? (`create_release`)**: `true` (default) or `false`. *(Required if you plan to run Method B for Nerd Font patching).*
     - **Release version tag (`version`)**: Enter a custom version tag (e.g. `v1.0.0`) or leave empty for an automatic timestamp tag (`vYYYY.MM.DD-HHMMSS`).
   - Click **Run workflow** to start the job.

5. **Download Your Compiled Fonts:**
   - When the build job completes (~5-10 minutes depending on runner queue), open the run summary.
   - Scroll down to the **Artifacts** section to download the generated `Sawala-Mono-Packages.zip`.
   - If release publishing was enabled (`create_release: true`), the packaged font archives (`SawalaMono-<version>.zip` and `SawalaMonoNL-<version>.zip`) will be published directly to your repository's **Releases** page.

### Method B: Generating Nerd Font (Sawala Mono NF / Sawala Mono NL NF) on Your Fork

To patch an existing release with programming and developer glyphs (Powerline, Font Awesome, Octicons, devicons) using the containerized Nerd Font patcher workflow:

> [!IMPORTANT]
> **Release Prerequisite:** The patcher workflow downloads base font packages directly from GitHub Releases (`gh release download`). You must first run **Method A** with **"Publish as a GitHub Release?"** set to `true` (or have an existing release tag such as `latest` or `v1.0.0` with TrueType font archives attached) before triggering this workflow.

1. **Ensure GitHub Actions is Enabled:**
   Verify that workflows are enabled in your forked repository (see Step 2 of Method A above).

2. **Trigger the Patcher Workflow:**
   - In your forked repository, navigate to the **Actions** tab.
   - In the left sidebar, select **Patch Nerd Font**.
   - Click the **Run workflow** dropdown and configure the parameters:
     - **GitHub Release Tag to patch (`release_tag`)**: Enter the target release tag (default: `latest`, or a specific tag like `v1.0.0`).
     - **Variant to patch (`variant`)**: Choose `all` (default, patches both variants), `SawalaMono` (with ligatures), or `SawalaMonoNL` (no ligatures).
     - **Nerd Font patch preset (`patch_mode`)**: Choose `complete` (default, ~10,000+ developer and powerline glyphs) or `default` (Powerline core only).
     - **Font scope to patch (`font_scope`)**: Choose `core` (default, 8 Normal coding weights in ~6-8 mins per variant), `extended-core` (8 SemiExtended coding weights in ~6-8 mins per variant), or `all` (all 36 weights per variant).
     - **Custom font family name override (`custom_name`)**: Optional custom family name override (e.g. `Sawala Mono NF` or `Sawala Mono NL NF`, or leave empty for auto-naming).
   - Click **Run workflow** to initiate the containerized patching pipeline.

3. **Download Patched Fonts:**
   - Once the patching pipeline finishes, the workflow automatically attaches the per-variant archives (`SawalaMono-NF-<tag>.zip`, `SawalaMonoNL-NF-<tag>.zip`, or `*-Extended-NF-<tag>.zip`) directly to the specified GitHub Release and uploads them to the workflow **Artifacts** (`Sawala-Mono-NF-Packages`).

### Method C: Containerized Docker Build (Recommended)

Run the build locally inside a self-contained Docker container:

```bash
# 1. Build the local Iosevka compiler container image
docker build -t iosevka-builder docker

# 2. Compile TTF packages using local private-build-plans.toml
# Standard variant (with ligatures):
docker run --rm -v "${PWD}:/work" --entrypoint bash iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMono"

# No Ligatures variant:
docker run --rm -v "${PWD}:/work" --entrypoint bash iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMonoNL"

# Both variants simultaneously:
docker run --rm -v "${PWD}:/work" --entrypoint bash iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMono ttf::SawalaMonoNL"
```

Compiled binaries will be generated inside `./dist/SawalaMono/TTF/` and `./dist/SawalaMonoNL/TTF/`.

### Method D: Native Local Build

If your host environment has Node.js (`>= 16.0.0`) and `ttfautohint` installed:

```bash
# Install dependencies
npm ci

# Compile TrueType font package (standard variant)
npm run build -- ttf::SawalaMono

# Compile No Ligatures variant
npm run build -- ttf::SawalaMonoNL

# Compile both variants simultaneously
npm run build -- ttf::SawalaMono ttf::SawalaMonoNL
```

---

## Architecture & Customization

- **Plan Configuration:** Typographical features, glyph variant selections, and weight/slope/width matrices are declaratively configured in [`private-build-plans.toml`](private-build-plans.toml).
- **Web Documentation & Showcase:** Zero-build static documentation site (`index.html` and `web-docs/`), automatically staged and deployed via [`.github/workflows/pages.yml`](.github/workflows/pages.yml) to [iosevka-mayukai.github.io/sawala-mono-dev](https://iosevka-mayukai.github.io/sawala-mono-dev/).
- **Architecture Documentation:** For an in-depth breakdown of the font compiler engine, Clean Architecture seams, and Verda task DAG, read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
- **Upstream References:** Explore character variant identifiers in [`doc/character-variants.md`](doc/character-variants.md) and custom build options in [`doc/custom-build.md`](doc/custom-build.md).

---

## License & Acknowledgments

### License

Sawala Mono is distributed under the [SIL Open Font License 1.1](LICENSE.md). You are free to use, modify, and redistribute this font family for personal and commercial projects.

### Acknowledgments & Heartfelt Thanks

Sawala Mono is built upon the remarkable foundation created by the open-source typography community:

- **[Iosevka](https://github.com/be5invis/Iosevka)** and its creator, **[Belleve Invis](https://github.com/be5invis)**: Deepest gratitude to Belleve for conceiving and crafting such an ingenious, fully parametric font engine. Designing a monospace typeface with hundreds of weights, slopes, and meticulously engineered OpenType ligature features, while maintaining it as a generous open-source work of art over many years, is a monumental achievement in software and typographic engineering.
- **The Iosevka Contributors & Developer Community**: Sincere appreciation to the many developers and typographers contributing to upstream Iosevka. Their testing, bug reports, scripts, language expansions, and glyph refinements ensure the engine stays rock-solid across operating systems.
- **[Nerd Fonts](https://github.com/ryanoasis/nerd-fonts)**: Special thanks to Ryan L. McIntyre and the Nerd Fonts contributors for providing the standalone containerized patching engine that enables `Sawala Mono NF` to seamlessly bundle developer icons and Powerline glyphs.
