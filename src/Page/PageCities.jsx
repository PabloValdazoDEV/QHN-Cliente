import React from 'react';
import { Link } from 'react-router-dom';

const PageCities = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestras Ciudades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/ciudades/madrid"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Madrid</h2>
          <p className="text-gray-600">Descubre los servicios profesionales en Madrid</p>
        </Link>
        <Link
          to="/ciudades/malaga"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Málaga</h2>
          <p className="text-gray-600">Descubre los servicios profesionales en Málaga</p>
        </Link>
        <Link
          to="/ciudades/valencia"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Valencia</h2>
          <p className="text-gray-600">Descubre los servicios profesionales en Valencia</p>
        </Link>
        <Link
          to="/ciudades/barcelona"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Barcelona</h2>
          <p className="text-gray-600">Descubre los servicios profesionales en Barcelona</p>
        </Link>
        <Link
          to="/ciudades/sevilla"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Sevilla</h2>
          <p className="text-gray-600">Descubre los servicios profesionales en Sevilla</p>
        </Link>
        <Link
          to="/ciudades/zaragoza"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Zaragoza</h2>
          <p className="text-gray-600">Descubre los servicios profesionales en Zaragoza</p>
        </Link>
      </div>
    </div>
  );
};

export default PageCities; 