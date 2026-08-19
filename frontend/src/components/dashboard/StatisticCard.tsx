import { ArrowUpRight, type LucideIcon } from "lucide-react";

export interface StatisticCardData {
  title: string;
  value: number | null;
  description: string;
  path: string;
  permission: string;
  icon: LucideIcon;
}

interface StatisticCardProps {
  card: StatisticCardData;
  onNavigate: (path: string) => void;
}

function StatisticCard({
  card,
  onNavigate,
}: StatisticCardProps) {
  const Icon = card.icon;

  return (
    <button
      type="button"
      onClick={() => onNavigate(card.path)}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        bg-white
        p-6
        text-left
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        focus:outline-none
        focus:ring-2
        focus:ring-white/50
      "
      style={{
        borderColor: "rgba(255,255,255,0.15)",
      }}
    >
      {/* Decorative Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          opacity-0
          blur-3xl
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          backgroundColor: "var(--lavender)",
        }}
      />

      <div className="relative">
        {/* Top */}

        <div className="flex items-start justify-between">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
            "
            style={{
              backgroundColor: "var(--lavender-soft)",
              color: "var(--primary)",
            }}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              group-hover:translate-x-1
            "
            style={{
              backgroundColor: "var(--accent-yellow)",
              color: "var(--primary-dark)",
            }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Title */}

        <p
          className="mt-6 text-sm font-semibold"
          style={{
            color: "#666666",
          }}
        >
          {card.title}
        </p>

        {/* Value */}

        <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {card.value ?? 0}
        </p>

        {/* Description */}

        <p className="mt-2 text-sm leading-5 text-slate-500">
          {card.description}
        </p>

        {/* Footer */}

        <div
          className="mt-6 border-t pt-4"
          style={{
            borderColor: "#EEEEEE",
          }}
        >
          <span
            className="text-xs font-semibold transition-colors"
            style={{
              color: "var(--primary)",
            }}
          >
            Kelola {card.title.toLowerCase()} →
          </span>
        </div>
      </div>
    </button>
  );
}

export default StatisticCard;