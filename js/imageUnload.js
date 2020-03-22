// -------------------------- Модуль для загрузки пользовательских картинок

'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIDE = 60;

  var avatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarImg = avatarPreview.querySelector('img');

  var homePhotoInput = document.querySelector('#images');
  var homePhotoPreview = document.querySelector('.ad-form__photo');

  var photoCheck = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var matches = photoCheck(file);
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarImg.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  homePhotoInput.addEventListener('change', function () {
    var file = homePhotoInput.files[0];
    var matches = photoCheck(file);

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newPhoto = document.createElement('img');
        newPhoto.width = PHOTO_SIDE;
        newPhoto.height = PHOTO_SIDE;
        newPhoto.alt = 'Фотография жилья';
        newPhoto.src = reader.result;
        homePhotoPreview.appendChild(newPhoto);
      });

      reader.readAsDataURL(file);
    }
  });

})();
