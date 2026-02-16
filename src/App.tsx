import Dashboard from "@/pages/Dashboard";
import { MenuItemForm } from "@/components/forms";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ToastContainer } from "@/components/ui";

export default function App() {
  return (
    <>
      <Dashboard />
      <MenuItemForm />
      <ConfirmDialog />
      <ToastContainer />
    </>
  );
}
