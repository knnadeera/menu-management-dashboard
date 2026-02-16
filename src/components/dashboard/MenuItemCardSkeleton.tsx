const MenuItemCardSkeleton = () => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gray-200" />

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-12" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-200 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded w-10" />
          <div className="h-8 bg-gray-200 rounded w-10" />
        </div>
      </div>
    </div>
  );
};

export default MenuItemCardSkeleton;
