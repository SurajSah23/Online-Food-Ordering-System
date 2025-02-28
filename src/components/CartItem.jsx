// CartItem.js
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import { Plus, Minus, Trash2 } from 'lucide-react';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ menuItemId: item.menuItemId, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ menuItemId: item.menuItemId, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.menuItemId));
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={handleDecrement}
          className="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="mx-3">{item.quantity}</span>
        <button 
          onClick={handleIncrement}
          className="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="ml-6 flex items-center">
        <span className="font-medium mr-4">${(item.price * item.quantity).toFixed(2)}</span>
        <button 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

// PropTypes definition
CartItem.propTypes = {
  item: PropTypes.shape({
    menuItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;