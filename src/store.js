import { configureStore } from '@reduxjs/toolkit';
// reducers
import themeReducer from './features/theme/themeSlice';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import scrollReducer from './features/scroll/scrollSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    cart: cartReducer,
    scroll: scrollReducer,
  },
});
