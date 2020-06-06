'use strict';

// Переменные для генерирования данных
var PIN_AMOUNT = 8;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var PRICES = [
  10000,
  20000,
  30000,
  40000,
  50000
];
var ROOMS = [
  1,
  2,
  3,
  100
];
var GUESTS = [
  1,
  2,
  3
];
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Находим map, и удаляем у него класс
var map = document.querySelector('.map');
map.classList.remove('map--faded');
// Находим селектор map__pins
var mapPins = document.querySelector('.map__pins');

// Находим шаблон #pin
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

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
  for (var i = 0; i < getRandomValue(0, arr.length - 1); i++) {
    var option = getRandomArrElem(arr);
    if (elements.indexOf(option) === -1) {
      elements.push(option);
    }
  }
  return elements;
}

// Функция для генерирования данных(моки)
function generateMocks(counter) {
  var mocksList = [];
  for (var i = 0; i < counter; i++) {
    var locationX = getRandomValue(0, mapPins.clientWidth);
    var locationY = getRandomValue(130, 630);
    var mocksPins = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': getRandomArrElem(TYPES),
        'address': locationX + ' ' + locationY,
        'price': getRandomArrElem(PRICES),
        'type': getRandomArrElem(TYPES),
        'rooms': getRandomValue(1, ROOMS.length - 1),
        'guests': getRandomValue(1, GUESTS.length - 1),
        'checkin': getRandomArrElem(CHECKIN),
        'checkout': getRandomArrElem(CHECKOUT),
        'features': getRandomNumOfElemFromArr(FEATURES),
        'description': getRandomArrElem(TYPES),
        'photos': getRandomArrElem(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
    mocksList.push(mocksPins);
  }
  return mocksList;
}

// На основе данных, полученных из функции generateMocks, клону шаблона pinElement задаем метки координат и изображений
function getPinTemplate(data) {
  var pinElement = templatePin.cloneNode(true);
  var pinIcon = pinElement.querySelector('img');
  pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
  pinIcon.src = data.author.avatar;
  pinIcon.alt = data.author.title;
  return pinElement;
}

// Функция для рендеринга пинов на карте
function renderPins(pinsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(getPinTemplate(pinsData[i]));
  }
  mapPins.appendChild(fragment);
}

renderPins(generateMocks(PIN_AMOUNT));
