'use strict';

(function () {

  var PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var TITLE_LENGTH = {
    MIN: 30,
    MAX: 100,
  };

  var adForm = window.constants.FORM;
  var adFormFieldsets = window.constants.FORM_FIELDSETS;
  var adFormRoomsNumber = adForm.querySelector('#room_number');
  var adFormGuests = adForm.querySelector('#capacity');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormTitle = adForm.querySelector('#title');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');


  // Функция для перебора и вставки атрибута disabled элементам FORM_FIELDSETS
  adFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

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

  // Проверка валидации значении комнат и гостей
  function onCheckRoomsAndGuests() {
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
  }

  // Изменение placeholder-а цены в соответствии типу апартаментов
  function onTypeChange(evt) {
    adFormPrice.placeholder = PRICES[evt.target.value];
    adFormPrice.min = PRICES[evt.target.value];
  }

  // Лимит символов для заголовка
  function onTitleLimit(evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < TITLE_LENGTH.MIN) {
      adFormTitle.setCustomValidity('Ещё ' + TITLE_LENGTH.MIN - valueLength + ' символов');
    } else if (valueLength > TITLE_LENGTH.MAX) {
      adFormTitle.setCustomValidity('Заголовок превышает лимит на ' + valueLength - TITLE_LENGTH.MAX + 'символов');
    } else {
      adFormTitle.setCustomValidity('');
    }
  }

  // Время заезда и выезда
  function onTimeChange(evt) {
    var selectedIndex = evt.target.selectedIndex;

    if (evt.target === adFormTimeIn) {
      adFormTimeOut.options[selectedIndex].selected = true;
    } else {
      adFormTimeIn.options[selectedIndex].selected = true;
    }
  }

  // Сброс формы на исходные значения
  function onFormReset(evt) {
    evt.preventDefault();

    adForm.reset();
    window.main.setMapPinMainCoords();
    setTimeout(function () {
      window.main.setAddressCoords();
    });
  }

  // Отправка данных формы
  function submitHandler(evt) {
    window.data.sendData(new FormData(adForm), window.modal.getSuccessTemplate, window.modal.getErrorTemplate);
    evt.preventDefault();
  }

  adForm.addEventListener('submit', submitHandler);
  adFormRoomsNumber.addEventListener('input', onCheckRoomsAndGuests);
  adFormGuests.addEventListener('input', onCheckRoomsAndGuests);
  adFormTitle.addEventListener('input', onTitleLimit);
  adFormType.addEventListener('change', onTypeChange);
  adFormTimeIn.addEventListener('change', onTimeChange);
  adFormTimeOut.addEventListener('change', onTimeChange);
  adFormResetButton.addEventListener('click', onFormReset);

})();
