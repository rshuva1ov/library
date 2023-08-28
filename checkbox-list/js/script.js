`use strict`;
const display = new Display(true);
const headBtnEl = document.querySelector(`.js-filter-head-btn`);
const checksFieldEl = document.querySelector(`.js-checks`);

headBtnEl.addEventListener(`click`, function() {
  checksFieldEl.classList.toggle(`filter__checks_show`);
});