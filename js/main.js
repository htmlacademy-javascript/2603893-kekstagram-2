import { renderPhoto } from './render/render-photo';
import { initThumbnailClicks } from './photo/image-viewer';
import { openFilePhoto } from './upload/upload-img';
import { initScaleImage } from './upload/scale-img';
import { initEffectRadios } from './upload/effects-img';
import { setUserFormSubmit } from './validate/validate-form';
import { closeModal } from './utils';
import { getData } from './api';
import { showAlert } from './utils';

openFilePhoto();
initScaleImage();
initEffectRadios();


getData()
  .then((photos) => {
    renderPhoto(photos);
    initThumbnailClicks(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeModal);
