// Three versions of the photo band "Ét hold. Ingen teori for teoriens skyld." (Marco 2026-11-03). Same copy.
import Image from "next/image";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", cream: "#f7f2ee", peach: "#f6c9b6" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const wrap = "w-full px-5 sm:px-[3.5vw]";
const H = "Ét hold. Ingen teori for teoriens skyld.";
const P = "Korte lektioner, opgaver fra jeres egen hverdag og feedback med det samme.";

/* J · Kant til kant: the photo runs the full width with a giant headline across it. */
export function J() {
  return (
    <section className="relative h-[34rem] overflow-hidden sm:h-[42rem]" style={{ background: c.dark }}>
      <Image src="/img/unsplash/feedback.jpg" alt="Underviser forklarer ved en whiteboard" fill sizes="100vw" className="object-cover object-[70%_30%]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,22,19,0.15) 0%, rgba(32,22,19,0.35) 45%, rgba(32,22,19,0.92) 100%)" }} />
      <div className={`${wrap} absolute inset-x-0 bottom-0 pb-12 sm:pb-16`}>
        <h2 className={`${display} max-w-[18ch] text-[clamp(3.25rem,1.5rem+6vw,8rem)] !text-white`}>{H}</h2>
        <p className="mt-5 max-w-[30rem] text-[1.125rem] leading-relaxed text-white/80">{P}</p>
      </div>
    </section>
  );
}

/* K · Delt: the headline on cream to the left, a tall photo to the right with a small team chip. */
export function K() {
  return (
    <section style={{ background: c.cream }}>
      <div className={`${wrap} grid items-center gap-10 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-28`}>
        <div>
          <h2 className={`${display} max-w-[12ch] text-[clamp(3rem,1.8rem+3.6vw,5.5rem)]`} style={{ color: c.ink }}>{H}</h2>
          <p className="mt-6 max-w-[28rem] text-[1.125rem] leading-relaxed" style={{ color: c.muted }}>{P}</p>
        </div>
        <div className="relative h-[26rem] overflow-hidden rounded-[32px] sm:h-[34rem]">
          <Image src="/img/unsplash/team.jpg" alt="Et hold omkring en laptop" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-[16px] bg-white/95 p-3 pr-5 shadow-[0_20px_40px_-20px_rgba(32,22,19,0.5)] backdrop-blur">
            <div className="flex -space-x-2">
              {["/img/people/mette-krogh.webp", "/img/people/jonas-bak.webp", "/img/people/line-vestergaard.webp"].map((s) => <span key={s} className="relative size-9 overflow-hidden rounded-full ring-2 ring-white"><Image src={s} alt="" fill sizes="36px" className="object-cover object-top" /></span>)}
            </div>
            <div><p className="text-[0.875rem] font-semibold" style={{ color: c.ink }}>12 kolleger</p><p className="text-[0.75rem]" style={{ color: c.muted }}>lærer sammen</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* L · Tre fotos: a row of three photos of a working day, with the headline above them. */
export function L() {
  const photos = [
    { s: "/img/unsplash/team.jpg", t: "Lær sammen" },
    { s: "/img/unsplash/feedback.jpg", t: "Øv på rigtige opgaver" },
    { s: "/img/unsplash/whiteboard.jpg", t: "Få feedback med det samme" },
  ];
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className={wrap}>
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
          <h2 className={`${display} max-w-[16ch] text-[clamp(3rem,1.8rem+3.6vw,5.5rem)]`} style={{ color: c.ink }}>{H}</h2>
          <p className="max-w-[28rem] text-[1.125rem] leading-relaxed lg:justify-self-end" style={{ color: c.muted }}>{P}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-[1.3fr_1fr_1fr]">
          {photos.map((p) => (
            <figure key={p.t} className="group relative h-[22rem] overflow-hidden rounded-[28px] lg:h-[28rem]">
              <Image src={p.s} alt="" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201613]/70 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.8125rem] font-semibold" style={{ color: c.ink }}>{p.t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
