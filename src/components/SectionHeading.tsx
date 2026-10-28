interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  );
}
