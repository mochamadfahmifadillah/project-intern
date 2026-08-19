import { ArrowRight, ChevronRight, Search } from "lucide-react";

interface HeroSectionProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onCompare: () => void;
}

export default function HeroSection({
  value,
  onChange,
  onSearch,
  onCompare,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="bg-slate-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />

          <span className="text-xs text-slate-300 font-medium">
            Software discovery platform for modern businesses
          </span>
        </div>

        <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
          Find the right software
          <br />
          <span className="text-blue-400">for your business.</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover, compare, and understand software solutions so your business
          can make better technology decisions.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
          className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-5"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Search software, category, or feature..."
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-slate-900 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold text-sm"
          >
            Explore Software
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <button
          onClick={onCompare}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
        >
          Compare Software
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
