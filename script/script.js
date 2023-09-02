
import Debounce from './util/debounce.js';
import printFont, { fillPageWithSpace } from './printFont.js';

export const textEl = document.getElementById('text');
export const printFontEl = document.getElementById('printFont');
const printOnPaperButton = document.getElementById('print-on-paper');
const debounce = new Debounce();

const preLoadImage = (...urls) => {
  const images = [];
  urls.forEach((url) => {
    const img = new Image(0,0);
    img.src = url;
    images.push(img);
    document.querySelector('body').appendChild(img);
  })
}
preLoadImage(
  '../image/scan1.jpg',
  '../image/scan2.jpg',
  '../image/scan3.jpg',
  '../image/scan4.jpg',
  '../image/scan5.jpg',
  '../image/scan6.jpg', );

printFont('');

textEl.addEventListener('keyup', () => {
  debounce.setTimer(() => {printFont(textEl.value)}, 100);
});

printOnPaperButton.addEventListener('click', () => {
  // 세팅
  const fillSpace = true; // 빈칸 인쇄 여부 저장
  const defaultTitle = document.title;
  document.title = '미꽃체) ' + textEl.value.slice(0, 30);
  if (fillSpace) {
    const printFontElPadding = 20;
    const maxHeight = 1122 - printFontElPadding; // 20은 padding값임
    const textHeight = printFontEl.clientHeight - printFontElPadding;
    fillPageWithSpace(maxHeight - (textHeight % maxHeight));
  }
  // 실행
  window.print();

  // 초기화
  printFont(textEl.value);
  document.title = defaultTitle;
});
