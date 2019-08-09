class Game {
  hook: Element;

  gameState: string[];

  constructor(hook: Element, gameState: string[]) {
    this.hook = hook;
    this.gameState = gameState;
    this.gameState.forEach((item: string, index: number) => {
      console.log(item);
      const el: Element = hook;
      el.children[index].textContent = item;
    });
  }
}

const gameState: string[] = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'X'];

const board: Element = document.querySelector('div.game-board');
const game = new Game(board, gameState);
