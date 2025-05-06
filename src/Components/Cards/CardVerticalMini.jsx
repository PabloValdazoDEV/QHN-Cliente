export default function CardVerticalMini({ title, description, image, link, showDescription = true }) {
  return (
      <a
        href={link || '#'}
        className="block group transition-soft rounded-base overflow-hidden bg-white shadow-md hover:shadow-lg rounded-lg no-underline"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-30 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-3">
          <h3 className="text-lg font-display font-semibold text-[color:var(--color-primary)]  mb-1">
            {title}
          </h3>
            {showDescription && (
            <p className="text-xs text-neutral-700 rounded-lg">
              {description}
            </p>
          )}
        </div>
      </a>
    );
  }
  