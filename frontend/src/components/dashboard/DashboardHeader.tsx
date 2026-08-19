import { type User } from "../../pages/Dashboard/types";

interface DashboardHeaderProps {
  user: User | null;
}

function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div
        className="
          rounded-3xl
          border
          px-6
          py-7
          shadow-xl
          sm:px-8
          sm:py-9
        "
        style={{
          backgroundColor: "rgba(255,255,255,0.10)",
          borderColor: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(16px)",
        }}
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
          "
          style={{
            color: "var(--accent-yellow)",
          }}
        >
          Ringkasan Sistem
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          Selamat datang kembali,{" "}
          <span className="font-semibold text-white">
            {user?.name || "User"}
          </span>
          . Pantau dan kelola data utama sistem Anda dari satu tempat.
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;