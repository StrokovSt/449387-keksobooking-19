'use strict';

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');

var actualWidth = mapSection.clientWidth;
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

var getOffer = function () {
  var offer = {};
  offer['title'] = titleArray[getRandomNumber(0, titleArray.length)];
  offer['address'] = 'Координаты: ' + getRandomNumber(1, 90, true) + ', ' + getRandomNumber(1, 90, true);
  offer['price'] = getRandomNumber(1000, 10000);
  offer['type'] = offerTypeArray[getRandomNumber(0, 4)];
  offer['rooms'] = getRandomNumber(0, 5);
  offer['guests'] = getRandomNumber(0, 10);
  offer['checkin'] = checkArray[getRandomNumber(0, 3)];
  offer['checkout'] = checkArray[getRandomNumber(0, 3)];
  offer['features'] = getFeaturessArray(getRandomNumber(0, 6));
  offer['description'] = "random description";
  offer['photos'] = "http://o0.github.io/assets/images/tokyo/hotel.jpg";
  return offer;
};

// Функция создания объекта - локации ('location')

var getLocation = function () {
  var location = {};
  location['x'] = getRandomNumber(25, actualWidth, true);
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
    advertisementArray[i]['offer'] = getOffer();
    advertisementArray[i]['location'] = getLocation();
  }
};

// Функция оздания DOM-элемента - пина объявления

var getPin = function (pinNumber) {
  var pinElement = pin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinElement.style = 'left: ' + (advertisementArray[pinNumber].location.x - 25) + 'px; top: ' + (advertisementArray[pinNumber].location.y - 70) + 'px;';
  pinImg.alt = advertisementArray[pinNumber].offer.title;
  pinImg.src = advertisementArray[pinNumber].autor.avatar;
  return pinElement;
};

// Функция добавления пина объявления

var pinAppend = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(getPin(i));
  }
  pinsList.appendChild(fragment);
};

constractCardssList();
pinAppend();
console.log(advertisementArray);
