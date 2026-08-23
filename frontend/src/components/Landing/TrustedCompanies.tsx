const companies = [
  "tokopedia",
  "Bukalapak",
  "traveloka",
  "ruangguru",
  "J&T EXPRESS",
  "sociolla",
  "mekari",
  "BCA",
];

function TrustedCompanies() {
  return (
    <section className="px-5 pb-12 pt-3 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[11px] font-medium text-[#64748B]">
          Trusted by businesses worldwide
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {companies.map((company) => (
            <span
              key={company}
              className="text-sm font-semibold tracking-tight text-[#94A3B8] grayscale"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedCompanies;