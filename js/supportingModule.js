// -------------------------- Вспомогательный модуль

'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.supportingModule = {

    //  Функция очистки списка

    clear: function (elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    },

    //  функция по 'устранению дребезга'

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };

})();
