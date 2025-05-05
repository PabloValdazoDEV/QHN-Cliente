import React from 'react';

const MapLocation = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg group">
      <div className="relative">
        <div
          className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"
          style={{ pointerEvents: 'none' }}
        ></div>

        <iframe
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.031739559939!2d-3.7845615846056346!3d40.39506297936837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41703c61c76461%3A0xc8a5e90b66080d3a!2sC.%20de%20Carlos%20Dab%C3%A1n%2C%2026%2C%2028011%20Madrid!5e0!3m2!1ses!2ses!4v1714910026387!5m2!1ses!2ses"
          title="Mapa de Carlos Dabán 26, Madrid"
          aria-label="Mapa de Carlos Dabán 26, Madrid"
          className="w-full h-[700px] border-0 transform group-hover:scale-[1.02] transition-transform duration-300"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default MapLocation;