import { useMenuStore } from "@/stores/menuStore";
import { categories } from "@/data/mockData";

const allCategories = [{ id: "All", name: "All" }, ...categories];

const CategoryFilter = () => {
  const selectedCategory = useMenuStore((s) => s.selectedCategory);
  const setSelectedCategory = useMenuStore((s) => s.setSelectedCategory);

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedCategory === category.id
              ? "bg-indigo-600 text-white shadow-md"
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
