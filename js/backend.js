// -------------------------- Модуль по запросу информации с сервера

'use strict';
(function () {

  window.backend = {

    // -------------------------- Загрузка данных с сервера

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.markArray = xhr.response;
          onLoad(JSON.parse(xhr.response));
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

      xhr.open('GET', URL);
      xhr.send();
    },

    // -------------------------- Отправка данных на сервер

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var URL = 'https://js.dump.academy/keksobooking';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }

  };

})();
