function toggleItemsTabFocus(itemsContainer, items, className) {
  if (Array.from(itemsContainer.classList).includes(className)) {
    for (const item of items) {
      item.setAttribute("tabindex", "0");
    }
  } else {
    for (const item of items) {
      item.setAttribute("tabindex", "-1");
    }
  }
}

function closeAlreadyExpandedOptionsContainer(optionsContainerToExpand) {
  const filters = optionsContainerToExpand
    ? optionsContainerToExpand.parentElement.parentElement
    : document.querySelector(".filters");

  let currentFilterOptionsContainer;

  for (const filtersChild of filters.children) {
    currentFilterOptionsContainer = filtersChild.querySelector(".options");

    if (!currentFilterOptionsContainer) {
      continue;
    }

    if (currentFilterOptionsContainer !== optionsContainerToExpand) {
      if (
        Array.from(currentFilterOptionsContainer.classList).includes("expand")
      ) {
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

  animateExpanderBtnIcon(expanderBtnIcon);
  toggleOptionsExpandClass(optionsContainer);
  toggleTransitionClass(optionsContainer, "expanding");
  toggleTransitionClass(optionsContainer, "closing");
  toggleItemsTabFocus(
    optionsContainer,
    optionsContainer.querySelectorAll("input"),
    "expand"
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

function configureFilterBtnsTabFocus(
  viewportWidth,
  filtersContainer,
  filterBtns
) {
  if (viewportWidth < 1025) {
    toggleItemsTabFocus(filtersContainer, filterBtns, "slide-in");
  } else {
    if (!Array.from(filtersContainer.classList).includes("slide-in")) {
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
    if (
      Array.from(filters.classList).includes("slide-in") &&
      event.key === "Escape"
    ) {
      hideFilters(filters, document.querySelector(".overlay"));
      closeAlreadyExpandedOptionsContainer(null);
    }
  });
}

function toggleFiltersSlideInClass(filters) {
  filters.classList.toggle("slide-in");
}

function toggleOverlayFadeInClass(overlay) {
  overlay.classList.toggle("fade-in");
}

function hideFilters(filtersContainer, overlay) {
  toggleFiltersSlideInClass(filtersContainer);
  toggleOverlayFadeInClass(overlay);
  toggleTransitionClass(overlay, "fade-in");
  toggleTransitionClass(overlay, "fade-out");
  toggleItemsTabFocus(
    filtersContainer,
    filtersContainer.querySelectorAll("button"),
    "slide-in"
  );
  closeAlreadyExpandedOptionsContainer(null);
}

function showFilters(filtersContainer, overlay) {
  toggleFiltersSlideInClass(filtersContainer);
  toggleOverlayFadeInClass(overlay);
  toggleTransitionClass(overlay, "fade-out");
  toggleTransitionClass(overlay, "fade-in");
  toggleItemsTabFocus(
    filtersContainer,
    filtersContainer.querySelectorAll("button"),
    "slide-in"
  );
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

function growCursor(cursor) {
  cursor.classList.add("cursor-grows");
}

function normalizeCursor(cursor) {
  if (Array.from(cursor.classList).includes("cursor-grows")) {
    cursor.classList.remove("cursor-grows");
  } else {
    cursor.classList.remove("cursor-shrinks");
  }
}

function shrinkCursor(cursor) {
  cursor.classList.add("cursor-shrinks");
}

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
      each.addEventListener("mouseover", () => {
        shrinkCursor(customCursor);
      });
    } else {
      each.addEventListener("mouseover", () => {
        growCursor(customCursor);
      });
    }

    each.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const expanderBtn of filterExpanderBtns) {
    expanderBtn.addEventListener("mouseover", () => {
      shrinkCursor(customCursor);
    });

    expanderBtn.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const option of filterOptions) {
    option.addEventListener("mouseover", () => {
      shrinkCursor(customCursor);
    });

    option.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const product of products) {
    product.addEventListener("mouseover", () => {
      growCursor(customCursor);
    });

    product.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const addToWishlistIcon of productAddToWishlistIcons) {
    addToWishlistIcon.addEventListener("mouseover", (e) => {
      e.stopPropagation(); /* Avoid bubbling up of event to product 
                              which calls growCursor */

      normalizeCursor(
        customCursor
      ); /* because product normalizeCursor isn't called 
            while "mouseover" takes place for addToWishlistIcon
            since "mouseleave" hasn't taken place on product 
            (addToWishlistIcon is child of product, "mouseover"
            on product is still taking place) */

      shrinkCursor(customCursor);
    });

    addToWishlistIcon.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }
}

setupCustomCursorHoverEffect(document.querySelector(".custom-cursor"));
