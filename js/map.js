'use strict';

(function () {

  // Находим селектор map__pins
  var mapPins = document.querySelector('.map__pins');

  // Находим шаблон #pin
  var templatePin = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  // На основе данных, полученных из функции generateMocks в файле mocks.js, клону шаблона pinElement задаем метки координат и изображений
  function getPinTemplate(data) {
    var pinElement = templatePin.cloneNode(true);
    var pinIcon = pinElement.querySelector('img');
    pinElement.style =
      'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinIcon.src = data.author.avatar;
    pinIcon.alt = data.author.title;
    return pinElement;
  }

  // Функция для рендеринга пинов на карте
  window.renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsData.length; i++) {
      fragment.appendChild(getPinTemplate(pinsData[i]));
    }
    mapPins.appendChild(fragment);
  };

})();
