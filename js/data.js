// -------------------------- Модуль по созданию данных

'use strict';
(function () {
  var mapSection = document.querySelector('.map');
  var actualWidth = mapSection.clientWidth;
  window.pinsNumber = 8;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;

  var advertisementArray = [];
  var offerTypeArray = ['palace', 'flat', 'house', 'bungalo'];
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

  // Функция создания объекта - автора ('autor')

  var getAutor = function (userNumber) {
    var avatar = {};
    avatar.avatar = ('img/avatars/user0' + userNumber + '.png');
    return avatar;
  };

  // Функция создания объекта - предложения ('offer')

  var getOffer = function () {
    var offer = {};
    offer.title = titleArray[window.getRandomNumber(0, titleArray.length)];
    offer.address = 'Координаты: ' + window.getRandomNumber(1, 90, true) + ', ' + window.getRandomNumber(1, 90, true);
    offer.price = window.getRandomNumber(1000, 10000);
    offer.type = offerTypeArray[window.getRandomNumber(0, 4)];
    offer.rooms = window.getRandomNumber(1, 5);
    offer.guests = window.getRandomNumber(1, 10);
    offer.checkin = checkArray[window.getRandomNumber(0, 3)];
    offer.checkout = checkArray[window.getRandomNumber(0, 3)];
    offer.features = window.getRandomArray(window.getRandomNumber(0, defaultFeaturesArray.length), defaultFeaturesArray);
    offer.description = offerDescription[window.getRandomNumber(0, offerDescription.length)];
    offer.photos = window.getRandomArray(window.getRandomNumber(0, offerPhotos.length), offerPhotos);
    return offer;
  };

  // Функция создания объекта - локации ('location')

  var getLocation = function () {
    var location = {};
    location.x = window.getRandomNumber(25, actualWidth, true);
    location.y = window.getRandomNumber(MIN_HEIGHT, MAX_HEIGHT, true);
    return location;
  };

  // Функция создания массива объявлений

  window.constractCardssList = function () {
    var randomAvatarArray = window.getRandomNumbersArray(1, 9);
    for (var i = 0; i < window.pinsNumber; i++) {
      var cardInfo = {};
      cardInfo.autor = getAutor(randomAvatarArray[i]);
      cardInfo.offer = getOffer();
      cardInfo.location = getLocation();
      advertisementArray.push(cardInfo);
    }
    return advertisementArray;
  };

})();
