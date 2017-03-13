var toggle_btn = document.querySelector('.js-toggle-btn');
var toggle_btn_SVG = document.querySelector('.js-toggle-btn__icon>use');

var menu_wrap = document.querySelector('.js-nav-wrap');
var menu = document.querySelector('.js-main-nav');

toggle_btn.onclick = function(event) {
   
   var btn_active = this.classList.contains("menu-toggle-btn--active");

   if (btn_active) {
     toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
     this.classList.remove("menu-toggle-btn--active");
     menu_wrap.classList.remove("page-header__nav-wrap--menu-open");
     menu.style.display = "";
   } else {
     toggle_btn_SVG.setAttribute("xlink:href", "#menu-cross");
     this.classList.add("menu-toggle-btn--active");
     menu_wrap.classList.add("page-header__nav-wrap--menu-open");
     menu.style.display = "block";
   }

 }

//обработка пагинатора для отзывов
var reviews_paginator = document.getElementById("reviews__paginator");
var reviews_paginator_item = reviews_paginator.children;


reviews_paginator.onclick = function(event) {
  
  if(!reviews_paginator.contains(event.target)) return;
  
  if(this != event.target) {
    for (var i=0; i<reviews_paginator_item.length; i++) {
      reviews_paginator_item[i].classList.remove("point-paginator__item--active");
    }

    event.target.classList.add("point-paginator__item--active");
  }
  
  
  
}