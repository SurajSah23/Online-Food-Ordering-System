import { createSlice } from '@reduxjs/toolkit';

// Mock users for demo purposes
const initialUsers = [
  {
    id: '1',
    username: 'user1',
    password: 'password1',
    balance: 100,
  },
  {
    id: '2',
    username: 'user2',
    password: 'password2',
    balance: 150,
  },
];

const initialState = {
  users: initialUsers,
  currentUser: null,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );
      
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      const { username, password } = action.payload;
      const userExists = state.users.some((u) => u.username === username);
      
      if (userExists) {
        state.error = 'Username already exists';
      } else {
        const newUser = {
          id: (state.users.length + 1).toString(),
          username,
          password,
          balance: 100, // Default balance for new users
        };
        
        state.users.push(newUser);
        state.currentUser = newUser;
        state.isAuthenticated = true;
        state.error = null;
      }
    },
    updateBalance: (state, action) => {
      if (state.currentUser) {
        state.currentUser.balance = action.payload;
        // Also update in the users array
        const userIndex = state.users.findIndex(u => u.id === state.currentUser?.id);
        if (userIndex !== -1) {
          state.users[userIndex].balance = action.payload;
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, register, updateBalance, clearError } = userSlice.actions;
export default userSlice.reducer;