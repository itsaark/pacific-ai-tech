type SectionHeadingProps = {
  eyebrow: string;
  children: React.ReactNode;
};

export function SectionHeading({ eyebrow, children }: SectionHeadingProps) {
  return (
    <div className="pat-section-head">
      <span className="pat-eyebrow">{eyebrow}</span>
      <div>{children}</div>
    </div>
  );
}
