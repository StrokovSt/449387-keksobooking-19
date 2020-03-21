// -------------------------- Модуль по созданию всплывающего сообщения об ошибке

'use strict';
(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var mapSection = document.querySelector('.map');

  var renderError = function (message) {
    var errorClone = error.cloneNode(true);
    errorClone.querySelector('.error__message').textContent = message;
    return errorClone;
  };

  var renderSuccess = function () {
    var successClone = success.cloneNode(true);
    return successClone;
  };

  window.popup = {
    pushError: function (message) {
      mapSection.appendChild(renderError(message));
      var closeButton = document.querySelector('.error__button');
      var errorPopup = document.querySelector('.error');

      closeButton.addEventListener('click', function () {
        mapSection.querySelector('.error').remove();
      });

      var onPopupClose = function () {
        errorPopup.remove();
        document.removeEventListener('keydown', onPopupEscPress);
        document.removeEventListener('click', onPopupClose);
      };

      var onPopupEscPress = function (evt) {
        window.util.escEvent(evt, onPopupClose);
      };

      document.addEventListener('keydown', onPopupEscPress);
    },

    pushSuccess: function (message) {
      mapSection.appendChild(renderSuccess(message));

      var successPopup = document.querySelector('.success');

      var onPopupClose = function () {
        successPopup.remove();
        document.removeEventListener('keydown', onPopupEscPress);
        document.removeEventListener('click', onPopupClose);
      };

      var onPopupEscPress = function (evt) {
        window.util.escEvent(evt, onPopupClose);
      };

      document.addEventListener('keydown', onPopupEscPress);
      document.addEventListener('click', onPopupClose);
    }
  };

})();
