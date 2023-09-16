let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval = 30;

const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('startStop');
const toggleIntervalBtn = document.getElementById('toggleInterval');
const chimeSound = document.getElementById('chime');

function updateDisplay() {
    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formattedHours = hours < 10 ? `0${hours}` : hours;
    timerDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function playChime() {
    chimeSound.play();
}

function toggleTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        startStopBtn.textContent = "Start";
    } else {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (interval - minutes === 2 && seconds === 0) {
                playChime();
            }
            if (minutes === interval) {
                clearInterval(timer);
                isRunning = false;
                startStopBtn.textContent = "Start";
            }
            if (minutes === 60) {
                hours++;
                minutes = 0;
            }
            updateDisplay();
        }, 1000);
        startStopBtn.textContent = "Stop";
    }
}

function toggleInterval() {
    if (
