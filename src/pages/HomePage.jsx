// HomePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '../components/MenuItem';
import CategoryFilter from '../components/CategoryFilter';
import { Search } from 'lucide-react';

function HomePage() {
  const { filteredItems } = useSelector((state) => state.menu);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const displayedItems = searchTerm
    ? filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredItems;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h1>
        <p className="text-gray-600">
          Browse our delicious menu and place your order for delivery or pickup.
        </p>
      </div>
      
      <div className="mb-6 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      
      <CategoryFilter />
      
      {displayedItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;