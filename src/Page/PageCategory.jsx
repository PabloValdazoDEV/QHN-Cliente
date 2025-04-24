import React from 'react';
import { useParams } from 'react-router';

const PageCategory = () => {

  const { category } = useParams()

  return (
    <div className="max-w-4xl mx-auto bg-red p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page {category}</h2>
      <p className="text-gray-600 mb-4">
      Page {category}.
      </p>
    </div>
  );
};

export default PageCategory; 