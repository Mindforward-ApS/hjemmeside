// The product's own window chrome (not generic browser dots): Fjord mark + workspace name.
export function AppMark({ workspace = "Holm & Søn VVS" }: { workspace?: string }) {
  return (
    <span className="flex items-center gap-2" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M3 17c3 0 4-3 6-3s3 3 6 3 4-3 6-3" fill="none" stroke="var(--accent-500)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M3 11c3 0 4-3 6-3s3 3 6 3 4-3 6-3" fill="none" stroke="var(--heading)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="text-[0.75rem] font-semibold text-heading">{workspace}</span>
    </span>
  );
}
