'use strict';

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var card = document.querySelector('#card').content.querySelector('.map__card');
var pinsList = document.querySelector('.map__pins');
var filerContainer = document.querySelector('.map__filters-container');

var actualWidth = mapSection.clientWidth;
var MIN_HEIGHT = 130;
var MAX_HEIGHT = 630;

var offerTypeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkArray = ['12:00', '13:00', '14:00'];
var titleArray = ['Guest House', 'Anime Land', 'Bushido&sakura', 'Udonland', 'Ise Sueyoshi', 'NINJA SHINJUKU', 'Mugi no Oto'];

//  Вспомогательные функции

//  Функция генерации случайного числа

var getRandomNumber = function (min, max, bool) {
  if (bool) {
    return Math.random() * (max - min) + min;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция создания массива случайных неповторяющихся чисел

var getRandomNumbersArray = function (min, max) {
  var randomNumberArray = [];
  while (randomNumberArray.length < max - 1) {
    var randomNumber = getRandomNumber(min, max);
    if (randomNumberArray.indexOf(randomNumber) === -1) {
      randomNumberArray.push(randomNumber);
    }
  }
  return randomNumberArray;
};

//  Функция очистки списка

function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}

// Создание массива features случайной длины

var getFeaturessArray = function (userNumber) {
  var featuresArray = [];
  var randomArray = getRandomNumbersArray(0, userNumber + 1);
  var defaultFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  for (var i = 0; i < userNumber; i++) {
    featuresArray[i] = defaultFeaturesArray[randomArray[i]];
  }
  return featuresArray;
};

// Функция создания объекта - автора ('autor')

var getAutor = function (userNumber) {
  var avatar = {};
  avatar.avatar = ('img/avatars/user0' + userNumber + '.png');
  return avatar;
};

// Функция создания объекта - предложения ('offer')

var getOffer = function () {
  var offer = {};
  offer.title = titleArray[getRandomNumber(0, titleArray.length)];
  offer.address = 'Координаты: ' + getRandomNumber(1, 90, true) + ', ' + getRandomNumber(1, 90, true);
  offer.price = getRandomNumber(1000, 10000);
  offer.type = offerTypeArray[getRandomNumber(0, 4)];
  offer.rooms = getRandomNumber(1, 5);
  offer.guests = getRandomNumber(1, 10);
  offer.checkin = checkArray[getRandomNumber(0, 3)];
  offer.checkout = checkArray[getRandomNumber(0, 3)];
  offer.features = getFeaturessArray(getRandomNumber(0, 6));
  offer.description = 'Прекрасный отель в самом центре Токио. В номере две раздельных или одна большая кровать, ванная комната оборудована душевой кабиной,номер оснащен плазменной панелью со спутниковыми каналами';
  offer.photos = [
    'https://www.tripzaza.com/ru/destinations/files/2018/06/oteli-v-Tokio-5-zve--zd-e1528031563354.jpg', 'https://cdn.ostrovok.ru/t/640x400/content/9c/9c/9c9c607f135c3723b8d558a2550c80e81068363c.jpeg', 'https://www.orangesmile.com/hotel-slideshow/jp/-246227__45405.jpg'
  ];
  return offer;
};

// Функция создания объекта - локации ('location')

var getLocation = function () {
  var location = {};
  location.x = getRandomNumber(25, actualWidth, true);
  location.y = getRandomNumber(MIN_HEIGHT, MAX_HEIGHT, true);
  return location;
};

// Функция создания объявления

var constractCardssList = function () {
  var advertisementArray = [];
  var randomAvatarArray = getRandomNumbersArray(1, 9);
  for (var i = 0; i < 8; i++) {
    var cardInfo = {};
    cardInfo.autor = getAutor(randomAvatarArray[i]);
    cardInfo.offer = getOffer();
    cardInfo.location = getLocation();
    advertisementArray.push(cardInfo);
  }
  return advertisementArray;
};

// Функция оздания DOM-элемента - пина объявления

var getPin = function (advertisementArray, pinNumber) {
  var pinElement = pin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinElement.style = 'left: ' + (advertisementArray[pinNumber].location.x - 25) + 'px; top: ' + (advertisementArray[pinNumber].location.y - 70) + 'px;';
  pinImg.alt = advertisementArray[pinNumber].offer.title;
  pinImg.src = advertisementArray[pinNumber].autor.avatar;
  return pinElement;
};

// Функция оздания DOM-элемента - карточки объявления

var getCard = function (advertisementArray) {
  var cardElement = card.cloneNode(true);
  var cardImg = cardElement.querySelector('.popup__avatar');
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardPhoto = cardPhotos.querySelector('.popup__photo');

  // Заполнение поля title

  if (advertisementArray[0].offer.title === '' || advertisementArray[0].offer.title === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__title'));
  } else {
    cardElement.querySelector('.popup__title').textContent = advertisementArray[0].offer.title;
  }

  // Заполнение поля address

  if (advertisementArray[0].offer.address === '' || advertisementArray[0].offer.address === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__text--address'));
  } else {
    cardElement.querySelector('.popup__text--address').textContent = advertisementArray[0].offer.address;
  }

  // Заполнение поля price

  if (advertisementArray[0].offer.price === '' || advertisementArray[0].offer.price === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__text--price'));
  } else {
    cardElement.querySelector('.popup__text--price').textContent = advertisementArray[0].offer.price + ' ₽/ночь';
  }

  // Заполнение поля description

  if (advertisementArray[0].offer.description === '' || advertisementArray[0].offer.description === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__description'));
  } else {
    cardElement.querySelector('.popup__description').textContent = advertisementArray[0].offer.description;
  }

  // Заполнение поля type

  if (advertisementArray[0].offer.type === '' || advertisementArray[0].offer.type === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__type'));
  } else if (advertisementArray[0].offer.type === 'palace') {
    cardElement.querySelector('.popup__type').textContent = 'Дворец';
  } else if (advertisementArray[0].offer.type === 'flat') {
    cardElement.querySelector('.popup__type').textContent = 'Квартира';
  } else if (advertisementArray[0].offer.type === 'house') {
    cardElement.querySelector('.popup__type').textContent = 'Дом';
  } else {
    cardElement.querySelector('.popup__type').textContent = 'Бунгало';
  }

  // Заполнение поля text-capacity

  if (advertisementArray[0].offer.rooms === '' || advertisementArray[0].offer.rooms === undefined || advertisementArray[0].offer.guests === '' || advertisementArray[0].offer.guests === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__text--capacity'));
  } else {
    cardElement.querySelector('.popup__text--capacity').textContent = advertisementArray[0].offer.rooms + ' комнаты для ' + advertisementArray[0].offer.guests + ' гостей';
  }

  // Заполнение поля text-time

  if (advertisementArray[0].offer.checkin === '' || advertisementArray[0].offer.checkin === undefined || advertisementArray[0].offer.checkout === '' || advertisementArray[0].offer.checkout === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__text--time'));
  } else {
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisementArray[0].offer.checkin + ', выезд до ' + advertisementArray[0].offer.checkout;
  }

  // Заполнение поля features

  var cardFeaturesArray = advertisementArray[0].offer.features;
  if (cardFeaturesArray === '' || cardFeaturesArray === undefined) {
    cardElement.removeChild(cardElement.querySelector('.popup__features'));
  }
  if (cardFeaturesArray.indexOf('wifi') !== -1) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--wifi'));
  }
  if (cardFeaturesArray.indexOf('dishwasher') !== -1) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--dishwasher'));
  }
  if (cardFeaturesArray.indexOf('parking') !== -1) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--parking'));
  }
  if (cardFeaturesArray.indexOf('washer') !== -1) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--washer'));
  }
  if (cardFeaturesArray.indexOf('elevator') !== -1) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--elevator'));
  }
  if (cardFeaturesArray.indexOf('conditioner') !== -1) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--conditioner'));
  }

  // Заполнение поля avatar

  cardImg.src = advertisementArray[0].autor.avatar;


  // Внутренняя функция для добавления фотографий в карточку

  var getCardPhotosList = function (photosArray) {
    clear(cardPhotos);
    for (var i = 0; i < photosArray.length; i++) {
      var newPhoto = cardPhoto.cloneNode(true);
      newPhoto.src = photosArray[i];
      cardPhotos.appendChild(newPhoto);
    }
  };

  // Заполнение поля photos

  getCardPhotosList(advertisementArray[0].offer.photos);

  return cardElement;
};

// Функция добавления пина объявления

var pinAppend = function (advertisementArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(getPin(advertisementArray, i));
  }
  pinsList.appendChild(fragment);
};

// Функция добавления карточки объявления

var cardAppend = function (advertisementArray) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCard(advertisementArray));
  mapSection.insertBefore(fragment, filerContainer);
};

pinAppend(constractCardssList());
cardAppend(constractCardssList());
