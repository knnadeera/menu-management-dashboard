import type { IMenuItem } from "@/types/menu.types";
import { useUIStore } from "@/stores/uiStore";
import { useMenuStore } from "@/stores/menuStore";
import MenuItemHeader from "./MenuItemHeader";
import MenuItemBody from "./MenuItemBody";
import MenuItemActions from "./MenuItemActions";

interface MenuItemCardProps {
  readonly item: IMenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const openEditModal = useUIStore((s) => s.openEditModal);
  const openConfirmDialog = useUIStore((s) => s.openConfirmDialog);
  const toggleAvailability = useMenuStore((s) => s.toggleAvailability);
  const deleteItem = useMenuStore((s) => s.deleteItem);

  const confirmToggle = (id: string | number) =>
    openConfirmDialog(id, undefined, "Change item status?", (confirmedId) => {
      if (confirmedId != null) toggleAvailability(confirmedId);
    });

  const confirmDelete = (id: string | number) =>
    openConfirmDialog(
      id,
      undefined,
      "Delete this item? This action cannot be undone.",
      (confirmedId) => {
        if (confirmedId != null) deleteItem(confirmedId);
      },
    );

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <MenuItemHeader item={item} />

      <div className="p-4">
        <MenuItemBody item={item} />

        <MenuItemActions
          item={item}
          onToggleAvailability={confirmToggle}
          onEdit={openEditModal}
          onDelete={confirmDelete}
        />
      </div>
    </div>
  );
};

export default MenuItemCard;
