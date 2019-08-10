/* eslint-disable no-use-before-define */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const gameState: string[] = ['', '', '', '', '', '', '', '', ''];

class Player {
  letter: string;

  won: boolean;

  constructor(letter: string, won: boolean) {
    this.letter = letter;
    this.won = won;
  }
}
class Game {
  // Handles game stuff

  stateArray: string[];

  playerOne: any;

  playerOneTurn: boolean = true;

  playerTwo: any;

  board: Element;

  boardChildren: NodeListOf<Element>;

  constructor(stateArray: string[], target: Element) {
    this.stateArray = stateArray;
    this.board = target;

    this.boardChildren = target.querySelectorAll('div')!;
  }

  initialize(userLetter: string, playerLetter: string) {
    this.playerOne = new Player(userLetter, false);
    this.playerTwo = new Player(playerLetter, false);
    this.enableListeners();
  }

  updateState = (index: number, letter: string) => {
    this.stateArray[index] = letter;
    this.updateBoard(this.stateArray);
  };

  updateBoard = (state: string[]) => {
    state.forEach((letter: string, index: number) => {
      if (this.boardChildren[index].textContent === '') {
        this.boardChildren[index].textContent = letter;
      }
    });
  };

  enableListeners = () => {
    this.boardChildren.forEach((el: Element) => {
      el.addEventListener('click', this.handle);
    });
  };

  handle = (ev: Event) => {
    if (ev.target instanceof HTMLElement) {
      const index: number = Number(ev.target!.dataset!.index!);
      if (this.playerOneTurn) {
        board.updateState(index, this.playerOne.letter);
      } else {
        board.updateState(index, this.playerTwo.letter);
      }
      this.updateBoard(board.stateArray);
    }
    this.playerOneTurn = !this.playerOneTurn;
  };

  turn = () => {};
}

const board = new Game(gameState, $('div.game-board')!);
board.initialize('X', 'O');
