import type { HTMLAttributes } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleAttributes?: HTMLAttributes<HTMLHeadingElement>;
  descriptionAttributes?: HTMLAttributes<HTMLParagraphElement>;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  titleAttributes,
  descriptionAttributes,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2
        {...titleAttributes}
        className={`mt-2 text-3xl font-bold tracking-normal text-text md:text-4xl ${titleAttributes?.className ?? ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          {...descriptionAttributes}
          className={`mt-4 text-base leading-7 text-muted ${descriptionAttributes?.className ?? ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
