import Link from "next/link";
import "./greb-btn.css";

// The "Tilmeld jer" pill (styles in greb-btn.css). Marco 2026-11-23: every orange button on the site uses it.
// Without href it renders a submit button (forms).
type Props = { href?: string; children: React.ReactNode; small?: boolean; onDark?: boolean; className?: string; disabled?: boolean };
export function GrebBtn({ href, children, small = false, onDark = false, className = "", disabled }: Props) {
  const cls = `greb-btn${small ? " greb-btn--small" : ""}${onDark ? " greb-btn--on-dark" : ""}${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="greb-btn__circle" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><path d="M6 14l8-8M7.5 6H14v6.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" /></svg>
      </span>
    </>
  );
  if (!href) return <button type="submit" disabled={disabled} className={cls}>{inner}</button>;
  return <Link href={href} className={cls}>{inner}</Link>;
}
