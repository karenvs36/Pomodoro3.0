document.addEventListener("DOMContentLoaded", function () {
    // Get HTML elements
    const timerDisplay = document.getElementById("timer");
    const playButton = document.querySelector(".control-buttons button:nth-of-type(1)");
    const pauseButton = document.querySelector(".control-buttons button:nth-of-type(2)");
    const restartButton = document.querySelector(".control-buttons button:nth-of-type(3)");
    const judgingCatImages = document.querySelectorAll('.judging-cat');
    const breakCatImage = new Image();
    breakCatImage.src = "cat.gif";
    const breakSound = document.getElementById("breakSound");

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
                            hideCatImage(); // Hide the break cat image
                        } else {
                            document.getElementById('bellSound').play(); // Play bell sound for the end of the study session
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
                                showCatImage(); // Show the break cat image
                                breakSound.play(); // Play nyan sound
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
        document.getElementById('clickSound').play(); // Play click sound
        // Start the timer only if it's not already running
        if (!timerInterval) {
            if (!isBreak) {
                showJudgingCats(); // Show judging cat images at the beginning of the session
            } else {
                showCatImage(); // Show break cat image
            }
            startTimer();
        }
    });

    // Function to show judging cat images
    function showJudgingCats() {
        judgingCatImages.forEach(cat => {
            cat.style.bottom = '300px';
        });
        // Move the gifs higher on the screen after a delay
        setTimeout(function () {
            judgingCatImages.forEach(cat => {
                cat.style.bottom = '298px';
            });
        }, 500); // Adjust the delay as needed
    }

    // Function to show break cat image
    function showCatImage() {
        breakCatImage.style.bottom = '298px';
    }

    // Function to hide break cat image
    function hideCatImage() {
        breakCatImage.style.bottom = '-100px';
    }

    // Show the initial timer
    updateTimerDisplay();
});
