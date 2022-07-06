import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board/Board';
import {
  startGame,
  toggleMoveSnake,
  toggleResetGame,
  resetGameState,
} from './gameContainerSlice';
import { setBelly } from '../bellySlice';
import { updateTile } from '../Board/boardSlice';

function GameContainer() {
  const dispatch = useDispatch();
  const { running, resetGame, fullBelly } = useSelector(
    state => state.gameContainer,
  );
  const [runInterval, setRunInterval] = useState(0);
  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!running) {
      clearInterval(runInterval);
    } else {
      initialize();
    }
  }, [running]);

  useEffect(() => {
    if (resetGame) reset();
  }, [resetGame]);

  function initialize() {
    dispatch(startGame());
    let runInterval = setInterval(gameLoop, 500);
    setRunInterval(runInterval);
  }

  function reset() {
    clearInterval(runInterval);
    dispatch(resetGameState());
    dispatch(setBelly(''));
    dispatch(toggleResetGame());
    initialize();
  }

  function gameLoop() {
    if (running) {
      dispatch(updateTile());
      dispatch(toggleMoveSnake());
    }
  }

  return (
    <div id="gameContainer">
      <Board />
    </div>
  );
}

export default GameContainer;
