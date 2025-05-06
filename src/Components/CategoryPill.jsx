import React from 'react';

const CategoryPill = ({ category }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1E3A8A] text-white">
      {category}
    </span>
  );
};

export default CategoryPill; 