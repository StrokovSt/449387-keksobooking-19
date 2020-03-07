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

  var ESC_KEY = 'Escape';


  // Функция добавления пина объявления

  var pinAppend = function (advertisementArray) {
    newArray = advertisementArray;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisementArray.length; i++) {
      fragment.appendChild(window.getPin(advertisementArray, i));
    }
    pinsList.appendChild(fragment);
  };

  window.load(pinAppend, window.errorPush);

  // Функция добавления карточки объявления

  var cardAppend = function (advertisementArray, advNumber) {
    var realCard = document.querySelector('.map__card');
    if (realCard) {
      mapSection.removeChild(realCard);
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.getCard(advertisementArray, advNumber));
    mapSection.insertBefore(fragment, filerContainer);

    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', closePopup);
  };

  var mapActive = function () {
    window.deleteDisabled(fieldsetList);
    window.deleteDisabled(mapFilterList);
    fieldsetList.classList.remove('ad-form--disabled');
    mapSection.classList.remove('map--faded');

    for (var i = 1; i < pinsArray.length; i++) {
      pinsArray[i].classList.remove('visually-hidden');
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      mapActive();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      mapActive();
    }
  });

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var closePopup = function () {
    var realCard = document.querySelector('.map__card');
    mapSection.removeChild(realCard);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onSecondPinClick = function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
      var targetClass = Number(target.classList[1]);
      for (var i = 0; i < newArray.length; i++) {
        if (targetClass === i) {
          cardAppend(newArray, i);
          document.addEventListener('keydown', onPopupEscPress);
        }
      }
    }
  };

  pinsList.addEventListener('click', onSecondPinClick);
})();
