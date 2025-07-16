import { closeModal, openModal, showAlert } from '../utils';

const fileInput = document.querySelector('.img-upload__input');
const closeBtn = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const previewImageEffects = document.querySelectorAll('.effects__preview');
let onEscPress;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const closeFilePhoto = () => {
  closeModal('.img-upload__overlay');
  closeBtn.removeEventListener('click', closeFilePhoto);
  document.removeEventListener('keydown', onEscPress);
};

const handleFileChange = () => {
  const file = fileInput.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const isSupportedType = FILE_TYPES.some((ext) => fileName.endsWith(ext));
    if (isSupportedType) {
      openModal('.img-upload__overlay');

      const reader = new FileReader();
      reader.onload = () => {
        previewImage.src = reader.result;
        previewImageEffects.forEach((preview) => {
          preview.style.backgroundImage = `url(${reader.result})`;
        });
      };
      reader.readAsDataURL(file);
    } else {
      showAlert('Некорректный формат файла. Пожалуйста, выберите JPG или PNG.');
    }
  }

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
