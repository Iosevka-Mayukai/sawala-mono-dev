/**
 * Iosevka Sawala Mono — Quick Setup & IDE Configuration Generator Controller
 * Provides tabbed configuration snippets for 7 environments sourced from README.md:91-184
 * with 1-click Clipboard API copy, #27a644 semantic-success confirmation (2000ms),
 * and automatic textarea selection fallback when clipboard access is restricted
 * (REQ-007, CON-007, AC-013, AC-014).
 */

export const EDITOR_CONFIG_SNIPPETS = Object.freeze({
	vscode: {
		editorId: "vscode",
		displayName: "VS Code",
		filename: "settings.json",
		languageMode: "json",
		tip: "Tip: Set \"editor.fontLigatures\": false when using Sawala Mono NL.",
		configContent: [
			"{",
			"  \"editor.fontFamily\": \"'Sawala Mono', monospace\",",
			"  \"editor.fontLigatures\": true,",
			"  \"editor.fontSize\": 14,",
			"  \"editor.lineHeight\": 1.5",
			"}"
		].join("\n")
	},
	jetbrains: {
		editorId: "jetbrains",
		displayName: "JetBrains IDEs",
		filename: "Settings > Editor > Font (GUI Checklist)",
		languageMode: "conf",
		tip: "Tip: JetBrains configures fonts via GUI (Settings -> Editor -> Font). On Windows 10/11, use \"Install for all users\" and restart the IDE.",
		configContent: [
			"# JetBrains IDEs configure font settings via GUI dialog:",
			"# Settings / Preferences (Ctrl+Alt+S or Cmd+,) -> Editor -> Font",
			"Font = \"Sawala Mono\"",
			"Size = 14",
			"Line height = 1.25",
			"Enable ligatures = true"
		].join("\n")
	},
	neovim: {
		editorId: "neovim",
		displayName: "Neovim",
		filename: "init.lua",
		languageMode: "lua",
		tip: "Tip: For terminal Neovim with Lualine/Devicons, set your terminal emulator font to 'Sawala Mono NF'.",
		configContent: [
			"-- init.lua (Neovim GUI / Neovide)",
			"vim.o.guifont = \"Sawala Mono:h14\""
		].join("\n")
	},
	alacritty: {
		editorId: "alacritty",
		displayName: "Alacritty",
		filename: "alacritty.toml",
		languageMode: "toml",
		tip: "Tip: Use family = \"Sawala Mono NF\" to enable built-in Nerd Font v3.3.0 icons in Alacritty.",
		configContent: [
			"[font.normal]",
			"family = \"Sawala Mono\"",
			"style = \"Regular\"",
			"",
			"[font.bold]",
			"family = \"Sawala Mono\"",
			"style = \"Bold\"",
			"",
			"[font.italic]",
			"family = \"Sawala Mono\"",
			"style = \"Italic\"",
			"",
			"[font]",
			"size = 14.0"
		].join("\n")
	},
	kitty: {
		editorId: "kitty",
		displayName: "Kitty",
		filename: "kitty.conf",
		languageMode: "conf",
		tip: "Tip: Run `kitten choose-fonts` in Kitty to preview Sawala Mono weights interactively.",
		configContent: [
			"font_family      Sawala Mono",
			"bold_font        auto",
			"italic_font      auto",
			"bold_italic_font auto",
			"font_size        14.0"
		].join("\n")
	},
	wezterm: {
		editorId: "wezterm",
		displayName: "WezTerm",
		filename: "wezterm.lua",
		languageMode: "lua",
		tip: "Tip: Add harfbuzz_features = { 'calt=0' } if you want to disable ligatures dynamically in WezTerm.",
		configContent: [
			"local wezterm = require 'wezterm'",
			"local config = wezterm.config_builder()",
			"",
			"config.font = wezterm.font('Sawala Mono')",
			"config.font_size = 14.0",
			"",
			"return config"
		].join("\n")
	},
	"windows-terminal": {
		editorId: "windows-terminal",
		displayName: "Windows Terminal",
		filename: "settings.json",
		languageMode: "json",
		tip: "Tip: Set \"face\": \"Sawala Mono NF\" for Starship and Oh My Posh prompts in Windows Terminal.",
		configContent: [
			"\"profiles\": {",
			"  \"defaults\": {",
			"    \"font\": {",
			"      \"face\": \"Sawala Mono\",",
			"      \"size\": 12",
			"    }",
			"  }",
			"}"
		].join("\n")
	}
});

export const SUPPORTED_EDITORS = Object.freeze(Object.keys(EDITOR_CONFIG_SNIPPETS));

export const CONFIG_FONT_FAMILIES = Object.freeze({
	"sawala-mono": {
		familyName: "Sawala Mono",
		ligaturesEnabled: true
	},
	"sawala-mono-nl": {
		familyName: "Sawala Mono NL",
		ligaturesEnabled: false
	},
	"sawala-mono-nf": {
		familyName: "Sawala Mono NF",
		ligaturesEnabled: true
	},
	"sawala-mono-nl-nf": {
		familyName: "Sawala Mono NL NF",
		ligaturesEnabled: false
	}
});

/**
 * Formats an editor configuration snippet for the selected Sawala Mono family variant.
 * @param {string} editorId
 * @param {string} [familyVariantKey="sawala-mono"]
 * @returns {{ snippet: object, formattedContent: string, familyMeta: object }}
 */
export function formatEditorConfig(editorId, familyVariantKey = "sawala-mono") {
	const snippet = EDITOR_CONFIG_SNIPPETS[editorId] || EDITOR_CONFIG_SNIPPETS.vscode;
	const familyMeta = CONFIG_FONT_FAMILIES[familyVariantKey] || CONFIG_FONT_FAMILIES["sawala-mono"];

	let formattedContent = snippet.configContent.replace(/Sawala Mono/g, familyMeta.familyName);
	if (!familyMeta.ligaturesEnabled) {
		formattedContent = formattedContent
			.replace("\"editor.fontLigatures\": true", "\"editor.fontLigatures\": false")
			.replace("\"Enable_Ligatures\": true", "\"Enable_Ligatures\": false");
	}

	return {
		snippet,
		formattedContent,
		familyMeta
	};
}

/**
 * Copies the configuration text via navigator.clipboard.writeText, or auto-selects
 * the fallback textarea and returns fallback status when clipboard access is restricted (AC-013, AC-014).
 * @param {string} text
 * @param {HTMLTextAreaElement|null} [fallbackTextareaEl=null]
 * @returns {Promise<{ ok: boolean, mode: "clipboard"|"fallback" }>}
 */
export async function copyConfigWithFallback(text, fallbackTextareaEl = null) {
	if (
		typeof navigator !== "undefined" &&
		navigator.clipboard &&
		typeof navigator.clipboard.writeText === "function"
	) {
		try {
			await navigator.clipboard.writeText(text);
			return { ok: true, mode: "clipboard" };
		} catch {
			// Permission denied or restricted context: fall through to AC-014 selection fallback
		}
	}

	if (fallbackTextareaEl) {
		fallbackTextareaEl.value = text;
		fallbackTextareaEl.classList.add("is-visible");
		try {
			fallbackTextareaEl.focus();
			fallbackTextareaEl.select();
			if (typeof fallbackTextareaEl.setSelectionRange === "function") {
				fallbackTextareaEl.setSelectionRange(0, text.length);
			}
		} catch {
			// Ignore synthetic DOM selection errors
		}
	}

	return { ok: false, mode: "fallback" };
}

/**
 * Selects an editor tab and updates the configuration code block and fallback textarea.
 * @param {string} editorId
 * @param {Document|HTMLElement} [root=document]
 * @param {string} [familyVariantKey]
 * @returns {object}
 */
export function selectEditorConfig(editorId, root = document, familyVariantKey) {
	const familySelectEl = root.querySelector("#config-family-select");
	const activeFamilyKey =
		familyVariantKey || (familySelectEl ? familySelectEl.value : "sawala-mono") || "sawala-mono";
	const { snippet, formattedContent } = formatEditorConfig(editorId, activeFamilyKey);

	const tabs = root.querySelectorAll("[data-config-tab]");
	const filenameEl = root.querySelector("#config-filename");
	const codeEl = root.querySelector("#config-code");
	const tipEl = root.querySelector("#config-tip-text");
	const fallbackTextarea = root.querySelector("#config-fallback-textarea");
	const panelEl = root.querySelector("#config-tabpanel");

	tabs.forEach(tab => {
		const isSelected = tab.getAttribute("data-config-tab") === snippet.editorId;
		tab.setAttribute("aria-selected", isSelected ? "true" : "false");
		tab.setAttribute("tabindex", isSelected ? "0" : "-1");
		tab.classList.toggle("is-selected", isSelected);
		if (isSelected && panelEl && tab.id) {
			panelEl.setAttribute("aria-labelledby", tab.id);
		}
	});

	if (filenameEl) {
		filenameEl.textContent = `// ${snippet.displayName} — ${snippet.filename}`;
	}

	if (codeEl) {
		codeEl.className = `language-${snippet.languageMode}`;
		codeEl.textContent = formattedContent;
		if (
			typeof window !== "undefined" &&
			window.Prism &&
			typeof window.Prism.highlightElement === "function"
		) {
			window.Prism.highlightElement(codeEl);
		}
	}

	if (fallbackTextarea) {
		fallbackTextarea.value = formattedContent;
		fallbackTextarea.classList.remove("is-visible");
	}

	if (tipEl) {
		tipEl.textContent = snippet.tip;
	}

	return { snippet, formattedContent };
}

/**
 * Initializes the Quick Setup & IDE Configuration Generator section (REQ-007, AC-013, AC-014).
 * @param {Document|HTMLElement} [root=document]
 */
export function initConfigGenerator(root = document) {
	const tabs = Array.from(root.querySelectorAll("[data-config-tab]"));
	const familySelectEl = root.querySelector("#config-family-select");
	const copyBtn = root.querySelector("#config-copy-btn");
	const copyLabelEl = root.querySelector("#config-copy-label");
	const fallbackTextarea = root.querySelector("#config-fallback-textarea");

	if (tabs.length === 0) {
		return;
	}

	let currentEditorId = "vscode";

	tabs.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			const editorId = tab.getAttribute("data-config-tab") || "vscode";
			currentEditorId = editorId;
			selectEditorConfig(editorId, root);
		});

		tab.addEventListener("keydown", event => {
			let nextIdx = -1;
			if (event.key === "ArrowRight") {
				nextIdx = (index + 1) % tabs.length;
			} else if (event.key === "ArrowLeft") {
				nextIdx = (index - 1 + tabs.length) % tabs.length;
			} else if (event.key === "Home") {
				nextIdx = 0;
			} else if (event.key === "End") {
				nextIdx = tabs.length - 1;
			}

			if (nextIdx !== -1) {
				event.preventDefault();
				const nextTab = tabs[nextIdx];
				nextTab.focus();
				const nextEditorId = nextTab.getAttribute("data-config-tab") || "vscode";
				currentEditorId = nextEditorId;
				selectEditorConfig(nextEditorId, root);
			}
		});
	});

	if (familySelectEl) {
		familySelectEl.addEventListener("change", () => {
			selectEditorConfig(currentEditorId, root, familySelectEl.value);
		});
	}

	if (copyBtn) {
		let resetTimerId = null;

		copyBtn.addEventListener("click", async () => {
			const codeEl = root.querySelector("#config-code");
			const snippetText = codeEl ? codeEl.textContent || "" : "";
			const result = await copyConfigWithFallback(snippetText, fallbackTextarea);

			if (resetTimerId) {
				clearTimeout(resetTimerId);
			}

			if (result.ok) {
				copyBtn.setAttribute("data-copied", "true");
				if (copyLabelEl) {
					copyLabelEl.textContent = "Copied!";
				}
			} else {
				copyBtn.setAttribute("data-copied", "fallback");
				if (copyLabelEl) {
					copyLabelEl.textContent = "Press Ctrl+C to copy";
				}
			}

			resetTimerId = setTimeout(() => {
				copyBtn.removeAttribute("data-copied");
				if (copyLabelEl) {
					copyLabelEl.textContent = "Copy Configuration";
				}
				if (fallbackTextarea && typeof document !== "undefined" && document.activeElement !== fallbackTextarea) {
					fallbackTextarea.classList.remove("is-visible");
				}
			}, 2000);
		});
	}

	if (fallbackTextarea) {
		fallbackTextarea.addEventListener("blur", () => {
			fallbackTextarea.classList.remove("is-visible");
		});
	}

	selectEditorConfig("vscode", root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initConfigGenerator(document));
	} else {
		initConfigGenerator(document);
	}
}
