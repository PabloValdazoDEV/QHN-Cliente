import React from 'react';

const PageAbout = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre Nosotros</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Nuestra Misión</h3>
          <p className="text-gray-600">
          En https://www.quehacerconlosninos.es, creemos que cada etapa de la infancia y adolescencia merece ser vivida con alegría, descubrimiento y bienestar. Nuestra misión es conectar a las familias con experiencias únicas que nutran el cuerpo, la mente y el corazón de los niños y jóvenes, desde su primer día de vida hasta su mayoría de edad. Reunimos en un solo lugar los mejores eventos de ocio, salud, estilo de vida, viajes y shopping para que cada momento sea una oportunidad de crecimiento y conexión.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Por qué elegirnos?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Bienestar Integral: Promovemos actividades que cuidan la salud física, emocional y mental de niños y adolescentes.</li>
            <li>Diversión con Propósito: Creemos que el juego y el ocio son herramientas poderosas de aprendizaje y desarrollo.</li>
            <li>Inclusividad: Celebramos la diversidad de intereses, edades y necesidades, ofreciendo opciones para todas las familias.</li>
            <li>Confianza y Seguridad: Seleccionamos cada evento con responsabilidad, priorizando la calidad, seguridad y valor educativo.</li>
            <li>Innovación y Actualización: Nos mantenemos al día con las mejores propuestas para ofrecer siempre contenido fresco, creativo y útil.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Por que elegirnos</h3>
        
          <p className="text-gray-600">
          Porque entendemos lo que significa encontrar el equilibrio entre entretenimiento, salud y desarrollo para los más pequeños de la casa. En un mundo lleno de opciones, nosotros filtramos lo mejor para que tú solo te enfoques en disfrutar.
          Con https://www.quehacerconlosninos.es, no solo encuentras eventos: encuentras momentos que quedarán en la memoria de tus hijos, experiencias que construyen vínculos, y oportunidades para descubrir el mundo en cada etapa.
          Somos tu aliado en la búsqueda de una infancia feliz, activa y significativa.
          </p>
          
        </section>
      </div>
    </div>
  );
};

export default PageAbout; 