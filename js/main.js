'use strict';

// Переменные для генерирования данных
var pinAmount = 8;
var apartmentType = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var apartmentPrice = [
  10000,
  20000,
  30000,
  40000,
  50000
];
var apartmentRooms = [
  1,
  2,
  3,
  100
];
var apartmentGuests = [
  1,
  2,
  3
];
var apartmentCheckin = [
  '12:00',
  '13:00',
  '14:00'
];
var apartmentCheckout = [
  '12:00',
  '13:00',
  '14:00'
];
var apartmentFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var apartmentPhotos = [
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

// Функция для выбора случайного количество элементов из массива
function getRandomNumOfElemFromArr(arr) {
  var elements = [];
  for (var i = 0; i < Math.round(Math.random() * arr.length + 1); i++) {
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
        'title': getRandomArrElem(apartmentType),
        'address': locationX + ' ' + locationY,
        'price': getRandomArrElem(apartmentPrice),
        'type': getRandomArrElem(apartmentType),
        'rooms': getRandomValue(1, apartmentRooms.length - 1),
        'guests': getRandomValue(1, apartmentGuests.length - 1),
        'checkin': getRandomArrElem(apartmentCheckin),
        'checkout': getRandomArrElem(apartmentCheckout),
        'features': getRandomNumOfElemFromArr(apartmentFeatures),
        'description': getRandomArrElem(apartmentType),
        'photos': getRandomArrElem(apartmentPhotos),
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
function setPinValue(data) {
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
    fragment.appendChild(setPinValue(pinsData[i]));
  }
  mapPins.appendChild(fragment);
}

renderPins(generateMocks(pinAmount));
