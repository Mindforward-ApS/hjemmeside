"use client";

// Hero editor (Marco 2026-11-02): pick a screen size, drag and resize every element of the new hero, add your own
// cards and images. Each screen size has its own layout. Autosaves in this browser; "Gem" writes
// design/hero-layout.json (dev only) so Claude can build the real page from it.
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { DemoLogo, demoLogos } from "@/components/night/DemoLogos";

const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6" };
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";

type Kind = "heading" | "text" | "buttons" | "tools" | "holdet" | "score" | "personcard" | "person" | "logos" | "card" | "image";
type El = {
  id: string; kind: Kind; x: number; y: number; w: number; h?: number; z: number;
  text?: string; title?: string; body?: string; tone?: "hvid" | "fersken" | "brun" | "koral"; src?: string; fit?: "cover" | "contain"; radius?: number;
};
type Size = { id: string; label: string; w: number; h: number };
const sizes: Size[] = [
  { id: "mobil", label: "Mobil", w: 390, h: 844 },
  { id: "tablet", label: "Tablet", w: 768, h: 1024 },
  { id: "laptop", label: "Laptop", w: 1440, h: 900 },
  { id: "stor", label: "Stor skærm", w: 1920, h: 1080 },
];

const names: Record<Kind, string> = {
  heading: "Overskrift", text: "Tekst", buttons: "Knapper", tools: "AI-værktøjer", holdet: "Holdet", score: "Holdets score",
  personcard: "Hendes kort", person: "Hende", logos: "Logobånd", card: "Kort", image: "Billede",
};
const heights: Partial<Record<Kind, boolean>> = { holdet: true, score: true, personcard: true, card: true, image: true };

// Default layout measured from /preview/ny-forside at 1440×900; other sizes start as a scaled copy (mobile stacked).
const base: El[] = [
  { id: "heading", kind: "heading", x: 94, y: 160, w: 500, z: 2, text: "AI-kurser med\nveludviklet\nøvemiljø" },
  { id: "text", kind: "text", x: 94, y: 465, w: 420, z: 2, text: "Korte lektioner på dansk, opgaver i øvemiljøet med score og overblik for hele teamet." },
  { id: "buttons", kind: "buttons", x: 94, y: 553, w: 380, z: 2 },
  { id: "tools", kind: "tools", x: 94, y: 655, w: 400, z: 2 },
  { id: "personcard", kind: "personcard", x: 845, y: 383, w: 502, h: 372, z: 3 },
  { id: "holdet", kind: "holdet", x: 845, y: 115, w: 243, h: 253, z: 4 },
  { id: "score", kind: "score", x: 1103, y: 115, w: 243, h: 253, z: 4 },
  { id: "person", kind: "person", x: 940, y: 288, w: 400, z: 5 },
  { id: "logos", kind: "logos", x: 94, y: 795, w: 1252, z: 2 },
];
function defaults(s: Size): El[] {
  if (s.id === "laptop") return base.map((e) => ({ ...e }));
  if (s.id === "mobil") {
    return [
      { ...base[0], x: 20, y: 104, w: 330 },
      { ...base[1], x: 20, y: 292, w: 350 },
      { ...base[2], x: 20, y: 392, w: 350 },
      { ...base[3], x: 20, y: 528, w: 350 },
      { ...base[4], x: 20, y: 820, w: 350, h: 270 },
      { ...base[5], x: 20, y: 650, w: 170, h: 160 },
      { ...base[6], x: 200, y: 650, w: 170, h: 160 },
      { ...base[7], x: 95, y: 760, w: 260 },
      { ...base[8], x: 20, y: 1120, w: 350 },
    ];
  }
  const fx = s.w / 1440, fy = s.h / 900;
  return base.map((e) => ({ ...e, x: Math.round(e.x * fx), y: Math.round(e.y * fy), w: Math.round(e.w * fx), h: e.h ? Math.round(e.h * fx) : undefined }));
}

const library = [
  { src: "/img/leder-cut.webp", label: "Leder (fritlagt)", fit: "contain" as const },
  { src: "/img/unsplash/whiteboard-cut.webp", label: "Whiteboard-kvinde (fritlagt)", fit: "contain" as const },
  { src: "/img/unsplash/whiteboard.jpg", label: "Whiteboard-kvinde", fit: "cover" as const },
  { src: "/img/unsplash/feedback.jpg", label: "Undervisning", fit: "cover" as const },
  { src: "/img/unsplash/team.jpg", label: "Hold ved laptop", fit: "cover" as const },
  { src: "/img/unsplash/dokk1.jpg", label: "DOKK1", fit: "cover" as const },
  { src: "/img/team3.webp", label: "Team (fritlagt)", fit: "contain" as const },
];

const KEY = "hero-editor-v1";
type Store = Record<string, El[]>;

/* ───────────── element renders (same look as the hero) ───────────── */
const avatars = ["/img/people/mette-krogh.webp", "/img/people/jonas-bak.webp", "/img/people/line-vestergaard.webp"];
const cardCls = "rounded-[4cqi] bg-white shadow-[0_40px_80px_-36px_rgba(0,0,0,0.6),0_2px_6px_rgba(32,22,19,0.08)]";

function Holdet() {
  const team = [["Sofie Lund", 86, true], ["Mads Holm", 84, false], ["Ida Brandt", 79, false]] as const;
  return (
    <div className="@container size-full">
      <div className={`flex size-full flex-col px-[9cqi] pt-[8cqi] ${cardCls}`} style={{ borderRadius: "8cqi" }}>
        <div className="flex items-center justify-between"><p className="text-[6.2cqi] font-semibold" style={{ color: c.ink }}>Holdet</p><span className="flex items-center gap-[2cqi] text-[4.6cqi]" style={{ color: c.muted }}><span className="size-[3cqi] rounded-full" style={{ background: "#3aa66b" }} />Live</span></div>
        <ul className="mt-[6cqi] grid gap-[5.2cqi]">
          {team.map(([n, v, me], k) => (
            <li key={n} className="flex items-center gap-[4cqi]">
              <span className={`relative size-[12cqi] shrink-0 overflow-hidden rounded-full ${me ? "ring-[0.9cqi] ring-[#e8664a] ring-offset-[0.9cqi] ring-offset-white" : ""}`}><Image src={avatars[k]} alt="" fill sizes="40px" className="object-cover object-top" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between"><p className="truncate text-[5.2cqi] font-semibold" style={{ color: c.ink }}>{n}</p><span className="text-[5.6cqi] font-semibold" style={{ color: me ? c.coral : c.ink }}>{v}</span></div>
                <div className="mt-[1.8cqi] h-[1.8cqi] overflow-hidden rounded-full bg-[#f1ebe6]"><div className="h-full rounded-full" style={{ width: `${v}%`, background: me ? c.coral : "#d9c9c0" }} /></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Score() {
  const pts = [48, 55, 61, 66, 74, 86].map((v, k) => `${k * 60},${90 - ((v - 40) / 60) * 90}`).join(" ");
  return (
    <div className="@container size-full">
      <div className={`flex size-full flex-col px-[9cqi] pt-[8cqi] ${cardCls}`} style={{ borderRadius: "8cqi" }}>
        <div className="flex items-center justify-between"><p className="whitespace-nowrap text-[6.2cqi] font-semibold" style={{ color: c.ink }}>Holdets score</p><span className="rounded-full px-[2.8cqi] py-[0.8cqi] text-[4.2cqi] font-semibold" style={{ background: c.coralSoft, color: "#b8432a" }}>▲ +38</span></div>
        <p className="mt-[3cqi] text-[17cqi] font-semibold leading-none tracking-[-0.04em]" style={{ color: c.ink }}>86<span className="ml-[1.6cqi] text-[5.2cqi] font-medium tracking-normal" style={{ color: c.muted }}>/ 100</span></p>
        <svg viewBox="-6 -10 312 110" preserveAspectRatio="none" className="mt-[5cqi] h-[18cqi] w-full overflow-visible" aria-hidden>
          <polygon points={`0,90 ${pts} 300,90`} fill="rgba(232,102,74,0.15)" />
          <polyline points={pts} fill="none" stroke={c.coral} strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <div className="mt-[2cqi] flex justify-between text-[4.2cqi]" style={{ color: c.muted }}>{["Uge 1", "2", "3", "4", "5", "Nu"].map((u) => <span key={u}>{u}</span>)}</div>
      </div>
    </div>
  );
}

const tones = { hvid: { bg: "#ffffff", ink: c.ink, sub: c.muted }, fersken: { bg: "#fde6db", ink: c.ink, sub: c.muted }, brun: { bg: "linear-gradient(150deg,#8a4e3b,#5c3328)", ink: "#fff", sub: "rgba(255,255,255,0.7)" }, koral: { bg: c.coral, ink: c.ink, sub: "rgba(32,22,19,0.75)" } };

function Render({ el, editing, onText }: { el: El; editing: boolean; onText: (patch: Partial<El>) => void }) {
  const editable = (key: "text" | "title" | "body", value: string, cls: string, style?: React.CSSProperties) => (
    <div
      className={`${cls} ${editing ? "cursor-text rounded outline outline-2 outline-[#e8664a]/70" : ""}`}
      style={{ ...style, whiteSpace: "pre-line" }}
      contentEditable={editing}
      suppressContentEditableWarning
      onBlur={(e) => onText({ [key]: (e.currentTarget as HTMLElement).innerText })}
      onPointerDown={(e) => { if (editing) e.stopPropagation(); }}
    >{value}</div>
  );
  switch (el.kind) {
    case "heading": return editable("text", el.text ?? "", `${display} text-white`, { fontSize: el.w * 0.172 });
    case "text": return editable("text", el.text ?? "", "text-[1.0625rem] leading-relaxed text-white/75");
    case "buttons": return (
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold" style={{ background: c.coral, color: c.ink }}>Start et kursus <Icon name="arrowRight" size={16} /></span>
        <span className="inline-flex h-12 items-center gap-3 rounded-full bg-white pl-1.5 pr-6 text-[0.9375rem] font-medium" style={{ color: c.ink }}><span className="grid size-9 place-items-center rounded-full text-white" style={{ background: c.dark }}><Icon name="play" size={14} /></span>Se en lektion</span>
      </div>
    );
    case "tools": return (
      <div><p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/55">Du træner i</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">{[["ChatGPT", "/logos/chatgpt.png"], ["Copilot", "/logos/copilot.png"], ["Claude", "/logos/claude.png"]].map(([n, s]) => <li key={n} className="flex items-center gap-2.5 text-[1.125rem] font-semibold text-white/90"><Image src={s} alt="" width={28} height={28} className="size-7 rounded-[8px]" />{n}</li>)}</ul></div>
    );
    case "holdet": return <Holdet />;
    case "score": return <Score />;
    case "personcard": return (
      <div className="relative size-full overflow-hidden" style={{ borderRadius: Math.min(40, el.w * 0.05), background: "linear-gradient(160deg,#fff4ee 0%,#f3d6c8 100%)" }}>
        <div className="absolute left-1/2 top-[30%] aspect-square w-[62%] -translate-x-1/2 rounded-full border-[12px] border-white/55" />
        <div className="absolute left-1/2 top-[30%] aspect-square w-[96%] -translate-x-1/2 rounded-full border border-white/70" />
        <span className="absolute right-[7%] top-[30%] size-3 rounded-full" style={{ background: c.coral }} />
      </div>
    );
    case "person": return <Image src="/img/leder-cut.webp" alt="" width={1189} height={1400} draggable={false} className="h-auto w-full select-none" />;
    case "logos": return (
      <div>
        <div className="flex items-center gap-4"><p className="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/55">Virksomheder, der træner AI med os</p><span className="h-px flex-1 bg-white/10" /></div>
        <div className="mt-5 flex items-center gap-16 overflow-hidden text-white/60 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" style={{ ["--bg" as string]: c.dark }}>{demoLogos.map((l) => <DemoLogo key={l.name} logo={l} />)}</div>
      </div>
    );
    case "card": {
      const t = tones[el.tone ?? "hvid"];
      return (
        <div className="size-full p-[clamp(14px,8%,32px)] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.6)]" style={{ background: t.bg, borderRadius: el.radius ?? 24 }}>
          {editable("title", el.title ?? "", "text-[clamp(16px,1.6vw,26px)] font-semibold leading-snug", { color: t.ink })}
          {editable("body", el.body ?? "", "mt-2 text-[15px] leading-relaxed", { color: t.sub })}
        </div>
      );
    }
    case "image": return (
      // eslint-disable-next-line @next/next/no-img-element -- user-uploaded images of unknown size
      <img src={el.src} alt="" draggable={false} className="size-full select-none" style={{ objectFit: el.fit ?? "cover", borderRadius: el.fit === "contain" ? 0 : el.radius ?? 24 }} />
    );
  }
}

/* ───────────── editor ───────────── */
const subscribeNoop = () => () => {};

export function HeroEditor() {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [sizeId, setSizeId] = useState("laptop");
  const size = sizes.find((s) => s.id === sizeId)!;
  const [store, setStore] = useState<Store>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store; } catch { return {}; }
  });
  const els = store[sizeId] ?? defaults(size);
  const [sel, setSel] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const history = useRef<Store[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  // Fit the stage to the available width.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, (el.clientWidth - 48) / size.w));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size.w]);

  // Autosave in this browser.
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* private mode */ } }, [store]);

  const commit = (next: El[], snapshot = true) => {
    if (snapshot) history.current = [...history.current.slice(-40), store];
    setStore((s) => ({ ...s, [sizeId]: next }));
  };
  const patch = (id: string, p: Partial<El>, snapshot = false) => commit(els.map((e) => (e.id === id ? { ...e, ...p } : e)), snapshot);
  const undo = () => { const prev = history.current.pop(); if (prev) setStore(prev); };
  const selected = els.find((e) => e.id === sel) ?? null;

  // Drag and resize
  const drag = useRef<{ id: string; mode: "move" | "resize"; sx: number; sy: number; ox: number; oy: number; ow: number; oh: number } | null>(null);
  const start = (e: React.PointerEvent, el: El, mode: "move" | "resize") => {
    if (editing === el.id) return;
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    history.current = [...history.current.slice(-40), store];
    const rect = (e.currentTarget.closest("[data-el]") as HTMLElement).getBoundingClientRect();
    drag.current = { id: el.id, mode, sx: e.clientX, sy: e.clientY, ox: el.x, oy: el.y, ow: el.w, oh: el.h ?? rect.height / scale };
    setSel(el.id);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.sx) / scale, dy = (e.clientY - d.sy) / scale;
    const snap = (v: number) => (e.altKey ? Math.round(v) : Math.round(v / 4) * 4);
    if (d.mode === "move") {
      let x = snap(d.ox + dx);
      const el = els.find((x) => x.id === d.id);
      if (el && Math.abs(x + el.w / 2 - size.w / 2) < 8) x = Math.round(size.w / 2 - el.w / 2); // snap to centre
      patch(d.id, { x, y: snap(d.oy + dy) });
    } else {
      const el = els.find((x) => x.id === d.id)!;
      const w = Math.max(40, snap(d.ow + dx));
      if (heights[el.kind]) {
        const h = Math.max(40, snap(d.oh + dy));
        patch(d.id, e.shiftKey ? { w, h: Math.round((w * d.oh) / d.ow) } : { w, h });
      } else patch(d.id, { w });
    }
  };
  const end = () => { drag.current = null; };

  // Keyboard: arrows nudge, Delete removes, Cmd/Ctrl+Z undo, Escape deselects.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (editing) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") { e.preventDefault(); undo(); return; }
      if (!sel) return;
      const el = els.find((x) => x.id === sel);
      if (!el) return;
      const step = e.shiftKey ? 10 : 1;
      const map: Record<string, Partial<El>> = { ArrowLeft: { x: el.x - step }, ArrowRight: { x: el.x + step }, ArrowUp: { y: el.y - step }, ArrowDown: { y: el.y + step } };
      if (map[e.key]) { e.preventDefault(); patch(el.id, map[e.key], true); }
      if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); commit(els.filter((x) => x.id !== el.id)); setSel(null); }
      if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const nextZ = () => Math.max(0, ...els.map((e) => e.z)) + 1;
  const addCard = () => {
    const id = `card-${Date.now().toString(36)}`;
    commit([...els, { id, kind: "card", x: Math.round(size.w / 2 - 140), y: Math.round(size.h / 2 - 90), w: 280, h: 180, z: nextZ(), tone: "hvid", title: "Ny overskrift", body: "Dobbeltklik for at skrive.", radius: 24 }]);
    setSel(id);
  };
  const addImage = (src: string, fit: "cover" | "contain" = "cover") => {
    const id = `img-${Date.now().toString(36)}`;
    commit([...els, { id, kind: "image", x: Math.round(size.w / 2 - 160), y: Math.round(size.h / 2 - 120), w: 320, h: 240, z: nextZ(), src, fit, radius: 24 }]);
    setSel(id);
  };
  const upload = async (f: File) => {
    setStatus("Uploader …");
    const fd = new FormData(); fd.append("file", f);
    try {
      const r = await fetch("/api/editor-upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Upload fejlede");
      addImage(j.src); setStatus("Billede tilføjet");
    } catch (err) { setStatus(err instanceof Error ? err.message : "Upload fejlede"); }
  };
  const save = async () => {
    setStatus("Gemmer …");
    try {
      const full: Store = Object.fromEntries(sizes.map((s) => [s.id, store[s.id] ?? defaults(s)]));
      const r = await fetch("/api/hero-layout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ savedAt: new Date().toISOString(), sizes: sizes.map(({ id, w, h }) => ({ id, w, h })), layouts: full }) });
      setStatus(r.ok ? "Gemt. Claude kan nu læse dit layout." : "Kunne ikke gemme");
    } catch { setStatus("Kunne ikke gemme"); }
  };
  const reset = () => { commit(defaults(size)); setSel(null); setStatus(`${size.label} er nulstillet`); };
  const copyFrom = (from: string) => { const src = store[from] ?? defaults(sizes.find((s) => s.id === from)!); const f = size.w / sizes.find((s) => s.id === from)!.w; commit(src.map((e) => ({ ...e, x: Math.round(e.x * f), y: Math.round(e.y * f), w: Math.round(e.w * f), h: e.h ? Math.round(e.h * f) : undefined }))); setStatus("Kopieret"); };

  const stageH = Math.max(size.h, ...els.map((e) => e.y + (e.h ?? 300) + 40));
  const btn = "inline-flex h-9 items-center gap-2 rounded-[10px] px-3 text-[0.8125rem] font-medium transition-colors";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#14100e] text-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="mr-2 text-[0.875rem] font-semibold">Hero-editor</span>
        <div className="flex rounded-[12px] bg-white/[0.06] p-1">
          {sizes.map((s) => (
            <button key={s.id} type="button" onClick={() => { setSizeId(s.id); setSel(null); setEditing(null); }} className={`${btn} ${s.id === sizeId ? "bg-white text-[#201613]" : "text-white/75 hover:bg-white/10"}`}>
              {s.label} <span className="text-[0.6875rem] opacity-60">{s.w}×{s.h}</span>
            </button>
          ))}
        </div>
        <span className="mx-1 h-6 w-px bg-white/10" />
        <button type="button" onClick={addCard} className={`${btn} bg-white/[0.06] hover:bg-white/10`}><Icon name="plus" size={14} /> Kort</button>
        <button type="button" onClick={() => fileRef.current?.click()} className={`${btn} bg-white/[0.06] hover:bg-white/10`}><Icon name="plus" size={14} /> Upload billede</button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
        <select aria-label="Tilføj billede fra biblioteket" value="" onChange={(e) => { const it = library.find((l) => l.src === e.target.value); if (it) addImage(it.src, it.fit); }} className="h-9 rounded-[10px] bg-white/[0.06] px-2 text-[0.8125rem] text-white">
          <option value="" disabled>+ Billede fra biblioteket</option>
          {library.map((l) => <option key={l.src} value={l.src} className="text-black">{l.label}</option>)}
        </select>
        <span className="mx-1 h-6 w-px bg-white/10" />
        <button type="button" onClick={undo} className={`${btn} text-white/75 hover:bg-white/10`}>Fortryd</button>
        <select aria-label="Kopiér layout fra" value="" onChange={(e) => e.target.value && copyFrom(e.target.value)} className="h-9 rounded-[10px] bg-white/[0.06] px-2 text-[0.8125rem] text-white">
          <option value="" disabled>Kopiér layout fra …</option>
          {sizes.filter((s) => s.id !== sizeId).map((s) => <option key={s.id} value={s.id} className="text-black">{s.label}</option>)}
        </select>
        <button type="button" onClick={reset} className={`${btn} text-white/75 hover:bg-white/10`}>Nulstil</button>
        <span className="ml-auto text-[0.8125rem] text-white/60" aria-live="polite">{status}</span>
        <button type="button" onClick={save} className={`${btn} font-semibold`} style={{ background: c.coral, color: c.ink }}>Gem</button>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Stage */}
        <div ref={wrapRef} className="min-w-0 flex-1 overflow-auto p-6" onPointerDown={() => { setSel(null); setEditing(null); }}>
          <div style={{ width: size.w * scale, height: stageH * scale }} className="mx-auto">
            <div
              className="relative origin-top-left select-none overflow-hidden"
              style={{ width: size.w, height: stageH, transform: `scale(${scale})`, background: c.dark }}
              onPointerMove={move} onPointerUp={end} onPointerCancel={end}
            >
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0" style={{ height: size.h }}>
                <Image src="/img/unsplash/dokk1.jpg" alt="" fill sizes="100vw" className="object-cover object-[60%_62%] opacity-[0.55]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(32,22,19,0.94) 0%, rgba(32,22,19,0.82) 40%, rgba(32,22,19,0.6) 100%), linear-gradient(180deg, rgba(32,22,19,0.55) 0%, transparent 30%, transparent 70%, rgba(32,22,19,0.85) 100%)" }} />
              </div>
              {/* Nav (fixed, not editable) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex h-20 items-center justify-between" style={{ paddingInline: size.w < 600 ? 20 : size.w * 0.065 }}>
                <MindforwardLogo size={30} />
                <span className="inline-flex h-10 items-center rounded-full px-5 text-[0.875rem] font-semibold" style={{ background: c.coral, color: c.ink }}>Start et kursus</span>
              </div>
              {/* Fold line */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-[#e8664a]/70" style={{ top: size.h }}>
                <span className="absolute right-3 top-1 rounded bg-[#e8664a] px-2 py-0.5 text-[12px] font-semibold text-[#201613]">Skærmens bund ({size.h} px)</span>
              </div>
              {/* Centre guide */}
              {sel && <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-white/15" style={{ left: size.w / 2 }} />}

              {mounted && [...els].sort((a, b) => a.z - b.z).map((el) => {
                const isSel = sel === el.id;
                return (
                  <div
                    key={el.id}
                    data-el
                    className={`absolute ${editing === el.id ? "" : "cursor-move"} ${isSel ? "outline outline-2 outline-[#e8664a]" : "hover:outline hover:outline-1 hover:outline-white/40"}`}
                    style={{ left: el.x, top: el.y, width: el.w, height: el.h, zIndex: el.z }}
                    onPointerDown={(e) => start(e, el, "move")}
                    onDoubleClick={() => { if (["heading", "text", "card"].includes(el.kind)) setEditing(el.id); }}
                  >
                    <Render el={el} editing={editing === el.id} onText={(p) => { patch(el.id, p, true); }} />
                    {isSel && (
                      <>
                        <span className="pointer-events-none absolute -top-7 left-0 whitespace-nowrap rounded bg-[#e8664a] px-2 py-0.5 text-[12px] font-semibold text-[#201613]">{names[el.kind]} · {Math.round(el.w)}{el.h ? `×${Math.round(el.h)}` : ""}</span>
                        <span onPointerDown={(e) => start(e, el, "resize")} className="absolute -bottom-2 -right-2 size-4 cursor-nwse-resize rounded-full border-2 border-white bg-[#e8664a]" title="Træk for at ændre størrelse" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inspector */}
        <aside className="w-[17rem] shrink-0 overflow-auto border-l border-white/10 p-4 text-[0.8125rem]">
          {!selected ? (
            <div className="grid gap-3 text-white/65">
              <p className="text-[0.9375rem] font-semibold text-white">Sådan bruger du den</p>
              <p>Klik på en ting for at vælge den. Træk for at flytte, og træk i den orange prik for at ændre størrelse.</p>
              <p>Dobbeltklik på overskrift, tekst eller et kort for at skrive i det.</p>
              <p>Pile flytter 1 px (Shift: 10 px). Delete fjerner. ⌘Z fortryder. Shift når du ændrer størrelse: bevar formen.</p>
              <p>Hver skærmstørrelse har sit eget layout. Den stiplede linje er bunden af skærmen.</p>
              <p>Tryk <b className="text-white">Gem</b>, når du er tilfreds. Så kan Claude bygge det ind på siden.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              <p className="text-[0.9375rem] font-semibold">{names[selected.kind]}</p>
              <div className="grid grid-cols-2 gap-2">
                {(["x", "y", "w", ...(heights[selected.kind] ? ["h"] : [])] as const).map((k) => (
                  <label key={k} className="grid gap-1 text-white/60">{({ x: "Venstre", y: "Top", w: "Bredde", h: "Højde" } as Record<string, string>)[k]}
                    <input id={`insp-${k}`} type="number" value={Math.round((selected[k as "x"] as number) ?? 0)} onChange={(e) => patch(selected.id, { [k]: Number(e.target.value) }, true)} className="h-8 w-full min-w-0 rounded-[8px] bg-white/[0.06] px-2 text-white" />
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => patch(selected.id, { z: nextZ() }, true)} className={`${btn} flex-1 justify-center bg-white/[0.06] hover:bg-white/10`}>Læg forrest</button>
                <button type="button" onClick={() => patch(selected.id, { z: Math.min(...els.map((e) => e.z)) - 1 }, true)} className={`${btn} flex-1 justify-center bg-white/[0.06] hover:bg-white/10`}>Læg bagerst</button>
              </div>
              <button type="button" onClick={() => patch(selected.id, { x: Math.round(size.w / 2 - selected.w / 2) }, true)} className={`${btn} justify-center bg-white/[0.06] hover:bg-white/10`}>Centrér vandret</button>
              {selected.kind === "card" && (
                <div className="grid gap-2"><span className="text-white/60">Farve</span>
                  <div className="grid grid-cols-4 gap-2">{(Object.keys(tones) as (keyof typeof tones)[]).map((t) => <button key={t} type="button" aria-label={t} onClick={() => patch(selected.id, { tone: t }, true)} className={`h-8 rounded-[8px] ring-2 ${selected.tone === t ? "ring-white" : "ring-transparent"}`} style={{ background: tones[t].bg }} />)}</div>
                </div>
              )}
              {(selected.kind === "card" || selected.kind === "image") && (
                <label className="grid gap-1 text-white/60">Runde hjørner ({selected.radius ?? 24} px)
                  <input id="insp-radius" type="range" min={0} max={60} value={selected.radius ?? 24} onChange={(e) => patch(selected.id, { radius: Number(e.target.value) })} />
                </label>
              )}
              {selected.kind === "image" && (
                <div className="flex gap-2">
                  {(["cover", "contain"] as const).map((f) => <button key={f} type="button" onClick={() => patch(selected.id, { fit: f }, true)} className={`${btn} flex-1 justify-center ${selected.fit === f ? "bg-white text-[#201613]" : "bg-white/[0.06] hover:bg-white/10"}`}>{f === "cover" ? "Fyld ud" : "Fritlagt"}</button>)}
                </div>
              )}
              <button type="button" onClick={() => { commit(els.filter((e) => e.id !== selected.id)); setSel(null); }} className={`${btn} justify-center bg-white/[0.06] text-[#ff9b85] hover:bg-white/10`}>Fjern</button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

