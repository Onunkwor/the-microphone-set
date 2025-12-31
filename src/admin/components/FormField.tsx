interface FormFieldProps {
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'url';
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  placeholder,
  required,
  rows = 3,
}: FormFieldProps) {
  const baseClass =
    'w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent';

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800"
        />
        <span className="text-gray-300">{label}</span>
      </label>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={baseClass}
        />
      ) : type === 'select' ? (
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseClass}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'number' ? (
        <input
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
