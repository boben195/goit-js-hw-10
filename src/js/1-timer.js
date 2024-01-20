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



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() > Date.now()) {
          userSelectedDate = selectedDates[0].getTime();
         
      } else {
          iziToast.show({
              message: 'Welcome!',
              close: false,
              closeOnClick: true,
          })
    }
  },
};

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