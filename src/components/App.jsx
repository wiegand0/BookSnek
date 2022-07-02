import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleRunning,
  toggleResetGame,
} from './GameContainer/gameContainerSlice';
import GameContainer from './GameContainer/GameContainer';

function App() {
  const dispatch = useDispatch();
  const { running, collided } = useSelector(state => state.gameContainer);

  useEffect(() => {
    function spaceBar(e) {
      if (e.key === ' ' && !collided) {
        dispatch(toggleRunning());
      }
    }
    window.addEventListener('keydown', spaceBar);
    return () => window.removeEventListener('keydown', spaceBar);
  }, [collided]);

  return (
    <div>
      <img
        id="pause"
        src="resources/pause.svg"
        onClick={collided ? null : () => dispatch(toggleRunning())}
      ></img>
      <img
        id="reset"
        src="resources/reset.svg"
        onClick={() => dispatch(toggleResetGame())}
      ></img>

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
        <div className="tail"></div>
        <div className="head"></div>
      </div>

      <GameContainer></GameContainer>

      <p hidden id="countdown"></p>
      <p id="paused" hidden={running}>
        {collided ? 'Game Over...' : 'PAUSED'}
      </p>
      <div id="belly"></div>
    </div>
  );
}

export default App;
