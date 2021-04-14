import './css/style.css' 
import refs from './refs.js'
   

class Timer  {
  constructor({ onTick }, date) {
    this.onTick = onTick
    this.date = date
  }
    
  getCountDown() {
    const timeOfEnd = new Date(this.date);

    setInterval(() => {
      const currentTime = Date.now()
      const deltaTime = timeOfEnd - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time)
        }, 1000)
  }
  
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs };
  }
  
  pad(value) {
    return String(value).padStart(2, '0');
  }
  startTime() {
    this.getCountDown()
  }
}


const timer = new Timer({
  onTick: updateClockface
}, 'May 08, 2021')

function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}


timer.startTime()
