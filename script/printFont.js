import miFlowerFontData from './miFlowerFontData.js';

let fontSize = 1;
export const changeFontSize = (size) => {
  fontSize = size;
}

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
    <div class="word" style="width: ${width}px; height: ${height}px;">
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

let checkLineBreakNum = 0;

const printFont = (text, printEl) => {
  let printedText = '';
  for(let word of text) {
    if (word === ' ') {
      checkLineBreakNum = 0;
      printedText += changeWordToFontEl('띄어쓰기');
      checkLineBreakNum = 0;
    } else if (word === '\n') {
      checkLineBreakNum++;
      printedText += checkLineBreakNum > 1 
      ? `<div class="line-break" style="height:${heightInfo[0]*fontSize}px;"></div>`
      : '<div class="line-break"></div>';
    } else {
      checkLineBreakNum = 0;
      let changedWord = changeWordToFontEl(word) || changeWordToNoFont();
      printedText += changedWord;
    }
  }
  printEl.innerHTML = printedText;
}

export default printFont;