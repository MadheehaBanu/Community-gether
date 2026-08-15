"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WarmCard from "@/components/ui/WarmCard";
import StickerBadge from "@/components/ui/StickerBadge";
import CategoryDot from "@/components/ui/CategoryDot";
import AvatarStack from "@/components/ui/AvatarStack";
import Button from "@/components/ui/Button";
import { eventCardVariants } from "@/lib/animations";
import { formatEventDate, formatPrice, cn } from "@/lib/utils";
import type { Event } from "@/types";

const SAMPLE_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80",
];

interface EventCardProps {
  event: Event;
  size?: "default" | "large" | "compact";
  className?: string;
}

export default function EventCard({
  event,
  size = "default",
  className,
}: EventCardProps) {
  const isLarge = size === "large";
  const isCompact = size === "compact";

  if (isLarge) {
    return (
      <Link href={`/events/${event.slug}`} className={cn("block", className)}>
        <motion.div
          variants={eventCardVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="relative h-full min-h-[420px] rounded-2xl overflow-hidden group"
        >
          <Image
            src={event.coverImage}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <StickerBadge badge={event.badge} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <CategoryDot category={event.category} showLabel />
            <h3 className="font-heading text-2xl font-bold mt-2 mb-2">
              {event.name}
            </h3>
            <p className="font-mono text-sm text-white/80 mb-4">
              {formatEventDate(event.date, event.startTime)}
            </p>
            <AvatarStack
              avatars={SAMPLE_AVATARS}
              count={event.attendeeCount - 4}
            />
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/events/${event.slug}`} className={cn("block event-card", className)}>
      <motion.div
        variants={eventCardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <WarmCard className={cn("overflow-hidden", isCompact && "flex gap-0")}>
          <div
            className={cn(
              "relative overflow-hidden",
              isCompact ? "w-24 shrink-0" : "aspect-[3/2]"
            )}
          >
            <Image
              src={event.coverImage}
              alt={event.name}
              fill={!isCompact}
              width={isCompact ? 96 : undefined}
              height={isCompact ? 96 : undefined}
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                isCompact && "h-full w-full"
              )}
              sizes="(max-width:768px) 100vw, 33vw"
            />
            {!isCompact && event.badge && (
              <div className="absolute top-3 left-3">
                <StickerBadge badge={event.badge} />
              </div>
            )}
          </div>
          <div className={cn("p-5", isCompact && "flex-1 py-3 px-4")}>
            <CategoryDot category={event.category} showLabel />
            <h3
              className={cn(
                "font-heading font-bold text-warm-black mt-2 mb-1 line-clamp-2",
                isCompact ? "text-sm" : "text-lg"
              )}
            >
              {event.name}
            </h3>
            <p className="font-mono text-xs text-warm-muted mb-3">
              {formatEventDate(event.date, event.startTime)}
            </p>
            {!isCompact && (
              <p className="text-sm text-warm-gray mb-3 line-clamp-1">
                📍 {event.location.venue}
              </p>
            )}
            {!isCompact && (
              <AvatarStack
                avatars={SAMPLE_AVATARS}
                count={Math.max(0, event.attendeeCount - 4)}
                size={28}
              />
            )}
            <div className="flex items-center justify-between mt-4">
              <span
                className={cn(
                  "text-sm font-semibold",
                  event.price.type === "free" ? "text-forest" : "text-coral"
                )}
              >
                {formatPrice(event.price)}
              </span>
              {!isCompact && (
                <Button variant="primary" size="sm">
                  Attend →
                </Button>
              )}
            </div>
          </div>
        </WarmCard>
      </motion.div>
    </Link>
  );
}
