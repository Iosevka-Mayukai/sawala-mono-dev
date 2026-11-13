/**
 * Iosevka Sawala Mono — Nerd Font Terminal Environment Mockup Controller
 * Simulates a Starship / Neovim / Tmux terminal session using inline SVG and UTF-8
 * Powerline symbols (U+E0B0 , U+E0B1 , U+E0B2 , U+E0A0 ) with zero multi-MB
 * webfont payload overhead (REQ-010, CON-004, AC-017).
 */

export const POWERLINE_GLYPHS = Object.freeze({
	rightSolid: "\uE0B0",
	rightThin: "\uE0B1",
	leftSolid: "\uE0B2",
	leftThin: "\uE0B3",
	gitBranch: "\uE0A0"
});

export const TERMINAL_PRESETS = Object.freeze({
	neovim: {
		id: "neovim",
		label: "Neovim + Lualine",
		windowTitle: "~/work/sawala-mono (main) — nvim src/session.ts",
		directory: "src/session.ts",
		gitBranch: "main*",
		gitDiff: "+14 ~2 -0",
		runtimeBadge: "v1.0.0 · TS 5.6",
		duration: "18ms",
		modeLabel: "NORMAL",
		cursorPos: "7:24",
		lines: [
			{
				lineNo: 1,
				html: "<span class=\"term-kw\">import</span> { <span class=\"term-type\">SawalaSession</span>, <span class=\"term-type\">GlyphMetrics</span> } <span class=\"term-kw\">from</span> <span class=\"term-str\">\"@sawala/core\"</span>;"
			},
			{
				lineNo: 2,
				html: ""
			},
			{
				lineNo: 3,
				html: "<span class=\"term-cm\">// Powerline glyphs (\uE0B0 \uE0B1 \uE0B2 \uE0A0) align seamlessly with 500-unit cell grids</span>"
			},
			{
				lineNo: 4,
				html: "<span class=\"term-kw\">export const</span> <span class=\"term-fn\">verifyTerminalGrid</span> = (<span class=\"term-var\">m</span>: <span class=\"term-type\">GlyphMetrics</span>): <span class=\"term-type\">boolean</span> <span class=\"term-op\">=&gt;</span> {"
			},
			{
				lineNo: 5,
				html: "  <span class=\"term-kw\">const</span> <span class=\"term-var\">isAligned</span> = <span class=\"term-var\">m</span>.width <span class=\"term-op\">===</span> <span class=\"term-num\">500</span> <span class=\"term-op\">&amp;&amp;</span> <span class=\"term-var\">m</span>.xHeight <span class=\"term-op\">!==</span> <span class=\"term-num\">0</span>;"
			},
			{
				lineNo: 6,
				html: "  <span class=\"term-kw\">return</span> <span class=\"term-var\">isAligned</span> ? <span class=\"term-str\">\"Sawala Mono NF -&gt; Ready\"</span>.<span class=\"term-fn\">length</span> <span class=\"term-op\">&gt;=</span> <span class=\"term-num\">1</span> : <span class=\"term-num\">false</span>;"
			},
			{
				lineNo: 7,
				html: "};"
			}
		]
	},
	"git-review": {
		id: "git-review",
		label: "Starship + PR Review",
		windowTitle: "~/work/sawala-mono (feat/web-showcase) — zsh (starship)",
		directory: "~/work/sawala-mono",
		gitBranch: "feat/web-showcase",
		gitDiff: "+412 ~18 -0",
		runtimeBadge: "node v20.18.0",
		duration: "42ms",
		modeLabel: "STARSHIP",
		cursorPos: "UTF-8",
		lines: [
			{
				lineNo: 1,
				html: "<span class=\"term-op\">$</span> <span class=\"term-fn\">gh</span> pr view <span class=\"term-num\">42</span> --json reviewDecision,title,additions"
			},
			{
				lineNo: 2,
				html: "<span class=\"term-cm\"># Deliberation #42 :: Interactive Showcase &amp; Technical Documentation</span>"
			},
			{
				lineNo: 3,
				html: "{ <span class=\"term-str\">\"reviewDecision\"</span>: <span class=\"term-str\">\"APPROVED\"</span>, <span class=\"term-str\">\"quorum\"</span>: <span class=\"term-str\">\"3/3 !== 0\"</span>, <span class=\"term-str\">\"status\"</span>: <span class=\"term-str\">\"LGTM =&gt; merge\"</span> }"
			},
			{
				lineNo: 4,
				html: ""
			},
			{
				lineNo: 5,
				html: "<span class=\"term-op\">$</span> <span class=\"term-fn\">git</span> log --oneline -n <span class=\"term-num\">3</span>"
			},
			{
				lineNo: 6,
				html: "<span class=\"term-num\">a19f04c</span> feat(web-docs): implement glyph inspector &amp; terminal preview (-&gt; AC-017)"
			},
			{
				lineNo: 7,
				html: "<span class=\"term-num\">8c40e12</span> feat(fonts): verify Tier A WOFF2 subset metrics (x-height == 520)"
			}
		]
	},
	"tmux-build": {
		id: "tmux-build",
		label: "Tmux + Nerd Font Patcher",
		windowTitle: "tmux [0:build*] — docker iosevka-builder:latest",
		directory: "dist/SawalaMono-NF",
		gitBranch: "v1.0.0",
		gitDiff: "clean",
		runtimeBadge: "NF Patcher v3.3.0",
		duration: "1.4s",
		modeLabel: "TMUX 3.4",
		cursorPos: "100%",
		lines: [
			{
				lineNo: 1,
				html: "<span class=\"term-op\">$</span> <span class=\"term-fn\">docker</span> run --rm -v <span class=\"term-str\">\"${PWD}:/work\"</span> nerdfonts/patcher <span class=\"term-op\">--complete</span> <span class=\"term-op\">--careful</span>"
			},
			{
				lineNo: 2,
				html: "<span class=\"term-cm\">[INFO] Patching Sawala Mono Regular (width: 500, x-height: 520, slope: 0.0\u00B0)...</span>"
			},
			{
				lineNo: 3,
				html: "<span class=\"term-str\">  [OK]</span> Powerline Symbols      (U+E0A0..U+E0D4) <span class=\"term-op\">=&gt;</span> <span class=\"term-num\">100%</span> cell-aligned"
			},
			{
				lineNo: 4,
				html: "<span class=\"term-str\">  [OK]</span> Devicons &amp; Seti-UI     (U+E5FA..U+E7C5) <span class=\"term-op\">=&gt;</span> <span class=\"term-num\">412</span> filetype glyphs"
			},
			{
				lineNo: 5,
				html: "<span class=\"term-str\">  [OK]</span> Octicons &amp; Material    (U+F0001..U+F1AF0) <span class=\"term-op\">=&gt;</span> <span class=\"term-num\">10,240+</span> icons"
			},
			{
				lineNo: 6,
				html: "<span class=\"term-cm\">[DONE] Packaged archive -&gt; SawalaMono-NF-v1.0.0.zip (0 collisions !== error)</span>"
			},
			{
				lineNo: 7,
				html: "<span class=\"term-op\">$</span> <span class=\"term-fn\">sha256sum</span> SawalaMono-NF-v1.0.0.zip <span class=\"term-op\">|&gt;</span> verify-release"
			}
		]
	}
});

/**
 * Renders the selected terminal preset into the Terminal Mockup DOM (AC-017).
 * @param {string} presetId
 * @param {Document|HTMLElement} [root=document]
 * @returns {object}
 */
export function selectTerminalPreset(presetId, root = document) {
	const preset = TERMINAL_PRESETS[presetId] || TERMINAL_PRESETS.neovim;
	const tabs = root.querySelectorAll("[data-terminal-preset]");
	const titleEl = root.querySelector("#terminal-window-title");
	const dirEl = root.querySelector("#terminal-seg-dir");
	const branchEl = root.querySelector("#terminal-seg-branch");
	const runtimeEl = root.querySelector("#terminal-seg-runtime");
	const durationEl = root.querySelector("#terminal-seg-duration");
	const bodyEl = root.querySelector("#terminal-code-lines");
	const modeEl = root.querySelector("#terminal-status-mode");
	const branchBottomEl = root.querySelector("#terminal-status-branch");
	const diffEl = root.querySelector("#terminal-status-diff");
	const posEl = root.querySelector("#terminal-status-pos");

	tabs.forEach(tab => {
		const isSelected = tab.getAttribute("data-terminal-preset") === preset.id;
		tab.setAttribute("aria-selected", isSelected ? "true" : "false");
		tab.setAttribute("tabindex", isSelected ? "0" : "-1");
		tab.classList.toggle("is-selected", isSelected);
	});

	if (titleEl) {
		titleEl.textContent = preset.windowTitle;
	}
	if (dirEl) {
		dirEl.textContent = preset.directory;
	}
	if (branchEl) {
		branchEl.textContent = preset.gitBranch;
	}
	if (runtimeEl) {
		runtimeEl.textContent = preset.runtimeBadge;
	}
	if (durationEl) {
		durationEl.textContent = preset.duration;
	}
	if (modeEl) {
		modeEl.textContent = preset.modeLabel;
	}
	if (branchBottomEl) {
		branchBottomEl.textContent = preset.gitBranch;
	}
	if (diffEl) {
		diffEl.textContent = preset.gitDiff;
	}
	if (posEl) {
		posEl.textContent = preset.cursorPos;
	}

	if (bodyEl) {
		bodyEl.innerHTML = preset.lines
			.map(
				line =>
					`<div class="terminal-line"><span class="terminal-line__no tabular-nums" aria-hidden="true">${line.lineNo}</span><span class="terminal-line__code">${line.html || "&nbsp;"}</span></div>`
			)
			.join("");
	}

	return preset;
}

/**
 * Toggles between Sawala Mono NF (calt: 1) and Sawala Mono NL NF (calt: 0) in the terminal window.
 * @param {"standard"|"nl"} mode
 * @param {Document|HTMLElement} [root=document]
 * @returns {"standard"|"nl"}
 */
export function setTerminalLigatureMode(mode, root = document) {
	const resolvedMode = mode === "nl" ? "nl" : "standard";
	const isStandard = resolvedMode === "standard";
	const viewportEl = root.querySelector("#terminal-mockup-viewport");
	const toggleBtns = root.querySelectorAll("[data-terminal-variant]");
	const badgeEl = root.querySelector("#terminal-font-badge");

	if (viewportEl) {
		viewportEl.setAttribute("data-ligature-mode", resolvedMode);
		viewportEl.style.fontVariantLigatures = isStandard ? "normal" : "none";
		viewportEl.style.fontFeatureSettings = isStandard ? "\"calt\" 1, \"liga\" 1" : "\"calt\" 0, \"liga\" 0";
	}

	toggleBtns.forEach(btn => {
		const isSelected = btn.getAttribute("data-terminal-variant") === resolvedMode;
		btn.classList.toggle("is-selected", isSelected);
		btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
	});

	if (badgeEl) {
		badgeEl.textContent = isStandard
			? "Sawala Mono NF · Powerline + calt: 1"
			: "Sawala Mono NL NF · Powerline + calt: 0";
	}

	return resolvedMode;
}

/**
 * Initializes the Nerd Font Terminal Preview section (REQ-010, AC-017).
 * @param {Document|HTMLElement} [root=document]
 */
export function initTerminalPreview(root = document) {
	const presetTabs = Array.from(root.querySelectorAll("[data-terminal-preset]"));
	const variantBtns = Array.from(root.querySelectorAll("[data-terminal-variant]"));

	if (presetTabs.length === 0 && variantBtns.length === 0) {
		return;
	}

	presetTabs.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			const presetId = tab.getAttribute("data-terminal-preset") || "neovim";
			selectTerminalPreset(presetId, root);
		});

		tab.addEventListener("keydown", event => {
			let nextIdx = -1;
			if (event.key === "ArrowRight") {
				nextIdx = (index + 1) % presetTabs.length;
			} else if (event.key === "ArrowLeft") {
				nextIdx = (index - 1 + presetTabs.length) % presetTabs.length;
			} else if (event.key === "Home") {
				nextIdx = 0;
			} else if (event.key === "End") {
				nextIdx = presetTabs.length - 1;
			}

			if (nextIdx !== -1) {
				event.preventDefault();
				const nextTab = presetTabs[nextIdx];
				nextTab.focus();
				const nextId = nextTab.getAttribute("data-terminal-preset") || "neovim";
				selectTerminalPreset(nextId, root);
			}
		});
	});

	variantBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			const mode = btn.getAttribute("data-terminal-variant") === "nl" ? "nl" : "standard";
			setTerminalLigatureMode(mode, root);
		});
	});

	selectTerminalPreset("neovim", root);
	setTerminalLigatureMode("standard", root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initTerminalPreview(document));
	} else {
		initTerminalPreview(document);
	}
}
