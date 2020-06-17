'use strict';

(function () {

  // Находим шаблон #card
  var cardTemplate = document
    .querySelector('#card')
    .content.querySelector('.map__card');

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
    if (value === 1) {
      return value + ' гостя';
    } else {
      return value + ' гостей';
    }
  }

  // Функция для создания попапа
  function createCards(card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent =
      card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent =
      card.offer.price + '₽/ночь';

    switch (card.offer.type) {
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      default:
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
    }

    cardElement.querySelector('.popup__text--capacity').textContent =
      getRoomsСase(card.offer.rooms) +
      ' для ' +
      getGuestСase(card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector(
        '.popup__features'
    ).textContent = card.offer.features.join(', ');

    // Так как данные по offer.description отсутствуют, воспользуемся данными из шаблона #card
    // cardElement.querySelector('.popup__description').textContent = card.offer.description;

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    for (var i = 0; i < card.offer.photos.length; i++) {
      var photoElem = photo.cloneNode(true);
      photoElem.src = card.offer.photos[i];
      popupPhotos.appendChild(photoElem);
    }
    photo.remove();

    return cardElement;
  }

  // Функция для рендеринга попапа на карте
  window.renderCards = function (cardData) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCards(cardData[0]));
    window.constants.MAP.appendChild(fragment);
  };

})();
