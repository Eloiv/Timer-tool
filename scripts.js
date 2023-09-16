let timer;
let minutesLeft;
let secondsLeft;
let intervalDuration;
let isRunning = false;

document.querySelector('#start').addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    let selectedInterval = document.querySelector('input[name="interval"]:checked').value;
    intervalDuration = selectedInterval == "30min" ? 30 : 60; // Duration in minutes

    minutesLeft = intervalDuration - 1;
    secondsLeft = 59;
    updateDisplay();

    timer = setInterval(() => {
        if (secondsLeft == 0) {
            if (minutesLeft == 0) {
                clearInterval(timer);
                // Here you can add a sound or an alert to notify that the timer has ended.
            } else {
                minutesLeft--;
                secondsLeft = 59;
            }
        } else {
            secondsLeft--;
        }

        if (minutesLeft == 2 && secondsLeft == 0) {
            // Play a chime sound 2 minutes before the timer ends.
            let chime = new Audio('chime.mp3');
            chime.play();
        }

        updateDisplay();
    }, 1000);
});

document.querySelector('#stop').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

function updateDisplay() {
    let minString = minutesLeft.toString().padStart(2, '0');
    let secString = secondsLeft.toString().padStart(2, '0');
    document.getElementById('timer-display').textContent = `${minString}:${secString}`;
}
