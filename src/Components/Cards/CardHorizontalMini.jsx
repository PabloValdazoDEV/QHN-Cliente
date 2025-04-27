export default function CardHorizontalMini({ title, image, link }) {
    return (
      <a
        href={link || '#'}
        className="group flex items-center gap-4 rounded-base overflow-hidden transition-soft bg-white shadow-md hover:shadow-lg dark:bg-neutral-900 no-underline"
      >
        <div className="w-[100px] h-[80px] flex-shrink-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 pr-2">
          <h3 className="text-xs font-display font-semibold text-[color:var(--color-primary)] dark:text-neutral-300 line-clamp-4">
            {title}
          </h3>
        </div>
      </a>
    );
  }
  