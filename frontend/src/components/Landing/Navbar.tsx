import { ChevronDown, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-[#E5EAF1] bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0D47A1] text-lg font-black text-white">
            S
          </div>

          <div className="leading-none">
            <div className="text-[13px] font-bold tracking-wide text-[#0F2A5A]">
              SOFTWARE
            </div>

            <div className="text-[13px] font-bold tracking-[3px] text-[#F5A623]">
              EMPIRE
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            to="/software-directory"
            className="flex items-center gap-1 text-[11px] font-medium text-[#17233C] hover:text-[#0D47A1]"
          >
            Software
            <ChevronDown size={12} />
          </Link>

          <Link
            to="/categories"
            className="text-[11px] font-medium text-[#17233C] hover:text-[#0D47A1]"
          >
            Categories
          </Link>

          <Link
            to="/software-comparison"
            className="text-[11px] font-medium text-[#17233C] hover:text-[#0D47A1]"
          >
            Compare
          </Link>

          <Link
            to="/recommendation"
            className="text-[11px] font-medium text-[#17233C] hover:text-[#0D47A1]"
          >
            Recommend
          </Link>

          <Link
            to="/learn"
            className="flex items-center gap-1 text-[11px] font-medium text-[#17233C]"
          >
            Learn
            <ChevronDown size={12} />
          </Link>

          <Link
            to="/vendors"
            className="text-[11px] font-medium text-[#17233C]"
          >
            For Vendors
          </Link>
        </nav>

        {/* Right */}
        <div className="hidden items-center gap-3 lg:flex">
          <button className="p-2 text-[#0F172A]">
            <Search size={17} />
          </button>

          <Link
            to="/login"
            className="rounded-md border border-[#DCE3EC] px-4 py-2 text-[11px] font-medium text-[#17233C]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-[#0D47A1] px-4 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-[#093A85]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile */}
        <button className="lg:hidden">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
