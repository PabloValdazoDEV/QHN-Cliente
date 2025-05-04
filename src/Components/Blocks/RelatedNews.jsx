import CardHorizontalMini from '../Cards/CardHorizontalMini';

export default function RelatedNews({ moreOptions }) {
  if (!Array.isArray(moreOptions)) return null;

  return (
    <aside className="flex flex-col gap-4">
      <h2 className="section-title mb-3">Noticias Relacionadas</h2>
      <div className="flex flex-col gap-4">
        {moreOptions.map((item, index) => (
          <CardHorizontalMini
            key={index}
            title={item.nombre_evento}
            image={item.image}
            link={"/post/" + item.slug}
          />
        ))}
      </div>
    </aside>
  );
}
