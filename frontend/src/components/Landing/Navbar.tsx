import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  onNavigate: (id: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeMobile = () => {
    setMobileOpen(false);
  };

  // ============================================================
  // NAVIGATION
  // ============================================================

  const handleHome = () => {
    closeMobile();

    if (location.pathname === "/") {
      onNavigate("top");
      return;
    }

    navigate("/");
  };

  const handleDirectory = () => {
    closeMobile();
    navigate("/software-directory");
  };

  const handleCompare = () => {
    closeMobile();
    navigate("/software-comparison");
  };

  const handleSignIn = () => {
    closeMobile();
    navigate("/login");
  };

  // ============================================================
  // ACTIVE STATE
  // ============================================================

  const isHome = location.pathname === "/";
  const isDirectory = location.pathname.startsWith("/software-directory");
  const isCompare = location.pathname.startsWith("/software-comparison");

  // ============================================================
  // NAV ITEM CLASS
  // ============================================================

  const getNavItemClass = (active: boolean) => `
    relative
    rounded-lg
    px-4
    py-2
    text-sm
    font-medium
    transition-all
    duration-200
    ${
      active
        ? "bg-white/12 text-white"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }
  `;

  return (
    <nav
      className="
        fixed
        inset-x-0
        top-0
        z-50
        border-b
        backdrop-blur-xl
      "
      style={{
        backgroundColor: "rgba(112, 79, 230, 0.96)",
        borderColor: "rgba(255, 255, 255, 0.12)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* =====================================================
              LOGO
          ====================================================== */}

          <button
            type="button"
            onClick={handleHome}
            className="
              group
              flex
              items-center
              gap-2.5
              rounded-xl
              outline-none
              transition-opacity
              duration-200
              hover:opacity-90
              focus-visible:ring-2
              focus-visible:ring-white/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-transparent
            "
            aria-label="Software Empire - Home"
          >
            {/* Logo Mark */}

            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-xs
                font-black
                tracking-tight
                shadow-sm
                transition-transform
                duration-200
                group-hover:scale-105
              "
              style={{
                backgroundColor: "var(--accent-yellow)",
                color: "var(--primary-dark)",
              }}
            >
              SE
            </span>

            {/* Logo Text */}

            <span
              className="
                text-base
                font-bold
                tracking-tight
                text-white
                sm:text-lg
              "
            >
              Software Empire
            </span>
          </button>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <div className="hidden items-center gap-1 lg:flex">
            {/* Directory */}

            <button
              type="button"
              onClick={handleDirectory}
              className={getNavItemClass(isDirectory)}
              aria-current={isDirectory ? "page" : undefined}
            >
              Directory
            </button>

            {/* Compare */}

            <button
              type="button"
              onClick={handleCompare}
              className={getNavItemClass(isCompare)}
              aria-current={isCompare ? "page" : undefined}
            >
              Compare
            </button>
          </div>

          {/* =====================================================
              RIGHT ACTIONS
          ====================================================== */}

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={handleSignIn}
              className="
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-semibold
                outline-none
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:brightness-105
                active:translate-y-0
                focus-visible:ring-2
                focus-visible:ring-white/70
                focus-visible:ring-offset-2
                focus-visible:ring-offset-transparent
              "
              style={{
                backgroundColor: "var(--lavender)",
                color: "var(--primary-dark)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
              }}
            >
              Sign In
            </button>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="
              rounded-xl
              p-2.5
              text-white
              outline-none
              transition-all
              duration-200
              hover:bg-white/10
              focus-visible:ring-2
              focus-visible:ring-white/60
              lg:hidden
            "
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* =======================================================
          MOBILE MENU
      ======================================================== */}

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="
            border-t
            px-4
            py-4
            shadow-xl
            lg:hidden
          "
          style={{
            backgroundColor: "var(--primary-dark)",
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-1">
            {/* Directory */}

            <button
              type="button"
              onClick={handleDirectory}
              className={`
                w-full
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                  isDirectory
                    ? "bg-white/12 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
              aria-current={isDirectory ? "page" : undefined}
            >
              Directory
            </button>

            {/* Compare */}

            <button
              type="button"
              onClick={handleCompare}
              className={`
                w-full
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                  isCompare
                    ? "bg-white/12 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
              aria-current={isCompare ? "page" : undefined}
            >
              Compare
            </button>

            {/* Divider */}

            <div
              className="my-3 h-px"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            />

            {/* Sign In */}

            <button
              type="button"
              onClick={handleSignIn}
              className="
                w-full
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                outline-none
                transition-all
                duration-200
                hover:brightness-105
                active:scale-[0.99]
                focus-visible:ring-2
                focus-visible:ring-white/60
              "
              style={{
                backgroundColor: "var(--lavender)",
                color: "var(--primary-dark)",
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
