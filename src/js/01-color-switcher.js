const bodyEl = document.querySelector('body');

const buttonStart = document.querySelector('button[data-start]');

const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onStartBtnColorClick);

buttonStop.addEventListener('click', onStopBtnColorClick);

let timerId = null;

const NOTIFICATION_DELEY = 1000;

function onStartBtnColorClick() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, NOTIFICATION_DELEY);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function onStopBtnColorClick() {
  clearInterval(timerId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
