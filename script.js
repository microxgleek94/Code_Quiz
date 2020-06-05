// elements from HTML that JS will interact with
var highscoreDisplay = document.querySelector("#high-score-display");
var timerDisplay = document.querySelector("#timer-display");
var startpageDisplay = document.querySelector("#start-page");
var quizStartBtn = document.querySelector("#start-button");
var questionBlock = document.querySelector("#question-block");
var questionsDisplay = document.querySelector("#questions-display");
var answerDisplay = document.querySelector("#answer-block");
var optA = document.querySelector("#optA");
var optB = document.querySelector("#optB");
var optC = document.querySelector("#optC");
var optD = document.querySelector("#optD");
var resultsDisplay = document.querySelector("#results");
var finalscoreDisplay = document.querySelector("#finalscore");
var scoreDisplay = document.querySelector("#score");
var userinputDisplay = document.querySelector("#userinput");
var submitNameDisplay = document.querySelector("#submitName");
var highscoreDisplay = document.querySelector("#highscore-list");
var pastScoresDisplay = document.querySelector("#pastScores");
var goBackBtnDisplay = document.querySelector("#goBackBtn");
var clearScoreDisplay = document.querySelector("#clearScore");




// Defining the "question" objects and other varibles

var quest1 = {
  question: "What is Captian America's weapon of choice?",
  opt1: "A.) A hammer",
  opt2: "B.) Various inventions created from his imagination",
  opt3: "C.) A shield",
  opt4: "D.) A bow and arrow",
  answer: "C"
}

var quest2 = {
  question: "In the 'Avengers: Age of Ultron', who is Vision?",
  opt1: "A.) Tony Stark's AI assistant J.A.R.V.I.S after it's programming is uploaded into a synthetic body",
  opt2: "B.) An evil dream monster that steals people's sight when they're sleeping",
  opt3: "C.) Scarlet Witch's partner",
  opt4: "D.) Both A and C",
  answer: "D"
}

var quest3 = {
  question: "What is Thor and Loki's sister's name?",
  opt1: "A.) Pepper",
  opt2: "B.) Hela",
  opt3: "C.) Thelma",
  opt4: "D.) Jane",
  answer: "B"
}

var quest4 = {
  question: "In both 'The Avengers' and 'Avengers: Endgame', what place do Black Widow and Hawkeye refrence during the battle in New York and also while on planet Vormir?",
  opt1: "A.) Budapest",
  opt2: "B.) Cuba",
  opt3: "C.) Wakanda",
  opt4: "D.) Gotham City",
  answer: "A"
}

var quest5 = {
  question: "What did Bruce Banner say to Captian America was his 'secret' for summoning the Hulk?",
  opt1: "A.) 'I'm always happy'",
  opt2: "B.) 'I'm always angry'",
  opt3: "C.) 'I love Natasha'",
  opt4: "D.) 'I'm never nervous'",
  answer: "B"
}

var playerList = [{ name: '', score: '' }];

var totalSeconds;
var secondsElapsed = 0;
var interval;
var score = 0;
var questionArr = [quest1, quest2, quest3, quest4, quest5];
var questionLen = questionArr.length - 1;
var index = 0;
var quizquestion;
var gameover;



// Quiz functions //


/* When user "clicks" start quiz button function will run
and the quiz infox box will dissappear and the first question will appear*/
quizStartBtn.addEventListener("click", startQuiz);


function startQuiz(event) {
  gameover = false;
  console.log("The start quiz button was pressed and questions page appeared");
  startpageDisplay.style.display = "none";
  questionBlock.style.display = "block";
  startTimer();
  renderQuestion();
}


/* function to create and print the question and answers 
 from therir objects to the defined HTML elements */
function renderQuestion() {
  console.log("Create Questions");

  quizquestion = questionArr[index];

  questionsDisplay.textContent = quizquestion.question;
  optA.textContent = quizquestion.opt1;
  optB.textContent = quizquestion.opt2;
  optC.textContent = quizquestion.opt3;
  optD.textContent = quizquestion.opt4;
  resultsDisplay.textContent = "";
}



answerDisplay.addEventListener("click", checkAnswer);

function checkAnswer(event) {
  event.stopPropagation();

  //this checks to see which answer the user picked 
  let userchoice = event.target.getAttribute("data-index");
  console.log(`User clicked on choice: ${userchoice}`);
  console.log(`Correct Choice is: ${quizquestion.answer}`);

  if (userchoice == quizquestion.answer) {
    score++;
    resultsDisplay.textContent = "Great job, bub. That was the right answer.";
    console.log(`User picked correct answer, current score: ${score}`);
  } else {
    secondsElapsed = secondsElapsed + 5;
    resultsDisplay.textContent = "Puny god! That was the wrong answer. You're gunna have to do better than that.";
    console.log(`User chose inccorect answer: - 5 sec. current score: ${score}`);
  }
  setTimeout(nextQuestions, (1000)*2);
}

function nextQuestions() {
  if (index < questionLen) {
    // Keep going to next question in the array
    index++;
    renderQuestion();
  } else {
    // Game over
    stopTimer();
    renderFinalscore();
  }
}

function renderFinalscore() {
  gameover = true;
  questionBlock.style.display = "none";
  finalscoreDisplay.style.display = "block";
  scoreDisplay.textContent = score;
}

//function for user to submit their name and score after game ends 
submitNameDisplay.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(`Submit button clicked and information entered: ${userinputDisplay.value}`);
  finalscoreDisplay.style.display = "none";
  addPersonToList();
  highscoreDisplay.style.display = "block";
  renderHighscore();
})

//function to add a user's name and score to the "High score" list
function addPersonToList() {
  event.preventDefault();
  var name = userinputDisplay.value;
  playerList.push({ "name": name, "score": score });
  console.log(`Player list array content: ${pastScoresDisplay}`);
}


//function to create user's final score
function renderHighscore() {
  console.log(`User's high score is: ${score}`);
  var name = userinputDisplay.value;
  var li = document.createElement("li");
  li.id = playerList.length;
  li.textContent = name + ":  " + score;
  pastScoresDisplay.append(li);
}



//function for the "Go Back" button
goBackBtnDisplay.addEventListener("click", goBackBtn);

function goBackBtn() {
  console.log(`User clicked on the go back button`);
  highscoreDisplay.style.display = "none";
  startpageDisplay.style.display = "block";
  score = 0;
  index = 0;
  totalSeconds = 0;
  secondsElapsed = 0;
  scoreDisplay.textContent = 0;
  userinputDisplay.value = "";
}

clearScoreDisplay.addEventListener("click", emptyscore);

function emptyscore() {
  event.preventDefault();
  event.stopPropagation();
  playerList.innerHTML = "";
  playerList = [];
  console.log(`Clear score button pressed; Playerlist Arr should have nothing in it: ${pastScoresDisplay}`);
}

highscoreDisplay.addEventListener("click", function (event) {
  console.log(`User clicked View High Score: ${highscoreDisplay}`);
  stopTimer();
  startpageDisplay.style.display = "none";
  questionBlock.style.display = "none";
  finalscoreDisplay.style.display = "none";
  highscoreDisplay.style.display = "block";
})




// Timer functions //


function startTimer() {
  totalSeconds = 60;
  clearInterval(interval);

  if (totalSeconds > 0) {

    interval = setInterval(function () {
      secondsElapsed++;
      renderTime();
      checkTimeout();
    }, 1000);
  }
}

function stopTimer() {
  secondsElapsed = 0;
  clearInterval(interval);
  renderTime();
}

function renderTime() {
  timerDisplay.textContent = "Timer: " + getFormattedSeconds();
}

//Checks to see if timer has run out
function checkTimeout() {
  if (secondsElapsed >= totalSeconds) {
    alert(`Whoops, you ran out of time! Here's your score: ${score}`);
    stopTimer();

    if (gameover == false) {
      questionBlock.style.display = "none";
      finalscoreDisplay.style.display = "block";
    }
    console.log(`Whoops, you ran out of time! Here's your score: ${score}`);
  }
} 

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed)
  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

