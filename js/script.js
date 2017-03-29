//обратобка открытия/закрытия меню
var toggle_btn = document.querySelector('.js-toggle-btn');
var toggle_btn_SVG = document.querySelector('.js-toggle-btn__icon>use');

var menu_wrap = document.querySelector('.js-nav-wrap');
var menu = document.querySelector('.js-main-nav');

//обработка пагинатора для отзывов price-table__paginator
var reviews_paginator = document.getElementById("reviews__paginator");
var price_paginator = document.getElementById("price-table__paginator");

toggle_btn.addEventListener('click', toggleMenu);
reviews_paginator.addEventListener("click", paginatorActive);
price_paginator.addEventListener("click", paginatorActive);

function toggleMenu(event) {

  if (this.classList.contains("menu-toggle-btn--active")) {
    toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
    this.classList.remove("menu-toggle-btn--active");
    menu_wrap.classList.remove("page-header__nav-wrap--menu-open");
    menu.style.display = "";
    document.removeEventListener('click', closeMenu);
  } else {
    toggle_btn_SVG.setAttribute("xlink:href", "#menu-cross");
    this.classList.add("menu-toggle-btn--active");
    menu_wrap.classList.add("page-header__nav-wrap--menu-open");
    menu.style.display = "block";
    document.addEventListener('click', closeMenu);
  }

}

//обрабатываем закрытие открытого меню при клике в любом месте документа
function closeMenu(event) {
  if(!toggle_btn.contains(event.target) & toggle_btn.classList.contains("menu-toggle-btn--active")) {
    toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
    toggle_btn.classList.remove("menu-toggle-btn--active");
    menu_wrap.classList.remove("page-header__nav-wrap--menu-open");
    menu.style.display = "";
    document.removeEventListener('click', closeMenu);
  }
}

function paginatorActive(event) {
  
  //если клик вне контейнера ничего не делаем
  if (!this.contains(event.target)) return;
  
  var paginator_items = this.children;

  //делаем массив из коллекции
  paginator_items = Array.prototype.slice.call(paginator_items);

  var target = event.target;

  while (this != target) {
    if (paginator_items.indexOf(target) != -1) {

      //если клик на уже активном элементе либо уже отработан в предыдущем цикле
      if (target.classList.contains("point-paginator__item--active")) return;

      for (var i = 0; i < paginator_items.length; i++) {
        paginator_items[i].classList.remove("point-paginator__item--active");
      }

      target.classList.add("point-paginator__item--active");
      elementSlide(this, paginator_items.indexOf(target));
    } else {
      //если клик внутри элемента на другом теге подымаемся вверх, пока не дойдем до нужного элемента
      target = target.parentNode;
    }
  }

}



//функция изменения позиции элемента в соотвествии с переключением пагинатора
//принимает элемент точечного пагинатора, на котором произошел клик
//номер этого элемента (номер точки в точечном пагинаторе)
//обще количество точек пагинатора
function elementSlide (element, position) {
  
  var slider_reviews = document.getElementById("slider-reviews");
  var price_table = document.getElementById("price-table");
  
  //проверяем к какому из блоков относится пагинатор (по общему родителю)
  if(slider_reviews.parentNode.contains(element)) {
    
    var slider_reviews_item = slider_reviews.children;
    
    for (var i=0; i<slider_reviews_item.length; i++) {
      slider_reviews_item[i].classList.add("slider-reviews__item--hidden");
    }
    
    slider_reviews_item[position].classList.remove("slider-reviews__item--hidden");
    
    return;
  }
  
  if(price_table.parentNode.contains(element)) {
    
    // сбрасываем все классы по смещению таблицы
    price_table.className = 'price__table';
    
    //устанавливаем класс смещения в зависимости от номера активного пагинатора
    switch (position) {
      case 0: 
        price_table.classList.add("price__table--left");
        break;
      case 1:
        price_table.classList.add("price__table--center");
        break;
      case 2:
        price_table.classList.add("price__table--right");
        break;
      default:
        price_table.classList.add("price__table--center");
    }
    
    return;
  }
}