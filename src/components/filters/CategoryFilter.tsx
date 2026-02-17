import { categories } from "@/data/mockData";

export type Category =
  | (typeof categories)[number]
  | { id: string; name: string };
const allCategories = [{ id: "All", name: "All" }, ...categories];

type Props = {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

const CategoryFilter = ({ value = "All", onChange, className }: Props) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {allCategories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          aria-pressed={value === category.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            value === category.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
