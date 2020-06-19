// 'use strict';

// (function () {

//   // Метка на карте
//   var mapPinMain = window.constants.MAP_PIN_MAIN;

//   mapPinMain.addEventListener('mousedown', function (evt) {
//     evt.preventDefault();

//     // eslint-disable-next-line radix
//     var offsetX = evt.pageX - parseInt(mapPinMain.style.left);
//     // eslint-disable-next-line radix
//     var offsetY = evt.pageY - parseInt(mapPinMain.style.top);

//     var onMouseMove = function (moveEvt) {
//       moveEvt.preventDefault();

//       // Ограничения по оси X
//       mapPinMain.style.left = Math.max(Math.min(moveEvt.pageX - offsetX, (mapPinMain.parentNode.offsetWidth + (mapPinMain.offsetWidth / 2)) - mapPinMain.offsetWidth), -32.5) + 'px';
//       // Ограничения по оси Y
//       mapPinMain.style.top = Math.max(Math.min(moveEvt.pageY - offsetY, 630), 130) + 'px';
//     };

//     var onMouseUp = function (upEvt) {
//       upEvt.preventDefault();

//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     };

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);

//   });

// })();
