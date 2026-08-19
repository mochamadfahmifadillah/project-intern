import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onNavigate: (id: string) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-blue-600">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Make smarter software decisions.
        </h2>

        <p className="text-blue-100 text-base mb-10 max-w-xl mx-auto">
          Discover and compare software solutions for your business with greater
          clarity and confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Explore Software */}
          <button
            type="button"
            onClick={() => onNavigate("directory")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Explore Software
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Compare Software */}
          <button
            type="button"
            onClick={() => onNavigate("directory")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-500 text-white border border-white/20 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-400 transition-colors"
          >
            Compare Software
          </button>
        </div>
      </div>
    </section>
  );
}
