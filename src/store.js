import { configureStore } from '@reduxjs/toolkit';
// reducers
import themeReducer from './features/theme/themeSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});
