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

function slideGoldCollectionProducts(viewportWidth, productImagesGrid) {
  if (viewportWidth < 769) {
    Array.from(productImagesGrid.children).forEach((productImage, index) => {
      productImage.addEventListener("touchstart", function (touchStartEvent) {
        handleTouchStart(touchStartEvent);
      });
      productImage.addEventListener("touchend", function (touchEndEvent) {
        handleTouchEnd(
          touchEndEvent.changedTouches[0].clientX,
          touchEndEvent.changedTouches[0].clientY,
          index
        );
      });
    });
  }

  let initialTouchPosX, initialTouchPosY;

  /*
    returnValues,
    carouselItemHorizontalArea,
    adjustTranslationCallCount = 0; */

  function handleTouchStart(event) {
    console.log("WORKING", event);

    initialTouchPosX = event.touches[0].clientX;
    initialTouchPosY = event.touches[0].clientY;
  }

  function handleTouchEnd(finalTouchPosX, finalTouchPosY, elementIndex) {
    let diffInTouchPosX = finalTouchPosX - initialTouchPosX,
      diffInTouchPosY = finalTouchPosY - initialTouchPosY;

    console.log("diffInTouchX", diffInTouchPosX);
    console.log("diffInTouchY", diffInTouchPosY);

    if (diffInTouchPosX !== 0) {
      if (
        diffInTouchPosX > 20 &&
        diffInTouchPosY <= 50 &&
        diffInTouchPosY >= -50
      ) {
        console.log("RIGHT!");

        returnValues = slideCarouselRight(
          productImagesGrid,
          productImagesGrid.children[elementIndex],
          productImagesGrid.style.transform
        );

        carouselItemHorizontalArea = returnValues[0];
      } else if (
        diffInTouchPosX < -20 &&
        diffInTouchPosY <= 50 &&
        diffInTouchPosY >= -50
      ) {
        console.log("LEFT!");

        returnValues = slideCarouselLeft(
          productImagesGrid,
          productImagesGrid.children[elementIndex],
          productImagesGrid.style.transform
        );

        carouselItemHorizontalArea = returnValues[0];
      }
    }
  }

  /*
  window.addEventListener("resize", function (event) {
    console.log(event);
    if (getTranslationAlongX(productImagesGrid.style.transform) !== 0) {
      carouselItemHorizontalArea = getTotalHorizontalArea(productImagesGrid.children[0])
      console.log(carouselItemHorizontalArea, returnValues[2]);
      let oldColumnGap = getColumnGap(productImagesGrid);

      // carouselItemHorizontalArea = adjustTranslationAlongX(
      //   carouselItemHorizontalArea,
      //   returnValues[1],
      //   returnValues[2],
      //   returnValues[1].style.transform,
      //   ++adjustTranslationCallCount
      // );

      setTimeout(
        callAdjustTranslation,
        400,
        carouselItemHorizontalArea,
        returnValues,
        oldColumnGap,
        adjustTranslationCallCount
      );
    }
  });

  function callAdjustTranslation(
    carouselItemHorizontalArea,
    returnValues,
    columnGap,
    adjustTranslationCallCount
  ) {
    carouselItemHorizontalArea = adjustTranslationAlongX(
      carouselItemHorizontalArea,
      returnValues[1],
      returnValues[2],
      columnGap,
      returnValues[1].style.transform,
      ++adjustTranslationCallCount
    );
  } */
}

slideGoldCollectionProducts(
  document.documentElement.clientWidth,
  document.querySelector(".gold-collection-images")
);

function getColumnGap(element) {
  let columnGap = getComputedStyle(element).columnGap,
    indexToSliceAt = columnGap.indexOf("px");

  return Math.floor(+columnGap.slice(0, indexToSliceAt));
}

function getHorizontalMargin(element) {
  let leftMargin = getComputedStyle(element).marginLeft,
    rightMargin = getComputedStyle(element).marginRight,
    indexToSliceAt = rightMargin.indexOf("px");

  return (
    +leftMargin.slice(0, indexToSliceAt) + +rightMargin.slice(0, indexToSliceAt)
  );
}

function getTotalHorizontalArea(element) {
  return Math.floor(
    element.getBoundingClientRect().width + getHorizontalMargin(element)
  );
}

function getTranslationAlongX(transformStyle) {
  let translationAlongX = transformStyle
    ? +transformStyle.slice(
        transformStyle.indexOf("(") + 1,
        transformStyle.indexOf("px")
      )
    : 0;

  return Math.floor(translationAlongX);
}

function adjustTranslationAlongX(
  oldHorizontalArea,
  carousel,
  carouselItem,
  transformStyle
) {
  let newHorizontalArea = getTotalHorizontalArea(carouselItem),
    translationAlongX = getTranslationAlongX(transformStyle);

  for (let placesMoved = 1; placesMoved <= 7; placesMoved++) {
    if (carousel === document.querySelector(".gold-collection-images")) {
      console.log(
        oldHorizontalArea,
        (oldHorizontalArea + columnGap) * placesMoved,
        placesMoved,
        -translationAlongX,
        transformStyle,
        `newHorizontalArea is ${newHorizontalArea}`
      );

      if (translationAlongX < 0) {
        if (
          (oldHorizontalArea + columnGap) * placesMoved ===
          -translationAlongX
        ) {
          console.log("I was reached!");
          carousel.style.transform = `translateX(${
            -(newHorizontalArea + getColumnGap(carousel)) * placesMoved
          }px)`;
        }
      } else {
        if (
          (oldHorizontalArea + columnGap) * placesMoved ===
          translationAlongX
        ) {
          console.log("I was reached!");
          carousel.style.transform = `translateX(${
            (newHorizontalArea + getColumnGap(carousel)) * placesMoved
          }px)`;
        }
      }

      break;
    } else {
      newHorizontalArea = getTotalHorizontalArea(carouselItem);

      console.log(
        oldHorizontalArea * placesMoved,
        placesMoved,
        -translationAlongX,
        transformStyle,
        `newHorizontalArea is ${newHorizontalArea}`
      );

      if (oldHorizontalArea * placesMoved === -translationAlongX) {
        carousel.style.transform = `translateX(${
          -newHorizontalArea * placesMoved
        }px)`;
        break;
      }
    }
  }

  return newHorizontalArea;
}

function ensureCarouselResponsiveness(horizontalArea, carouselData) {
  horizontalArea = adjustTranslationAlongX(
    horizontalArea,
    carouselData[1],
    carouselData[2],
    carouselData[1].style.transform
  );

  return horizontalArea;
}

function slideCarouselRight(carousel, carouselItem, inlineTransformStyle) {
  let carouselItemHorizontalArea = getTotalHorizontalArea(carouselItem),
    translationAlongX = getTranslationAlongX(inlineTransformStyle);

  if (carousel === document.querySelector(".gold-collection-images")) {
    console.log(`${translationAlongX} <= 0`);

    if (translationAlongX <= 0) {
      console.log(translationAlongX, carouselItemHorizontalArea);

      carousel.style.transform = `translateX(${
        translationAlongX +
        (carouselItemHorizontalArea + getColumnGap(carousel))
      }px)`;
    }
  } else {
    if (translationAlongX <= -carouselItemHorizontalArea) {
      carousel.style.transform = `translateX(${
        translationAlongX + carouselItemHorizontalArea
      }px)`;
    }
  }

  return [carouselItemHorizontalArea, carousel, carouselItem];
}

function slideCarouselLeft(carousel, carouselItem, inlineTransformStyle) {
  let carouselItemHorizontalArea = getTotalHorizontalArea(carouselItem),
    translationAlongX = getTranslationAlongX(inlineTransformStyle);

  if (carousel === document.querySelector(".gold-collection-images")) {
    console.log(`${translationAlongX} >= 0`);

    if (translationAlongX >= 0) {
      console.log(translationAlongX, carouselItemHorizontalArea);

      carousel.style.transform = `translateX(${
        translationAlongX -
        (carouselItemHorizontalArea + getColumnGap(carousel))
      }px)`;
    }
  } else {
    let maxTranslationAlongX =
      -carouselItemHorizontalArea * (carousel.children.length - 1);

    if (translationAlongX <= 0 && translationAlongX > maxTranslationAlongX) {
      carousel.style.transform = `translateX(${
        translationAlongX - carouselItemHorizontalArea
      }px)`;
    }
  }

  return [carouselItemHorizontalArea, carousel, carouselItem];
}

function slideCarousel(navBtn, carousel) {
  if (navBtn.className === "left") {
    updatedCarouselData = slideCarouselRight(
      carousel,
      carousel.children[0],
      carousel.style.transform
    );

    return updatedCarouselData;
  }

  updatedCarouselData = slideCarouselLeft(
    carousel,
    carousel.children[0],
    carousel.style.transform
  );

  return updatedCarouselData;
}

function setupCarouselNavigation(carouselNavBtns) {
  let updatedCarouselData, carouselItemHorizontalArea;

  for (const carouselNavBtn of carouselNavBtns) {
    carouselNavBtn.addEventListener("click", function () {
      updatedCarouselData = slideCarousel(
        carouselNavBtn,
        carouselNavBtn.parentElement.previousElementSibling
      );

      carouselItemHorizontalArea = updatedCarouselData[0];
    });
  }

  window.addEventListener("resize", function () {
    if (carouselItemHorizontalArea) {
      carouselItemHorizontalArea = ensureCarouselResponsiveness(
        carouselItemHorizontalArea,
        updatedCarouselData
      );

      console.log(carouselItemHorizontalArea);
    }
  });
}

window.addEventListener("load", function () {
  setupCarouselNavigation(
    document.querySelectorAll(".carousel > .navigation > button")
  );
});

function setupDesignerLinksHoverEffect() {
  const designerLinks = document.getElementsByClassName("designer");

  Array.from(designerLinks).forEach((designerLink) => {
    let popUpImage = designerLink.children[1],
      designerLinkText = designerLink.children[0];

    designerLink.addEventListener("mouseenter", (e) => {
      popUpImage.dataset.status = "active";
      designerLinkText.style.zIndex = "1";
      popUpImage.style.left = `${e.offsetX}px`;
    });

    designerLink.addEventListener("mouseleave", () => {
      popUpImage.dataset.status = "inactive";
      designerLinkText.style.zIndex = "-1";
    });
  });
}

setupDesignerLinksHoverEffect();
