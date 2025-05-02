import React, { useState, useRef } from 'react';
import CategoryPill from '../Components/CategoryPill';

const CATEGORIES = [
  'Ocio', 'Viajes', 'Shopping', 'Educación', 'Salud', 'Estilo de vida'
];

const AGE_RANGES = [
  '0 a 2', '3 a 5', '6 a 9', '10 a 12', '13 a 15', '+ de 16'
];

// Ciudades reales según PageCities.jsx
const CITIES = [
  'Madrid',
  'Málaga',
  'Valencia',
  'Barcelona',
  'Sevilla',
  'Zaragoza'
];

const CompanyRegister = () => {
  const [form, setForm] = useState({
    title: '',
    entity: '',
    info: '',
    category: '',
    ageRange: '',
    city: '',
    images: [null, null, null, null],
    comments: ''
  });
  const [error, setError] = useState('');
  // Refs para los inputs de imagen
  const imageInputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index, file) => {
    const newImages = [...form.images];
    newImages[index] = file;
    setForm({ ...form, images: newImages });
  };

  const handleImageBoxClick = (idx) => {
    imageInputRefs[idx].current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.images.filter(img => img).length > 4) {
      setError('Solo puedes subir hasta 4 imágenes.');
      return;
    }
    alert('Formulario enviado (simulado)');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Noticia de Empresa</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título de la noticia</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Entidad que la gestiona</label>
          <input
            type="text"
            name="entity"
            value={form.entity}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Información</label>
          <textarea
            name="info"
            value={form.info}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {form.category && (
          <div className="flex justify-end">
            <CategoryPill category={form.category} />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad comprendida</label>
          <select
            name="ageRange"
            value={form.ageRange}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecciona un rango de edad</option>
            {AGE_RANGES.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecciona una ciudad</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fotos del evento (máx. 4)</label>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 bg-gray-50 transition-all duration-200 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50"
                onClick={() => handleImageBoxClick(idx)}
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter') handleImageBoxClick(idx); }}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRefs[idx]}
                  onChange={e => handleImageChange(idx, e.target.files[0])}
                  className="hidden"
                />
                {form.images[idx] ? (
                  <span className="text-green-600 text-sm font-medium text-center">Imagen cargada</span>
                ) : (
                  <span className="text-gray-400 text-xs text-center">Haz clic o pasa el ratón para seleccionar una imagen</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-red-600">Por la ley de protección de datos, no deben salir niños en las imágenes.</p>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comentarios para resaltar la noticia</label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar Noticia
        </button>
      </form>
    </div>
  );
};

export default CompanyRegister; 