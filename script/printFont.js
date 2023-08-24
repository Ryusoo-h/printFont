import miFlowerFontData from './miFlowerFontData.js';

const widthInfo = [67, 66.5, 66.5, 66.5, 66.3, 66.5];
const heightInfo= [83, 82.8, 83, 82.8, 82.8, 83];
const fontWidth = widthInfo[0];
const fontHeight = heightInfo[0];
const gridGap = fontWidth*0.097;
const gridLine = fontWidth*0.126;

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
  const width = widthInfo[scanNum];
  const height = heightInfo[scanNum];

  return `
  <div class="word" style="width: ${width}px; height: ${height}px;">
    <img src="./image/scan${scanNum}.jpg" alt="" style="transform: translate(-${width*x}px, -${height*y}px);">
  </div>
`
}

const noFont = `
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
`

const printFont = (text, printEl) => {
  let printedText = '';
  for(let word of text) {
    if (word === ' ') {
      printedText += changeWordToFontEl('띄어쓰기');
    } else if (word === '\n') {
      printedText += '<div class="line-break"></div>';
    } else {
      let changedWord = changeWordToFontEl(word) || noFont;
      console.log(word, changedWord);
      printedText += changedWord;
    }
  }
  printEl.innerHTML = printedText;
}

export default printFont;