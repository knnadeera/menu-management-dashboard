import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useMenuStore, menuFormSelector } from "@/stores/menuStore";
import { useUIStore, uiFormSelector } from "@/stores/uiStore";
import { categories } from "@/data/mockData";
import type { TStatus } from "@/types/menu.types";
import Input from "@/components/inputs/Input";
import Textarea from "@/components/inputs/Textarea";
import Dropdown from "@/components/inputs/Dropdown";
import PopupModal from "@/components/ui/PopupModal";

const MenuItemForm = () => {
  const { isModalOpen, editingItem, closeModal, openConfirmDialog } =
    useUIStore(useShallow(uiFormSelector));
  const { addItem, updateItem } = useMenuStore(useShallow(menuFormSelector));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Main Courses");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<TStatus>("active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!editingItem;

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description);
      setPrice((editingItem.price / 100).toFixed(2));
      setCategory(editingItem.category);
      setImage(editingItem.image ?? "");
      setStatus(editingItem.status);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Main Courses");
      setImage("");
      setStatus("active");
    }
    setErrors({});
  }, [editingItem, isModalOpen]);

  const isDirty = () => {
    const priceNum = price ? Number.parseFloat(price) : 0;

    if (!editingItem) {
      return (
        name.trim() !== "" ||
        description.trim() !== "" ||
        price.trim() !== "" ||
        image.trim() !== "" ||
        status !== "active" ||
        category !== "Main Courses"
      );
    }

    const origPrice = editingItem.price / 100;
    return (
      name !== editingItem.name ||
      description !== editingItem.description ||
      Math.abs((priceNum || 0) - origPrice) > 0.001 ||
      image !== (editingItem.image ?? "") ||
      status !== editingItem.status ||
      category !== editingItem.category
    );
  };

  const handleRequestClose = () => {
    if (isDirty()) {
      openConfirmDialog(
        null,
        "unsaved",
        "You have unsaved changes. Discard them?",
        () => closeModal(),
      );
      return;
    }
    closeModal();
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price || Number.isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Valid price is required";

    if (image.trim()) {
      try {
        new URL(image);
      } catch {
        newErrors.image = "Invalid image URL";
      }
    } else {
      newErrors.image = "Image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const itemData = {
      name: name.trim(),
      description: description.trim(),
      price: Math.round(Number.parseFloat(Number(price).toFixed(2)) * 100),
      category,
      image: image.trim(),
      status,
    };

    try {
      if (isEditing && editingItem) {
        await updateItem(editingItem.id, itemData);
      } else {
        await addItem(itemData);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        form: "Failed to save. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isModalOpen) return null;

  let buttonText: string;
  if (submitting) {
    buttonText = isEditing ? "Saving..." : "Adding...";
  } else {
    buttonText = isEditing ? "Save Changes" : "Add Item";
  }

  return (
    <PopupModal
      title={isEditing ? "Edit Menu Item" : "Add Menu Item"}
      onCloseModal={handleRequestClose}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <Input
            id="name"
            name="name"
            label="Name"
            required
            error={errors.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClearError={() =>
              setErrors((prev) => {
                const { name, ...rest } = prev;
                return rest;
              })
            }
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g. Grilled Chicken"
          />
        </div>

        <div>
          <Textarea
            id="description"
            name="description"
            label="Description"
            error={errors.description}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onClearError={() =>
              setErrors((prev) => {
                const { description, ...rest } = prev;
                return rest;
              })
            }
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
            placeholder="Describe the dish..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              id="price"
              name="price"
              label="Price (LKR)"
              error={errors.price}
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onClearError={() =>
                setErrors((prev) => {
                  const { price, ...rest } = prev;
                  return rest;
                })
              }
              validateOnChange={(v) => {
                const num = Number(v);
                return v !== "" && !Number.isNaN(num) && num > 0;
              }}
              className={`w-full px-3 py-2 rounded-lg border ${errors.price ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0.00"
            />
          </div>
          <div>
            <Dropdown
              id="category"
              name="category"
              label="Category"
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        <div>
          <Input
            id="image"
            name="image"
            label="Image URL"
            error={errors.image}
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            onClearError={() =>
              setErrors((prev) => {
                const { image, ...rest } = prev;
                return rest;
              })
            }
            className={`w-full px-3 py-2 rounded-lg border ${errors.image ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="https://example.com/image.jpg"
          />
          {image && !errors.image && (
            <img
              src={image}
              alt="Preview"
              className="mt-2 h-32 w-full object-cover rounded-lg border"
              onLoad={() =>
                setErrors((prev) => {
                  const { image, ...rest } = prev;
                  return rest;
                })
              }
              onError={() =>
                setErrors((prev) => ({
                  ...prev,
                  image: "Image could not be loaded",
                }))
              }
            />
          )}
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            id="status-toggle"
            type="checkbox"
            className="sr-only"
            checked={status === "active"}
            onChange={() =>
              setStatus(status === "active" ? "inactive" : "active")
            }
            aria-checked={status === "active"}
          />

          <div
            role="switch"
            aria-checked={status === "active"}
            className={`relative w-11 h-6 rounded-full transition-colors ${status === "active" ? "bg-blue-600" : "bg-gray-300"}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setStatus(status === "active" ? "inactive" : "active");
              }
            }}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${status === "active" ? "translate-x-5" : "translate-x-0"}`}
            />
          </div>

          <span className="text-sm text-gray-700">
            {status === "active" ? "Active" : "Inactive"}
          </span>
        </label>

        {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={handleRequestClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white ${submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition shadow-sm`}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </PopupModal>
  );
};

export default MenuItemForm;
