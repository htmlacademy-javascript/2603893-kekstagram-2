import { NAMES, MESSAGE } from "../constants";
import { getRandomInteger, getRandomArrayElement } from "../utils";

let id = 0;

const initComments = () => {
    const randomMessage = MESSAGE.split('. ');
    const randomMessages = getRandomArrayElement(randomMessage).trim();
    const randomName = getRandomArrayElement(NAMES);
    const randomAvatarNumber = getRandomInteger(1, 6);

    id++;

    return  {
        id: id,
        avatar: `img/avatar-${randomAvatarNumber}.svg`,
        message: randomMessages,
        name: randomName
    }
}

export {initComments}