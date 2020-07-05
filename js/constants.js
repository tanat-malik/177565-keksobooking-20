'use strict';

(function () {

  window.constants = {
    PIN_AMOUNT: 5,

    SEND_URL: 'https://javascript.pages.academy/keksobooking',
    DATA_URL: 'https://javascript.pages.academy/keksobooking/data',

    // Карта на странице
    MAP: document.querySelector('.map'),
    // Метка на странице
    MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
    // Ограничения для метки
    MAP_PIN_MAIN_TOP_Y: 130,
    MAP_PIN_MAIN_BOTTOM_Y: 630,
    // Высота острого конца метки
    PIN_TIP_HEIGHT: 22,
    // Дефолтные координаты метки
    MAIN_PIN_DEFAULT_TOP: '375px',
    MAIN_PIN_DEFAULT_LEFT: '570px',

    // Форма объявления
    FORM: document.querySelector('.ad-form'),
    // Все поля формы fieldset
    FORM_FIELDSETS: document.querySelectorAll('.ad-form__element'),

    // Код клавиши Enter
    ENTER_KEYCODE: 13,
    // Код клавиши Escape
    ESCAPE_KEYCODE: 27,
    // Левая кнопка мыши
    MOUSE_LEFT_BUTTON: 0,
  };

})();
