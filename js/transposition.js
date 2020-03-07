// -------------------------- Модуль для перетаскивания объявления

'use strict';
(function () {
  var mapSection = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var pinWidth = mainPin.clientWidth;
  var actualWidth = mapSection.clientWidth;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      var mainPinLeft = mainPin.offsetLeft;
      var mainPinTop = mainPin.offsetTop;

      if (mainPinLeft + Math.round(pinWidth / 2) >= actualWidth) {
        mainPin.style.left = actualWidth - Math.round(pinWidth / 2) + 'px';
      } else if (mainPinLeft + Math.round(pinWidth / 2) <= 0) {
        mainPin.style.left = 0 - Math.round(pinWidth / 2) + 'px';
      }

      if (mainPinTop <= MIN_HEIGHT) {
        mainPin.style.top = MIN_HEIGHT + 'px';
      } else if (mainPinTop >= MAX_HEIGHT) {
        mainPin.style.top = MAX_HEIGHT + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var mainPinLeft = mainPin.offsetLeft;
      var mainPinTop = mainPin.offsetTop;
      address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + mainPinTop;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
