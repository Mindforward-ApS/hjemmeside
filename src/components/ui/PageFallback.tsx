// Skeleton shown only if a route's URL data isn't prerendered yet (instant navigation shell).
export function PageFallback() {
  return (
    <div className="container-wide pt-12 pb-24 md:pt-20" aria-busy="true" aria-label="Indlæser">
      <div className="h-4 w-32 animate-pulse rounded bg-surface-sunk" />
      <div className="mt-6 h-14 w-3/4 max-w-3xl animate-pulse rounded-[var(--r-md)] bg-surface-sunk" />
      <div className="mt-4 h-6 w-1/2 max-w-xl animate-pulse rounded bg-surface-sunk" />
    </div>
  );
}
