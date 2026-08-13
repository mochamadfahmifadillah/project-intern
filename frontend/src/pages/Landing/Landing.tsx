import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* =========================
          NAVBAR
      ========================== */}
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-bold tracking-tight text-white">
              SE
            </div>

            <span className="text-base font-bold tracking-tight">
              Software Empire
            </span>
          </button>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              About
            </a>

            <a
              href="#security"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Security
            </a>
          </nav>

          {/* CTA */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </div>
      </header>

      <main>
        {/* =========================
            HERO
        ========================== */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gray-100 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-black" />

                  <span className="text-xs font-medium text-gray-700">
                    Modern Management Platform
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-7xl">
                Manage your system.
                <br />
                <span className="text-gray-400">Without the complexity.</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Software Empire membantu mengelola users, roles, dan permissions
                melalui satu platform yang sederhana, terstruktur, dan aman.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 sm:w-auto"
                >
                  Open Dashboard
                </button>

                <a
                  href="#features"
                  className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-50 sm:w-auto"
                >
                  Explore Features
                </a>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Role-based access · Centralized management · Secure permissions
              </p>
            </div>

            {/* =========================
                DASHBOARD PREVIEW
            ========================== */}
            <div className="mx-auto mt-16 max-w-6xl">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
                {/* Browser bar */}
                <div className="flex h-11 items-center gap-2 border-b border-gray-200 bg-gray-50 px-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />

                  <div className="mx-auto hidden h-6 w-72 rounded-md border border-gray-200 bg-white sm:block" />
                </div>

                {/* Fake Dashboard */}
                <div className="flex min-h-[360px] bg-gray-50">
                  {/* Sidebar */}
                  <div className="hidden w-52 border-r border-gray-200 bg-white p-4 md:block">
                    <div className="mb-8 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-[8px] font-bold text-white">
                        SE
                      </div>

                      <div className="h-3 w-24 rounded bg-gray-200" />
                    </div>

                    <div className="space-y-2">
                      <div className="rounded-lg bg-black px-3 py-2">
                        <div className="h-2.5 w-20 rounded bg-white/80" />
                      </div>

                      <div className="px-3 py-2">
                        <div className="h-2.5 w-14 rounded bg-gray-200" />
                      </div>

                      <div className="px-3 py-2">
                        <div className="h-2.5 w-16 rounded bg-gray-200" />
                      </div>

                      <div className="px-3 py-2">
                        <div className="h-2.5 w-24 rounded bg-gray-200" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8">
                    <div className="mb-8">
                      <div className="h-5 w-32 rounded bg-gray-300" />

                      <div className="mt-3 h-3 w-56 rounded bg-gray-200" />
                    </div>

                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        {
                          label: "Users",
                          value: "1,248",
                        },
                        {
                          label: "Roles",
                          value: "12",
                        },
                        {
                          label: "Permissions",
                          value: "48",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-gray-200 bg-white p-5"
                        >
                          <div className="h-2.5 w-16 rounded bg-gray-200" />

                          <div className="mt-4 text-2xl font-bold text-black">
                            {item.value}
                          </div>

                          <div className="mt-2 h-2.5 w-24 rounded bg-gray-100" />
                        </div>
                      ))}
                    </div>

                    {/* Table */}
                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <div className="h-3 w-24 rounded bg-gray-200" />

                          <div className="mt-2 h-2.5 w-32 rounded bg-gray-100" />
                        </div>

                        <div className="h-8 w-20 rounded-lg bg-black" />
                      </div>

                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-4 border-t border-gray-100 pt-4"
                          >
                            <div className="h-8 w-8 rounded-full bg-gray-100" />

                            <div className="flex-1">
                              <div className="h-2.5 w-28 rounded bg-gray-200" />

                              <div className="mt-2 h-2 w-36 rounded bg-gray-100" />
                            </div>

                            <div className="hidden h-6 w-16 rounded-full bg-gray-100 sm:block" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            VALUE
        ========================== */}
        <section className="border-y border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="grid gap-8 text-center sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-black">Centralized</p>

                <p className="mt-1 text-sm text-gray-500">
                  Semua pengelolaan dalam satu platform
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-black">Role-Based</p>

                <p className="mt-1 text-sm text-gray-500">
                  Akses disesuaikan dengan role pengguna
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-black">Secure</p>

                <p className="mt-1 text-sm text-gray-500">
                  Permission dikontrol secara terstruktur
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            FEATURES
        ========================== */}
        <section id="features" className="scroll-mt-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Features
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Everything you need to manage access.
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Software Empire dirancang untuk membuat pengelolaan user dan
                akses sistem menjadi lebih sederhana tanpa mengorbankan kontrol.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {/* User Management */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                  01
                </div>

                <h3 className="mt-6 text-lg font-semibold text-black">
                  User Management
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Kelola pengguna, informasi akun, dan role dari satu interface
                  yang konsisten.
                </p>

                <div className="mt-6 text-sm font-medium text-black">
                  Manage users →
                </div>
              </div>

              {/* Role Management */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                  02
                </div>

                <h3 className="mt-6 text-lg font-semibold text-black">
                  Role Management
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Buat role dan tentukan kumpulan permission sesuai kebutuhan
                  organisasi.
                </p>

                <div className="mt-6 text-sm font-medium text-black">
                  Manage roles →
                </div>
              </div>

              {/* Permission Control */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                  03
                </div>

                <h3 className="mt-6 text-lg font-semibold text-black">
                  Permission Control
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Atur akses secara granular agar setiap pengguna hanya dapat
                  menggunakan fitur yang sesuai.
                </p>

                <div className="mt-6 text-sm font-medium text-black">
                  Manage permissions →
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================== */}
        <section id="about" className="scroll-mt-16 border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                  About Software Empire
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Simple interface.
                  <br />
                  Structured access.
                </h2>

                <p className="mt-5 text-base leading-7 text-gray-600">
                  Software Empire merupakan platform manajemen yang berfokus
                  pada pengelolaan pengguna dan kontrol akses secara
                  terstruktur.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Interface sederhana dan mudah dipahami",
                    "User, role, dan permission saling terintegrasi",
                    "Akses berdasarkan kebutuhan pengguna",
                    "Dashboard dengan informasi yang relevan",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                        ✓
                      </div>

                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Control Preview */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                    <div>
                      <p className="text-sm font-semibold text-black">
                        Access Control
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Permission overview
                      </p>
                    </div>

                    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      Active
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      ["Users", "users.view", "Allowed"],
                      ["Roles", "roles.edit", "Allowed"],
                      ["Permissions", "permissions.view", "Allowed"],
                      ["Settings", "settings.edit", "Restricted"],
                    ].map(([name, permission, status]) => (
                      <div
                        key={permission}
                        className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-black">
                            {name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {permission}
                          </p>
                        </div>

                        <span
                          className={`text-xs font-medium ${
                            status === "Allowed"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            SECURITY
        ========================== */}
        <section
          id="security"
          className="scroll-mt-16 border-y border-gray-200 bg-gray-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Access & Security
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Access control that scales with your system.
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Setiap fitur dapat dikontrol berdasarkan permission yang
                dimiliki pengguna sehingga akses tetap aman, terstruktur, dan
                mudah dikembangkan.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Step 01
                  </p>

                  <p className="mt-3 font-semibold text-black">Create Role</p>

                  <p className="mt-2 text-sm text-gray-500">
                    Buat role sesuai kebutuhan organisasi.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Step 02
                  </p>

                  <p className="mt-3 font-semibold text-black">
                    Assign Permission
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Tentukan permission yang dapat digunakan.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Step 03
                  </p>

                  <p className="mt-3 font-semibold text-black">Assign User</p>

                  <p className="mt-2 text-sm text-gray-500">
                    Hubungkan pengguna dengan role yang sesuai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            FINAL CTA
        ========================== */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xs font-bold text-black">
              SE
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take control?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
              Kelola users, roles, dan permissions dari satu platform yang
              sederhana dan terstruktur.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Open Software Empire
            </button>
          </div>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-[9px] font-bold text-black">
              SE
            </div>

            <span className="text-sm font-semibold">Software Empire</span>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 Software Empire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
