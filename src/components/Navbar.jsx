import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">FoodExpress</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:block">
                  <span className="mr-2">Balance: ${currentUser?.balance.toFixed(2)}</span>
                </div>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="flex items-center">
                  <User className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline">{currentUser?.username}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-orange-200"
                >
                  <LogOut className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-orange-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-orange-600 hover:bg-orange-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;