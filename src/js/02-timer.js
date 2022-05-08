 import flatpickr from "flatpickr";
 import "flatpickr/dist/flatpickr.min.css";
 import Notiflix from 'notiflix';

 const refs = {
    datetimePicker: document.querySelector("#datetime-picker"),
    buttonStart: document.querySelector("[data-start]"),
    daysQuantity: document.querySelector("[data-days]"),
    hoursQuantity: document.querySelector("[data-hours]"),
    minutesQuantity: document.querySelector("[data-minutes]"),
    secondsQuantity: document.querySelector("[data-seconds]")
 };

 let  timerId = null;

 refs.buttonStart.setAttribute('disabled', true);

 const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      let quontatiTimeLeft = selectedDates[0] - new Date();
     
      if(quontatiTimeLeft>0){
        refs.buttonStart.removeAttribute('disabled', true);
        refs.buttonStart.addEventListener("click",convertMs (quontatiTimeLeft));      
        return
      };

      // alert("Please choose a date in the future");
      Notiflix.Notify.failure('Please choose a date in the future');
        

      refs.buttonStart.setAttribute('disabled', true);
     
    },
    
  };

 flatpickr(refs.datetimePicker, options)

 function pad(value){
    return String(value).padStart(2,"0")
  }


 function getTameComponents (time){
  const days = pad (Math.floor((time%(1000*60*60*24*365))/(1000*60*60*24)));
   const hours = pad(Math.floor((time%(1000*60*60*24))/(1000*60*60)));
   const mins = pad(Math.floor((time%(1000*60*60))/(1000*60)));
   const secs = pad(Math.floor((time%(1000*60))/1000))

   return{days,hours,mins,secs}  
 }

 function convertMs (time){
  clearInterval(timerId);

  timerId = setInterval(()=>{
    let{days,hours,mins,secs} = getTameComponents(time);
    time -= 1000;

    refs.daysQuantity.textContent = days;
    refs.hoursQuantity.textContent = hours;
    refs.minutesQuantity.textContent = mins;
    refs.secondsQuantity.textContent= secs;

    if (time<=0){
      clearInterval(timerId);
    }

    
  },1000)
 };
