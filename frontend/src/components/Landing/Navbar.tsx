import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onNavigate: (id: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const handleHome = () => {
    closeMobile();
    onNavigate("top");
  };

  const handleDirectory = () => {
    closeMobile();
    navigate("/software-directory");
  };

  const handleCompare = () => {
    closeMobile();
    navigate("/software-comparison");
  };

  const handleAdmin = () => {
    closeMobile();
    navigate("/admin");
  };

  const handleSignIn = () => {
    closeMobile();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}

          <button
            type="button"
            onClick={handleHome}
            className="flex items-center"
          >
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Software Empire
            </span>
          </button>

          {/* DESKTOP */}

          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={handleDirectory}
              className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Directory
            </button>

            <button
              onClick={handleCompare}
              className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Compare
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleAdmin}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Admin
            </button>

            <button
              onClick={handleSignIn}
              className="text-sm font-medium text-slate-900"
            >
              Sign In
            </button>
          </div>

          {/* MOBILE */}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4">
          <div className="space-y-1">
            <button
              onClick={handleDirectory}
              className="w-full text-left px-3 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Directory
            </button>

            <button
              onClick={handleCompare}
              className="w-full text-left px-3 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Compare
            </button>

            <button
              onClick={handleAdmin}
              className="w-full text-left px-3 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Admin
            </button>

            <button
              onClick={handleSignIn}
              className="w-full text-left px-3 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
