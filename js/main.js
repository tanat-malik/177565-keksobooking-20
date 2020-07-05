'use strict';

(function () {

  // Пустой массив для объявлений
  window.ads = [];

  var formAddressInput = document.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters');

  function disableFilters() {
    Array.from(mapFilters.children).forEach(function (filterSelect) {
      filterSelect.disabled = true;
    });
  }

  function enableFilters() {
    Array.from(mapFilters.children).forEach(function (filterSelect) {
      filterSelect.disabled = false;
    });
  }

  disableFilters();

  // Скрипты которые запускаются при активации страницы
  function activateScript() {
    window.constants.MAP.classList.remove('map--faded');
    window.constants.FORM.classList.remove('ad-form--disabled');
    window.data.getData(window.map.onSuccessHandler, window.map.onErrorHandler);
    window.constants.FORM_FIELDSETS.forEach(function (elem) {
      elem.disabled = false;
    });
    setAddressCoords();

    window.constants.MAP_PIN_MAIN.removeEventListener('mousedown', activatePage);
    document.removeEventListener('keydown', onEnterFocus);
  }

  // Функция для активации страницы по нажатию на левую кнопку мыши
  function activatePage(evt) {
    if (evt.button === window.constants.MOUSE_LEFT_BUTTON) {
      activateScript();
    }
  }

  // Функция для активации страницы по нажатию на enter
  function onEnterFocus(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateScript();
    }
  }

  // Слушатели событии активации страницы
  window.constants.MAP_PIN_MAIN.addEventListener('mousedown', activatePage);
  document.addEventListener('keydown', onEnterFocus);

  // Деактивация страницы после успешного заполнения формы
  function deactivatePage() {
    var map = window.constants.MAP;
    var mapPinMain = window.constants.MAP_PIN_MAIN;
    var adForm = window.constants.FORM;
    var mainPinElement = map.querySelector('.map__pins');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.reset();
    disableFilters();

    if (map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
    }

    mainPinElement.querySelectorAll('.map__pin').forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });

    window.constants.FORM.reset();
    setMapPinMainCoords();
    setAddressCoords();

    window.constants.FORM_FIELDSETS.forEach(function (elem) {
      elem.disabled = true;
    });

    mapPinMain.addEventListener('mousedown', activatePage);
    mapPinMain.addEventListener('keydown', onEnterFocus);
  }

  // Функция для возвращения метки в исходное положение
  function setMapPinMainCoords() {
    window.constants.MAP_PIN_MAIN.style.left = window.constants.MAIN_PIN_DEFAULT_LEFT;
    window.constants.MAP_PIN_MAIN.style.top = window.constants.MAIN_PIN_DEFAULT_TOP;
  }

  // Функция для задания координат в поле адреса
  function setAddressCoords() {
    var locationX = Math.floor(window.constants.MAP_PIN_MAIN.offsetLeft + window.constants.MAP_PIN_MAIN.offsetWidth / 2);
    var locationY = Math.floor(window.constants.MAP_PIN_MAIN.offsetTop + window.constants.MAP_PIN_MAIN.offsetHeight + window.constants.PIN_TIP_HEIGHT);
    formAddressInput.value = locationX + ' ' + locationY;
  }

  window.main = {
    enableFilters: enableFilters,
    deactivatePage: deactivatePage,
    setMapPinMainCoords: setMapPinMainCoords,
    setAddressCoords: setAddressCoords,
  };

})();
