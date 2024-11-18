window.addEventListener("load", vises);

let point = 0;
let life = 3;
let speed = 0;

const goodCon = document.querySelector("#good_container");
const goodCon2 = document.querySelector("#good_container2");

const badCon = document.querySelector("#bad_container");
const badCon2 = document.querySelector("#bad_container2");

const clockHand = document.querySelector("#clock_hand");

function vises() {
  //viser points starter timer
  document.querySelector("#point").textContent = point;
  clockHand.classList.add("time");

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
  let life = 3;
  document.querySelector("#life1").classList.remove("gray");
  document.querySelector("#life2").classList.remove("gray");
  document.querySelector("#life3").classList.remove("gray");

  //start random delay + positioner der leder til elementer falder
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
  goodCon.firstElementChild.addEventListener("animationend", goodReset);
  goodCon.addEventListener("animationend", goodReset);

  badCon.firstElementChild.addEventListener("animationend", badReset);
  badCon.addEventListener("animationend", badReset);
}

function clickGood() {
  console.log(this);
  this.firstElementChild.classList = "";

  //add click animation og add pause of event_null
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
}

function clickBad() {
  console.log(this);
  this.firstElementChild.classList = "";

  //add click animation og add pause of event_null
  this.firstElementChild.classList.add("badClick");
  this.classList.add("paused", "event_null");

  //giv point og udskriv
  point++;
  document.querySelector("#point").textContent = point;
  if ([2, 4, 6].includes(point)) {
    console.log("speed up");
    speed++;
  }
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
}

function randomValue(rng) {
  return Math.floor(Math.random() * rng);
}

clockHand.addEventListener("animationend", endgame);

function endgame() {
  clockHand.classList.add("paused");

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

  //End
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
