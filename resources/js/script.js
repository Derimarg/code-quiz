var timeLeft = 75;
var timerID;
var timerCount = document.getElementById("timer-count");
var startBtn = document.getElementById("start-button");
var startBlock = document.getElementById("start-block");
var questionBlock = document.getElementById("questions-block");
var questionIndex;
var randomQuestion;
var questionDo = document.getElementById("question");
var answerBtn = document.getElementById("answers");
var verifyAnswer = document.getElementById("verify-answer");
var nextBtn = document.getElementById("next-button");

var questionsBody = [
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


startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", () => {
    questionIndex++
    nextQuestion();
});

// start timer
function timeStart() {
    timeleft--;
    timerCount.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        // score();
    }
};

// start quiz
function startQuiz() {
    timerID = setInterval(timeStart, 1000);
    startBlock.classList.add("hidded");
    randomQuestion = questions.sort(() => Math.random() - .5)
    questionIndex = 0
    questionBlock.classList.remove("hidded");

    // clicking button timer will start
    timeStart();
    nextQuestion();
};

// next question
function nextQuestion() {
    clearStatus();
    showQuestion(randomQuestion[questionIndex]);
};

// show questions
function showQuestion(question) {
    questionDo.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerBtn.appendChild(button)
    })
};

// clear status
function clearStatus() {
    nextBtn.classList.add("hidded")
    verifyAnswer.classList.add("hidded")
    while (answerBtn.firstChild) {
        answerBtn.classList.removeChild(answerBtn.firstChild)
    }
};