//обратобка открытия/закрытия меню
var toggle_btn = document.querySelector('.js-toggle-btn');
var toggle_btn_SVG = document.querySelector('.js-toggle-btn__icon>use');

var menu_wrap = document.querySelector('.js-nav-wrap');
var menu = document.querySelector('.js-main-nav');

//обработка пагинатора
var reviews_paginator = document.getElementById("slider-reviews__point-paginator");
var price_paginator = document.getElementById("table-price__point-paginator");

toggle_btn.addEventListener('click', toggleMenu);
reviews_paginator.addEventListener("click", paginatorActive);
price_paginator.addEventListener("click", paginatorActive);

function toggleMenu(event) {

  if (this.classList.contains(this.classList[0] + "--active")) {
    toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
    this.classList.remove(this.classList[0] + "--active");
    menu_wrap.classList.remove(menu_wrap.classList[0] + "--menu-open");
    menu.style.display = "";
    document.removeEventListener('click', closeMenu);
  } else {
    toggle_btn_SVG.setAttribute("xlink:href", "#menu-cross");
    this.classList.add(this.classList[0] + "--active");
    menu_wrap.classList.add(menu_wrap.classList[0] + "--menu-open");
    menu.style.display = "block";
    document.addEventListener('click', closeMenu);
  }

}

//обрабатываем закрытие открытого меню при клике в любом месте документа
function closeMenu(event) {
  if (!toggle_btn.contains(event.target) & toggle_btn.classList.contains(toggle_btn.classList[0] + "--active")) {
    toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
    toggle_btn.classList.remove(toggle_btn.classList[0] + "--active");
    menu_wrap.classList.remove(menu_wrap.classList[0] + "--menu-open");
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
      if (target.classList.contains(target.classList[0] + "--active")) return;

      for (var i = 0; i < paginator_items.length; i++) {
        if (paginator_items[i].classList.contains(paginator_items[i].classList[0] + "--active"))
          paginator_items[i].classList.remove(paginator_items[i].classList[0] + "--active");
      }

      target.classList.add(target.classList[0] + "--active");
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
function elementSlide(element, position) {

  var slider_reviews = document.getElementById("slider-reviews");
  var price_table = document.getElementById("price-table");

  //проверяем к какому из блоков относится пагинатор
  if (slider_reviews.contains(element)) {

    var slider_reviews_item = slider_reviews.querySelectorAll("." + slider_reviews.classList[0] + "__item");

    for (var i = 0; i < slider_reviews_item.length; i++) {
      slider_reviews_item[i].classList.add(slider_reviews_item[i].classList[0] + "--hidden");
    }

    slider_reviews_item[position].classList.remove(slider_reviews_item[position].classList[0] + "--hidden");

    return;
  }

  if (price_table.parentNode.contains(element)) {

    // сбрасываем все классы по смещению таблицы
    price_table.className = price_table.classList[0];

    //устанавливаем класс смещения в зависимости от номера активного пагинатора
    switch (position) {
      case 0:
        price_table.classList.add(price_table.classList[0] + "--left");
        break;
      case 1:
        price_table.classList.add(price_table.classList[0] + "--center");
        break;
      case 2:
        price_table.classList.add(price_table.classList[0] + "--right");
        break;
      default:
        price_table.classList.add(price_table.classList[0] + "--center");
    }

    return;
  }
}