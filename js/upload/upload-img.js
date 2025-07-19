import { closeModal, openModal, showAlert, isMessageOpen } from '../utils';
import { init } from './effects-img';
import { pristine } from '../validate/validate-form';

const fileInput = document.querySelector('.img-upload__input');
const closeBtn = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const previewImageEffects = document.querySelectorAll('.effects__preview');
const scaleInput = document.querySelector('.scale__control--value');
let onEscPress;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const closeFilePhoto = () => {
  closeModal('.img-upload__overlay');
  init();
  fileInput.value = '';
  scaleInput.value = '100%';
  hashtagInput.value = '';
  hashtagInput.style.outline = '';
  commentInput.value = '';
  pristine.reset();
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

      const blobUrl = URL.createObjectURL(file);

      previewImage.src = blobUrl;
      previewImageEffects.forEach((preview) => {
        preview.style.backgroundImage = `url(${blobUrl})`;
      });

      closeBtn.addEventListener('click', () => {
        URL.revokeObjectURL(blobUrl);
        closeFilePhoto();
      });

      onEscPress = (evt) => {
        if ((evt.key === 'Escape' || evt.key === 'Esc') && !isMessageOpen) {
          const active = document.activeElement;
          if (active !== hashtagInput && active !== commentInput) {
            URL.revokeObjectURL(blobUrl);
            closeFilePhoto();
          } else {
            evt.stopPropagation();
          }
        }
      };

      document.addEventListener('keydown', onEscPress);

    } else {
      showAlert('Некорректный формат файла. Пожалуйста, выберите JPG или PNG.');
    }
  }
};

export const openFilePhoto = () => {
  fileInput.addEventListener('change', handleFileChange);
};
