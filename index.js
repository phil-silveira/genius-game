var buttons = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

function startGame() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  nextSequence();
}

function nextSequence() {
  var next = Math.floor(Math.random() * 3);
  var nextButton = buttons[next];

  gamePattern.push(nextButton);
  clickButton(nextButton);

  level++;
  $('#level-title').text('Level ' + level);

  return nextButton;
}

function clickButton(buttonId) {
  $('#' + buttonId).addClass('pressed');
  setTimeout(function () {
    $('#' + buttonId).removeClass('pressed');
  }, 100);

  var audio = new Audio('sounds/' + buttonId + '.mp3');
  audio.play();
}

function checkAnswer() {
  console.log('gamePattern: ' + gamePattern);
  console.log('userClickedPattern: ' + userClickedPattern);

  var answer = false;

  for (let i = 0; i < level; i++) {
    answer = userClickedPattern[i] === gamePattern[i];

    if (!answer) break;
  }

  userClickedPattern = [];

  if (answer) {
    console.log('success');

    setTimeout(nextSequence, 1000);
  } else {
    console.log('error');

    gameOver();
  }
}

function gameOver() {
  $('#level-title').text('Game Over, Press Any Key to Restart');
  $('body').addClass('game-over');

  var audio = new Audio('sounds/wrong.mp3');
  audio.play();

  setTimeout(function () {
    $('body').removeClass('game-over');
  }, 200);
}

$(document).keypress(function () {
  startGame();
});

$('.btn').click(function () {
  clickButton(this.id);

  userClickedPattern.push(this.id);

  if (userClickedPattern.length === level) {
    checkAnswer();
  }
});
