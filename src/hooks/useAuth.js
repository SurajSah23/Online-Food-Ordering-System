import { useSelector, useDispatch } from 'react-redux';
import { login, logout, register, clearError } from '../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, error } = useSelector((state) => state.user);

  const handleLogin = (username, password) => {
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = (username, password) => {
    dispatch(register({ username, password }));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    currentUser,
    isAuthenticated,
    error,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    clearError: handleClearError,
  };
};