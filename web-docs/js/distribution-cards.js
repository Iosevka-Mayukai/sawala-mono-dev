/**
 * Iosevka Sawala Mono — 4-Tier Distribution Matrix Controller
 * Manages release metadata, Normal (500) vs SemiExtended (548) archive resolution,
 * and direct GitHub Releases download links (REQ-006, AC-011, AC-012).
 */

export const RELEASE_BASE_URL = "https://github.com/Iosevka-Mayukai/sawala-mono-dev/releases/download";

export const DISTRIBUTION_TIERS = Object.freeze([
	{
		id: "sawala-mono",
		name: "Sawala Mono",
		badge: "FEATURED · FLAGSHIP",
		subtitle: "Standard Coding Ligatures",
		description:
			"Flagship coding distribution featuring rich OpenType contextual alternates (=>, !==, ->, ::, <=>) tuned for modern IDEs and pull request reviews.",
		hasLigatures: true,
		hasNerdFont: false,
		recommendedFor: "VS Code, VSCodium, JetBrains IDEs (IntelliJ, WebStorm, PyCharm), Zed",
		archiveFilename: "SawalaMono-v1.0.0.zip",
		extendedArchiveFilename: "SawalaMono-v1.0.0.zip",
		releaseTag: "v1.0.0",
		downloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMono-v1.0.0.zip`,
		extendedDownloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMono-v1.0.0.zip`,
		isFeatured: true,
		specimenPreview: "fn(x) => x !== 0 && x >= 1"
	},
	{
		id: "sawala-mono-nl",
		name: "Sawala Mono NL",
		badge: "NO LIGATURES",
		subtitle: "Strict Symbolic Separation",
		description:
			"Compiled with noLigation = true for developers who require every multi-character operator to remain discrete, literal ASCII glyphs.",
		hasLigatures: false,
		hasNerdFont: false,
		recommendedFor: "Literal operator workflows, kernel/systems C, strict security auditing",
		archiveFilename: "SawalaMonoNL-v1.0.0.zip",
		extendedArchiveFilename: "SawalaMonoNL-v1.0.0.zip",
		releaseTag: "v1.0.0",
		downloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMonoNL-v1.0.0.zip`,
		extendedDownloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMonoNL-v1.0.0.zip`,
		isFeatured: false,
		specimenPreview: "fn(x) => x !== 0 && x >= 1"
	},
	{
		id: "sawala-mono-nf",
		name: "Sawala Mono NF",
		badge: "NERD FONT PATCHED",
		subtitle: "Ligatures + 10,000+ Icons",
		description:
			"Patched via Nerd Fonts v3.3.0 with Powerline, Devicons, Octicons, Font Awesome, and Material Design icons alongside programming ligatures.",
		hasLigatures: true,
		hasNerdFont: true,
		recommendedFor: "Neovim, Tmux, Starship prompt, Kitty, WezTerm, Alacritty, Windows Terminal",
		archiveFilename: "SawalaMono-NF-v1.0.0.zip",
		extendedArchiveFilename: "SawalaMono-Extended-NF-v1.0.0.zip",
		releaseTag: "v1.0.0",
		downloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMono-NF-v1.0.0.zip`,
		extendedDownloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMono-Extended-NF-v1.0.0.zip`,
		isFeatured: false,
		specimenPreview: "\uE0A0 main \uE0B1 => !== -> ::"
	},
	{
		id: "sawala-mono-nl-nf",
		name: "Sawala Mono NL NF",
		badge: "NERD FONT + NO LIG",
		subtitle: "Terminal Icons + Literal Symbols",
		description:
			"Combines full Nerd Font v3.3.0 Powerline and developer icon coverage with strict discrete operator rendering (noLigation = true).",
		hasLigatures: false,
		hasNerdFont: true,
		recommendedFor: "Terminal emulators, shells, and TUI environments without operator ligatures",
		archiveFilename: "SawalaMonoNL-NF-v1.0.0.zip",
		extendedArchiveFilename: "SawalaMonoNL-Extended-NF-v1.0.0.zip",
		releaseTag: "v1.0.0",
		downloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMonoNL-NF-v1.0.0.zip`,
		extendedDownloadUrl: `${RELEASE_BASE_URL}/v1.0.0/SawalaMonoNL-Extended-NF-v1.0.0.zip`,
		isFeatured: false,
		specimenPreview: "\uE0A0 main \uE0B1 = > ! = = - >"
	}
]);

/**
 * Resolves the target archive filename and download URL for a distribution tier and width scope.
 * Matches CI/CD naming ground truth in .github/workflows/build.yml and patch-nerd-font.yml (DESIGN.md:548-558).
 * @param {string} tierId
 * @param {"normal"|"semi-extended"} [widthMode="normal"]
 * @returns {{ archiveFilename: string, downloadUrl: string, widthLabel: string }}
 */
export function resolveDistributionArchive(tierId, widthMode = "normal") {
	const tier = DISTRIBUTION_TIERS.find(item => item.id === tierId) || DISTRIBUTION_TIERS[0];
	const isExtended = widthMode === "semi-extended";
	const archiveFilename = isExtended ? tier.extendedArchiveFilename : tier.archiveFilename;
	const downloadUrl = isExtended ? tier.extendedDownloadUrl : tier.downloadUrl;
	const widthLabel = isExtended
		? tier.id.includes("-nf")
			? "SemiExtended (548) · Extended-Core NF"
			: "Normal (500) + SemiExtended (548) Bundle"
		: "Normal Width (500) · Core";

	return {
		archiveFilename,
		downloadUrl,
		widthLabel
	};
}

/**
 * Updates the 4 distribution cards in the DOM when toggling between Normal (500) and SemiExtended (548) width scopes.
 * @param {"normal"|"semi-extended"} widthMode
 * @param {Document|HTMLElement} [root=document]
 * @returns {"normal"|"semi-extended"}
 */
export function setDistributionWidthMode(widthMode, root = document) {
	const resolvedMode = widthMode === "semi-extended" ? "semi-extended" : "normal";
	const widthButtons = root.querySelectorAll("[data-distribution-width]");
	const cards = root.querySelectorAll("[data-distribution-card]");

	widthButtons.forEach(btn => {
		const isSelected = btn.getAttribute("data-distribution-width") === resolvedMode;
		btn.classList.toggle("is-selected", isSelected);
		btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
	});

	cards.forEach(card => {
		const tierId = card.getAttribute("data-distribution-card");
		if (!tierId) {
			return;
		}
		const resolved = resolveDistributionArchive(tierId, resolvedMode);
		const archiveEl = card.querySelector("[data-distribution-archive]");
		const linkEl = card.querySelector("[data-distribution-download]");
		const widthNoteEl = card.querySelector("[data-distribution-width-note]");

		if (archiveEl) {
			archiveEl.textContent = resolved.archiveFilename;
		}
		if (linkEl) {
			linkEl.setAttribute("href", resolved.downloadUrl);
			linkEl.setAttribute("aria-label", `Download ${resolved.archiveFilename} from GitHub Releases`);
		}
		if (widthNoteEl) {
			widthNoteEl.textContent = resolved.widthLabel;
		}
	});

	return resolvedMode;
}

/**
 * Initializes the 4-Tier Distribution Matrix interactive controls (REQ-006, AC-011, AC-012).
 * @param {Document|HTMLElement} [root=document]
 */
export function initDistributionCards(root = document) {
	const widthButtons = Array.from(root.querySelectorAll("[data-distribution-width]"));
	if (widthButtons.length === 0) {
		return;
	}

	widthButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const mode =
				btn.getAttribute("data-distribution-width") === "semi-extended" ? "semi-extended" : "normal";
			setDistributionWidthMode(mode, root);
		});
	});

	setDistributionWidthMode("normal", root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initDistributionCards(document));
	} else {
		initDistributionCards(document);
	}
}
