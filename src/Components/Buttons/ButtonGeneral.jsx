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
        className={`transition-soft font-medium ${className}`.trim()}
      >
        {children}
      </button>
    );
  }
  