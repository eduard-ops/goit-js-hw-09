import flatpickr from 'flatpickr';

import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('input#datetime-picker');

const btnStart = document.querySelector('button[data-start]');

const DaysEl = document.querySelector('span[data-days]');
const HoursEl = document.querySelector('span[data-hours]');
const MinutesEl = document.querySelector('span[data-minutes]');
const SecondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= options.defaultDate) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
    Notiflix.Notify.success("Okay, Let's go");
  },
};

const fltpickr = flatpickr(inputEl, options);

const TIME_INTERVAR = 1000;

class Timer {
  constructor({ onStart }) {
    this.eventTime = null;
    this.intervalId = null;
    this.onStart = onStart;
    btnStart.disabled = true;
  }
  start() {
    this.eventTime = fltpickr.selectedDates[0].getTime();

    this.intervalId = setInterval(() => {
      const deltaTime = this.eventTime - Date.now();

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        return;
      }

      const converted = this.convertMs(deltaTime);
      this.onStart(converted);
    }, TIME_INTERVAR);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onStart: updateTimerInterface,
});

btnStart.addEventListener('click', timer.start.bind(timer));

function updateTimerInterface({ days, hours, minutes, seconds }) {
  DaysEl.textContent = `${days}`;
  HoursEl.textContent = `${hours}`;
  MinutesEl.textContent = `${minutes}`;
  SecondsEl.textContent = `${seconds}`;
}
