// Array of quiz questions and answers
const questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "float", correct: false },
      { text: "String", correct: false }
    ]
  },
  {
    question: "What is the output of: typeof null?",
    answers: [
      { text: "'object'", correct: true },
      { text: "'null'", correct: false },
      { text: "'undefined'", correct: false },
      { text: "'number'", correct: false }
    ]
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    answers: [
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.toObject()", correct: false },
      { text: "JSON.convert()", correct: false }
    ]
  }
];

// Getting references to DOM elements
const questionElement = document.getElementById('question');           // For displaying the question text
const answerButtons = document.getElementById('answer-buttons');       // Container where answer buttons will be added
const nextButton = document.getElementById('next-btn');                // Button to go to the next question
const scoreContainer = document.getElementById('score-container');     // Container for showing final score
const scoreDisplay = document.getElementById('score');                 // Span element to show score number

// Variables to keep track of current question and score
let currentQuestionIndex = 0;
let score = 0;

// Function to start or restart the quiz
function startQuiz() {
  currentQuestionIndex = 0;            // Start from first question
  score = 0;                           // Reset score
  scoreContainer.classList.add('hide'); // Hide score display at the start
  nextButton.innerText = "Next";       // Reset next button text
  showQuestion();                      // Show the first question
}

// Function to display current question and its answer options
function showQuestion() {
  resetState();   // Clear previous question and answers

  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  // Loop through answer options
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');  // Create a button for each answer
    button.innerText = answer.text;
    button.classList.add('btn');                      // Add a class for styling
    if (answer.correct) {
      button.dataset.correct = answer.correct;        // Mark correct answer using data attribute
    }
    button.addEventListener('click', selectAnswer);   // Add click listener to handle user selection
    answerButtons.appendChild(button);                // Add button to the DOM
  });
}

// Function to reset the question area (remove old answers, hide next button)
function resetState() {
  nextButton.classList.add('hide');   // Hide the next button
  answerButtons.innerHTML = '';       // Clear all answer buttons
}

// Function to handle answer selection by the user
function selectAnswer(e) {
  const selectedButton = e.target;                       // The button that was clicked
  const isCorrect = selectedButton.dataset.correct === "true"; // Check if it's correct

  // Provide feedback: green if correct, red if wrong
  if (isCorrect) {
    selectedButton.classList.add('correct');
    score++;   // Increment score if correct
  } else {
    selectedButton.classList.add('wrong');
  }

  // Disable all buttons and highlight correct one
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;   // Prevent further clicks
    if (button.dataset.correct === "true") {
      button.classList.add('correct');  // Highlight the correct answer
    }
  });

  nextButton.classList.remove('hide');  // Show the next button
}

// Function to display the final score
function showScore() {
  resetState();  // Clear previous question/answers
  questionElement.innerText = "Quiz Completed!";         // Show completion message
  scoreContainer.classList.remove('hide');               // Show score area
  scoreDisplay.innerText = `${score} / ${questions.length}`;  // Show the score
  nextButton.innerText = "Play Again";                   // Change button text for replay
  nextButton.classList.remove('hide');                   // Show play again button
}

// Function to handle "Next" button click
function handleNextButton() {
  currentQuestionIndex++;   // Move to next question index
  if (currentQuestionIndex < questions.length) {
    showQuestion();         // If more questions, show next one
  } else {
    showScore();            // Otherwise, show the final score
  }
}

// Event listener for the Next/Play Again button
nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();     // Go to next question
  } else {
    startQuiz();            // Restart quiz if it’s the end
  }
});

// Initial call to start the quiz on page load
startQuiz();
