/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const squares = Array.from(document.querySelectorAll('.container_block'));

const emptySquares = () => squares.filter(el => !el.textContent);
const container = document.querySelector('.container');
let userLetter;
let opponentLetter;
let winner;
const displayModal = (text) => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const message = document.createElement('p');
  message.textContent = text;
  const wrapper = document.createElement('div');
  wrapper.className = 'modal_wrapper';
  document.body.append(wrapper, modal);
  modal.appendChild(message);
  return modal;
};

const removeModal = () => {
  const modal = document.querySelector('.modal');
  const wrapper = document.querySelector('.modal_wrapper');
  modal.remove();
  wrapper.remove();
};
const opponentChoice = () => Math.floor(Math.random() * emptySquares().length);
const takeTurn = (index, letter) => {
  squares[index].textContent = letter;
  if (emptySquares().length === 0) {
    displayModal('Draw!');
  }
};
const myTurn = (event) => {
  takeTurn(event.target.dataset.pos, userLetter);
  if (!checkForWinner()) {
    opponentTurn();
  }
};

const disableListeners = () => {
  squares.forEach((element) => {
    element.removeEventListener('click', myTurn);
  });
};
const checkArray = array => array.every(el => el.textContent === array[0].textContent && el.textContent);
const checkForWinner = () => {
  let victory = false;
  winningCombos.forEach((arr) => {
    const sequence = [squares[[arr[0]]], squares[[arr[1]]], squares[[arr[2]]]];
    if (checkArray(sequence)) {
      victory = true;
      sequence.forEach((element) => {
        element.classList.toggle('highlight');
      });
      for (const element in sequence) {
        if (squares[[arr[0]]].textContent === userLetter) {
          displayModal('You won!');
          break;
        } else if (squares[[arr[0]]].textContent === opponentLetter) {
          displayModal('You lost!');
          break;
        }
      }
    }
  });
  return victory;
};
const opponentTurn = () => {
  disableListeners();
  setTimeout(() => {
    emptySquares()[opponentChoice()].textContent = opponentLetter;
    emptySquares()[opponentChoice()].removeEventListener('click', myTurn);
    enableListeners();
    checkForWinner();
  }, 1000);
};

const enableListeners = () => {
  emptySquares().forEach((element) => {
    element.addEventListener('click', myTurn);
  });
};
const decideLetters = () => {
  const modal = displayModal('Would you like to be X or O?');
  const firstButton = document.createElement('button');
  const secondButton = document.createElement('button');
  firstButton.textContent = 'X';
  secondButton.textContent = 'O';
  modal.append(firstButton, secondButton);
  firstButton.addEventListener('click', (event) => {
    userLetter = event.target.textContent;
    // eslint-disable-next-line no-unused-expressions
    userLetter === 'X' ? opponentLetter = 'O' : opponentLetter = 'X';
    removeModal();
    enableListeners(event.target.textContent);
  });
  secondButton.addEventListener('click', (event) => {
    userLetter = event.target.textContent;
    // eslint-disable-next-line no-unused-expressions
    userLetter === 'X' ? opponentLetter = 'O' : opponentLetter = 'X';
    removeModal();
    enableListeners(event.target.textContent);
  });
};
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

decideLetters();
 if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((reg) => {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope);
		})
		.catch((error) => {
			// registration failed
			console.log('Registration failed with ' + error);
		});
}
