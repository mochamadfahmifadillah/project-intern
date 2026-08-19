interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function SectionLabel({
  children,
  dark = false,
}: SectionLabelProps) {
  return (
    <span
      className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${
        dark ? "text-blue-400" : "text-blue-600"
      }`}
    >
      {children}
    </span>
  );
}
