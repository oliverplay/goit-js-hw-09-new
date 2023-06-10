
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBttn = document.querySelector("[data-start]");
const stopBttn = document.querySelector("[data-stop]");

let timerID = null;

stopBttn.disabled = true;

startBttn.addEventListener('click', ()=>{
    timerID = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
        startBttn.disabled = true;
        stopBttn.disabled = false;
    },1000)
});

stopBttn.addEventListener('click', ()=>{
    clearInterval(timerID);
    startBttn.disabled = false;
    stopBttn.disabled = true;
})