import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Plus, Minus } from 'lucide-react';
import PropTypes from 'prop-types';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ menuItem: item, quantity }));
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="text-orange-600 font-bold">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm h-12 overflow-hidden">{item.description}</p>
        
        {!item.available ? (
          <div className="mt-4 bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm">
            Currently unavailable
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={decrementQuantity}
                className="bg-gray-200 p-1 rounded-md"
              >
                <Minus size={16} />
              </button>
              <span className="mx-2">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="bg-gray-200 p-1 rounded-md"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired
  }).isRequired
};

export default MenuItem;