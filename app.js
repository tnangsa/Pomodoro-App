const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const stopBtn = document.querySelector(".btn-stop");
const resetBtn = document.querySelector(".btn-reset");
const skipBtn = document.querySelector(".btn-skip");

const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const sessionDisplay = document.querySelector("#session-display");

const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 25;
const POMODOROS_BEFORE_LONG_BREAK = 4; //cycle length

// for display update
const modeDisplay = document.querySelector(".mode-label"); 
// selecting main circle container for styling changes
const appContainer = document.querySelector(".app-circle");

let currentMode = "work";
let workSessionsCompleted = 0;

let myInterval;
let state = true; //true = stopped/ready, false = running
let totalSeconds; //makes totalSeconds globally accessible 
let initialTimerAmount; //stores intial minute count



const switchMode = () => {
    //stops current timer and plays bell
    clearInterval(myInterval);
    bells.play();

    if (currentMode === "work") {
        workSessionsCompleted++; //increments completed sessions
        

        //checks if its time for a long break
        if (workSessionsCompleted % POMODOROS_BEFORE_LONG_BREAK === 0) {
            currentMode = "longBreak";
        } else {
            currentMode = "break";
        }
    }else {
        // if currentMode is break or longBreak, always switch back to work
        currentMode = "work";

        if (workSessionsCompleted === POMODOROS_BEFORE_LONG_BREAK) {
                workSessionsCompleted = 0;
            }
    }

    //determine new time based on new current Mode
    let newMinutes;
    let newLabel;

    appContainer.classList.remove('work-mode', 'break-mode', 'long-break-mode');

    if (currentMode === "work") {
        newMinutes = WORK_MINUTES;
        newLabel = "WORK SESSION";
        appContainer.classList.add('work-mode');
        console.log("Starting Work Session");
    } else if (currentMode === "break") {
        newMinutes = SHORT_BREAK_MINUTES;
        newLabel = "SHORT BREAK";
        appContainer.classList.add('break-mode');
        console.log("Starting Short Break");
    }else {
        newMinutes = LONG_BREAK_MINUTES;
        newLabel = "LONG BREAK";
        appContainer.classList.add('long-break-mode');
        console.log("Starting Long Break");
    }
    
    modeDisplay.textContent = newLabel;

    const sessionNumberToDisplay = workSessionsCompleted === 0 ? 0 : workSessionsCompleted % POMODOROS_BEFORE_LONG_BREAK === 0 ? POMODOROS_BEFORE_LONG_BREAK : workSessionsCompleted % POMODOROS_BEFORE_LONG_BREAK;
    sessionDisplay.textContent = `${sessionNumberToDisplay} / ${POMODOROS_BEFORE_LONG_BREAK}`;
    
    //sets up & start new session
    totalSeconds = newMinutes * 60;

    //updates the display w the new time
    minutesDisplay.textContent = newMinutes < 10 ? `0${newMinutes}` : newMinutes;
    secondsDisplay.textContent = "00";

    // restarts timer
    myInterval = setInterval(updateTimer, 1000);


};


//this updates Timer, is accessible globally bc it isnt inside startTimer const
const updateTimer = () => {
    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    
    if (secondsLeft < 10) {
        secondsDisplay.textContent = "0" + secondsLeft;
    } else {
        secondsDisplay.textContent = secondsLeft;

    }

    minutesDisplay.textContent = `${minutesLeft}`;

    // checks if time is up
    if (totalSeconds < 0) {
        // bells.play();
        //time is up, switch
        switchMode();
        return; // exits function 
    }
};

// -- START STOP RESET SKIP FUNCTIONS --

const startTimer = () => {
    const timerAmount = Number.parseInt(minutesDisplay.textContent);
    
    if (state) {
        state = false;
    
        //initialize totalSeconds only if its the start of a new timer
        if (totalSeconds === undefined || totalSeconds === 0) {
            initialTimerAmount = timerAmount; //store the initial value
            totalSeconds = timerAmount * 60;
            currentMode = "work";

            workSessionsCompleted = 0;
        }

        modeDisplay.textContent = "WORK SESSION";
        sessionDisplay.textContent = `${workSessionsCompleted} / ${POMODOROS_BEFORE_LONG_BREAK}`;
        
        appContainer.classList.remove('break-mode', 'long-break-mode');
        appContainer.classList.add('work-mode');

       
        myInterval = setInterval(updateTimer, 1000);

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
        totalSeconds = Number.parseInt(minutesDisplay.textContent) * 60;
    }

    //manually update the display to show the reset time
    const resetMinutes = Math.floor(totalSeconds / 60);
    minutesDisplay.textContent = resetMinutes;
    secondsDisplay.textContent = "00";

    modeDisplay.textContent = "WORK SESSION";
    appContainer.classList.remove('break-mode', 'long-break-mode'); 
    appContainer.classList.add('work-mode');

    workSessionsCompleted = 0;
    sessionDisplay.textContent = `0 / ${POMODOROS_BEFORE_LONG_BREAK}`;

    bells.pause();
    bells.currentTime = 0;

    
};

const skipToBreak = () => {
    if (currentMode === 'work') {
        switchMode();
    } else {
        alert("Cannot skip during a break.");
    }
};

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
skipBtn.addEventListener("click", skipToBreak);


