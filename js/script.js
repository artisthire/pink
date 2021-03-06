(function() {
//обратобка открытия/закрытия меню
var toggle_btn = document.querySelector('.js-toggle-btn');
var toggle_btn_SVG = document.querySelector('.js-toggle-btn__icon>use');

var menu_wrap = document.querySelector('.js-nav-wrap');
var menu = document.querySelector('.js-main-nav');

//обработка пагинатора
var reviews_paginator = document.getElementById("slider-reviews__point-paginator");
var price_paginator = document.getElementById("table-price__point-paginator");

//обработка "стрелочного" слайдера для отзывов
var row_price_paginator = document.getElementById("slider-reviews__row-paginator");

toggle_btn.addEventListener('click', toggleMenu);
reviews_paginator.addEventListener("click", paginatorActive);
price_paginator.addEventListener("click", paginatorActive);

function toggleMenu(event) {

  if (this.classList.contains(this.classList[0] + "--active")) {
    if(toggle_btn_SVG) toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
    this.classList.remove(this.classList[0] + "--active");
    menu_wrap.classList.remove(menu_wrap.classList[0] + "--menu-open");
    menu.style.display = "";
    document.removeEventListener('click', closeMenu);
  } else {
    if(toggle_btn_SVG) toggle_btn_SVG.setAttribute("xlink:href", "#menu-cross");
    this.classList.add(this.classList[0] + "--active");
    menu_wrap.classList.add(menu_wrap.classList[0] + "--menu-open");
    menu.style.display = "block";
    document.addEventListener('click', closeMenu);
  }

}

//обрабатываем закрытие открытого меню при клике в любом месте документа
function closeMenu(event) {
  if (!toggle_btn.contains(event.target) & toggle_btn.classList.contains(toggle_btn.classList[0] + "--active")) {
    if(toggle_btn_SVG) toggle_btn_SVG.setAttribute("xlink:href", "#menu-burger");
    toggle_btn.classList.remove(toggle_btn.classList[0] + "--active");
    menu_wrap.classList.remove(menu_wrap.classList[0] + "--menu-open");
    menu.style.display = "";
    document.removeEventListener('click', closeMenu);
  }
}

function paginatorActive(event) {

  var paginator_items = this.children;

  //делаем массив из коллекции
  paginator_items = Array.prototype.slice.call(paginator_items);

  var target = event.target;

  while (this != target) {
    if (paginator_items.indexOf(target) != -1) {

      //если клик на уже активном элементе либо уже отработан в предыдущем цикле
      if (target.classList.contains(target.classList[0] + "--active")) return;

      paginator_items.filter(function(elem) {return elem.classList.contains(elem.classList[0] + "--active");}).forEach(function(elem) {
        //if (elem.classList.contains(elem.classList[0] + "--active"))
          elem.classList.remove(elem.classList[0] + "--active");
      });
      
      /*for (var i = 0; i < paginator_items.length; i++) {
        if (paginator_items[i].classList.contains(paginator_items[i].classList[0] + "--active"))
          paginator_items[i].classList.remove(paginator_items[i].classList[0] + "--active");
      }*/

      target.classList.add(target.classList[0] + "--active");
      elementSlide(this, paginator_items.indexOf(target));
      return;
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


row_price_paginator.onclick = function(event) {
  
  var target = event.target;
  var row_price_paginator_items = row_price_paginator.children;
  //делаем массив из коллекции
  row_price_paginator_items = Array.prototype.slice.call(row_price_paginator_items);
  
  while (this != target) {
    
    if (row_price_paginator_items.indexOf(target) != -1) {
      
      var slider_review = document.getElementById("slider-reviews");
      var slider_reviews_items = slider_review.querySelectorAll("." + slider_review.classList[0] + "__item");
      //slider_reviews_items = Array.prototype.slice.call(slider_reviews_items);
      
      //ищем активный (отображаемый) элемент отзывов
      var active_reviews_item = 0;
      for(var i = 0; i < slider_reviews_items.length; i++) {
        if (slider_reviews_items[i].classList.contains(slider_review.classList[0] + "__item--hidden")) continue;
        //находим индекс первого и единственного не скрытого элемента и прерываем цикл
        active_reviews_item = i;
        break;
      }
      
      //если клик на стрелке "назад" уменьшаем позицию активного отзыва
      if (target == row_price_paginator.firstElementChild) active_reviews_item--;
      //иначе - увеличиваем
      if (target == row_price_paginator.lastElementChild) active_reviews_item++;
      
      //варианты активных элементов ограничены 0 и максимальным количеством отзывов
      active_reviews_item = Math.max(0,active_reviews_item);
      active_reviews_item = Math.min(slider_reviews_items.length-1, active_reviews_item);
      
      if(!slider_reviews_items[active_reviews_item].classList.contains(slider_review.classList[0] + "__item--hidden")) return;
      
      //сначала скрываем все элементы
      for(var i = 0; i < slider_reviews_items.length; i++) {
        slider_reviews_items[i].classList.add(slider_review.classList[0] + "__item--hidden");
      }
      
      //далее показываем только следующий активный элемент
 slider_reviews_items[active_reviews_item].classList.remove(slider_review.classList[0] + "__item--hidden");
      
      
      
      //также нужно переключить точечный пагинатор в соотвествии
      //с выбранным отзывом с помощью стрелочного пагинатора
      //это нужно для устройств у которых при смене ориентации 
      //когда стерлочный пагинатор меняется на точечный
      if (active_reviews_item >= 0 & active_reviews_item <= 2) {
        
        var paginator_items = reviews_paginator.children;
        
        for (var i = 0; i < paginator_items.length; i++) {
          paginator_items[i].classList.remove(paginator_items[i].classList[0] + "--active");
      }
        paginator_items[active_reviews_item].classList.add(paginator_items[active_reviews_item].classList[0] + "--active");
        
      }
      
       return;
    }
    
    else {
      target = target.parentNode;
    }
  }
  
};

/*
function deepEqual(obj1, obj2) {
	
	if (typeof obj1 != typeof obj2) return false; 
	if((obj1 === null || obj2 === null) && obj1 !== obj2) return false; 
	if(obj1 === obj2 && obj1 === null) return true; 
	if (typeof obj1 != "object") return obj1 === obj2; 
	if(typeof obj1 == "object") {
		var result = false;
		if (Object.keys(obj1).length != Object.keys(obj2).length) result = false; 
		for (var i=0; i< Object.keys(obj1).length; i++) {
			if(Object.keys(obj1)[i] != Object.keys(obj2)[i]) result = false; 
			result = deepEqual(obj1[Object.keys(obj1)[i]], obj2[Object.keys(obj2)[i]]);
			if (!result) break;
			//console.log(result);
		}
		return result;
	} 
} 

function arrayToList (arr) {var array = arr.slice(); var list = {value: array.pop(), rest: null}; while(array.length != 0) { list = {value: array.pop(), rest: list}; } return list; }


console.log(deepEqual(arrayToList([1,2,3]), arrayToList([1,20,3])));
*/
  
})();