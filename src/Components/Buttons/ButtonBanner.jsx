export default function ButtonBanner({ onClick, children = "Descubrir" }) {
    return (
      <button
        onClick={onClick}
        className="bg-[color:var(--color-secondary)] text-white py-2 px-4 rounded-md font-medium transition-soft hover:opacity-90"
      >
        {children}
      </button>
    );
  }
  