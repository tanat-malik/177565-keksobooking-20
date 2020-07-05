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

  function checkRoomsInputValue() {
    for (var i = 0; i < adFormRoomsNumber.length; i++) {
      if (adFormRoomsNumber.options[0].value === '1') {
        adFormGuests.options[i].disabled = true;
      }
      adFormGuests.options[0].disabled = false;
    }
  }
  checkRoomsInputValue();

  function onCheckRoomsAndGuests(evt) {
    var selectedIndex = evt.target.selectedIndex;
    adFormGuests.options[selectedIndex].selected = true;

    for (var i = 0; i < adFormGuests.length; i++) {
      adFormGuests.options[i].disabled = true;
      if (selectedIndex === adFormGuests.length - 1) {
        adFormGuests.options[selectedIndex].disabled = false;
      } else if (selectedIndex >= i) {
        adFormGuests.options[i].disabled = false;
      }
    }
  }

  // Изменение placeholder-а цены в соответствии типу апартаментов
  function onTypeChange(evt) {
    adFormPrice.placeholder = PRICES[evt.target.value];
    adFormPrice.min = PRICES[evt.target.value];
  }

  // Функция для склонения по падежам слова символ
  function getWordsSymbol(value) {
    if (value === 1 || value === 21) {
      return value + ' символ.';
    } else if ((value >= 2 && value <= 4) || (value >= 22 && value <= 24)) {
      return value + ' символа.';
    } else if (value >= 5 && value <= 20) {
      return value + ' символов.';
    } else {
      return value + ' символов.';
    }
  }

  // Лимит символов для заголовка
  function onTitleLimit(evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < TITLE_LENGTH.MIN) {
      adFormTitle.setCustomValidity('Минимальный лимит 30 символов!' + ' Ещё ' + getWordsSymbol(TITLE_LENGTH.MIN - valueLength));
    } else if (valueLength > TITLE_LENGTH.MAX) {
      adFormTitle.setCustomValidity('Заголовок превышает лимит на ' + (valueLength - TITLE_LENGTH.MAX) + ' символов!');
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

  function onFormReset(evt) {
    evt.preventDefault();
    window.main.deactivatePage();
  }

  // Отправка данных формы
  function submitHandler(evt) {
    window.data.sendData(new FormData(adForm), window.modal.getSuccessTemplate, window.modal.getErrorTemplate);
    evt.preventDefault();
  }

  adForm.addEventListener('submit', submitHandler);
  adFormRoomsNumber.addEventListener('change', onCheckRoomsAndGuests);
  adFormTitle.addEventListener('input', onTitleLimit);
  adFormType.addEventListener('change', onTypeChange);
  adFormTimeIn.addEventListener('change', onTimeChange);
  adFormTimeOut.addEventListener('change', onTimeChange);
  adFormResetButton.addEventListener('click', onFormReset);

})();
