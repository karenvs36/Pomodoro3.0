document.addEventListener("DOMContentLoaded", function () {
    // Get HTML elements
    const timerDisplay = document.getElementById("timer");
    const playButton = document.querySelector(".control-buttons button:nth-of-type(1)");
    const pauseButton = document.querySelector(".control-buttons button:nth-of-type(2)");
    const restartButton = document.querySelector(".control-buttons button:nth-of-type(3)");
    const catImage = new Image();
    catImage.src = "cat.gif";

    let minutes = 0;
    let seconds = 2; // Adjusted for testing purposes
    let isPaused = false;
    let isBreak = false;
    let pomodoroCount = 0;

    let timerInterval;


    // Function to update the timer display in the HTML
    function updateTimerDisplay() {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Function to start the timer
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
                        document.getElementById('bellSound').play();
                        console.log("Starting study session...");
                        // Hide cat image if shown during break
                        hideCatImage();
                    } else {
                        if (pomodoroCount === 3) {
                            // Long break time after 4 pomodoros
                            minutes = 15;
                            isBreak = true;
                            pomodoroCount = 0;
                            console.log("Starting long break...");
                        } else {
                            // Short break time after each pomodoro
                            minutes = 5;
                            isBreak = true;
                            pomodoroCount++;
                            console.log("Starting short break...");
                        }
                        // Automatically start the timer for the break
                        startTimer();
                    }
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
        document.getElementById('clickSound').play(); // Play click sound
        // Start the timer only if it's not already running
        if (!timerInterval) {
            showJudgingCats(); // Show judging cat images at the beginning of the session
            startTimer();
        }
    });

    // Function to show judging cat images
    function showJudgingCats() {
        // Show the images by setting their bottom position to -100px
        document.querySelector('.judging-cat.left').style.bottom = '300px';
        document.querySelector('.judging-cat.right').style.bottom = '300px';

        // Move the gifs higher on the screen after a delay
        setTimeout(function () {
            document.querySelector('.judging-cat.left').style.bottom = '298px';
            document.querySelector('.judging-cat.right').style.bottom = '298px';
        }, 500); // Adjust the delay as needed
    }


    // Function to hide judging cat images
    function hideJudgingCats() {
        // Hide the images by setting their bottom position to -100px
        document.querySelector('.judging-cat.left').style.bottom = '-100px';
        document.querySelector('.judging-cat.right').style.bottom = '-100px';
    }

    // Show the initial timer
    updateTimerDisplay();
});
