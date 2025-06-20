import { initThumbnailClicks } from './photo/image-viewer';
import { openFilePhoto } from './upload/upload-img';
import { validateForm } from './validate/validate-form';
import { initScaleImage } from './upload/scale-img';
import { initEffectRadios } from './upload/effects-img';

initThumbnailClicks();
validateForm();
openFilePhoto();
initScaleImage();
initEffectRadios();
