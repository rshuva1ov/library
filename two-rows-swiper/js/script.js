`use strict`;

var swiper = new Swiper(".slider", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        
        grid: {
          rows: 1,
        },
        
        spaceBetween: 6,
        pagination: {
          el: ".slider__pages",
          type: `fraction`,
        },
        
        navigation: {
          nextEl: `.slider__btn_next`,
          prevEl: `.slider__btn_prev`,
        },
        
        breakpoints: {
          500: {
            spaceBetween: 30,
            slidesPerView: 3,
            slidesPerGroup: 3,
            
            grid: {
              rows: 2,
            },
          }
        }
      });