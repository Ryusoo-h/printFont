
import Debounce from './debounce.js';
import printFont from './printFont.js';

const textEl = document.getElementById('text');
const printFontEl = document.getElementById('printFont');
const debounce = new Debounce();

textEl.addEventListener('keyup', () => {
  debounce.setTimer(() => {printFont(textEl.value, printFontEl)});
})


