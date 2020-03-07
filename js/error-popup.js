// -------------------------- Модуль по созданию всплывающего сообщения об ошибке

'use strict';
(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var mapSection = document.querySelector('.map');

  var renderError = function (message) {
    var errorClone = error.cloneNode(true);
    errorClone.querySelector('.error__message').textContent = message;
    return errorClone;
  };

  window.errorPush = function (message) {
    mapSection.appendChild(renderError(message));
    var closeButton = document.querySelector('.error__button');

    closeButton.addEventListener('click', function () {
      mapSection.querySelector('.error').remove();
    });
  };

})();
