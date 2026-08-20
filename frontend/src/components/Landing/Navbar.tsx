import { Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="border-b border-[#d9d5e5] bg-white">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-7 w-7 items-center justify-center">
            <div className="absolute h-2 w-2 rounded-full bg-[#6846e8]" />
            <div className="absolute h-5 w-1 rounded-full bg-[#6846e8]" />
            <div className="absolute h-1 w-5 rounded-full bg-[#6846e8]" />
          </div>

          <span className="text-[22px] font-bold tracking-[-0.5px]">
            Software Empire
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#directory"
            className="text-[13px] font-medium tracking-wide text-[#222]"
          >
            Software Directory
          </a>

          <a
            href="#categories"
            className="text-[13px] font-medium tracking-wide text-[#222]"
          >
            Categories
          </a>

          <a
            href="#compare"
            className="text-[13px] font-medium tracking-wide text-[#222]"
          >
            Compare
          </a>

          <a
            href="#vendors"
            className="text-[13px] font-medium tracking-wide text-[#222]"
          >
            Vendors
          </a>

          <a
            href="#resources"
            className="text-[13px] font-medium tracking-wide text-[#222]"
          >
            Resources
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button className="hidden text-[13px] font-medium md:block">
            Login
          </button>

          <button className="bg-[#6846e8] px-6 py-3 text-[13px] font-semibold tracking-wide text-white transition hover:bg-[#5938d5]">
            Find Software
          </button>

          <button className="lg:hidden">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
