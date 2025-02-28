// CartPage.js
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { clearCart } from '../store/slices/cartSlice';
import { placeOrder, setOrderError } from '../store/slices/orderSlice';
import { updateBalance } from '../store/slices/userSlice';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (!isAuthenticated || !currentUser) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      dispatch(setOrderError('Your cart is empty'));
      return;
    }

    if (currentUser.balance < total) {
      dispatch(setOrderError('Insufficient balance'));
      return;
    }

    // Place the order
    dispatch(placeOrder({
      userId: currentUser.id,
      items,
      totalAmount: total,
    }));

    // Update user balance
    const newBalance = currentUser.balance - total;
    dispatch(updateBalance(newBalance));

    // Clear the cart
    dispatch(clearCart());

    // Navigate to order confirmation
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-orange-600"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Continue Shopping</span>
        </button>
      </div>
      
      <div className="flex items-center mb-8">
        <ShoppingCart size={28} className="text-orange-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven&apost added any items to your cart yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Cart Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</h2>
              <button
                onClick={handleClearCart}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} className="mr-1" />
                <span>Clear Cart</span>
              </button>
            </div>
            
            <div className="divide-y">
              {items.map((item) => (
                <CartItem key={item.menuItemId} item={item} />
              ))}
            </div>
            
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {isAuthenticated && currentUser && (
                <div className="mt-2 text-right">
                  <span className="text-gray-600">
                    Your balance: ${currentUser.balance.toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;