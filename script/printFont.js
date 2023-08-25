import miFlowerFontData from './miFlowerFontData.js';
import { printFontEl, textEl } from './script.js';

let fontSize = 1;
export const changeFontSize = (size) => {
  fontSize = size;
}

// widthInfo, heightInfo 의 default값이 인덱스 0이다. 
// 인덱스 0자리가 가장 커야한다. '.' 한줄 칸 개수의 기준이됨
// 인덱스 1~5까지 스캔이미지 파일의 1~5 번호와 일치함
const widthInfo = [67, 66.4, 66.4, 66.4, 66.3, 66.4];
const heightInfo= [83, 82.85, 82.95, 82.9, 82.9, 82.85];

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
      <img src="./image/scan${scanNum}.jpg" alt="" style="width: ${imageWidth}px; transform: translate(-${width*x}px, -${height*y}px);">
    </div>
  `;
}

const changeWordToNoFont = () => {
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

const printSpaces = (length) => {
  let printOneLine = '';
  const spaceEl = changeWordToFontEl('띄어쓰기');
  
  for(let i = 0; i < length; i++) {
    printOneLine += spaceEl;
  }
  return printOneLine;
}

let wordLengthInOneLine = 0;
let lineBreakLength = 0;
let printFontElWidth = 0;
let spaceMaxLength = 0;
const printFontElPadding = 20;

const printFont = (text) => {
  printFontElWidth = printFontEl.clientWidth - printFontElPadding;
  spaceMaxLength = Math.floor(printFontElWidth / (widthInfo[0]*fontSize));
  const printOneLine = printSpaces(spaceMaxLength);
  let printedText = '';

  const calcurateRestLength = (wordLength) => {
    const lestLength = spaceMaxLength - (wordLength % spaceMaxLength);
    return lestLength === spaceMaxLength ? 0 : lestLength;
  }
  
  for(let word of text) {
    if (word === ' ') {
      lineBreakLength = 0;
      wordLengthInOneLine++;
      printedText += changeWordToFontEl('띄어쓰기');
      if (wordLengthInOneLine % spaceMaxLength === 0) {
        wordLengthInOneLine = 0;
        printedText += '<div class="line-break"></div>';
      }
      lineBreakLength = 0;
    } else if (word === '\n') {
      // 빈 칸 채워주기
      printedText += printSpaces(calcurateRestLength(wordLengthInOneLine));
      wordLengthInOneLine = 0;
      // 줄바꾸기
      lineBreakLength++;
      printedText += lineBreakLength > 1
      ? `<div class="line-break" style="height:${heightInfo[0]*fontSize}px;"></div>`
      : '<div class="line-break"></div>';
    } else {
      lineBreakLength = 0;
      wordLengthInOneLine++;
      let changedWord = changeWordToFontEl(word) || changeWordToNoFont();
      printedText += changedWord;
      if (wordLengthInOneLine % spaceMaxLength === 0) {
        wordLengthInOneLine = 0;
        printedText += '<div class="line-break"></div>';
      }
    }
  }
  printFontEl.innerHTML = printedText.length > 0
    ? `${printOneLine}<div class="line-break"></div>
      ${printedText + printSpaces(calcurateRestLength(wordLengthInOneLine))}
      <div class="line-break"></div>${printOneLine}`
    : printOneLine;
  
  // 초기화
  wordLengthInOneLine = 0;
  lineBreakLength = 0;
}

export default printFont;

window.addEventListener(`resize`, function() {
  const width = widthInfo[0]*fontSize;
  const currentWidth = printFontEl.clientWidth - printFontElPadding;
  if (spaceMaxLength * width > currentWidth || ((printFontElWidth + width) - currentWidth) <= 0) {
    printFont(textEl.value);
  }
});