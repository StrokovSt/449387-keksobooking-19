// -------------------------- Модуль для фильтра пинов

'use strict';
(function () {
  var mapForm = document.querySelector('.map__filters');
  var housFeatures = document.querySelector('#housing-features');
  var housFeaturesInputs = housFeatures.getElementsByTagName('input');

  var offerHouseType = {
    offerElement: document.querySelector('#housing-type'),
    offerArray: ['any', 'palace', 'flat', 'house', 'bungalo'],
    offerNumber: 0
  };

  var offerHousePrice = {
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

  var offerFormArray = [offerHouseType, offerHousePrice, offerRooms, offerGuests];
  var pinArray = [];

  // -------------------------- Успешная загрузка данных

  var succsesHandler = function (data) {
    pinArray = data;
    window.pinAppend(pinArray);
  };

  // -------------------------- Функция отвечающая за

  var houseTypeFilter = function () {
    var newPinArray = pinArray;
    window.closePopup();

    var pinsList = document.getElementsByClassName('second-pin');
    while (pinsList[0]) {
      pinsList[0].remove();
    }

    var offerFilter = function (obj) {
      var offerElement = obj.offerElement;
      var offerArray = obj.offerArray;
      var offerOptionSelected = offerArray[offerElement.selectedIndex];

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


      if (offerOptionSelected !== offerArray[0]) {
        newPinArray = newPinArray.filter(offerSwitcherArray[obj.offerNumber]);
      } else {
        newPinArray = newPinArray;
      }
      return newPinArray;
    };

    var offerFeaturesFilter = function () {
      for (var i = 0; i < housFeaturesInputs.length; i++) {
        if (housFeaturesInputs[i].checked) {
          var meow = housFeaturesInputs[i].value;
          newPinArray = newPinArray.filter(function (feature) {
            return feature.offer.features.indexOf(meow) !== -1;
          });
        }
      }
    };

    offerFeaturesFilter();

    offerFormArray.forEach(offerFilter);
    window.pinAppend(newPinArray);
    window.removePinsHiddenClass();
  };

  window.load(succsesHandler, window.errorPush);

  mapForm.addEventListener('change', window.debounce(houseTypeFilter));
})();
