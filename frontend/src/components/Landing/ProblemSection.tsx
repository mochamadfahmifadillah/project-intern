import {
  AlertCircle,
  Layers,
  TrendingUp,
  Zap,
} from "lucide-react";

import SectionLabel from "./SectionLabel";

const PROBLEMS = [
  {
    icon: Layers,
    number: "01",
    title: "Terlalu banyak pilihan",
    description:
      "Banyaknya pilihan software membuat bisnis kesulitan menentukan solusi yang benar-benar sesuai dengan kebutuhan.",
  },
  {
    icon: AlertCircle,
    number: "02",
    title: "Informasi tersebar",
    description:
      "Informasi mengenai fitur, harga, ulasan, dan integrasi sering kali tersebar di berbagai sumber.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Sulit menilai kecocokan",
    description:
      "Memilih software yang tidak sesuai dengan kebutuhan dan workflow dapat menambah kompleksitas operasional.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Risiko keputusan yang salah",
    description:
      "Keputusan software yang kurang tepat dapat membuang waktu, anggaran, dan sumber daya bisnis.",
  },
];

export default function ProblemSection() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        px-4
        py-24
        sm:px-6
        sm:py-28
        lg:px-8
        lg:py-32
      "
      style={{
        backgroundColor: "var(--primary)",
      }}
    >
      {/* Decorative Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          left-1/2
          h-[500px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          blur-[130px]
        "
        style={{
          backgroundColor: "var(--lavender)",
          opacity: 0.22,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-[400px]
          w-[400px]
          rounded-full
          blur-[120px]
        "
        style={{
          backgroundColor: "var(--lavender-soft)",
          opacity: 0.16,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <SectionLabel>Masalah yang Dihadapi</SectionLabel>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Memilih software seharusnya
            <span
              className="block"
              style={{
                color: "var(--lavender)",
              }}
            >
              tidak serumit ini.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              sm:text-base
            "
            style={{
              color: "rgba(255, 255, 255, 0.72)",
            }}
          >
            Bisnis membutuhkan cara yang lebih sederhana untuk menemukan,
            memahami, dan mengevaluasi software sebelum mengambil keputusan
            teknologi.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
                style={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Number */}
                <span
                  className="
                    absolute
                    right-5
                    top-5
                    text-xs
                    font-bold
                  "
                  style={{
                    color: "var(--lavender-soft)",
                  }}
                >
                  {problem.number}
                </span>

                {/* Icon */}
                <div
                  className="
                    mb-6
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    backgroundColor: "var(--lavender-soft)",
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{
                      color: "var(--primary)",
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-3
                    text-base
                    font-semibold
                  "
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  {problem.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    text-sm
                    leading-6
                  "
                  style={{
                    color: "#777777",
                  }}
                >
                  {problem.description}
                </p>

                {/* Bottom Accent */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-0
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                  style={{
                    backgroundColor: "var(--accent-yellow)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
