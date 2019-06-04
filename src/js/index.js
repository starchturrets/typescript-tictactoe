'use strict';

let userLetter; //The letter that the user chooses

let computerLetter; //The letter the user does not choose

const modal = document.querySelector('.modal');
const wrapper = document.querySelector('.modal_wrapper');
const container = document.querySelector('.container');
const buttonO = document.querySelector('.O');
const buttonX = document.querySelector('.X');

const buttons = document.querySelectorAll('button');

const cells = document.querySelectorAll('.container > div'); //Selects all the squares

buttons.forEach((el) => {
  el.addEventListener('click', () => {
    userLetter = el.textContent;
    userLetter === 'X' ? (computerLetter = 'O') : (computerLetter = 'X');
    hideModal();
  });
});

function hideModal() {
  modal.className = 'hidden';
  wrapper.className = 'hidden';
}

cells.forEach((el) => el.addEventListener('click', toggle, { once: true }));

function toggle() {
  //Not putting this in an arrow function because I need to remove it later on
  this.textContent = userLetter; //The square clicked gets either an X or an O
  npcTurn();
}

function npcTurn() {
  checkForWinner();
  const max = cells.length;
  const randomNumber = Math.floor(Math.random() * max);

  //The computer selects a random item from cells[]
  if (!cells[randomNumber].textContent) {
    //If the cell is empty
    cells[randomNumber].textContent = computerLetter; //Add an X or an O
    cells[randomNumber].removeEventListener('click', toggle); //And prevent it from being clicked again
  } else {
    //Otherwise, select another item
    let filled = checkSquares();
    if (filled === false) {
      //Check if all squares have been filled to prevent infinite recursion
      npcTurn();
    } else {
      checkForWinner();
      //	draw();
    }
  }
}

function draw() {
  displayModal();
  modal.textContent = 'Draw!';
}
function checkForWinner() {
  const didIWin = checkLetters(userLetter);
  const didILose = checkLetters(computerLetter);

  const allSquaresFilled = checkSquares();
  if (didIWin === true && didILose === false) {
    winner();
  } else if (didIWin === false && didILose === true) {
    displayModal();
    modal.textContent = 'You lost!';
  } else if (didIWin === false && didILose === false && allSquaresFilled === true) {
    displayModal();
    modal.textContent = 'Draw!';
  }
}

function checkSquares() {
  let arr = [];
  cells.forEach((i) => {
    arr.push(i.textContent);
  });
  if (arr.includes('')) {
    return false;
  } else {
    return true;
  }
}
function checkLetters(letter) {
  let arr = [];
  cells.forEach((i) => {
    arr.push(i.textContent);
  });
  //let bool = false;
  switch (true) {
    case letter === arr[0] && arr[0] === arr[1] && arr[1] === arr[2]:
    case letter === arr[3] && arr[3] === arr[4] && arr[4] === arr[5]:
    case letter === arr[6] && arr[6] === arr[7] && arr[7] === arr[8]: //Check columns
    case letter === arr[0] && arr[0] === arr[3] && arr[3] === arr[6]:
    case letter === arr[1] && arr[1] === arr[4] && arr[4] === arr[7]:
    case letter === arr[2] && arr[2] === arr[5] && arr[5] === arr[8]:
    case letter === arr[0] && arr[0] === arr[4] && arr[4] === arr[8]:
    case letter === arr[2] && arr[2] === arr[4] && arr[4] === arr[6]: {
      return true;
    }
  }

  return false;
}
function displayModal() {
  modal.className = 'modal';
  wrapper.className = 'modal_wrapper';
}
function winner() {
  displayModal();
  modal.textContent = 'You won!';
}
