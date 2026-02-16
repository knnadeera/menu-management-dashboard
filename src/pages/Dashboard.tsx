import { useMenuStore } from "@/stores/menuStore";
import { useUIStore } from "@/stores/uiStore";
import {
  SearchBar,
  CategoryFilter,
  SortButtons,
  AvailabilityFilter,
} from "@/components/filters";
import { MenuItemCard, MenuItemCardSkeleton } from "@/components/dashboard";
import { CurrencySelector, StatsCards } from "@/components/ui";

const Dashboard = () => {
  const openAddModal = useUIStore((s) => s.openAddModal);
  const items = useMenuStore((s) => s.items);
  const loading = useMenuStore((s) => s.loading);
  const filteredItems = useMenuStore((s) => s.getFilteredItems());

  const stats = {
    total: items.length,
    available: items.filter((i) => i.status === "active").length,
    unavailable: items.filter((i) => i.status !== "active").length,
    categories: new Set(items.map((i) => i.category)).size,
  };

  const _skeletonIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

  let itemsContent: React.ReactNode;
  if (loading) {
    itemsContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {_skeletonIds.map((id) => (
          <MenuItemCardSkeleton key={id} />
        ))}
      </div>
    );
  } else if (filteredItems.length > 0) {
    itemsContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  } else {
    itemsContent = (
      <div className="text-center py-16">
        <svg
          className="mx-auto h-12 w-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No items found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Menu Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your restaurant menu items
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Item
              </button>

              <div className="hidden sm:block">
                <CurrencySelector />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>
            <SortButtons />
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <CategoryFilter />
            <AvailabilityFilter />
          </div>
        </div>

        {itemsContent}
      </main>
    </div>
  );
};

export default Dashboard;
