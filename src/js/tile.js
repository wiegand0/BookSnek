//tile is the basic object that makes up the game board environment

const tile = function () {
  let content = '';
  let wormed = false;
  let head = false;
  let tail = false;
  //for which direction the tiles face. 0 is up, 1 is right, 2 is down, 3 is left,
  //						(clockwise)	  4 is up, 5 is right, 6 is down, 7 is left,
  //						(countercw)   8 is up, 9 is right, 10 is down, 11 is left
  let orient = 0;

  //a way to keep track of where the tile is on the board
  let indexed;

  //generates a letter to put in the tile
  function generate() {
    let chance = Math.random();

    //10% chance of generating word evaluation tile (~)
    if (chance < 0.1) {
      content = String.fromCharCode(126);
      return;
    }

    //generate random capital letter
    let asciiVal = Math.random() * (90 - 65) + 65;
    content = String.fromCharCode(asciiVal);
  }

  function update(wormedGiven, headGiven, tailGiven) {
    wormed = wormedGiven;
    head = headGiven;
    tail = tailGiven;
  }

  function getContent() {
    return content;
  }

  function getLocation() {
    return indexed;
  }

  function getWormed() {
    return wormed;
  }

  function getHead() {
    return head;
  }

  function getTail() {
    return tail;
  }

  function getOrient() {
    return orient;
  }

  function setLocation(newIndex) {
    indexed = newIndex;
  }

  function setContent(newContent) {
    content = newContent;
  }

  function setOrient(newOrient) {
    orient = newOrient;
  }

  return {
    update,
    generate,
    getContent,
    getLocation,
    getWormed,
    getHead,
    getTail,
    getOrient,
    setLocation,
    setContent,
    setOrient,
  };
};

export { tile };