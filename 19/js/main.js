import { renderPhoto } from './render/render-photo';
import { initThumbnailClicks } from './photo/image-viewer';
import { openFilePhoto } from './upload/upload-img';
import { initScaleImage } from './upload/scale-img';
import { initEffectRadios } from './upload/effects-img';
import { setUserFormSubmit } from './validate/validate-form';
import { closeModal } from './utils';
import { getData } from './api';
import { showAlert } from './utils';
import { initFilter } from './render/filter-photo';

export const allPhotos = [];

openFilePhoto();
initScaleImage();
initEffectRadios();


getData()
  .then((photos) => {
    allPhotos.length = 0;
    allPhotos.push(...photos);
    renderPhoto(allPhotos);
    initThumbnailClicks(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    initFilter();
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeModal);
