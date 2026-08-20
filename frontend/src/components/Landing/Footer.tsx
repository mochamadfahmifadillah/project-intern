import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const productLinks = [
  {
    label: "Software Directory",
    to: "/software-directory",
  },
  {
    label: "Categories",
    href: "#categories",
  },
  {
    label: "Compare Software",
    to: "/software-comparison",
  },
];

const businessLinks = [
  {
    label: "Vendors",
    href: "#vendors",
  },
  {
    label: "List Your Software",
    href: "#vendors",
  },
  {
    label: "Partner With Us",
    href: "#contact",
  },
];

const companyLinks = [
  {
    label: "Resources",
    href: "#resources",
  },
  {
    label: "Contact",
    href: "#contact",
  },
  {
    label: "About",
    href: "#about",
  },
];

function Footer() {
  return (
    <footer
      id="resources"
      className="border-t border-white/10 bg-[#18151F] text-white"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* MAIN */}
        <div className="grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-16">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Software Empire Home"
            >
              {/* Logo */}
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute h-2 w-2 rounded-full bg-[#704FE6]" />
                <div className="absolute h-5 w-1 rounded-full bg-[#704FE6]" />
                <div className="absolute h-1 w-5 rounded-full bg-[#FFD361]" />
              </div>

              <span className="text-[20px] font-semibold tracking-[-0.5px]">
                Software Empire
              </span>
            </Link>

            <p className="mt-6 max-w-[340px] text-[14px] leading-7 text-white/50">
              Discover, evaluate, and compare business software in one place.
            </p>

            <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-white/25">
              Software Intelligence Platform
            </p>
          </div>

          {/* PRODUCT */}
          <FooterColumn title="Product">
            {productLinks.map((item) =>
              item.to ? (
                <FooterLink key={item.label} to={item.to}>
                  {item.label}
                </FooterLink>
              ) : (
                <FooterAnchor key={item.label} href={item.href!}>
                  {item.label}
                </FooterAnchor>
              ),
            )}
          </FooterColumn>

          {/* BUSINESS */}
          <FooterColumn title="For Business">
            {businessLinks.map((item) => (
              <FooterAnchor key={item.label} href={item.href}>
                {item.label}
              </FooterAnchor>
            ))}
          </FooterColumn>

          {/* COMPANY */}
          <FooterColumn title="Company">
            {companyLinks.map((item) => (
              <FooterAnchor key={item.label} href={item.href}>
                {item.label}
              </FooterAnchor>
            ))}
          </FooterColumn>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/30">© 2026 Software Empire</p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-[12px] text-white/35 transition-colors hover:text-white/80"
            >
              Privacy
            </a>

            <a
              href="#terms"
              className="text-[12px] text-white/35 transition-colors hover:text-white/80"
            >
              Terms
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/45 transition-colors hover:text-[#DEC8FE]"
            >
              Contact
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* BRAND COLOR */}
      <div className="h-1 bg-[#704FE6]" />
    </footer>
  );
}

/*
|--------------------------------------------------------------------------
| Footer Column
|--------------------------------------------------------------------------
*/

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
        {title}
      </h3>

      <nav className="mt-6 flex flex-col items-start gap-4">{children}</nav>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Footer Link
|--------------------------------------------------------------------------
*/

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center text-[13px] text-white/60 transition-colors hover:text-white"
    >
      {children}

      <ArrowUpRight
        size={13}
        className="ml-1 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
      />
    </Link>
  );
}

/*
|--------------------------------------------------------------------------
| Footer Anchor
|--------------------------------------------------------------------------
*/

function FooterAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center text-[13px] text-white/60 transition-colors hover:text-white"
    >
      {children}

      <ArrowUpRight
        size={13}
        className="ml-1 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
      />
    </a>
  );
}

export default Footer;
