import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory } from '../store/slices/menuSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector((state) => state.menu);

  const handleCategoryChange = (category) => {
    dispatch(filterByCategory(category));
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === null
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;