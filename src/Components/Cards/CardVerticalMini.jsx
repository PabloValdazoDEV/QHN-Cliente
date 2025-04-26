export default function CardVerticalMini({ title, description, image, link }) {
    return (
      <a
        href={link || '#'}
        className="block group transition-soft rounded-base overflow-hidden bg-white shadow-md hover:shadow-lg dark:bg-neutral-900 rounded-lg no-underline"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-30 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-3">
          <h3 className="text-lg font-display font-semibold text-[color:var(--color-primary)]  mb-1 dark:text-neutral-300">
            {title}
          </h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 rounded-lg">
            {description}
          </p>
        </div>
      </a>
    );
  }
  