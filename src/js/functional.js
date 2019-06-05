// /* eslint-disable no-unused-vars */

// const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
// let myLetter;
// let opponentLetter;

// const squares = Array.from(document.querySelectorAll('.container > div'));
// const modal = document.querySelector('.modal');
// const wrapper = document.querySelector('.modal_wrapper');
// modal.classList.toggle('hidden');
// wrapper.classList.toggle('hidden');
// const letterChoice = (ev) => {
//   myLetter = ev.target.textContent;
//   if (myLetter === 'X') {
//     opponentLetter = 'O';
//   } else {
//     opponentLetter = 'X';
//   }
// };
// const checkArray = array => array.every(el => el.textContent === array[0].textContent && el.textContent);

// const disableListeners = () => {
//   squares.forEach((el) => {
//     el.removeEventListener('click', myTurn);
//   });
// };
// const finish = (sequence) => {
//   disableListeners();
//   modal.classList.toggle('hidden');
//   wrapper.classList.toggle('hidden');
//   sequence.forEach((el) => {
//     const element = el;
//     element.className = 'highlight';
//   });
//   if (sequence[0] === myLetter) {
//     modal.textContent = 'You won!';
//   } else {
//     modal.textContent = 'You lost!';
//   }
// };

// const checkWhoWon = () => {
//   let victory = false;
//   winningCombos.forEach((arr) => {
//     const sequence = [squares[[arr[0]]], squares[[arr[1]]], squares[[arr[2]]]];
//     if (checkArray(sequence)) {
//       victory = true;
//       finish(sequence);
//     }
//   });
//   return victory;
// };

// const buttons = document.querySelectorAll('buttons');
// buttons.forEach((el) => {
//   el.addEventListener('click', letterChoice);
// });
// const opponentTurn = () => {
//   disableListeners();
//   takeTurn(opponentChoice(), opponentLetter);
//   enableListeners();
// };
// const allSquaresEmpty = () => squares.filter(el => el.textContent === '');
// const filledSquares = () => squares.filter(el => el.textContent);
// const myTurn = (ev) => {
//   // takeTurn(ev.target.dataset.pos, myLetter);
//   squares[ev.target.dataset.pos].textContent = myLetter;
//   if (checkWhoWon() === false) {
//     opponentTurn();
//   } else {
//     finish();
//   }
// };
// const enableListeners = () => {
//   allSquaresEmpty().forEach((el) => {
//     el.addEventListener('click', myTurn);
//   });
// };

// const takeTurn = (index, letter) => {
//   if (allSquaresEmpty().length === 0) {
//     finish();
//   } else {
//     allSquaresEmpty()[index].textContent = letter;
//     disableListeners();
//   }
// };
// const opponentChoice = () => Math.floor(Math.random() * allSquaresEmpty().length);

// enableListeners();
