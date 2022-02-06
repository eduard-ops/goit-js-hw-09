const bodyEl = document.querySelector('body');

const buttonStart = document.querySelector('button[data-start]');

const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onStartBtnColorClick);

buttonStop.addEventListener('click', onStopBtnColorClick);

let timerId = null;

const NOTIFICATION_DELEY = 1000;

let state = false;

disabledBtn();

function onStartBtnColorClick() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, NOTIFICATION_DELEY);
  state = true;
  disabledBtn();
}

function onStopBtnColorClick() {
  clearInterval(timerId);
  state = false;
  disabledBtn();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disabledBtn() {
  if (state) {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
  } else {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
  }
}
