function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', startChangingColor);
stopBtn.addEventListener('click', stopChangingColor);

function startChangingColor() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  
  startBtn.removeAttribute('enabled', 'enabled');
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled', 'disabled');
  stopBtn.setAttribute('enabled', 'enabled');
}

function stopChangingColor() {
  clearInterval(timerId);

  stopBtn.removeAttribute('enabled', 'enabled');
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled', 'disabled');
  startBtn.setAttribute('enabled', 'enabled');
}
