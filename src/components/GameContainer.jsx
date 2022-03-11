import { useState } from 'react';
import { HotUpdateChunk } from 'webpack';

function GameContainer({}) {
  [running, setRunning] = useState(false);

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
