const statistics = [
  {
    value: "1,000+",
    label: "Software",
  },
  {
    value: "100+",
    label: "Categories",
  },
  {
    value: "10,000+",
    label: "Reviews",
  },
  {
    value: "500+",
    label: "Integrations",
  },
];

function Statistics() {
  return (
    <section className="border-b border-[#d9d5e5] py-9">
      <div className="mx-auto grid max-w-[1050px] grid-cols-2 md:grid-cols-4">
        {statistics.map((stat, index) => (
          <div
            key={stat.label}
            className={`
              py-2 text-center
              ${
                index !== statistics.length - 1
                  ? "border-r border-[#ddd9e5]"
                  : ""
              }
            `}
          >
            <p className="text-[30px] font-medium tracking-[-1px] text-[#6846e8]">
              {stat.value}
            </p>

            <p className="mt-1 text-[11px] font-semibold tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;