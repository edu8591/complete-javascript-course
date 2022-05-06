'use strict';
// selecting elements in javascript
/*
console.log(document.querySelector('.message').classList);

document.querySelector('.message').textContent = 'Correct number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 5;
*/

let secretNumber;
randomNumberGenerator();
let score = 20;
let highScore = 0;
let stillPlaying = true;
// console.log(secretNumber);

document.querySelector('.again').addEventListener('click', () => {
  reset();
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (score > 1) {
    // when there is no input
    if (!guess) {
      updateDom('message', '⛔️ No number!');

      // when guess is different from the required parameters
    } else if (guess > 20 || guess < 1) {
      updateDom('message', 'Please select from 1-20');

      // When the user guesses crrectly
    } else if (guess === secretNumber) {
      updateDom('message', '🎉 correct number');
      updateHighScore();
      updateDom('number', secretNumber);
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('body').style.backgroundColor = '#60b347';
      stillPlaying = false;

      // when the guess is higher than the secret number
    } else {
      updateDom('message', guess > secretNumber ? 'too high' : 'too low');
      reduceScore();
    }

    // when the user scores reaches 0
  } else {
    updateDom('message', 'You lost the game!');
    if (stillPlaying) reduceScore();
    stillPlaying = false;
  }
});

function updateDom(elementClass, message) {
  document.querySelector(`.${elementClass}`).textContent = message;
}
function updateHighScore() {
  if (stillPlaying) {
    if (score > highScore) highScore = score;
    updateDom('highscore', highScore);
  }
}
function reduceScore() {
  score--;
  updateDom('score', score);
}
function randomNumberGenerator() {
  secretNumber = Math.ceil(Math.random() * 20);
}
function reset() {
  score = 20;
  stillPlaying = true;
  updateDom('score', score);
  updateDom('number', '?');
  document.querySelector('.number').style.width = '15rem';
  updateDom('message', 'Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  randomNumberGenerator();
}
