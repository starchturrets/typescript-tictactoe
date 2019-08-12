import { $, $$ } from './dom';

export class Player {
  letter: string;

  constructor(letter: string) {
    this.letter = letter;
  }
}

export class Computer extends Player {
  randomItem = () => Math.floor(Math.random() * 8);
}
export class Game {
  // Handles game stuff

  stateArray: string[];

  playerOne: any;

  playerOneTurn: boolean = true;

  playerTwo: any;

  board: Element;

  boardChildren: NodeListOf<Element>;

  constructor(playerOneLetter: string, playerTwoLetter: string) {
    this.stateArray = ['', '', '', '', '', '', '', '', ''];
    this.board = $('div.game-board')!;
    this.boardChildren = $$('div.game-board div')!;
    this.playerOne = new Player(playerOneLetter);
    this.playerTwo = new Player(playerTwoLetter);
  }

  updateState = (index: number, letter: string) => {
    if (this.stateArray[index] === '') {
      this.playerOneTurn = !this.playerOneTurn;
      this.stateArray[index] = letter;
      this.updateBoard(index, letter);
    }
  };

  updateBoard = (index: number, letter: string) => {
    console.log(index);
    const css = `div[data-index="${index}"]`;
    const $el = $(css)!;
    $el.textContent = letter;
    this.removeListener($el);
  };

  enableListeners = () => {
    this.boardChildren.forEach((el: Element) => {
      el.addEventListener('click', this.handle);
    });
  };

  disableListeners = () => {
    this.boardChildren.forEach((el: Element) => {
      el.removeEventListener('click', this.handle);
    });
  };

  removeListener = (el: Element) => {
    console.log(el);
    el.removeEventListener('click', this.handle);
  };

  handle = (ev: Event) => {
    if (ev.target instanceof HTMLElement) {
      const index: number = Number(ev.target!.dataset!.index!);
      this.disableListeners();
      if (this.playerOneTurn) {
        this.updateState(index, this.playerOne.letter);
      } else {
        this.updateState(index, this.playerTwo.letter);
      }
      const bool: boolean = this.checkForWinner(); // Has anyone won?
      this.isBoardFull();
      if (bool === false && !this.isBoardFull()) {
        // If not, continue game
        this.enableListeners();
      } else if (bool === true) {
        console.log('Winner');
        // this.disableListeners();
      } else if (!bool && this.isBoardFull()) {
        console.log('Draw');
      }
    }
  };

  isBoardFull = () => {
    const arr: string[] = this.stateArray;
    if (arr.every((item: string) => item !== '')) {
      return true;
    }
    return false;
  };

  checkForWinner = () => {
    const winningCombos: string[][] | number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const checkArray = (array: number[] | string[]) =>
      array.every((el: string | number) => el === array[0] && el);
    for (const i in winningCombos) {
      const [a, b, c] = winningCombos[i];
      const sequence: string[] = [this.stateArray[a], this.stateArray[b], this.stateArray[c]];
      if (checkArray(sequence) === true) {
        return true;
      }
    }
    return false;
  };
}
