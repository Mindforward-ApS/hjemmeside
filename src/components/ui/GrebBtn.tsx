import Link from "next/link";
import "./greb-btn.css";

// The dark "Tilmeld jer" pill (styles in greb-btn.css).
export function GrebBtn({ href, children, small = false, onDark = false }: { href: string; children: React.ReactNode; small?: boolean; onDark?: boolean }) {
  return (
    <Link href={href} className={`greb-btn${small ? " greb-btn--small" : ""}${onDark ? " greb-btn--on-dark" : ""}`}>
      <span>{children}</span>
      <span className="greb-btn__circle" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><path d="M6 14l8-8M7.5 6H14v6.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" /></svg>
      </span>
    </Link>
  );
}
