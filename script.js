let timer;
let timeLeft; // in seconds
let isRunning = false;

const workDuration = 25 * 60; // 25 minutes
const breakDuration = 5 * 60; // 5 minutes

// Default to work mode
let currentMode = "work";

// Audio objects for sound effects
const alarmSound = new Audio('assets/WAKE THE FUCK UP.mp3');   // Alarm sound for timer completion
const buttonSound = new Audio('assets/Music1.mp3'); // Button click sound

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const workModeButton = document.getElementById("work-mode");
const breakModeButton = document.getElementById("break-mode");

function initializeTimer() {
  timeLeft = currentMode === "work" ? workDuration : breakDuration;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alarmSound.play(); // Play alarm sound when time's up
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  pauseTimer();
  initializeTimer();
}

function switchMode(mode) {
  currentMode = mode;
  workModeButton.classList.toggle("active", mode === "work");
  breakModeButton.classList.toggle("active", mode === "break");
  resetTimer();
}

// Event listeners with button sound feedback
startButton.addEventListener("click", () => {
  startTimer();
  buttonSound.play();
});
pauseButton.addEventListener("click", () => {
  pauseTimer();
  buttonSound.play();
});
resetButton.addEventListener("click", () => {
  resetTimer();
  buttonSound.play();
});
workModeButton.addEventListener("click", () => {
  switchMode("work");
  buttonSound.play();
});
breakModeButton.addEventListener("click", () => {
  switchMode("break");
  buttonSound.play();
});

// Initialize timer on page load
initializeTimer();
