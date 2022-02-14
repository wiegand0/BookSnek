import { worm } from './worm';
import { board } from './board';
import 'regenerator-runtime';

//game conatiner runs the game loop, contains the instance of the actual game
console.log('gameContainer');
const gameContainer = (function () {
  let running = true;

  //-----!!! DOCUMENT LISTENERS !!!-----//
  //listener for pause button
  // const pauseButt = document.getElementById('pause');
  // pauseButt.addEventListener('click', pauseMe);

  // const pauseDisplay = document.getElementById('paused');

  //listener for reset button
  // const resetButt = document.getElementById('reset');
  //!!deprecated until setInterval is refactored!!
  //reset.addEventListener("click", resetMe);

  // const countDown = document.getElementById('countdown');

  //-----!!!					  !!!-----//

  //sleep function for countdown timer
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function countIn(count, countDown) {
    countDown.innerHTML = count;
  }

  async function initialize(countDown) {
    worm.initialize();
    board.initialize();
    run();

    //make sure countdown is set to 3, display countdown
    countDown.innerHTML = 3;
    countDown.removeAttribute('hidden');

    //sleep for 3 seconds, updating countdown
    for (let i = 0; i < 3; i++)
      await sleep(1000).then(() => {
        countIn(3 - i, countDown);
      });

    //hide countdown
    await sleep(1000).then(() => {
      countDown.setAttribute('hidden', '');
    });

    //REFACTOR AWAY FROM SETINTERVAL
    let runInterval = setInterval(run, 500);
  }

  function resetMe() {
    board.reset();
    initialize();
  }

  function pauseMe(pauseDisplay) {
    running = !running;

    if (running) pauseDisplay.setAttribute('hidden', true);
    else pauseDisplay.removeAttribute('hidden');
  }

  function update() {
    board.update();
  }

  function input() {}

  function render() {
    //board html element
    document.getElementById('gameContainer').innerHTML = '';
    //belly html element
    document.getElementById('belly').innerHTML = '';

    //generate the html for the game board
    for (const till of board.getBoard()) {
      const para = document.createElement('div');
      if (till.getWormed()) {
        if (till.getHead()) {
          para.setAttribute('id', 'tileHead');
          para.setAttribute('class', 'rotate' + till.getOrient());
        } else if (till.getTail()) {
          para.setAttribute('id', 'tileTail');
          para.setAttribute('class', 'rotate' + till.getOrient());
        } else {
          para.setAttribute(
            'class',
            'tileBody o' +
              till.getOrient() +
              ' rotate' +
              (till.getOrient() % 4),
          );
        }
      } else {
        para.setAttribute('class', 'tile');
      }
      const node = document.createTextNode(till.getContent());
      const element = document.getElementById('gameContainer');

      para.appendChild(node);
      element.appendChild(para);
    }

    let bellyString = board.getPlayer().getBelly().getContent();

    //generate the belly tiles, currently preset to 12
    for (let i = 0; i < 10; i++) {
      const paraBelly = document.createElement('p');
      paraBelly.setAttribute('class', 'tileBelly');

      let nodeBelly = document.createTextNode('');

      if (bellyString[i]) nodeBelly = document.createTextNode(bellyString[i]);

      paraBelly.appendChild(nodeBelly);

      const elementBelly = document.getElementById('belly');
      elementBelly.appendChild(paraBelly);
    }
  }

  function run() {
    if (board.getPlayer().getCollided()) {
      running = false;
      console.log('GAME OVVVVERRRRRR');
      return;
    }

    if (running) {
      update();
      render();
    }
  }

  function arrowKey(e) {
    board.keyDown(e);
  }

  return {
    arrowKey,
    initialize,
    pauseMe,
  };
})();

export { gameContainer };

// gameContainer.initialize();
