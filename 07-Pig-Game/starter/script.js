'use strict';
let playing = true;
let currentScore = 0;
const players = [0, 0];
let currentPlayer = 0;
let die = 1;
const rllBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
reset();

function rollDice() {
  if (playing) {
    die = Math.ceil(Math.random() * 6);
    setDieImage();
    addToCurrentScore(currentPlayer);
  }
}

function setDieImage() {
  document.querySelector('.dice').src = `dice-${die}.png`;
}

function addToCurrentScore() {
  if (die !== 1) {
    currentScore += die;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    changeUser();
  }
}

function holdScore() {
  if (playing) {
    players[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      players[currentPlayer];
    if (players[currentPlayer] >= 100) {
      prompt(`player ${currentPlayer + 1} won the game!`);
      playing = false;
    } else {
      changeUser();
    }
  }
}

function changeUser() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.toggle('player--active');
  currentPlayer = currentPlayer ? 0 : 1;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.toggle('player--active');
}

function reset() {
  playing = true;
  currentScore = 0;
  currentPlayer = 0;
  die = 1;
  players[0] = 0;
  players[1] = 0;
  setDieImage();
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  if (
    !document.querySelector(`.player--0`).classList.contains('player--active')
  ) {
    document.querySelector(`.player--0`).classList.add('player--active');
  }
  document.querySelector(`.player--1`).classList.remove('player--active');
}

rllBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newBtn.addEventListener('click', reset);
