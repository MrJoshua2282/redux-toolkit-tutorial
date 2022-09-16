import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { openModal } from "../modal/modalSlice";

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async(name, thunkAPI) => {
  try {
    console.log('name', name)
    console.log('thunkAPI', thunkAPI)
    console.log('thunkAPI.getSate()', thunkAPI.getState()) // cart and modal state
    // thunkAPI.dispatch(openModal()) // to open modal even though modal isn't apart of this slice/state


    const res = await axios(url);
    return res.data; 
  } catch (error) {
    console.log('Error: ' + error)
    return thunkAPI.rejectWithValue('Something went wrong')
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id)
    },
    increase: (state, action) => {
      const id = action.payload.id;
      const cartItem = state.cartItems.find(item => item.id === id);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const id = action.payload.id;
      const cartItem = state.cartItems.find(item => item.id === id);
      if (cartItem.amount > 1){
        cartItem.amount -= 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      if (state.cartItems.length) {
        state.cartItems.forEach(item => {
          amount += item.amount;
          total += item.amount * item.price;
        });
  
        state.amount = amount;
        state.total = total;
      }
    }
  },
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log('action', action)
      state.isLoading = false;
    }
  }
});

export const { clearCart,  removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;