`use strict`;

const headFrontEl = document.querySelector(`.head__front`);
const burgerEl = document.querySelector(`.burger`);
const navListEl = document.querySelector(`.nav__list`);
const navItemElems = document.querySelectorAll(`.nav__item`);
const tl = gsap.timeline({
  defaults: { duration: .2 }
});

burgerEl.addEventListener(`click`, function() {
  const isExpanded = this.getAttribute(`aria-expanded`) === `true` ? true : false;
  
  isExpanded ? this.setAttribute(`aria-expanded`, `false`) : this.setAttribute(`aria-expanded`, `true`);
  
  this.querySelector(`.burger__line`).classList.toggle(`burger__line_close`);
  if(isExpanded) {
    tl.fromTo(navItemElems, {
    opacity: 1,
    },
    {
    opacity: 0,
    stagger: `.2`
    })
    .to(headFrontEl, {
    boxShadow: `0 2px 3px 0 transparent`,
    })
    .fromTo(navListEl, {
        visibility: `visible`,
        // opacity: 1,
        y: 0,
      },
      {
        visibility: `hidden`,
        // opacity: 0,
        y: `-100%`,
      });
      
      return;
  }
  
  tl.fromTo(navListEl, {
  visibility: `hidden`,
 // opacity: 0,
  y: `-100%`,
  },
  {
  visibility: `visible`,
 // opacity: 1,
  y: 0,
  })
  .to(headFrontEl, {
  boxShadow: `0 2px 8px 0 #fff`,
  })
  .fromTo(navItemElems, {
  opacity: 0,
  },
  {
  opacity: 1,
  stagger: `.2`
  });
});