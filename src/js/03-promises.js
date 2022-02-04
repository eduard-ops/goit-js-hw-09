import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', setPromise);

let amountValue = null;
let delayTime = null;
let firstDelayInputValue = null;

function setPromise(evt) {
  evt.preventDefault();

  const { elements } = evt.currentTarget;

  const { delay, step, amount } = elements;
  amountValue = Number(amount.value);
  delayTime = Number(step.value);
  firstDelayInputValue = Number(delay.value);

  generatePromises(amountValue, firstDelayInputValue);

  evt.target.reset();
}

function generatePromises(amountValue, firstDelayInputValue) {
  let position = null;

  for (let i = 0; i < amountValue; i++) {
    if (i > 0) {
      firstDelayInputValue += delayTime;
    }

    position += 1;

    createPromise(position, firstDelayInputValue)
      .then(({ position, delayTime }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayTime}ms`);
      })
      .catch(({ position, delayTime }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayTime}ms`);
      });

    function createPromise(position, delayTime) {
      const shouldResolve = Math.random() > 0.3;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delayTime });
          } else {
            reject({ position, delayTime });
          }
        }, firstDelayInputValue);
      });
    }
  }
}
