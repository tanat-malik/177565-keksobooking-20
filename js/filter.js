'use strict';

(function () {

  var PIN_AMOUNT = window.constants.PIN_AMOUNT;
  var ANY_VALUE = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var apartmentType = mapFilters.querySelector('#housing-type');

  var getPinsData = window.map.getPinsData;
  var removePins = window.map.removePins;
  var removeCard = window.card.removeCard;
  var debounce = window.debounce;

  function checkApartmentType(ad) {
    return apartmentType.value === ANY_VALUE ? true : apartmentType.value === ad.offer.type;
  }

  function getFilteredAds(ads) {
    var filteredAds = ads.filter(function (ad) {
      return checkApartmentType(ad);
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
