import { photoDescriptions } from '../photo/init-photo';

const imageContainer = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture').content;
const similarPhotos = photoDescriptions();
const similarPhotoFragment = document.createDocumentFragment();

const createPhoto = ({id, url, description, likes, comments}) => {
  const similarPhoto = imageTemplate.cloneNode(true);
  const photoLink = similarPhoto.querySelector('.picture');
  const photoImg = similarPhoto.querySelector('.picture__img');
  const photoLikes = similarPhoto.querySelector('.picture__likes');
  const photoComments = similarPhoto.querySelector('.picture__comments');

  photoLink.href = url;
  photoImg.src = url;
  photoImg.dataset.id = id;
  photoImg.alt = description;

  photoLikes.textContent = likes;
  photoComments.textContent = comments.length || 0;

  return similarPhoto;

};


const renderPhoto = () => {
  similarPhotos.forEach((photo) => {
    const thumbnail = createPhoto(photo);
    similarPhotoFragment.append(thumbnail);
  });

  imageContainer.append(similarPhotoFragment);
};

export {renderPhoto};
