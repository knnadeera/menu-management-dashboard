import type { IMenuItem } from "@/types/menu.types";

interface Props {
  readonly item: IMenuItem;
}

const MenuItemHeader = ({ item }: Props) => {
  return (
    <div className="relative h-48 overflow-hidden">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <span
        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
          item.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {item.status === "active" ? "Active" : "Inactive"}
      </span>

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
        {item.category}
      </span>
    </div>
  );
};

export default MenuItemHeader;
