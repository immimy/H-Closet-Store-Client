import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { customFetch } from '../../utilities';

const initialState = {
  cartItems: [],
  cartItemsData: [],
  amount: 0,
  cartTotal: 0,
  shippingFee: 50,
  orderTotal: 0,
  order: null,
};

const getCartState = () => {
  return JSON.parse(localStorage.getItem('cart')) || initialState;
};

// Trigger when user navigate away from checkout page (useBlocker)
export const deleteOrder = createAsyncThunk(
  'cart/deleteOrder',
  async (data, thunkAPI) => {
    try {
      const { orderID, clientSecret, orderStatus } = data;
      const resp = await customFetch.patch(`/orders/${orderID}`, {
        clientSecret,
        status: orderStatus,
      });
      return resp.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        'Something went wrong, please try cancel order again later.';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartState(),
  reducers: {
    addItem: (state, action) => {
      const { cartItem, cartItemData } = action.payload;

      const product = state.cartItems.find(
        (item) => item.cartID === cartItem.cartID
      );

      // If product is already in cart
      if (product) {
        product.amount += cartItem.amount;
        cartSlice.caseReducers.checkItemCondition(state, {
          payload: { cartID: product.cartID },
        });
      } else {
        // If product is not in cart
        state.cartItems.push(cartItem);
        state.cartItemsData.push(cartItemData);
      }

      // Calculate cart
      cartSlice.caseReducers.calculateCart(state);

      // Set to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateItem: (state, action) => {
      const { cartID, newSelectedOption, newNumberInStock, newAmount } =
        action.payload;
      const product = state.cartItems.find((item) => item.cartID === cartID);
      const productData = state.cartItemsData.find(
        (item) => item.cartID === cartID
      );

      // Change product option
      if (newSelectedOption) {
        const newCartID = `${product.productID}_${newSelectedOption}`;
        const newProduct = state.cartItems.find(
          (item) => item.cartID === newCartID
        );
        // If new product is already in cart
        if (newProduct) {
          newProduct.amount += product.amount;
          cartSlice.caseReducers.checkItemCondition(state, {
            payload: { cartID: newCartID },
          });
          cartSlice.caseReducers.removeItem(state, { payload: { cartID } });
        } else {
          // If new product is not in cart
          const changedField = newSelectedOption.includes('#')
            ? 'color'
            : 'size';
          product[changedField] = newSelectedOption;
          product.cartID = newCartID;
          product.numberInStock = newNumberInStock;
          productData.cartID = newCartID;
          if (product.amount > product.numberInStock) {
            product.amount = product.numberInStock;
            toast.error('Item amount in cart reaches up to a number in stock.');
            cartSlice.caseReducers.calculateCart(state);
          }
        }
      }

      // Change amount of item
      if (newAmount) {
        product.amount = newAmount;
        cartSlice.caseReducers.calculateCart(state);
      }

      // Set to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      state.cartItemsData = state.cartItemsData.filter(
        (item) => item.cartID !== cartID
      );
      cartSlice.caseReducers.calculateCart(state);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    calculateCart: (state) => {
      const cartItems = state.cartItems;

      const { amount, total } = cartItems.reduce(
        (acc, item) => {
          const { amount, price } = item;
          acc.amount += amount;
          acc.total += amount * price;
          return acc;
        },
        { amount: 0, total: 0 }
      );

      state.amount = amount;
      state.cartTotal = total;
      state.shippingFee = state.cartTotal > 500 ? 0 : 50;
      state.orderTotal = state.cartTotal + state.shippingFee;
    },
    checkItemCondition: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((item) => item.cartID === cartID);

      // Single cart item must not exceed number in stock.
      if (product.amount > product.numberInStock) {
        product.amount = product.numberInStock;
        toast.error('Item amount in cart reaches up to a number in stock.');
      }
      // Single cart item is limited to 10 items per order.
      if (product.amount > 10) {
        product.amount = 10;
        toast.error('Each item is limited to 10 quantities per order.');
      }
    },
    placeOrder: (state, action) => {
      const { order } = action.payload;
      state.order = order;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      localStorage.removeItem('cart');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.order = null;
        localStorage.setItem('cart', JSON.stringify(state));
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.order = null;
        localStorage.setItem('cart', JSON.stringify(state));
      });
  },
});

export const { addItem, updateItem, removeItem, placeOrder, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
