import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const bellySlice = createSlice({
  name: 'bellySlice',
  initialState,
  reducers: {
    eatLetter: (state, action) => (state += action.payload),
    setBelly: (state, action) => (state = action.payload),
  },
});

export default bellySlice.reducer;
export const { eatLetter, setBelly } = bellySlice.actions;
