import React from 'react';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Carpintería', icon: '🔨' },
    { id: 2, name: 'Fontanería', icon: '🔧' },
    { id: 3, name: 'Electricidad', icon: '⚡' },
    { id: 4, name: 'Pintura', icon: '🎨' },
    { id: 5, name: 'Limpieza', icon: '🧹' },
    { id: 6, name: 'Jardineria', icon: '🌱' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorías de Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 