const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const svgPath = document.querySelector(".svg-path");
const svgPathDesc = document.querySelector(".svg-path-desctop");
const tabsContainer = document.querySelector(".tabs-container");
const contentsContainer = document.querySelector(".content-container");

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content-magic");
  content.classList.remove("hidden");
  content.classList.add("visible");
});

const colors = ["#5A58CF", "#408bfc", "#4f6258", "#f9d270", "#fbdeca"];

let currentTab = 0;

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
  const containerCenter =
    contentsContainer.scrollTop + contentsContainer.clientHeight / 2;

  contents.forEach((content, index) => {
    const contentRect = content.getBoundingClientRect();
    const containerRect = contentsContainer.getBoundingClientRect();
    const contentCenter = contentRect.top + contentRect.height / 2;
    const containerCenterY = containerRect.top + containerRect.height / 2;

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

function switchTab(index, scrollToContent) {
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });

  contents.forEach((content, i) => {
    content.classList.toggle("active", i === index);
    if (scrollToContent && i === index) {
      content.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  svgPath.setAttribute("fill", colors[index]);
  svgPathDesc.setAttribute("fill", colors[index]);
}

// Initially set the first tab and content as active
switchTab(currentTab, true);
