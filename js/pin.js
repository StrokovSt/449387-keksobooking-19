// -------------------------- Модуль по созданию пина (метки обьявления)

'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var PID_WIDTH = 25;
  var PIN_HEIGHT = 70;

  window.pin = {

    // Функция оздания DOM-элемента - пина объявления

    getPinElement: function (similarPins, pinNumber) {
      var pinElement = pin.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      pinElement.style = 'left: ' + (similarPins[pinNumber].location.x - PID_WIDTH) + 'px; top: ' + (similarPins[pinNumber].location.y - PIN_HEIGHT) + 'px;';
      pinImg.alt = similarPins[pinNumber].offer.title;
      pinImg.src = similarPins[pinNumber].author.avatar;
      pinElement.classList.add(pinNumber);
      pinElement.classList.add('second-pin');
      pinImg.classList.add('pin__avatar');
      pinImg.classList.add(pinNumber);
      return pinElement;
    },

    // Функция удаления класса visualy-hidden у пинов

    removePinsHiddenClass: function () {
      var pins = document.getElementsByClassName('map__pin');
      for (var i = 1; i < pins.length; i++) {
        pins[i].classList.remove('visually-hidden');
      }
    }

  };

})();
