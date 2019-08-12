import { h, SingleDOM, DOMstuff } from './dom';
import { Game } from './game';

const startGame = () => {
  // Create and append modal
  document.body.className = 'modal-open';
  const btnSingle: Element = h('button', { className: 'btn-play-alone' }, ['Play Alone']);
  const btnFriend: Element = h('button', { className: 'btn-play-multi' }, [`Play With A Friend`]);
  const btnEnemy: Element = h('button', { className: 'btn-play-anyways' }, [`Play With An Enemy`]);
  const h2: Element = h('h2', {}, ['How would you like to play?']);

  const modal = h('div', { className: 'modal' }, [h2, btnSingle, btnFriend, btnEnemy]);

  document.body.appendChild(modal);

  const singlePlayer = () => {
    // First, check which letter the player wants
    h2.textContent = 'Would you like to be X or O?';
    btnEnemy.remove();
    btnFriend.remove();
    btnSingle.remove();

    const btnX = h('button', { className: 'btn-x' }, ['Play With X']);
    const btnO = h('button', { className: 'btn-o' }, ['Play With O']);
    modal.append(btnX, btnO);

    // Then remove the modal and start a singleplayer game
    btnX.addEventListener('click', () => {
      modal.remove();
      document.body.className = '';
      const game = new Game('X', 'O', true);
      const DOM = new SingleDOM(game);
      DOM.enableListeners();
    });
    btnO.addEventListener('click', () => {
      modal.remove();
      document.body.className = '';
      const game = new Game('O', 'X', true);
      const DOM = new SingleDOM(game);
      DOM.enableListeners();
    });
  };

  const multiplayer = () => {
    // Similar to multiplayer, check which letter the player wants
    h2.textContent = 'Would you like to be X or O?';

    btnEnemy.remove();
    btnFriend.remove();
    btnSingle.remove();

    const btnX = h('button', { className: 'btn-x' }, ['Play With X']);
    const btnO = h('button', { className: 'btn-o' }, ['Play With O']);
    modal.append(btnX, btnO);
    btnX.addEventListener('click', () => {
      modal.remove();
      document.body.className = '';
      const game = new Game('X', 'O', false);
      const DOM = new DOMstuff(game);
      DOM.enableListeners();
    });
    btnO.addEventListener('click', () => {
      modal.remove();
      document.body.className = '';
      const game = new Game('X', 'O', true);
      const DOM = new DOMstuff(game);
      DOM.enableListeners();
    });
  };
  // Add Listeners
  btnSingle.addEventListener('click', singlePlayer);
  btnFriend.addEventListener('click', multiplayer);
  btnEnemy.addEventListener('click', multiplayer);
};

startGame();
