'use strict';

$(function () {


  const homeTeam = prompt('What is the Home Team Name?');

  
  if (homeTeam) {
    $('#homeName').text(homeTeam);        
  }

  const awayTeam = prompt('What is the Away Team Name?');


  if (awayTeam) {
    $('#awayName').text(awayTeam);       
  }

  
 


  let team = confirm('Are you from the Home Team? OK for yes, Cancel for no.');
  if (team === true) {
    alert('Welcome, ' + homeTeam + '! It is game time!');
  } else {
    alert('Welcome, ' + awayTeam + '! It is game time!');
  }

  // ===== SCOREBOARD =====

  
  const $homeScoreStart = $('#homeScore');

  function addPointsHome(amount) {
    let currentPointsHome = parseInt($homeScoreStart.text(), 10) || 0;
    currentPointsHome += amount;

    $homeScoreStart.text(currentPointsHome);
  }


  $('#add1Home').on('click', function () { addPointsHome(1); });
  $('#add2Home').on('click', function () { addPointsHome(2); });
  $('#add3Home').on('click', function () { addPointsHome(3); });
  $('#add6Home').on('click', function () { addPointsHome(6); });
  $('#subtract1Home').on('click', function () { addPointsHome(-1); });
  $('#subtract2Home').on('click', function () { addPointsHome(-2); });
  $('#subtract3Home').on('click', function () { addPointsHome(-3); });
  $('#subtract6Home').on('click', function () { addPointsHome(-6); });

 
  const $awayScoreStart = $('#awayScore');


  function addPointsAway(amount) {
    let currentPointsAway = parseInt($awayScoreStart.text(), 10) || 0;
    currentPointsAway += amount;

    $awayScoreStart.text(currentPointsAway);
  }


  $('#add1Away').on('click', function () { addPointsAway(1); });
  $('#add2Away').on('click', function () { addPointsAway(2); });
  $('#add3Away').on('click', function () { addPointsAway(3); });
  $('#add6Away').on('click', function () { addPointsAway(6); });
  $('#subtract1Away').on('click', function () { addPointsAway(-1); });
  $('#subtract2Away').on('click', function () { addPointsAway(-2); });
  $('#subtract3Away').on('click', function () { addPointsAway(-3); });
  $('#subtract6Away').on('click', function () { addPointsAway(-6); });

  // ===== TIMER =====

  let countdown;
let remainingSeconds = 0;   
let isPaused = false;

const $timerDisplay = $('.display__time-left');
const $endTime = $('.display__end-time');
const $buttons = $('[data-time]');

function timer(seconds) {

  isPaused = false;


  clearInterval(countdown);

  remainingSeconds = seconds;      
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(remainingSeconds);
  displayEndTime(then);

  startCountdown(then);
}

function startCountdown(then) {
  countdown = setInterval(() => {
    if (isPaused) return;

    const secondsLeft = Math.round((then - Date.now()) / 1000);
    remainingSeconds = secondsLeft;   

   
    if (secondsLeft < 0) {
      clearInterval(countdown);
      $timerDisplay.text('Game Over'); 
      document.title = 'Game Over';    
      remainingSeconds = 0;
      return;
    }

 
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  $timerDisplay.text(display);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();

}

function startTimer() {
  const seconds = parseInt($(this).data('time'), 10);
  timer(seconds);
}

function pauseTimer() {
  if (remainingSeconds > 0) {
    isPaused = true;
    clearInterval(countdown);  // stop the interval
  }
}

function resumeTimer() {
  if (isPaused && remainingSeconds > 0) {
    isPaused = false;
    const now = Date.now();
    const then = now + remainingSeconds * 1000;
    displayEndTime(then);
    startCountdown(then);
  }
}

$buttons.on('click', startTimer);


$('form[name="customForm"]').on('submit', function (e) {
  e.preventDefault();
  const mins = parseInt($(this).find('[name="minutes"]').val(), 10);
  timer(mins * 60);
  this.reset();
});


$('#pauseTimer').on('click', pauseTimer);
$('#resumeTimer').on('click', resumeTimer);
  

});
