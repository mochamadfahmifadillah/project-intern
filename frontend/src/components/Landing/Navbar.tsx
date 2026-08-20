import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navItems = [
    {
      label: "Software",
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
    <header className="sticky top-0 z-50 border-b border-[#e8e3ef] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        {/* ============================================================
            LOGO
        ============================================================ */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-3"
        >
          {/* Logo Mark */}

          <div className="relative flex h-9 w-9 items-center justify-center">
            <div className="absolute h-[7px] w-[7px] rounded-full bg-[#704FE6]" />

            <div className="absolute h-[22px] w-[4px] rounded-full bg-[#704FE6]" />

            <div className="absolute h-[4px] w-[22px] rounded-full bg-[#704FE6]" />

            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#FFD361]" />
          </div>

          {/* Brand */}

          <div className="leading-none">
            <span className="block text-[19px] font-bold tracking-[-0.6px] text-[#18161d] sm:text-[20px]">
              Software Empire
            </span>

            <span className="mt-1 hidden text-[8px] font-semibold uppercase tracking-[0.18em] text-[#91899d] sm:block">
              Software Intelligence
            </span>
          </div>
        </Link>

        {/* ============================================================
            DESKTOP NAVIGATION
        ============================================================ */}

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `relative px-4 py-2.5 text-[13px] font-medium transition ${
                  isActive
                    ? "text-[#704FE6]"
                    : "text-[#514b5b] hover:text-[#704FE6]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#704FE6]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ============================================================
            RIGHT ACTIONS
        ============================================================ */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Login */}

          <Link
            to="/login"
            className="hidden px-3 py-2.5 text-[13px] font-semibold text-[#403a4b] transition hover:text-[#704FE6] sm:block"
          >
            Login
          </Link>

          {/* CTA */}

          <Link
            to="/software-directory"
            className="group hidden items-center gap-2 bg-[#704FE6] px-5 py-3 text-[12px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#6F4FDE] sm:inline-flex"
          >
            Find Software
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center border border-[#ddd7e7] bg-white text-[#403a4b] transition hover:border-[#cfc3e4] hover:bg-[#f9f7fc] lg:hidden"
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
        <div className="border-t border-[#e8e3ef] bg-white lg:hidden">
          <div className="mx-auto max-w-[1280px] px-5 py-5 sm:px-8">
            {/* Mobile Navigation */}

            <nav className="border border-[#e3ddea] bg-[#faf9fc]">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-5 py-4 text-[13px] font-medium transition ${
                      index !== navItems.length - 1
                        ? "border-b border-[#e8e3ef]"
                        : ""
                    } ${
                      isActive
                        ? "bg-[#DEC8FE]/35 text-[#704FE6]"
                        : "text-[#514b5b] hover:bg-white hover:text-[#704FE6]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#704FE6]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Actions */}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center border border-[#d9d2e4] px-4 py-3 text-[13px] font-semibold text-[#403a4b] transition hover:border-[#704FE6] hover:text-[#704FE6]"
              >
                Login
              </Link>

              <Link
                to="/software-directory"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 bg-[#704FE6] px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-[#6F4FDE]"
              >
                Find Software
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Small Brand Accent */}

            <div className="mt-5 flex items-center gap-1.5">
              <span className="h-1 w-12 bg-[#704FE6]" />
              <span className="h-1 w-6 bg-[#DEC8FE]" />
              <span className="h-1 w-3 bg-[#FFD361]" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
