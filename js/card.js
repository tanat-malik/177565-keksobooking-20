'use strict';

(function () {

  var APARTMENT_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Функция для склонения по падежам слова комната
  function getRoomsСase(value) {
    if (value === 1) {
      return value + ' комната';
    } else if (value === 5) {
      return value + ' комнат';
    } else {
      return value + ' комнаты';
    }
  }

  // Функция для склонения по падежам слова гость
  function getGuestСase(value) {
    return (value === 1) ? value + ' гостя' : value + ' гостей';
  }

  // Функция для создания карточки объявления
  function createCards(card) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = APARTMENT_TYPE[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent =
      getRoomsСase(card.offer.rooms) +
      ' для ' +
      getGuestСase(card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = card.offer.features.join(', ');
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var popupPhotos = cardElement.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    for (var i = 0; i < card.offer.photos.length; i++) {
      var photoElem = photo.cloneNode(true);
      photoElem.src = card.offer.photos[i];
      popupPhotos.appendChild(photoElem);
    }
    photo.remove();

    popupClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', closeCardEscPress);

    return cardElement;
  }

  // Функция для рендеринга попапа на карте
  function renderCards(cardData) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCards(cardData));
    window.constants.MAP.appendChild(fragment);
  }

  // Функция обработки событий на карточке объявления
  function closeCard() {
    var cardElement = document.querySelector('.map__card');
    var popupClose = cardElement.querySelector('.popup__close');
    cardElement.remove();

    popupClose.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', closeCardEscPress);
  }

  // Функция обработки событий на карточке объявления
  function closeCardEscPress(evt) {
    if (evt.keyCode === window.constants.ESCAPE_KEYCODE) {
      closeCard();
    }
  }

  // Функция для удаления объявлений
  function removeCard() {
    var cardElement = document.querySelector('.map__card');

    if (cardElement) {
      cardElement.remove();
    }
  }

  window.card = {
    createCards: createCards,
    renderCards: renderCards,
    removeCard: removeCard,
  };

})();
