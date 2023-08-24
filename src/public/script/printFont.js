import miFlowerFontData from './miFlowerFontData.js';

const changeWordToFontEl = (word) => {
  // 스캔 이미지라 크기가 조금씩 달라서 출력시 조절이 필요했다.
  // (widthInfo와 heightInfo의 인덱스) = (해당 이미지의 scanNum - 1)
  const widthInfo = [66.5, 66.5, 66.5, 66.3, 66.5];
  const heightInfo= [82.8, 83, 82.8, 82.8, 83];
  const wordInfo = miFlowerFontData.get(word);
  if (!wordInfo) {
    return '';
  }
  const x = wordInfo[1];
  const y = wordInfo[2];
  const scanNum = wordInfo[0];
  const width = widthInfo[scanNum -1];
  const height = heightInfo[scanNum -1];

  return `
  <div class="word" style="width: ${width}px; height: ${height}px;">
    <img src="./image/scan${scanNum}.jpg" alt="" style="transform: translate(-${width*x}px, -${height*y}px);">
  </div>
`
}

const printFont = (text, printEl) => {
  let printedText = '';
  for(let word of text) {
    if (word === ' ') {
      printedText += changeWordToFontEl('띄어쓰기');
    } else if (word === '\n') {
      printedText += '<div class="line-break"></div>';
    } else {
      printedText += changeWordToFontEl(word);
    }
  }
  printEl.innerHTML = printedText;
}

export default printFont;