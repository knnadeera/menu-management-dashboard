interface Stats {
  total: number;
  available: number;
  unavailable: number;
  categories: number;
}

interface Props {
  stats: Stats;
  showUnavailable?: boolean;
}

const StatsCards = ({ stats, showUnavailable = false }: Props) => {
  const cards = [
    {
      label: "Total Items",
      value: stats.total,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Available",
      value: stats.available,
      color: "bg-green-50 text-green-700",
    },
  ];

  if (showUnavailable) {
    cards.push({
      label: "Unavailable",
      value: stats.unavailable,
      color: "bg-red-50 text-red-700",
    });
  }

  cards.push({
    label: "Categories",
    value: stats.categories,
    color: "bg-amber-50 text-amber-700",
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((stat) => (
        <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
          <p className="text-sm font-medium opacity-80">{stat.label}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
