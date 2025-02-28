// OrderConfirmationPage.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import { CheckCircle, ArrowRight } from 'lucide-react';

function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { currentOrder } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || !currentOrder) {
      navigate('/');
    }
  }, [isAuthenticated, currentOrder, navigate]);

  if (!currentOrder) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your order. We&aposve received your order and will begin processing it right away.
        </p>
      </div>
      
      <OrderSummary order={currentOrder} />
      
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/profile')}
          className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors inline-flex items-center"
        >
          <span>View Order History</span>
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;