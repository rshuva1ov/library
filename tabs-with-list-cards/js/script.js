`use strict`;
const NO_PAINTER_INFO_ID = `#unknown-painter`;
const tabsListEl = document.querySelector(`.tabs__list`);

$(`.tabs`).tabs({
  active: 2,
  show: {duration: 160},
  hide: {duration: 160},
});

tabsListEl.addEventListener(`click`, function(event) {
  event.preventDefault();
  if(!event.target.classList.contains(`tab-list__link`)) return;
  
  const link = event.target;
  const cardId = link.getAttribute(`href`);
  const painterName = link.textContent.replace(`,`, ``);
  const parentTabEl = link.closest(`.tab`);
  let targetCard;
  
  if(cardId === NO_PAINTER_INFO_ID) {
    targetCard = parentTabEl.querySelector(`.js-unknown-painter`);
    targetCard.querySelector(`.painter-info__title`).textContent = painterName;
  } else targetCard = parentTabEl.querySelector(cardId);
  
  const cards = parentTabEl.querySelectorAll(`.painter-info`);
  cards.forEach(card => {
    (card === targetCard) ?
      card.classList.add(`painter-info_active`) :
      card.classList.remove(`painter-info_active`);
  });
});