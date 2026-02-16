import { useEffect, useRef, useId } from "react";
import { useMenuStore } from "@/stores/menuStore";
import { useUIStore } from "@/stores/uiStore";

type ConfirmDialogProps = {
  label?: string;
  message?: string;
  onConfirm?: (id: string | number | null) => void;
};

const ConfirmDialog = ({ label, message, onConfirm }: ConfirmDialogProps) => {
  const isConfirmOpen = useUIStore((s) => s.isConfirmOpen);
  const deletingItemId = useUIStore((s) => s.deletingItemId);
  const confirmMessage = useUIStore((s) => s.confirmMessage);
  const confirmCallback = useUIStore((s) => s.confirmCallback);
  const items = useMenuStore((s) => s.items);
  const closeConfirmDialog = useUIStore((s) => s.closeConfirmDialog);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isConfirmOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (
      dialogRef.current &&
      typeof dialogRef.current.showModal === "function"
    ) {
      try {
        dialogRef.current.showModal();
      } catch {
        /* ignore */
      }
    }
    dialogRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeConfirmDialog();
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus();

      if (dialogRef.current && typeof dialogRef.current.close === "function") {
        try {
          dialogRef.current.close();
        } catch {
          /* ignore */
        }
      }
    };
  }, [isConfirmOpen, closeConfirmDialog]);

  if (!isConfirmOpen) return null;

  const item = items.find((i) => i.id === deletingItemId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeConfirmDialog}
        aria-label="Close confirm dialog"
      />

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        open
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
      >
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-7 w-7 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.27 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h3 id={titleId} className="text-lg font-bold text-gray-900 mb-1">
          {label ?? "Confirm"}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {confirmMessage ?? message ?? (
            <>
              Are you sure?
              {item && (
                <span className="font-semibold text-gray-700">
                  {" "}
                  {item.name}?
                </span>
              )}
            </>
          )}
        </p>

        <div className="flex gap-3">
          <button
            onClick={closeConfirmDialog}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (confirmCallback) {
                confirmCallback(deletingItemId ?? null);
              } else if (onConfirm) {
                onConfirm(deletingItemId);
              }
              closeConfirmDialog();
            }}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition shadow-sm"
          >
            {label ?? "Confirm"}
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmDialog;
