export default function CardHorizontal({ title, description, image, link }) {
    return (
      <a
        href={link || '#'}
        className="flex flex-col sm:flex-row items-center gap-4 rounded-base overflow-hidden transition-soft bg-white shadow-md hover:shadow-lg dark:bg-neutral-900"
      >
        <img
          src={image}
          alt={title}
          className="w-full sm:w-40 h-32 sm:h-full object-cover"
        />
        <div className="p-4 sm:p-0 sm:pr-4 flex-1">
          <h3 className="text-lg font-display font-semibold text-[color:var(--color-primary)] hover:underline mb-1">
            {title}
          </h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3">
            {description}
          </p>
        </div>
      </a>
    );
  }