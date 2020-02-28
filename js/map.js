// -------------------------- Модуль для заполнения карты

'use strict';
(function () {
  var mapSection = document.querySelector('.map');
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var pinsList = document.querySelector('.map__pins');
  var filerContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var pinsArray = document.getElementsByClassName('map__pin');
  var fieldsetList = document.querySelector('.ad-form');
  var mapFilterList = document.querySelector('.map__filters');
  var address = document.querySelector('#address');
  var pinWidth = mainPin.clientWidth;
  var mainPinLeft = mainPin.offsetLeft;
  var mainPinTop = mainPin.offsetTop;
  var ESC_KEY = 'Escape';
  var pinsNumber = 8;

  // Функция добавления пина объявления

  var pinAppend = function (advertisementArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsNumber; i++) {
      fragment.appendChild(window.getPin(advertisementArray, i));
    }
    pinsList.appendChild(fragment);
  };

  // Функция добавления карточки объявления

  var cardAppend = function (advertisementArray, advNumber) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.getCard(advertisementArray, advNumber, card.cloneNode(true)));
    mapSection.insertBefore(fragment, filerContainer);
  };

  var mapActive = function () {
    address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + mainPinTop;
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
    realCard[0].classList.add('visually-hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onSecondPinClick = function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
      var targetClass = Number(target.classList[1]);
      for (var i = 0; i < pinsNumber; i++) {
        if (targetClass === i) {
          window.getCard(window.cardsList, i, realCard[0]);
          realCard[0].classList.remove('visually-hidden');
          document.addEventListener('keydown', onPopupEscPress);
        }
      }
    }
  };

  window.cardsList = window.constractCardssList();
  pinAppend(window.cardsList);
  cardAppend(window.cardsList, 0);
  var realCard = mapSection.getElementsByTagName('article');
  var popupCloseButton = realCard[0].querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
  pinsList.addEventListener('click', onSecondPinClick);

})();
