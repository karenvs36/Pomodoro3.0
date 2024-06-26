// Get HTML elements
const timerDisplay = document.getElementById("timer");
const playButton = document.querySelector(".control-buttons button:nth-of-type(1)");
const pauseButton = document.querySelector(".control-buttons button:nth-of-type(2)");
const restartButton = document.querySelector(".control-buttons button:nth-of-type(3)"); // New line
const breakSound = document.getElementById("breakSound");
const judgingCatImages = document.querySelectorAll('.judging-cat');
const catImages = document.querySelectorAll('.cat');

let minutes = 25;
let seconds = 0; // Adjusted for testing purposes
let isPaused = false;
let isBreak = false;
let pomodoroCount = 0;

let timerInterval;

// Function to update the timer display in the HTML
function updateTimerDisplay() {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        if (!isPaused) {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    if (isBreak) {
                        // Time for study after each break
                        minutes = 25; // Change back to 25 minutes for study session
                        seconds = 0;
                        isBreak = false;
                        console.log("Starting study session...");
                        document.body.classList.remove('break-time'); // Remove break-time class
                        showJudgingCatImages(); // Show the judging cat images

                        breakSound.pause(); // Pause the break sound
                    } else {
                        document.getElementById('bellSound').play(); // Play bell sound for the end of the study session
                        if (pomodoroCount === 3) {
                            // Long break time after 4 pomodoros
                            
                            minutes = 20;
                            seconds = 0;
                            isBreak = true;
                            pomodoroCount = 0;
                            breakSound.play();
                            console.log("Starting long break...");
                            
                            showCatImages(); // Show the cat images
                            document.body.classList.add('break-time'); // Add break-time class
                            hideJudgingCatImages(); 
                            


                            breakSound.pause();
                        } else {
                            // Short break time after each pomodoro
                            minutes = 5;
                            isBreak = true;
                            pomodoroCount++;
                            console.log("Starting short break...");
                            showCatImages(); // Show the cat images
                            breakSound.play(); // Play nyan sound
                            hideJudgingCatImages(); // Hide the judging cat images
                            document.body.classList.add('break-time'); // Add break-time class
                        }
                    }
                    updateTimerDisplay();
                    // Automatically start the timer for the break or work session
                    startTimer();
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }
    }, 1000);
}

// Click event for the play button
playButton.addEventListener("click", function () {
    isPaused = false;
    // Start the timer only if it's not already running
    if (!timerInterval) {
        startTimer();
    }
});

// Click event for the pause button
pauseButton.addEventListener("click", function () {
    isPaused = true; // Pause the timer
});


// Function to show cat images
function showCatImages() {
    catImages.forEach(cat => {
        cat.style.bottom = '298px';
    });
}

// Function to hide judging cat images
function hideJudgingCatImages() {
    console.log("Hiding judging cat images...");
    judgingCatImages.forEach(cat => {
        cat.style.display = 'none';
    });
}

// Function to show judging cat images
function showJudgingCatImages() {
    console.log("Showing judging cat images...");
    judgingCatImages.forEach(cat => {
        cat.style.display = 'block';
    });
}

// Show the initial timer
updateTimerDisplay();
//commit//comment