export default function ButtonGeneral({
    children = "Click aquí",
    onClick,
    type = "button",
    className = ""
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-200 ease-in-out transform hover:scale-105 font-medium px-4 py-2 rounded-md ${className}`.trim()}

      >
        {children}
      </button>
    );
  }
  