import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block leading-none">
              <p className="text-lg font-bold tracking-tight text-[#0D47A1]">
                SOFTWARE
              </p>

              <p className="mt-0.5 text-lg font-bold tracking-[0.2em] text-[#F5A623]">
                EMPIRE
              </p>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-[#64748B]">
              Discover, compare, and choose the right software for your
              business.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Product</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/software-directory"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Software Directory
              </Link>

              <Link
                to="/compare"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Compare Software
              </Link>

              <Link
                to="/recommendation"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Recommendations
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Company</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/about"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Contact
              </Link>

              <Link
                to="/vendors"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                For Vendors
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Resources</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/blog"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Blog
              </Link>

              <Link
                to="/help"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Help Center
              </Link>

              <Link
                to="/privacy"
                className="text-sm text-[#64748B] hover:text-[#0D47A1]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E2E8F0] pt-6">
          <p className="text-center text-xs text-[#94A3B8]">
            © 2026 Software Empire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
