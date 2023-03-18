import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name=delay]');
console.log(delayEl);
const stepEl = document.querySelector('[name=step]');
const amountEl = document.querySelector('[name=amount]');
let timerId = null;
let isActive = false;

formEl.addEventListener('submit', submitedForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function submitedForm(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.target;

  const delayValue = delay.value;
  console.log(delay.value);
  const stepValue = step.value;
  const amaountValue = amount.value;
  promiseCreator(delayValue, stepValue, amaountValue);
}

function promiseCreator(delayValue, stepValue, amaountValue) {
  let alertStep = 1;
  console.log(delayValue);
  setTimeout(() => {
    if (isActive) {
      return;
    }
    isActive = true;
    timerId = setInterval(() => {
      createPromise(alertStep, delayValue)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      alertStep = alertStep + 1;
      delayValue = Number(delayValue) + Number(stepValue);
      if (alertStep === Number(amaountValue) + 1) {
        clearInterval(timerId);
      }
    }, stepValue);
  }, delayValue);
}
