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
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarImg = avatarPreview.querySelector('img');
  var homePhotoPreview = document.querySelector('.ad-form__photo');
  var pinWidth = mainPin.clientWidth;
  var pinHeight = mainPin.clientHeight;
  var mainPinLeft = mainPin.offsetLeft;
  var mainPinTop = mainPin.offsetTop;

  // Функции общего доступа модуля form

  window.form = {

    //  Функция добавления атрибута disabled

    setDisabled: function (fieldsetArray) {
      for (var i = 0; i < fieldsetArray.length; i++) {
        fieldsetArray[i].setAttribute('disabled', true);
      }
    },

    //  Функция удаления атрибута disabled

    deleteDisabled: function (fieldsetArray) {
      for (var i = 0; i < fieldsetArray.length; i++) {
        if (fieldsetArray[i].hasAttribute('disabled')) { // нужна ли эта проверка?
          fieldsetArray[i].removeAttribute('disabled');
        }
      }
    }
  };

  window.form.setDisabled(fieldsetList);
  window.form.setDisabled(mapFilterList);

  //  Заполнение форм

  address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + (mainPinTop + Math.round(pinHeight / 2));

  //  Связка атрибута price.min и селекта type

  var changeType = function () {
    switch (type.value) {
      case ('bungalo'):
        price.min = 0;
        price.placeholder = 0;
        break;
      case ('flat'):
        price.min = 1000;
        price.placeholder = 1000;
        break;
      case ('house'):
        price.min = 5000;
        price.placeholder = 5000;
        break;
      case ('palace'):
        price.min = 10000;
        price.placeholder = 10000;
        break;
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
  changeType();
  type.addEventListener('change', changeType);

  //  Функция заполнения селекта capacity

  var getCapacityList = function (min, max) {
    window.supportingModule.clear(capacity);
    for (var i = min; i < max; i++) {
      var capacityCloneOption = capacityClone[i].cloneNode(true);
      capacityCloneOption.removeAttribute('selected');
      capacity.insertBefore(capacityCloneOption, capacity[0]);
    }
    capacity[0].setAttribute('selected', true);
  };

  //  Функция синхронизации параметров roomNUmber и capacity

  var changeRoomNumber = function () {
    switch (roomNumber.value) {
      case ('1'):
        getCapacityList(2, 3);
        break;
      case ('2'):
        getCapacityList(1, 3);
        break;
      case ('3'):
        getCapacityList(0, 3);
        break;
      case ('100'):
        getCapacityList(3, 4);
        break;
    }
  };

  getCapacityList(2, 3);
  roomNumber.addEventListener('change', changeRoomNumber);

  //  Функция для успешной отправки формы

  var clearForm = function () {
    window.map.closePopup();
    fieldsetList.reset();
    mapFilterList.reset();
    avatarImg.src = 'img/muffin-grey.svg';
    window.supportingModule.clear(homePhotoPreview);
    window.houseTypeFilter();
    window.map.deactivateMap();
    window.resetPinPosition();
    address.value = mainPinLeft + Math.round(pinWidth / 2) + ', ' + (mainPinTop + Math.round(pinHeight / 2));
  };

  var submitForm = function () {
    window.popup.pushSuccessPopup();
    clearForm();
  };

  fieldsetList.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(fieldsetList), submitForm, window.popup.pushErrorPopup);
    evt.preventDefault();
  });

  fieldsetResetButton.addEventListener('click', function () {
    clearForm();
  });

  fieldsetResetButton.addEventListener('keydown', function (evt) {
    window.util.enterEvent(evt, clearForm);
  });

})();
