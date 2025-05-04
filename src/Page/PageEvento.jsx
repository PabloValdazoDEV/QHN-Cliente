import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PageEvento() {
  const [eventos, setEventos] = useState(null);
  const { id } = useParams();

  const {isLoading, error, data} = useQuery({
    queryKey: [""]
  })

  useEffect(() => {
    // fetch(`http://localhost:3000/api/eventos/${id}`)
    fetch(`http://localhost:3000/api/eventos`)
      .then((res) => res.json())
      .then(setEventos);
  }, [id]);

  if (!eventos) return <p>Cargando evento...</p>;

  console.log(eventos)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {eventos.map((evento) => (
        <div key={evento.id} className="border-b pb-6">
          <h1 className="text-3xl font-bold">{evento.nombre_evento}</h1>
          <p className="text-sm text-gray-500">
            {new Date(evento.fecha).toLocaleDateString()}
          </p>
          {evento.image && (
            <img
              src={evento.image}
              alt="Imagen del evento"
              className="w-full rounded my-4 max-w-48"
            />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: evento.content }}
            className="prose max-w-none"
          />
        </div>
      ))}
    </div>
  );
}
