import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  running: false,
  collided: false,
  eating: false,
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
    setCollided: state => {
      state.collided = true;
      state.running = false;
    },
    toggleEating: state => {
      state.eating = !state.eating;
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
  toggleEating,
  toggleMoveSnake,
  toggleHeadMoved,
} = gameContainerSlice.actions;
