function closeAlreadyExpandedOptionsContainer(optionsContainerToExpand) {
  const filters = optionsContainerToExpand
    ? optionsContainerToExpand.parentElement.parentElement
    : document.querySelector(".filters");

  const filtersOptionsContainers = filters.querySelectorAll(".options");

  for (const currentFilterOptionsContainer of filtersOptionsContainers) {
    if (currentFilterOptionsContainer !== optionsContainerToExpand) {
      if (currentFilterOptionsContainer.dataset.state === "active") {
        toggleFilterOptionsExpansion(
          currentFilterOptionsContainer,
          currentFilterOptionsContainer.previousElementSibling.querySelector(
            "svg"
          ),
          false
        );
      }
    }
  }
}

function toggleTransitionClass(element, type) {
  element.classList.toggle(`${type}-transition`);
}

function toggleOptionsExpandClass(options) {
  options.classList.toggle("expand");
}

function animateExpanderBtnIcon(icon) {
  icon.classList.toggle("transform");
}

function toggleFilterOptionsExpansion(
  optionsContainer,
  expanderBtnIcon,
  alreadyExpandedOptions
) {
  if (alreadyExpandedOptions) {
    closeAlreadyExpandedOptionsContainer(optionsContainer);
  }

  toggleElementDataState(optionsContainer, optionsContainer.dataset.state);
  animateExpanderBtnIcon(expanderBtnIcon);
  toggleOptionsExpandClass(optionsContainer);
  toggleTransitionClass(optionsContainer, "expanding");
  toggleTransitionClass(optionsContainer, "closing");
  toggleItemsTabFocus(
    optionsContainer.querySelectorAll("input"),
    optionsContainer.dataset.state
  );
}

function setupFilterOptionsExpansion(filterExpanderBtns) {
  for (const expanderBtn of filterExpanderBtns) {
    expanderBtn.addEventListener("click", function () {
      toggleFilterOptionsExpansion(
        expanderBtn.nextElementSibling,
        expanderBtn.querySelector("svg"),
        true
      );
    });
  }
}

setupFilterOptionsExpansion(
  document.querySelectorAll(".filter-dropdown > button")
);

function configureFiltersDataState(viewportWidth, filtersContainer) {
  if (viewportWidth < 1025) {
    filtersContainer.setAttribute("data-state", "hidden");
  } else {
    filtersContainer.removeAttribute("data-state");
  }
}

window.addEventListener("resize", function () {
  configureFiltersDataState(
    document.documentElement.clientWidth,
    document.querySelector(".filters")
  );
});

window.addEventListener("load", function () {
  configureFiltersDataState(
    document.documentElement.clientWidth,
    document.querySelector(".filters")
  );
});

function configureFilterBtnsTabFocus(
  viewportWidth,
  filtersContainer,
  filterBtns
) {
  if (viewportWidth < 1025) {
    toggleItemsTabFocus(filterBtns, filtersContainer.dataset.state);
  } else {
    if (!filtersContainer.dataset.state) {
      for (const filterBtn of filterBtns) {
        filterBtn.setAttribute("tabindex", "0");
      }
    }
  }
}

window.addEventListener("resize", function () {
  configureFilterBtnsTabFocus(
    document.documentElement.clientWidth,
    document.querySelector(".filters"),
    document.querySelectorAll(".filters button")
  );
});

window.addEventListener("load", function () {
  configureFilterBtnsTabFocus(
    document.documentElement.clientWidth,
    document.querySelector(".filters"),
    document.querySelectorAll(".filters button")
  );
});

function enableClosingOffCanvasFiltersWithEscKey(filters) {
  window.addEventListener("keyup", function (event) {
    if (filters.dataset.state === "active" && event.key === "Escape") {
      hideFilters(filters, document.querySelector(".overlay"));
      closeAlreadyExpandedOptionsContainer(null);
    }
  });
}

function handleTargetForFilters(event, target, elements) {
  const lastFilterBtn = elements[0],
    firstFilterBtn = elements[1],
    lastHeaderElement = elements[2];

  const lastSelectableOption =
    lastFilterBtn.nextElementSibling.children[
      lastFilterBtn.nextElementSibling.children.length - 1
    ].querySelector("input");

  switch (target) {
    case lastFilterBtn:
      const optionsExpanded =
        target.nextElementSibling.dataset.state === "active";

      if (!optionsExpanded) {
        focusElement(event, firstFilterBtn);
      }
      break;

    case lastSelectableOption:
      focusElement(event, firstFilterBtn);
      break;

    case lastHeaderElement:
      focusElement(event, firstFilterBtn);
  }
}

function limitTabNavigationInFilters(filters) {
  let headerElements = Array.from(
    document.querySelectorAll(".navbar-buttons > button")
  );
  headerElements.unshift(document.querySelector("nav > .logo"));

  limitTabNavigationScopeWithinModal(
    filters,
    headerElements,
    filters.querySelectorAll("button"),
    filters.dataset.state
  );
}

function toggleFiltersSlideInClass(filters) {
  filters.classList.toggle("slide-in");
}

function toggleOverlayFadeInClass(overlay) {
  overlay.classList.toggle("fade-in");
}

function hideFilters(filtersContainer, overlay) {
  toggleElementDataState(filtersContainer, filtersContainer.dataset.state);
  toggleFiltersSlideInClass(filtersContainer);
  toggleOverlayFadeInClass(overlay);
  toggleTransitionClass(overlay, "fade-in");
  toggleTransitionClass(overlay, "fade-out");
  toggleItemsTabFocus(
    filtersContainer.querySelectorAll("button"),
    filtersContainer.dataset.state
  );
  closeAlreadyExpandedOptionsContainer(null);
}

function showFilters(filtersContainer, overlay) {
  toggleElementDataState(filtersContainer, filtersContainer.dataset.state);
  toggleFiltersSlideInClass(filtersContainer);
  toggleOverlayFadeInClass(overlay);
  toggleTransitionClass(overlay, "fade-out");
  toggleTransitionClass(overlay, "fade-in");
  toggleItemsTabFocus(
    filtersContainer.querySelectorAll("button"),
    filtersContainer.dataset.state
  );
  limitTabNavigationInFilters(filtersContainer);
}

function setupFiltersToggling(filtersToggle, filtersCloseBtn, overlay) {
  filtersToggle.addEventListener("click", function () {
    showFilters(document.querySelector(".filters"), overlay);
  });

  filtersCloseBtn.addEventListener("click", function () {
    hideFilters(document.querySelector(".filters"), overlay);
  });

  overlay.addEventListener("click", function () {
    hideFilters(document.querySelector(".filters"), overlay);
  });

  enableClosingOffCanvasFiltersWithEscKey(document.querySelector(".filters"));
}

setupFiltersToggling(
  document.querySelector(".filters-toggle"),
  document.querySelector(".filters > .close-button"),
  document.querySelector(".overlay")
);

function setupCustomCursorHoverEffect(customCursor) {
  const sortingSelect = document.querySelector(".sorting select"),
    filtersToggle = document.querySelector(".filters-toggle"),
    filtersCloseBtn = document.querySelector(".filters > .close-button"),
    filterExpanderBtns = document.querySelectorAll(".filter-dropdown > button"),
    filterOptions = document.querySelectorAll(".options label"),
    products = document.querySelectorAll(".product"),
    productAddToWishlistIcons = document.querySelectorAll(
      ".product .add-to-wishlist"
    );

  for (const each of [sortingSelect, filtersToggle, filtersCloseBtn]) {
    if (each === filtersCloseBtn) {
      each.addEventListener("mouseenter", () => {
        shrinkCursor(customCursor);
      });
    } else {
      each.addEventListener("mouseenter", () => {
        growCursor(customCursor);
      });
    }

    each.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const expanderBtn of filterExpanderBtns) {
    expanderBtn.addEventListener("mouseenter", () => {
      shrinkCursor(customCursor);
    });

    expanderBtn.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const option of filterOptions) {
    option.addEventListener("mouseenter", () => {
      shrinkCursor(customCursor);
    });

    option.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const product of products) {
    product.addEventListener("mouseenter", () => {
      growCursor(customCursor);
      console.log("product");
    });

    product.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const addToWishlistIcon of productAddToWishlistIcons) {
    addToWishlistIcon.addEventListener("mouseenter", () => {
      normalizeCursor(customCursor);
      /* because normalizeCursor isn't called 
        while "mouseenter" takes place for addToWishlistIcon
        since "mouseleave" hasn't taken place on product 
        (addToWishlistIcon is child of product) */

      console.log("wishlist-icon");

      shrinkCursor(customCursor);
    });

    addToWishlistIcon.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }
}

setupCustomCursorHoverEffect(document.querySelector(".custom-cursor"));
