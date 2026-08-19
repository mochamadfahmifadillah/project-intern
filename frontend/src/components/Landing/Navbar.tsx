import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const NAV_LINKS = [
  { label: "Products", target: "directory" },
  { label: "Categories", target: "categories" },
  { label: "Compare", target: "directory" },
  { label: "Pricing", target: "pricing" },
  { label: "Blog", target: "blog" },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (target: string) => {
    onNavigate(target);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <button
            type="button"
            onClick={() => handleNavigate("top")}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>

            <span className="font-semibold text-slate-900 text-sm">
              Software Empire
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className="text-sm text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign in
            </button>

            <button
              type="button"
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Get started
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50"
            onClick={() => setMobileOpen((value) => !value)}
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
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4">
          <div className="space-y-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className="block w-full text-left text-sm text-slate-600 py-2.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3">
            <button
              type="button"
              className="w-full text-sm bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
