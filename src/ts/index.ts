import { $, $$, h } from './dom';
import { Player, Computer, Game } from './game';

// let game = new Game('X', 'O', false);
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

  game: Game;

  gameBoardChildren: NodeListOf<Element>;

  constructor(game: Game) {
    this.game = game;
    this.gameBoard = gameBoard;
    this.gameBoardChildren = gameBoardChildren;
  }

  handleClick = ($ev: Event) => {
    const $el = $ev.target as Element;
    switch (true) {
      case this.game.playerOneTurn && !this.game.isBoardFull(): {
        $el.textContent = this.game.playerOne.letter;
        this.game.updateState(gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);
        break;
      }
      case !this.game.playerOneTurn && !this.game.isBoardFull(): {
        $el.textContent = this.game.playerTwo.letter;
        this.game.updateState(gameBoardChildren);

        $el.removeEventListener('click', this.handleClick);

        break;
      }

      default:
        break;
    }
    this.game.playerOneTurn = !this.game.playerOneTurn;
    msgDiv.textContent = this.game.playerOneTurn ? 'Player One Turn' : 'Player Two Turn';

    if (!this.game.isGameWon() && this.game.isBoardFull()) {
      this.disableListeners();
      msgDiv.textContent = 'Draw';
    } else if (this.game.isGameWon() === true) {
      this.disableListeners();
      msgDiv.textContent = `${this.game.winner} wins!`;
      this.game.highlightedCells.forEach((index: number) => {
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
    // this.checkForWinner();
    this.game.playerOneTurn = false;
    msgDiv.textContent = this.game.playerOneTurn
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

        this.game.updateState(gameBoardChildren);
        $el.removeEventListener('click', this.handleClick);
        this.disableListeners();
        msgDiv.textContent = this.game.playerOneTurn
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
    const won = this.game.isGameWon();
    console.log(won);
    switch (true) {
      case won === false && this.game.isBoardFull(): {
        this.disableListeners();
        msgDiv.textContent = 'Draw';
        break;
      }
      case won === true: {
        this.disableListeners();
        msgDiv.textContent = `${this.game.winner} wins!`;
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

const startGame = () => {
  document.body.className = 'modal-open';
  const modal = h('div', { className: 'modal' }, [
    h('h2', {}, ['How would you like to play?']),

    h('button', { className: 'btn-play-alone' }, ['Play Alone']),
    h('button', { className: 'btn-play-multi' }, [`Play With A Friend`]),
    h('button', { className: 'btn-play-anyways' }, [`Play With An Enemy`]),
  ]);
  const btnSingle: Element = $('.btn-play-alone')!;
  const btnFriend: Element = $('.btn-play-multi')!;
  const btnEnemy: Element = $('.btn-play-anyways')!;
  document.body.appendChild(modal);
  // const game = new Game('X', 'O', false);
  // const DOM = new DOMstuff(game);
  // DOM.enableListeners();
};

startGame();
