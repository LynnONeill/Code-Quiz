let startBtnEl = document.getElementById("start");
let quizEl = document.getElementById("quiz");
let questionEl = document.getElementById("question");
let qImtEl = document.getElementById("qImg");
let secondsCounterEl = document.getElementById("secondsCounter");
let timeGuageEl = document.getElementById("timeGuage");
let progressEl = document.getElementById("progress");
let scoreEl = document.getElementById("score");
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
let secondsLeft = 45;
let correctAnswer =""


localStorage.setItem("questions", JSON.stringify(questions));


function displayQuestions(q){
    let newQuestions = JSON.parse(localStorage.getItem("questions"));

    questionEl.textContent = newQuestions[q]["title"];
    correctAnswer = newQuestions[q]["answer"];
    
    //labels
    a0.textContent = newQuestions[q]["choices"][0]; 
    a1.textContent = newQuestions[q]["choices"][1];
    a2.textContent = newQuestions[q]["choices"][2];
    a3.textContent = newQuestions[q]["choices"][3];
   
    radioA.value = newQuestions[q]["choices"][0];
    radioB.value = newQuestions[q]["choices"][1];
    radioC.value = newQuestions[q]["choices"][2];
    radioD.value = newQuestions[q]["choices"][3];
}

displayQuestions(0);



function submit() {
    // check to make sure that an answer was selected
    let allButtons = document.getElementsByClassName("choices");
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i].checked) {
            // what it value
            if (allButtons[i].value == correctAnswer) {
                alert("Correct!");
            } else {
                alert("Incorrect!");
            }
        }
    }

    
    //check to see if answer selected matches correct answer
    // if correct currentScore++
    // alert that the answer is correct
    // if incorrect deduct 5 seconds from timer
    // if incorrect alert that the answer was incorrect
}



function setTimer() {
    let timerInverval = setInterval(function() {
        secondsLeft--;
        timeGuage.textContent = secondsLeft +" seconds remaing to complete quiz." ;

        if (secondsLeft <= -1) {
            // clearInterval(timerInterval);
            timeGuage.textContent = "";
            sendMessage();
        }
    }, 1000);
}

startBtnEl.addEventListener("click", function() {
    startBtnEl.style.display = "none";
    setTimer();
    displayQuestions();
})

document.getElementById("submit").addEventListener("click", function() {
    submit();
})
document.getElementById("next").addEventListener("click", function() {
    currentQuestion++;
    displayQuestions(currentQuestion);
})
// Create function to keep track of score. //

function updateScore () {
    scoreEl.innerHTML = currentScore;
}

// Create function to start a timer for the quiz. //



function sendMessage() {
    timeGuage.textContent = " ";
}






