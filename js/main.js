'use strict';

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');

var actualWidth = document.body.clientWidth;
var MIN_HEIGHT = 130;
var MAX_HEIGHT = 630;
var advertisementArray = [];
var offerTypeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkArray = ['12:00', '13:00', '14:00'];
var titleArray = ['Guest House', 'Anime Land', 'Bushido&sakura', 'Udonland', 'Ise Sueyoshi', 'NINJA SHINJUKU', 'Mugi no Oto'];

//  Функции

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

// Вспомогательная функция - создание массива features случайной длины

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
  avatar['avatar'] = ('img/avatars/user0' + userNumber + '.png');
  return avatar;
};

// Функция создания объекта - предложения ('offer')

var getOffer = function (offerTitle, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, offerDescription, offerPhotos) {
  var offer = {};
  offer['title'] = offerTitle;
  offer['address'] = 'Координаты: ' + getRandomNumber(1, 90, true) + ', ' + getRandomNumber(1, 90, true);
  offer['price'] = offerPrice;
  offer['type'] = offerType;
  offer['rooms'] = offerRooms;
  offer['guests'] = offerGuests;
  offer['checkin'] = offerCheckin;
  offer['checkout'] = offerCheckout;
  offer['features'] = getFeaturessArray(offerFeatures);
  offer['description'] = offerDescription;
  offer['photos'] = offerPhotos;
  return offer;
};

// Функция создания объекта - локации ('location')

var getLocation = function () {
  var location = {};
  location['x'] = getRandomNumber(0, actualWidth, true);
  location['y'] = getRandomNumber(MIN_HEIGHT, MAX_HEIGHT, true);
  return location;
};

// Функция создания объявления

var constractCardssList = function () {
  var randomAvatarArray = getRandomNumbersArray(1, 9);
  for (var i = 0; i < 8; i++) {
    var card = {};
    advertisementArray.push(card);
    advertisementArray[i]['autor'] = getAutor(randomAvatarArray[i]);
    advertisementArray[i]['offer'] = getOffer(titleArray[getRandomNumber(0, titleArray.length)], getRandomNumber(1000, 10000), offerTypeArray[getRandomNumber(0, 4)], getRandomNumber(0, 5), getRandomNumber(0, 15), checkArray[getRandomNumber(0, 3)], checkArray[getRandomNumber(0, 3)], getRandomNumber(0, 6));
    advertisementArray[i]['location'] = getLocation();
  }
};

// Функция оздания DOM-элемента - пина объявления

var getPin = function (pinNumber) {
  var pinElement = pin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinElement.style = 'left: ' + advertisementArray[pinNumber].location.x + 'px; top: ' + advertisementArray[pinNumber].location.y + 'px;';
  pinImg.alt = advertisementArray[pinNumber].offer.title;
  pinImg.src = advertisementArray[pinNumber].autor.avatar;
  return pinElement;
};

// Функция добавления пина объявления

var pinAppend = function () {
  for (var i = 0; i < 8; i++) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getPin(i));
    pinsList.appendChild(fragment);
  }
};

constractCardssList();
pinAppend();
