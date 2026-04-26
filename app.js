// This section builds an understanding of Array and nested Array

const Quiz = [
    {

      question: "What is the Capital of China?",
      options: ["Tokyo", "Hong Kong", "Beijing", "Chinatown"],
      answer: "Beijing"

    },
    {

      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars"

    },
    {

      question: "Which ocean is the largest?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean"

    },
    {

      question: "What color do you get when you mix red and white?",
      options: ["Pink", "Yellow", "Purple", "Orange"],
      answer: "Pink"

    },
    {

      question: "Carrot was originally what color?",
      options: ["Yellow", "Orange", "Purple", "Green"],
      answer: "Purple"

    },

];


// this section declares all Ids on the html 

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const restartBtn = document.getElementById("restart-btn");

// State management- to track: currentQuestion, currenrScore and selecdtedOption(answers)

let currentQuestionIndex = 0;
let currentScore = 0;
let answers = new Array(Quiz.length).fill(null);

// display the questions and options //

function displayQuestion() {
  const current = Quiz[currentQuestionIndex];

  questionElement.textContent = current.question;
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${Quiz.length}`;

  updateProgressBar();

  optionsElement.innerHTML = "";


  current.options.forEach(function(opt, index) {
    const button = document.createElement("button");

    const letters = ["A", "B", "C", "D"];

    button.textContent = `${letters[index]}. ${opt}`;



    if (answers[currentQuestionIndex] === opt) {
      button.classList.add("selected");
      nextBtn.disabled = false;
    }

    button.onclick = () => selectAnswer(button, opt);

    optionsElement.appendChild(button);


  });

 prevBtn.disabled = currentQuestionIndex === 0;
}

// Select answer 

function selectAnswer(button, option) {
  answers[currentQuestionIndex] = option;

  const buttons = optionsElement.querySelectorAll("button");

  buttons.forEach(btn => btn.classList.remove("selected"));

  button.classList.add("selected");
  nextBtn.disabled = false;
}

// Next button control 
nextBtn.onclick = () => {
  if (currentQuestionIndex < Quiz.length - 1) {
  currentQuestionIndex++;
  displayQuestion();
  } else {
  showResult();
  }
};

// Previous button control 
prevBtn.onclick = () => {
  if (currentQuestionIndex > 0) {
  currentQuestionIndex--;
  displayQuestion();
  }
};

// Progress bar control 
function updateProgressBar() {
  const percent = ((currentQuestionIndex + 1) / Quiz.length) * 100;
  progressFill.style.width = percent + "%";

}

// showResult 
function showResult() {
  currentScore = 0;

  Quiz.forEach((question, index) => {
  if (answers[index] === question.answer) currentScore++;
  });

  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = "";
  progressElement.textContent = `Your Score: ${currentScore} / ${Quiz.length}`;

  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
  restartBtn.style.display = "block";
}

// Restart 
restartBtn.onclick = () => {
  currentQuestionIndex = 0;
  currentScore = 0;
  answers = new Array(Quiz.length).fill(null);

  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "inline-block";
  restartBtn.style.display = "none";

  nextBtn.disabled = true;

  displayQuestion();
};

displayQuestion();







