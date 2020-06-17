'use strict';

(function () {

  // Кнопка активации страницы
  var mapPinMain = document.querySelector('.map__pin--main');

  // Форма заполнения информации об объявлении
  var adForm = document.querySelector('.ad-form');

  // Поля формы адреса
  var adFormAddressInput = adForm.querySelector('#address');

  // Все поля формы fieldset
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  // Функция для перебора и вставки атрибута disabled элементам adFormFieldsets
  adFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  // Скрипты которые запускаются при активации страницы
  var activateScript = function () {
    window.constants.MAP.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.renderPins(window.generateMocks(window.constants.PIN_AMOUNT));
    window.renderCards(window.generateMocks(window.constants.PIN_AMOUNT));

    adFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    adFormAddressInput.value = getAddressCoordinate();

    mapPinMain.removeEventListener('mousedown', activatePage);
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
  mapPinMain.addEventListener('mousedown', activatePage);
  document.addEventListener('keydown', enterFocus);

  // Функция для задания координат
  var getAddressCoordinate = function () {
    var locationX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    var locationY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight + window.constants.PIN_TIP_HEIGHT);
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
      customMessage:
        'Для 3 комнат возможны варианты: 1 гость, 2 гостя, 3 гостя',
    },
    '100': {
      guestsAmout: ['0'],
      customMessage: 'Для 100 комнат возможен варианты: не для гостей',
    },
  };

  // Функция для проверки валидации значении комнат и гостей
  var checkRoomsAndGuests = function () {
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
    checkRoomsAndGuests();
  });

  adFormGuests.addEventListener('input', function () {
    checkRoomsAndGuests();
  });

})();
