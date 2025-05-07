import React from 'react';

const EventInfoPills = ({ ciudad, precio, modalidad, discapacidad }) => {
  return (
    <div className="flex gap-2">
      {ciudad && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
          {ciudad}
        </span>
      )}
      {precio && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {precio}
        </span>
      )}
      {modalidad && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {modalidad}
        </span>
      )}
      {discapacidad && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {discapacidad}
        </span>
      )}
    </div>
  );
};

export default EventInfoPills; 