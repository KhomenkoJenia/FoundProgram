document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content-magic");
  content.classList.remove("hidden");
  content.classList.add("visible");
});

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const svgPath = document.querySelector(".svg-path");
const svgPathDesc = document.querySelector(".svg-path-desctop");
const tabsContainer = document.querySelector(".tabs-container");
const contentsContainer = document.querySelector(".content-container");

const colors = ["#5A58CF", "#408bfc", "#4f6258", "#f9d270", "#fbdeca"];
let currentTab = 0;
let isScrolling = false;

// Обработка прокрутки вкладок колесом мыши
tabsContainer.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (event.deltaY > 0) {
    currentTab = (currentTab + 1) % tabs.length;
  } else {
    currentTab = (currentTab - 1 + tabs.length) % tabs.length;
  }
  switchTab(currentTab, true);
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    currentTab = index;
    switchTab(index, true);
  });
});

contentsContainer.addEventListener("scroll", () => {
  if (isScrolling) return;

  const containerCenter =
    contentsContainer.scrollTop + contentsContainer.clientHeight / 2;

  contents.forEach((content, index) => {
    const contentRect = content.getBoundingClientRect();
    const containerRect = contentsContainer.getBoundingClientRect();
    const contentCenter = contentRect.top + contentRect.height / 2;

    if (
      contentCenter >= containerRect.top &&
      contentCenter <= containerRect.bottom
    ) {
      if (currentTab !== index) {
        currentTab = index;
        switchTab(index, false);
      }
    }
  });
});

tabsContainer.addEventListener("scroll", () => {
  if (isScrolling) return;

  const containerCenter =
    tabsContainer.scrollLeft + tabsContainer.clientWidth / 2;

  tabs.forEach((tab, index) => {
    const tabRect = tab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();
    const tabCenter = tabRect.left + tabRect.width / 2;

    if (tabCenter >= containerRect.left && tabCenter <= containerRect.right) {
      if (currentTab !== index) {
        currentTab = index;
        switchTab(index, false);
      }
    }
  });
});

function switchTab(index, scrollToContent) {
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });

  contents.forEach((content, i) => {
    content.classList.toggle("active", i === index);
  });

  svgPath.setAttribute("fill", colors[index]);
  svgPathDesc.setAttribute("fill", colors[index]);

  // Прокрутка контейнера с контентом до соответствующего контента
  if (scrollToContent) {
    isScrolling = true;

    const contentPosition = contents[index].offsetTop;
    contentsContainer.scrollTo({
      top: contentPosition,
      behavior: "smooth",
    });

    const tabPosition =
      tabs[index].offsetLeft -
      tabsContainer.clientWidth / 2 +
      tabs[index].clientWidth / 2;
    tabsContainer.scrollTo({
      left: tabPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
}

// Изначально устанавливаем первую вкладку и контент как активные
switchTab(currentTab, true);
