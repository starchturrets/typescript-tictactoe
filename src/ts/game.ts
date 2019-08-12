import { $, $$ } from './dom';

export class Player {
  letter: string;

  name: string;

  constructor(letter: string, name: string) {
    this.letter = letter;
    this.name = name;
  }
}

export class Computer extends Player {
  randomItem = () => Math.floor(Math.random() * 8);
}
export class Game {
  // Handles game stuff
  winner: string;

  highlightedCells: number[];

  stateArray: string[];

  playerOne: any;

  playerOneTurn: boolean = true;

  playerTwo: any;

  constructor(playerOneLetter: string, playerTwoLetter: string, singlePlayer: boolean) {
    this.stateArray = ['', '', '', '', '', '', '', '', ''];
    if (singlePlayer === false) {
      this.playerOne = new Player(playerOneLetter, 'Player One');
      this.playerTwo = new Player(playerTwoLetter, 'Player Two');
    } else {
      this.playerOne = new Player(playerOneLetter, 'Player');
      this.playerTwo = new Computer(playerTwoLetter, 'Computer');
    }
    this.winner = '';
    this.highlightedCells = [];
  }

  updateState = ($cells: NodeListOf<Element>) => {
    $cells.forEach((item: Element, index: number) => {
      this.stateArray[index] = item.textContent!;
    });
  };

  isBoardFull = () => {
    return this.stateArray.every((item: string) => item !== '');
  };

  isGameWon = () => {
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
        this.highlightedCells = winningCombos[i];
        if (sequence[0] === this.playerOne.letter) {
          this.winner = this.playerOne.name;
        } else if (sequence[0] === this.playerTwo.letter) {
          this.winner = this.playerTwo.name;
        }
        return true;
      }
    }
    return false;
  };
}

export class SinglePlayer extends Game {}
