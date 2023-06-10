import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {Notiflix} from 'notiflix/build/notiflix-notify-aio';

const calendar = document.querySelector("#datetime-picker");
const startBttn = document.querySelector("button[data-start]");
const timer = document.querySelector(".timer");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

let userDate  = null;
let isActive = false;
let timerId = null;

function pad (value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}
function startCountDown(){
    calendar.disabled=true;
    startBttn.disabled = true;
    if(isActive){
        return;
    }
    isActive = true;
    timerId = setInterval(()=>{
        const currentTime = Date.now();
        const distance = userDate - currentTime;
        const components = convertMs(distance);

        daysEl.textContent = components.days;
        hoursEl.textContent = components.hours;
        minutesEl.textContent = components.minutes;
        secondsEl.textContent = components.seconds;

        if (distance <= 0){
            clearInterval(timerId);
            timer.innerHTML = 'Time is over!'
        }
    }, 1000)
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < Date.now()){
           Notify.failure ("Please choose a date in the future");
           userDate = new Date();
        }
        else{
            startBttn.disabled = false;
            userDate = selectedDates[0]
        }
        
        
    },
  };

flatpickr(calendar, options);
startBttn.addEventListener("click", startCountDown);
