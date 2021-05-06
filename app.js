// ==== Select DOM elements ==== //
const minNum = document.querySelector(".min");
const maxNum = document.querySelector(".max");
const game = document.querySelector(".game__input");
const inputNumber = document.querySelector("#game-input-number");
const submitButton = document.querySelector("#game-button");
const gameOutput = document.querySelector(".game__output");
const progressBar = document.querySelector(".progress-bar");
const loading = document.querySelector(".loading");

// Intialization
let min = 1;
let max = 10;
let winnigNum = Math.floor(Math.random() * max + 1);
let guessLeft = 3;
let position = 1;

// Init html docs
minNum.innerText = min;
maxNum.innerText = max;

// ==== Events ==== //
// Submit
submitButton.addEventListener("click", numberSubmit);

// Play again
game.addEventListener("mousedown", playAgain);

// ==== Functions ==== //
// Game number submit
function numberSubmit() {
  let inputValue = inputNumber.value;

  // Show loading
  loading.style.visibility = "visible";

  setTimeout(() => {
    loading.style.visibility = "hidden";

    // Validation
    if (!inputValue || inputValue < min || inputValue > max) {
      //   Show output
      showOutput("It goes against our instruction", "red");
    } else {
      guessLeft--;

      // Show progress bar
      progressBar.style.width = (position * 100) / 3 + "%";
      progressBar.innerHTML = `<span class="bar-text">${guessLeft} left</span>`;
      position++;

      if (parseInt(inputValue) === winnigNum) {
        showOutput(
          `Correct One, The Number is ${winnigNum} Congrats You Won`,
          "#333"
        );
        // Progress bar
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "#333";
        progressBar.innerHTML = `<span class="bar-text">Winner Winner Number Dinner!</span>`;
        // Set for the play again
        afterMath();
      } else {
        if (guessLeft < 1) {
          showOutput(
            `You Lose Mate! Correct is ${winnigNum}, NO guesses left.`,
            "red"
          );
          // Set for the play again
          afterMath();
        } else {
          showOutput(
            `${inputValue} is not correct you have ${guessLeft} guess left, you can try again.`,
            "red"
          );
        }
      }
    }
  }, 1000);

  // Clear the input value
  inputNumber.value = "";
}

// Show output based on number when clicked the button
function showOutput(text, action) {
  gameOutput.innerText = text;
  gameOutput.style.color = action;
}

// Set for the play again
function afterMath() {
  submitButton.innerText = "Play Again";
  submitButton.classList.add("play-again");

  inputNumber.disabled = true;
  inputNumber.style.borderColor = "red";
}

// Play again
function playAgain(e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
}
