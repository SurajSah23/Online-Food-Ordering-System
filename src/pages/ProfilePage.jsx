// ProfilePage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import { User, Clock, CreditCard } from 'lucide-react';

function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState('profile');

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!currentUser) {
    return null;
  }

  const userOrders = orders.filter(order => order.userId === currentUser.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'profile'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="flex items-center justify-center">
              <User size={20} className="mr-2" />
              <span>Profile</span>
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'orders'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <div className="flex items-center justify-center">
              <Clock size={20} className="mr-2" />
              <span>Order History</span>
            </div>
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' ? (
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <User size={32} className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{currentUser.username}</h2>
                  <p className="text-gray-600">Account #{currentUser.id}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <CreditCard size={24} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold">${currentUser.balance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
                      {currentUser.username}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md">
                      ••••••••
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Order History</h2>
              
              {userOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">You haven&apost placed any orders yet.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {userOrders
                    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
                    .map(order => (
                      <OrderSummary key={order.id} order={order} />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;