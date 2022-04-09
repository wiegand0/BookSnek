import Board from '../Board/Board';

function GameContainer() {
  function initialize() {
    let runInterval = setInterval(gameLoop, 500);
  }

  function reset() {}

  function gameLoop() {}

  return (
    <div id="gameContainer">
      <Board />
    </div>
  );

  function setWord() {}
}

export default GameContainer;
