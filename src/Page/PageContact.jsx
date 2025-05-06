import React from 'react';
import ContactForm from '../Components/Forms/ContactForm';
import MapLocation from '../Components/Maps/MapLocation';

const PageContact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacta con Nosotros</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Primera fila: Información de contacto y formulario */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Información de contacto (30%) */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[color:var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Dirección</h4>
                    <p className="mt-1 text-gray-600">C/Carlos Dabán, 26</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[color:var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Teléfono</h4>
                    <p className="mt-1 text-gray-600">624 02 91 89</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[color:var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Email</h4>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600">General: info@qhn.es</p>
                      <p className="text-gray-600">Marketing y comercial: publicidad@qhn.es</p>
                      <p className="text-gray-600">Redacción: redaccion@qhn.es</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto (70%) */}
            <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl p-8">
              <ContactForm />
            </div>
          </div>

          {/* Segunda fila: Mapa y Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Mapa (70%) */}
            <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl p-8">
              <MapLocation />
            </div>

            {/* Newsletter (30%) */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Suscríbete a nuestra newsletter</h3>
                <p className="text-gray-600 mb-6">
                  Mantente informado sobre las últimas noticias y actualizaciones de QHN.
                </p>
              </div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="newsletterEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="newsletterEmail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent transition-colors duration-200"
                    placeholder="Escribe aquí tu email"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    className="h-4 w-4 text-[color:var(--color-primary)] focus:ring-[color:var(--color-primary)] border-gray-300 rounded"
                  />
                  <label htmlFor="privacyPolicy" className="ml-2 block text-sm text-gray-700">
                    Acepto las políticas de privacidad
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[color:var(--color-primary)] text-white py-3 px-4 rounded-lg hover:bg-[color:var(--color-primary)] transition-colors duration-200"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContact; 