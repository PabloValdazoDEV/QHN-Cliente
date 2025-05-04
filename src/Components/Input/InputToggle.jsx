import { Check, X } from "lucide-react"; // Asegúrate de tener instalado lucide-react

export default function InputToggleStatus({ checked, onChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-10 h-6 bg-gray-200 rounded-full shadow-md relative transition-colors duration-300">
        <div
          className={`
            absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center
            transition-all duration-300
            ${checked ? "bg-green-600 translate-x-4 text-white" : "bg-red-600 text-white"}
          `}
        >
          {checked ? <Check size={13} /> : <X size={13} />}
        </div>
      </div>
    </label>
  );
}
