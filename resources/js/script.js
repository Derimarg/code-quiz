// Start the quiz with a timer set to 75. Timer left also will be the final score.
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var nextButton = document.getElementById("next-button");
var questionContainerEl = document.getElementById("questions-block");
var startContainerEl = document.getElementById("start-block");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answers");
var checkAnswerEl = document.getElementById("verify-answer");
var viewHighScores = document.getElementById("score-link");
var submitButton = document.getElementById("submit-button");
var clearScoreButton = document.getElementById("clear-button");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("back-button");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQuestions, currentQuestionIndex;
let count = 0;

var questions = [
    {
        question: "Commonly used data types Do Not Include:",
        answers: [
            { text: "1. strings", correct: false },
            { text: "2. booleans", correct: true },
            { text: "3. alerts", correct: false },
            { text: "4. numbers", correct: false }
        ]
    },
    {
        question: "The conditions in an if/else statement is enclosed with __________.",
        answers: [
            { text: "1. quotes", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. parenthesis", correct: true },
            { text: "4. square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        answers: [
            { text: "1. numbers and strings", correct: false },
            { text: "2. other arrays", correct: false },
            { text: "3. booleans", correct: false },
            { text: "4. all of the above", correct: true }
        ]
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            { text: "1. commas", correct: false },
            { text: "2. curly brackets", correct: true },
            { text: "3. quotes", correct: false },
            { text: "4, parenthesis", correct: false }
        ]
    },
    {
        question: "A very useful tool used during development and debugger is:",
        answers: [
            { text: "1. JavaSccript", correct: false },
            { text: "2. terminal/bash", correct: false },
            { text: "3. for loops", correct: false },
            { text: "4. console.log", correct: true }
        ]
    },
];

// Start button trigger the first question and next button to display
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});


// Countdown timer
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}


// Start Quiz
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hidded");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidded");

    // Timer will start as soon as start button is clicked
    timeTick();
    setNextQuestion();
};


// Go to next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};


// Display questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};


// Reset state function
function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hidded")
    checkAnswerEl.classList.add("hidded")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};


// Select answer function
function selectAnswer(e) {
    var selectedButton = e.target;
    //console.dir(selectedButton);
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hidded")
    // Check if the answer correct or wrong then show text
    if (correct) {
        checkAnswerEl.innerHTML = "Correct!";
    } else {
        checkAnswerEl.innerHTML = "Wrong!";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // If the aswer is wrong, deduct time by 10
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hidded")
        checkAnswerEl.classList.remove("hidded")
    } else {
        startButton.classList.remove("hidded")
        saveScore();
    }
};


// Check and show the correct answer by set the buttons colors
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("good");
    } else {
        element.classList.add("bad");
    }
};


// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("good");
    element.classList.remove("bad");
};


// Save scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        //localStorage.setItem("scores", JSON.stringify(scores));
        questionContainerEl.classList.add("hidded");
        document.getElementById("score-block").classList.remove("hidded");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};


var loadScores = function () {
    // Get score from local storage

    if (!savedScores) {
        return false;
    }

    // Convert scores from stringfield format into array
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};


// Show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hidded")
    document.getElementById("score-block").classList.add("hidded");
    startContainerEl.classList.add("hidded");
    questionContainerEl.classList.add("hidded");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    //console.log(scores)
    for (i = 0; i < scores.length; i++) {
            var displayUser = document.createElement("div");
            displayUser.setAttribute("class", "name-user");
            displayUser.innerText = count + ". " + scores[i].initials + " - " + scores[i].timeLeft;
            highScoreEl.appendChild(displayUser);
       
            handleClick();
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

function handleClick() {
        count += 1;
    }
    handleClick();

// View high scores link
viewHighScores.addEventListener("click", showHighScores);


submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
    handleClick();
});

// Restart or reload the page
restartButton.addEventListener("click", function () {
    window.location.reload();
});


// Clear localStorage items 
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});