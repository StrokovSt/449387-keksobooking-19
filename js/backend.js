// -------------------------- Модуль по запросу информации с сервера

'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  window.backend = {

    // -------------------------- Загрузка данных с сервера

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.markArray = xhr.response;
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    // -------------------------- Отправка данных на сервер

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }

  };

})();
