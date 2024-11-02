function closeAlreadyExpandedOptions(optionsToExpand) {
  const filters = optionsToExpand.parentElement.parentElement;

  let currentFilterOptions;

  for (const filtersChild of filters.children) {
    currentFilterOptions = filtersChild.querySelector(".options");

    if (!currentFilterOptions) {
      continue;
    }

    if (currentFilterOptions !== optionsToExpand) {
      if (Array.from(currentFilterOptions.classList).includes("expand")) {
        toggleOptionsExpandClass(currentFilterOptions);
        animateExpanderBtnIcon(
          currentFilterOptions.previousElementSibling.querySelector("svg")
        );
        toggleTransitionClass(currentFilterOptions, "expanding");
        toggleTransitionClass(currentFilterOptions, "closing");
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

function expandFilterOptions(options, expanderBtnIcon) {
  closeAlreadyExpandedOptions(options);
  animateExpanderBtnIcon(expanderBtnIcon);
  toggleOptionsExpandClass(options);
  toggleTransitionClass(options, "expanding");
  toggleTransitionClass(options, "closing");
}

function setupFilterOptionsExpansion(filterExpanderBtns) {
  for (const expanderBtn of filterExpanderBtns) {
    expanderBtn.addEventListener("click", function () {
      expandFilterOptions(
        expanderBtn.nextElementSibling,
        expanderBtn.querySelector("svg")
      );
    });
  }
}

setupFilterOptionsExpansion(
  document.querySelectorAll(".filter-dropdown > button")
);

function toggleFiltersSlideInClass(filters) {
  filters.classList.toggle("slide-in");
}

function toggleOverlayFadeInClass(overlay) {
  overlay.classList.toggle("fade-in");
}

function hideFilters(filters, overlay) {
  toggleFiltersSlideInClass(filters);
  toggleOverlayFadeInClass(overlay);
  toggleTransitionClass(overlay, "fade-in");
  toggleTransitionClass(overlay, "fade-out");
}

function showFilters(filters, overlay) {
  toggleFiltersSlideInClass(filters);
  toggleOverlayFadeInClass(overlay);
  toggleTransitionClass(overlay, "fade-out");
  toggleTransitionClass(overlay, "fade-in");
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
