import type { IMenuItem } from "@/types/menu.types";

interface Props {
  readonly item: IMenuItem;
  readonly onToggleAvailability: (id: string | number) => void;
  readonly onEdit: (item: IMenuItem) => void;
  readonly onDelete: (id: string | number) => void;
}

const MenuItemActions = ({
  item,
  onToggleAvailability,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onToggleAvailability(item.id)}
        className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          item.status === "active"
            ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
            : "bg-green-50 text-green-700 hover:bg-green-100"
        }`}
      >
        {item.status === "active" ? "Mark Inactive" : "Mark Active"}
      </button>

      <button
        onClick={() => onEdit(item)}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors cursor-pointer"
        title="Edit"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>

      <button
        onClick={() => onDelete(item.id)}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        title="Delete"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default MenuItemActions;
