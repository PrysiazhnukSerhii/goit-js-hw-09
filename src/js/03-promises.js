import Notiflix from 'notiflix';

const form=document.querySelector(".form");

let formData = {};
let amount = null;
let firstDelay = null;
let delayStep=null;

form.addEventListener("input",(e)=>formData[e.target.name] = e.target.value);

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  amount=Number(formData.amount);
  firstDelay = Number(formData.delay);
  delayStep = Number(formData.step);
  let i = 1;


  let idSetInterval = setInterval(()=>{
    if(amount===i){
      clearInterval(idSetInterval)
    }

    createPromise(i,firstDelay).then(resolve=> Notiflix.Notify.success(resolve)).catch(reject=> Notiflix.Notify.failure(reject))
    firstDelay+=delayStep
    i++;

  },firstDelay)

}




function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

 return new Promise((resolve, reject) => {
  
  if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } ;

 reject(`❌ Rejected promise ${position} in ${delay}ms`);
      
  });
  
}
