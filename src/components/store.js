import { configureStore } from '@reduxjs/toolkit';

import boardReducer from './Board/boardSlice';
import gameContainerReducer from './GameContainer/gameContainerSlice';
import bellyReducer from './bellySlice';

export const store = configureStore({
  reducer: {
    belly: bellyReducer,
    gameContainer: gameContainerReducer,
    board: boardReducer,
  },
});
