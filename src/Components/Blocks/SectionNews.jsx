import CardVertical from '../Components/Cards/CardVertical';

export default function SectionNews() {
  const dummyNews = [
    {
      title: 'Qué hacer en Benidorm con niños',
      description:
        'Benidorm no es solo playa y ocio nocturno. Esta ciudad de la Costa Blanca ha sabido transformarse en un destino familiar con muchas actividades pensadas para niños.',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
    {
      title: 'Planes con niños en Huelva: qué hacer y a dónde ir',
      description:
        'Esta ciudad andaluza ofrece múltiples planes para disfrutar en familia, desde paseos naturales hasta actividades culturales.',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
    {
      title: 'Planes con niños en Almería: actividades y ocio',
      description:
        'Almería tiene una gran variedad de actividades pensadas para los más pequeños, desde playas tranquilas hasta parques temáticos.',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
    {
      title: 'Rutas por Sevilla con niños',
      description:
        'Sevilla es historia y cultura. Descubre los mejores rincones para disfrutar en familia mientras conoces esta ciudad mágica.',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
  ];

  return (
    <section className="container-center my-12">
      {/* <h2 className="section-title">{sectionTitle}</h2> */}
      <h2 className="section-title mb-3">sectionTitle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyNews.map((item, index) => (
          <CardVertical
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}