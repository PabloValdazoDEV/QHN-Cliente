import React from 'react';
import { useParams } from 'react-router';

const PageCity = () => {

  const { city } = useParams()

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page {city}</h2>
      <p className="text-gray-600 mb-4">
      Page {city}.
      </p>
    </div>
  );
};

export default PageCity; 