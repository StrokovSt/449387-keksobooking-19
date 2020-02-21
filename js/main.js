'use strict';

var mapSection = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var card = document.querySelector('#card').content.querySelector('.map__card');
var pinsList = document.querySelector('.map__pins');
var pinsArray = document.getElementsByClassName('map__pin');
var filerContainer = document.querySelector('.map__filters-container');
var fieldsetList = document.querySelector('.ad-form');
var mapFilterList = document.querySelector('.map__filters');
var address = document.querySelector('#address');
var price = document.querySelector('#price');
var type = document.querySelector('#type');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityClone = capacity.cloneNode(true);

var actualWidth = mapSection.clientWidth;
var pinWidth = mainPin.clientWidth;
var pinHeight = mainPin.clientHeight;
var mainPinLeft = mainPin.offsetLeft;
var mainPinTop = mainPin.offsetTop;
var MIN_HEIGHT = 130;
var MAX_HEIGHT = 630;
var pinsNumber = 8;
var ESC_KEY = 'Escape';

var offerTypeArray = ['palace', 'flat', 'house', 'bungalo'];
var offerTypeArrayRus = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var checkArray = ['12:00', '13:00', '14:00'];
var titleArray = ['Guest House', 'Anime Land', 'Bushido&sakura', 'Udonland', 'Ise Sueyoshi', 'NINJA SHINJUKU', 'Mugi no Oto'];
var defaultFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = [
  'https://www.tripzaza.com/ru/destinations/files/2018/06/oteli-v-Tokio-5-zve--zd-e1528031563354.jpg', 'https://cdn.ostrovok.ru/t/640x400/content/9c/9c/9c9c607f135c3723b8d558a2550c80e81068363c.jpeg', 'https://www.orangesmile.com/hotel-slideshow/jp/-246227__45405.jpg',
  'https://pix10.agoda.net/hotelImages/240/240563/240563_17062714500054091427.jpg?s=1024x768',
  'https://r-cf.bstatic.com/images/hotel/max1024x768/193/193427930.jpg'
];
var offerDescription = ['Курортный отель APA Nishishinjuku-Gochome-Eki Tower расположен в Токио. К услугам       гостей бесплатный Wi-Fi.',

  'Капсульный отель First Cabin Tsukiji отлично расположен всего в 1 минуте ходьбы от станции метро Tsukiji и в 5 минутах ходьбы от популярного рыбного рынка Цукидзи.',

  'Отель LANDABOUT TOKYO с рестораном, баром, общим лаунджем и бесплатным Wi-Fi расположен в Токио, в 400 м от храма Кеммио-ин и в 600 м от храма Шуншо-ин.',

  'Отель Shinagawa Prince East Tower с видом на город расположен в Токио, в 3,7 км от телевизионной башни Токио.',

  'Отель Sotetsu Fresa Inn Nihombashi Kayabacho. Номера с бесплатным проводным доступом в интернет лаконично оформлены в западном стиле.'];

//  --------------------------------------Загрузка и заполнение страницы

//  Функция добавления атрибута disabled

var setDisabled = function (fieldsetArray) {
  for (var i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].setAttribute('disabled', true);
  }
};

//  Функция удаления атрибута disabled

var deleteDisabled = function (fieldsetArray) {
  for (var i = 0; i < fieldsetArray.length; i++) {
    if (fieldsetArray[i].hasAttribute('disabled')) { // нужна ли эта проверка?
      fieldsetArray[i].removeAttribute('disabled');
    }
  }
};

setDisabled(fieldsetList);
setDisabled(mapFilterList);

//  Заполнение форм

address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + (mainPinTop + Math.round(pinHeight / 2));

//  Функция изменения атрибута rice.min и смене значений в селекте type

var onTypeChange = function () {
  if (type.value === 'bungalo') {
    price.min = 0;
    price.placeholder = 0;
  } else if (type.value === 'flat') {
    price.min = 1000;
    price.placeholder = 1000;
  } else if (type.value === 'house') {
    price.min = 5000;
    price.placeholder = 5000;
  } else if (type.value === 'palace') {
    price.min = 10000;
    price.placeholder = 10000;
  }
};

onTypeChange();
type.addEventListener('change', onTypeChange);

//  Функция синхронизации timein.value и timeout.value

var onTimeinChange = function () {
  var changer = timein.value;
  timeout.value = changer;
};

var onTimeoutChange = function () {
  var changer = timeout.value;
  timein.value = changer;
};

timein.addEventListener('change', onTimeinChange);
timeout.addEventListener('change', onTimeoutChange);

//  Функция очистки списка

function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}

//  Функция заполнения селекта capacity

var getCapacityList = function (min, max) {
  clear(capacity);
  for (var i = min; i < max; i++) {
    var capacityCloneOption = capacityClone[i].cloneNode(true);
    capacityCloneOption.removeAttribute('selected');
    capacity.insertBefore(capacityCloneOption, capacity[0]);
  }
  capacity[0].setAttribute('selected', true);
};

//  Функция синхронизации параметров roomNUmber и capacity

var onRoomNumberChange = function () {
  if (roomNumber.value === '1') {
    getCapacityList(2, 3);
  } else if (roomNumber.value === '2') {
    getCapacityList(1, 3);
  } else if (roomNumber.value === '3') {
    getCapacityList(0, 3);
  } else if (roomNumber.value === '100') {
    getCapacityList(3, 4);
  }
};

getCapacityList(2, 3);
roomNumber.addEventListener('change', onRoomNumberChange);


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

// Создание случайных массивов

var getRandomArray = function (userNumber, chosenArray) {
  var newRandomArray = [];
  var randomArray = getRandomNumbersArray(0, userNumber + 1);
  for (var i = 0; i < userNumber; i++) {
    newRandomArray[i] = chosenArray[randomArray[i]];
  }
  return newRandomArray;
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
  offer.features = getRandomArray(getRandomNumber(0, defaultFeaturesArray.length), defaultFeaturesArray);
  offer.description = offerDescription[getRandomNumber(0, offerDescription.length)];
  offer.photos = getRandomArray(getRandomNumber(0, offerPhotos.length), offerPhotos);
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
  for (var i = 0; i < pinsNumber; i++) {
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
  pinElement.classList.add('visually-hidden');
  pinElement.classList.add(pinNumber);
  pinElement.classList.add('second-pin');
  pinImg.classList.add('pin__avatar');
  pinImg.classList.add(pinNumber);
  return pinElement;
};

// -----------------------------------Функция оздания/изменения DOM-элемента - карточки объявления

var getCard = function (advertisementArray, advNumber, cardElement) {
  var copyCard = card.cloneNode(true);
  var cardImg = cardElement.querySelector('.popup__avatar');
  var cardPhotos = cardElement.querySelector('.popup__photos');

  // Заполнение полей

  cardElement.querySelector('.popup__title').textContent = advertisementArray[advNumber].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisementArray[advNumber].offer.address;

  if (advertisementArray[advNumber].offer.price === '' || advertisementArray[advNumber].offer.price === undefined) {
    cardElement.querySelector('.popup__text--price').textContent = '';
  } else {
    cardElement.querySelector('.popup__text--price').textContent = advertisementArray[advNumber].offer.price + ' ₽/ночь';
  }

  cardElement.querySelector('.popup__description').textContent = advertisementArray[advNumber].offer.description;

  // Заполнение поля type

  var fillType = function () {
    for (var i = 0; i < offerTypeArrayRus.length; i++) {
      if (advertisementArray[advNumber].offer.type === offerTypeArray[i]) {
        cardElement.querySelector('.popup__type').textContent = offerTypeArrayRus[i];
      }
    }
  };

  fillType();

  // Заполнение поля text-capacity

  if (advertisementArray[advNumber].offer.rooms === '' || advertisementArray[advNumber].offer.rooms === undefined || advertisementArray[advNumber].offer.guests === '' || advertisementArray[advNumber].offer.guests === undefined) {
    cardElement.querySelector('.popup__text--capacity').textContent = '';
  } else {
    cardElement.querySelector('.popup__text--capacity').textContent = advertisementArray[advNumber].offer.rooms + ' комнаты для ' + advertisementArray[advNumber].offer.guests + ' гостей';
  }

  // Заполнение поля text-time

  if (advertisementArray[advNumber].offer.checkin === '' || advertisementArray[advNumber].offer.checkin === undefined || advertisementArray[advNumber].offer.checkout === '' || advertisementArray[advNumber].offer.checkout === undefined) {
    cardElement.querySelector('.popup__text--time').textContent = '';
  } else {
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisementArray[advNumber].offer.checkin + ', выезд до ' + advertisementArray[advNumber].offer.checkout;
  }

  // Заполнение поля features

  var cardFeaturesArray = advertisementArray[advNumber].offer.features;
  var popupFeatures = cardElement.querySelector('.popup__features');
  var copyCardFetures = copyCard.querySelectorAll('.popup__feature');

  clear(popupFeatures);

  var fillFeatures = function () {
    if (cardFeaturesArray) {
      for (var i = 0; i < cardFeaturesArray.length; i++) {
        popupFeatures.appendChild(copyCardFetures[i]);
      }
    } else {
      popupFeatures.textContent = '';
    }
  };

  fillFeatures();

  // Заполнение поля avatar

  cardImg.src = advertisementArray[advNumber].autor.avatar;

  // Внутренняя функция для добавления фотографий в карточку. Заполнение поля photos

  var getCardPhotosList = function (photosArray) {
    clear(cardPhotos);
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
    clear(cardPhotos);
  }

  cardElement.classList.add('visually-hidden');
  return cardElement;
};

// Функция добавления пина объявления

var pinAppend = function (advertisementArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsNumber; i++) {
    fragment.appendChild(getPin(advertisementArray, i));
  }
  pinsList.appendChild(fragment);
};

// Функция добавления карточки объявления

var cardAppend = function (advertisementArray, advNumber) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCard(advertisementArray, advNumber, card.cloneNode(true)));
  mapSection.insertBefore(fragment, filerContainer);
};

var cardsList = constractCardssList();
pinAppend(cardsList);
cardAppend(cardsList, 0);

//  --------------------------Взаимодействие пользователя с сайтом

var realCard = mapSection.getElementsByTagName('article');
var popupCloseButton = realCard[0].querySelector('.popup__close');

var mapActive = function () {
  address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + mainPinTop;
  deleteDisabled(fieldsetList);
  deleteDisabled(mapFilterList);
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
        getCard(cardsList, i, realCard[0]);
        realCard[0].classList.remove('visually-hidden');
        document.addEventListener('keydown', onPopupEscPress);
      }
    }
  }
};

popupCloseButton.addEventListener('click', closePopup);
pinsList.addEventListener('click', onSecondPinClick);
