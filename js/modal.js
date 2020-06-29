'use strict';

(function () {

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var ESCAPE_KEYCODE = window.constants.ESCAPE_KEYCODE;
  var MOUSE_LEFT_BUTTON = window.constants.MOUSE_LEFT_BUTTON;

  function getSuccessTemplate() {
    var messageTemplate = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageTemplate);
    main.appendChild(fragment);

    document.addEventListener('click', deleteSuccessTemplate);
    document.addEventListener('keydown', deleteSuccessTemplate);

    window.main.deactivatePage();

    return fragment;
  }

  function deleteSuccessTemplate(evt) {
    var success = document.querySelector('.success');

    if (evt.keyCode === ESCAPE_KEYCODE) {
      success.parentNode.removeChild(success);
    } else if (evt.button === MOUSE_LEFT_BUTTON) {
      success.parentNode.removeChild(success);
    }

    document.removeEventListener('click', deleteSuccessTemplate);
    document.removeEventListener('keydown', deleteSuccessTemplate);
  }

  function getErrorTemplate() {
    var messageTemplate = errorTemplate.cloneNode(true);
    var errorButton = messageTemplate.querySelector('.error__button');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageTemplate);
    main.appendChild(fragment);

    errorButton.addEventListener('click', deleteErrorTemplate);
    document.addEventListener('click', deleteErrorTemplate);
    document.addEventListener('keydown', deleteErrorTemplate);

    return fragment;
  }

  function deleteErrorTemplate(evt) {
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    if (evt.keyCode === ESCAPE_KEYCODE) {
      error.parentNode.removeChild(error);
    } else if (evt.button === MOUSE_LEFT_BUTTON) {
      error.parentNode.removeChild(error);
    }

    errorButton.removeEventListener('click', deleteErrorTemplate);
    document.removeEventListener('click', deleteErrorTemplate);
    document.removeEventListener('keydown', deleteErrorTemplate);
  }

  window.modal = {
    getSuccessTemplate: getSuccessTemplate,
    getErrorTemplate: getErrorTemplate,
  };

})();
