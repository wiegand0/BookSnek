import { useEffect } from 'react';
import { gameContainer } from '../js/gameContainer';

const App = () => {
  
  useEffect(() => {
    const countDown = document.getElementById('countdown');
    console.log(countDown, "From useEffect")

    gameContainer.initialize(countDown);
    //listener for player input
    document.onkeydown = function (e) {
      gameContainer.arrowKey(e);
    };
  });

  const handlePause = () => {
    const pauseDisplay = document.getElementById('paused');
    gameContainer.pauseMe(pauseDisplay)
  }
  return (
    <div>
      <img
        id="pause"
        src="resources/pause.svg"
        onClick={handlePause}
      ></img>
      <img id="reset" src="resources/reset.svg"></img>

      <div id="gameBorder">
        <div className="vert"></div>
        <div className="vert2"></div>
        <div className="hor"></div>
        <div className="hor2"></div>
        <div className="hor3"></div>
        <div className="topL"></div>
        <div className="topR"></div>
        <div className="botL"></div>
        <div className="botR"></div>
        <div className="botL2"></div>
        <div className="botR2"></div>
        <div className="tale"></div>
        <div className="head"></div>
      </div>

      <div id="gameContainer"></div>

      <p hidden id="countdown"></p>
      <p id="paused" hidden>
        PAUSED
      </p>
      <div id="belly"></div>
    </div>
  );
};

export default App;
