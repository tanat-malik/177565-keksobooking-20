'use strict';

(function () {

  // Находим селектор map__pins
  var mapPins = document.querySelector('.map__pins');

  // Находим шаблон #pin
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  // На основе данных, полученных из функции getPinsData, клону шаблона pinElement задаем метки координат и изображений
  function getPinTemplate(data) {
    var pinElement = templatePin.cloneNode(true);
    var pinIcon = pinElement.querySelector('img');
    pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinIcon.src = data.author.avatar;
    pinIcon.alt = data.author.title;
    return pinElement;
  }

  function getPinsData() {

    function successHandler(pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(getPinTemplate(pins[i]));
      }
      mapPins.appendChild(fragment);
    }

    function errorHandler(errorMessage) {
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

    window.data.getData(successHandler, errorHandler);
  }

  window.map = {
    getPinsData: getPinsData,
  };

})();
