// Variáveis globais
const headerNavButtons = document.querySelectorAll(".header__nav__list-item");
const jeepSections = document.querySelectorAll(".main__section");
const navigationArrows = document.querySelectorAll(".main__navigation span");
const sliderPoints = document.querySelectorAll(".main__slide-item");
const mouseEffect = document.querySelector(".mouse-effect");
const scrollThreshold = 600;
let currentJeepSectionIndex = 0;
let deltaScrollController = 0;

// Funções de animação
const setCurrentHeaderNavigation = (index) => {
   headerNavButtons.forEach((button) => {
      button.classList.remove("active");
   });
   headerNavButtons[index].classList.add("active");
};

const setCurrentSliderPoint = (index) => {
   sliderPoints.forEach((button) => {
      button.classList.remove("active");
   });
   sliderPoints[index].classList.add("active");
};

const setCurrentJeepSection = (index, classname) => {
   jeepSections.forEach((section) => {
      section.classList.remove("active-right");
      section.classList.remove("active-left");
   });
   jeepSections[index].classList.add(classname);
};

const animatePage = (index, classList) => {
   setCurrentJeepSection(index, classList);
   setCurrentSliderPoint(index);
   setCurrentHeaderNavigation(index);
};

const goToNextPage = () => {
   currentJeepSectionIndex =
      currentJeepSectionIndex >= 2 ? 0 : currentJeepSectionIndex + 1;
   animatePage(currentJeepSectionIndex, "active-right");
};

const goToPreviousPage = () => {
   currentJeepSectionIndex =
      currentJeepSectionIndex === 0 ? 2 : currentJeepSectionIndex - 1;
   animatePage(currentJeepSectionIndex, "active-left");
};

// Eventos de click
headerNavButtons.forEach((navButton, index) => {
   navButton.addEventListener("click", () =>
      animatePage(
         index,
         index > currentJeepSectionIndex ? "active-right" : "active-left"
      )
   );
});

sliderPoints.forEach((sliderPoint, index) => {
   sliderPoint.addEventListener("click", () =>
      animatePage(
         index,
         index > currentJeepSectionIndex ? "active-right" : "active-left"
      )
   );
});

navigationArrows.forEach((arrow, index) => {
   arrow.addEventListener("click", () =>
      index % 2 === 0 ? goToNextPage() : goToPreviousPage()
   );
});

window.onwheel = (event) => {
   deltaScrollController += event.deltaY;
   if (deltaScrollController === scrollThreshold) {
      goToNextPage();
      deltaScrollController = 0;
   } else if (deltaScrollController === -scrollThreshold) {
      goToPreviousPage();
      deltaScrollController = 0;
   }
};
