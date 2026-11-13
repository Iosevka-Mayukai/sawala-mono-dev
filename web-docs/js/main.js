/**
 * Iosevka Sawala Mono — Primary Application Orchestrator
 * Manages sticky top-nav elevation, responsive mobile drawer (<768px),
 * active section scroll-spy, hero quick-copy, and webfont readiness state.
 */

import { copyTextWithFallback } from "./polyglot-runner.js";

/**
 * Opens the mobile navigation menu and updates ARIA state.
 * @param {HTMLElement} toggleBtn
 * @param {HTMLElement} navMenu
 */
export function openMobileNav(toggleBtn, navMenu) {
	if (!toggleBtn || !navMenu) {
		return;
	}
	toggleBtn.setAttribute("aria-expanded", "true");
	navMenu.setAttribute("data-open", "true");
}

/**
 * Closes the mobile navigation menu and restores ARIA state.
 * @param {HTMLElement} toggleBtn
 * @param {HTMLElement} navMenu
 */
export function closeMobileNav(toggleBtn, navMenu) {
	if (!toggleBtn || !navMenu) {
		return;
	}
	toggleBtn.setAttribute("aria-expanded", "false");
	navMenu.setAttribute("data-open", "false");
}

/**
 * Initializes the sticky header and responsive mobile navigation drawer.
 * @param {Document|HTMLElement} [root=document]
 */
export function initNavigation(root = document) {
	const headerEl = root.querySelector("#top-nav");
	const toggleBtn = root.querySelector("#mobile-nav-toggle");
	const navMenu = root.querySelector("#top-nav-menu");
	const navLinks = Array.from(root.querySelectorAll(".top-nav__link"));

	if (headerEl && typeof window !== "undefined") {
		const updateScrollState = () => {
			headerEl.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
		};
		window.addEventListener("scroll", updateScrollState, { passive: true });
		updateScrollState();
	}

	if (toggleBtn && navMenu) {
		toggleBtn.addEventListener("click", () => {
			const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
			if (isExpanded) {
				closeMobileNav(toggleBtn, navMenu);
			} else {
				openMobileNav(toggleBtn, navMenu);
			}
		});

		navLinks.forEach(link => {
			link.addEventListener("click", () => {
				closeMobileNav(toggleBtn, navMenu);
			});
		});

		if (typeof document !== "undefined") {
			document.addEventListener("keydown", event => {
				if (event.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
					closeMobileNav(toggleBtn, navMenu);
					toggleBtn.focus();
				}
			});

			document.addEventListener("click", event => {
				if (
					toggleBtn.getAttribute("aria-expanded") === "true" &&
					headerEl &&
					!headerEl.contains(event.target)
				) {
					closeMobileNav(toggleBtn, navMenu);
				}
			});
		}

		if (typeof window !== "undefined") {
			window.addEventListener("resize", () => {
				if (window.innerWidth > 768 && toggleBtn.getAttribute("aria-expanded") === "true") {
					closeMobileNav(toggleBtn, navMenu);
				}
			});
		}
	}

	initScrollSpy(navLinks, root);
}

/**
 * Observes primary sections and updates the active navigation link.
 * @param {HTMLElement[]} navLinks
 * @param {Document|HTMLElement} [root=document]
 */
export function initScrollSpy(navLinks, root = document) {
	if (!navLinks || navLinks.length === 0 || typeof IntersectionObserver === "undefined") {
		return;
	}

	const setActiveLink = sectionId => {
		navLinks.forEach(link => {
			const isMatch = link.getAttribute("data-nav-link") === sectionId;
			link.classList.toggle("is-active", isMatch);
			if (isMatch) {
				link.setAttribute("aria-current", "location");
			} else {
				link.removeAttribute("aria-current");
			}
		});
	};

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting && entry.target.id) {
					setActiveLink(entry.target.id);
				}
			});
		},
		{
			rootMargin: "-20% 0px -65% 0px",
			threshold: 0
		}
	);

	navLinks.forEach(link => {
		const targetId = link.getAttribute("data-nav-link");
		if (targetId) {
			const sectionEl = root.querySelector(`#${targetId}`);
			if (sectionEl) {
				observer.observe(sectionEl);
			}
		}
	});
}

/**
 * Initializes the Hero section quick configuration copy button.
 * @param {Document|HTMLElement} [root=document]
 */
export function initHeroQuickCopy(root = document) {
	const quickCopyBtn = root.querySelector("#hero-quick-copy");
	const statusBadge = root.querySelector("#hero-quick-copy-status");
	if (!quickCopyBtn) {
		return;
	}

	let timerId = null;
	quickCopyBtn.addEventListener("click", async () => {
		const copyValue =
			quickCopyBtn.getAttribute("data-copy-value") ||
			"\"editor.fontFamily\": \"'Sawala Mono', monospace\"";
		const ok = await copyTextWithFallback(copyValue);

		if (timerId) {
			clearTimeout(timerId);
		}

		quickCopyBtn.setAttribute("data-copied", ok ? "true" : "false");
		if (statusBadge) {
			statusBadge.textContent = ok ? "Copied!" : "Press Ctrl+C";
		}

		timerId = setTimeout(() => {
			quickCopyBtn.removeAttribute("data-copied");
			if (statusBadge) {
				statusBadge.textContent = "Copy";
			}
		}, 2000);
	});
}

/**
 * Observes webfont loading readiness and updates the Specimen Runner status badge.
 * @param {Document|HTMLElement} [root=document]
 */
export function initWebfontStatusObserver(root = document) {
	const badgeEl = root.querySelector("#webfont-status-badge");
	const textEl = root.querySelector("#webfont-status-text");
	if (!badgeEl || typeof document === "undefined" || !document.fonts) {
		return;
	}

	document.fonts.ready
		.then(() => {
			const isLoaded = document.fonts.check("14px 'Sawala Mono'");
			badgeEl.setAttribute("data-font-state", isLoaded ? "loaded" : "fallback");
			if (textEl) {
				textEl.textContent = isLoaded ? "Sawala Mono WOFF2 Active" : "System Monospace Fallback";
			}
		})
		.catch(() => {
			badgeEl.setAttribute("data-font-state", "fallback");
		});
}

/**
 * Clamps comparison split percentage strictly within [0, 100].
 * @param {number|string} rawPercent
 * @returns {number}
 */
export function clampComparisonSplit(rawPercent) {
	const parsed = Number(rawPercent);
	if (Number.isNaN(parsed)) {
		return 50;
	}
	return Math.max(0, Math.min(100, Math.round(parsed)));
}

/**
 * Updates the proportional x-height comparison split state across stage, slider, and presets.
 * @param {number|string} percent
 * @param {Document|HTMLElement} [root=document]
 * @returns {number} Clamped percentage applied
 */
export function setComparisonSplit(percent, root = document) {
	const clamped = clampComparisonSplit(percent);
	const stageEl = root.querySelector("#comparison-stage");
	const sliderEl = root.querySelector("#xheight-comparison-slider");
	const valueEl = root.querySelector("#comparison-split-value");
	const presetBtns = root.querySelectorAll("[data-comparison-preset]");

	if (stageEl) {
		stageEl.style.setProperty("--comparison-split", `${clamped}%`);
	}

	if (sliderEl) {
		sliderEl.value = String(clamped);
		sliderEl.setAttribute("aria-valuenow", String(clamped));
	}

	if (valueEl) {
		valueEl.textContent = `${clamped}%`;
	}

	presetBtns.forEach(btn => {
		const target = Number(btn.getAttribute("data-comparison-preset"));
		const isSelected = target === clamped;
		btn.classList.toggle("is-selected", isSelected);
		btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
	});

	return clamped;
}

/**
 * Initializes the interactive Proportional x-Height Comparison Slider (REQ-012, AC-019).
 * Supports range input, pointer dragging on stage, and preset buttons.
 * @param {Document|HTMLElement} [root=document]
 */
export function initComparisonSlider(root = document) {
	const stageEl = root.querySelector("#comparison-stage");
	const sliderEl = root.querySelector("#xheight-comparison-slider");
	const presetBtns = root.querySelectorAll("[data-comparison-preset]");

	if (!stageEl && !sliderEl) {
		return;
	}

	if (sliderEl) {
		sliderEl.addEventListener("input", () => {
			setComparisonSplit(sliderEl.value, root);
		});
	}

	presetBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			const preset = btn.getAttribute("data-comparison-preset");
			if (preset !== null) {
				setComparisonSplit(preset, root);
			}
		});
	});

	if (stageEl) {
		let isPointerDragging = false;

		const updateFromClientX = clientX => {
			const rect = stageEl.getBoundingClientRect();
			if (rect.width <= 0) {
				return;
			}
			const ratio = ((clientX - rect.left) / rect.width) * 100;
			setComparisonSplit(ratio, root);
		};

		stageEl.addEventListener("pointerdown", event => {
			isPointerDragging = true;
			if (typeof stageEl.setPointerCapture === "function") {
				try {
					stageEl.setPointerCapture(event.pointerId);
				} catch {
					// Ignore capture errors in synthetic test environments
				}
			}
			updateFromClientX(event.clientX);
		});

		stageEl.addEventListener("pointermove", event => {
			if (!isPointerDragging) {
				return;
			}
			updateFromClientX(event.clientX);
		});

		const endDrag = () => {
			isPointerDragging = false;
		};

		stageEl.addEventListener("pointerup", endDrag);
		stageEl.addEventListener("pointercancel", endDrag);
	}

	setComparisonSplit(50, root);
}

/**
 * Moves focus between sibling tabs with ArrowLeft/ArrowRight/Home/End (CON-007).
 * @param {KeyboardEvent} event
 * @param {HTMLElement[]} tabs
 * @param {number} index
 * @returns {HTMLElement|null} The newly focused tab, or null when the key is not handled.
 */
function focusSiblingTab(event, tabs, index) {
	const keyTargets = {
		ArrowRight: (index + 1) % tabs.length,
		ArrowLeft: (index - 1 + tabs.length) % tabs.length,
		Home: 0,
		End: tabs.length - 1
	};
	if (!(event.key in keyTargets)) {
		return null;
	}
	event.preventDefault();
	const nextTab = tabs[keyTargets[event.key]];
	nextTab.focus();
	return nextTab;
}

/**
 * Filters catalog rows inside a scope by category and updates the tab state + visible count.
 * Rows declare `data-filter-category`; "all" reveals every row.
 * @param {string} scopeId Value shared by `data-filter-group` (tablist) and `data-filter-scope` (rows container).
 * @param {string} category
 * @param {Document|HTMLElement} [root=document]
 * @returns {number} Number of visible rows after filtering.
 */
export function filterCatalog(scopeId, category, root = document) {
	const tabs = root.querySelectorAll(`[data-filter-group="${scopeId}"] [data-filter-tab]`);
	const scopeEl = root.querySelector(`[data-filter-scope="${scopeId}"]`);
	const countEl = root.querySelector(`[data-filter-count="${scopeId}"]`);
	const resolvedCategory = category || "all";
	let visibleCount = 0;

	tabs.forEach(tab => {
		const isSelected = tab.getAttribute("data-filter-tab") === resolvedCategory;
		tab.setAttribute("aria-selected", isSelected ? "true" : "false");
		tab.setAttribute("tabindex", isSelected ? "0" : "-1");
		tab.classList.toggle("is-selected", isSelected);
	});

	if (scopeEl) {
		scopeEl.querySelectorAll("[data-filter-category]").forEach(row => {
			const isVisible =
				resolvedCategory === "all" || row.getAttribute("data-filter-category") === resolvedCategory;
			row.hidden = !isVisible;
			if (isVisible) {
				visibleCount += 1;
			}
		});
	}

	if (countEl) {
		countEl.textContent = `Showing ${visibleCount} ligatures`;
	}

	return visibleCount;
}

/**
 * Initializes every catalog filter tablist on the page (ligatures catalog subpage, REQ-008).
 * @param {Document|HTMLElement} [root=document]
 */
export function initCatalogFilters(root = document) {
	root.querySelectorAll("[data-filter-group]").forEach(groupEl => {
		const scopeId = groupEl.getAttribute("data-filter-group");
		const tabs = Array.from(groupEl.querySelectorAll("[data-filter-tab]"));
		tabs.forEach((tab, index) => {
			tab.addEventListener("click", () => {
				filterCatalog(scopeId, tab.getAttribute("data-filter-tab"), root);
			});
			tab.addEventListener("keydown", event => {
				const nextTab = focusSiblingTab(event, tabs, index);
				if (nextTab) {
					filterCatalog(scopeId, nextTab.getAttribute("data-filter-tab"), root);
				}
			});
		});
	});
}

/**
 * Activates one tab inside an ARIA tablist and reveals its `aria-controls` panel, hiding siblings.
 * @param {HTMLElement} tablistEl
 * @param {string} tabId
 * @param {Document|HTMLElement} [root=document]
 * @returns {boolean} True when the tab exists and was activated.
 */
export function activateDocTab(tablistEl, tabId, root = document) {
	const tabs = Array.from(tablistEl.querySelectorAll("[role=\"tab\"]"));
	const target = tabs.find(tab => tab.id === tabId);
	if (!target) {
		return false;
	}
	tabs.forEach(tab => {
		const isSelected = tab === target;
		tab.setAttribute("aria-selected", isSelected ? "true" : "false");
		tab.setAttribute("tabindex", isSelected ? "0" : "-1");
		tab.classList.toggle("is-selected", isSelected);
		const panelEl = root.querySelector(`#${tab.getAttribute("aria-controls")}`);
		if (panelEl) {
			panelEl.hidden = !isSelected;
			if (isSelected && tab.id) {
				panelEl.setAttribute("aria-labelledby", tab.id);
			}
		}
	});
	return true;
}

/**
 * Initializes panel-switching tablists marked with `data-doc-tabs` (installation OS selector, REQ-008).
 * @param {Document|HTMLElement} [root=document]
 */
export function initDocTabPanels(root = document) {
	root.querySelectorAll("[data-doc-tabs]").forEach(tablistEl => {
		const tabs = Array.from(tablistEl.querySelectorAll("[role=\"tab\"]"));
		tabs.forEach((tab, index) => {
			tab.addEventListener("click", () => activateDocTab(tablistEl, tab.id, root));
			tab.addEventListener("keydown", event => {
				const nextTab = focusSiblingTab(event, tabs, index);
				if (nextTab) {
					activateDocTab(tablistEl, nextTab.id, root);
				}
			});
		});
	});
}

/**
 * Bootstraps all main orchestrator controllers (showcase root and documentation subpages).
 * Every initializer is guarded, so missing sections are skipped silently.
 * @param {Document|HTMLElement} [root=document]
 */
export function initMain(root = document) {
	initNavigation(root);
	initHeroQuickCopy(root);
	initWebfontStatusObserver(root);
	initComparisonSlider(root);
	initCatalogFilters(root);
	initDocTabPanels(root);
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initMain(document));
	} else {
		initMain(document);
	}
}
