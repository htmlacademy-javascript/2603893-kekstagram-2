const fileInput = document.querySelector('.img-upload__input');
const closeBtn = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
let onEscPress;

const closeFilePhoto = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', closeFilePhoto);
  document.removeEventListener('keydown', onEscPress);
  fileInput.value = '';
};

const handleFileChange = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

  onEscPress = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      const active = document.activeElement;
      if (active !== hashtagInput && active !== commentInput) {
        closeFilePhoto();
      } else {
        evt.stopPropagation();
      }
    }
  };

  closeBtn.addEventListener('click', closeFilePhoto);
  document.addEventListener('keydown', onEscPress);
};

export const openFilePhoto = () => {
  fileInput.addEventListener('change', handleFileChange);
};
