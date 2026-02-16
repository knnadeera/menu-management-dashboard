import { useMenuStore } from "@/stores/menuStore";

const options = [
  { id: "All", label: "All" },
  { id: "Available", label: "Available" },
  { id: "Unavailable", label: "Unavailable" },
];

const AvailabilityFilter = () => {
  const selectedAvailability = useMenuStore((s) => s.selectedAvailability);
  const setSelectedAvailability = useMenuStore(
    (s) => s.setSelectedAvailability,
  );

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSelectedAvailability(opt.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedAvailability === opt.id
              ? "bg-indigo-600 text-white shadow-md"
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
