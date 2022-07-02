import { createSlice } from '@reduxjs/toolkit';

import { boardSize } from '../../js/boardDimensions';

const initialState = [];
const emptyTile = {
  content: '',
  isPlayer: false,
  head: false,
  tail: false,
  orientation: 1,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initialize: state => {
      const wormStart = Math.floor(boardSize / 2);
      // Fill state array with tile objects //
      for (let i = 0; i < boardSize; i++) {
        if (i === wormStart) {
          state.push({ ...emptyTile, isPlayer: true, tail: true, index: i });
        } else if (i === wormStart + 1) {
          state.push({ ...emptyTile, isPlayer: true, head: true, index: i });
        } else {
          state.push({ ...emptyTile, index: i });
        }
      }
    },
    destruct: () => initialState,
    updateTile: state => {
      //choose a random tile
      let tileChosen = Math.floor(Math.random() * boardSize);
      //when the tile picked is occupied by player, or is non-empty, pick again

      let tries = 0;
      while (state[tileChosen].content != '' || state[tileChosen].isPlayer) {
        tileChosen = Math.floor(Math.random() * boardSize);
        //arbitrary break point to stop inifinite loop
        if (tries > 50) break;
        tries++;
      }

      //when tile is selected, fill it, if no tile is selected within 50 tries
      //do nothing
      if (tries < 50) {
        let chance = Math.random();

        //10% chance of generating word evaluation tile (~)
        if (chance < 0.1) {
          state[tileChosen].content = String.fromCharCode(126);
          return;
        }

        //generate random capital letter
        let asciiVal = Math.random() * (90 - 65) + 65;
        state[tileChosen].content = String.fromCharCode(asciiVal);
      }
    },
    updateBoard: (state, action) => action.payload.board,
  },
});

export default boardSlice.reducer;
export const {
  initialize,
  destruct,
  updateTile,
  updateBoard,
  moveHead,
  moveTail,
  setOrient,
} = boardSlice.actions;
