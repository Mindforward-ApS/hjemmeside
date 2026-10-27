import { copy } from "@/content/copy.da";
import { HorizontalPin } from "@/components/motion/HorizontalPin";
import { ProductScreen } from "@/components/product/ProductScreen";

// Platform: the 4 steps as a sideways journey (signature C).
export function StepsJourney() {
  const s = copy.home.story;
  return (
    <HorizontalPin label={s.label} title={s.title} id="saadan-virker-det">
      {s.steps.map((step, i) => (
        <li key={step.title} className="hp-panel relative grid shrink-0 gap-8 lg:w-[min(1000px,72vw)] lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <span aria-hidden className="hp-num pointer-events-none absolute -top-8 left-0 font-display text-[8rem] font-extrabold leading-none text-transparent lg:-top-28 lg:text-[15rem]" style={{ WebkitTextStroke: "1.5px var(--border-strong)" }}>
            0{i + 1}
          </span>
          <div className="relative pt-20 lg:pb-8 lg:pt-0">
            <p className="tnum t-small font-semibold text-accent">Trin {i + 1} af {s.steps.length}</p>
            <h3 className="t-h3 mt-2">{step.title}</h3>
            <p className="mt-3 max-w-xs t-body text-muted">{step.body}</p>
          </div>
          <div className="hp-rise light-scope relative">
            <ProductScreen stage={i as 0 | 1 | 2 | 3} />
          </div>
        </li>
      ))}
    </HorizontalPin>
  );
}
