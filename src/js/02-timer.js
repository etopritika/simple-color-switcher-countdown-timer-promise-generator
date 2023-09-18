// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const currentDate = new Date();
let timerId = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      turnOnBtn(startClockFace());
      function startClockFace() {
        if (isActive) {
          return;
        }
        isActive = true;

        timerId = setInterval(() => {
          const currentTime = Date.now();
          const timeLeft = selectedDates[0] - currentTime;
          const time = convertMs(timeLeft);
          updateClockFace(time);
          if (timeLeft < 999) {
            clearInterval(timerId);
          }
        }, 1000);
      }
    }
  },
};

flatpickr(timeInput, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor((ms % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((ms % minute) / second));
  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function turnOnBtn(startClockFace) {
  startBtn.addEventListener('click', startClockFace);
  startBtn.removeAttribute('disabled');
  startBtn.setAttribute('enabled', 'enabled');
}
