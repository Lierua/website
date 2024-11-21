window.addEventListener("load", vises);

let point = 0;
let life = 3;
let speed = 0;
let lastPointEarned = false; // Global flag to track point earning

const ost = document.querySelector("#background__sound");

const door = document.querySelector("#door_sound");
const bell = document.querySelector("#bell_sound");
const cupGone = document.querySelector("#cup_gone_sound_1");
const cup = document.querySelector("#cup_sound_1");
const paper = document.querySelector("#paper_sound_1");

const goodCon = document.querySelector("#good_container");
const goodCon2 = document.querySelector("#good_container2");

const badCon = document.querySelector("#bad_container");
const badCon2 = document.querySelector("#bad_container2");

const clockHand = document.querySelector("#clock_hand");

function vises() {
  document.querySelector("#point").classList.add("hide");
  document.querySelector("#timer").classList.add("hide");
  document.querySelector("#life").classList.add("hide");

  //viser points starter timer
  console.log("Hello World");
  //hide andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");

  //show spil menu
  document.querySelector("#start").classList.remove("hide");

  //Start playButton
  document.querySelector("#start_knap").addEventListener("click", playButton);
  document.querySelector("#retry").addEventListener("click", playButton);
  document.querySelector("#retry2").addEventListener("click", playButton);
}

function randomDelay(element) {
  // Generate a random delay between 0 and 1.5 seconds (0 to 5000 milliseconds)
  const randomDelay = Math.random() * 1500;

  setTimeout(() => {
    element.classList.remove("paused");
  }, randomDelay);
}

function playButton() {
  //sound
  bell.play();
  door.play();

  // Hide other screens
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  // Create and display the countdown element
  const countdownElement = document.createElement("div");
  countdownElement.id = "countdown";
  countdownElement.style.position = "fixed";
  countdownElement.style.top = "40%";
  countdownElement.style.left = "50%";
  countdownElement.style.transform = "translate(-50%, -50%)";
  countdownElement.style.fontSize = "5rem";
  countdownElement.style.color = "#fff";
  countdownElement.style.textAlign = "center";
  countdownElement.style.zIndex = "1000"; // Ensure it's on top of everything
  countdownElement.style.padding = "1rem 2rem";
  document.body.appendChild(countdownElement);

  // Countdown values
  const countdownValues = ["3", "2", "1", "Start"];
  let countdownIndex = 0;

  // Start the countdown
  const countdownInterval = setInterval(() => {
    if (countdownIndex < countdownValues.length) {
      countdownElement.textContent = countdownValues[countdownIndex];
      countdownIndex++;
    } else {
      // Remove the countdown and start the game
      clearInterval(countdownInterval);
      document.body.removeChild(countdownElement);
      startGame(); // Call the function to start your game logic
    }
  }, 1000); // 1 second interval
}

function startGame() {
  document.querySelector("#point").classList.remove("hide");
  document.querySelector("#timer").classList.remove("hide");
  document.querySelector("#life").classList.remove("hide");

  //reset + add points
  point = 0;
  document.querySelector("#point").textContent = point;

  //Start timer
  clockHand.classList = "";
  clockHand.offsetWidth;
  clockHand.classList.add("time");
  clockHand.addEventListener("animationend", endgame);

  //reset
  goodCon.classList = "";
  badCon.classList = "";
  goodCon2.classList = "";
  badCon2.classList = "";
  goodCon.firstElementChild.classList = "";
  badCon.firstElementChild.classList = "";
  goodCon2.firstElementChild.classList = "";
  badCon2.firstElementChild.classList = "";

  //hide andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  //add pause før removed at random delay
  goodCon.classList.add("paused");
  badCon.classList.add("paused");
  goodCon2.classList.add("paused");
  badCon2.classList.add("paused");

  //add eventlistener til good og bad
  goodCon.addEventListener("mousedown", clickGood);
  badCon.addEventListener("mousedown", clickBad);
  goodCon2.addEventListener("mousedown", clickGood);
  badCon2.addEventListener("mousedown", clickBad);

  //add spin animation
  goodCon.firstElementChild.classList.add("spin_" + randomValue(2));
  badCon.firstElementChild.classList.add("spin_" + randomValue(2));
  goodCon2.firstElementChild.classList.add("spin_" + randomValue(2));
  badCon2.firstElementChild.classList.add("spin_" + randomValue(2));

  //reset life
  console.log("reset af liv");
  life = 3;
  document.querySelector("#life1").classList.remove("gray");
  document.querySelector("#life2").classList.remove("gray");
  document.querySelector("#life3").classList.remove("gray");

  //start random delay + positioner der leder til elementer falder
  speed = 0;
  goodCon.classList.add("pos_" + randomValue(7));
  badCon.classList.add("pos_" + randomValue(7), "speed" + speed);
  goodCon2.classList.add("pos_" + randomValue(7));
  badCon2.classList.add("pos_" + randomValue(7), "speed" + speed);
  randomDelay(goodCon);
  randomDelay(badCon);
  randomDelay(goodCon2);
  randomDelay(badCon2);

  //add fall
  goodCon.classList.add("faldGood");
  badCon.classList.add("faldBad");
  goodCon2.classList.add("faldGood");
  badCon2.classList.add("faldBad");

  //Event listener for reset
  goodCon.addEventListener("animationend", goodReset);
  goodCon2.addEventListener("animationend", goodReset);
  badCon.addEventListener("animationend", badReset);
  badCon2.addEventListener("animationend", badReset);
}

function clickGood() {
  paper.currentTime = 0;
  paper.play();

  console.log(this);
  this.firstElementChild.classList = "";

  //add click animation og add pause + event_null
  this.firstElementChild.classList.add("goodClick", "paper_ball");
  this.classList.add("paused", "event_null");

  //minus liv og udskriv
  if (life > 1) {
    document.querySelector("#life" + life).classList.add("gray");
    life--;
  } else {
    document.querySelector("#life" + life).classList.add("gray");
    life--;
    endgame();
  }

  this.addEventListener("animationend", goodReset);
}

function clickBad() {
  cupGone.currentTime = 0;
  cupGone.play();

  console.log(this);
  this.firstElementChild.classList = "";

  //add click animation og add pause + event_null
  this.firstElementChild.classList.add("badClick");
  this.classList.add("paused", "event_null");

  //giv point og udskriv
  // Mark that a point was earned
  lastPointEarned = true;

  // Update points
  point++;
  console.log("Player earned a point! Current points:", point);
  document.querySelector("#point").textContent = point;
  if ([7, 14, 20].includes(point)) {
    console.log("speed up");
    speed++;
  }
  this.addEventListener("animationend", badReset);
}

function goodReset() {
  console.log(this);

  //Clear class
  this.classList = "paused";
  this.firstElementChild.classList = "";
  //Reset
  this.offsetWidth;
  this.firstElementChild.offsetWidth;
  this.classList.add("faldGood", "pos_" + randomValue(7));
  this.firstElementChild.classList.add("spin_" + randomValue(2));

  randomDelay(this);
}

function badReset() {
  console.log(this);

  //Clear class
  this.classList = "paused";
  this.firstElementChild.classList = "";
  //Reset
  this.offsetWidth;
  this.firstElementChild.offsetWidth;
  this.classList.add("faldBad", "speed" + speed, "pos_" + randomValue(7));
  this.firstElementChild.classList.add("spin_" + randomValue(2));
  randomDelay(this);
  // Check if no point was earned since the last reset
  if (!lastPointEarned) {
    cup.currentTime = 0;
    cup.play();
    life--;
    console.log("Player did not earn a point. Life lost. Lives remaining:", life);

    // Update UI to reflect lost life
    document.querySelector(`#life${life + 1}`).classList.add("gray");

    // Check for game over
    if (life <= 0) {
      endgame();
    }
  }
  // Reset the flag for the next cycle
  lastPointEarned = false;
}
function randomValue(rng) {
  return Math.floor(Math.random() * rng);
}

function endgame() {
  clockHand.classList.add("paused");

  //Start timer
  clockHand.removeEventListener("animationend", endgame);

  //End
  badCon.classList = "paused";
  badCon.firstElementChild.classList = "paused";
  goodCon.classList = "paused";
  goodCon.firstElementChild.classList = "paused";

  goodCon.removeEventListener("mousedown", clickGood);
  badCon.removeEventListener("mousedown", clickBad);

  goodCon.firstElementChild.removeEventListener("animationend", goodReset);
  goodCon.removeEventListener("animationend", goodReset);

  badCon.firstElementChild.removeEventListener("animationend", badReset);
  badCon.removeEventListener("animationend", badReset);

  //End2
  badCon2.classList = "paused";
  badCon2.firstElementChild.classList = "paused";
  goodCon2.classList = "paused";
  goodCon2.firstElementChild.classList = "paused";

  goodCon2.removeEventListener("mousedown", clickGood);
  badCon2.removeEventListener("mousedown", clickBad);

  goodCon2.firstElementChild.removeEventListener("animationend", goodReset);
  goodCon2.removeEventListener("animationend", goodReset);

  badCon2.firstElementChild.removeEventListener("animationend", badReset);
  badCon2.removeEventListener("animationend", badReset);

  if (life == 0) {
    console.log("Game Over");
    document.querySelector("#game_over").classList.remove("hide");
  } else if (point < 5) {
    console.log("Game Over");
    document.querySelector("#game_over").classList.remove("hide");
  } else {
    console.log("Level Complete!");
    document.querySelector("#level_complete").classList.remove("hide");
  }
}

//chatgpt

// Select the mute button and audio element
const muteButton = document.getElementById("muteButton");
const backgroundSound = document.getElementById("background__sound");

// Initialize event listener
muteButton.addEventListener("click", () => {
  // Toggle the mute state of the audio
  backgroundSound.muted = !backgroundSound.muted;

  // Update the button's appearance based on the mute state
  if (backgroundSound.muted) {
    muteButton.classList.add("muted"); // Add the "muted" class to show the line
  } else {
    muteButton.classList.remove("muted"); // Remove the "muted" class to hide the line
  }
});
