// -------------------------- Модуль по созданию/обновлению карточки обьявления

'use strict';
(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var OFFER_TYPES = ['any', 'palace', 'flat', 'house', 'bungalo'];
  var OFFER_RUS_TYPES = ['Любой тип жилья', 'Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var BASIC_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.getCard = function (takenPins, advNumber) {
    var cardClone = card.cloneNode(true);
    var cardImg = cardClone.querySelector('.popup__avatar');
    var cardPhoto = cardClone.querySelector('.popup__photos');
    var cardFeaturesBlock = cardClone.querySelector('.popup__features');
    var cardCloneFetures = cardClone.querySelectorAll('.popup__feature');
    var cardNewFeatures = takenPins[advNumber].offer.features;

    // Заполнение полей

    var getTitle = function (offerTitle) {
      return (offerTitle === '' || offerTitle === undefined) ? (cardClone.querySelector('.popup__title').style.display = 'none') : (cardClone.querySelector('.popup__title').textContent = offerTitle);
    };

    getTitle(takenPins[advNumber].offer.title);

    var getAddress = function (offerAdress) {
      return (offerAdress === '' || offerAdress === undefined) ?
        (cardClone.querySelector('.popup__text--address').style.display = 'none') : (cardClone.querySelector('.popup__text--address').textContent = offerAdress);
    };

    getAddress(takenPins[advNumber].offer.address);

    var getPrice = function (offerPrice) {
      return (offerPrice === '' || offerPrice === undefined) ?
        (cardClone.querySelector('.popup__text--price').style.display = 'none') : (cardClone.querySelector('.popup__text--price').textContent = offerPrice + ' ₽/ночь');
    };

    getPrice(takenPins[advNumber].offer.price);

    var getDescription = function (offerDescription) {
      return (offerDescription === '' || offerDescription === undefined) ?
        (cardClone.querySelector('.popup__description').style.display = 'none') : (cardClone.querySelector('.popup__description').textContent = offerDescription);
    };

    getDescription(takenPins[advNumber].offer.description);

    // Заполнение поля type

    var fillType = function () {
      for (var i = 0; i < OFFER_RUS_TYPES.length; i++) {
        if (takenPins[advNumber].offer.type === OFFER_TYPES[i]) {
          cardClone.querySelector('.popup__type').textContent = OFFER_RUS_TYPES[i];
          break;
        }
      }
    };

    fillType();

    // Заполнение поля text-capacity

    var getRoomsAndGuests = function (offerRooms, offerGuests) {
      return (offerRooms === '' || offerRooms === undefined || offerGuests === '' || offerGuests === undefined) ?
        (cardClone.querySelector('.popup__text--capacity').style.display = 'none') :
        (cardClone.querySelector('.popup__text--capacity').textContent = offerRooms + ' комнаты для ' + offerGuests + ' гостей');
    };

    getRoomsAndGuests(takenPins[advNumber].offer.rooms, takenPins[advNumber].offer.guests);

    // Заполнение поля text-time

    var getCheckinAndCheckout = function (offerCheckin, offerCheckout) {
      return (offerCheckin === '' || offerCheckin === undefined || offerCheckout === '' || offerCheckout === undefined) ?
        (cardClone.querySelector('.popup__text--time').style.display = 'none') :
        (cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCheckin + ', выезд до ' + offerCheckout);
    };

    getCheckinAndCheckout(takenPins[advNumber].offer.checkin, takenPins[advNumber].offer.checkout);

    // Заполнение поля features

    window.supportingModule.clear(cardFeaturesBlock);

    var fillFeatures = function () {
      if (cardNewFeatures.length !== 0) {
        for (var i = 0; i < cardNewFeatures.length; i++) {
          var featureNumber = BASIC_FEATURES.indexOf(cardNewFeatures[i]);
          cardFeaturesBlock.appendChild(cardCloneFetures[featureNumber]);
        }
      } else {
        cardFeaturesBlock.style.display = 'none';
      }
    };

    fillFeatures();

    // Заполнение поля avatar

    cardImg.src = takenPins[advNumber].author.avatar;

    // Внутренняя функция для добавления фотографий в карточку. Заполнение поля photos

    var getcardPhotoList = function (photos) {
      window.supportingModule.clear(cardPhoto);
      if (photos.length !== 0) {
        for (var i = 0; i < photos.length; i++) {
          var newPhoto = document.createElement('img');
          newPhoto.width = 45;
          newPhoto.height = 45;
          newPhoto.alt = 'Фотография жилья';
          newPhoto.src = photos[i];
          newPhoto.classList.add('popup__photo');
          cardPhoto.appendChild(newPhoto);
        }
      }
    };

    if (takenPins[advNumber].offer.photos !== undefined) {
      getcardPhotoList(takenPins[advNumber].offer.photos);
    } else {
      window.supportingModule.clear(cardPhoto);
    }

    return cardClone;
  };

})();
