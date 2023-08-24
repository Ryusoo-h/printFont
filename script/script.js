
import Debounce from './debounce.js';
import printFont from './printFont.js';

export const textEl = document.getElementById('text');
export const printFontEl = document.getElementById('printFont');
const debounce = new Debounce();

textEl.addEventListener('keyup', () => {
  debounce.setTimer(() => {printFont(textEl.value, printFontEl)}, 100);
})