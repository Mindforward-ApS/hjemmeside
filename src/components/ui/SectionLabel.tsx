// The small outlined label above a section heading (Marco 2026-11-23: the "Vores priser" pill is the standard for
// every section). Light text and border on dark sections.
export function SectionLabel({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex self-start rounded-full border px-3 py-1 text-[0.875rem] font-normal normal-case tracking-normal ${className}`} style={light ? { borderColor: "rgba(255,255,255,0.28)", color: "#fff" } : { borderColor: "#dcd7d3", color: "#0f0d0c" }}>
      {children}
    </span>
  );
}
