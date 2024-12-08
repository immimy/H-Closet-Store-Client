import { configureStore } from '@reduxjs/toolkit';
// reducers
import themeReducer from './features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
