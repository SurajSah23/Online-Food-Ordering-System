// OrderSummary.js
import PropTypes from 'prop-types';
import { Clock, Package } from 'lucide-react';

function OrderSummary({ order }) {
  const orderDate = new Date(order.orderDate);
  const deliveryTime = new Date(order.estimatedDeliveryTime);
  
  const getStatusColor = () => {
    switch (order.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Order #{order.id}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      <div className="flex items-center text-gray-600 mb-4">
        <Clock size={18} className="mr-2" />
        <span>Ordered on {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString()}</span>
      </div>
      
      <div className="flex items-center text-gray-600 mb-6">
        <Package size={18} className="mr-2" />
        <span>Estimated delivery: {deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      <div className="border-t border-b py-4 my-4">
        <h3 className="font-medium mb-3">Order Items</h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.quantity} x {item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-lg font-bold mt-4">
        <span>Total</span>
        <span>${order.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}

// PropTypes definition
OrderSummary.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    orderDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    estimatedDeliveryTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderSummary;