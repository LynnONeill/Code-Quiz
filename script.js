let startBtnEl = document.getElementById("start");
let questionEl = document.getElementById("question");
let timerTextEl = document.getElementById("timerText");
let secondsDisplay = document.getElementById("secondsCounter");
let minutesDisplay = document.getElementById("minutesCounter");
let timerInterval;
let scoreEl = document.getElementById("score");
let result = document.getElementById("result");
let a0 = document.getElementById("choiceA");
let a1 = document.getElementById("choiceB");
let a2 = document.getElementById("choiceC");
let a3 = document.getElementById("choiceD");

let radioA = document.getElementById("choiceA_radio");
let radioB = document.getElementById("choiceB_radio");
let radioC = document.getElementById("choiceC_radio");
let radioD = document.getElementById("choiceD_radio");

let lastQuestion = question.length - 1;
let currentQuestion = 0;
let currentScore = 0;
let secondsLeft = 15;
let minutesLeft = 0;
let correctAnswer = "";


localStorage.setItem("questions", JSON.stringify(questions));
let newQuestions = JSON.parse(localStorage.getItem("questions"));

function displayQuestions(q) {
    if (newQuestions.length > q) {
        questionEl.textContent = newQuestions[q]["title"];
        correctAnswer = newQuestions[q]["answer"];
        //set text content of button labels //
        a0.textContent = newQuestions[q]["choices"][0];
        a1.textContent = newQuestions[q]["choices"][1];
        a2.textContent = newQuestions[q]["choices"][2];
        a3.textContent = newQuestions[q]["choices"][3];
        // set value of buttons //
        radioA.value = newQuestions[q]["choices"][0];
        radioB.value = newQuestions[q]["choices"][1];
        radioC.value = newQuestions[q]["choices"][2];
        radioD.value = newQuestions[q]["choices"][3];
        // reset unchecked value of all buttons when questions are loaded //
        radioA.checked = false;
        radioB.checked = false;
        radioC.checked = false;
        radioD.checked = false;
    } else {
        endQuiz();
    }
}

displayQuestions(0);


function submit() {
    // check to make sure that any answer was selected //
    let allButtons = document.getElementsByClassName("choices");
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i].checked) {
            //check to see if answer selected matches correct answer (increase score, and alert correct)//
            if (allButtons[i].value == correctAnswer) {
                result.textContent = "Correct!"
                currentScore++;
            } else {
                // if answer is incorrect deduct 5 seconds from clock and alert incorrect //
                if (secondsLeft > 5) { }
                secondsLeft -= 5;
                result.textContent = "Wrong! You just lost 5 seconds!"
                result.style.color = "red";
            }
        }
    }
}

startBtnEl.addEventListener("click", function () {
    startBtnEl.style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("timerText").style.display = "block";
    setTimer();
    displayQuestions(0);
});

document.getElementById("submit").addEventListener("click", function () {
    submit();
    currentQuestion++;
    displayQuestions(currentQuestion);
});
document.getElementById("saveScore").addEventListener("click", function () {
    saveScore();
    alert("Thank you for playing!  Your score has been saved!")
})


// Code below is for the timer and timer display //

function setTimer() {
    secondsLeft++;
    timerInterval = setInterval(function () {
        formatTime();
    }, 1000);
}

function formatTime() {
    if (secondsLeft <= 0) {
        if (minutesLeft > 0) {
            minutesLeft--;
        }
        secondsLeft = 59;
    } else {
        secondsLeft--;
    }

    if (secondsLeft < 10) {
        secondsDisplay.textContent = "0" + secondsLeft;
    } else {
        secondsDisplay.textContent = secondsLeft;
    }

    if (minutesLeft < 10) {
        minutesDisplay.textContent = "0" + minutesLeft;
    } else {
        minutesDisplay.textContent = minutesLeft;
    }

    if (minutesLeft == 0 && secondsLeft == 0) {
        stopTimer();
        endQuiz();
    }
}
function stopTimer() {
    clearInterval(timerInterval);
    minutesLeft = 0;
    secondsLeft = 0;
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
}

function endQuiz() {
    document.getElementById("initials").style.display = "block";
    document.getElementById("endQuiz").style.display = "block";
    document.getElementById("quiz").style.display = "none";
    clearInterval(timerInterval);
    result.textContent = "Game Over!";
    document.getElementById("score").textContent = "Your score is " + currentScore + "/" + newQuestions.length;
}

function saveScore() {
    let initials = document.getElementById("initials").value;
    localStorage.setItem("user", initials);
    localStorage.setItem("score", currentScore);
}


// if (newQuestions.length > 0 && minutesLeft == 0 && secondsLeft == 0) {
    // timerTextEl.value = "Time's Up!";
// }




