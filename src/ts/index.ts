import { $, $$, h } from './dom';
import { Player, Computer, Game } from './game';

const gameState: string[] = ['', '', '', '', '', '', '', '', ''];
const gameBoard: Element = $('div.game-board')!;
const gameBoardChildren: NodeListOf<Element> = $$('div.game-board >div');
console.log(gameBoardChildren);
const updateMsg = (msg: string) => {
  const msgDiv = $('div.game-state')!;
  msgDiv.textContent = msg;
};

const isBoardFull = () => {
  const arr = gameState;
  if (arr.every((item: string) => item !== '')) {
    return true;
  }
  return false;
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
      case game.playerOneTurn && !game.isBoardFull(): {
        $el.textContent = game.playerOne.letter;
        break;
      }
      case !game.playerOneTurn && !game.isBoardFull(): {
        $el.textContent = game.playerTwo.letter;
        break;
      }

      default:
        break;
    }
    game.playerOneTurn = !game.playerOneTurn;
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
