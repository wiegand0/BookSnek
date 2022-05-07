import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCollided,
  toggleMoveSnake,
} from './GameContainer/gameContainerSlice';
import { moveHead, moveTail, setOrient, updateBoard } from './Board/boardSlice';
import { boardWidth, boardSize } from '../js/boardDimensions';

function Worm({ head, tail, orientation, location }) {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board);
  const tempBoard = [...board];
  const { moveSnake, collided, running } = useSelector(
    state => state.gameContainer,
  );

  // local variables used to update board //
  let updatedOrient = orientation;

  // Add movement event listener //
  useEffect(() => {
    window.addEventListener('keydown', changeDirection);
    return () => window.removeEventListener('keydown', changeDirection);
  });

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
      className += ` o${orientation}`;
    }
    className += ` rotate${orientation % 4}`;
    return className;
  }

  function eat() {}

  function adjustCoordinates(tile, forwards = true) {
    let tempLocation = tile.index;
    let tempOrientation = tile.orientation;
    // Reverse orientation to find tiles behind //
    if (!forwards) {
      switch (tempOrientation) {
        case 0:
          tempOrientation = 1;
          break;
        case 1:
          tempOrientation = 0;
          break;
        case 2:
          tempOrientation = 3;
          break;
        case 3:
          tempOrientation = 2;
          break;
      }
    }

    //if going down add board width, opposite for going up
    //0 is up, 1 is down, 2 is left, 3 is right

    //0: up, 1: right, 2: down, 3: left
    switch (tempOrientation) {
      case 0:
        if (location >= boardWidth - 1) tempLocation -= boardWidth;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
      case 1:
        if (location % boardWidth != boardWidth - 1) tempLocation += 1;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
      case 2:
        if (location < boardSize - boardWidth) tempLocation += boardWidth;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
      case 3:
        if (location % boardWidth != 0) tempLocation -= 1;
        else {
          //trigger game over
          return { newLocation: false };
        }
        break;
    }
    return { newLocation: tempLocation, newOrientation: tempOrientation };
  }
  function setOrientation() {
    if (head) {
      const newBody = {
        ...tempBoard[adjustCoordinates(getHead(), false).newLocation],
      };
      const previousBody = {
        ...tempBoard[adjustCoordinates(newBody, false).newLocation],
      };

      const bodyOrient = [getHead().orientation, previousBody.orientation % 4];

      console.log(getHead(), newBody, previousBody, bodyOrient);

      //8 cases of curved body
      //matching orientations documented in tile.js (line 8-11)
      switch (bodyOrient[0]) {
        case 0:
          //case[0,1], new body is countercw up
          if (bodyOrient[1] == 1)
            tempBoard[newBody.index] = { ...newBody, orientation: 8 };
          // dispatch(setOrient({ tile: newBody, newOrient: 8 }));
          //case[0,3], new body is clockwise up
          if (bodyOrient[1] == 3)
            tempBoard[newBody.index] = { ...newBody, orientation: 4 };
          // dispatch(setOrient({ tile: newBody, newOrient: 4 }));
          break;
        case 1:
          //case[1,2], new body is countercw right
          if (bodyOrient[1] == 2)
            tempBoard[newBody.index] = { ...newBody, orientation: 9 };
          // dispatch(setOrient({ tile: newBody, newOrient: 9 }));
          //case[1,0], new body is clockwise right
          if (bodyOrient[1] == 0)
            tempBoard[newBody.index] = { ...newBody, orientation: 5 };
          // dispatch(setOrient({ tile: newBody, newOrient: 5 }));
          break;
        case 2:
          //case[2,3], new body is countercw down
          if (bodyOrient[1] == 3)
            tempBoard[newBody.index] = { ...newBody, orientation: 1 };
          // dispatch(setOrient({ tile: newBody, newOrient: 1 }));
          //case[2,1], new body is clcowkise down
          if (bodyOrient[1] == 1)
            tempBoard[newBody.index] = { ...newBody, orientation: 6 };
          // dispatch(setOrient({ tile: newBody, newOrient: 6 }));
          break;
        case 3:
          //case[3,0], new body is countercw left
          if (bodyOrient[1] == 0)
            tempBoard[newBody.index] = { ...newBody, orientation: 1 };
          // dispatch(setOrient({ tile: newBody, newOrient: 1 }));
          //case[3,2], new body is clockwise left
          if (bodyOrient[1] == 2)
            tempBoard[newBody.index] = { ...newBody, orientation: 7 };
          // dispatch(setOrient({ tile: newBody, newOrient: 7 }));
          break;
      }
      console.log(tempBoard[newBody.index]);
    }
  }
  function changeDirection(e) {
    const hasChangedDirection = updatedOrient !== board[location].orientation;
    console.log(
      hasChangedDirection,
      updatedOrient,
      board[location].orientation,
    );
    if (head && running && !hasChangedDirection) {
      //for prevention of doubling back on self
      let neck = adjustCoordinates(getHead(), false).newLocation;

      //0: up, 1: right, 2: down, 3: left
      switch (e.key) {
        case 'ArrowUp':
          if (neck !== getHead().index - boardWidth) {
            updatedOrient = 0;
            console.log(updatedOrient);
            dispatch(setOrient({ tile: getHead(), newOrient: 0 }));
          }
          break;
        case 'ArrowDown':
          if (neck !== getHead().index + boardWidth) {
            updatedOrient = 2;
            console.log(updatedOrient);
            dispatch(setOrient({ tile: getHead(), newOrient: 2 }));
          }
          break;
        case 'ArrowLeft':
          if (neck !== --getHead().index) {
            updatedOrient = 3;
            console.log(updatedOrient);
            dispatch(setOrient({ tile: getHead(), newOrient: 3 }));
          }
          break;
        case 'ArrowRight':
          console.log(neck, ++head);
          if (neck !== ++getHead().index) {
            updatedOrient = 1;
            console.log(updatedOrient);
            dispatch(setOrient({ tile: getHead(), newOrient: 1 }));
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
      // Find new head coordinates //
      const newLocation = adjustCoordinates(getHead()).newLocation;
      if (newLocation === false) {
        return dispatch(setCollided());
      }
      const newHead = tempBoard[newLocation];
      const oldHead = getHead();

      console.log(updatedOrient);

      if (newHead.content !== '') {
        eating = true;
        eat(newHead.content);
      }

      if (!newHead.isPlayer) {
        // Set the old head to a regular player tile //
        tempBoard[oldHead.index] = { ...oldHead, head: false };

        // Add new head //
        tempBoard[newHead.index] = {
          ...newHead,
          content: '',
          head: true,
          isPlayer: true,
          orientation: updatedOrient,
        };
        if (snake.length > 2) {
          setOrientation();
        }
      } else {
        dispatch(setCollided());
      }

      // If snake is eating tail does not move, movement is complete //
      if (eating) {
        dispatch(updateBoard({ board: tempBoard }));
        dispatch(toggleMoveSnake());
      } else {
        // Find the tail //
        const oldTail = tempBoard.find(tile => tile.tail);
        // Find new tail location //
        const newTail = tempBoard[adjustCoordinates(oldTail).newLocation];
        // Remove the old tail //
        tempBoard[oldTail.index] = { ...oldTail, isPlayer: false, tail: false };

        // Copy properties from old tail to new tail, make sure index remains the same //
        tempBoard[newTail.index] = {
          ...oldTail,
          index: newTail.index,
          orientation: newTail.orientation,
        };
        // End Movement //
        dispatch(updateBoard({ board: tempBoard }));
        dispatch(toggleMoveSnake());
      }
    }
  }

  // Gets a copy of the current head tile //
  function getHead() {
    return { ...tempBoard.find(tile => tile.head) };
  }

  return <div className={getClassName()}></div>;
}

export default Worm;
