const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const svgPath = document.querySelector(".svg-path");
const svgPathDesc = document.querySelector(".svg-path-desctop");
const tabsContainer = document.querySelector(".tabs-container");
const contentsContainer = document.querySelector(".contents-container");

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
  switchTab(currentTab);
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    currentTab = index;
    switchTab(index);
  });
});

function switchTab(index) {
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });

  if (window.innerWidth >= 1024) {
    contents[index].scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    tabs.forEach((tab, i) => {
      contents[i].style.order = "";
    });
  }

  svgPath.setAttribute("fill", colors[index]);
  svgPathDesc.setAttribute("fill", colors[index]);
}
