import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarStackProps {
  avatars: string[];
  count?: number;
  size?: number;
  className?: string;
}

export default function AvatarStack({
  avatars,
  count,
  size = 32,
  className,
}: AvatarStackProps) {
  const display = avatars.slice(0, 4);

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2">
        {display.map((avatar, i) => (
          <div
            key={i}
            className="relative rounded-full border-2 border-white overflow-hidden bg-cream-dark"
            style={{ width: size, height: size }}
          >
            <Image
              src={avatar}
              alt=""
              fill
              className="object-cover"
              sizes={`${size}px`}
            />
          </div>
        ))}
      </div>
      {count !== undefined && count > 0 && (
        <span className="ml-2 text-sm text-warm-gray font-body">
          +{count} going
        </span>
      )}
    </div>
  );
}
