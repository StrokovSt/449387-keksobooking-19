// -------------------------- Модуль с утилитными методами для работы с клавиатурой

'use strict';
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var LEFT_CLICK = 1;

  window.util = {
    escEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },

    enterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },

    leftClickEvent: function (evt, action) {
      if (evt.which === LEFT_CLICK) {
        action();
      }
    }
  };

})();
