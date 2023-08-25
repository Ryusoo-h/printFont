
import Debounce from './util/debounce.js';
import printFont, { fillPageWithSpace } from './printFont.js';

export const textEl = document.getElementById('text');
export const printFontEl = document.getElementById('printFont');
const printOnPaperButton = document.getElementById('print-on-paper');
const debounce = new Debounce();

printFont('');

textEl.addEventListener('keyup', () => {
  debounce.setTimer(() => {printFont(textEl.value)}, 100);
});

printOnPaperButton.addEventListener('click', () => {
  const fillSpace = true;
  if (fillSpace) {
    const printFontElPadding = 20;
    const maxHeight = 1122 - printFontElPadding; // 20은 padding값임
    const textHeight = printFontEl.clientHeight - printFontElPadding;
    fillPageWithSpace(maxHeight - (textHeight % maxHeight));
  }
  window.print();
  printFont(textEl.value);
});
