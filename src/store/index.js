import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});