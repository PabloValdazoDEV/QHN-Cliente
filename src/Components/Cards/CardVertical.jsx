export default function CardVertical({ title, description, image, link, variant = 'default' }) {
  const isCompact = variant === 'compact';

  return (
    <div className="relative">
      <a
        href={link || '#'}
        className="block group rounded-base overflow-hidden bg-white shadow-md hover:shadow-lg transition-soft relative z-10 no-underline"
      >
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col justify-start ">
          <h3
            className={`text-base font-display font-semibold text-[color:var(--color-primary)] line-clamp-2   ${
              isCompact ? 'line-clamp-2' : ''
            }`}
          >
            {title}
          </h3>

          <div className="max-h-16 group-hover:max-h-40 overflow-hidden transition-all duration-800 ease-in-out">
            <p className="text-sm text-neutral-700 line-clamp-2 ">
              {description}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
