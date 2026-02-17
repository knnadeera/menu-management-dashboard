import { TSortField } from "@/types/menu.types";

const sortOptions: { label: string; field: TSortField }[] = [
  { label: "Name", field: "name" },
  { label: "Price", field: "price" },
  { label: "Category", field: "category" },
];

type Props = {
  sortField: TSortField;
  sortDirection: "asc" | "desc";
  onChange: (field: TSortField) => void;
  className?: string;
};

const SortButtons = ({
  sortField,
  sortDirection,
  onChange,
  className = "",
}: Props) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
      {sortOptions.map((opt) => (
        <button
          key={opt.field}
          type="button"
          onClick={() => onChange(opt.field)}
          className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            sortField === opt.field
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {opt.label}
          {sortField === opt.field && (
            <svg
              className={`w-4 h-4 transition-transform ${
                sortDirection === "desc" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
