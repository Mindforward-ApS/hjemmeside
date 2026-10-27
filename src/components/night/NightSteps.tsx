import { copy } from "@/content/copy.da";

// Four numbered steps on glass cards, connected by a coral line on desktop.
export function NightSteps() {
  const s = copy.home.story;
  return (
    <section id="saadan-virker-det" className="relative py-24 md:py-32">
      <div className="container-wide">
        <div className="mx-auto max-w-[44rem] text-center">
          <span className="n-glass inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] text-heading">{s.label}</span>
          <h2 className="n-display mt-6" style={{ fontSize: "clamp(2rem, 1rem + 2.4vw, 3.25rem)" }}>{s.title}</h2>
        </div>
        <ol className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden className="absolute left-[12%] right-[12%] top-[2.6rem] hidden h-px bg-[linear-gradient(90deg,transparent,var(--coral),transparent)] lg:block" />
          {s.steps.map((step, i) => (
            <li key={step.title} className="n-glass relative rounded-[1.5rem] p-6">
              <span className="relative grid size-11 place-items-center rounded-full text-[0.9375rem] font-semibold text-white" style={{ background: "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))" }}>
                {i + 1}
              </span>
              <h3 className="mt-6 text-[1.125rem] font-medium text-heading">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
