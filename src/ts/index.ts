import { $, $$, h } from './dom';
import { Player, Computer, Game } from './game';

const gameState: string[] = ['', '', '', '', '', '', '', '', ''];
const gameBoard: Element = $('div.game-board')!;
const gameBoardChildren: NodeListOf<Element> = $$('div.game-board >div');
console.log(gameBoardChildren);
const msgDiv = $('div.game-state')!;
const updateMsg = (msg: string) => {
  msgDiv.textContent = msg;
};

const isBoardFull = (arr: string[]) => {
  return arr.every((item: string) => item !== '');
};
const game = new Game('X', 'O');

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
      case game.isGameWon() === 'Won': {
        console.log('Winner');
        this.disableListeners();
        break;
      }
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
    const [msg, sequence]: [string, string[]] = game.isGameWon();
    if (msg === 'Draw' && game.isBoardFull()) {
      console.log('Draw');
      msgDiv.textContent = 'Draw';
    } else if (msg === game.playerOne.letter) {
      msgDiv.textContent = 'Player One Wins'!;
      console.log(sequence);
      sequence.forEach((index: string) => {
        $(`div[data-index="${index}"]`)!.classList.add('highlight');
      });
    } else if (msg === game.playerTwo.letter) {
      msgDiv.textContent = 'Player Two Wins'!;
      sequence.forEach((index: string) => {
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
const DOM = new DOMstuff();
DOM.enableListeners();
