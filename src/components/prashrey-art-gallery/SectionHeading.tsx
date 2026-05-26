type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "text-center mx-auto"
      : "text-left";

  return (
    <div className={`max-w-3xl mb-16 ${alignment}`}>
      <p className="uppercase tracking-[0.35em] text-violet-300/60 text-xs mb-4">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-6xl font-black mb-5 bg-gradient-to-r from-violet-200/90 via-zinc-100 to-slate-300 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-zinc-500 text-lg leading-relaxed">{description}</p>
    </div>
  );
}
