'use strict';

(function () {

  window.constants = {
    // Переменные для генерации данных
    PIN_AMOUNT: 8,
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    PRICES: [10000, 20000, 30000, 40000, 50000],
    ROOMS: [1, 2, 3, 100],
    GUESTS: [1, 2, 3],
    CHECKIN: ['12:00', '13:00', '14:00'],
    CHECKOUT: ['12:00', '13:00', '14:00'],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],

    // Карта на странице
    MAP: document.querySelector('.map'),
    // Метка на странице
    MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
    // Высота острого конца метки
    PIN_TIP_HEIGHT: 22,

    // Форма объявления
    FORM: document.querySelector('.ad-form'),
    // Все поля формы fieldset
    FORM_FIELDSETS: document.querySelectorAll('.ad-form__element'),
    // Поле адреса
    FORM_ADDRESS_INPUT: document.querySelector('#address'),

    // Код клавиши Enter
    ENTER_KEYCODE: 13,
  };

})();
