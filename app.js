const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const session = document.querySelector(".minutes");
let myInterval;
let state = true;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);
}