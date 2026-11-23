import Image from "next/image";

// Marco 2026-11-23: the M logo as a chat bubble fixed in the bottom-right corner. No chatbot behind it yet.
export function ChatBubble() {
  return (
    <button
      type="button"
      aria-label="Chat med os"
      className="fixed bottom-5 right-5 z-50 grid size-16 place-items-center rounded-full rounded-br-[6px] bg-white shadow-[0_0_0_1px_rgba(32,22,19,.08),0_2px_4px_rgba(0,0,0,.12),0_12px_28px_-8px_rgba(0,0,0,.35)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1d4ed8] sm:bottom-6 sm:right-6"
    >
      <Image src="/img/mindforward-m.png" alt="" width={238} height={96} className="h-auto w-9" />
    </button>
  );
}
