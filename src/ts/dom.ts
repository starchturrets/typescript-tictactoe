import { Game } from './game';

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const h = (nodeName: string, attrs = {}, children: (Element | string)[] = []) => {
  const $el: Element = Object.assign(document.createElement(nodeName), attrs);

  children.forEach(child => {
    if (typeof child === 'string') {
      $el.appendChild(document.createTextNode(child));
    } else {
      $el.appendChild(child);
    }
  });
  return $el;
};

export class DOMstuff {
  gameBoard: Element;

  msgDiv: Element;

  game: Game;

  gameBoardChildren: NodeListOf<Element>;

  constructor(game: Game) {
    this.msgDiv = $('div.game-state')!;
    this.game = game;
    this.gameBoard = $('div.game-board')!;
    this.gameBoardChildren = $$('div.game-board >div');
  }

  handleClick = ($ev: Event) => {
    const $el = $ev.target as Element;
    $el.removeEventListener('click', this.handleClick);

    switch (true) {
      case this.game.playerOneTurn && !this.game.isBoardFull(): {
        $el.textContent = this.game.playerOne.letter;
        this.game.updateState(this.gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);
        break;
      }
      case !this.game.playerOneTurn && !this.game.isBoardFull(): {
        $el.textContent = this.game.playerTwo.letter;
        this.game.updateState(this.gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);

        break;
      }

      default:
        break;
    }
    this.game.playerOneTurn = !this.game.playerOneTurn;
    this.msgDiv.textContent = this.game.playerOneTurn ? 'Player One Turn' : 'Player Two Turn';

    if (!this.game.isGameWon() && this.game.isBoardFull()) {
      this.disableListeners();
      this.msgDiv.textContent = 'Draw';
    } else if (this.game.isGameWon() === true) {
      this.disableListeners();
      this.msgDiv.textContent = `${this.game.winner} wins!`;
      this.game.highlightedCells.forEach((index: number) => {
        $(`div[data-index="${index}"]`)!.classList.add('highlight');
      });
    }
  };

  enableListeners() {
    [...this.gameBoardChildren]
      .filter((el: Element) => el.textContent === '')
      .forEach(($el: Element) => $el.addEventListener('click', this.handleClick));
  }

  disableListeners() {
    this.gameBoardChildren.forEach(($el: Element) =>
      $el.removeEventListener('click', this.handleClick),
    );
  }
}

export class SingleDOM extends DOMstuff {
  computerTurn = () => {
    // this.checkForWinner();
    this.game.playerOneTurn = false;
    this.msgDiv.textContent = this.game.playerOneTurn
      ? `${this.game.playerOne.name} turn`
      : `${this.game.playerTwo.name} turn`;
    const randomIndex = this.game.playerTwo.randomItem();
    if (this.game.stateArray[randomIndex] !== '' && !this.game.isBoardFull()) {
      this.computerTurn();
    } else {
      const $el: Element = $(`div[data-index="${randomIndex}"]`)!;
      $el.textContent = this.game.playerTwo.letter;
      $el.removeEventListener('click', this.handleClick);
      this.checkForWinner();
    }
  };

  handleClick = ($ev: Event) => {
    this.checkForWinner();
    const $el = $ev.target as Element;

    const won: boolean = this.game.isGameWon();
    $el.removeEventListener('click', this.handleClick);

    switch (true) {
      case this.game.playerOneTurn && !this.game.isBoardFull() && won === false: {
        $el.textContent = this.game.playerOne.letter;

        this.game.updateState(this.gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);
        this.disableListeners();
        this.msgDiv.textContent = this.game.playerOneTurn
          ? `${this.game.playerOne.name} turn`
          : `${this.game.playerTwo.name} turn`;
        setTimeout(() => {
          if (this.game.isGameWon() === false) {
            this.computerTurn();
            this.game.playerOneTurn = true;
            this.enableListeners();
          }

          // game.playerOneTurn = !game.playerOneTurn;
        }, 500);

        this.checkForWinner();
        break;
      }

      default:
        break;
    }
  };

  checkForWinner = () => {
    const won = this.game.isGameWon();
    switch (true) {
      case won === false && this.game.isBoardFull(): {
        this.disableListeners();
        this.msgDiv.textContent = 'Draw';
        break;
      }
      case won === true: {
        this.disableListeners();
        this.msgDiv.textContent = `${this.game.winner} wins!`;
        this.game.highlightedCells.forEach((index: number) => {
          $(`div[data-index="${index}"]`)!.classList.add('highlight');
        });

        break;
      }
      default:
        break;
    }
  };
}
