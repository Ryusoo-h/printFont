import miFlowerFontData from './miFlowerFontData.js';
import { printFontEl, textEl } from './script.js';

// 폰트 사이즈를 저장함
// fontSize = 1은 100%를 뜻함
let fontSize = 1;
export const changeFontSize = (size) => {
  fontSize = size;
}

// widthInfo, heightInfo 의 default값이 인덱스 0이다. 
// 인덱스 0자리가 가장 커야한다. '.' 한줄 칸 개수의 기준이됨
// 인덱스 1~5까지 스캔이미지 파일의 1~5 번호와 일치함
const widthInfo = [67, 66.4, 66.4, 66.4, 66.3, 66.4, 66.4];
const heightInfo= [83, 82.85, 82.95, 82.9, 82.9, 82.85, 82.85];

// 인자로 받은 'word'를 '폰트이미지 element'로 출력하는 함수
const changeWordToFontEl = (word) => {
  // 스캔 이미지라 크기가 조금씩 달라서 출력시 조절이 필요했다.
  // (widthInfo와 heightInfo의 인덱스) = (해당 이미지의 scanNum - 1)
  const wordInfo = miFlowerFontData.get(word);
  if (!wordInfo) {
    return '';
  }
  const x = wordInfo[1];
  const y = wordInfo[2];
  const scanNum = wordInfo[0];
  let width = widthInfo[scanNum]*fontSize;
  let height = heightInfo[scanNum]*fontSize;
  let imageWidth = 1400*fontSize;

  return `
    <div class="word" style="width: ${widthInfo[0]*fontSize}px; height: ${heightInfo[0]*fontSize}px;">
      <picture>
        <source srcset="./image/scan${scanNum}.avif" type="image/avif">
        <source srcset="./image/scan${scanNum}.webp" type="image/webp">
        <img src="./image/scan${scanNum}.jpg" alt="" style="width: ${imageWidth}px; transform: translate(-${width*x}px, -${height*y}px);" alt="폰트이미지'${word}'">
      </picture>
    </div>
  `;
}

// '물음표 element(폰트가 없다는 표시로 사용)'를 출력하는 함수
const changeWordToNoFontEl = () => {
  let fontWidth = widthInfo[0]*fontSize;
  let fontHeight = heightInfo[0]*fontSize;
  let gridGap = fontWidth*0.097;
  let gridLine = fontWidth*0.126;

  return `
    <div class="no-font" style="
      width: ${fontWidth}px;
      height: ${fontHeight}px;
      padding: ${fontHeight*0.168}px ${fontWidth*0.104}px;
    ">
      <div style="
        font-size: ${fontHeight*0.518}px; 
        background:
          linear-gradient(to bottom, transparent ${gridGap}px, #e9e9e9 ${gridGap}px) 0 0 / 100vw ${gridLine}px repeat-y,
          linear-gradient(to right, transparent ${gridGap}px, #e9e9e9 ${gridGap}px) 0 0 / ${gridLine}px 100vh repeat-x
          white;
      ">?</div>
    </div>
  `;
}

// 인자로 받은 'length'만큼 '빈 칸'을 출력하는 함수
const printSpaces = (length) => {
  let spaces = '';
  const spaceEl = changeWordToFontEl('띄어쓰기');
  
  for(let i = 0; i < length; i++) {
    spaces += spaceEl;
  }
  return spaces;
}

let wordLengthInOneLine = 0; // 한 줄안에 글자가 몇 개 인지 저장함(printFont 함수 종료시 초기화)
let lineBreakLength = 0; // 줄바꿈이 연속되는 횟수를 저장함(printFont 함수 종료시 초기화)
let printFontElWidth = 0; // 출력될 element의 너비임(printFont 함수 시작시 초기화)
let spaceMaxLength = 0; // 한 줄에 최대 몇 칸 출력할 수 있는지 저장함(printFont 함수 시작시 초기화)
const printFontElPadding = 20; // printFontEl의 좌우 패딩값

let isOpenedApostrophe = false; // 작은따옴표 여닫음 여부
let isOpenedQuotationMark = false; // 큰따옴표 여닫음 여부

const printFont = (text) => {
  // 현재 사이즈 확인, 저장
  printFontElWidth = printFontEl.clientWidth - printFontElPadding;
  spaceMaxLength = Math.floor(printFontElWidth / (widthInfo[0]*fontSize));

  // 출력을 위한 text 가공
  const printOneLine = printSpaces(spaceMaxLength);
  let printedText = '';

  const getRestLength = (wordLength) => {
    const lestLength = spaceMaxLength - wordLength;
    return lestLength === spaceMaxLength ? 0 : lestLength;
  }
  
  const checkLengthAndChangeLine = () => {
    if (wordLengthInOneLine % spaceMaxLength === 0) {
      wordLengthInOneLine = 0;
      printedText += '<div class="line-break"></div>';
    }
  }

  const AddToPrintedText = (fontEl) => {
    lineBreakLength = 0;
    wordLengthInOneLine++;
    printedText += fontEl;
    checkLengthAndChangeLine();
  }

  for(let word of text) {
    if (word === ' ') {
      AddToPrintedText(changeWordToFontEl('띄어쓰기'));
    } else if (word === "'") {
      AddToPrintedText(changeWordToFontEl(isOpenedApostrophe ? '닫는작은따옴표' : '여는작은따옴표'));
      isOpenedApostrophe = !isOpenedApostrophe;
    } else if (word === '"') {
      AddToPrintedText(changeWordToFontEl(isOpenedQuotationMark ? '닫는큰따옴표' : '여는큰따옴표'));
      isOpenedQuotationMark = !isOpenedQuotationMark;
    } else if (word === '\n') {
      // 빈 칸 채워주기
      printedText += printSpaces(getRestLength(wordLengthInOneLine));
      wordLengthInOneLine = 0;
      // 줄바꾸기
      lineBreakLength++;
      const lineBreakEl = lineBreakLength > 1
        ? `${printOneLine}<div class="line-break"></div>`
        : '<div class="line-break"></div>';
      printedText += lineBreakEl;
    } else {
      const fontEl = changeWordToFontEl(word) || changeWordToNoFontEl()
      AddToPrintedText(fontEl);
    }
  }

  // 출력
  printFontEl.innerHTML = printedText.length > 0
    ? `${printOneLine}<div class="line-break"></div>
      ${printedText + printSpaces(getRestLength(wordLengthInOneLine))}
      <div class="line-break"></div>${printOneLine}`
    : printOneLine;
  
  // 초기화
  wordLengthInOneLine = 0;
  lineBreakLength = 0;
  isOpenedApostrophe = false;
  isOpenedQuotationMark = false;
}

export default printFont;

export const fillPageWithSpace = (height) => {
  // 현재 사이즈 확인, 저장
  printFontElWidth = printFontEl.clientWidth - printFontElPadding;
  spaceMaxLength = Math.floor(printFontElWidth / (widthInfo[0]*fontSize));
  const LineToFill = Math.floor(height / (heightInfo[0]*fontSize));

  // 출력을 위한 text 가공
  const printOneLine = printSpaces(spaceMaxLength);
  let printedText = '';

  for(let i = 0; i < LineToFill; i++) {
    printedText += `<div class="line-break"></div>${printOneLine}`;
  }

  // 출력
  printFontEl.insertAdjacentHTML('beforeend', printedText);
}

window.addEventListener(`resize`, function() {
  const width = widthInfo[0]*fontSize;
  const currentWidth = printFontEl.clientWidth - printFontElPadding;
  if (spaceMaxLength * width > currentWidth || ((printFontElWidth + width) - currentWidth) <= 0) {
    printFont(textEl.value);
  }
});