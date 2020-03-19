// -------------------------- Модуль для фильтра пинов

'use strict';
(function () {
  var mapForm = document.querySelector('.map__filters');
  var features = document.querySelector('#housing-features');
  var featuresInputArray = features.getElementsByTagName('input');

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

  var offerFormArray = [offerType, offerPrice, offerRooms, offerGuests];
  var pinArray = [];

  // -------------------------- callback для успешной загрузки данных

  var onSuccsessfulDataTake = function (data) {
    pinArray = data;
    window.map.appendPin(pinArray);
  };

  // -------------------------- Функция отвечающая за фильтрацию пинов на карте

  window.houseTypeFilter = function () {
    var filteredPinArray = pinArray;
    window.map.closePopup();

    var pinsList = document.getElementsByClassName('second-pin');
    while (pinsList[0]) {
      pinsList[0].remove();
    }

    var offerFilter = function (obj) {
      var offerElement = obj.offerElement;
      var offerArray = obj.offerArray;
      var offerOptionSelected = offerArray[offerElement.selectedIndex];

      // -------------------------- функции для каждого селекта

      var offerTypeSwitcher = function (objType) {
        if (objType.offer.type === offerOptionSelected) {
          return true;
        }
        return false;
      };

      var offerPriceSwitcher = function (objPrice) {
        var LOWER_PRICE_LIMIT = 10000;
        var UPPER_PRICE_LIMIT = 50000;

        var housePrice = objPrice.offer.price;
        switch (offerOptionSelected) {
          case offerArray[1]:
            if (housePrice >= LOWER_PRICE_LIMIT && housePrice <= UPPER_PRICE_LIMIT) {
              return true;
            } else {
              return false;
            }
          case offerArray[2]:
            if (housePrice < LOWER_PRICE_LIMIT) {
              return true;
            } else {
              return false;
            }
          case offerArray[3]:
            if (housePrice > UPPER_PRICE_LIMIT) {
              return true;
            } else {
              return false;
            }
        }
        return false;
      };

      var offerRoomsSwitcher = function (objRooms) {
        if (objRooms.offer.rooms === Number(offerOptionSelected)) {
          return true;
        }
        return false;
      };

      var offerGuestsSwitcher = function (objGuests) {
        if (objGuests.offer.guests === Number(offerOptionSelected)) {
          return true;
        }
        return false;
      };

      var offerSwitcherArray = [offerTypeSwitcher, offerPriceSwitcher, offerRoomsSwitcher, offerGuestsSwitcher];

      // -------------------------- фильтрация списка пинов по селектам

      if (offerOptionSelected !== offerArray[0]) {
        filteredPinArray = filteredPinArray.filter(offerSwitcherArray[obj.offerNumber]);
      } else {
        filteredPinArray = filteredPinArray;
      }
      return filteredPinArray;
    };

    // -------------------------- фильтрация списка пинов по филдсету features

    var offerFeaturesFilter = function () {
      for (var i = 0; i < featuresInputArray.length; i++) {
        if (featuresInputArray[i].checked) {
          var inputValue = featuresInputArray[i].value;
          filteredPinArray = filteredPinArray.filter(function (feature) {
            return feature.offer.features.indexOf(inputValue) !== -1;
          });
        }
      }
    };

    offerFeaturesFilter();
    offerFormArray.forEach(offerFilter);
    window.map.appendPin(filteredPinArray);
    window.pin.removePinsHiddenClass();
  };

  window.backend.load(onSuccsessfulDataTake, window.popup.pushErrorPopup);
  mapForm.addEventListener('change', window.debounce(window.houseTypeFilter));

})();
