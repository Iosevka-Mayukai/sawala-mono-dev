/**
 * Iosevka Sawala Mono — Live Type Specimen Playground Controller
 * Manages the interactive custom code textarea and reactive controls for Font Size (12–48px),
 * Font Weight (100–900 with Tier A / Tier B handling), Line Height (1.2–2.0),
 * Slope (Upright 0° vs Italic 9.4°), and Variant (Standard vs NL) (REQ-005, AC-008..010).
 */

export const TIER_A_NATIVE_WEIGHTS = Object.freeze(new Set([400, 600, 700]));

export const WEIGHT_LABELS = Object.freeze({
	100: "Thin (100)",
	200: "ExtraLight (200)",
	300: "Light (300)",
	400: "Regular (400)",
	500: "Medium (500)",
	600: "SemiBold (600)",
	700: "Bold (700)",
	800: "ExtraBold (800)",
	900: "Heavy (900)"
});

export const WATERMARK_PLACEHOLDER =
	"The quick brown fox jumps over the lazy dog. 0123456789 => !== ->";

export const DEFAULT_SPECIMEN_TEXT = [
	"// Type anything here to test rendering, ligatures, and weights:",
	"function calculateHammingDistance(a: string, b: string): number {",
	"  if (a.length !== b.length) throw new Error(\"Strings must be of equal length!\");",
	"  let distance = 0;",
	"  for (let i = 0; i < a.length; i++) {",
	"    if (a[i] !== b[i]) distance++; // => count differences across 0O and 1lI",
	"  }",
	"  return distance;",
	"}"
].join("\n");

export const DEFAULT_SPECIMEN_STATE = Object.freeze({
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 1.5,
	slope: "upright",
	variant: "standard"
});

/**
 * Clamps font size strictly to the [12, 48] pixel boundary (Spec §1.6 & §7, AC-009).
 * @param {number|string} value
 * @returns {number}
 */
export function clampFontSize(value) {
	const parsed = Number(value);
	if (Number.isNaN(parsed)) {
		return DEFAULT_SPECIMEN_STATE.fontSize;
	}
	return Math.max(12, Math.min(48, Math.round(parsed)));
}

/**
 * Clamps line height strictly to the [1.2, 2.0] ratio boundary (Spec §7).
 * @param {number|string} value
 * @returns {number}
 */
export function clampLineHeight(value) {
	const parsed = Number(value);
	if (Number.isNaN(parsed)) {
		return DEFAULT_SPECIMEN_STATE.lineHeight;
	}
	const clamped = Math.max(1.2, Math.min(2.0, parsed));
	return Math.round(clamped * 100) / 100;
}

/**
 * Normalizes a font weight to the nearest 100-step in [100, 900].
 * @param {number|string} value
 * @returns {number}
 */
export function normalizeFontWeight(value) {
	const parsed = Number(value);
	if (Number.isNaN(parsed)) {
		return DEFAULT_SPECIMEN_STATE.fontWeight;
	}
	const stepped = Math.round(parsed / 100) * 100;
	return Math.max(100, Math.min(900, stepped));
}

/**
 * Applies the specimen state to the DOM editor wrapper, textarea, and control indicators.
 * @param {Partial<typeof DEFAULT_SPECIMEN_STATE>} partialState
 * @param {Document|HTMLElement} [root=document]
 * @returns {typeof DEFAULT_SPECIMEN_STATE}
 */
export function applySpecimenState(partialState, root = document) {
	const nextState = {
		fontSize: clampFontSize(partialState.fontSize ?? DEFAULT_SPECIMEN_STATE.fontSize),
		fontWeight: normalizeFontWeight(partialState.fontWeight ?? DEFAULT_SPECIMEN_STATE.fontWeight),
		lineHeight: clampLineHeight(partialState.lineHeight ?? DEFAULT_SPECIMEN_STATE.lineHeight),
		slope: partialState.slope === "italic" ? "italic" : "upright",
		variant: partialState.variant === "nl" ? "nl" : "standard"
	};

	const editorWrapEl = root.querySelector("#specimen-editor-wrap");
	const textareaEl = root.querySelector("#specimen-textarea");
	const sizeSliderEl = root.querySelector("#specimen-size-slider");
	const sizeValueEl = root.querySelector("#specimen-size-value");
	const weightSelectEl = root.querySelector("#specimen-weight-select");
	const weightValueEl = root.querySelector("#specimen-weight-value");
	const lineHeightSliderEl = root.querySelector("#specimen-lineheight-slider");
	const lineHeightValueEl = root.querySelector("#specimen-lineheight-value");
	const slopeButtons = root.querySelectorAll("[data-specimen-slope]");
	const variantButtons = root.querySelectorAll("[data-specimen-variant]");
	const tierBadgeEl = root.querySelector("#specimen-tier-badge");
	const summaryEl = root.querySelector("#specimen-status-summary");

	const cssFontStyle = nextState.slope === "italic" ? "italic" : "normal";
	const isStandardVariant = nextState.variant === "standard";

	if (editorWrapEl) {
		editorWrapEl.style.setProperty("--specimen-font-size", `${nextState.fontSize}px`);
		editorWrapEl.style.setProperty("--specimen-font-weight", String(nextState.fontWeight));
		editorWrapEl.style.setProperty("--specimen-line-height", String(nextState.lineHeight));
		editorWrapEl.style.setProperty("--specimen-font-style", cssFontStyle);
	}

	if (textareaEl) {
		textareaEl.style.fontSize = `${nextState.fontSize}px`;
		textareaEl.style.fontWeight = String(nextState.fontWeight);
		textareaEl.style.lineHeight = String(nextState.lineHeight);
		textareaEl.style.fontStyle = cssFontStyle;
		textareaEl.setAttribute("data-ligature-mode", nextState.variant);
		textareaEl.style.fontVariantLigatures = isStandardVariant ? "normal" : "none";
		textareaEl.style.fontFeatureSettings = isStandardVariant
			? "\"calt\" 1, \"liga\" 1"
			: "\"calt\" 0, \"liga\" 0";
		if (!textareaEl.getAttribute("placeholder")) {
			textareaEl.setAttribute("placeholder", WATERMARK_PLACEHOLDER);
		}
	}

	if (sizeSliderEl) {
		sizeSliderEl.value = String(nextState.fontSize);
		sizeSliderEl.setAttribute("aria-valuenow", String(nextState.fontSize));
	}
	if (sizeValueEl) {
		sizeValueEl.textContent = `${nextState.fontSize}px`;
	}

	if (weightSelectEl) {
		weightSelectEl.value = String(nextState.fontWeight);
	}
	if (weightValueEl) {
		weightValueEl.textContent = WEIGHT_LABELS[nextState.fontWeight] || String(nextState.fontWeight);
	}

	if (lineHeightSliderEl) {
		lineHeightSliderEl.value = String(nextState.lineHeight);
		lineHeightSliderEl.setAttribute("aria-valuenow", String(nextState.lineHeight));
	}
	if (lineHeightValueEl) {
		lineHeightValueEl.textContent = nextState.lineHeight.toFixed(2);
	}

	slopeButtons.forEach(btn => {
		const isSelected = btn.getAttribute("data-specimen-slope") === nextState.slope;
		btn.classList.toggle("is-selected", isSelected);
		btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
	});

	variantButtons.forEach(btn => {
		const isSelected = btn.getAttribute("data-specimen-variant") === nextState.variant;
		btn.classList.toggle("is-selected", isSelected);
		btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
	});

	if (tierBadgeEl) {
		const isTierA = TIER_A_NATIVE_WEIGHTS.has(nextState.fontWeight);
		tierBadgeEl.textContent = isTierA
			? `Tier A Core WOFF2 (${nextState.fontWeight})`
			: `Tier B Weight (${nextState.fontWeight} · Synthesized from Core)`;
	}

	if (summaryEl) {
		const familyName = isStandardVariant ? "Sawala Mono" : "Sawala Mono NL";
		const slopeLabel = nextState.slope === "italic" ? "Italic 9.4°" : "Upright 0°";
		summaryEl.textContent = `${familyName} · ${nextState.fontSize}px / ${nextState.lineHeight.toFixed(2)} · Weight ${nextState.fontWeight} · ${slopeLabel}`;
	}

	return nextState;
}

/**
 * Initializes the Live Specimen Playground controls and editable textarea.
 * @param {Document|HTMLElement} [root=document]
 */
export function initSpecimenTester(root = document) {
	const textareaEl = root.querySelector("#specimen-textarea");
	const sizeSliderEl = root.querySelector("#specimen-size-slider");
	const weightSelectEl = root.querySelector("#specimen-weight-select");
	const lineHeightSliderEl = root.querySelector("#specimen-lineheight-slider");
	const slopeButtons = root.querySelectorAll("[data-specimen-slope]");
	const variantButtons = root.querySelectorAll("[data-specimen-variant]");
	const resetBtn = root.querySelector("#specimen-reset-btn");

	if (!textareaEl && !sizeSliderEl) {
		return;
	}

	let currentState = { ...DEFAULT_SPECIMEN_STATE };

	if (textareaEl) {
		textareaEl.setAttribute("placeholder", WATERMARK_PLACEHOLDER);
		if (!textareaEl.value) {
			textareaEl.value = DEFAULT_SPECIMEN_TEXT;
		}
	}

	if (sizeSliderEl) {
		sizeSliderEl.addEventListener("input", () => {
			currentState = applySpecimenState(
				{ ...currentState, fontSize: sizeSliderEl.value },
				root
			);
		});
	}

	if (weightSelectEl) {
		weightSelectEl.addEventListener("change", () => {
			currentState = applySpecimenState(
				{ ...currentState, fontWeight: weightSelectEl.value },
				root
			);
		});
	}

	if (lineHeightSliderEl) {
		lineHeightSliderEl.addEventListener("input", () => {
			currentState = applySpecimenState(
				{ ...currentState, lineHeight: lineHeightSliderEl.value },
				root
			);
		});
	}

	slopeButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const slope = btn.getAttribute("data-specimen-slope");
			currentState = applySpecimenState(
				{ ...currentState, slope: slope === "italic" ? "italic" : "upright" },
				root
			);
		});
	});

	variantButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const variant = btn.getAttribute("data-specimen-variant");
			currentState = applySpecimenState(
				{ ...currentState, variant: variant === "nl" ? "nl" : "standard" },
				root
			);
		});
	});

	if (resetBtn) {
		resetBtn.addEventListener("click", () => {
			currentState = applySpecimenState({ ...DEFAULT_SPECIMEN_STATE }, root);
			if (textareaEl) {
				textareaEl.value = DEFAULT_SPECIMEN_TEXT;
			}
		});
	}

	currentState = applySpecimenState(currentState, root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initSpecimenTester(document));
	} else {
		initSpecimenTester(document);
	}
}
