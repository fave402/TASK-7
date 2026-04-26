// This section builds an understanding of Array and nested Array 

const Quiz = [
    {
      question: "What is the Capital of China?",
      Options: ["Toyko", "Hong-kong", "Beijing", "Chinatown"],
      answer: "Beijing",
    },
    {
      question: "Which planet is known as the Red Planet?",
      Options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars",
    },
    {
      question: "Which ocean is the largest?",
      Options: ["Atlantic Ocean", "Indiana Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
    {
      question: "What color do you get when you mix red and white?",
      Options: ["Pink", "Yellow", "Purple", "Orange"],
      answer: "Pink",
    },
    {
      question: "Carrot was Originally what color?",
      Options: ["Yellow", "Orange", "Purple", "Green"],
      answer: "Purple",
    },
    {
      question: "What is the main language used to structure web pages?",
      Options: ["CSS", "HTML", "JAVASCRIPT", "PYTHON"],
      answer: "HTML",
    },
     {
      question: "The Sun is a:",
      Options: ["Planet", "Star", "Moon", "Asteroid"],
      answer: "Star",
    },
    {
      question: "What planet is the third from the Sun?",
      Options: ["Venus", "Earth", "Mars", "Mercury"],
      answer: "Earth",
    },
    {
      question: "Which method is used to select an element by its ID in JavaScript?",
      Options: ["document.querySelectorAll()", "document.getElementById()", "document.getElementsByClassName()", "document.getElementByTagName()"],
      answer: "document.getElementById()",
    },
    {
      question: "What does document.querySelector() return?",
      Options: ["All matching elements", "The last matching element", "The first matching element", "Nothing"],
      answer: "The first matching element",
    },
   
];

// This section focues on the ways of selecting elements [looking at the most common-By Id using{getElementById method} to call all the Ids indicated in the Html section]

const questionElement = document.getElementById("questions");
const optionElement = document.getElementById("Options");
const progressElement = document.getElementById("progress");
const nextElement = document.getElementById("next-btn");
const prevElement = document.getElementById("prev-btn");
const restartElement = document.getElementById("restart-btn");

// state management- to track: currentQuestion, currentScore and selectedOption

let currentQuestionIndex = 0;
let currentScore = 0;
let selectedOption = null;
let userAnswers = new Array(Quiz.length).fill(null);

// Start quiz

function startQuiz(){
  currentQuestionIndex = 0;
  currentScore = 0;
  displayQuestion();
}

// display the questions and options

function displayQuestion(){
  const currentQuestion =  Quiz[currentQuestionIndex];
  progressElement.textContent = `Question ${currentQuestionIndex + 1} out of ${Quiz.length}`;
  questionElement.textContent = currentQuestion.question;

  optionElement.innerHTML = ""; 

 currentQuestion.Options.forEach((option, index) => {
  const button = document.createElement("button");

  const letters = ["A","B","C","D"];

  button.textContent = `${letters[index]}. ${option}`;

  button.addEventListener("click", () => {
    selectAnswer(button, option);
  });

  // Restore previously selected answer
  if (userAnswers[currentQuestionIndex] === option) {
    button.classList.add("selected");
    nextElement.disabled = false;
  }

  optionElement.appendChild(button);
 });
 

    if (currentQuestionIndex === 0) {

      prevElement.disabled = true;

      nextElement.disabled = true;

    } else {

      prevElement.disabled = false;

    }
   
    
};

function selectAnswer(button, option) {

  selectedOption = option;

  // Save answer for this question
  userAnswers[currentQuestionIndex] = option;

  const allButtons = document.querySelectorAll("#Options button");

  allButtons.forEach(btn => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");

  nextElement.disabled = false;

}

// Select answer and next
function showNextQuestion() {

  currentQuestionIndex++;

  if (currentQuestionIndex < Quiz.length) {
    displayQuestion();
  } else {

    calculateScore();
    showResults();

  }
}

function calculateScore() {

  currentScore = 0;

  Quiz.forEach((question, index) => {

    if (userAnswers[index] === question.answer) {
      currentScore++;
    }

  });

}

function showPreviousQuestion() {

  if (currentQuestionIndex > 0) {

    currentQuestionIndex--;

    displayQuestion();

  }

}

restartElement.addEventListener("click", () => {

  currentQuestionIndex = 0;
  currentScore = 0;

  nextElement.style.display = "block";
  restartElement.style.display = "none";

  displayQuestion();

});

const showResults = () => {
  questionElement.textContent = "Quiz Completed!";
  optionElement.innerHTML = "";

  progressElement.textContent = `Your score: ${currentScore} out of ${Quiz.length}`;
  

  prevElement.disabled = true;

  nextElement.style.display = "none";

  restartElement.style.display = "block";

};

nextElement.addEventListener("click", showNextQuestion);

prevElement.addEventListener("click",showPreviousQuestion);

displayQuestion();






