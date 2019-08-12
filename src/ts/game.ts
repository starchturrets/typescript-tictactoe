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

  constructor(playerOneLetter: string, playerTwoLetter: string) {
    this.stateArray = ['', '', '', '', '', '', '', '', ''];
    this.playerOne = new Player(playerOneLetter);
    this.playerTwo = new Player(playerTwoLetter);
  }

  updateState = ($cells: NodeListOf<Element>) => {
    $cells.forEach((item: Element, index: number) => {
      this.stateArray[index] = item.textContent!;
    });
  };

  handle = (ev: Event) => {
    // if (ev.target instanceof HTMLElement) {
    //   const index: number = Number(ev.target!.dataset!.index!);
    //   // this.disableListeners();
    //   if (this.playerOneTurn) {
    //     this.updateState(index, this.playerOne.letter);
    //   } else {
    //     this.updateState(index, this.playerTwo.letter);
    //   }
    //   const bool: boolean = this.checkForWinner(); // Has anyone won?
    //   this.isBoardFull();
    //   if (bool === false && !this.isBoardFull()) {
    //     // If not, continue game
    //     // this.enableListeners();
    //   } else if (bool === true) {
    //     console.log('Winner');
    //     // this.disableListeners();
    //   } else if (!bool && this.isBoardFull()) {
    //     console.log('Draw');
    //   }
    // }
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
        // If anyone won, return the winning player's letter
        if (sequence[0] === this.playerOne.letter) return [this.playerOne.letter, winningCombos[i]];
        if (sequence[0] === this.playerTwo.letter) return [this.playerTwo.letter, winningCombos[i]];
      }
    }

    if (this.isBoardFull()) {
      return 'Draw';
    }
    // Default, if nobody won and the board is not yet full
    return 'Not Won';
  };
}
