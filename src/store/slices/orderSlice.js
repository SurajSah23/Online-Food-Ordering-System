import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { userId, items, totalAmount } = action.payload;
      
      // Generate a random delivery time between 30-60 minutes
      const deliveryMinutes = Math.floor(Math.random() * 30) + 30;
      const now = new Date();
      const deliveryTime = new Date(now.getTime() + deliveryMinutes * 60000);
      
      const newOrder = {
        id: (state.orders.length + 1).toString(),
        userId,
        items,
        totalAmount,
        status: 'pending',
        orderDate: now.toISOString(),
        estimatedDeliveryTime: deliveryTime.toISOString(),
      };
      
      state.orders.push(newOrder);
      state.currentOrder = newOrder;
      state.error = null;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        if (state.currentOrder && state.currentOrder.id === orderId) {
          state.currentOrder.status = status;
        }
      }
    },
    setCurrentOrder: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload);
      state.currentOrder = order || null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  placeOrder, 
  updateOrderStatus, 
  setCurrentOrder, 
  clearCurrentOrder,
  setOrderError,
  clearOrderError
} = orderSlice.actions;
export default orderSlice.reducer;