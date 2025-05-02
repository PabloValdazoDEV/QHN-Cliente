export default function MultiSelectGeneral({
    name,
    value = [],
    onChange,
    options = [],
    required = false,
    className = "",
    id,
    ...rest
  }) {
    const handleChange = (e) => {
      const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
      onChange({ target: { name, value: selected } });
    };
  
    return (
      <select
        name={name}
        multiple
        value={value}
        onChange={handleChange}
        required={required}
        id={id}
        {...rest}
        className={`w-full bg-gray-100 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-700 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    );
  }
  