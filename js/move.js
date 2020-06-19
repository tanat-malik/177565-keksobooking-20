'use strict';

(function () {

  // Метка на карте
  var mapPinMain = window.constants.MAP_PIN_MAIN;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var offset = {
      x: evt.pageX - parseInt(mapPinMain.style.left, 10),
      y: evt.pageY - parseInt(mapPinMain.style.top, 10),
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // Ограничения для метки
      var limits = {
        x: Math.max(Math.min(moveEvt.pageX - offset.x, (mapPinMain.parentNode.offsetWidth + (mapPinMain.offsetWidth / 2)) - mapPinMain.offsetWidth), -32.5) + 'px',
        y: Math.max(Math.min(moveEvt.pageY - offset.y, 630), 130) + 'px',
      };

      // Ограничиваем метку по оси X
      mapPinMain.style.left = limits.x;
      // Ограничиваем метку по оси Y
      mapPinMain.style.top = limits.y;

      // Задаем координаты полю адреса
      window.setAddressCoords(
          mapPinMain.style.left = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2),
          mapPinMain.style.top = mapPinMain.offsetTop + mapPinMain.offsetHeight + window.constants.PIN_TIP_HEIGHT
      );

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
