// -------------------------- Вспомогательный модуль

'use strict';
(function () {

  window.supportingModule = {

    //  Генерации случайного числа с/без плавающей точкой

    getRandomNumber: function (min, max, bool) {
      if (bool) {
        return Math.random() * (max - min) + min;
      }
      return Math.floor(Math.random() * (max - min) + min);
    },

    // Создания массива случайных неповторяющихся чисел

    getRandomNumbersArray: function (min, max) {
      var randomNumberArray = [];
      while (randomNumberArray.length < max - 1) {
        var randomNumber = window.getRandomNumber(min, max);
        if (randomNumberArray.indexOf(randomNumber) === -1) {
          randomNumberArray.push(randomNumber);
        }
      }
      return randomNumberArray;
    },

    // Случайное перемешивание элементов в указанном массиве

    getRandomArray: function (userNumber, chosenArray) {
      var newRandomArray = [];
      var randomArray = window.getRandomNumbersArray(0, userNumber + 1);
      for (var i = 0; i < userNumber; i++) {
        newRandomArray[i] = chosenArray[randomArray[i]];
      }
      return newRandomArray;
    },

    // Функция создания случайного цвета

    getRandomColor: function () {
      var randomColor = '#';
      for (var i = 0; i < 3; i++) {
        randomColor += window.getRandomNumber(0, 256).toString(16);
      }
      return randomColor;
    },

    //  Функция очистки списка

    clear: function (elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    }
  };

})();
