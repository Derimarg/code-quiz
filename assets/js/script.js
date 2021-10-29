var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer-count");
var startBtn = document.getElementById("st-btn");
var nextBtn = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("q-block");
var startContainerEl = document.getElementById("st-block");
var questionEl = document.getElementById("question");
var answerBtnsEl = document.getElementById("answers");
var checkAnswerEl = document.getElementById("verify-answer");
var viewHighScores = document.getElementById("sc-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreBtn = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-initials");
var restartBtn = document.getElementById("back-btn");
var scoreField = document.getElementById("player-sc");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQ, currentQIndex;
let count = 0;

var questions = [
  {
    question: "Commonly used data types Do Not Include:",
    answers: [
      { text: "1. strings", result: false },
      { text: "2. booleans", result: true },
      { text: "3. alerts", result: false },
      { text: "4. numbers", result: false },
    ],
  },
  {
    question:
      "The conditions in an if/else statement is enclosed with __________.",
    answers: [
      { text: "1. quotes", result: false },
      { text: "2. curly brackets", result: false },
      { text: "3. parenthesis", result: true },
      { text: "4. square brackets", result: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store _________.",
    answers: [
      { text: "1. numbers and strings", result: false },
      { text: "2. other arrays", result: false },
      { text: "3. booleans", result: false },
      { text: "4. all of the above", result: true },
    ],
  },
  {
    question:
      "String values must be enclosed within ________ when being assigned to variables.",
    answers: [
      { text: "1. commas", result: false },
      { text: "2. curly brackets", result: true },
      { text: "3. quotes", result: false },
      { text: "4, parenthesis", result: false },
    ],
  },
  {
    question: "A very useful tool used during development and debugger is:",
    answers: [
      { text: "1. JavaSccript", result: false },
      { text: "2. terminal/bash", result: false },
      { text: "3. for loops", result: false },
      { text: "4. console.log", result: true },
    ],
  },
];

// Start first question and next button
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQIndex++;
  setNextQuestion();
});

// Countdown timer
function timeTick() {
  timeLeft--;
  timerEl.textContent = "Time: " + timeLeft;
  if (timeLeft <= 0) {
    saveScore();
  }
}

// Start Game
function startGame() {
  timerID = setInterval(timeTick, 1000);
  startContainerEl.classList.add("hidden");
  shuffledQ = questions.sort(() => Math.random() - 0.5);
  currentQIndex = 0;
  questionContainerEl.classList.remove("hidden");

  timeTick();
  setNextQuestion();
}

// Next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQ[currentQIndex]);
}

// Display questions
function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.result) {
      button.dataset.result = answer.result;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnsEl.appendChild(button);
  });
}

// Reset state
function resetState() {
  nextBtn.classList.add("hidden");
  checkAnswerEl.classList.add("hidden");
  while (answerBtnsEl.firstChild) {
    answerBtnsEl.removeChild(answerBtnsEl.firstChild);
  }
}

// Select answer
function selectAnswer(e) {
  var selectedButton = e.target;
  var result = selectedButton.dataset.result;
  checkAnswerEl.classList.remove("hidden");
  if (result) {
    checkAnswerEl.innerHTML = "Correct!";
  } else {
    checkAnswerEl.innerHTML = "Wrong!";
    if (timeLeft <= 10) {
      timeLeft = 0;
    } else {
      timeLeft -= 10;
    }
  }

  Array.from(answerBtnsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.result);
  });

  if (shuffledQ.length > currentQIndex + 1) {
    nextBtn.classList.remove("hidden");
    checkAnswerEl.classList.remove("hidden");
  } else {
    startBtn.classList.remove("hidden");
    saveScore();
  }
}

// Check and show the result answer by set the buttons colors
function setStatusClass(element, result) {
  clearStatusClass(element);
  if (result) {
    element.classList.add("good");
  } else {
    element.classList.add("bad");
  }
}

// Remove all classes
function clearStatusClass(element) {
  element.classList.remove("good");
  element.classList.remove("bad");
}

// Save scores
function saveScore() {
  clearInterval(timerID);
  timerEl.textContent = "Time: " + timeLeft;
  setTimeout(function () {
    questionContainerEl.classList.add("hidden");
    document.getElementById("score-block").classList.remove("hidden");
    document.getElementById("your-score").textContent =
      "Your final score is " + timeLeft + ".";
  }, 2000);
}

var loadScores = function () {
  // Get score from local storage

  if (!savedScores) {
    return false;
  }

  savedScores = JSON.parse(savedScores);
  var initials = document.querySelector("#initials-field").value;

  var newScore = {
    score: timeLeft,
    initials: initials,
  };
  savedScores.push(newScore);
  console.log(savedScores);

  savedScores.forEach((score) => {
    initialsField.innerText = score.initials;
    scoreField.innerText = score.score;
  });
};

// Show high scores
function showHighScores(initials) {
  document.getElementById("highscores").classList.remove("hidden");
  document.getElementById("score-block").classList.add("hidden");
  startContainerEl.classList.add("hidden");
  questionContainerEl.classList.add("hidden");
  if (typeof initials == "string") {
    var score = {
      initials,
      timeLeft,
    };
    scores.push(score);
  }

  var highScoreEl = document.getElementById("highscore");
  highScoreEl.innerHTML = "";

  for (i = 0; i < scores.length; i++) {
    var displayUser = document.createElement("div");
    displayUser.setAttribute("class", "initials");
    displayUser.innerText =
      count + ". " + scores[i].initials + " - " + scores[i].timeLeft;
    highScoreEl.appendChild(displayUser);

    handleClick();
  }

  localStorage.setItem("scores", JSON.stringify(scores));
}

function handleClick() {
  count += 1;
}
handleClick();

// View high scores
viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials-field").value;
  showHighScores(initials);
  handleClick();
});

// Restart or reload the page
restartBtn.addEventListener("click", function () {
  window.location.reload();
});

// Clear localStorage items
clearScoreBtn.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscore").innerHTML = "";
});
