import { configureStore } from '@reduxjs/toolkit';

import boardReducer from './Board/boardSlice';
import gameContainerReducer from './GameContainer/gameContainerSlice';

export const store = configureStore({
  reducer: {
    gameContainer: gameContainerReducer,
    board: boardReducer,
  },
});
