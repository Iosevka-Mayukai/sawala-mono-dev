/**
 * Iosevka Sawala Mono — Polyglot Code Specimen Runner Controller
 * Manages the 5-language interactive code specimen and 3-way font variant selector
 * (Standard, Ligar, NL) in the Hero section (REQ-002, REQ-003, AC-003, AC-004).
 * Languages: TypeScript, Rust, Go, Python, Lua.
 */

export const POLYGLOT_VARIANTS = Object.freeze({
	standard: Object.freeze({
		id: "standard",
		label: "Standard",
		ligatureMode: "standard",
		statusText: "Sawala Mono · calt: 1"
	}),
	ligar: Object.freeze({
		id: "ligar",
		label: "Ligar",
		ligatureMode: "standard",
		statusText: "Sawala Ligar Mono · calt: 1"
	}),
	nl: Object.freeze({
		id: "nl",
		label: "NL",
		ligatureMode: "nl",
		statusText: "Sawala Mono NL · calt: 0"
	})
});

export const POLYGLOT_SNIPPETS = Object.freeze({
	typescript: {
		language: "typescript",
		displayName: "TypeScript",
		filename: "deliberation.ts",
		highlights: ["=>", "!==", "===", ">=", "->", "0 vs O", "1 vs l vs I"],
		code: [
			"interface DeliberationSession<T> {",
			"  readonly participants: ReadonlyArray<Developer>;",
			"  evaluate: (pr: PullRequest) => Promise<Result<T, ReviewError>>;",
			"}",
			"",
			"const reviewOutcome = async (pr: PullRequest): Promise<boolean> => {",
			"  const quorumMask = 0x0F_10 !== 0x00 && pr.id !== null;",
			"  const isApproved = pr.approvals.length >= 2 && pr.blockingDiscussions === 0;",
			"  pr.reviewerNotes = pr.reviewerNotes || \"Verified clarity across 1lI and 0O glyphs -> LGTM\";",
			"  return isApproved && quorumMask ? pr.merge() : pr.requestRevision();",
			"};"
		].join("\n")
	},
	rust: {
		language: "rust",
		displayName: "Rust",
		filename: "consensus.rs",
		highlights: ["match", "=>", "->", "::", "!=", ">=", "..="],
		code: [
			"use crate::sawala::{Deliberation, QuorumState, ReviewVerdict};",
			"",
			"pub fn evaluate_quorum(session: &Deliberation) -> Result<ReviewVerdict, &'static str> {",
			"  let approvals = session.votes.iter().filter(|v| v.weight != 0).count();",
			"  match (approvals, session.open_threads) {",
			"    (count, 0) if count >= session.required_peers => Ok(ReviewVerdict::Approved),",
			"    (1..=99, blockers) if blockers != 0 => Ok(ReviewVerdict::NeedsDiscussion),",
			"    _ => Err(\"Consensus not reached :: awaiting peer deliberation\"),",
			"  }",
			"}"
		].join("\n")
	},
	go: {
		language: "go",
		displayName: "Go",
		filename: "pipeline.go",
		highlights: ["<-", ":=", "!=", "==", ">=", "func"],
		code: [
			"package sawala",
			"",
			"func DispatchReview(ch <-chan PullRequest, out chan<- Verdict) error {",
			"  for pr := range ch {",
			"    if pr.CommitHash != \"\" && pr.DraftMode == false {",
			"      quorumReached := len(pr.Approvers) >= 2 && pr.Conflicts == 0",
			"      out <- Verdict{ID: pr.ID, ReadyToMerge: quorumReached}",
			"    }",
			"  }",
			"  return nil",
			"}"
		].join("\n")
	},
	python: {
		language: "python",
		displayName: "Python",
		filename: "metrics.py",
		highlights: ["->", ":=", "!=", "==", ">=", "@dataclass"],
		code: [
			"from dataclasses import dataclass",
			"",
			"@dataclass(frozen=True)",
			"class SawalaMetrics:",
			"    x_height: int = 520",
			"    cap_height: int = 735",
			"    advance_width: int = 500",
			"    italic_slope: float = 9.4",
			"",
			"def verify_legibility(metrics: SawalaMetrics) -> bool:",
			"    if (ratio := metrics.x_height / metrics.cap_height) >= 0.70:",
			"        return metrics.advance_width == 500 and ratio != 0.0",
			"    return False"
		].join("\n")
	},
	lua: {
		language: "lua",
		displayName: "Lua",
		filename: "init.lua",
		highlights: ["~=", "==", "..", "--", "->", "{}"],
		code: [
			"-- Neovim GUI & Terminal Typography Configuration (Sawala Mono)",
			"local M = {}",
			"",
			"function M.setup(opts)",
			"  local family = opts and opts.family or \"Sawala Mono\"",
			"  local size = (opts and opts.size ~= nil) and opts.size or 14",
			"  if vim.o.guifont == \"\" or family ~= \"\" then",
			"    vim.o.guifont = family .. \":h\" .. tostring(size) -- -> 14pt crisp grid",
			"  end",
			"  return { font = vim.o.guifont, ligatures = true }",
			"end",
			"",
			"return M"
		].join("\n")
	}
});

export const SUPPORTED_LANGUAGES = Object.freeze(Object.keys(POLYGLOT_SNIPPETS));

/**
 * Generates line-number elements for a given code string.
 * @param {string} code
 * @returns {string} HTML markup for line numbers
 */
export function buildLineNumbersMarkup(code) {
	const lineCount = Math.max(1, code.split("\n").length);
	const lines = [];
	for (let i = 1; i <= lineCount; i += 1) {
		lines.push(`<span>${i}</span>`);
	}
	return lines.join("");
}

/**
 * Renders the selected language snippet into the Polyglot Runner DOM.
 * @param {string} langKey
 * @param {Document|HTMLElement} [root=document]
 * @returns {boolean}
 */
export function selectLanguage(langKey, root = document) {
	const snippet = Object.hasOwn(POLYGLOT_SNIPPETS, langKey)
		? POLYGLOT_SNIPPETS[langKey]
		: POLYGLOT_SNIPPETS.typescript;
	const codeEl = root.querySelector("#polyglot-code");
	const gutterEl = root.querySelector("#polyglot-line-numbers");
	const filenameEl = root.querySelector("#polyglot-filename");
	const highlightsEl = root.querySelector("#polyglot-highlights");
	const panelEl = root.querySelector("#polyglot-viewport");
	const tabButtons = root.querySelectorAll("[data-polyglot-tab]");

	if (!codeEl) {
		return false;
	}

	tabButtons.forEach(btn => {
		const isSelected = btn.getAttribute("data-polyglot-tab") === snippet.language;
		btn.setAttribute("aria-selected", isSelected ? "true" : "false");
		btn.setAttribute("tabindex", isSelected ? "0" : "-1");
		btn.classList.toggle("is-selected", isSelected);
		if (isSelected && panelEl && btn.id) {
			panelEl.setAttribute("aria-labelledby", btn.id);
		}
	});

	if (filenameEl) {
		filenameEl.textContent = snippet.filename;
	}

	if (gutterEl) {
		gutterEl.innerHTML = buildLineNumbersMarkup(snippet.code);
	}

	codeEl.className = `language-${snippet.language}`;
	codeEl.textContent = snippet.code;

	if (typeof window !== "undefined" && window.Prism && typeof window.Prism.highlightElement === "function") {
		window.Prism.highlightElement(codeEl);
	}

	if (highlightsEl && Array.isArray(snippet.highlights)) {
		highlightsEl.innerHTML = snippet.highlights
			.map(token => `<span class="polyglot-runner__token-chip">${escapeHtml(token)}</span>`)
			.join("");
	}

	return true;
}

/**
 * Escapes special HTML characters to prevent injection.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/**
 * Copies text to clipboard with fallback selection when Clipboard API is restricted.
 * @param {string} text
 * @param {HTMLElement|null} [targetEl=null]
 * @returns {Promise<boolean>}
 */
export async function copyTextWithFallback(text, targetEl = null) {
	if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fall through to execCommand / selection fallback
		}
	}

	if (typeof document !== "undefined") {
		const tempArea = document.createElement("textarea");
		tempArea.value = text;
		tempArea.setAttribute("readonly", "");
		tempArea.style.position = "fixed";
		tempArea.style.opacity = "0";
		document.body.appendChild(tempArea);
		tempArea.select();
		let copied = false;
		try {
			copied = document.execCommand("copy");
		} catch {
			copied = false;
		}

		if (copied) {
			document.body.removeChild(tempArea);
			return true;
		}

		if (
			targetEl &&
			typeof window !== "undefined" &&
			typeof window.getSelection === "function" &&
			typeof document.createRange === "function"
		) {
			document.body.removeChild(tempArea);
			try {
				const range = document.createRange();
				range.selectNodeContents(targetEl);
				const selection = window.getSelection();
				if (selection) {
					selection.removeAllRanges();
					selection.addRange(range);
				}
			} catch {
				// Ignore selection errors in restricted DOM environments
			}
			return false;
		}

		tempArea.addEventListener(
			"blur",
			() => {
				if (tempArea.parentNode) {
					tempArea.parentNode.removeChild(tempArea);
				}
			},
			{ once: true }
		);
		return false;
	}

	return false;
}

/**
 * Switches the active Polyglot Runner font family while keeping data-ligatures strictly binary ("standard" | "nl").
 * @param {string|null|undefined} variant
 * @param {Document|HTMLElement} [root=document]
 * @returns {"standard"|"ligar"|"nl"}
 */
export function selectPolyglotVariant(variant, root = document) {
	const meta = Object.hasOwn(POLYGLOT_VARIANTS, variant)
		? POLYGLOT_VARIANTS[variant]
		: POLYGLOT_VARIANTS.standard;
	const variantBtns = root.querySelectorAll("[data-polyglot-variant]");
	const viewportEl = root.querySelector("#polyglot-viewport");
	const statusEl = root.querySelector("#polyglot-variant-status");

	variantBtns.forEach(btn => {
		const isSelected = btn.getAttribute("data-polyglot-variant") === meta.id;
		btn.classList.toggle("is-selected", isSelected);
		btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
	});

	if (viewportEl) {
		viewportEl.setAttribute("data-font-variant", meta.id);
		viewportEl.setAttribute("data-ligatures", meta.ligatureMode);
	}

	if (statusEl) {
		statusEl.textContent = meta.statusText;
	}

	return meta.id;
}

/**
 * Initializes the Polyglot Code Specimen Runner event listeners and default state.
 * @param {Document|HTMLElement} [root=document]
 */
export function initPolyglotRunner(root = document) {
	const tablist = root.querySelector("#polyglot-tablist");
	const tabs = Array.from(root.querySelectorAll("[data-polyglot-tab]"));
	const variantButtons = Array.from(root.querySelectorAll("[data-polyglot-variant]"));
	const copyBtn = root.querySelector("#polyglot-copy-btn");
	const copyLabelEl = root.querySelector("#polyglot-copy-label");

	if (!tablist || tabs.length === 0) {
		return;
	}

	tabs.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			const lang = tab.getAttribute("data-polyglot-tab");
			if (lang) {
				selectLanguage(lang, root);
			}
		});

		tab.addEventListener("keydown", event => {
			let targetIndex = -1;
			if (event.key === "ArrowRight") {
				targetIndex = (index + 1) % tabs.length;
			} else if (event.key === "ArrowLeft") {
				targetIndex = (index - 1 + tabs.length) % tabs.length;
			} else if (event.key === "Home") {
				targetIndex = 0;
			} else if (event.key === "End") {
				targetIndex = tabs.length - 1;
			}

			if (targetIndex !== -1) {
				event.preventDefault();
				const nextTab = tabs[targetIndex];
				nextTab.focus();
				const nextLang = nextTab.getAttribute("data-polyglot-tab");
				if (nextLang) {
					selectLanguage(nextLang, root);
				}
			}
		});
	});

	variantButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const nextVariant = btn.getAttribute("data-polyglot-variant");
			selectPolyglotVariant(nextVariant, root);
		});
	});

	if (copyBtn) {
		let resetTimerId = null;
		copyBtn.addEventListener("click", async () => {
			const codeEl = root.querySelector("#polyglot-code");
			const codeText = codeEl ? codeEl.textContent || "" : "";
			const ok = await copyTextWithFallback(codeText, codeEl);

			if (resetTimerId) {
				clearTimeout(resetTimerId);
			}

			copyBtn.setAttribute("data-copied", ok ? "true" : "false");
			if (copyLabelEl) {
				copyLabelEl.textContent = ok ? "Copied!" : "Press Ctrl+C to copy";
			}

			resetTimerId = setTimeout(() => {
				copyBtn.removeAttribute("data-copied");
				if (copyLabelEl) {
					copyLabelEl.textContent = "Copy Snippet";
				}
			}, 2000);
		});
	}

	selectLanguage("typescript", root);
	selectPolyglotVariant("standard", root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initPolyglotRunner(document));
	} else {
		initPolyglotRunner(document);
	}
}
