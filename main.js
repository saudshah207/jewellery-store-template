const customCursorMovement = (e) => {
  const customCursor = document.querySelector(".custom-cursor");
  const halfOfCursorWidth = 33.5 / 2;

  /* Getting coordinates for movement of the custom cursor */
  let moveX = e.clientX;
  let moveY = e.clientY;

  /* cursor moves by inputing coordinates with fixed positioning */
  customCursor.style.left = `${moveX - halfOfCursorWidth}px`;
  customCursor.style.top = `${moveY + document.body.scrollTop - halfOfCursorWidth}px`;
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

function setupOffCanvasMenuOpenningAnimation() {
  const hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");

  hamburgerMenuToggle.addEventListener("click", () => {
    tranformToCloseButton(document.querySelectorAll(".bar"));

    fadeOutHeaderElements(
      document.querySelector("hr"),
      document.querySelector(".logo"),
      document.querySelector(".user-account-container"),
      document.querySelector(".shopping-cart-container")
    );

    fadeInOffCanvasMenuItems(
      document.querySelectorAll(".offcanvas-menu-list li")
    );

    slideOffCanvasMenuInAndOut(document.querySelector(".offcanvas-menu-list"));

    setTimeout(
      fadeInHeaderElements,
      1000,
      document.querySelector("hr"),
      document.querySelector(".logo"),
      document.querySelector(".user-account-container"),
      document.querySelector(".shopping-cart-container")
    );
  });
}

setupOffCanvasMenuOpenningAnimation();

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

function fadeInOffCanvasMenuItems(menuItems) {
  Array.from(menuItems).forEach((Item) => {
    Item.classList.toggle("fade-in");
  });
}

function slideOffCanvasMenuInAndOut(menu) {
  menu.classList.toggle("slides-in");
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
  const navBarButtons = document.querySelectorAll(".navbar-buttons > div"),
    links = document.querySelectorAll("a:not(.jewellery-products-section .product)"),
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
