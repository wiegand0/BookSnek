import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCollided,
  toggleMoveSnake,
} from './GameContainer/gameContainerSlice';
import { updateBoard } from './Board/boardSlice';
import { boardWidth, boardSize } from '../js/boardDimensions';
import { eatLetter } from './bellySlice';

function Worm({ head, tail, orientation }) {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board);
  // Holds all updates to board //
  const tempBoard = [...board];
  // state to keep head from turning prior to moving
  const [newOrient, setNewOrient] = useState(null);
  const { moveSnake, collided, running } = useSelector(
    state => state.gameContainer,
  );

  // Add movement event listener //
  useEffect(() => {
    if (head) {
      window.addEventListener('keydown', changeDirection);
      return () => window.removeEventListener('keydown', changeDirection);
    }
  }, [head]);

  // Call move when moveSnake is updated //
  useEffect(() => {
    if (moveSnake && !collided) {
      move();
    }
  }, [moveSnake]);

  // Returns the className for the snake tile //
  function getClassName() {
    let className = 'tile';
    if (head) {
      className += 'Head ';
    } else if (tail) {
      className += 'Tail ';
    } else {
      className += `Body o${orientation}`;
    }
    className += ` rotate${orientation % 4}`;
    return className;
  }

  function adjustCoordinates(tile, forwards = true) {
    let tempLocation = tile.index;
    let tempOrientation = tile.orientation % 4;
    // Reverse orientation to find tiles behind //
    if (!forwards) {
      switch (tempOrientation) {
        case 0:
          tempOrientation = 2;
          break;
        case 1:
          tempOrientation = 3;
          break;
        case 2:
          tempOrientation = 0;
          break;
        case 3:
          tempOrientation = 1;
          break;
      }
    }

    //if going down add board width, opposite for going up
    //0: up, 1: right, 2: down, 3: left

    switch (tempOrientation) {
      case 0:
        if (tempLocation >= boardWidth - 1) tempLocation -= boardWidth;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
      case 1:
        if (tempLocation % boardWidth != boardWidth - 1) tempLocation += 1;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
      case 2:
        if (tempLocation < boardSize - boardWidth) tempLocation += boardWidth;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
      case 3:
        if (tempLocation % boardWidth != 0) tempLocation -= 1;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
    }
    return { newLocation: tempLocation };
  }
  function setOrientation() {
    if (head) {
      //head from last movement
      const newBody = {
        ...tempBoard[adjustCoordinates(getHead(), false).newLocation],
      };
      //neck from last movement
      const oldBody = {
        ...board[adjustCoordinates(getHead(), false).newLocation],
      };
      //piece behind the neck from last movement
      const previousBody = {
        ...board[adjustCoordinates(oldBody, false).newLocation],
      };

      const bodyOrient = [getHead().orientation, previousBody.orientation % 4];

      //8 cases of curved body
      //matching orientations documented in tile.js (line 8-11)
      switch (bodyOrient[0]) {
        case 0:
          //case[0,1], new body is countercw up
          if (bodyOrient[1] === 1)
            tempBoard[newBody.index] = { ...newBody, orientation: 8 };
          //case[0,3], new body is clockwise up
          if (bodyOrient[1] === 3)
            tempBoard[newBody.index] = { ...newBody, orientation: 4 };
          // dispatch(setOrient({ tile: newBody, newOrient: 4 }));
          break;
        case 1:
          //case[1,2], new body is countercw right
          if (bodyOrient[1] === 2)
            tempBoard[newBody.index] = { ...newBody, orientation: 9 };
          //case[1,0], new body is clockwise right
          if (bodyOrient[1] === 0)
            tempBoard[newBody.index] = { ...newBody, orientation: 5 };
          break;
        case 2:
          //case[2,3], new body is countercw down
          if (bodyOrient[1] === 3)
            tempBoard[newBody.index] = { ...newBody, orientation: 10 };
          //case[2,1], new body is clcowkise down
          if (bodyOrient[1] === 1)
            tempBoard[newBody.index] = { ...newBody, orientation: 6 };
          break;
        case 3:
          //case[3,0], new body is countercw left
          if (bodyOrient[1] === 0)
            tempBoard[newBody.index] = { ...newBody, orientation: 11 };
          //case[3,2], new body is clockwise left
          if (bodyOrient[1] === 2)
            tempBoard[newBody.index] = { ...newBody, orientation: 7 };
          break;
      }
    }
  }

  function changeDirection(e) {
    if (running) {
      //for prevention of doubling back on self
      const currentHead = getHead();
      let neck = adjustCoordinates(currentHead, false).newLocation;

      //0: up, 1: right, 2: down, 3: left
      switch (e.key) {
        case 'ArrowUp':
          if (neck !== currentHead.index - boardWidth && newOrient !== 0) {
            setNewOrient(0);
          }
          break;
        case 'ArrowDown':
          if (neck !== currentHead.index + boardWidth && newOrient !== 2) {
            setNewOrient(2);
          }
          break;
        case 'ArrowLeft':
          if (neck !== currentHead.index - 1 && newOrient !== 3) {
            setNewOrient(3);
          }
          break;
        case 'ArrowRight':
          if (neck !== currentHead.index + 1 && newOrient !== 1) {
            setNewOrient(1);
          }
          break;
      }
    }
  }

  function move() {
    let eating = false;

    const snake = board.filter(tile => tile.isPlayer);
    // Only call move from head //
    if (head) {
      const tempHead = {
        ...getHead(),
        orientation: newOrient !== null ? newOrient : getHead().orientation,
      };
      // Find new head coordinates //
      const newLocation = adjustCoordinates(tempHead).newLocation;
      if (newLocation === false) {
        return dispatch(setCollided());
      }
      const newHead = tempBoard[newLocation];
      const oldHead = getHead();

      if (newHead.content !== '') {
        if (newHead.content !== '~') eating = true;
        dispatch(eatLetter(newHead.content));
      }

      if (!newHead.isPlayer) {
        // Set the old head to a regular player tile //
        tempBoard[oldHead.index] = { ...tempHead, head: false };

        // Add new head //
        tempBoard[newHead.index] = {
          ...newHead,
          content: '',
          head: true,
          isPlayer: true,
          orientation: newOrient !== null ? newOrient : oldHead.orientation,
        };
      } else {
        return dispatch(setCollided());
      }

      // If not eating tail moves //
      if (!eating) {
        // Find the tail //
        const oldTail = { ...tempBoard.find(tile => tile.tail) };
        // Find new tail location //
        const newTail = tempBoard[adjustCoordinates(oldTail).newLocation];

        // Remove the old tail //
        tempBoard[oldTail.index] = {
          ...oldTail,
          isPlayer: false,
          tail: false,
          orientation: 1,
        };

        // Copy properties from old tail to new tail, make sure index remains the same //
        tempBoard[newTail.index] = {
          ...newTail,
          head: false,
          tail: true,
        };
      }

      // Set Orientation if snake is longer than 2 //
      if (snake.length > 2) {
        setOrientation();
      }
      // End Movement //
      dispatch(updateBoard({ board: tempBoard }));
      dispatch(toggleMoveSnake());
    }
  }

  // Gets a copy of the current head tile //
  function getHead() {
    return { ...tempBoard.find(tile => tile.head) };
  }

  return <div className={getClassName()}></div>;
}

export default Worm;
