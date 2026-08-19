function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            animate-pulse
            rounded-3xl
            border
            bg-white/10
            p-6
          "
          style={{
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          <div className="h-12 w-12 rounded-2xl bg-white/20" />

          <div className="mt-6 h-4 w-28 rounded bg-white/20" />

          <div className="mt-4 h-10 w-20 rounded-lg bg-white/20" />

          <div className="mt-3 h-4 w-40 rounded bg-white/20" />

          <div className="mt-6 h-px w-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export default DashboardSkeleton;