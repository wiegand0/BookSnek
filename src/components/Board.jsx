import { useState } from 'react/cjs/react.production.min';
import { boardHeight, boardWidth, boardSize } from '../js/boardDimensions';
import Tile from './Tile';
function Board({ gameOver, player }) {
  const [boardActual, setBoardActual] = useState([]);

  function initialize() {
    for (let i = 0; i < boardSize; i++) {
      setBoardActual(prev => [
        ...prev,
        {
          index: i,
          content: '',
          update: false,
          isPlayer: false,
          head: false,
          tail: false,
          orientation: 1,
        },
      ]);
    }
  }
  function destruct() {
    setBoardActual([]);
  }

  // This needs to be reworked to be able to pull content and isPlayer //
  function pickTile() {
    //choose a random tile
    let tileChosen = Math.floor(Math.random() * boardSize);
    //when the tile picked is occupied by player, or is non-empty, pick again

    let tries = 0;
    while (
      boardActual[tileChosen].content != '' ||
      boardActual[tileChosen].isPlayer
    ) {
      tileChosen = Math.floor(Math.random() * boardSize);
      //arbitrary break point to stop inifinite loop
      if (tries > 50) break;
      tries++;
    }

    //when tile is selected, fill it, if no tile is selected within 50 tries
    //do nothing
    if (tries < 50) boardActual[tileChosen].update = true;
  }
  function update() {}

  return (
    <>
      {boardActual.map(tile => {
        <Tile
          content={tile.content}
          index={tile.index}
          update={tile.update}
          isPlayer={tile.isPlayer}
          head={tile.head}
          tail={tile.tail}
          orientation={tile.orientation}
        />;
      })}
    </>
  );
}

export default Board;
