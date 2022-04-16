// 0 => UP, 1 => RIGHT, 2 => DOWN, 3 => LEFT

const navigateButtons = document
  .querySelector("#navigatePageButtons")
  .querySelectorAll("a");

// const pages = document.querySelectorAll(".subPage");
const pages = document.querySelectorAll(".page");

const container = document.querySelector(".container");

let currentPage;
let currentPageIndex;
let currentSubPageIndex = 0;
let lastPageIndex;
let currentPageSubLength = 1;

let currentSubPageHref = "#";

// console.log(pages);


checkWhichNavigateButtonsToShow()

container.addEventListener('scroll', () => {
    checkWhichNavigateButtonsToShow()
})

pages.forEach((page) => {
    if (page.children.length > 1) {
        page.addEventListener('scroll', () => {
            checkWhichNavigateButtonsToShow()
        })
    }
})


navigateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = checkWhichPageIsVisible();
      currentPageIndex =
        currentPage.firstElementChild.attributes["data-Index"].value[0];
      lastPageIndex =
        pages[pages.length - 1].firstElementChild.attributes["data-Index"]
          .value[0];
  
      currentPageSubLength = pages[currentPageIndex].children.length;
  
      if (currentPageSubLength > 1) {
        currentSubPageIndex =
          currentPage.children[currentSubPageIndex].attributes["data-Index"]
            .value[2];
      }
  
      handleNavigation(button);
    });
  });


function checkWhichNavigateButtonsToShow() {
    currentPage = checkWhichPageIsVisible()
    currentPageIndex = currentPage.firstElementChild.attributes['data-Index'].value[0]
    lastPageIndex =
    pages[pages.length - 1].firstElementChild.attributes["data-Index"]
      .value[0]

    currentPageSubLength = pages[currentPageIndex].children.length;

    //UP BUTTON
    if (currentPageIndex == 0) {
        navigateButtons[0].style.display = 'none'
    }
    else{
        navigateButtons[0].style.display = 'block'
    }

    //DOWN BUTTON
    if (currentPageIndex === lastPageIndex) {
        navigateButtons[2].style.display = 'none'
    }
    else{
        navigateButtons[2].style.display = 'block'
    }

    //SIDE BUTTONS
    if (currentPage.children.length > 1) {

        //RIGHT BUTTON 
        if (currentSubPageIndex == currentPageSubLength - 1) {
            navigateButtons[1].style.display = 'none'
        }
        else{
            navigateButtons[1].style.display = 'block'
        }

        //LEFT BUTTON
        if (currentSubPageIndex == 0) {   
            navigateButtons[3].style.display = 'none'
        }
        else{
            navigateButtons[3].style.display = 'block'
        }
    }
    else{
        navigateButtons[1].style.display = 'none'
        navigateButtons[3].style.display = 'none'
    }

}

function handleNavigation(button) {
  switch (true) {
    case button.id === "up" && currentPageIndex !== "0":
      button.href = "#" + findNextUpPage();
      break;

    case button.id === "down" && currentPageIndex !== lastPageIndex:
      button.href = "#" + findNextDownPage();;
      break;

    case button.id === "right" &&
      currentPageSubLength > 1 &&
      currentSubPageIndex != currentPageSubLength - 1:
      button.href = "#" + findNextRightPage();
      currentSubPageHref = button.href;
      currentSubPageIndex++;
      break;

    case button.id === "left" &&
      currentPageSubLength > 1 &&
      currentSubPageIndex != 0:
      button.href = "#" + findNextLeftPage();
      currentSubPageHref = button.href;
      currentSubPageIndex--;
      break;

    default:
      if (currentPageSubLength > 1) {
        button.href = currentSubPageHref;
      } else {
        button.href = "#";
      }
      console.log("NO MATCH");
      break;
  }
}

function findNextUpPage() {
  for (let i = 0; i < pages.length; i++) {
    if (
      pages[i].firstElementChild.attributes["data-Index"].value[0] ===
      String(Number(currentPageIndex) - 1)
    ) {
      return pages[i].id;
    }
  }
}

function findNextDownPage() {
  for (let i = 0; i < pages.length; i++) {
    if (
      pages[i].firstElementChild.attributes["data-Index"].value[0] ===
      String(Number(currentPageIndex) + 1)
    ) {
      return pages[i].id;
    }
  }
}

function findNextRightPage() {
  let childrenLength = pages[currentPageIndex].children.length;

  for (let i = 0; i < childrenLength; i++) {
    if (
      pages[currentPageIndex].children[i].attributes["data-Index"].value[2] ===
      String(Number(currentSubPageIndex) + 1)
    ) {
      return pages[currentPageIndex].children[i].id;
    }
  }
}

function findNextLeftPage() {
  let childrenLength = pages[currentPageIndex].children.length;

  for (let i = 0; i < childrenLength; i++) {

    if (
      pages[currentPageIndex].children[i].attributes["data-Index"].value[2] ===
      String(Number(currentSubPageIndex) - 1)
    ) {
      return pages[currentPageIndex].children[i].id;
    }
  }
}

function checkWhichPageIsVisible() {
  let result;
  pages.forEach((page) => {
    if (checkVisible(page)) {
      result = page;
      return;
    }
  });
  return result;
}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  var viewWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth
  );
  return !(
    rect.bottom < 0 ||
    rect.top - viewHeight >= 0 ||
    rect.right < 0 ||
    rect.left - viewWidth >= 0
  );
}
