"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon, ArrowsOutSimpleIcon, ArrowsInSimpleIcon, ChatCircleDotsIcon, PhoneIcon, XIcon } from "@phosphor-icons/react";

// Open Mon–Fri 9–16 Copenhagen time: green dot. Outside those hours: red.
function isOpen(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Copenhagen", weekday: "short", hour: "numeric", hour12: false }).formatToParts(now);
  const day = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  return day !== "Sat" && day !== "Sun" && hour >= 9 && hour < 16;
}

type Msg = { role: "user" | "assistant"; content: string };
const HELLO: Msg = { role: "assistant", content: "Hej 👋 Jeg er MIND, Mindforwards assistent. Spørg mig om kurserne, priser eller hvordan I kommer i gang." };
const ink = "#201613";

// Marco 2026-11-24, from his two references: the launcher (3D MIND avatar) opens a small card; "Skriv til os" opens the
// full chat with MIND on top. While anything is open the launcher is a black circle with a white cross. No backdrop.
export function ChatBubble() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [view, setView] = useState<"closed" | "card" | "chat">("closed");
  const [big, setBig] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HELLO]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => setOnline(isOpen());
    tick();
    const id = setInterval(tick, 60_000);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setView("closed"); };
    addEventListener("keydown", esc);
    return () => { clearInterval(id); removeEventListener("keydown", esc); };
  }, []);
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user" as const, content: t }];
    setMsgs(next); setText(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next.slice(1) }) });
      const { reply } = await r.json();
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Noget gik galt. Skriv til kontakt@mindforward.dk eller ring på 30 12 70 10." }]);
    } finally { setBusy(false); }
  }

  const open = view !== "closed";
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {view === "card" && (
        <div role="dialog" aria-label="Kontakt Mindforward" className="chat-in w-[min(330px,calc(100vw-40px))] rounded-[22px] bg-white p-5 shadow-[0_0_0_1px_rgba(32,22,19,.08),0_2px_4px_rgba(0,0,0,.08),0_20px_44px_-12px_rgba(32,22,19,.35)]" style={{ color: ink }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[1rem] font-semibold tracking-[-0.01em]">Spørgsmål? Skriv til os</p>
              <p className="mt-1.5 flex items-center gap-2 text-[0.875rem] text-[#6b625d]">
                <span aria-hidden className={`size-2 rounded-full ${online === false ? "bg-[#ef4444]" : "bg-[#22c55e]"}`} />
                {online === false ? "Vi svarer næste hverdag" : "Vi er online nu"}
              </p>
            </div>
            <span className="flex -space-x-2.5">
              <Image src="/img/marco-2.jpg" alt="" width={36} height={36} className="size-9 rounded-full object-cover ring-2 ring-white" />
              <span className="grid size-9 place-items-center rounded-full bg-[#fff1e8] ring-2 ring-white"><Image src="/img/miwa-chat.png" alt="" width={256} height={213} className="h-auto w-6" /></span>
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setView("chat")} className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#201613] text-[0.875rem] font-semibold text-white transition-colors hover:bg-[#33241f]">
              <ChatCircleDotsIcon size={18} weight="bold" aria-hidden />Chat med os
            </button>
            <a href="tel:+4530127010" className="flex h-11 items-center justify-center gap-2 rounded-full text-[0.875rem] font-semibold ring-1 ring-[rgba(32,22,19,0.16)] transition-colors hover:bg-[#f5f2ef]">
              <PhoneIcon size={18} weight="bold" aria-hidden />Ring til os
            </a>
          </div>
        </div>
      )}

      {view === "chat" && (
        <div role="dialog" aria-label="Chat med Mindforward" className={`chat-in relative mt-14 flex flex-col overflow-visible rounded-[28px] bg-white shadow-[0_0_0_1px_rgba(32,22,19,.08),0_2px_4px_rgba(0,0,0,.08),0_24px_56px_-12px_rgba(32,22,19,.4)] ${big ? "h-[min(720px,calc(100vh-140px))] w-[min(520px,calc(100vw-40px))]" : "h-[min(560px,calc(100vh-140px))] w-[min(360px,calc(100vw-40px))]"}`} style={{ color: ink }}>
          {/* MIND peeks over the top edge, like the robot in the reference. */}
          {/* Marco 2026-11-24: MIND sits a little lower, standing on the card's top edge with a soft contact shadow under it. */}
          <span aria-hidden className="absolute top-[14px] left-1/2 h-[14px] w-[96px] -translate-x-1/2 rounded-[50%] blur-[5px]" style={{ background: "radial-gradient(closest-side, rgba(32,22,19,0.6), rgba(32,22,19,0.15) 70%, transparent)" }} />
          <Image src="/img/miwa-chat.png" alt="" width={256} height={213} className="absolute -top-[52px] left-1/2 h-auto w-[84px] -translate-x-1/2 drop-shadow-[0_3px_4px_rgba(120,30,0,0.35)]" />
          <div className="flex items-center justify-between px-4 pt-4">
            <button type="button" onClick={() => setBig((b) => !b)} aria-label={big ? "Gør mindre" : "Gør større"} className="grid size-9 place-items-center rounded-full ring-1 ring-[rgba(32,22,19,0.14)] transition-colors hover:bg-[#f5f2ef]">
              {big ? <ArrowsInSimpleIcon size={16} weight="bold" /> : <ArrowsOutSimpleIcon size={16} weight="bold" />}
            </button>
            <button type="button" onClick={() => setView("closed")} aria-label="Luk chatten" className="grid size-9 place-items-center rounded-full ring-1 ring-[rgba(32,22,19,0.14)] transition-colors hover:bg-[#f5f2ef]">
              <XIcon size={16} weight="bold" />
            </button>
          </div>
          <div className="px-6 pt-2 text-center">
            <p className="text-[1.375rem] font-semibold tracking-[-0.02em]">Hej! 👋</p>
            <p className="mt-1 text-[0.875rem] leading-5 text-[#6b625d]">Chat med MIND. Hvad kan vi hjælpe med?</p>
          </div>
          <div ref={list} className="mt-4 flex-1 space-y-3 overflow-y-auto px-4 pb-3" aria-live="polite">
            {msgs.map((m, i) => m.role === "assistant" ? (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-[#201613]"><Image src="/img/miwa-chat.png" alt="" width={256} height={213} className="h-auto w-[18px]" /></span>
                <p className="max-w-[82%] rounded-[18px] rounded-tl-[6px] bg-[#f3f0ed] px-4 py-3 text-[0.9375rem] leading-[1.45]">{m.content}</p>
              </div>
            ) : (
              <p key={i} className="ml-auto max-w-[82%] rounded-[18px] rounded-tr-[6px] bg-[#201613] px-4 py-3 text-[0.9375rem] leading-[1.45] text-white">{m.content}</p>
            ))}
            {busy && <p className="ml-9 inline-flex gap-1 rounded-[18px] bg-[#f3f0ed] px-4 py-3" aria-label="MIND skriver"><span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" /></p>}
          </div>
          <form onSubmit={send} className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-full bg-[#f3f0ed] py-1.5 pl-5 pr-1.5 focus-within:ring-2 focus-within:ring-[#201613]">
              <label htmlFor="chat-input" className="sr-only">Din besked</label>
              <input id="chat-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Skriv en besked …" autoComplete="off" maxLength={2000} className="min-w-0 flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-[#8a7f79]" />
              <button type="submit" disabled={!text.trim() || busy} aria-label="Send" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#201613] text-white transition-opacity disabled:opacity-30">
                <ArrowUpIcon size={16} weight="bold" />
              </button>
            </div>
          </form>
          <p className="rounded-b-[28px] border-t border-[rgba(32,22,19,0.08)] bg-[#f8f5f1] py-2.5 text-center text-[0.75rem] text-[#8a7f79]">Svar fra Mindforward · kontakt@mindforward.dk</p>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Luk" : online === false ? "Kontakt os (offline)" : "Kontakt os (online)"}
        onClick={() => setView((v) => (v === "closed" ? "card" : "closed"))}
        className={`relative grid size-16 place-items-center rounded-full transition-[transform,background-color] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#201613] ${open ? "bg-[#0a0a0b] shadow-[0_2px_4px_rgba(0,0,0,.2),0_12px_28px_-8px_rgba(0,0,0,.45)]" : "rounded-br-[6px] bg-white shadow-[0_0_0_1px_rgba(32,22,19,.08),0_2px_4px_rgba(0,0,0,.12),0_12px_28px_-8px_rgba(0,0,0,.35)]"}`}
      >
        {open ? <XIcon size={24} weight="bold" className="text-white" aria-hidden /> : <Image src="/img/miwa-chat.png" alt="" width={256} height={213} className="h-auto w-[46px] drop-shadow-[0_2px_3px_rgba(120,30,0,0.35)]" />}
        {!open && online !== null && <span aria-hidden className={`absolute right-0.5 top-0.5 size-3.5 rounded-full ring-2 ring-white ${online ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />}
      </button>
      <style>{`
        .chat-in { animation: chat-in .24s cubic-bezier(.16,1,.3,1); transform-origin: bottom right; }
        @keyframes chat-in { from { opacity: 0; transform: translateY(8px) scale(.97); } }
        .chat-dot { width: 6px; height: 6px; border-radius: 50%; background: #8a7f79; animation: chat-dot 1s infinite ease-in-out; }
        .chat-dot:nth-child(2) { animation-delay: .15s; } .chat-dot:nth-child(3) { animation-delay: .3s; }
        @keyframes chat-dot { 0%, 80%, 100% { opacity: .3; } 40% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .chat-in, .chat-dot { animation: none; } }
      `}</style>
    </div>
  );
}
