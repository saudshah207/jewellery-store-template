function closeAlreadyExpandedOptions(optionsToExpand) {
  const filters = optionsToExpand.parentElement.parentElement;

  let currentFilterOptions;

  for (let index = 0; index < filters.children.length; index++) {
    currentFilterOptions = filters.children[index].querySelector(".options");

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

function setupFiltersToggling(
  filtersToggle,
  filters,
  filtersCloseBtn,
  overlay
) {
  filtersToggle.addEventListener("click", function () {
    showFilters(filters, overlay);
  });

  filtersCloseBtn.addEventListener("click", function () {
    hideFilters(filters, overlay);
  });

  overlay.addEventListener("click", function () {
    hideFilters(filters, overlay);
  });
}

setupFiltersToggling(
  document.querySelector(".filters-toggle"),
  document.querySelector(".filters"),
  document.querySelector(".filters > .close-button"),
  document.querySelector(".overlay")
);
