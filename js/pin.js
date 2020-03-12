// -------------------------- Модуль по созданию пина (метки обьявления)

'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  window.pinsNumber = 8;

  // Функция оздания DOM-элемента - пина объявления

  window.getPin = function (advertisementArray, pinNumber) {
    var pinElement = pin.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.style = 'left: ' + (advertisementArray[pinNumber].location.x - 25) + 'px; top: ' + (advertisementArray[pinNumber].location.y - 70) + 'px;';
    pinImg.alt = advertisementArray[pinNumber].offer.title;
    pinImg.src = advertisementArray[pinNumber].author.avatar;
    pinElement.classList.add('visually-hidden');
    pinElement.classList.add(pinNumber);
    pinElement.classList.add('second-pin');
    pinImg.classList.add('pin__avatar');
    pinImg.classList.add(pinNumber);
    return pinElement;
  };

  // Удаление visualy-hidden у всех пинов

  window.removePinsHiddenClass = function () {
    var pinsArray = document.getElementsByClassName('map__pin');
    for (var i = 1; i < pinsArray.length; i++) {
      pinsArray[i].classList.remove('visually-hidden');
    }
  };

})();
