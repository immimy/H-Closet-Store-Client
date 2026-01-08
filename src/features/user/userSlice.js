import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customFetch } from '../../utilities/';

// Retrieve user data directly from the server
export const showCurrentUser = createAsyncThunk(
  'user/showCurrentUser',
  async (_, thunkAPI) => {
    try {
      const { username, email, role } = await customFetch.get('/users/showMe');
      const newUser = { username, email, role };
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

const initialState = { user: null, isLoading: true };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, email, role } = action.payload;
      const newUser = { username, email, role };
      state.user = newUser;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(showCurrentUser.rejected, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
