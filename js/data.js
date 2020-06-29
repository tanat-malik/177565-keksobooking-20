'use strict';

(function () {

  var SEND_URL = window.constants.SEND_URL;
  var DATA_URL = window.constants.DATA_URL;
  var STATUS_OK = 200;
  var TIMEOUT_IN_MS = 10000;

  // Функция для отправки данных из формы
  function sendData(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', SEND_URL);
    xhr.send(data);
  }

  // Функция для получения данных
  function getData(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', DATA_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + ' секунд');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', DATA_URL);
    xhr.send();
  }

  window.data = {
    sendData: sendData,
    getData: getData,
  };

})();
