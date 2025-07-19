import { openFilePhoto } from './upload/upload-img';
import { initScaleImage } from './upload/scale-img';
import { initEffectRadios } from './upload/effects-img';
import { setUserFormSubmit } from './validate/validate-form';
import { closeModal } from './utils';
import { setAllPhotos } from './get-data';
import { renderPhoto } from './render/render-photo';
import { initThumbnailClicks } from './photo/image-viewer';
import { initFilter } from './render/filter-photo';
import { createMessage } from './utils';
import { getData } from './api';

getData()
  .then((photos) => {
    setAllPhotos(photos);
    renderPhoto(photos);
    initThumbnailClicks(photos);
    initFilter();
  })
  .catch(
    () => {
      createMessage('data-error');
    }
  );

openFilePhoto();
initScaleImage();
initEffectRadios();
setUserFormSubmit(closeModal);
