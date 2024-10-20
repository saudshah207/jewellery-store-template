const customCursorMovement = (e) => {
  const customCursor = document.querySelector(".custom-cursor");

  /* Getting coordinates for movement of the custom cursor */
  let moveX = e.clientX;
  let moveY = e.clientY;

  /* cursor moves by inputing coordinates with fixed positioning */
  customCursor.style.left = `${moveX}px`;
  customCursor.style.top = `${moveY + document.body.scrollTop}px`;
};

window.addEventListener("mousemove", customCursorMovement);

function setNavHeightCSSVariable(navHeight, styleSheet) {
  for (
    styleRuleIndex = 0;
    styleRuleIndex < styleSheet.cssRules.length;
    styleRuleIndex++
  ) {
    if (styleSheet.cssRules[styleRuleIndex].selectorText === ":root") {
      styleSheet.cssRules[styleRuleIndex].style.setProperty(
        "--nav-height",
        `${navHeight}px`
      );
      if (!navHeight) {
        setNavHeightCSSVariable(
          document.querySelector("nav").getBoundingClientRect().height,
          styleSheet
        );
        console.log("setNavHeightCSSVariable called again!", navHeight);
      }
      break;
    }
  }
}

function findSharedStyleSheet(styleSheets) {
  for (let index = 0; index < styleSheets.length; index++) {
    if (styleSheets[index].href.endsWith("shared.css")) {
      setNavHeightCSSVariable(
        document.querySelector("nav").getBoundingClientRect().height,
        styleSheets[index]
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

function setupCustomCursorHoverEffect() {
  const customCursor = document.querySelector(".custom-cursor"),
    navBarButtons = document.querySelectorAll(".navbar-buttons > div"),
    links = document.getElementsByTagName("a"),
    carouselNavigationButtons = document.querySelectorAll(
      ".carousel > .navigation > button"
    );
  newsletterSignUpButton = document.querySelector("form > button");

  navBarButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      customCursor.classList.add("cursor-grows");
    });

    button.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-grows");
    });
  });

  Array.from(links).forEach((link) => {
    link.addEventListener("mouseover", () => {
      customCursor.classList.add("cursor-grows");
    });

    link.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-grows");
    });
  });

  carouselNavigationButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      customCursor.classList.add("cursor-grows");
    });

    button.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-grows");
    });
  });

  newsletterSignUpButton.addEventListener("mouseover", () => {
    customCursor.classList.add("cursor-grows");
  });

  newsletterSignUpButton.addEventListener("mouseleave", () => {
    customCursor.classList.remove("cursor-grows");
  });
}

setupCustomCursorHoverEffect();
