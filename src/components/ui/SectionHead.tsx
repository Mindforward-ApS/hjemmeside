import type { ReactNode } from "react";

// Section heading. The label is optional on purpose: not every section gets one (anti-slop rule 3).
export function SectionHead({
  label,
  title,
  sub,
  align = "left",
  as: Tag = "h2",
  className = "",
  children,
}: {
  label?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`reveal ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {label && <p className="t-label mb-4">{label}</p>}
      <Tag className={Tag === "h1" ? "t-hero" : "t-display"}>{title}</Tag>
      {sub && <p className={`t-lead mt-5 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}>{sub}</p>}
      {children}
    </div>
  );
}
