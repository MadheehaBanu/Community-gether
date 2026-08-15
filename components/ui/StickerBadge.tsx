import { cn } from "@/lib/utils";
import type { EventBadge } from "@/types";

const badgeStyles: Record<NonNullable<EventBadge>, string> = {
  POPULAR: "bg-[#fff3e0] text-coral border-coral",
  NEW: "bg-[#e8f5e9] text-forest border-forest",
  "ALMOST FULL": "bg-[#fce4ec] text-[#c62828] border-[#c62828]",
  FEATURED: "bg-[#f3e5f5] text-[#9c4dc7] border-[#9c4dc7]",
};

interface StickerBadgeProps {
  badge: EventBadge;
  className?: string;
}

export default function StickerBadge({ badge, className }: StickerBadgeProps) {
  if (!badge) return null;

  const labels: Record<NonNullable<EventBadge>, string> = {
    POPULAR: "🔥 POPULAR",
    NEW: "✨ NEW",
    "ALMOST FULL": "⚡ ALMOST FULL",
    FEATURED: "⭐ FEATURED",
  };

  return (
    <span
      className={cn(
        "sticker-badge inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border-[1.5px] -rotate-2 shadow-sm",
        badgeStyles[badge],
        className
      )}
    >
      {labels[badge]}
    </span>
  );
}
