import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/lib/constants";
import type { EventCategory } from "@/types";

interface CategoryDotProps {
  category: EventCategory;
  showLabel?: boolean;
  className?: string;
}

export default function CategoryDot({
  category,
  showLabel = false,
  className,
}: CategoryDotProps) {
  const config = CATEGORY_CONFIG[category];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: config.color }}
      />
      {showLabel && (
        <span className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
          {config.label}
        </span>
      )}
    </span>
  );
}
