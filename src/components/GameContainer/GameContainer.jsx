import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board/Board';
import Belly from '../Belly';
import {
  startGame,
  toggleMoveSnake,
  toggleResetGame,
  resetCollided,
} from './gameContainerSlice';
import { updateTile } from '../Board/boardSlice';

function GameContainer() {
  const dispatch = useDispatch();
  const { running, resetGame } = useSelector(state => state.gameContainer);
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
    dispatch(resetCollided());
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
      <Belly />
    </div>
  );

  function setWord() {}
}

export default GameContainer;
