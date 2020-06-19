'use strict';

(function () {

  // Функция для перебора и вставки атрибута disabled элементам FORM_FIELDSETS
  window.constants.FORM_FIELDSETS.forEach(function (elem) {
    elem.disabled = true;
  });

  var adFormRoomsNumber = window.constants.FORM.querySelector('#room_number');
  var adFormGuests = window.constants.FORM.querySelector('#capacity');

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
