var toggle_btn = document.querySelector('.js-toggle-btn');
var toggle_btn_SVG = document.querySelector('.js-toggle-btn__icon>use');

var menu_wrap = document.querySelector('.js-page-header__nav-wrap');
var menu = document.querySelector('.js-main-nav');

toggle_btn.onclick = function(e) {
   
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