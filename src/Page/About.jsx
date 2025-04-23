import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre Nosotros</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Nuestra Misión</h3>
          <p className="text-gray-600">
            En QHN, nos dedicamos a conectar a profesionales cualificados con clientes que necesitan servicios de calidad.
            Nuestra plataforma facilita la búsqueda y contratación de servicios profesionales de manera rápida y segura.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Por qué elegirnos?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Profesionales verificados y con experiencia</li>
            <li>Sistema de valoraciones y reseñas transparente</li>
            <li>Proceso de contratación seguro y sencillo</li>
            <li>Atención al cliente 24/7</li>
            <li>Garantía de satisfacción en todos nuestros servicios</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Nuestros Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Calidad</h4>
              <p className="text-gray-600">Nos comprometemos a ofrecer servicios de la más alta calidad.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Transparencia</h4>
              <p className="text-gray-600">Mantenemos una comunicación clara y honesta con nuestros usuarios.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Innovación</h4>
              <p className="text-gray-600">Buscamos constantemente mejorar nuestra plataforma y servicios.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Compromiso</h4>
              <p className="text-gray-600">Trabajamos para satisfacer las necesidades de nuestros usuarios.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 