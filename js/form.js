// -------------------------- Модуль отвечающий за поведение формы объявления

'use strict';
(function () {
  var fieldsetList = document.querySelector('.ad-form');
  var fieldsetResetButton = document.querySelector('.ad-form__reset');
  var mapFilterList = document.querySelector('.map__filters');
  var address = document.querySelector('#address');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityClone = capacity.cloneNode(true);
  var mainPin = document.querySelector('.map__pin--main');
  var pinWidth = mainPin.clientWidth;
  var pinHeight = mainPin.clientHeight;
  var mainPinLeft = mainPin.offsetLeft;
  var mainPinTop = mainPin.offsetTop;

  //  Функция добавления атрибута disabled

  window.setDisabled = function (fieldsetArray) {
    for (var i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].setAttribute('disabled', true);
    }
  };

  //  Функция удаления атрибута disabled

  window.deleteDisabled = function (fieldsetArray) {
    for (var i = 0; i < fieldsetArray.length; i++) {
      if (fieldsetArray[i].hasAttribute('disabled')) { // нужна ли эта проверка?
        fieldsetArray[i].removeAttribute('disabled');
      }
    }
  };

  window.setDisabled(fieldsetList);
  window.setDisabled(mapFilterList);
  //  Заполнение форм

  address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + (mainPinTop + Math.round(pinHeight / 2));

  //  Связка атрибута price.min и селекта type

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
  onTypeChange();
  type.addEventListener('change', onTypeChange);

  //  Функция заполнения селекта capacity

  var getCapacityList = function (min, max) {
    window.clear(capacity);
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

  //  Функция для успешной отправки формы

  var formSubmission = function () {
    fieldsetList.reset();
    window.setDisabled(fieldsetList);
    window.setDisabled(mapFilterList);
  };

  fieldsetList.addEventListener('submit', function (evt) {
    window.save(new FormData(fieldsetList), formSubmission, window.errorPush);
    evt.preventDefault();
  });

  fieldsetResetButton.addEventListener('click', function () {
    fieldsetList.reset();
  });

  fieldsetResetButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      fieldsetList.reset();
    }
  });

})();
