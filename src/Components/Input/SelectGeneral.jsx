export default function SelectGeneral({
    name,
    value,
    onChange,
    options = [],
    required = false,
    placeholder = "Selecciona una opción",
    className = "",
    id,
    multiple = false,
    ...rest
  }) {
    return (
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        multiple={multiple}
        className={`w-full bg-gray-100 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-700 ${className}`}
        {...rest}
      >
        {!multiple && <option value="" hidden>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }
  