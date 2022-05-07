import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  running: false,
  collided: false,
  resetGame: false,
  moveSnake: false,
  headMoved: false,
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
    resetCollided: state => {
      state.collided = false;
    },
    toggleMoveSnake: state => {
      state.moveSnake = !state.moveSnake;
    },
    toggleHeadMoved: state => {
      state.headMoved = !state.headMoved;
    },
  },
});

export default gameContainerSlice.reducer;
export const {
  startGame,
  setCollided,
  resetCollided,
  toggleRunning,
  toggleResetGame,
  toggleMoveSnake,
  toggleHeadMoved,
  changeDirection,
} = gameContainerSlice.actions;
