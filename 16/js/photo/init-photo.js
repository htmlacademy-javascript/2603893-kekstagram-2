import { DESCRIPTION } from '../constants';
import { getRandomArrayElement, getRandomInteger } from '../utils';
import { initComments } from '../comments/init-comments';

const photoDescriptions = () => {
  const photos = Array.from({ length: 25 }, (_, index) => {
    const id = index + 1;
    const randomLikes = getRandomInteger(15, 200);
    const randomDescription = getRandomArrayElement(DESCRIPTION);
    const similarComments = Array.from({ length: getRandomInteger(0, 30) }, initComments);

    return {
      id: `${id}`,
      url: `photos/${id}.jpg`,
      description: randomDescription,
      likes: randomLikes,
      comments: similarComments,
    };
  });

  return photos;
};


export {photoDescriptions};
