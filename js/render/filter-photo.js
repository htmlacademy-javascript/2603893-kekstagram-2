import { renderPhoto } from './render-photo';
import { getAllPhotos } from '../get-data';
import { shuffleArray, debounce } from '../utils';

const filterForm = document.querySelector('.img-filters__form');
const filterBtns = document.querySelectorAll('.img-filters__button');

const clearPhotos = () => {
  document.querySelectorAll('.picture').forEach((el) => {
    el.remove();
  });
};

const handleFilterClick = (evt) => {
  const target = evt.target;
  let filteredArray = [];

  filterBtns.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  if(!target.closest('.img-filters__button')) {
    return;
  }

  if(target.matches('#filter-random')) {
    filteredArray = [...getAllPhotos()];
    shuffleArray(filteredArray);
    target.classList.add('img-filters__button--active');
    filteredArray = filteredArray.slice(0, 10);
  } else if (target.matches('#filter-discussed')) {
    filteredArray = [...getAllPhotos()].sort((a, b) => b.comments.length - a.comments.length);
    target.classList.add('img-filters__button--active');
  } else if (target.matches('#filter-default')) {
    filteredArray = [...getAllPhotos()];
    target.classList.add('img-filters__button--active');
  }
  clearPhotos();

  renderPhoto(filteredArray);
};

const onFilterClickDebounced = debounce(handleFilterClick, 500);

export const initFilter = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', onFilterClickDebounced);
};

