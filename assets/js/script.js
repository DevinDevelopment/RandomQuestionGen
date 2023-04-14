var button1 = document.querySelector(".button1");
var button2 = document.querySelector(".button2");
var button3 = document.querySelector(".button3");
var button4 = document.querySelector(".button4");

var startbutton = document.querySelector(".startButton")
var questionLocation = document.querySelector("h2")

var timerEl = document.querySelector(".timer");
var timer;
var timerCount;
var correctAnswer;

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

function randomQuestionPicker(){
  var randomIndex = Math.floor(Math.random() * givenQuestion.length - 1);
    // console.log(givenQuestion.length);

  var correctAnswer =  givenQuestion[randomIndex].correctAnswer;
  
  questionLocation.textContent = givenQuestion[randomIndex].question;

  button1.textContent = givenQuestion[randomIndex].answers.a
  button1.value = button1.textContent;
  button1.dataset.index = randomIndex;
  button1.dataset.correct = givenQuestion[randomIndex].correctAnswer;

  button2.textContent = givenQuestion[randomIndex].answers.b;
  button2.value = button2.textContent;
  button2.dataset.correct = givenQuestion[randomIndex].correctAnswer;

  button3.textContent = givenQuestion[randomIndex].answers.c;
  button3.value = button3.textContent;
  button3.dataset.correct = givenQuestion[randomIndex].correctAnswer;

  button4.textContent = givenQuestion[randomIndex].answers.d;
  button4.value = button4.textContent;
  button4.dataset.correct = givenQuestion[randomIndex].correctAnswer;

  console.log("initial index " + randomIndex)
  
  // givenQuestion.splice(givenQuestion[randomIndex], 1);
}

function checkAnswer(answer, correctAnswer, index){
  console.log(answer,correctAnswer);
  console.log(index);
  // if(answer === correctAnswer){
  //   addPoint();
  // }
  // else{
  //   subTime();
  // }
  
  //  console.log("length "+ givenQuestion.length);
   return givenQuestion.splice(givenQuestion[index], 1);
}

console.log(givenQuestion);

function startTimer() {
    // Sets timer
    timerEl.textContent=10;
    timerCount = 30;
    // Prevents start button from being clicked when round is in progress
    startbutton.disabled = true;
    timer = setInterval(function() {
    
    timerCount--;
    timerEl.textContent = timerCount;
    //   if (timerCount >= 0) {
    //     // Tests if win condition is met
    //     if (isWin && timerCount > 0) {
    //       // Clears interval and stops timer
          
    //     }
    //   }

    
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        endOfQuiz();
      }
    }, 1000);
}

function quizStart(){
    document.querySelector(".quiz").style.display="block";
    document.querySelector(".startButton").style.display="none";
    // event.preventDefault();
    startTimer();
    randomQuestionPicker();
}

function endOfQuiz(){
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector(".startButton").style.display="block";
    startbutton.disabled = false;
}


startbutton.addEventListener("click", function() {
    quizStart();
  
});

button1.addEventListener('click', function(e){
  checkAnswer(e.target.value, e.target.dataset.correct, e.target.dataset.index);
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

