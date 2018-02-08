// Create an array of words
const words = ['html', 'css', 'javascript', 'sass'];
// Choose word randomly
let randomNum = Math.floor(Math.random() * words.length);
// Create an array of hints that go with the array of words
let hint = ['The structure of a website', 'The stying of a website', 'The language of the Web', 'A CSS preprocessor'];
// Pick a random word from each array
let chosenWord = words[randomNum];
let chosenHint = hint[randomNum];
// Set trys to 6
let trysLeft = 6;
// Create empty arrays for guessed letters that are wrong
let wrongLetter = [];
// Create empty array that will be filled with the amout of underscores as the letters in the word
let underScore = [];
// Create a variable for my input text
let textBox = document.getElementById('guess');
// Create an array of the alphabet
let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
// setting a variable to keep track of letters guessed right
let winCounter = 0;

let reset = document.getElementById('resetBtn')

// Setting the value of the div to the random hint
hintMsg.innerHTML = chosenHint;
// setting the focus to the text box so you dont have to click into it to type
textBox.focus();

// create a function that starts the game
let startGame = () => {
  console.log(chosenWord);
  console.log(chosenHint);
  chosenWord = words[randomNum];
  chosenHint = hint[randomNum];
  // create a funtion to create the underscores
  let createUnderScore = () => {
    // loop through the the random word
    for (let i = 0; i < chosenWord.length; i++) {
      // add an underscore for each iteration
      underScore.push('_');
    }
    // turn the underscore array to a string and set it as the content of the answerBox div
    answerBox.innerHTML = underScore.join(' ');
  }
  // call the function
  createUnderScore();
};
// call the start game function
startGame();

textBox.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    let guessedLetter = document.getElementById('guess').value;
    if (winCounter === chosenWord.length || trysLeft === 0) {
      document.getElementById('guess').disabled = true;
    } else if (chosenWord.indexOf(guessedLetter) > -1) {
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === guessedLetter) {
          underScore[i] = guessedLetter;
          answerBox.innerHTML = underScore.join(' ');
          winCounter++;
          if (winCounter === chosenWord.length) {
            trys.innerHTML = '<p>' + 'You Win!' + '</p>';
            resetBtn.addEventListener('click', function () {
              window.location.reload();
            });
          }
        }
      }
    } else {
      if (guessedLetter > 1 || letters.indexOf(guessedLetter) === -1) {
        alert('Enter a letter');
      } else if (wrongLetter.indexOf(guessedLetter) > -1) {
        guessedMsg.innerHTML = 'Already Guessed: ' + guessedLetter;
      } else if (trysLeft > 1) {
        trysLeft--;
        trys.innerHTML = 'Tries left: ' + trysLeft;
      } else if (trysLeft === 1) {
        trysLeft--;
        trys.innerHTML = '<p>' + 'GAME OVER' + '</p>';
        resetBtn.addEventListener('click', function () {
          window.location.reload();
        });
      } else {
        wrongLetter.push(guessedLetter)
        guessedMsg.innerHTML = '';
        trysLeft--;
        trys.innerHTML = 'Tries left: ' + trysLeft;
        wrongGuess.innerHTML = 'Guessed Wrong: ' + wrongLetter;
      }
    }
    textBox.value = '';
    textBox.focus();
  }
});

resetBtn.addEventListener('click', function () {
  window.location.reload();
});
