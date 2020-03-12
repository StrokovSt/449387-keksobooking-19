// -------------------------- Модуль для фильтра пинов
'use strict';
(function () {
  var mapForm = document.querySelector('.map__filters');
  var housType = document.querySelector('#housing-type');
  //  var housPrice = document.querySelector('#housing-price');
  //  var housRooms = document.querySelector('#housing-rooms');
  //  var housGuests = document.querySelector('#housing-guests');
  //  var housFeatures = document.querySelector('#housing-features');

  var offerTypeArray = ['any', 'palace', 'flat', 'house', 'bungalo'];
  var pinArray = [];

  var succsesHandler = function (data) {
    pinArray = data;
    window.pinAppend(pinArray);
  };

  window.houseTypeFilter = function () {
    window.closePopup();

    var pinsList = document.getElementsByClassName('second-pin');
    while (pinsList[0]) {
      pinsList[0].remove();
    }

    var housTypeSelected = offerTypeArray[housType.selectedIndex];
    var newPinArray;

    if (housTypeSelected !== offerTypeArray[0]) {
      newPinArray = pinArray.filter(function (house) {
        return house.offer.type === housTypeSelected;
      });
    } else {
      newPinArray = pinArray;
    }

    window.pinAppend(newPinArray);
    window.removePinsHiddenClass();
  };

  window.load(succsesHandler, window.errorPush);

  mapForm.addEventListener('change', window.houseTypeFilter);

})();
