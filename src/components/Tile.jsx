function Tile({ isPlayer, content, head, tail, orientation, index }) {
  function getClassName() {
    let className = 'tile';
    if (isPlayer) {
      if (head) {
        className += 'Head ';
      } else if (tail) {
        className += 'Tail ';
      } else {
        className += ` o${orientation}`;
      }
      className += ` rotate${orientation % 4}`;
    }
    return className;
  }

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

  return <div className={getClassName()}>{content}</div>;
}

export default Tile;
