'use strict';

(function () {

  var PIN_AMOUNT = window.constants.PIN_AMOUNT;
  var APARTMENT_PRICES = {
    LOW: 10000,
    HIGHT: 50000,
  };
  var ANY_VALUE = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeaturesList = mapFilters.querySelector('#housing-features');

  var getPinsData = window.map.getPinsData;
  var removePins = window.map.removePins;
  var removeCard = window.card.removeCard;
  var debounce = window.debounce;

  function changeApartmentType(ad) {
    return housingType.value === ANY_VALUE ? true : housingType.value === ad.offer.type;
  }

  function changeApartmentPrice(ad) {
    var isCorrectPrice = true;
    if (housingPrice.value !== ANY_VALUE) {
      switch (housingPrice.value) {
        case 'low':
          isCorrectPrice = ad.offer.price < APARTMENT_PRICES.LOW;
          break;
        case 'middle':
          isCorrectPrice = ad.offer.price >= APARTMENT_PRICES.LOW && ad.offer.price < APARTMENT_PRICES.HIGHT;
          break;
        case 'high':
          isCorrectPrice = ad.offer.price >= APARTMENT_PRICES.HIGHT;
      }
    }
    return isCorrectPrice;
  }

  function changeApartmentFeatures(ad) {
    var isCorrectFeatures = true;
    var features = housingFeaturesList.querySelectorAll('input:checked');
    features.forEach(function (feature) {
      if (ad.offer.features.indexOf(feature.value) === -1) {
        isCorrectFeatures = false;
        return;
      }
    });
    return isCorrectFeatures;
  }

  function changeApartmentGuests(ad) {
    return housingGuests.value === ANY_VALUE ? true : parseInt(housingGuests.value, 10) === parseInt(ad.offer.guests, 10);
  }

  function changeApartmentRooms(ad) {
    return housingRooms.value === ANY_VALUE ? true : parseInt(housingRooms.value, 10) === parseInt(ad.offer.rooms, 10);
  }

  function getFilteredAds(ads) {
    var filteredAds = ads.filter(function (ad) {
      return changeApartmentType(ad) && changeApartmentPrice(ad) && changeApartmentFeatures(ad) && changeApartmentGuests(ad) && changeApartmentRooms(ad);
    });

    return filteredAds.slice(0, PIN_AMOUNT);
  }

  function onFilterChange() {
    removeCard();
    removePins();
    debounce(getPinsData(getFilteredAds(window.ads)));
  }

  mapFilters.addEventListener('change', onFilterChange);

})();
