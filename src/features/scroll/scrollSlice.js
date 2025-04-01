import { createSlice } from '@reduxjs/toolkit';

const initialState = { scrollY: 0 };

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollY: (state, action) => {
      const { scrollYPosition } = action.payload;
      state.scrollY = scrollYPosition;
    },
  },
});

export const { setScrollY } = scrollSlice.actions;
export default scrollSlice.reducer;
