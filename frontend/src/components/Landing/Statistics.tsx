const statistics = [
  {
    value: "1,000+",
    label: "Software",
    background: "#704FE6",
    text: "#FFFFFF",
    border: "#704FE6",
  },
  {
    value: "100+",
    label: "Categories",
    background: "#DEC8FE",
    text: "#18161D",
    border: "#DEC8FE",
  },
  {
    value: "10,000+",
    label: "Reviews",
    background: "#6F4FDE",
    text: "#FFFFFF",
    border: "#6F4FDE",
  },
  {
    value: "500+",
    label: "Integrations",
    background: "#FFD361",
    text: "#18161D",
    border: "#FFD361",
  },
];

function Statistics() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid overflow-hidden border border-[#e5e2eb] sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: stat.background,
                color: stat.text,
                borderColor: stat.border,
              }}
              className="
                flex min-h-[180px]
                flex-col justify-center
                px-8 py-8
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_35px_rgba(30,20,70,0.12)]
              "
            >
              <p className="text-[42px] font-semibold leading-none tracking-[-1.8px] md:text-[46px]">
                {stat.value}
              </p>

              <p className="mt-4 text-[13px] font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
