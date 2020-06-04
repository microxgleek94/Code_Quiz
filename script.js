// elements from HTML that JS will interact with
var quizStartBtn = document.querySelector("#start-button");
var questionBlock = document.querySelector("#question-block");
var timerDisplay = document.querySelector("#timer-display");
var highscoreDisplay = document.querySelector("#high-score-container");
var finalscoreDisplay = document.querySelector("#final-score-container");
var startpageDisplay = document.querySelector("#start-page");
var startBtnDisplay = document.querySelector("#start-button");
var quizinfoDisplay = document.querySelector("#quiz-info");
var questionDisplay = document.querySelector("#question-display");
var answerDisplay = document.querySelector("#answer-display");
var optA = document.querySelector("#btn");
var optB = document.querySelector("#btn");
var optC = document.querySelector("#btn");
var optD = document.querySelector("#btn");
var answerBtnDisplay = document.querySelector("#btn");
var resultsDisplay = document.querySelector("#results");




// Defining the "question" objects and other varibles

var quest1 = {
  question: "What is Captian America's weapon of opt?",
  opt1: "A.) A hammer",
  opt2: "B.) Various inventions created from his imagination",
  opt3: "C.) A shield",
  opt4: "D.) A bow and arrow",
  answer: "C"
}

var quest2 = {
  question: "In the 'Avengers: Age of Ultron', who is Vision?",
  opt1: "A.) Tony Stark's AI assistance, J.A.R.V.I.S after it's programming is uploaded into a synthetic body",
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


var totalSeconds;
var secondsElapsed = 0;
var interval;
var score = 0;
var questionArr = [quest1, qquest2, quest3, quest4, quest5];
var questionLen = questionArr.length - 1;
var index = 0;
var quizquestion;
var gameover;
var playerList = [{name:'', score:''}];




// Quiz functions //


/* When user "clicks" start quiz button function will run
and the quiz infox box will dissappear and the first question will appear*/
quizStartBtn.addEventListener("click", startQuiz());


function startQuiz() {
  gameover = false;
  console.log("The start quiz button was pressed and questions page appeared");
  startpageDisplay.style.display = "none";
  questionsDisplay.style.display = "block";
  //to make question array appear randomly each time user plays quiz
  randQuestions = questionsArr.sort(() => Math.random() -0.5)
  currentQuestion = 0
  nxtQuestion();
  startTimer();
}

function nxtQuestion(){
  resetState()
  showQuestion(randomQuestions[currentQuestion])
}


  // function to print the question and answer arrays to HTML elements
  function renderQuestion() {
    console.log("Start Render Question");
    
    quizquestion = questionArr[index];
    
    questionDisplay.textContent = quizquestion.question;
    optA.textContent = quizquestion.opt1;
    optB.textContent = quizquestion.opt2;
    optC.textContent = quizquestion.opt3;
    optD.textContent = quizquestion.opt4;
    resultsDisplay.textContent = "";
  }



  choicesDisplay.addEventListener("click", checkAnswer);

  function checkAnswer(event) {
    event.stopPropagation();
   
    //this checks to see which answer the user picked 
    let userchoice = event.target.getAttribute("data-index");
    console.log(`User clicked on choice: ${userchoice}`);
    console.log(`Correct Choice is: ${quizquestion.answer}`);
  
    if (userchoice == quizquestion.answer) {
        score++;
        resultsDisplay.textContent="Great job, bub. That was the right answer.";
        console.log(`User picked correct answer current score: ${score}`);
    } else {
        secondsElapsed = secondsElapsed + 5;
        resultEl.textContent="Puny god! That was the wrong answer. You're gunna have to do better than that.";
        console.log(`User chose inccorect answer: - 5 sec. current score: ${score}`);
    }
    setTimeout(nextQuestions, 1000);
  } 
  
  function nextQuestions () {
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
    questionsDisplay.style.display = "none";
    finalscoreDisplay.style.display = "block";
    scoreEl.textContent = score;
  }
  

  submitName.addEventListener("click", function (event){

    event.preventDefault();
    event.stopPropagation();
    console.log("FORM submit clicked:", userInput.value );
    finalscoreDisplay.style.display = "none";
    addPersonToList();
    highscoreDisplay.style.display = "block";
    renderHighscore();
  } )
  
  //function to add a user's name and score to the "High score" list
  function addPersonToList() {
    event.preventDefault();
    var name = userInput.value;
    playerList.push({ "name": name, "score": score });
    console.log("Player list array content: ", playerListDisplay);
    
  }
  

  //function to create user's final score
  function renderHighscore () {
    console.log("renderHighScore, score is: ", score);
    var name = userinputEl.value;
    var li = document.createElement("li");
    li.id = playerList.length;
    li.textContent = name + ":  " + score;
    playerListDisplay.append(li);
  }
  


//function for the "Go Back" button
  goBackMenuEl.addEventListener("click", goBackMenu);
  
  function goBackBtn () {
    console.log("Inside GoBack Menu");
    highscoreDisplay.style.display = "none";
    firstpageEl.style.display = "block";
    score=0;
    index=0;
    totalSeconds = 0;
    secondsElapsed = 0;
    scoreEl.textContent = 0; // Re-initialze score display value before next round start
    userinputEl.value=""; // Re-Intialize Players Name to nothing, else next round, old name remains.
  }
  
  clearScoreEl.addEventListener("click", emptyscore);
  
  function emptyscore () {
    event.preventDefault();
    event.stopPropagation();
    playerListDisplay.innerHTML = "";
    playerList = [];
    console.log("clear score entered. Array Playerlist should be nothing: ", playerListDisplay);
  }
  
  viewscoreEl.addEventListener("click", function(event) {
    console.log("User clicked Top Corner View High Score");
    stopTimer();
    firstpageEl.style.display = "none";
    questionsDisplay.style.display = "none";
    finalscoreDisplay.style.display = "none";
    highscoreDisplay.style.display = "block";
  })




  
  

// Timer functions //


function startTimer() {
  totalSeconds = 60;
  clearInterval(interval);

  if (totalSeconds > 0) {    
    
      interval = setInterval(function() {
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
  alert("Whoops, you ran out of time! Here's your score:");
  stopTimer();
  
  if (gameover == false) {
    questionsDisplay.style.display = "none";
    finalscoreDisplay.style.display = "block";
  }
  console.log("Whoops, you ran out of time! Here's your score:", score);
}
} 
