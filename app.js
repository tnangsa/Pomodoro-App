const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const stopBtn = document.querySelector(".btn-stop");
const resetBtn = document.querySelector(".btn-reset");

const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");

let myInterval;
let state = true;
let totalSeconds; //makes totalSeconds globally accessible 
let initialTimerAmount; //stores intial minute count

//this updates Timer, is accessible globally bc it isnt inside startTimer const
const updateTimer = () => {
    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    //
    if (secondsLeft < 10) {
        secondsDisplay.textContent = "0" + secondsLeft;
    } else {
        secondsDisplay.textContent = secondsLeft;

    }

    minutesDisplay.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
        state = true; //means timer is finished
    }
};

const startTimer = () => {
    const timerAmount = Number.parseInt(minutesDisplay.textContent);
    
    if (state) {
        state = false;
    
        //initialize totalSeconds only if its the start of a new timer
        if (totalSeconds === undefined || totalSeconds === 0) {
            initialTimerAmount = timerAmount; //store the initial value
            totalSeconds = timerAmount * 60;
        }
        const updateSeconds = () => {
            totalSeconds--;
            updateTimer(); 
        };
        myInterval = setInterval(updateSeconds, 1000);

        } else {
            alert("Session has already started.");
        }
};


const stopTimer = () => {
    clearInterval(myInterval);
    state = true; //allows timer to be started again from the stopped point
};

const resetTimer = () => {
    clearInterval(myInterval);
    state = true; //allows timer to be started again
    
    //resets initial timer amount or a default if its not set
    if (initialTimerAmount !== undefined) {
        totalSeconds = initialTimerAmount * 60;
    }else {
        // uses current value on page if not started yet
        totalSeconds = Number.parseInt(timer.textContent) * 60;
    }

    //manually update the display to show the reset time
    minutesDisplay.textContent = `${Math.floor(totalSeconds / 60)}`;
    secondsDisplay.textContent = "00";

    
};

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);