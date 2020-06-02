var startQuiz = document.querySelector("#start-button");
var questionBlock = document.querySelector("#question-block");
var timerDisplay = document.querySelector("#timer-display");
var highscoreDisplay = document.querySelector("#high-score-screen");
var finalscoreDisplay = document.querySelector("#final-score-screen");
var startpageDisplay = document.querySelector("#start-page");
var startBtnDisplay = document.querySelector("#start-button");
var quizinfoDisplay = document.querySelector("#quiz-info");
var questionDisplay = document.querySelector("#question-display");
var answerDisplay = document.querySelector("#answer-display");
var answerBtnDisplay = document.querySelector("#btn");
var resultsDisplay = document.querySelector("#results");




// Defining the "question" objects and other varibles

var quest1 = {
  question: "What is Captian America's weapon of choice?",
  opt1: "A hammer",
  opt2: "Various inventions created from his imagination",
  opt3: "A shield",
  opt4: "A bow and arrow",
  answer: ""
}

var quest2 = {
  
}



var totalSeconds;
var secondsElapsed = 0;
var interval;
var score = 0;
var questionArr =[quest1,qquest2,quest3,quest4,quest5];
var questionLen = questionArr.length - 1;
var index = 0;
var livequestion;
var newGame;









// When user "clicks" start quiz button function will run
startQuiz.addEventListener("click",startQuiz());

function startQuiz() {

}

//These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {

  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

/* This function just retrieves the values from the html input elements; Sort of 
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function. 
   It essentially resets our timer */
function setTime() {
  var minutes;

  if (status === "Working") {
    minutes = workMinutesInput.value.trim();
  } else {
    minutes = restMinutesInput.value.trim();
  }

  clearInterval(interval);
  totalSeconds = minutes * 60;
}

//This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

 // ..and then checks to see if the time has run out
  if (secondsElapsed >= totalSeconds) {
    if (status === "Working") {
      alert("Time for a break!");
    } else {
      alert("Time to get back to work!");
    }

    stopTimer();
  }
}

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  setTime();

  // we only want to start the timer if minutes is > 0
  if (totalSeconds > 0) {    
    /* the "interval" variable here using "setInterval()" begins the recurring increment of the 
       secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;
        //So renderTime() is called here once every second.
        renderTime();
      }, 1000);
  } else {
    alert("Minutes of work/rest must be greater than 0.")
  }
}

/* This function stops the setInterval() set in startTimer but does not
   reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
function pauseTimer() {
  clearInterval(interval);
  renderTime();
}

/* This function stops the interval and also resets secondsElapsed 
   and calls "setTime()" which effectively reset the timer 
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

/* Our timer is fancy enough to handle 2 different settings at once this toggle 
   function basically just specifies which of our 2 timer settings to use. */
function toggleStatus(event) {
  var checked = event.target.checked;

  if (checked) {
    status = "Working";
  } else {
    status = "Resting";
  }

  statusSpan.textContent = status;

  secondsElapsed = 0;
  setTime();
  renderTime();
}


  //This is where the app is really kicked-off, setTime and renderTime are the two main routines.
  setTime();
  renderTime();
}

//This function is defined but never used.
function setTimePreferences() {
  localStorage.setItem(
    "preferences",
    JSON.stringify({
      workMinutes: workMinutesInput.value.trim(),
      restMinutes: restMinutesInput.value.trim()
    })
  );
}


pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);
