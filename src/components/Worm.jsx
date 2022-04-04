import {boardWidth} from '../js/boardDimensions'
function Worm({ wormActual, eating, orientation, location, collided }) {
  function initialize() {}
  function destruct() {}
  function update() {}
  function eat() {}
  function adjustCoordinates() {
    //if going down add board width, opposite for going up
    //0 is up, 1 is down, 2 is left, 3 is right

    //0: up, 1: right, 2: down, 3: left
    switch (orientation) {
      case 0:
        if (location >= boardWidth - 1) location -= boardWidth;
        else {
          collided = true;
          //trigger game over
          return;
        }
        break;
      case 1:
        if (location % boardWidth != boardWidth - 1) location++;
        else {
          collided = true;
          //trigger game over
          return;
        }
        break;
      case 2:
        if (location < boardSize - boardWidth) location += boardWidth;
        else {
          collided = true;
          //trigger game over
          return;
        }
        break;
      case 3:
        if (location % boardWidth != 0) location--;
        else {
          collided = true;
          //trigger game over
          return;
        }
        break;
    }
  }
  function setOrientation() {}
  function changeDirection() {}
  function move() {}

  return <></>;
}

export default Worm;
