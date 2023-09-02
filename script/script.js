
import Debounce from './util/debounce.js';
import printFont, { fillPageWithSpace } from './printFont.js';

export const textEl = document.getElementById('text');
export const printFontEl = document.getElementById('printFont');
const printOnPaperButton = document.getElementById('print-on-paper');
const debounce = new Debounce();

const preLoadFontImage = (...urls) => { // urls는 경로에서 .확장자를 뺀 부분만 입력해야함.
  urls.forEach((url) => {
    document.querySelector('body').insertAdjacentHTML("beforeend", `
      <picture>
        <source srcset="${url}.avif" type="image/avif">
        <source srcset="${url}.webp" type="image/webp">
        <img src="${url}.jpg" alt="" style="width: 0px; height: 0px;">
      </picture>
    `);
  })
}
preLoadFontImage(
  './image/scan1',
  './image/scan2',
  './image/scan3',
  './image/scan4',
  './image/scan5',
  './image/scan6'
);

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
