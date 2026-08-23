import {
  BarChart3,
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  Menu,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 w-full border-b border-gray-200 bg-white">
      {/* =====================================================
          LOGO AREA
          Lebarnya sama dengan sidebar: 256px
      ====================================================== */}

      <div
        className="
          flex
          w-64
          shrink-0
          items-center
          border-r
          border-gray-200
          px-5
        "
      >
        <Link to="/dashboard" className="flex items-center gap-3">
          {/* Logo */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
            "
            style={{
              backgroundColor: "var(--accent-yellow)",
            }}
          >
            <BarChart3
              className="h-[18px] w-[18px]"
              style={{
                color: "var(--primary-dark)",
              }}
            />
          </div>

          {/* Brand */}

          <div>
            <p className="text-sm font-bold tracking-tight text-black">
              Software Empire
            </p>

            <p className="text-[10px] text-gray-400">Administration</p>
          </div>
        </Link>
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="flex min-w-0 flex-1 items-center">
        {/* Hamburger + Page */}

        <div className="flex shrink-0 items-center gap-2 px-4">
          <button
            type="button"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-black
            "
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <span className="text-sm font-semibold text-black">Dashboard</span>
        </div>

        {/* =================================================
            SEARCH
        ================================================== */}

        <div className="flex min-w-0 flex-1 justify-center px-4">
          <button
            type="button"
            className="
              flex
              h-9
              w-full
              max-w-xl
              items-center
              gap-3
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              px-3
              text-left
              transition
              hover:border-gray-300
              hover:bg-white
            "
          >
            <Search className="h-4 w-4 shrink-0 text-gray-400" />

            <span className="min-w-0 flex-1 truncate text-sm text-gray-400">
              Search software, vendors, users…
            </span>

            {/* Command K */}

            <span
              className="
                hidden
                shrink-0
                items-center
                gap-1
                rounded-md
                border
                border-gray-200
                bg-white
                px-1.5
                py-0.5
                text-[10px]
                font-medium
                text-gray-400
                shadow-sm
                sm:flex
              "
            >
              <Command className="h-3 w-3" />K
            </span>
          </button>
        </div>

        {/* =================================================
            RIGHT ACTIONS
        ================================================== */}

        <div className="flex shrink-0 items-center gap-1 px-4">
          {/* Notification */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-black
            "
          >
            <Bell className="h-[18px] w-[18px]" />

            <span
              className="
                absolute
                right-2
                top-1.5
                h-1.5
                w-1.5
                rounded-full
              "
              style={{
                backgroundColor: "var(--accent-yellow)",
              }}
            />
          </button>

          {/* Help */}

          <button
            type="button"
            aria-label="Help"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-black
            "
          >
            <CircleHelp className="h-[18px] w-[18px]" />
          </button>

          {/* Divider */}

          <div className="mx-2 h-6 w-px bg-gray-200" />

          {/* =================================================
              USER
          ================================================== */}

          <Link
            to="/profile"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              px-2
              py-1.5
              transition
              hover:bg-gray-50
            "
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                text-xs
                font-bold
              "
              style={{
                backgroundColor: "var(--accent-yellow)",
                color: "var(--primary-dark)",
              }}
            >
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>

            {/* Name + Status */}

            <div className="hidden min-w-0 text-left md:block">
              <p className="max-w-28 truncate text-xs font-semibold text-black">
                {user?.name || "User"}
              </p>

              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[10px] text-gray-500">Active</span>
              </div>
            </div>

            {/* Chevron */}

            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
