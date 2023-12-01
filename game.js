var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", handleClick);

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  buttonFlash(randomChosenColor);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function buttonFlash(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
}

function handleClick() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, "100");
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  started = false;
  gamePattern = [];
  level = 0;
  console.log("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var gameOver = new Audio("./sounds/wrong.mp3");
  gameOver.play();
}
