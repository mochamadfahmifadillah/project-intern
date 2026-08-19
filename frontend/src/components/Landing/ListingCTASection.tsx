interface ListingCTASectionProps {
  onListSoftware: () => void;
}

export default function ListingCTASection({
  onListSoftware,
}: ListingCTASectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl bg-slate-900 px-8 py-12 sm:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            List your software on Software Empire
          </h2>

          <p className="max-w-xl mx-auto mt-4 text-sm sm:text-base text-slate-400">
            Reach 50,000+ business decision-makers actively searching for
            solutions like yours.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <button
              onClick={onListSoftware}
              className="px-5 py-2.5 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              List Your Software
            </button>

            <button className="px-5 py-2.5 border border-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
