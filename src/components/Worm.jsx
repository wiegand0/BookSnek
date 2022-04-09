import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCollided,
  toggleMoveSnake,
  toggleHeadMoved,
} from './GameContainer/gameContainerSlice';
import { moveHead, moveTail } from './Board/boardSlice';
import { boardWidth } from '../js/boardDimensions';

function Worm({ head, tail, orientation, location }) {
  const dispatch = useDispatch();
  let newLocation;
  const board = useSelector(state => state.board);
  const { collided, eating, moveSnake, headMoved } = useSelector(
    state => state.gameContainer,
  );

  useEffect(() => {
    if (moveSnake) move();
  }, [moveSnake, headMoved]);

  function getClassName() {
    let className = 'tile';
    if (head) {
      className += 'Head ';
    } else if (tail) {
      className += 'Tail ';
    } else {
      className += ` o${orientation}`;
    }
    className += ` rotate${orientation % 4}`;
    return className;
  }

  function eat() {}
  function adjustCoordinates() {
    //if going down add board width, opposite for going up
    //0 is up, 1 is down, 2 is left, 3 is right

    //0: up, 1: right, 2: down, 3: left
    switch (orientation) {
      case 0:
        if (location >= boardWidth - 1) newLocation = location - boardWidth;
        else {
          dispatch(setCollided());
          //trigger game over
          return;
        }
        break;
      case 1:
        if (location % boardWidth != boardWidth - 1) newLocation = location + 1;
        else {
          dispatch(setCollided());
          //trigger game over
          return;
        }
        break;
      case 2:
        if (location < boardSize - boardWidth)
          newLocation = location + boardWidth;
        else {
          dispatch(setCollided());
          //trigger game over
          return;
        }
        break;
      case 3:
        if (location % boardWidth != 0) newLocation = location - 1;
        else {
          dispatch(setCollided());
          //trigger game over
          return;
        }
        break;
    }
  }
  function setOrientation() {}
  function changeDirection() {}
  function move() {
    if (head && !headMoved) {
      adjustCoordinates();
      if (board[newLocation].isPlayer) {
        dispatch(setCollided());
      }
      if (!collided) {
        dispatch(
          moveHead({ newHead: board[newLocation], oldHead: board[location] }),
        );
      }
      if (!eating) {
        dispatch(toggleHeadMoved());
      }
      // If snake is eating tail does not move, movement is complete //
      if (eating) {
        dispatch(toggleMoveSnake());
      }
    }
    // Only move the tail if not eating and after the head has moved//
    if (tail && !eating && headMoved) {
      adjustCoordinates();
      dispatch(
        moveTail({ newTail: board[newLocation], oldTail: board[location] }),
      );
      // Let app know snake is done moving //
      dispatch(toggleMoveSnake());
      dispatch(toggleHeadMoved());
    }
  }

  return <div className={getClassName()}></div>;
}

export default Worm;
