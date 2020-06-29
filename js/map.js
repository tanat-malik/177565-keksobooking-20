'use strict';

(function () {

  var map = window.constants.MAP;
  var mapPins = map.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  // На основе данных, полученных из функции getPinsData, клону шаблона pinElement задаем метки координат и изображений
  function getPinTemplate(data) {
    var pinElement = templatePin.cloneNode(true);
    var pinIcon = pinElement.querySelector('img');

    pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinIcon.src = data.author.avatar;
    pinIcon.alt = data.author.title;

    pinElement.addEventListener('click', function (evt) {
      onPinClick(evt, data);
    });

    return pinElement;
  }

  function getPinsData(pinsArr) {
    var fragment = document.createDocumentFragment();

    pinsArr.forEach(function (arr) {
      var pinElement = getPinTemplate(arr);
      fragment.appendChild(pinElement);
    });

    mapPins.appendChild(fragment);
  }

  function onSuccessHandler(pins) {
    window.ads = pins;
    window.main.enableFilters();
    getPinsData(window.ads.slice(0, window.constants.PIN_AMOUNT));
  }

  function onErrorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    node.style.color = 'white';
    document.body.insertAdjacentElement('afterbegin', node);
  }

  // Функция для открытия карты объявления
  function onPinClick(evt, data) {
    var pinElement = evt.currentTarget;
    var pinElements = map.querySelectorAll('.map__pin');
    var cardElement = window.card.createCards(data);

    pinElements.forEach(deleteActiveMapPin);
    pinElement.classList.add('map__pin--active');

    window.card.removeCard();
    map.appendChild(cardElement);
  }

  function deleteActiveMapPin(pinElement) {
    pinElement.classList.remove('map__pin--active');
  }

  // Функция для удаления меток на карте
  function removePins() {
    var pins = window.constants.MAP.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  window.map = {
    getPinsData: getPinsData,
    removePins: removePins,
    onSuccessHandler: onSuccessHandler,
    onErrorHandler: onErrorHandler,
  };

})();
