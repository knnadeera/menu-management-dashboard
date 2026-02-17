type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const options = [
  { id: "All", label: "All" },
  { id: "Available", label: "Available" },
  { id: "Unavailable", label: "Unavailable" },
];

const AvailabilityFilter = ({ value = "All", onChange, className }: Props) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            value === opt.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default AvailabilityFilter;
