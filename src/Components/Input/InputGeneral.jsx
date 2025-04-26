export default function InputGeneral({
    type = "text",
    placeholder = "Escribe aquí...",
    value,
    onChange,
    name,
    required = false,
    className = "",
  }) {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] text-white ${className}`}
      />
    );
  }
  