let url;
let params;
let countInterval;
let mainProcessInterval;
let mainProcessCount = 0;
let countNum = 3;
let sum = 0;
let loopCount = 0;

const count = () => {
  const sound = new Audio('../audio/click.mp3');
  sound.play();
  let countStr = '';
  const textElement = document.querySelector('.container_text');
  if (countNum == 3) { countStr = '③'; }
  if (countNum == 2) { countStr = '②'; }
  if (countNum == 1) { countStr = '①'; }
  textElement.innerHTML = countStr;
  setTimeout(() => {
    const textElement = document.querySelector('.container_text');
    textElement.innerHTML = "";
  }, 500)
  countNum--;
  if (countNum == 0) {
    clearInterval(countInterval);
    let bwtween = 0;
    if (parseFloat(params.get('between')) * 1000 >= 1000) {
      bwtween = 0
    } else {
      bwtween = parseFloat(params.get('between'));
    }
    setTimeout(() => {
      mainProcessInterval = setInterval(mainProcess, parseFloat(params.get('between')) * 1000)
    }, 1000 - bwtween);
    countNum = 3;
  }
}
const mainProcess = () => {
  mainProcessCount++;
  const sound = new Audio('../audio/route.mp3');
  sound.play();
  if (parseInt(params.get('timenum')) == mainProcessCount) {
    mainProcessCount = 0;
    clearInterval(mainProcessInterval);
    setTimeout(() => {
      //containerElement.innerHTML = '<div class="form"><label class="form_label">答えを入力</label><input class="form_input" type="text"><button class="form_button">回答</button></div>'
      //const formButtonElement = document.querySelector('.form_button');
      setTimeout(() => {
        const containerElement = document.querySelector('.container');
        containerElement.style = "background-color: white;";
        containerElement.innerHTML = '<div class="form" style="width: 100%;"><label class="form_label" style="font-size: 300px;">答え ' + sum + '</label><button onclick="window.location.reload();" class="form_button">もう一度挑戦</button><button onclick="window.location.href = \'../index.html\';" class="form_button">設定変更</button></div>'
        if (parseInt(params.get('loopcount')) + 1 == parseInt(params.get('loopnum'))) {
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 4000);
        } else {
          setTimeout(() => {
            let loopCount = parseInt(params.get('loopcount')) + 1;
            let willGotoUrl = '';
            for (let i = 0; i < window.location.href.length; i++) {
              if (window.location.href[window.location.href.length] == '=') { break; }
              willGotoUrl = window.location.href.slice(0, -1);
            }
            window.location.href = willGotoUrl + String(loopCount);
          }, 4000);
        }
      }, 4000)
    }, (parseFloat(params.get('between')) * 1000) / 2);
  }
  let result = '';
  for (let i = 0; i < parseInt(params.get('digitnum')); i++) {
    let resultMem = Math.floor(Math.random() * 10);
    if (resultMem != 0)
      result += String(resultMem);
    else
      i--;
  }
  if (params.get('subtraction') == 'true' && parseInt(result) <= sum) { result = '-' + result; }
  sum += parseInt(result);
  if (result < 0) { result = String(result).replace('-', '<span style="color: yellow;">-</span>'); }
  const textElement = document.querySelector('.container_text');
  textElement.innerHTML = result;
  setTimeout(() => {
    const textElement = document.querySelector('.container_text');
    textElement.innerHTML = "";
  }, (parseFloat(params.get('between')) * 1000) / 2);
}
window.addEventListener('load', () => {
  url = new URL(window.location.href);
  params = url.searchParams;
  document.title = params.get('digitnum') +"桁" + params.get('timenum') + "枚" + params.get('between') + "秒";
  countInterval = setInterval(count, 1000);
});
