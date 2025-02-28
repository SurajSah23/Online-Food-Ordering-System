import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { menuItem, quantity } = action.payload;
      const existingItem = state.items.find(item => item.menuItemId === menuItem.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity,
        });
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.menuItemId !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { menuItemId, quantity } = action.payload;
      const item = state.items.find(item => item.menuItemId === menuItemId);
      
      if (item) {
        item.quantity = quantity;
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;