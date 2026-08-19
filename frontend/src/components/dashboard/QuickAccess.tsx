interface QuickAccessItem {
  label: string;
  path: string;
  permission: string;
}

interface QuickAccessProps {
  items: QuickAccessItem[];
  hasPermission: (permission: string) => boolean;
  onNavigate: (path: string) => void;
}

function QuickAccess({ items, hasPermission, onNavigate }: QuickAccessProps) {
  const visibleItems = items.filter((item) => hasPermission(item.permission));

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <section
      className="
        mt-6
        rounded-3xl
        border
        bg-white/10
        p-6
        shadow-lg
        sm:p-7
      "
      style={{
        borderColor: "rgba(255,255,255,0.14)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h2 className="text-base font-bold text-white">Akses Cepat</h2>

          <p className="mt-1 text-sm text-white/60">
            Akses langsung ke pengelolaan sistem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className="
                rounded-xl
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                transition
                hover:-translate-y-0.5
                hover:shadow-lg
              "
              style={{
                color: "var(--primary)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickAccess;
