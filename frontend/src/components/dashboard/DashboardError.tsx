interface DashboardErrorProps {
  message: string;
}

function DashboardError({ message }: DashboardErrorProps) {
  return (
    <div
      role="alert"
      className="
        mb-6
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        px-5
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
      style={{
        backgroundColor: "#FFF7ED",
        borderColor: "#FED7AA",
      }}
    >
      <div>
        <p className="text-sm font-semibold text-red-700">
          Terjadi kesalahan
        </p>

        <p className="mt-1 text-sm text-red-600">{message}</p>
      </div>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="
          shrink-0
          rounded-xl
          border
          border-red-200
          bg-white
          px-4
          py-2.5
          text-xs
          font-semibold
          text-red-700
          transition
          hover:bg-red-50
        "
      >
        Coba Lagi
      </button>
    </div>
  );
}

export default DashboardError;