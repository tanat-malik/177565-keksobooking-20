'use strict';

(function () {

  // Метка на карте
  var mapPinMain = window.constants.MAP_PIN_MAIN;
  // Высота острого конца метки
  var pinTipHeight = window.constants.PIN_TIP_HEIGHT;

  // Ограничение перемещения метки по оси Y вверх
  var mapPinMainTopY = window.constants.MAP_PIN_MAIN_TOP_Y;
  // Ограничение перемещения метки по оси Y вниз
  var mapPinMainBottomY = window.constants.MAP_PIN_MAIN_BOTTOM_Y;

  // Минимальное перемещение метки по оси X в левую сторону. Значение взято из половины ширины метки mapPinMain
  var mapPinMainLeftX = -32.5;
  // Максимальное перемещение метки по оси X в правую сторону
  var mapPinMainRightX = (mapPinMain.parentNode.offsetWidth + mapPinMainLeftX);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mouseDownCoords = {
      x: evt.pageX - parseInt(mapPinMain.style.left, 10),
      y: evt.pageY - parseInt(mapPinMain.style.top, 10),
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var mouseMoveCoords = {
        x: moveEvt.pageX - mouseDownCoords.x,
        y: moveEvt.pageY - mouseDownCoords.y,
      };

      // Ограничиваем область перемещения метки по карте
      var mapMoveLimits = {
        x: Math.max(
            Math.min(mouseMoveCoords.x, mapPinMainRightX),
            mapPinMainLeftX) + 'px',
        y: Math.max(
            Math.min(mouseMoveCoords.y, mapPinMainBottomY),
            mapPinMainTopY) + 'px',
      };

      // Ограничиваем метку по оси X при перемещении мыши
      mapPinMain.style.left = mapMoveLimits.x;
      // Ограничиваем метку по оси Y при перемещении мыши
      mapPinMain.style.top = mapMoveLimits.y;

      // Задаем координаты полю адреса при каждом смещении мыши
      window.setAddressCoords(
          mapPinMain.style.left = mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2,
          mapPinMain.style.top = mapPinMain.offsetTop + mapPinMain.offsetHeight + pinTipHeight
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
