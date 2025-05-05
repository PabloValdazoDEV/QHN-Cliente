import React from 'react';

const CategoryPill = ({ category }) => {
  // Mapeo de categorías a colores pastel
  const categoryColors = {
    'Ocio': 'bg-pink-100 text-pink-800',
    'Viajes': 'bg-blue-100 text-blue-800',
    'Shopping': 'bg-purple-100 text-purple-800',
    'Educación': 'bg-green-100 text-green-800',
    'Salud': 'bg-red-100 text-red-800',
    'Estilo de vida': 'bg-yellow-100 text-yellow-800',
  };

  // Obtener el color de la categoría o usar un color por defecto
  const colorClass = categoryColors[category] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      {category}
    </span>
  );
};

export default CategoryPill; 