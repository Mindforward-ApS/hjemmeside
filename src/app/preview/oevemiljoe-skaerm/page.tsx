// Renders only the øvemiljø screen at 800×500 so it can be filmed into the laptop video (scratchpad/vid). Dev tool.
import { OevemiljoeSkaerm } from "@/components/lab/Oevelse";

export default async function Skaerm({ searchParams }: { searchParams: Promise<{ n?: string; step?: string }> }) {
  const q = await searchParams;
  return (
    <div className="h-[500px] w-[800px] overflow-hidden bg-white [&_*]:!animate-none [&_*]:!transition-none">
      <OevemiljoeSkaerm n={Number(q.n ?? 0)} step={Number(q.step ?? 0)} className="h-full !rounded-none" />
    </div>
  );
}
