window.addEventListener("load", vises);

let point = 0;
let life = 3;

const goodCon = document.querySelector("#good_container");
const goodSpri = document.querySelector("#good_sprite");
const badCon = document.querySelector("#bad_container");
const badSpri = document.querySelector("#bad_sprite");

function vises() {
  //viser points og life
  document.querySelector("#point").textContent = point;
  document.querySelector("#life").textContent = life;

  console.log("Hello World");
  //hide Spil intro side

  //show spil menu
  goodCon.classList.add("paused");
  badCon.classList.add("paused");

  //add eventlistener til good og bad
  goodCon.addEventListener("mousedown", clickGood);
  badCon.addEventListener("mousedown", clickBad);

  //add spin animation
  goodSpri.classList.add("spin_" + randomValue(2));
  badSpri.classList.add("spin_" + randomValue(2));

  //Start playButton
  playButton();
}

function randomDelay(element) {
  // Generate a random delay between 0 and 1.5 seconds (0 to 5000 milliseconds)
  const randomDelay = Math.random() * 1500;

  setTimeout(() => {
    element.classList.remove("paused");
  }, randomDelay);
}

function playButton() {
  //hide spil menu
  //reset/show liv + point
  //start timer
  //start random delay + positioner der leder til elementer falder
  goodCon.classList.add("pos_" + randomValue(7));
  badCon.classList.add("pos_" + randomValue(7));

  randomDelay(goodCon);
  randomDelay(badCon);
}

//temporary!!!
goodCon.classList.add("faldGood");
badCon.classList.add("faldBad");

function clickGood() {
  console.log("goodClick");
  //add click animation og add pause of event_null
  goodSpri.classList.add("goodClick");
  goodCon.classList.add("paused", "event_null");

  //minus liv og udskriv
  life--;
  document.querySelector("#life").textContent = life;
}

function clickBad() {
  console.log("badClick");
  badSpri.classList = "";

  //add click animation og add pause of event_null
  badSpri.classList.add("badClick");
  badCon.classList.add("paused", "event_null");

  //giv point og udskriv
  point++;
  document.querySelector("#point").textContent = point;
}

goodSpri.addEventListener("animationend", goodReset);
goodCon.addEventListener("animationend", goodReset);

function goodReset() {
  //Clear class
  goodCon.classList = "paused";
  goodSpri.classList = "";

  //Reset
  goodCon.offsetWidth;
  goodSpri.offsetWidth;
  goodCon.classList.add("faldGood");
  goodCon.classList.add("pos_" + randomValue(7));
  goodSpri.classList.add("spin_" + randomValue(2));
  randomDelay(goodCon);
}

badSpri.addEventListener("animationend", badReset);

function badReset() {
  //Clear class
  badCon.classList = "paused";
  badSpri.classList = "";
  //Reset
  badCon.offsetWidth;
  badSpri.offsetWidth;
  badCon.classList.add("faldBad");
  badCon.classList.add("pos_" + randomValue(7));
  badSpri.classList.add("spin_" + randomValue(2));
  randomDelay(badCon);
}

function randomValue(rng) {
  return Math.floor(Math.random() * rng);
}
