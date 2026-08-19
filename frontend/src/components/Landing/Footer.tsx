interface FooterProps {
  onNavigate: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* BRAND */}

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-slate-900">Software Empire</h3>

            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Indonesia's premier B2B software discovery platform for modern
              businesses.
            </p>
          </div>

          {/* PLATFORM */}

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Platform
            </h4>

            <div className="space-y-3 text-sm text-slate-500">
              <button
                onClick={() => onNavigate("directory")}
                className="block hover:text-slate-900"
              >
                Directory
              </button>

              <button className="block hover:text-slate-900">Compare</button>

              <button className="block hover:text-slate-900">Reviews</button>

              <button
                onClick={() => onNavigate("categories")}
                className="block hover:text-slate-900"
              >
                Categories
              </button>
            </div>
          </div>

          {/* COMPANY */}

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Company
            </h4>

            <div className="space-y-3 text-sm text-slate-500">
              <button className="block hover:text-slate-900">About Us</button>
              <button className="block hover:text-slate-900">Blog</button>
              <button className="block hover:text-slate-900">Careers</button>
              <button className="block hover:text-slate-900">Press</button>
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Support
            </h4>

            <div className="space-y-3 text-sm text-slate-500">
              <button className="block hover:text-slate-900">
                Help Center
              </button>
              <button className="block hover:text-slate-900">Contact</button>
              <button className="block hover:text-slate-900">Terms</button>
              <button className="block hover:text-slate-900">Privacy</button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            © 2024 Software Empire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
