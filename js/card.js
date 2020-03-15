// -------------------------- Модуль по созданию/обновлению карточки обьявления

'use strict';
(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var offerTypeArray = ['any', 'palace', 'flat', 'house', 'bungalo'];
  var offerTypeArrayRus = ['Любой тип жилья', 'Дворец', 'Квартира', 'Дом', 'Бунгало'];

  window.getCard = function (advertisementArray, advNumber) {
    var copyCard = card.cloneNode(true);
    var cardImg = copyCard.querySelector('.popup__avatar');
    var cardPhotos = copyCard.querySelector('.popup__photos');

    // Заполнение полей

    copyCard.querySelector('.popup__title').textContent = advertisementArray[advNumber].offer.title;
    copyCard.querySelector('.popup__text--address').textContent = advertisementArray[advNumber].offer.address;

    if (advertisementArray[advNumber].offer.price === '' || advertisementArray[advNumber].offer.price === undefined) {
      copyCard.querySelector('.popup__text--price').textContent = '';
    } else {
      copyCard.querySelector('.popup__text--price').textContent = advertisementArray[advNumber].offer.price + ' ₽/ночь';
    }

    copyCard.querySelector('.popup__description').textContent = advertisementArray[advNumber].offer.description;

    // Заполнение поля type

    var fillType = function () {
      for (var i = 0; i < offerTypeArrayRus.length; i++) {
        if (advertisementArray[advNumber].offer.type === offerTypeArray[i]) {
          copyCard.querySelector('.popup__type').textContent = offerTypeArrayRus[i];
        }
      }
    };

    fillType();

    // Заполнение поля text-capacity

    if (advertisementArray[advNumber].offer.rooms === '' || advertisementArray[advNumber].offer.rooms === undefined || advertisementArray[advNumber].offer.guests === '' || advertisementArray[advNumber].offer.guests === undefined) {
      copyCard.querySelector('.popup__text--capacity').textContent = '';
    } else {
      copyCard.querySelector('.popup__text--capacity').textContent = advertisementArray[advNumber].offer.rooms + ' комнаты для ' + advertisementArray[advNumber].offer.guests + ' гостей';
    }

    // Заполнение поля text-time

    if (advertisementArray[advNumber].offer.checkin === '' || advertisementArray[advNumber].offer.checkin === undefined || advertisementArray[advNumber].offer.checkout === '' || advertisementArray[advNumber].offer.checkout === undefined) {
      copyCard.querySelector('.popup__text--time').textContent = '';
    } else {
      copyCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisementArray[advNumber].offer.checkin + ', выезд до ' + advertisementArray[advNumber].offer.checkout;
    }

    // Заполнение поля features

    var cardFeaturesArray = advertisementArray[advNumber].offer.features;
    var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var popupFeatures = copyCard.querySelector('.popup__features');
    var copyCardFetures = copyCard.querySelectorAll('.popup__feature');

    window.clear(popupFeatures);

    var fillFeatures = function () {
      if (cardFeaturesArray) {
        for (var i = 0; i < cardFeaturesArray.length; i++) {
          var featureNumber = featuresArray.indexOf(cardFeaturesArray[i]);
          popupFeatures.appendChild(copyCardFetures[featureNumber]);
        }
      } else {
        popupFeatures.textContent = '';
      }
    };

    fillFeatures();

    // Заполнение поля avatar

    cardImg.src = advertisementArray[advNumber].author.avatar;

    // Внутренняя функция для добавления фотографий в карточку. Заполнение поля photos

    var getCardPhotosList = function (photosArray) {
      window.clear(cardPhotos);
      if (photosArray.length !== 0) {
        for (var i = 0; i < photosArray.length; i++) {
          var newPhoto = document.createElement('img');
          newPhoto.width = 45;
          newPhoto.height = 45;
          newPhoto.alt = 'Фотография жилья';
          newPhoto.src = photosArray[i];
          newPhoto.classList.add('popup__photo');
          cardPhotos.appendChild(newPhoto);
        }
      }
    };

    if (advertisementArray[advNumber].offer.photos !== undefined) {
      getCardPhotosList(advertisementArray[advNumber].offer.photos);
    } else {
      window.clear(cardPhotos);
    }

    return copyCard;
  };

})();
