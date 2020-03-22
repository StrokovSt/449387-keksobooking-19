// -------------------------- Модуль для заполнения карты

'use strict';
(function () {
  var mapSection = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');
  var filerContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var includedPins = document.getElementsByClassName('map__pin');
  var fieldsetList = document.querySelector('.ad-form');
  var mapFilterList = document.querySelector('.map__filters');
  var updatedPins;
  var PINS_MAX_LENGTH = 5;

  // Функции общего доступа модуля map

  window.map = {

    // Функции добавления пинов на карту

    appendPin: function (similarPins) {
      updatedPins = similarPins;
      var pinNumber = similarPins.length > PINS_MAX_LENGTH ? PINS_MAX_LENGTH : similarPins.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pinNumber; i++) {
        fragment.appendChild(window.pin.getPinElement(similarPins, i));
      }
      pinsList.appendChild(fragment);
    },

    // Функции деактивации карты

    deactivateMap: function () {
      window.form.setDisabled(fieldsetList);
      window.form.setDisabled(mapFilterList);
      fieldsetList.classList.add('ad-form--disabled');
      mapSection.classList.add('map--faded');

      for (var i = 1; i < includedPins.length; i++) {
        includedPins[i].classList.add('visually-hidden');
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

  var appendCard = function (similarPins, advNumber) {
    var realCard = document.querySelector('.map__card');
    if (realCard) {
      mapSection.removeChild(realCard);
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.getCard(similarPins, advNumber));
    mapSection.insertBefore(fragment, filerContainer);

    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', window.map.closePopup);
  };

  var activateMap = function () {
    if (mapSection.classList.contains('map--faded')) {
      mapSection.classList.remove('map--faded');
      fieldsetList.classList.remove('ad-form--disabled');
      window.backend.load(window.mapFilter.onSuccsessfulDataTake, window.popup.pushError);
    }
    window.form.deleteDisabled(fieldsetList);
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
    var secondaryPins = pinsList.getElementsByClassName('second-pin');
    var realSecondaryPins = Array.from(secondaryPins);
    var activePins = realSecondaryPins.filter(function (pin) {
      return pin.classList.contains('map__pin--active') ? true : false;
    });
    if (activePins.length !== 0) {
      activePins[0].classList.remove('map__pin--active');
    }
  };

  var onSecondPinClick = function (evt) {
    var secondaryPins = pinsList.getElementsByClassName('second-pin');
    var target = evt.target;

    if (target.classList[2] === 'second-pin' || target.classList[0] === 'pin__avatar') {
      var targetClass = Number(target.classList[1]);
      cleanPinClassList();
      if (updatedPins) {
        for (var i = 0; i < updatedPins.length; i++) {
          if (targetClass === i) {
            secondaryPins[i].classList.add('map__pin--active');
            appendCard(updatedPins, i);
            document.addEventListener('keydown', onPopupEscPress);
            break;
          }
        }
      }
    }
  };

  pinsList.addEventListener('click', onSecondPinClick);

})();
