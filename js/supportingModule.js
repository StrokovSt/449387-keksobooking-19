// -------------------------- Вспомогательный модуль

'use strict';
(function () {

  window.supportingModule = {

    //  Функция очистки списка

    clear: function (elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    }
  };

})();
