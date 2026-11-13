/**
 * Iosevka Sawala Mono — Interactive Ligature Transformation Matrix Controller
 * Manages the Sawala Mono (calt: 1) vs Sawala Mono NL (calt: 0) variant switcher
 * and the 16-operator transformation matrix sourced from params/ligation-set.toml (default-calt)
 * (REQ-004, AC-006, AC-007).
 */

export const LIGATURE_SAMPLES = Object.freeze([
	{
		sequence: "=>",
		tokenId: "fat-arrow",
		category: "Arrow / Function",
		description: "Fat Right Arrow",
		keys: ["=", ">"],
		sampleCode: "const approve = (pr) => pr.quorum >= 2;"
	},
	{
		sequence: "!==",
		tokenId: "strict-ne",
		category: "Equality & Logical",
		description: "Strict Inequality",
		keys: ["!", "=", "="],
		sampleCode: "if (status !== ReviewState.Pending) return true;"
	},
	{
		sequence: "===",
		tokenId: "strict-eq",
		category: "Equality & Logical",
		description: "Strict Identity",
		keys: ["=", "=", "="],
		sampleCode: "const isClean = pr.blockingDiscussions === 0;"
	},
	{
		sequence: "!=",
		tokenId: "not-equal",
		category: "Equality & Logical",
		description: "Inequality Operator",
		keys: ["!", "="],
		sampleCode: "if err != nil { return VerdictRejected }"
	},
	{
		sequence: "==",
		tokenId: "equal",
		category: "Equality & Logical",
		description: "Equality Comparison",
		keys: ["=", "="],
		sampleCode: "assert!(metrics.advance_width == 500);"
	},
	{
		sequence: "->",
		tokenId: "arrow",
		category: "Arrow / Function",
		description: "Thin Right Arrow",
		keys: ["-", ">"],
		sampleCode: "pub fn evaluate(s: &Session) -> ReviewVerdict"
	},
	{
		sequence: "<-",
		tokenId: "left-arr",
		category: "Arrow / Function",
		description: "Channel / Left Arrow",
		keys: ["<", "-"],
		sampleCode: "verdict := <-deliberationChannel"
	},
	{
		sequence: "::",
		tokenId: "scope-res",
		category: "Scopes & Access",
		description: "Namespace / Path Scope",
		keys: [":", ":"],
		sampleCode: "use crate::sawala::ReviewVerdict::Approved;"
	},
	{
		sequence: "<=>",
		tokenId: "spaceship",
		category: "Equality & Logical",
		description: "Three-Way Spaceship Comparison",
		keys: ["<", "=", ">"],
		sampleCode: "auto cmp = (lhs.priority <=> rhs.priority);"
	},
	{
		sequence: "<<=",
		tokenId: "shl-asgn",
		category: "Assignment",
		description: "Left-Shift Compound Assignment",
		keys: ["<", "<", "="],
		sampleCode: "flags <<= 4; // Aligned shift-assignment in default-calt"
	},
	{
		sequence: "<=",
		tokenId: "less-eq",
		category: "Equality & Logical",
		description: "Less Than or Equal",
		keys: ["<", "="],
		sampleCode: "const withinBudget = latencyMs <= 50;"
	},
	{
		sequence: ">=",
		tokenId: "great-eq",
		category: "Equality & Logical",
		description: "Greater Than or Equal",
		keys: [">", "="],
		sampleCode: "const hasQuorum = approvals.length >= 2;"
	},
	{
		sequence: "<!--",
		tokenId: "xml-cmnt",
		category: "Markup",
		description: "HTML / XML Comment Delimiter",
		keys: ["<", "!", "-", "-"],
		sampleCode: "<!-- Sawala Mono Specimen Section -->"
	},
	{
		sequence: "+++",
		tokenId: "triple-plus",
		category: "Arithmetic / Concat",
		description: "Triple-Plus Chained Operator",
		keys: ["+", "+", "+"],
		sampleCode: "const merged = leftHeader +++ rightFooter;"
	},
	{
		sequence: "|>",
		tokenId: "pipeline",
		category: "Arrow / Function",
		description: "Forward Pipeline Operator",
		keys: ["|", ">"],
		sampleCode: "changes |> validateGlyphs() |> publishRelease()"
	},
	{
		sequence: "...",
		tokenId: "vararg",
		category: "Scopes & Access",
		description: "Spread / Rest / Variadic Ellipsis",
		keys: [".", ".", "."],
		sampleCode: "const merged = { ...defaults, ...overrides };"
	}
]);

/**
 * Formats discrete ASCII keys into a readable sequence breakdown string.
 * @param {readonly string[]} keys
 * @returns {string}
 */
export function formatSequenceBreakdown(keys) {
	if (!Array.isArray(keys) || keys.length === 0) {
		return "";
	}
	return keys.map(k => `[ ${k} ]`).join(" + ");
}

/**
 * Sets the active ligature rendering mode across the playground matrix and inspector.
 * Satisfies symmetric round-trip invertibility: standard <-> nl (Plan §5, AC-006).
 * @param {"standard"|"nl"} mode
 * @param {Document|HTMLElement} [root=document]
 * @returns {"standard"|"nl"}
 */
export function setLigatureMode(mode, root = document) {
	const resolvedMode = mode === "nl" ? "nl" : "standard";
	const isStandard = resolvedMode === "standard";
	const matrixEl = root.querySelector("#ligature-matrix");
	const previewBoxEl = root.querySelector("#ligature-inspector-preview");
	const modeBadgeEl = root.querySelector("#ligature-mode-badge");
	const switcherButtons = root.querySelectorAll("[data-ligature-tab]");

	if (matrixEl) {
		matrixEl.setAttribute("data-ligature-mode", resolvedMode);
		matrixEl.style.fontVariantLigatures = isStandard ? "normal" : "none";
		matrixEl.style.fontFeatureSettings = isStandard ? "\"calt\" 1, \"liga\" 1" : "\"calt\" 0, \"liga\" 0";
	}

	if (previewBoxEl) {
		previewBoxEl.setAttribute("data-ligature-mode", resolvedMode);
		previewBoxEl.style.fontVariantLigatures = isStandard ? "normal" : "none";
		previewBoxEl.style.fontFeatureSettings = isStandard ? "\"calt\" 1, \"liga\" 1" : "\"calt\" 0, \"liga\" 0";
	}

	if (modeBadgeEl) {
		modeBadgeEl.textContent = isStandard
			? "OpenType calt: 1 (Ligatures Active)"
			: "OpenType calt: 0 (Sawala Mono NL Discrete)";
	}

	switcherButtons.forEach(btn => {
		const isSelected = btn.getAttribute("data-ligature-tab") === resolvedMode;
		btn.setAttribute("aria-selected", isSelected ? "true" : "false");
		btn.setAttribute("tabindex", isSelected ? "0" : "-1");
		btn.classList.toggle("is-selected", isSelected);
	});

	return resolvedMode;
}

/**
 * Updates the ligature inspection bar for the hovered or focused operator tile (AC-007).
 * @param {string} sequence
 * @param {Document|HTMLElement} [root=document]
 * @returns {boolean}
 */
export function selectLigatureSample(sequence, root = document) {
	const sample =
		LIGATURE_SAMPLES.find(item => item.sequence === sequence) || LIGATURE_SAMPLES[0];
	const tiles = root.querySelectorAll("[data-ligature-seq]");
	const previewEl = root.querySelector("#ligature-inspector-preview");
	const titleEl = root.querySelector("#ligature-inspector-title");
	const breakdownEl = root.querySelector("#ligature-inspector-breakdown");
	const sampleEl = root.querySelector("#ligature-inspector-sample");

	tiles.forEach(tile => {
		const isMatch = tile.getAttribute("data-ligature-seq") === sample.sequence;
		tile.classList.toggle("is-active", isMatch);
		tile.setAttribute("aria-pressed", isMatch ? "true" : "false");
	});

	if (previewEl) {
		previewEl.textContent = sample.sequence;
	}
	if (titleEl) {
		titleEl.textContent = `${sample.description} (${sample.category})`;
	}
	if (breakdownEl) {
		breakdownEl.textContent = `ASCII Sequence: ${formatSequenceBreakdown(sample.keys)}  →  Token: ${sample.tokenId}`;
	}
	if (sampleEl) {
		sampleEl.textContent = sample.sampleCode;
	}

	return true;
}

/**
 * Initializes the Interactive Ligature Playground section.
 * @param {Document|HTMLElement} [root=document]
 */
export function initLigaturePlayground(root = document) {
	const switcherTabs = Array.from(root.querySelectorAll("[data-ligature-tab]"));
	const tiles = Array.from(root.querySelectorAll("[data-ligature-seq]"));

	if (switcherTabs.length === 0 && tiles.length === 0) {
		return;
	}

	switcherTabs.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			const mode = tab.getAttribute("data-ligature-tab");
			setLigatureMode(mode === "nl" ? "nl" : "standard", root);
		});

		tab.addEventListener("keydown", event => {
			let nextIdx = -1;
			if (event.key === "ArrowRight") {
				nextIdx = (index + 1) % switcherTabs.length;
			} else if (event.key === "ArrowLeft") {
				nextIdx = (index - 1 + switcherTabs.length) % switcherTabs.length;
			} else if (event.key === "Home") {
				nextIdx = 0;
			} else if (event.key === "End") {
				nextIdx = switcherTabs.length - 1;
			}

			if (nextIdx !== -1) {
				event.preventDefault();
				const nextTab = switcherTabs[nextIdx];
				nextTab.focus();
				const nextMode = nextTab.getAttribute("data-ligature-tab");
				setLigatureMode(nextMode === "nl" ? "nl" : "standard", root);
			}
		});
	});

	tiles.forEach(tile => {
		const seq = tile.getAttribute("data-ligature-seq");
		if (!seq) {
			return;
		}
		tile.addEventListener("mouseenter", () => selectLigatureSample(seq, root));
		tile.addEventListener("focus", () => selectLigatureSample(seq, root));
		tile.addEventListener("click", () => selectLigatureSample(seq, root));
	});

	setLigatureMode("standard", root);
	selectLigatureSample("=>", root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initLigaturePlayground(document));
	} else {
		initLigaturePlayground(document);
	}
}
