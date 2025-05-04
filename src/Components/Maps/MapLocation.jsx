import React from 'react';

const MapLocation = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg group">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
        <iframe
          loading="lazy"
          src="https://maps.google.com/maps?q=carlos%20daban%2026&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"
          title="carlos daban 26"
          aria-label="carlos daban 26"
          className="w-full h-[700px] border-0 transform group-hover:scale-[1.02] transition-transform duration-300"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MapLocation; 