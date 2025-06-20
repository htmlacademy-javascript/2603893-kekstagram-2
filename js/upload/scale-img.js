const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');

const minScale = 25;
const maxScale = 100;
const step = 25;

export const initScaleImage = () => {
  smallerBtn.addEventListener('click', () => {
    let currentValue = parseInt(scaleInput.value, 10);
    if(currentValue > minScale) {
      currentValue -= step;
      scaleInput.value = `${currentValue}`;
      const scaleFactor = currentValue / 100;
      imgPreview.style.transform = `scale(${scaleFactor})`;
    }
  });

  biggerBtn.addEventListener('click', () => {
    let currentValue = parseInt(scaleInput.value, 10);
    if(currentValue < maxScale) {
      currentValue += step;
      scaleInput.value = `${currentValue}%`;
      const scaleFactor = currentValue / 100;
      imgPreview.style.transform = `scale(${scaleFactor})`;
    }
  });
};
