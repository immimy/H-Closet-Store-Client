import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartItemsData: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { cartItem, cartItemData } = action.payload;
      const { amount, price } = cartItem;
      // add item to cart
      state.cartItems.push(cartItem);
      state.cartItemsData.push(cartItemData);
      // calculate cart
      const payload = { actionCreator: 'addItem', amount, price };
      cartSlice.caseReducers.calculateCart(state, { payload });
    },
    updateItem: (state, action) => {
      const { cartItemIndex, newSelectedSize, newSelectedColor, newAmount } =
        action.payload;
      // update cart item
      if (newSelectedSize) {
        state.cartItems[cartItemIndex].size = newSelectedSize;
      }
      if (newSelectedColor) {
        state.cartItems[cartItemIndex].color = newSelectedColor;
      }
      if (newAmount) {
        const oldAmount = state.cartItems[cartItemIndex].amount;
        state.cartItems[cartItemIndex].amount = newAmount;
        const updatedAmount = state.cartItems[cartItemIndex].amount;
        // calculate cart when amount change
        const payload = {
          actionCreator: 'updateItem',
          oldAmount,
          updatedAmount,
          price: state.cartItems[cartItemIndex].price,
        };
        cartSlice.caseReducers.calculateCart(state, { payload });
      }
    },
    removeItem: (state, action) => {
      const { cartItemIndex } = action.payload;
      const { amount, price } = state.cartItems[cartItemIndex];
      // remove cart item
      state.cartItems.splice(cartItemIndex, 1);
      state.cartItemsData.splice(cartItemIndex, 1);
      // calculate cart
      const payload = { actionCreator: 'removeItem', amount, price };
      cartSlice.caseReducers.calculateCart(state, { payload });
    },
    calculateCart: (state, action) => {
      const { actionCreator } = action.payload;

      if (actionCreator === 'addItem') {
        const { amount, price } = action.payload;
        state.amount += amount;
        state.total += amount * price;
      }
      if (actionCreator === 'removeItem') {
        const { amount, price } = action.payload;
        state.amount -= amount;
        state.total -= amount * price;
      }
      if (actionCreator === 'updateItem') {
        const { oldAmount, updatedAmount, price } = action.payload;
        state.amount += updatedAmount - oldAmount;
        state.total += (updatedAmount - oldAmount) * price;
      }
    },
  },
});

export const { addItem, updateItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
