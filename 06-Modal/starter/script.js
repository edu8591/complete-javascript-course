'use strict';
const modalButtons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalbtn = document.querySelector('.close-modal');
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

for (let i = 0; i < modalButtons.length; i++) {
  modalButtons[i].addEventListener('click', openModal);
}

closeModalbtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
    addHiddenClass();
  }
});

const remaining =
  [17, 16, 15, 25, 16].reduce((previous, current) => previous + current) / 60;

console.log(calculateRemaining());

function calculateRemaining() {
  let rounded = Math.trunc(remaining);

  return `${rounded} hours and ${Math.trunc(
    (remaining - rounded) * 60
  )} minutes remaining`;
}
