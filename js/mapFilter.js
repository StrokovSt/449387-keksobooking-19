// -------------------------- Модуль для фильтра пинов

'use strict';
(function () {
  var mapForm = document.querySelector('.map__filters');
  var features = document.querySelector('#housing-features');
  var featureInputs = features.getElementsByTagName('input');
  var mapFilterList = document.querySelector('.map__filters');

  var LOWER_PRICE_LIMIT = 10000;
  var UPPER_PRICE_LIMIT = 50000;

  // -------------------------- Фильтры для пинов

  var offerType = {
    offerElement: document.querySelector('#housing-type'),
    offerArray: ['any', 'palace', 'flat', 'house', 'bungalo'],
    offerNumber: 0
  };

  var offerPrice = {
    offerElement: document.querySelector('#housing-price'),
    offerArray: ['any', 'middle', 'low', 'high'],
    offerNumber: 1
  };

  var offerRooms = {
    offerElement: document.querySelector('#housing-rooms'),
    offerArray: ['any', '1', '2', '3'],
    offerNumber: 2
  };

  var offerGuests = {
    offerElement: document.querySelector('#housing-guests'),
    offerArray: ['any', '2', '1', '0'],
    offerNumber: 3
  };

  var offerFilters = [offerType, offerPrice, offerRooms, offerGuests];
  var pins = [];

  window.mapFilter = {

    // -------------------------- callback для успешной загрузки данных

    onSuccsessfulDataTake: function (data) {
      pins = data;
      window.map.appendPin(pins);
      window.form.deleteDisabled(mapFilterList);
    },

     // -------------------------- фильтрация пинов

    pinsFilter: function () {
      var mappedPins = document.getElementsByClassName('second-pin');
      var newPins = pins.slice();
      var selectedFilters = [];
      var selectedFeatures = [];
      var filteredPins = [];

      window.map.closePopup();
      while (mappedPins[0]) {
        mappedPins[0].remove();
      };

      for (var i = 0; i < offerFilters.length; i++) {
        var offerElement = offerFilters[i].offerElement;
        var offerArray = offerFilters[i].offerArray;
        var offerOptionSelected = offerArray[offerElement.selectedIndex];
        selectedFilters.push(offerOptionSelected);
      };

      for (var i = 0; i < featureInputs.length; i++) {
        if (featureInputs[i].checked) {
          var inputValue = featureInputs[i].value;
          selectedFeatures.push(inputValue);
        }
      };

      for (var i = 0; i < newPins.length; i++) {
        var pinType = newPins[i].offer.type;
        var pinPrice = newPins[i].offer.price;
        var pinRooms = newPins[i].offer.rooms;
        var pinGuets = newPins[i].offer.guests;
        var pinFeatures = newPins[i].offer.features;
        var pinQuality = 0;

        if (selectedFilters[0] === 'any' || pinType === selectedFilters[0]) {
          pinQuality ++;
        };

        if (selectedFilters[1] === 'any'
        || (selectedFilters[1] === 'middle' && pinPrice >= LOWER_PRICE_LIMIT && pinPrice <= UPPER_PRICE_LIMIT)
        || (selectedFilters[1] === 'low' && pinPrice < LOWER_PRICE_LIMIT)
        || (selectedFilters[1] === 'high' && pinPrice > UPPER_PRICE_LIMIT)) {
          pinQuality ++;
        };

        if (selectedFilters[2] === 'any' || pinRooms === Number(selectedFilters[2])) {
          pinQuality ++;
        };

        if (selectedFilters[3] === 'any' || pinGuets === Number(selectedFilters[3])) {
          pinQuality ++;
        };

        if (selectedFeatures.length !== 0 && pinFeatures.length !== 0) {
          for (var j = 0; j < selectedFeatures.length; j++) {
            if (pinFeatures.includes(selectedFeatures[j])) {
              pinQuality ++;
            }
          }
        };

        if (pinQuality === (4 + selectedFeatures.length)) {
          filteredPins.push(newPins[i]);
        };

        if (filteredPins.length >= 5) {
          break;
        };
      }

      window.map.appendPin(filteredPins);
    }
  };

  mapForm.addEventListener('change', window.debounce(window.mapFilter.pinsFilter));

})();
