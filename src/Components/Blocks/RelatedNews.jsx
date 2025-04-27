import CardHorizontalMini from '../Cards/CardHorizontalMini';

export default function RelatedNews() {
  const dummyNews = [
    {
      title: 'Todo lo que necesitas saber para ir a la Feria de Sevilla con niños',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
    {
      title: 'Indemnizaciones por pérdida de equipaje en el aeropuerto: qué hacer',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
    {
      title: 'Planes con niños en Jávea y Dénia: naturaleza y ocio',
      image: 'https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1',
      link: '#',
    },
  ];

  return (
    <aside className="flex flex-col gap-4">
      <h2 className="section-title mb-3">Noticias Relacionadas</h2>
      <div className="flex flex-col gap-4">
        {dummyNews.map((item, index) => (
          <CardHorizontalMini
            key={index}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </aside>
  );
}
