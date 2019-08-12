import { $, $$, h } from './dom';
import { Player, Computer, Game } from './game';
import { threadId } from 'worker_threads';

const game = new Game('X', 'O', true);
const gameBoard: Element = $('div.game-board')!;
const gameBoardChildren: NodeListOf<Element> = $$('div.game-board >div');
const msgDiv = $('div.game-state')!;
const updateMsg = (msg: string) => {
  msgDiv.textContent = msg;
};

const isBoardFull = (arr: string[]) => {
  return arr.every((item: string) => item !== '');
};

class DOMstuff {
  gameBoard: Element;

  gameBoardChildren: NodeListOf<Element>;

  constructor() {
    this.gameBoard = gameBoard;
    this.gameBoardChildren = gameBoardChildren;
  }

  handleClick = ($ev: Event) => {
    const $el = $ev.target as Element;
    switch (true) {
      case game.playerOneTurn && !game.isBoardFull(): {
        $el.textContent = game.playerOne.letter;
        game.updateState(gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);
        break;
      }
      case !game.playerOneTurn && !game.isBoardFull(): {
        $el.textContent = game.playerTwo.letter;
        game.updateState(gameBoardChildren);

        $el.removeEventListener('click', this.handleClick);

        break;
      }

      default:
        break;
    }
    game.playerOneTurn = !game.playerOneTurn;
    msgDiv.textContent = game.playerOneTurn ? 'Player One Turn' : 'Player Two Turn';

    if (!game.isGameWon() && game.isBoardFull()) {
      this.disableListeners();
      msgDiv.textContent = 'Draw';
    } else if (game.isGameWon() === true) {
      this.disableListeners();
      msgDiv.textContent = `${game.winner} wins!`;
      game.highlightedCells.forEach((index: number) => {
        $(`div[data-index="${index}"]`)!.classList.add('highlight');
      });
    }
  };

  enableListeners() {
    this.gameBoardChildren.forEach(($el: Element) =>
      $el.addEventListener('click', this.handleClick),
    );
  }

  disableListeners() {
    this.gameBoardChildren.forEach(($el: Element) =>
      $el.removeEventListener('click', this.handleClick),
    );
  }
}

class SingleDOM extends DOMstuff {
  computerTurn = () => {
    const randomIndex = game.playerTwo.randomItem();
    if (game.stateArray[randomIndex] !== '' && !game.isBoardFull()) {
      this.computerTurn();
    } else {
      const $el: Element = $(`div[data-index="${randomIndex}"]`)!;
      $el.textContent = game.playerTwo.letter;
      $el.removeEventListener('click', this.handleClick);
      this.checkForWinner();
    }
  };

  handleClick = ($ev: Event) => {
    // this.checkForWinner();
    this.checkForWinner();
    const $el = $ev.target as Element;
    const won: boolean = game.isGameWon();
    $el.removeEventListener('click', this.handleClick);

    // game.playerOneTurn = !game.playerOneTurn;
    switch (true) {
      case game.playerOneTurn && !game.isBoardFull() && won === false: {
        $el.textContent = game.playerOne.letter;
        msgDiv.textContent = game.playerOneTurn
          ? `${game.playerOne.name} turn`
          : `${game.playerTwo.name} turn`;

        game.updateState(gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);
        this.computerTurn();
        this.checkForWinner();
        break;
      }

      default:
        break;
    }

    // msgDiv.textContent = game.playerOneTurn
    //   ? `${game.playerOne.name} turn`
    //   : `${game.playerTwo.name} turn`;
    // if (!game.isGameWon() && game.isBoardFull()) {
    // this.disableListeners();
    // msgDiv.textContent = 'Draw';
    // } else if (game.isGameWon() === true) {
    // this.disableListeners();
    // msgDiv.textContent = `${game.winner} wins!`;
    // game.highlightedCells.forEach((index: number) => {
    //   $(`div[data-index="${index}"]`)!.classList.add('highlight');
    // });
    // }
  };
  checkForWinner = () => {
    const won = game.isGameWon();
    console.log(won);
    switch (true) {
      case won === false && game.isBoardFull(): {
        this.disableListeners();
        msgDiv.textContent = 'Draw';
        break;
      }
      case won === true: {
        this.disableListeners();
        msgDiv.textContent = `${game.winner} wins!`;
        game.highlightedCells.forEach((index: number) => {
          $(`div[data-index="${index}"]`)!.classList.add('highlight');
        });
        break;
      }
      default:
        break;
    }
  };
}
class MultiDom extends DOMstuff {}
const DOM = new SingleDOM();
DOM.enableListeners();

const startGame = () => {};
