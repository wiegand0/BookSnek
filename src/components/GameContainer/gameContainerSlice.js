import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  running: false,
  collided: false,
  fullBelly: false,
  resetGame: false,
  moveSnake: false,
};

const gameContainerSlice = createSlice({
  name: 'gameContainer',
  initialState,
  reducers: {
    startGame: state => {
      state.running = true;
    },
    toggleRunning: state => {
      state.running = !state.running;
    },
    toggleResetGame: state => {
      state.resetGame = !state.resetGame;
    },
    setCollided: state => {
      state.collided = true;
      state.running = false;
    },
    resetGameState: state => {
      state.collided = false;
      state.fullBelly = false;
    },
    toggleMoveSnake: state => {
      state.moveSnake = !state.moveSnake;
    },
    setFullBelly: state => {
      state.fullBelly = true;
      state.running = false;
    },
  },
});

export default gameContainerSlice.reducer;
export const {
  startGame,
  setCollided,
  resetGameState,
  toggleRunning,
  toggleResetGame,
  toggleMoveSnake,
  setFullBelly,
} = gameContainerSlice.actions;
