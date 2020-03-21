// -------------------------- Модуль для заполнения карты

'use strict';
(function () {
  var mapSection = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');
  var filerContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var pinsArray = document.getElementsByClassName('map__pin');
  var fieldsetList = document.querySelector('.ad-form');
  var mapFilterList = document.querySelector('.map__filters');
  var newArray;

  // Функции общего доступа модуля map

  window.map = {

    // Функции добавления пинов на карту

    appendPin: function (advertisementArray) {
      newArray = advertisementArray;
      var pinNumber = advertisementArray.length > 5 ? 5 : advertisementArray.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pinNumber; i++) {
        fragment.appendChild(window.pin.getPinElement(advertisementArray, i));
      }
      pinsList.appendChild(fragment);
    },

    // Функции деактивации карты

    deactivateMap: function () {
      window.form.setDisabled(fieldsetList);
      window.form.setDisabled(mapFilterList);
      fieldsetList.classList.add('ad-form--disabled');
      mapSection.classList.add('map--faded');

      for (var i = 1; i < pinsArray.length; i++) {
        pinsArray[i].classList.add('visually-hidden');
      }
    },

    // Функции закрытия карточки пина

    closePopup: function () {
      var realCard = document.querySelector('.map__card');
      if (realCard) {
        cleanPinClassList();
        mapSection.removeChild(realCard);
        document.removeEventListener('keydown', onPopupEscPress);
      }
    }
  };

  // Функция добавления карточки объявления

  var appendCard = function (advertisementArray, advNumber) {
    var realCard = document.querySelector('.map__card');
    if (realCard) {
      mapSection.removeChild(realCard);
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.getCard(advertisementArray, advNumber));
    mapSection.insertBefore(fragment, filerContainer);

    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', window.map.closePopup);
  };

  var activateMap = function () {
    for (var i = 1; i < pinsArray.length; i++) {
      pinsArray[i].classList.remove('visually-hidden');
    }

    mapSection.classList.remove('map--faded');
    window.form.deleteDisabled(fieldsetList);
    fieldsetList.classList.remove('ad-form--disabled');
    window.form.deleteDisabled(mapFilterList);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    window.util.leftClickEvent(evt, activateMap);
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.enterEvent(evt, activateMap);
  });

  var onPopupEscPress = function (evt) {
    window.util.escEvent(evt, window.map.closePopup);
  };

  var cleanPinClassList = function () {
    var secondPinsArray = pinsList.getElementsByClassName('second-pin');
    var realsecondPinsArray = Array.from(secondPinsArray);

    realsecondPinsArray.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var onSecondPinClick = function (evt) {
    var secondPinsArray = pinsList.getElementsByClassName('second-pin');
    var realsecondPinsArray = Array.from(secondPinsArray);

    var target = evt.target;
    if (target.classList[2] === 'second-pin' || target.classList[0] === 'pin__avatar') {
      var targetClass = Number(target.classList[1]);

      realsecondPinsArray.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });

      if (newArray) {
        for (var i = 0; i < newArray.length; i++) {
          if (targetClass === i) {
            secondPinsArray[i].classList.add('map__pin--active');
            appendCard(newArray, i);
            document.addEventListener('keydown', onPopupEscPress);
          }
        }
      }
    }
  };

  pinsList.addEventListener('click', onSecondPinClick);

})();
