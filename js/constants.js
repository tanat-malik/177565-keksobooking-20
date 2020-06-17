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

    // Код клавиши Enter
    ENTER_KEYCODE: 13,

    // Высота острого конца метки
    PIN_TIP_HEIGHT: 22,

    MAP: document.querySelector('.map'),
  };

})();
