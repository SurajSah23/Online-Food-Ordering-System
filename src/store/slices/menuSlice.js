import { createSlice } from '@reduxjs/toolkit';

// Mock menu items for demo purposes
const initialMenuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Pizza',
    available: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Pizza topped with pepperoni slices',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Pizza',
    available: true,
  },
  {
    id: '3',
    name: 'Cheeseburger',
    description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Burgers',
    available: true,
  },
  {
    id: '4',
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings served with blue cheese dip',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Appetizers',
    available: true,
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Salads',
    available: true,
  },
  {
    id: '6',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie served with vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Desserts',
    available: true,
  },
];

const initialState = {
  items: initialMenuItems,
  categories: Array.from(new Set(initialMenuItems.map(item => item.category))),
  filteredItems: initialMenuItems,
  selectedCategory: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action) => {
      state.items.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
      state.filteredItems = state.selectedCategory 
        ? state.items.filter(item => item.category === state.selectedCategory)
        : state.items;
    },
    updateMenuItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.filteredItems = state.selectedCategory 
        ? state.items.filter(item => item.category === state.selectedCategory)
        : state.items;
    },
    removeMenuItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.categories = Array.from(new Set(state.items.map(item => item.category)));
      state.filteredItems = state.selectedCategory 
        ? state.items.filter(item => item.category === state.selectedCategory)
        : state.items;
    },
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = action.payload 
        ? state.items.filter(item => item.category === action.payload)
        : state.items;
    },
  },
});

export const { addMenuItem, updateMenuItem, removeMenuItem, filterByCategory } = menuSlice.actions;
export default menuSlice.reducer;