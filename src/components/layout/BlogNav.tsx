import Image from "next/image";
import { Nav } from "@/components/lab/NyForside";

// The front page's header on the blog (Marco 2026-11-25): the same nav on the hero's background (office photo, heavy
// blur, brown veil), so the blog looks like the rest of mindforward.dk.
export function BlogNav() {
  return (
    <div className="relative isolate z-30 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image src="/img/hero-erhverv-2.jpg" alt="" fill sizes="100vw" className="scale-[1.1] object-cover object-[50%_40%] blur-[40px]" />
        <div className="absolute inset-0" style={{ background: "rgba(32,22,19,0.92)" }} />
      </div>
      <Nav base="/" cta="Tilmeld jer" />
    </div>
  );
}
