export default function CardHorizontal({ title, description, image, link }) {
  return (
    <a
      href={link || '#'}
      className="group flex items-center gap-4 rounded-base overflow-hidden transition-soft bg-white shadow-md hover:shadow-lg dark:bg-neutral-900"
    >
      <div className="min-w-[120px] sm:min-w-[160px] h-32 sm:h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex-1">
        <h3 className="text-lg font-display font-semibold text-[color:var(--color-primary)] group-hover:underline mb-1 dark:text-neutral-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3">
          {description}
        </p>
      </div>
    </a>
  );
}
