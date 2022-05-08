
const refs = {
buttonStart: document.querySelector("[data-start]"),
buttonStop: document.querySelector("[data-stop]")
};

let timerId = null;


refs.buttonStart.addEventListener("click",changeColor);
refs.buttonStop.addEventListener("click",stopChangeColor);



function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

function changeColor (){
    refs.buttonStart.removeEventListener("click",changeColor)

    document.body.style.backgroundColor = getRandomHexColor();

    timerId =  setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
    },1000)
};


function stopChangeColor (){
    clearInterval(timerId)

    refs.buttonStart.addEventListener("click",changeColor);
};

//--