import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navItems = [
    {
      label: "Software Directory",
      to: "/software-directory",
    },
    {
      label: "Categories",
      to: "/software-directory",
    },
    {
      label: "Compare",
      to: "/software-comparison",
    },
    {
      label: "Vendors",
      to: "/vendors",
    },
    {
      label: "Resources",
      to: "/#resources",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e3ef] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
        {/* ============================================================
            LOGO
        ============================================================ */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute h-2 w-2 rounded-full bg-[#6846e8]" />
            <div className="absolute h-5 w-1 rounded-full bg-[#6846e8]" />
            <div className="absolute h-1 w-5 rounded-full bg-[#6846e8]" />
          </div>

          <span className="text-[20px] font-bold tracking-[-0.5px] text-[#171717] sm:text-[21px]">
            Software Empire
          </span>
        </Link>

        {/* ============================================================
            DESKTOP NAVIGATION
        ============================================================ */}

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-[13px] font-medium transition ${
                  isActive
                    ? "text-[#6846e8]"
                    : "text-[#403b4c] hover:text-[#6846e8]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  {isActive && (
                    <span className="absolute -bottom-[9px] left-0 right-0 h-[2px] rounded-full bg-[#6846e8]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ============================================================
            RIGHT ACTIONS
        ============================================================ */}

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden px-3 py-2 text-[13px] font-semibold text-[#302b3c] transition hover:text-[#6846e8] sm:block"
          >
            Login
          </Link>

          <Link
            to="/software-directory"
            className="hidden rounded-lg bg-[#6846e8] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_5px_15px_rgba(104,70,232,0.18)] transition hover:-translate-y-0.5 hover:bg-[#5938d5] hover:shadow-[0_8px_20px_rgba(104,70,232,0.25)] sm:block"
          >
            Find Software
          </Link>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2ddea] text-[#302b3c] transition hover:bg-[#f7f5fb] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================================================================
          MOBILE MENU
      ================================================================= */}

      {mobileOpen && (
        <div className="border-t border-[#e7e3ef] bg-white lg:hidden">
          <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `border-b border-[#f0edf4] px-1 py-4 text-sm font-medium transition last:border-b-0 ${
                      isActive
                        ? "text-[#6846e8]"
                        : "text-[#403b4c] hover:text-[#6846e8]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg border border-[#dcd7e7] px-4 py-3 text-sm font-semibold text-[#302b3c] transition hover:bg-[#f7f5fb]"
              >
                Login
              </Link>

              <Link
                to="/software-directory"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg bg-[#6846e8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5938d5]"
              >
                Find Software
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
