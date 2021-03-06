import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { initialize, updateTile, destruct } from './boardSlice';
import Tile from '../Tile';
import Worm from '../Worm';

function Board() {
  const board = useSelector(state => state.board);
  const { resetGame } = useSelector(state => state.gameContainer);
  const dispatch = useDispatch();
  useEffect(() => dispatch(initialize()), []);

  useEffect(() => {
    if (resetGame === true) {
      dispatch(destruct());
      dispatch(initialize());
    }
  }, [resetGame]);

  return (
    <>
      {board.map(tile => {
        if (tile.isPlayer) {
          return (
            <Worm
              head={tile.head}
              tail={tile.tail}
              orientation={tile.orientation}
              location={tile.index}
            />
          );
        } else {
          return <Tile content={tile.content} />;
        }
      })}
    </>
  );
}

export default Board;
