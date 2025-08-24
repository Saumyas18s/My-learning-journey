const buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("high-score").textContent = highScore;

document.addEventListener("keydown", () => {
  if (!started) {
    document.getElementById("level-title").textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    const userColor = this.id;
    userClickedPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    animatePress(randomColor);
    playSound(randomColor);
  }, 500);
}

function playSound(name) {
  const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttonColors.indexOf(name)+1}.mp3`);
  audio.play();
}

function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    wrongAnswer();
  }
}

function wrongAnswer() {
  playSound("wrong");
  document.body.style.backgroundColor = "crimson";
  document.getElementById("level-title").textContent = "Game Over! Press Any Key to Restart";

  if (level - 1 > highScore) {
    highScore = level - 1;
    localStorage.setItem("highScore", highScore);
    document.getElementById("high-score").textContent = highScore;
  }

  setTimeout(() => {
    document.body.style.backgroundColor = "#1e3c72";
  }, 300);

  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
