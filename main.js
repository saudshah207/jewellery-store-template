const customCursorMovement = (e) => {
  const customCursor = document.querySelector(".custom-cursor");
  const halfOfCursorWidth = 33.5 / 2;

  /* Getting coordinates for movement of the custom cursor */
  let moveX = e.clientX;
  let moveY = e.clientY;

  /* cursor moves by inputing coordinates with fixed positioning */
  customCursor.style.left = `${moveX - halfOfCursorWidth}px`;
  customCursor.style.top = `${
    moveY + document.body.scrollTop - halfOfCursorWidth
  }px`;
};

window.addEventListener("mousemove", customCursorMovement);

function setNavHeightCSSVariable(navHeight, styleSheet) {
  for (const cssRule of styleSheet.cssRules) {
    let ruleText = cssRule.cssText;

    if (cssRule.selectorText === ":root") {
      cssRule.style.setProperty("--nav-height", `${navHeight}px`);

      let navHeightVarValue = ruleText
        .slice(
          ruleText.indexOf(" ", ruleText.indexOf("--nav-height")),
          ruleText.indexOf(";", ruleText.indexOf("--nav-height"))
        )
        .trim();

      console.log(navHeightVarValue);

      if (navHeightVarValue === "") {
        console.log("setNavHeightCSSVariable() called again!");

        setNavHeightCSSVariable(
          document.querySelector("nav").getBoundingClientRect().height,
          styleSheet
        );
      }

      break;
    }
  }
}

function findSharedStyleSheet(styleSheets) {
  for (const styleSheet of styleSheets) {
    if (styleSheet.href.endsWith("shared.css")) {
      setNavHeightCSSVariable(
        document.querySelector("nav").getBoundingClientRect().height,
        styleSheet
      );
      break;
    }
  }
}

window.addEventListener("resize", function () {
  findSharedStyleSheet(document.styleSheets);
});

window.addEventListener("load", function () {
  findSharedStyleSheet(document.styleSheets);
});

function focusElement(event, element) {
  event.preventDefault();
  element.focus();
}

function handleTargetForOffCanvasMenu(event, target, elements) {
  const lastMenuLink = elements[0],
    firstMenuLink = elements[1],
    lastHeaderElement = elements[2];

  switch (target) {
    case lastMenuLink:
      focusElement(event, lastHeaderElement);
      break;

    case lastHeaderElement:
      focusElement(event, firstMenuLink);
  }
}

function controlTabNavigationOrder(
  event,
  modalClassList,
  headerElements,
  modalItems,
  className
) {
  if (Array.from(modalClassList).includes(className)) {
    const target = event.target;

    const firstHeaderElement = headerElements[0],
      lastHeaderElement = headerElements[headerElements.length - 1],
      firstModalItem = modalItems[0],
      lastModalItem = modalItems[modalItems.length - 1];

    if (event.key === "Tab" && event.shiftKey === false) {
      const modal = Array.from(modalClassList).includes("offcanvas-menu-list");

      modal
        ? handleTargetForOffCanvasMenu(event, target, [
            lastModalItem,
            firstModalItem,
            lastHeaderElement,
          ])
        : handleTargetForFilters(event, target, [
            lastModalItem,
            firstModalItem,
            lastHeaderElement,
          ]);
    } else if (event.key === "Tab" && event.shiftKey === true) {
      switch (target) {
        case firstHeaderElement:
          focusElement(event, lastModalItem);
          break;

        case firstModalItem:
          focusElement(event, lastHeaderElement);
      }
    }
  }
}

function limitTabNavigationScopeWithinModal(
  modal,
  headerElements,
  modalItems,
  className
) {
  window.addEventListener("keydown", function (event) {
    controlTabNavigationOrder(
      event,
      modal.classList,
      headerElements,
      modalItems,
      className
    );
  });
}

function toggleOffCanvasMenu(menuToggle) {
  const menuToggleBars = menuToggle.querySelectorAll(".bar"),
    navBottomBorder = document.querySelector("hr"),
    navLogo = document.querySelector(".logo"),
    userAccountBtn = document.querySelector(".user-account-container"),
    shoppingCartBtn = document.querySelector(".shopping-cart-container"),
    offCanvasMenu = document.querySelector(".offcanvas-menu-list");

  tranformToCloseButton(menuToggleBars);

  fadeOutHeaderElements(
    navBottomBorder,
    navLogo,
    userAccountBtn,
    shoppingCartBtn
  );

  toggleOffCanvasMenuItemsFadeIn(offCanvasMenu.querySelectorAll("li"));

  toggleOffCanvasMenuSlideIn(offCanvasMenu);

  toggleItemsTabFocus(
    offCanvasMenu,
    offCanvasMenu.querySelectorAll("a"),
    "slide-in"
  );

  setTimeout(
    fadeInHeaderElements,
    1000,
    navBottomBorder,
    navLogo,
    userAccountBtn,
    shoppingCartBtn
  );

  limitTabNavigationScopeWithinModal(
    offCanvasMenu,
    [navLogo, userAccountBtn, shoppingCartBtn, menuToggle],
    offCanvasMenu.querySelectorAll("a"),
    "slide-in"
  );
}

function enableClosingOffCanvasMenuWithEscKey(offCanvasMenu) {
  window.addEventListener("keyup", function (event) {
    if (
      Array.from(offCanvasMenu.classList).includes("slide-in") &&
      event.key === "Escape"
    ) {
      toggleOffCanvasMenu(document.querySelector(".hamburger-menu-toggle"));
    }
  });
}

function setupOffCanvasMenuOpeningAndClosing(hamburgerMenuToggle) {
  hamburgerMenuToggle.addEventListener("click", () => {
    toggleOffCanvasMenu(hamburgerMenuToggle);
  });

  enableClosingOffCanvasMenuWithEscKey(
    document.querySelector(".offcanvas-menu-list")
  );
}

setupOffCanvasMenuOpeningAndClosing(
  document.querySelector(".hamburger-menu-toggle")
);

function tranformToCloseButton(menuToggleBars) {
  Array.from(menuToggleBars).forEach((menuBar, index) => {
    if (index === 0) {
      menuBar.classList.toggle("for-first-bar");
    } else if (index === 1) {
      menuBar.classList.toggle("for-middle-bar");
    } else {
      menuBar.classList.toggle("for-last-bar");
    }
  });
}

function fadeOutHeaderElements(navBottomBorder, ...otherHeaderElements) {
  navBottomBorder.classList.add("slide-out");

  for (const element of otherHeaderElements) {
    element.classList.add("fade-out");
  }
}

function fadeInHeaderElements(navBottomBorder, ...otherHeaderElements) {
  navBottomBorder.classList.remove("slide-out");

  for (const element of otherHeaderElements) {
    element.classList.remove("fade-out");
  }
}

function toggleOffCanvasMenuItemsFadeIn(menuItems) {
  Array.from(menuItems).forEach((Item) => {
    Item.classList.toggle("fade-in");
  });
}

function toggleOffCanvasMenuSlideIn(menu) {
  menu.classList.toggle("slide-in");
}

function toggleItemsTabFocus(itemsContainer, items, className) {
  const containerContainsClassName = Array.from(
      itemsContainer.classList
    ).includes(className),
    value = containerContainsClassName ? "0" : "-1";

  for (const item of items) {
    item.setAttribute("tabindex", value);
  }
}

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

function setupCustomCursorHoverEffect(customCursor) {
  const navBarButtons = document.querySelectorAll(".navbar-buttons > button"),
    links = document.querySelectorAll(
      "a:not(.jewellery-products-section .product)"
    ),
    newsletterSignUpButton = document.querySelector("form > button");

  for (const button of navBarButtons) {
    button.addEventListener("mouseover", () => {
      growCursor(customCursor);
    });

    button.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  for (const link of Array.from(links)) {
    link.addEventListener("mouseover", () => {
      growCursor(customCursor);
    });

    link.addEventListener("mouseleave", () => {
      normalizeCursor(customCursor);
    });
  }

  newsletterSignUpButton.addEventListener("mouseover", () => {
    growCursor(customCursor);
  });

  newsletterSignUpButton.addEventListener("mouseleave", () => {
    normalizeCursor(customCursor);
  });
}

setupCustomCursorHoverEffect(document.querySelector(".custom-cursor"));
