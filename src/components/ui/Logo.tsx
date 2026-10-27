import { MindforwardLogo } from "@/components/ui/MindforwardLogo";

// Site logo: Mindforward (Marco's brand). Text colour follows the surrounding text.
export function Logo({ className }: { className?: string }) {
  return <MindforwardLogo className={`!text-inherit [&>span:last-child]:text-current ${className ?? ""}`} />;
}
