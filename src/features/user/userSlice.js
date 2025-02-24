import { createSlice } from '@reduxjs/toolkit';
import { customFetch } from '../../utilities/';

// Delete user state when refresh token cookie is expired.
const clearUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    try {
      await customFetch.get('/users/showMe');
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
};
await clearUser();

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = { user: getLocalStorage() };

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
      localStorage.removeItem('user');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
