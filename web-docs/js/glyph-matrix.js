/**
 * Iosevka Sawala Mono — Character Inspector & Glyph Browser Matrix Controller
 * Orchestrates the 5-category glyph inspection matrix (86 glyphs) and live Unicode
 * anatomical detail card sourced from private-build-plans.toml (REQ-009, AC-016).
 */

export const GLYPH_CATEGORIES = Object.freeze([
	{ id: "all", label: "All Glyphs" },
	{ id: "latin", label: "Basic Latin" },
	{ id: "digits", label: "Digits & Math" },
	{ id: "punctuation", label: "Punctuation & Delimiters" },
	{ id: "operators", label: "Programming Symbols" },
	{ id: "accented", label: "Accented Latin" }
]);

export const GLYPH_CATALOG = Object.freeze([
	// 1. Digits & Math (16 glyphs — led by '0' per Wireframe §1.4.1 & AC-016)
	{
		char: "0",
		unicodeHex: "U+0030",
		name: "DIGIT ZERO",
		category: "digits",
		variantName: "reverse-slashed (upright) · tall-reverse-slashed (italic)",
		tomlSource: "private-build-plans.toml:37,54",
		rationale: "Crisp reverse-slashed interior stroke eliminates ambiguity with capital Latin O at 12px."
	},
	{
		char: "1",
		unicodeHex: "U+0031",
		name: "DIGIT ONE",
		category: "digits",
		variantName: "base-long-top-serif",
		tomlSource: "private-build-plans.toml:29",
		rationale: "Prominent top serif and flat horizontal base separate numeral 1 from lowercase l and capital I."
	},
	{
		char: "2",
		unicodeHex: "U+0032",
		name: "DIGIT TWO",
		category: "digits",
		variantName: "inherits = ss03 (straight-neck)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Open lower counter and crisp baseline bar maintain clarity in base-2 and numeric literals."
	},
	{
		char: "3",
		unicodeHex: "U+0033",
		name: "DIGIT THREE",
		category: "digits",
		variantName: "inherits = ss03 (two-arcs)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Balanced dual-arc apertures prevent blurring against numeral 8 and capital B."
	},
	{
		char: "4",
		unicodeHex: "U+0034",
		name: "DIGIT FOUR",
		category: "digits",
		variantName: "inherits = ss03 (closed-contour)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Wide horizontal crossbar creates an unmistakable triangular counter at compact sizes."
	},
	{
		char: "5",
		unicodeHex: "U+0035",
		name: "DIGIT FIVE",
		category: "digits",
		variantName: "inherits = ss03 (upright-arch)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Sharp upper flag and open lower bowl distinguish numeral 5 from uppercase S."
	},
	{
		char: "6",
		unicodeHex: "U+0036",
		name: "DIGIT SIX",
		category: "digits",
		variantName: "inherits = ss03 (closed-contour)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Closed-contour geometry provides a balanced, high-contrast loop that stays distinct from b and 8."
	},
	{
		char: "7",
		unicodeHex: "U+0037",
		name: "DIGIT SEVEN",
		category: "digits",
		variantName: "bend-serifless",
		tomlSource: "private-build-plans.toml:33",
		rationale: "Curved diagonal stem without top serif creates a clean, modern silhouette distinct from 1 and /."
	},
	{
		char: "8",
		unicodeHex: "U+0038",
		name: "DIGIT EIGHT",
		category: "digits",
		variantName: "inherits = ss03 (crossing-symmetric)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Proportional upper and lower loops maintain crisp interior counters in hexadecimal dumps."
	},
	{
		char: "9",
		unicodeHex: "U+0039",
		name: "DIGIT NINE",
		category: "digits",
		variantName: "inherits = ss03 (closed-contour)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Closed-contour loop mirrors digit 6 cleanly and avoids confusion with lowercase g or q."
	},
	{
		char: "+",
		unicodeHex: "U+002B",
		name: "PLUS SIGN",
		category: "digits",
		variantName: "default-calt (center-ops / plus-plus-plus)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Centered on the math axis to align seamlessly with =, -, and chained +++ operators."
	},
	{
		char: "-",
		unicodeHex: "U+002D",
		name: "HYPHEN-MINUS",
		category: "digits",
		variantName: "default-calt (arrow / center-ops)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Precision-leveled horizontal bar that fuses cleanly into -> and <- arrow glyphs."
	},
	{
		char: "=",
		unicodeHex: "U+003D",
		name: "EQUALS SIGN",
		category: "digits",
		variantName: "default-calt (eqeq / eqexeq)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Generous inter-bar separation keeps =, ==, and === immediately distinguishable."
	},
	{
		char: "±",
		unicodeHex: "U+00B1",
		name: "PLUS-MINUS SIGN",
		category: "digits",
		variantName: "inherits = ss03 (math-axis)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Balanced vertical stacking for tolerance bounds and numerical analysis comments."
	},
	{
		char: "×",
		unicodeHex: "U+00D7",
		name: "MULTIPLICATION SIGN",
		category: "digits",
		variantName: "inherits = ss03 (geometric-cross)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Orthogonal diagonal cross centered on the math axis, clearly distinct from lowercase x."
	},
	{
		char: "÷",
		unicodeHex: "U+00F7",
		name: "DIVISION SIGN",
		category: "digits",
		variantName: "inherits = ss03 (math-axis)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "High-clearance dots above and below the horizontal bar prevent merging at small sizes."
	},

	// 2. Basic Latin (30 glyphs — highlighting custom upright & italic variants)
	{
		char: "a",
		unicodeHex: "U+0061",
		name: "LATIN SMALL LETTER A",
		category: "latin",
		variantName: "double-storey-tailed (upright) · single-storey-earless-corner-tailed (italic)",
		tomlSource: "private-build-plans.toml:21,40",
		rationale: "Double-storey upright anchors dense identifiers while single-storey cursive italic marks comments."
	},
	{
		char: "b",
		unicodeHex: "U+0062",
		name: "LATIN SMALL LETTER B",
		category: "latin",
		variantName: "toothless-corner-serifless (upright) · flat-bottom-serifless (italic)",
		tomlSource: "private-build-plans.toml:22,41",
		rationale: "Toothless corner junction eliminates bottom-left spur clutter in camelCase identifiers."
	},
	{
		char: "c",
		unicodeHex: "U+0063",
		name: "LATIN SMALL LETTER C",
		category: "latin",
		variantName: "inherits = ss03 (serifless-open)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Wide right-side aperture prevents lowercase c from closing into o or e."
	},
	{
		char: "d",
		unicodeHex: "U+0064",
		name: "LATIN SMALL LETTER D",
		category: "latin",
		variantName: "toothless-corner-serifless (upright) · flat-bottom-serifless (italic)",
		tomlSource: "private-build-plans.toml:25,43",
		rationale: "Symmetric mirror of lowercase b with a clean toothless lower bowl and tall ascender."
	},
	{
		char: "e",
		unicodeHex: "U+0065",
		name: "LATIN SMALL LETTER E",
		category: "latin",
		variantName: "inherits = ss03 (flat-crossbar)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Generous 520 x-height keeps the upper eye counter of e wide open during rapid scanning."
	},
	{
		char: "f",
		unicodeHex: "U+0066",
		name: "LATIN SMALL LETTER F",
		category: "latin",
		variantName: "ss03 (upright) · flat-hook-tailed (italic)",
		tomlSource: "private-build-plans.toml:44",
		rationale: "Italic f extends into a graceful descender tail, distinguishing function keywords at a glance."
	},
	{
		char: "g",
		unicodeHex: "U+0067",
		name: "LATIN SMALL LETTER G",
		category: "latin",
		variantName: "ss03 (upright) · single-storey-earless-corner (italic)",
		tomlSource: "private-build-plans.toml:45",
		rationale: "Clean single-storey earless-corner construction prevents descender loop collisions."
	},
	{
		char: "h",
		unicodeHex: "U+0068",
		name: "LATIN SMALL LETTER H",
		category: "latin",
		variantName: "inherits = ss03 (straight-serifless)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Tall ascender contrast over the 520 x-height arch separates h from n."
	},
	{
		char: "i",
		unicodeHex: "U+0069",
		name: "LATIN SMALL LETTER I",
		category: "latin",
		variantName: "ss03 (upright) · serifed-semi-tailed (italic)",
		tomlSource: "private-build-plans.toml:46",
		rationale: "Top serif and bottom semi-tail keep loop index variable i distinct from l and 1."
	},
	{
		char: "j",
		unicodeHex: "U+006A",
		name: "LATIN SMALL LETTER J",
		category: "latin",
		variantName: "inherits = ss03 (serifed)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Crisp top serif and deep descender hook separate nested loop variable j from i."
	},
	{
		char: "k",
		unicodeHex: "U+006B",
		name: "LATIN SMALL LETTER K",
		category: "latin",
		variantName: "symmetric-connected-serifless (upright) · cursive-serifless (italic)",
		tomlSource: "private-build-plans.toml:26,47",
		rationale: "Symmetric diagonal arms meet cleanly at the stem; italic shifts to a looped cursive k."
	},
	{
		char: "l",
		unicodeHex: "U+006C",
		name: "LATIN SMALL LETTER L",
		category: "latin",
		variantName: "ss03 (upright) · serifed-semi-tailed (italic)",
		tomlSource: "private-build-plans.toml:48",
		rationale: "Asymmetric top flag and curved bottom tail eliminate homoglyph collisions with 1 and I."
	},
	{
		char: "m",
		unicodeHex: "U+006D",
		name: "LATIN SMALL LETTER M",
		category: "latin",
		variantName: "earless-corner-double-arch-serifless",
		tomlSource: "private-build-plans.toml:27,49",
		rationale: "Earless corner arches maximize interior counter width within the 500-unit monospace cell."
	},
	{
		char: "n",
		unicodeHex: "U+006E",
		name: "LATIN SMALL LETTER N",
		category: "latin",
		variantName: "earless-corner-straight-serifless",
		tomlSource: "private-build-plans.toml:28,50",
		rationale: "Earless top-left corner creates a crisp geometric shoulder with zero serif noise."
	},
	{
		char: "o",
		unicodeHex: "U+006F",
		name: "LATIN SMALL LETTER O",
		category: "latin",
		variantName: "inherits = ss03 (oval-symmetric)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Unadorned open counter contrasts sharply against the reverse-slashed numeral 0."
	},
	{
		char: "p",
		unicodeHex: "U+0070",
		name: "LATIN SMALL LETTER P",
		category: "latin",
		variantName: "earless-corner-serifless",
		tomlSource: "private-build-plans.toml:30",
		rationale: "Earless upper junction keeps pointer and parameter identifiers crisp at small sizes."
	},
	{
		char: "q",
		unicodeHex: "U+0071",
		name: "LATIN SMALL LETTER Q",
		category: "latin",
		variantName: "earless-corner-straight-serifless",
		tomlSource: "private-build-plans.toml:32",
		rationale: "Straight descender stem with earless upper corner mirrors p without visual clutter."
	},
	{
		char: "r",
		unicodeHex: "U+0072",
		name: "LATIN SMALL LETTER R",
		category: "latin",
		variantName: "inherits = ss03 (serifless)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Clean serifless vertical stem with an extended right shoulder balances rhythm in monospace words."
	},
	{
		char: "s",
		unicodeHex: "U+0073",
		name: "LATIN SMALL LETTER S",
		category: "latin",
		variantName: "inherits = ss03 (serifless-smooth)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Open upper and lower terminals prevent merging into 5 or 8."
	},
	{
		char: "t",
		unicodeHex: "U+0074",
		name: "LATIN SMALL LETTER T",
		category: "latin",
		variantName: "ss03 (upright) · flat-hook-short-neck (italic)",
		tomlSource: "private-build-plans.toml:52",
		rationale: "Short-neck flat hook in italic maintains a compact, rhythmic baseline flow."
	},
	{
		char: "u",
		unicodeHex: "U+0075",
		name: "LATIN SMALL LETTER U",
		category: "latin",
		variantName: "toothless-rounded-serifless",
		tomlSource: "private-build-plans.toml:34,53",
		rationale: "Toothless rounded lower arch avoids right-stem spur congestion."
	},
	{
		char: "v",
		unicodeHex: "U+0076",
		name: "LATIN SMALL LETTER V",
		category: "latin",
		variantName: "straight-serifless",
		tomlSource: "private-build-plans.toml:35",
		rationale: "Sharp geometric vertex clearly differentiates v from rounded u."
	},
	{
		char: "w",
		unicodeHex: "U+0077",
		name: "LATIN SMALL LETTER W",
		category: "latin",
		variantName: "inherits = ss03 (straight-double-v)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "High central apex preserves counter clarity inside the 500-unit advance width."
	},
	{
		char: "x",
		unicodeHex: "U+0078",
		name: "LATIN SMALL LETTER X",
		category: "latin",
		variantName: "inherits = ss03 (straight-serifless)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Clean diagonal intersection for hex prefixes (0x) and coordinate variables."
	},
	{
		char: "y",
		unicodeHex: "U+0079",
		name: "LATIN SMALL LETTER Y",
		category: "latin",
		variantName: "straight-turn-serifless",
		tomlSource: "private-build-plans.toml:36",
		rationale: "Straight-turn descender tail avoids collision with adjacent baseline punctuation."
	},
	{
		char: "z",
		unicodeHex: "U+007A",
		name: "LATIN SMALL LETTER Z",
		category: "latin",
		variantName: "inherits = ss03 (straight-serifless)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Crisp horizontal bars and steep diagonal separate z from numeral 2."
	},
	{
		char: "C",
		unicodeHex: "U+0043",
		name: "LATIN CAPITAL LETTER C",
		category: "latin",
		variantName: "capital-c = serifless",
		tomlSource: "private-build-plans.toml:24",
		rationale: "Uncluttered serifless terminals keep uppercase C open and distinct from G and O."
	},
	{
		char: "I",
		unicodeHex: "U+0049",
		name: "LATIN CAPITAL LETTER I",
		category: "latin",
		variantName: "inherits = ss03 (serifed-cap-i)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Full top and bottom slab bars provide unambiguous separation from lowercase l and pipe |."
	},
	{
		char: "O",
		unicodeHex: "U+004F",
		name: "LATIN CAPITAL LETTER O",
		category: "latin",
		variantName: "inherits = ss03 (clear-interior)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Pure unslashed interior counter contrasts immediately with reverse-slashed digit 0."
	},
	{
		char: "Q",
		unicodeHex: "U+0051",
		name: "LATIN CAPITAL LETTER Q",
		category: "latin",
		variantName: "inherits = ss03 (detached-tail)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Distinct lower-right tail prevents confusion with capital O and digit 0."
	},

	// 3. Punctuation & Delimiters (14 glyphs)
	{
		char: "{",
		unicodeHex: "U+007B",
		name: "LEFT CURLY BRACKET",
		category: "punctuation",
		variantName: "brace = curly-flat-boundary",
		tomlSource: "private-build-plans.toml:23,42",
		rationale: "Flat outer boundary with pronounced center cusp makes block scopes stand out from ( and [."
	},
	{
		char: "}",
		unicodeHex: "U+007D",
		name: "RIGHT CURLY BRACKET",
		category: "punctuation",
		variantName: "brace = curly-flat-boundary",
		tomlSource: "private-build-plans.toml:23,42",
		rationale: "Symmetric flat-boundary closing brace keeps deeply nested closures visually aligned."
	},
	{
		char: "(",
		unicodeHex: "U+0028",
		name: "LEFT PARENTHESIS",
		category: "punctuation",
		variantName: "paren = large-contour",
		tomlSource: "private-build-plans.toml:31,51",
		rationale: "Expanded arc curvature prevents parentheses from looking like vertical bars | or l."
	},
	{
		char: ")",
		unicodeHex: "U+0029",
		name: "RIGHT PARENTHESIS",
		category: "punctuation",
		variantName: "paren = large-contour",
		tomlSource: "private-build-plans.toml:31,51",
		rationale: "Large-contour closing arc pairs cleanly with function call argument lists."
	},
	{
		char: "[",
		unicodeHex: "U+005B",
		name: "LEFT SQUARE BRACKET",
		category: "punctuation",
		variantName: "inherits = ss03 (crisp-horizontal-arms)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Deep horizontal arms clearly differentiate array indexing [i] from parentheses (i)."
	},
	{
		char: "]",
		unicodeHex: "U+005D",
		name: "RIGHT SQUARE BRACKET",
		category: "punctuation",
		variantName: "inherits = ss03 (crisp-horizontal-arms)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Sharp 90-degree corners anchor array and slice expressions."
	},
	{
		char: "<",
		unicodeHex: "U+003C",
		name: "LESS-THAN SIGN",
		category: "punctuation",
		variantName: "default-calt (trig / llgg)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Tuned vertex angle serves both generic type parameters <T> and comparison ligatures <=."
	},
	{
		char: ">",
		unicodeHex: "U+003E",
		name: "GREATER-THAN SIGN",
		category: "punctuation",
		variantName: "default-calt (arrow / trig)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Harmonized arrowhead geometry aligns with =>, ->, and generic closing brackets."
	},
	{
		char: ";",
		unicodeHex: "U+003B",
		name: "SEMICOLON",
		category: "punctuation",
		variantName: "inherits = ss03 (oversized-comma-tail)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Enlarged lower comma tail makes statement terminators impossible to confuse with colons :."
	},
	{
		char: ":",
		unicodeHex: "U+003A",
		name: "COLON",
		category: "punctuation",
		variantName: "default-calt (center-ops)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Distinct circular dots elevate onto the operator axis when paired in :: or :=."
	},
	{
		char: ",",
		unicodeHex: "U+002C",
		name: "COMMA",
		category: "punctuation",
		variantName: "inherits = ss03 (pronounced-tail)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Sweeping descender tail separates parameter commas , from periods . at a glance."
	},
	{
		char: ".",
		unicodeHex: "U+002E",
		name: "FULL STOP",
		category: "punctuation",
		variantName: "default-calt (dot / ellipsis)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Generous dot weight ensures property access chains (a.b.c) remain effortless to trace."
	},
	{
		char: "'",
		unicodeHex: "U+0027",
		name: "APOSTROPHE",
		category: "punctuation",
		variantName: "inherits = ss03 (straight-vertical)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Unambiguous vertical quote mark for Rust lifetimes ('a) and single-quoted strings."
	},
	{
		char: "\"",
		unicodeHex: "U+0022",
		name: "QUOTATION MARK",
		category: "punctuation",
		variantName: "inherits = ss03 (parallel-vertical)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Wide inter-stroke spacing prevents double quotes from blurring into a single blot."
	},

	// 4. Programming Symbols (14 glyphs)
	{
		char: "!",
		unicodeHex: "U+0021",
		name: "EXCLAMATION MARK",
		category: "operators",
		variantName: "default-calt (eqexeq / slasheq)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "High-visibility negation stem and dot that combine into != and !== inequality ligatures."
	},
	{
		char: "?",
		unicodeHex: "U+003F",
		name: "QUESTION MARK",
		category: "operators",
		variantName: "inherits = ss03 (corner-flat-hooked)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Corner flat-hooked contour engineered for optional chaining ?. and nullish coalescing ?? kerning."
	},
	{
		char: "@",
		unicodeHex: "U+0040",
		name: "COMMERCIAL AT",
		category: "operators",
		variantName: "inherits = ss03 (fourfold)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Fourfold symmetric spiral keeps Python/TypeScript @decorators legible at 12px–14px."
	},
	{
		char: "#",
		unicodeHex: "U+0023",
		name: "NUMBER SIGN",
		category: "operators",
		variantName: "inherits = ss03 (slanted)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Slanted cross-strokes give crisp aperture clarity for Rust attributes #[derive], C macros, and hex colors."
	},
	{
		char: "$",
		unicodeHex: "U+0024",
		name: "DOLLAR SIGN",
		category: "operators",
		variantName: "inherits = ss03 (slanted-through)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Slanted through-stroke anchors shell variables ($PATH), regex end-anchors, and template literals."
	},
	{
		char: "%",
		unicodeHex: "U+0025",
		name: "PERCENT SIGN",
		category: "operators",
		variantName: "inherits = ss03 (rings-continuous-slash)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Clear circular counters prevent modulo % operators from resembling division slashes."
	},
	{
		char: "^",
		unicodeHex: "U+005E",
		name: "CIRCUMFLEX ACCENT",
		category: "operators",
		variantName: "inherits = ss03 (high-caret)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Crisp bitwise XOR and regex start-anchor chevron."
	},
	{
		char: "&",
		unicodeHex: "U+0026",
		name: "AMPERSAND",
		category: "operators",
		variantName: "inherits = ss03 (open-et)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Balanced upper and lower counters keep borrow references (&mut) and logical && crisp."
	},
	{
		char: "*",
		unicodeHex: "U+002A",
		name: "ASTERISK",
		category: "operators",
		variantName: "default-calt (center-ops)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "5-spoked geometric star centered for multiplication, pointer dereferencing, and /**/ comments."
	},
	{
		char: "/",
		unicodeHex: "U+002F",
		name: "SOLIDUS",
		category: "operators",
		variantName: "default-calt (slash-comments)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Generous forward slope separates division / and line comments // from uppercase I and 1."
	},
	{
		char: "\\",
		unicodeHex: "U+005C",
		name: "REVERSE SOLIDUS",
		category: "operators",
		variantName: "inherits = ss03 (backslash)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Symmetric reverse angle makes escape sequences (\\n, \\t) immediately recognizable."
	},
	{
		char: "|",
		unicodeHex: "U+007C",
		name: "VERTICAL LINE",
		category: "operators",
		variantName: "default-calt (pipeline / logical-or)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Full-height vertical rule that pairs cleanly in union types A | B and pipeline |> operators."
	},
	{
		char: "~",
		unicodeHex: "U+007E",
		name: "TILDE",
		category: "operators",
		variantName: "default-calt (center-ops)",
		tomlSource: "private-build-plans.toml:18",
		rationale: "Centered wave amplitude for bitwise NOT ~, Lua inequality ~=, and home directory paths."
	},
	{
		char: "`",
		unicodeHex: "U+0060",
		name: "GRAVE ACCENT",
		category: "operators",
		variantName: "inherits = ss03 (distinct-backtick)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Angled grave stroke separates Markdown code fences ``` and JS template literals from '."
	},

	// 5. Accented Latin (12 glyphs)
	{
		char: "é",
		unicodeHex: "U+00E9",
		name: "LATIN SMALL LETTER E WITH ACUTE",
		category: "accented",
		variantName: "inherits = ss03 (acute-diacritic)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "High-clearance acute accent above the 520 x-height preserves line-height rhythm."
	},
	{
		char: "è",
		unicodeHex: "U+00E8",
		name: "LATIN SMALL LETTER E WITH GRAVE",
		category: "accented",
		variantName: "inherits = ss03 (grave-diacritic)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Crisp grave mark positioned above the open e counter for multilingual strings."
	},
	{
		char: "ê",
		unicodeHex: "U+00EA",
		name: "LATIN SMALL LETTER E WITH CIRCUMFLEX",
		category: "accented",
		variantName: "inherits = ss03 (circumflex-diacritic)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Balanced circumflex chevron fits cleanly below the 735 cap-height line."
	},
	{
		char: "ë",
		unicodeHex: "U+00EB",
		name: "LATIN SMALL LETTER E WITH DIAERESIS",
		category: "accented",
		variantName: "inherits = ss03 (diaeresis-diacritic)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Widely spaced diaeresis dots prevent horizontal merging at 12px."
	},
	{
		char: "á",
		unicodeHex: "U+00E1",
		name: "LATIN SMALL LETTER A WITH ACUTE",
		category: "accented",
		variantName: "double-storey-tailed + acute",
		tomlSource: "private-build-plans.toml:21,40",
		rationale: "Combines Sawala Mono's signature tailed a with a crisp acute accent."
	},
	{
		char: "à",
		unicodeHex: "U+00E0",
		name: "LATIN SMALL LETTER A WITH GRAVE",
		category: "accented",
		variantName: "double-storey-tailed + grave",
		tomlSource: "private-build-plans.toml:21,40",
		rationale: "Unambiguous grave diacritic over double-storey upright and single-storey italic a."
	},
	{
		char: "ä",
		unicodeHex: "U+00E4",
		name: "LATIN SMALL LETTER A WITH DIAERESIS",
		category: "accented",
		variantName: "double-storey-tailed + diaeresis",
		tomlSource: "private-build-plans.toml:21,40",
		rationale: "High-contrast umlaut dots engineered for European localization files."
	},
	{
		char: "ñ",
		unicodeHex: "U+00F1",
		name: "LATIN SMALL LETTER N WITH TILDE",
		category: "accented",
		variantName: "earless-corner-straight-serifless + tilde",
		tomlSource: "private-build-plans.toml:28,50",
		rationale: "Earless-corner n paired with a well-proportioned upper tilde wave."
	},
	{
		char: "ç",
		unicodeHex: "U+00E7",
		name: "LATIN SMALL LETTER C WITH CEDILLA",
		category: "accented",
		variantName: "inherits = ss03 (cedilla-hook)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Clean lower cedilla hook stays within descender bounds without clipping."
	},
	{
		char: "ü",
		unicodeHex: "U+00FC",
		name: "LATIN SMALL LETTER U WITH DIAERESIS",
		category: "accented",
		variantName: "toothless-rounded-serifless + diaeresis",
		tomlSource: "private-build-plans.toml:34,53",
		rationale: "Toothless rounded u arch topped with high-clarity umlaut dots."
	},
	{
		char: "ø",
		unicodeHex: "U+00F8",
		name: "LATIN SMALL LETTER O WITH STROKE",
		category: "accented",
		variantName: "inherits = ss03 (forward-slashed-o)",
		tomlSource: "private-build-plans.toml:15",
		rationale: "Forward-slashed Nordic vowel contrasts against reverse-slashed numeral 0."
	},
	{
		char: "ß",
		unicodeHex: "U+00DF",
		name: "LATIN SMALL LETTER SHARP S",
		category: "accented",
		variantName: "inherits = ss03 (longs-s-lig-serifless)",
		tomlSource: "private-build-plans.toml:15 · params/variants.toml",
		rationale: "Long-s ligature serifless geometry distinguishes German Eszett ß from capital B and Greek beta β."
	}
]);

/**
 * Returns the filtered subset of glyphs for a given category id.
 * @param {string} categoryId
 * @returns {readonly object[]}
 */
export function getGlyphsByCategory(categoryId) {
	if (!categoryId || categoryId === "all") {
		return GLYPH_CATALOG;
	}
	const filtered = GLYPH_CATALOG.filter(item => item.category === categoryId);
	return filtered.length > 0 ? filtered : GLYPH_CATALOG;
}

/**
 * Finds a glyph detail entry by character literal or Unicode hex string.
 * @param {string} query
 * @returns {object}
 */
export function findGlyphDetail(query) {
	if (!query) {
		return GLYPH_CATALOG[0];
	}
	const normalized = String(query).trim();
	const found = GLYPH_CATALOG.find(
		item => item.char === normalized || item.unicodeHex.toUpperCase() === normalized.toUpperCase()
	);
	return found || GLYPH_CATALOG[0];
}

/**
 * Escapes HTML special characters for safe attribute/content rendering.
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/**
 * Builds the HTML markup for the glyph grid tiles.
 * @param {readonly object[]} glyphs
 * @param {string} [selectedChar="0"]
 * @returns {string}
 */
export function buildGlyphGridMarkup(glyphs, selectedChar = "0") {
	return glyphs
		.map(item => {
			const isSelected = item.char === selectedChar;
			const charEscaped = escapeHtml(item.char);
			const nameEscaped = escapeHtml(item.name);
			return `<button type="button" class="glyph-grid-tile glyph-matrix-tile${isSelected ? " is-active" : ""}" data-glyph-char="${charEscaped}" data-glyph-hex="${item.unicodeHex}" data-glyph-category="${item.category}" aria-pressed="${isSelected ? "true" : "false"}" aria-label="${nameEscaped} (${item.unicodeHex})"><span class="glyph-matrix-tile__char">${charEscaped}</span><span class="glyph-matrix-tile__code tabular-nums">${item.unicodeHex}</span></button>`;
		})
		.join("");
}

/**
 * Updates the Selected Glyph Inspection Card with the target glyph's metadata (AC-016).
 * @param {string} charOrHex
 * @param {Document|HTMLElement} [root=document]
 * @returns {object} Selected glyph detail object
 */
export function selectGlyph(charOrHex, root = document) {
	const detail = findGlyphDetail(charOrHex);
	const tiles = root.querySelectorAll("[data-glyph-char]");
	const previewEl = root.querySelector("#glyph-inspector-preview");
	const italicPreviewEl = root.querySelector("#glyph-inspector-preview-italic");
	const codepointEl = root.querySelector("#glyph-inspector-codepoint");
	const nameEl = root.querySelector("#glyph-inspector-name");
	const variantEl = root.querySelector("#glyph-inspector-variant");
	const tomlEl = root.querySelector("#glyph-inspector-toml");
	const categoryEl = root.querySelector("#glyph-inspector-category");
	const rationaleEl = root.querySelector("#glyph-inspector-rationale");

	tiles.forEach(tile => {
		const isMatch = tile.getAttribute("data-glyph-char") === detail.char;
		tile.classList.toggle("is-active", isMatch);
		tile.setAttribute("aria-pressed", isMatch ? "true" : "false");
	});

	if (previewEl) {
		previewEl.textContent = detail.char;
	}
	if (italicPreviewEl) {
		italicPreviewEl.textContent = detail.char;
	}
	if (codepointEl) {
		codepointEl.textContent = detail.unicodeHex;
	}
	if (nameEl) {
		nameEl.textContent = detail.name;
	}
	if (variantEl) {
		variantEl.textContent = detail.variantName;
	}
	if (tomlEl) {
		tomlEl.textContent = detail.tomlSource;
	}
	if (categoryEl) {
		const catMeta = GLYPH_CATEGORIES.find(c => c.id === detail.category);
		categoryEl.textContent = catMeta ? catMeta.label : detail.category;
	}
	if (rationaleEl) {
		rationaleEl.textContent = detail.rationale;
	}

	return detail;
}

/**
 * Filters the Character Inspector grid by category and binds tile click handlers.
 * @param {string} categoryId
 * @param {Document|HTMLElement} [root=document]
 * @returns {readonly object[]}
 */
export function filterGlyphCategory(categoryId, root = document) {
	const validCategory = GLYPH_CATEGORIES.some(c => c.id === categoryId) ? categoryId : "all";
	const glyphs = getGlyphsByCategory(validCategory);
	const gridEl = root.querySelector("#glyph-matrix-grid");
	const countBadgeEl = root.querySelector("#glyph-category-count");
	const categoryTabs = root.querySelectorAll("[data-glyph-category-tab]");
	const currentCodepointEl = root.querySelector("#glyph-inspector-codepoint");
	const currentHex = currentCodepointEl ? currentCodepointEl.textContent : "U+0030";

	categoryTabs.forEach(tab => {
		const isSelected = tab.getAttribute("data-glyph-category-tab") === validCategory;
		tab.setAttribute("aria-selected", isSelected ? "true" : "false");
		tab.setAttribute("tabindex", isSelected ? "0" : "-1");
		tab.classList.toggle("is-selected", isSelected);
		if (isSelected && gridEl && tab.id) {
			gridEl.setAttribute("aria-labelledby", tab.id);
		}
	});

	const retainCurrent = glyphs.some(item => item.unicodeHex === currentHex);
	const nextSelected = retainCurrent ? findGlyphDetail(currentHex) : glyphs[0];

	if (gridEl) {
		gridEl.setAttribute("data-active-category", validCategory);
		gridEl.innerHTML = buildGlyphGridMarkup(glyphs, nextSelected.char);
		bindGlyphTileEvents(gridEl, root);
	}

	if (countBadgeEl) {
		countBadgeEl.textContent = `Showing ${glyphs.length} of ${GLYPH_CATALOG.length} Glyphs`;
	}

	selectGlyph(nextSelected.char, root);
	return glyphs;
}

/**
 * Attaches click, hover, and keyboard navigation listeners to rendered glyph tiles.
 * @param {HTMLElement} gridEl
 * @param {Document|HTMLElement} root
 */
function bindGlyphTileEvents(gridEl, root) {
	const tiles = Array.from(gridEl.querySelectorAll("[data-glyph-char]"));
	tiles.forEach((tile, index) => {
		const charVal = tile.getAttribute("data-glyph-char");
		if (!charVal) {
			return;
		}
		tile.addEventListener("click", () => selectGlyph(charVal, root));
		tile.addEventListener("mouseenter", () => selectGlyph(charVal, root));
		tile.addEventListener("focus", () => selectGlyph(charVal, root));

		tile.addEventListener("keydown", event => {
			let nextIdx = -1;
			if (event.key === "ArrowRight") {
				nextIdx = (index + 1) % tiles.length;
			} else if (event.key === "ArrowLeft") {
				nextIdx = (index - 1 + tiles.length) % tiles.length;
			} else if (event.key === "Home") {
				nextIdx = 0;
			} else if (event.key === "End") {
				nextIdx = tiles.length - 1;
			}

			if (nextIdx !== -1) {
				event.preventDefault();
				const targetTile = tiles[nextIdx];
				targetTile.focus();
				const targetChar = targetTile.getAttribute("data-glyph-char");
				if (targetChar) {
					selectGlyph(targetChar, root);
				}
			}
		});
	});
}

/**
 * Initializes the Character Inspector & Glyph Browser section (REQ-009, AC-016).
 * @param {Document|HTMLElement} [root=document]
 */
export function initGlyphMatrix(root = document) {
	const categoryTabs = Array.from(root.querySelectorAll("[data-glyph-category-tab]"));
	const gridEl = root.querySelector("#glyph-matrix-grid");

	if (categoryTabs.length === 0 && !gridEl) {
		return;
	}

	categoryTabs.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			const categoryId = tab.getAttribute("data-glyph-category-tab") || "all";
			filterGlyphCategory(categoryId, root);
		});

		tab.addEventListener("keydown", event => {
			let targetIndex = -1;
			if (event.key === "ArrowRight") {
				targetIndex = (index + 1) % categoryTabs.length;
			} else if (event.key === "ArrowLeft") {
				targetIndex = (index - 1 + categoryTabs.length) % categoryTabs.length;
			} else if (event.key === "Home") {
				targetIndex = 0;
			} else if (event.key === "End") {
				targetIndex = categoryTabs.length - 1;
			}

			if (targetIndex !== -1) {
				event.preventDefault();
				const nextTab = categoryTabs[targetIndex];
				nextTab.focus();
				const nextCat = nextTab.getAttribute("data-glyph-category-tab") || "all";
				filterGlyphCategory(nextCat, root);
			}
		});
	});

	filterGlyphCategory("all", root);
	selectGlyph("0", root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initGlyphMatrix(document));
	} else {
		initGlyphMatrix(document);
	}
}
