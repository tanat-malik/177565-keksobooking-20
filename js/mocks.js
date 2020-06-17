'use strict';

(function () {


  // Функция для выбора случайного значения
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  // Функция для выбора случайного элемента массива
  function getRandomArrElem(arr) {
    return arr[getRandomValue(0, arr.length - 1)];
  }

  // Функция для выбора случайного количество элементов из массив
  function getRandomNumOfElemFromArr(arr) {
    var elements = [];
    for (var i = 0; i < getRandomValue(1, arr.length - 1); i++) {
      var option = getRandomArrElem(arr);
      if (elements.indexOf(option) === -1) {
        elements.push(option);
      }
    }
    return elements;
  }

  // Функция для генерирования данных(моки)
  window.generateMocks = function (counter) {
    var mocksList = [];
    for (var i = 0; i < counter; i++) {
      var locationX = getRandomValue(0, 1200);
      var locationY = getRandomValue(130, 630);
      var mocksPins = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: getRandomArrElem(window.constants.TYPES),
          address: locationX + ' ' + locationY,
          price: getRandomArrElem(window.constants.PRICES),
          type: getRandomArrElem(window.constants.TYPES),
          rooms: getRandomValue(1, window.constants.ROOMS.length - 1),
          guests: getRandomValue(1, window.constants.GUESTS.length - 1),
          checkin: getRandomArrElem(window.constants.CHECKIN),
          checkout: getRandomArrElem(window.constants.CHECKOUT),
          features: getRandomNumOfElemFromArr(window.constants.FEATURES),
          description: getRandomArrElem(window.constants.TYPES),
          photos: getRandomNumOfElemFromArr(window.constants.PHOTOS),
        },
        location: {
          x: locationX,
          y: locationY,
        },
      };
      mocksList.push(mocksPins);
    }
    return mocksList;
  };

})();
