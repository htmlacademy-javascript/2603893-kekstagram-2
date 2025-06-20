import { similarPhotos } from '../render/render-photo';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const commentCountShown = bigPicture.querySelector('.social__comment-shown-count');
const commentCountTotal = bigPicture.querySelector('.social__comment-total-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsToShow = 5;
let currentIndex = 0;
let currentPhoto = null;
let onEscPress;

const createCommentElement = ({avatar, name, message}) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.style.width = 35;
  img.style.height = 35;
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;
  li.append(img, p);
  return li;
};

const loadMoreComments = (photo) => {
  const commentsFragment = document.createDocumentFragment();
  const nextIndex = Math.min(currentIndex + commentsToShow, photo.comments.length);
  const commentSlice = photo.comments.slice(currentIndex, nextIndex);
  commentSlice.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });
  socialCommentsContainer.append(commentsFragment);
  currentIndex += commentSlice.length;
  commentCountShown.textContent = Math.min(currentIndex, photo.comments.length);
  if (currentIndex >= photo.comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};

const closeFullPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  closeButton.removeEventListener('click', closeFullPhoto);
};


const openFullPhoto = (photo) => {
  currentPhoto = photo;
  bigPictureImage.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;
  commentCountTotal.textContent = photo.comments.length;

  socialCommentsContainer.innerHTML = '';

  if(photo.comments.length > 0) {
    currentIndex = 0;
    commentCountShown.classList.remove('hidden');
    document.querySelector('.comments-loader').classList.remove('hidden');
    loadMoreComments(photo);
  } else {
    commentCountShown.classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('.social__comment-count').classList.add('hidden');
    socialCommentsContainer.innerHTML = '<li class="social__comment">Ваш комментарий будет первым!</li>';
  }

  onEscPress = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      closeFullPhoto();
    }
  };

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
  closeButton.addEventListener('click', closeFullPhoto);
};

const initCommentsLoader = () => {
  document.querySelector('.comments-loader').addEventListener('click', () => {
    if (currentPhoto) {
      loadMoreComments(currentPhoto);
    }
  });
};

initCommentsLoader();

export const initThumbnailClicks = () => {
  document.querySelector('.pictures').addEventListener('click', (e) => {
    const miniPicture = e.target.closest('.picture');
    if(miniPicture) {
      e.preventDefault();
      const imgEl = miniPicture.querySelector('.picture__img');
      if(imgEl && imgEl.dataset.id) {
        const id = imgEl.dataset.id;
        const photoData = similarPhotos.find((photo) => +photo.id === +id);
        if(photoData) {
          openFullPhoto(photoData);
        }
      }
    }
  });
};
