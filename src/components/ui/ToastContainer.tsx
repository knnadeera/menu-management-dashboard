import { useEffect } from "react";
import useToastStore from "@/stores/toastStore";

const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    toasts.forEach((t) => {
      const id = setTimeout(() => removeToast(t.id), t.duration ?? 4000);
      timers.push(id);
    });
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm w-full px-4 py-3 rounded-lg shadow-md border-l-4 flex items-center gap-3 transition-transform transform \n            ${t.type === "success" ? "bg-green-50 border-green-400 text-green-800" : ""}\n            ${t.type === "error" ? "bg-red-50 border-red-400 text-red-800" : ""}\n            ${t.type === "info" ? "bg-gray-800 text-white" : ""}`}
        >
          <div className="flex-1 text-sm">{t.message}</div>
          <button
            aria-label="Dismiss"
            onClick={() => removeToast(t.id)}
            className="text-sm opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
