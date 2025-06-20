export function validateForm() {
  const form = document.querySelector('.img-upload__form');
  const hashtagInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');

  let errorMessage = '';

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__field-wrapper__error'
  });

  function validateHashtag(value) {
    errorMessage = '';

    if (!value) {
      return true;
    }

    const tags = value.trim().split(/\s+/);

    if (tags.length > 5) {
      errorMessage = 'Вы можете указать не более 5 хэштегов';
      return false;
    }

    const pattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
    const lowerTags = [];

    for (const tag of tags) {
      if (tag === '#') {
        errorMessage = 'Хэштег не может состоять только из решетки';
        return false;
      }

      if (!pattern.test(tag)) {
        errorMessage = 'Некорректный хэштег';
        return false;
      }

      const lowerTag = tag.toLowerCase();
      if (lowerTags.includes(lowerTag)) {
        errorMessage = `Повторяющийся хэштег: ${tag}`;
        return false;
      }

      lowerTags.push(lowerTag);
    }

    return true;
  }

  function validateComment(value) {
    return value.length <= 140;
  }

  function getHashtagError() {
    return errorMessage;
  }

  pristine.addValidator(hashtagInput, validateHashtag, getHashtagError);
  pristine.addValidator(descriptionInput, validateComment, 'Максимальная длина 140 символов');

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
}

