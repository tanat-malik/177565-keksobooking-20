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

// Находим map
var map = document.querySelector('.map');
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
  for (var i = 0; i < getRandomValue(1, arr.length - 1); i++) {
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
        'photos': getRandomNumOfElemFromArr(PHOTOS),
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

/*
  ДЗ - Больше деталей (часть 2)
*/

// Находим шаблон #card
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Функция для склонения по падежам слова комната
function getRoomsСase(value) {
  if (value === 1) {
    return value + ' комната';
  } else if (value === 5) {
    return value + ' комнат';
  } else {
    return value + ' комнаты';
  }
}

// Функция для склонения по падежам слова гость
function getGuestСase(value) {
  if (value === 1) {
    return value + ' гостя';
  } else {
    return value + ' гостей';
  }
}

// Функция для создания попапа
function createCards(card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  if (card.offer.type === 'palace') {
    cardElement.querySelector('.popup__type').textContent = 'Дворец';
  } else if (card.offer.type === 'flat') {
    cardElement.querySelector('.popup__type').textContent = 'Квартира';
  } else if (card.offer.type === 'house') {
    cardElement.querySelector('.popup__type').textContent = 'Дом';
  } else {
    cardElement.querySelector('.popup__type').textContent = 'Бунгало';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = getRoomsСase(card.offer.rooms) + ' для ' + getGuestСase(card.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features.join(', ');

  // Так как данные по offer.description отсутствуют, воспользуемся данными из шаблона #card
  // cardElement.querySelector('.popup__description').textContent = card.offer.description;

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var photo = popupPhotos.querySelector('img');
  for (var i = 0; i < card.offer.photos.length; i++) {
    var photoElem = photo.cloneNode(true);
    photoElem.src = card.offer.photos[i];
    popupPhotos.appendChild(photoElem);
  }
  photo.remove();

  return cardElement;
}

// Функция для рендеринга попапа на карте
function renderCards(cardData) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCards(cardData[0]));
  map.appendChild(fragment);
}

/*
  ДЗ - доверяй но проверяй (часть 1)
*/

// Кнопка активации страницы
var mapPinMain = document.querySelector('.map__pin--main');

// Форма заполнения информации об объявлении
var adForm = document.querySelector('.ad-form');

// Поля формы адреса
var adFormAddressInput = adForm.querySelector('#address');

// Все поля формы fieldset
var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
// Функция для перебора и вставки атрибута disabled лэлементам adFormFieldsets
adFormFieldsets.forEach(function (elem) {
  elem.disabled = true;
});

// Скрипты которые запускаются при активации страницы
var scriptActivation = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderPins(generateMocks(PIN_AMOUNT));
  renderCards(generateMocks(PIN_AMOUNT));

  adFormFieldsets.forEach(function (elem) {
    elem.disabled = false;
  });

  adFormAddressInput.value = getAddressCoordinate();

  mapPinMain.removeEventListener('mousedown', pageActivation);
  document.removeEventListener('keydown', enterFocus);
};

// Функция для активации страницы по нажатию на левую кнопку мыши
var pageActivation = function (evt) {
  if (evt.button === 0) {
    scriptActivation();
  }
};

// Функция по активации страницы по нажатию на enter
var enterFocus = function (evt) {
  if (evt.keyCode === 13) {
    scriptActivation();
  }
};

// Слушатели событии активации страницы
mapPinMain.addEventListener('mousedown', pageActivation);
document.addEventListener('keydown', enterFocus);

// Размер острого конца метки
var PIN_TIP_HEIGHT = 22;
// Функция для задания координат
var getAddressCoordinate = function () {
  var locationX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
  var locationY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_TIP_HEIGHT);
  var location = locationX + ', ' + locationY;

  return location;
};

var adFormRoomsNumber = adForm.querySelector('#room_number');
var adFormGuests = adForm.querySelector('#capacity');

var roomsAmount = {
  '1': {
    guestsAmout: ['1'],
    customMessage: 'Для 1 комнаты возможен вариант: 1 гость',
  },
  '2': {
    guestsAmout: ['1', '2'],
    customMessage: 'Для 2 комнат возможны варианты: 1 гость, 2 гостя',
  },
  '3': {
    guestsAmout: ['1', '2', '3'],
    customMessage: 'Для 3 комнат возможны варианты: 1 гость, 2 гостя, 3 гостя',
  },
  '100': {
    guestsAmout: ['0'],
    customMessage: 'Для 100 комнат возможен варианты: не для гостей',
  },
};

// Функция для проверки валидации значении комнат и гостей
var roomsAndGuestsValidation = function () {
  var roomsValue = adFormRoomsNumber.value;
  var guestsValue = adFormGuests.value;
  var currentRooms = roomsAmount[roomsValue];
  var customMessage = currentRooms['customMessage'];

  for (var i = 0; i < currentRooms['guestsAmout'].length; i++) {
    if (guestsValue === currentRooms['guestsAmout'][i]) {
      customMessage = '';
    }
  }

  adFormGuests.setCustomValidity(customMessage);
};

adFormRoomsNumber.addEventListener('input', function () {
  roomsAndGuestsValidation();
});

adFormGuests.addEventListener('input', function () {
  roomsAndGuestsValidation();
});
