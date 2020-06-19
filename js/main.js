'use strict';

(function () {

  // Скрипты которые запускаются при активации страницы
  var activateScript = function () {
    window.constants.MAP.classList.remove('map--faded');
    window.constants.FORM.classList.remove('ad-form--disabled');

    window.renderPins(window.generateMocks(window.constants.PIN_AMOUNT));
    window.renderCards(window.generateMocks(window.constants.PIN_AMOUNT));

    window.constants.FORM_FIELDSETS.forEach(function (elem) {
      elem.disabled = false;
    });

    // Задаем координаты полю адреса
    window.setAddressCoords(
        Math.floor(window.constants.MAP_PIN_MAIN.offsetLeft + window.constants.MAP_PIN_MAIN.offsetWidth / 2),
        Math.floor(window.constants.MAP_PIN_MAIN.offsetTop + window.constants.MAP_PIN_MAIN.offsetHeight + window.constants.PIN_TIP_HEIGHT)
    );

    window.constants.MAP_PIN_MAIN.removeEventListener('mousedown', activatePage);
    document.removeEventListener('keydown', enterFocus);
  };

  // Функция для активации страницы по нажатию на левую кнопку мыши
  var activatePage = function (evt) {
    if (evt.button === 0) {
      activateScript();
    }
  };

  // Функция для активации страницы по нажатию на enter
  var enterFocus = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateScript();
    }
  };

  // Слушатели событии активации страницы
  window.constants.MAP_PIN_MAIN.addEventListener('mousedown', activatePage);
  document.addEventListener('keydown', enterFocus);

  // Функция для задания координат в поле адреса
  window.setAddressCoords = function (locationX, locationY) {
    window.constants.FORM_ADDRESS_INPUT.value = 'x: ' + locationX + ' ' + 'y: ' + locationY;
  };

})();
