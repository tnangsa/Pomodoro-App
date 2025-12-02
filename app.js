const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const session = document.querySelector(".minutes");
let myInterval;
let state = true;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);
    
    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            // Function code here.
            const minuteDiv = document.querySelector(".minutes");
            const secondDiv = document.querySelector(".seconds");

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;
        };
        myInterval = setInterval(updateSeconds, 1000);
    }else {
        alert("Session has already started");
    }
};