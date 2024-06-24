const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const svgPath = document.querySelector(".svg-path");
const svgPathDesc = document.querySelector(".svg-path-desctop");
const tabsContainer = document.querySelector(".tabs-container");

let currentTab = 0;

const colors = ["#5A58CF", "#408bfc", "#4f6258", "#f9d270", "#fbdeca"];

function switchTab(index) {
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });

  // Меняем цвет SVG
  svgPath.setAttribute("fill", colors[index]);
  svgPathDesc.setAttribute("fill", colors[index]);
}

tabsContainer.addEventListener("wheel", (event) => {
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
