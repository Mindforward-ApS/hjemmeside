// Breaks a multi-sentence headline at sentence boundaries, so a line never ends on the next sentence's first word.
export function SentenceLines({ text }: { text: string }) {
  const parts = text.split(/(?<=[.!?])\s+/);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className="block">{p}</span>
      ))}
    </>
  );
}
