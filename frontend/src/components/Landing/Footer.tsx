function Footer() {
  return (
    <footer id="resources" className="bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-8 py-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-[20px] font-bold">Software Empire</h2>

          <p className="mt-5 max-w-[250px] text-[13px] leading-5 text-[#4f4a5b]">
            © 2024 Software Empire. High-density
            <br />
            B2B SaaS Discovery.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-[12px] font-semibold tracking-wide">Product</h3>

          <div className="mt-5 space-y-3">
            <a
              href="#directory"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              Software Directory
            </a>

            <a
              href="#categories"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              Categories
            </a>

            <a
              href="#compare"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              Compare
            </a>
          </div>
        </div>

        {/* Business */}
        <div id="vendors">
          <h3 className="text-[12px] font-semibold tracking-wide">
            For Business
          </h3>

          <div className="mt-5 space-y-3">
            <a
              href="#vendors"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              Vendors
            </a>

            <a
              href="#vendors"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              List Your Software
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[12px] font-semibold tracking-wide">Company</h3>

          <div className="mt-5 space-y-3">
            <a
              href="#resources"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              Resources
            </a>

            <a
              href="#contact"
              className="block text-[13px] text-[#4f4a5b] hover:text-[#6846e8]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
