import { Globe } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Directory", "Compare", "Marketplace", "Reviews", "API"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Guides", "Documentation", "Community", "Changelog", "Status"],
  },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="bg-[#080F1E] px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* MAIN FOOTER */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* BRAND */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-white" />
              </div>

              <span className="font-semibold text-white text-sm">
                Software Empire
              </span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              A software discovery and decision platform for modern businesses.
            </p>
          </div>

          {/* FOOTER COLUMNS */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                {column.title}
              </h5>

              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Software Empire. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
