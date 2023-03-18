import Notiflix from 'notiflix';

const form = document.querySelector('.form');

let timerId = null;
let isActive = false;

form.addEventListener('submit', submitedForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function submitedForm(e) {
  e.preventDefault();
  const formEl = e.currentTarget.elements;
  const time = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);

  let position = 1;
  let delay = time;
  for (let i = 0; i < amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      position = position + 1;
      delay += step;
  }
}
