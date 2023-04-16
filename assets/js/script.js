//setting varables to be used as button
var button1 = document.querySelector(".button1");
var button2 = document.querySelector(".button2");
var button3 = document.querySelector(".button3");
var button4 = document.querySelector(".button4");
var ViewScores = document.querySelector(".viewHighScore");

var startbutton = document.querySelector(".startButton");
var exitScoresButton = document.querySelector(".exitScoresButton")

//selecting text where question and timer goes
var questionLocation = document.querySelector("h2");
var highScores = document.querySelector(".highScorelist");
var timerEl = document.querySelector(".timer");

//setting variables for timer function
var timer;
var timerCount;
var correctAnswers = 0;

//setting various global variables for later use in functions
var currentIndex;
var randomizedIndexes;
var correctSelectedAnswers = 0;
var quizScore;
var records = [];
// This array of objects will work as our question/answer bank

var storedRecords = JSON.parse(localStorage.getItem("scoreRecord"));

if (storedRecords !== null) {
  records = storedRecords;
}

var givenQuestion = [
  {
    question: "what does css stand for?",
    answers: {
      a: "cool super sayan",
      b: "cascading style sheet",
      c: "hyper Text moch-up language",
      d: "python",
    },
    correctAnswer: "cascading style sheet"
  },
  {
    question: "what can you use to iterate through arrays",
    answers: {
      a: "integers",
      b: "strings",
      c: "loops",
      d: "data values",
    },
    correctAnswer: "loops"
  },
  {
    question: "what enviornment is for web development",
    answers: {
      a: "ms word",
      b: "notepad",
      c: "excel",
      d: "visual studio code",
    },
    correctAnswer: "visual studio code"
  },
  {
    question: "what tag is used to link css file to html file",
    answers: {
      a: "<link>",
      b: "<h1>",
      c: "<src>",
      d: "<img>",
    },
    correctAnswer: "<link>"
  },
  {
    question: "what is used to declare variable in javascript",
    answers: {
      a: "int",
      b: "str",
      c: "func",
      d: "var",
    },
    correctAnswer: "var"
  },
  {
    question: "what is the name of the tool related to javascript",
    answers: {
      a: "html",
      b: "css",
      c: "jquery",
      d: "bootstrap",
    },
    correctAnswer: "jquery"
  },
]

// this function takes in an array and returns a shuffled version of original array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = 
    [array[randomIndex],  array[currentIndex]];
  }
  return array;
}

// This function displays the questions and answers corrisponding with its randomizedIndexes.
// we are randomizing our original array "randomizedIndexes" then we are iterating over the shuffled array "currentIndex" to ensure we are not repeating questions
function randomQuestionPicker(){
  if(currentIndex <= 5){
  questionLocation.textContent = givenQuestion[randomizedIndexes[currentIndex]].question;

  //setting textcontent and datasets to buttons 
  button1.textContent = givenQuestion[randomizedIndexes[currentIndex]].answers.a
  button1.value = button1.textContent;
  button1.dataset.correct = givenQuestion[randomizedIndexes[currentIndex]].correctAnswer;

  button2.textContent = givenQuestion[randomizedIndexes[currentIndex]].answers.b;
  button2.value = button2.textContent;
  button2.dataset.correct = givenQuestion[randomizedIndexes[currentIndex]].correctAnswer;

  button3.textContent = givenQuestion[randomizedIndexes[currentIndex]].answers.c;
  button3.value = button3.textContent;
  button3.dataset.correct = givenQuestion[randomizedIndexes[currentIndex]].correctAnswer;

  button4.textContent = givenQuestion[randomizedIndexes[currentIndex]].answers.d;
  button4.value = button4.textContent;
  button4.dataset.correct = givenQuestion[randomizedIndexes[currentIndex]].correctAnswer;
}
}
// this function accepts the correct answer of the question and compares with the function user calls.
function checkAnswer(answer, correctAnswer){
  // console.log(answer,correctAnswer);
  if(answer === correctAnswer){
    correctSelectedAnswers ++;
  } else timerCount = timerCount - 10;
 
  // calling calculate answer function.
  // After we call currentIndex++ to iterate to next  question/answer set as this current is no longer needed
  calculateAnswer();
  currentIndex++;
}

// calculates users score 
function calculateAnswer(){
  quizScore = ((correctSelectedAnswers/givenQuestion.length)*100);
}

function viewHighscores(){
  document.querySelector(".highScoreSection").style.display="block";
  document.querySelector(".startButton").style.display="none";
  highScores.innerHTML = "";

  if(storedRecords != null){
    for (var i = 0; i <= storedRecords.length-1; i++){
      var todo = storedRecords[i];
      var li = document.createElement("li");
        li.textContent = (todo.name + "\t" + todo.score);
        li.setAttribute("highScorelist", i);
        highScores.appendChild(li);
    }
  }
}

// At the end of quiz we want to push users name and score into local storage but pushing record objects to record array containing users name and score.
function storeTodos() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("Records", JSON.stringify(records));
}

//displays prompt at the end of quiz to store user and score
function endOfQuizPrompt(){
  var a = prompt(("Your score is: " + quizScore.toFixed(2) + "! Enter your name to submit score."), "Name: ");
  records.push({
    name: a,
    score: quizScore.toFixed(2),
  });

  if (a != null) {  
    for(var i = 0; i < records.length; i++){
      localStorage.setItem("scoreRecord", JSON.stringify(records));
    }
  }
  storedRecords = JSON.parse(localStorage.getItem("scoreRecord"));
  timerEl.textContent = ("30");
}

// handles quiz timer 
function startTimer() {
    // Sets timer
    timerCount = 30;
    startbutton.disabled = true;

    timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;

    //if time runs out or you answer all questions quiz ends
      if (timerCount <= 0) {
        clearInterval(timer);
        endOfQuiz();
      }
      else if(currentIndex > 5) {
        clearInterval(timer);
        endOfQuiz();
      }
    }, 1000);
}

// this will be called each time a user selects start. this will set all variable to default values for a new quiz
// this will also shuffle the indexes of our question to ensure we dont have the same order of questions.
function quizStart(){
    document.querySelector(".quiz").style.display="block";
    document.querySelector(".startButton").style.display="none";
    ViewScores.disabled = true;
    randomizedIndexes = [0,1,2,3,4,5]
    currentIndex = 0;
    correctSelectedAnswers = 0;
    quizScore = 0;
    shuffle(randomizedIndexes);
    startTimer();
    randomQuestionPicker();
} 

// will display name and score prompt at the end of each quiz attempt for storage
function endOfQuiz(){
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector(".startButton").style.display="block";
    
    endOfQuizPrompt();
    startbutton.disabled = false;
    ViewScores.disabled = false;
}

//Event listeners added to all buttons 
startbutton.addEventListener("click", function() {
    quizStart();
});

ViewScores.addEventListener("click", function(){
  //handles the prompt that shows all users scores 
  viewHighscores();
});

exitScoresButton.addEventListener('click', function(e){
  document.querySelector('.highScoreSection').style.display = 'none';
  document.querySelector(".startButton").style.display="block";
});

//  checkAnswer(e.target.value, e.target.dataset.correct); grabs the event then the  value set to that button "e.target.value"
//  checkAnswer(e.target.value, e.target.dataset.correct); grabs the event then the  dataset balue we assigned named correct "e.target.dataset.correct"
//  we must grab these button related values in order to pass into checkAnswer function 
button1.addEventListener('click', function(e){
  checkAnswer(e.target.value, e.target.dataset.correct);
  randomQuestionPicker();
});

button2.addEventListener('click', function(e){
  checkAnswer(e.target.value, e.target.dataset.correct);
  randomQuestionPicker();
});
button3.addEventListener('click', function(e){
  checkAnswer(e.target.value, e.target.dataset.correct);
  randomQuestionPicker();  
});
button4.addEventListener('click', function(e){
  checkAnswer(e.target.value, e.target.dataset.correct);
  randomQuestionPicker();
});