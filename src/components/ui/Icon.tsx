import {
  ArrowLeftIcon, ArrowRightIcon, BellIcon, CaretDownIcon, ChartLineUpIcon, CheckIcon, ClockIcon, DeviceMobileIcon,
  EnvelopeIcon, FileTextIcon, GlobeIcon, HardDrivesIcon, ListIcon, LockSimpleIcon, MinusIcon, NotePencilIcon, PauseIcon,
  PhoneIcon, PlayIcon, PlusIcon, ShieldCheckIcon, SparkleIcon, UserIcon, XIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PIcon } from "@phosphor-icons/react";

// One icon family (Marco 2026-11-24): Phosphor, Bold weight, everywhere on the site. Same names as before, so every
// <Icon name="…"> keeps working. Play and pause are filled, as before.
const icons = {
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  check: CheckIcon,
  close: XIcon,
  menu: ListIcon,
  mail: EnvelopeIcon,
  form: NotePencilIcon,
  phone: PhoneIcon,
  clock: ClockIcon,
  shield: ShieldCheckIcon,
  bell: BellIcon,
  doc: FileTextIcon,
  sparkle: SparkleIcon,
  mobile: DeviceMobileIcon,
  globe: GlobeIcon,
  lock: LockSimpleIcon,
  server: HardDrivesIcon,
  play: PlayIcon,
  pause: PauseIcon,
  user: UserIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  chevronDown: CaretDownIcon,
  chart: ChartLineUpIcon,
} as const satisfies Record<string, PIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, size = 20, className, label }: { name: IconName; size?: number; className?: string; label?: string }) {
  const P = icons[name];
  return (
    <P
      size={size}
      weight={name === "play" || name === "pause" ? "fill" : "bold"}
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    />
  );
}
