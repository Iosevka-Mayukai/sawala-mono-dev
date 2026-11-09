# Sawala Mono
<!-- markdownlint-disable  -->
[![Build Font](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/build.yml/badge.svg)](https://github.com/Iosevka-Mayukai/sawala-mono-dev/actions/workflows/build.yml)
[![License: SIL OFL 1.1](https://img.shields.io/badge/License-OFL%201.1-blue.svg)](https://scripts.sil.org/OFL)
[![GitHub release](https://img.shields.io/github/v/release/Iosevka-Mayukai/sawala-mono-dev?include_prereleases)](https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases)

A clean, ergonomic, and highly legible coding font custom-built on top of [Iosevka](https://github.com/be5invis/Iosevka), crafted specifically for focused programming sessions, code reviews, and modern terminal environments.

---

## Table of Contents

- [Sawala Mono](#sawala-mono)
  - [Table of Contents](#table-of-contents)
  - [Philosophy \& Story Behind the Name](#philosophy--story-behind-the-name)
  - [Font Variants](#font-variants)
  - [Installation](#installation)
    - [Pre-built Binaries (GitHub Releases)](#pre-built-binaries-github-releases)
    - [Platform Installation Steps](#platform-installation-steps)
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
    - [Method A: GitHub Actions (Automated CI)](#method-a-github-actions-automated-ci)
    - [Method B: Containerized Docker Build (Recommended)](#method-b-containerized-docker-build-recommended)
    - [Method C: Native Local Build](#method-c-native-local-build)
  - [Architecture \& Customization](#architecture--customization)
  - [License \& Acknowledgments](#license--acknowledgments)

---

## Philosophy & Story Behind the Name

**Sawala Mono** derives its identity from the intersection of regional cultural heritage and modern software engineering practices:

- **Developer-Centric Philosophy:** In the **Sundanese** language, ***sawala*** means *discussion*, *deliberation*, or *intellectual exchange*. In modern software engineering, code is written not merely for compilers, but primarily for humans to read, review, and reason about—through pull requests, peer reviews, pair programming, and architectural RFCs. **Sawala Mono** embodies this collaborative spirit by delivering uncompromising legibility so ideas and logic flow effortlessly.
- **Global Phonetic Harmony:** While rooted in traditional Sundanese vocabulary, its open-syllable phonetics (`Sa-wa-la`) make it smooth and natural to pronounce worldwide alongside timeless monospace staples like *Iosevka* and *Cascadia*.
- **Clean & Distinct Namespace:** Designed as a conflict-free, first-class typeface across operating systems, package managers, and text editors.

---

## Font Variants

| Variant            | Description                                                                       | Recommended Environments                              |
| :----------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **Sawala Mono**    | Standard variant with rich programming ligatures (`=>`, `!==`, `->`, `::`, etc.). | Modern IDEs (VS Code, JetBrains IntelliJ / WebStorm). |
| **Sawala Mono NL** | *No Ligatures* variant for strict symbolic separation.                            | Developers preferring literal operator glyphs.        |
| **Sawala Mono NF** | *Nerd Font* patched variant featuring full Powerline and developer icons.         | Terminal emulators, Neovim, Tmux, Starship prompt.    |

---

## Installation

### Pre-built Binaries (GitHub Releases)

1. Download the latest release `.zip` archive from the [GitHub Releases](https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases) page.
2. Extract the downloaded archive.
3. Follow the installation steps below for your operating system.

### Platform Installation Steps

- **Windows**:
  - Select all `.ttf` files $\to$ Right-click $\to$ Select **"Install for all users"** (recommended on Windows 10/11 to avoid per-user permission issues in Java runtimes and JetBrains IDEs).
- **macOS**:
  - Open **Font Book** (`Cmd + Space` $\to$ `Font Book`).
  - Drag and drop the extracted `.ttf` files into the Font Book window.
- **Linux**:
  - Copy the `.ttf` files to your user fonts directory and refresh the font cache:
    ```bash
    mkdir -p ~/.local/share/fonts/SawalaMono
    cp *.ttf ~/.local/share/fonts/SawalaMono/
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
5. Recommended font size: `13.5` or `14` with line spacing `1.2`–`1.3`.

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

---

## Building from Source

Sawala Mono compiles using containerized Docker runners and the official Iosevka parametric build engine.

### Prerequisites

- [Docker Desktop](https://www.docker.com/) (recommended for isolated, reproducible builds), OR
- [Node.js](https://nodejs.org/) (`>= 16.0.0`), `npm`, and [`ttfautohint`](https://www.freetype.org/ttfautohint/) installed on the host system.

### Method A: GitHub Actions (Automated CI)

1. Edit your typographical parameters in [`private-build-plans.toml`](private-build-plans.toml) and push to the repository.
2. In GitHub, navigate to the **Actions** tab.
3. In the left sidebar, select **Build Sawala Mono Font**.
4. Click **Run workflow**, choose your branch (`dev` or `main`), configure parameters (variant and format), and trigger the build.
5. Once completed, download the compiled archive (`Sawala-Mono-Packages`) from the workflow **Artifacts** or the auto-generated **GitHub Releases**.

### Method B: Containerized Docker Build (Recommended)

Run the build locally inside a self-contained Docker container:

```bash
# 1. Build the local Iosevka compiler container image
docker build -t iosevka-builder docker

# 2. Compile TTF packages using local private-build-plans.toml
docker run --rm -v "${PWD}:/work" --entrypoint bash iosevka-builder:latest -c "npm ci && npm run build -- ttf::SawalaMono"
```

Compiled binaries will be generated inside `./dist/SawalaMono/TTF/`.

### Method C: Native Local Build

If your host environment has Node.js and `ttfautohint` installed:

```bash
# Install dependencies
npm ci

# Compile TrueType font package
npm run build -- ttf::SawalaMono
```

---

## Architecture & Customization

- **Plan Configuration:** Typographical features, glyph variant selections, and weight/slope/width matrices are declaratively configured in [`private-build-plans.toml`](private-build-plans.toml).
- **Architecture Documentation:** For an in-depth breakdown of the font compiler engine, Clean Architecture seams, and Verda task DAG, read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
- **Upstream References:** Explore character variant identifiers in [`doc/character-variants.md`](doc/character-variants.md) and custom build options in [`doc/custom-build.md`](doc/custom-build.md).

---

## License & Acknowledgments

- **License:** Sawala Mono is released under the [SIL Open Font License 1.1](LICENSE.md). You may freely use, modify, and redistribute this font family for personal and commercial projects.
- **Engine Heritage:** Built upon the parametric font generation engine of [Iosevka](https://github.com/be5invis/Iosevka), created with distinction by [Belleve Invis](https://github.com/be5invis).
