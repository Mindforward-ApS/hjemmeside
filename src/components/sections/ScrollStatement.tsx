import { copy } from "@/content/copy.da";

// A single statement whose words fill with colour as you scroll (CSS only; static without support).
export function ScrollStatement() {
  const words = copy.home.statement.split(" ");
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <p className="fill-words t-display mx-auto max-w-[1000px] text-center text-heading" style={{ fontSize: "clamp(2rem, 1.1rem + 3.4vw, 4rem)" }}>
          {words.map((w, i) => (
            <span key={i}>{w}{i < words.length - 1 ? " " : ""}</span>
          ))}
        </p>
        <p className="mt-6 text-center"><span className="ph inline-block t-small text-muted">{copy.home.statementSource}</span></p>
      </div>
    </section>
  );
}
