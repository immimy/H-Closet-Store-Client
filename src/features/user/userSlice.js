import { createSlice } from '@reduxjs/toolkit';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
  user: getLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, email, role } = action.payload;
      const newUser = { username, email, role };
      state.user = newUser;
      localStorage.setItem('user', JSON.stringify(newUser));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem('user', null);
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
