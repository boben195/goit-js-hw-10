import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.getElementById('datetime-picker');
const btn = document.querySelector('button');
const dayTime = document.querySelector('span[data-days]');
const hourTime = document.querySelector('span[data-hours]');
const minuteTime = document.querySelector('span[data-minutes]');
const secondTime = document.querySelector('span[data-seconds]');

let userSelectedDate;

btn.disabled = true;
input.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() > Date.now()) {
        userSelectedDate = selectedDates[0].getTime();
        btn.disabled = false;
        btn.classList.remove('disabled');
         
      } else {
          iziToast.show({
              message: 'Please choose a date in the future!',
              close: false,
              closeOnClick: true,
          })
        btn.disabled = true;
        btn.classList.add('disabled')
    }
  },
};

flatpickr('#datetime-picker', options);
btn.addEventListener('click', elem => {
  const timer = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const timeValue = convertMs(diff);
    if (diff <= 0) {
      clearInterval(timer);
      btn.disabled = false;
      btn.classList.remove('disabled');
      input.disabled = false;
      input.classList.remove('disabled');
    } else {
      dayTime.textContent = addLeadingZero(timeValue.days);
      hourTime.textContent = addLeadingZero(timeValue.hours);
      minuteTime.textContent = addLeadingZero(timeValue.minutes);
      secondTime.textContent = addLeadingZero(timeValue.seconds);
    }
  }, 1000);
  btn.disabled = true;
  btn.classList.add('disabled');
  input.disabled = true;
  input.classList.add('disabled');
});

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}


function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}