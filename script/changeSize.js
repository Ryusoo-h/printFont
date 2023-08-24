
import Debounce from './debounce.js';
import {textEl, printFontEl} from './script.js';
import printFont from './printFont.js';
import {changeFontSize} from './printFont.js';

const debounce = new Debounce();
const fontSizeWrapperEl = document.getElementById('font-size-wrapper');
const sizeInput = document.getElementById('current-size');

const size50Button = document.getElementById('size50');
const size80Button = document.getElementById('size80');
const size90Button = document.getElementById('size90');
const size100Button = document.getElementById('size100');
const size150Button = document.getElementById('size150');

const changeCurrentButton = (value) => {
  fontSizeWrapperEl.querySelector('.current')?.classList.remove('current');
  switch (Number(value)) {
    case 50:
      size50Button.classList.add('current');
      break;
    case 80:
      size80Button.classList.add('current');
      break;
    case 90:
      size90Button.classList.add('current');
      break;
    case 100:
      size100Button.classList.add('current');
      break;
    case 150:
      size150Button.classList.add('current');
      break;
    default:
      break;
  }
}

const validationSize = (size) => {
  if (size < 10) {
    return 10;
  } else if (size > 300) {
    return 300;
  } else {
    return size;
  }
}

const changeSize = (value) => {
  const size = validationSize(value);
  changeFontSize(size/100);
  sizeInput.value = size;
  changeCurrentButton(size);
  printFont(textEl.value, printFontEl);
}

size50Button.addEventListener('click', () => {
  changeSize(50);
});
size80Button.addEventListener('click', () => {
  changeSize(80);
});
size90Button.addEventListener('click', () => {
  changeSize(90);
});
size100Button.addEventListener('click', () => {
  changeSize(100);
});
size150Button.addEventListener('click', () => {
  changeSize(150);
});

sizeInput.addEventListener('change', () => {
  changeSize(sizeInput.value);
});

sizeInput.addEventListener('keyup', () => {
  debounce.setTimer(() => {changeSize(sizeInput.value)}, 100);
});