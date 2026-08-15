"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { formatTime, cn } from "@/lib/utils";
import type { DetailsData } from "./DetailsStep";
import type { DateLocationData } from "./DateLocationStep";
import type { TicketsData } from "./TicketsStep";
import type { EventCategory } from "@/types";

interface Props {
  details: DetailsData;
  dateLocation: DateLocationData;
  tickets: TicketsData;
  published: boolean;
}

export default function PreviewStep({ details, dateLocation, tickets, published }: Props) {
  const catConfig = details.category ? CATEGORY_CONFIG[details.category as EventCategory] : null;

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
          className="text-7xl mb-6"
        >
          🎉
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-extrabold text-3xl text-warm-black mb-3"
          style={{ letterSpacing: "-0.02em" }}
        >
          Your event is live!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-warm-gray font-body max-w-sm mb-8"
        >
          {details.name || "Your event"} has been published. Share it with your community!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-coral to-gold text-white font-semibold hover:shadow-glow-coral transition-all">
            Share Event 🔗
          </button>
          <button className="px-6 py-3 rounded-full border-2 border-[rgba(26,22,20,0.1)] text-warm-gray font-semibold hover:border-coral hover:text-coral transition-all">
            View Event →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-warm-gray font-body">
        Review your event before publishing. This is how it will appear to attendees.
      </p>

      {/* Preview card */}
      <div className="bg-white border border-[rgba(26,22,20,0.08)] rounded-2xl overflow-hidden shadow-warm-lg">
        {/* Cover */}
        <div className="relative h-48 bg-cream-dark">
          {details.coverImage ? (
            <Image src={details.coverImage} alt="Cover" fill className="object-cover" sizes="600px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-warm-muted text-sm">
              No cover image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/50 to-transparent" />
          {catConfig && (
            <span
              className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: catConfig.color }}
            >
              {catConfig.emoji} {catConfig.label}
            </span>
          )}
        </div>

        <div className="p-5 space-y-4">
          <h3 className="font-display font-extrabold text-xl text-warm-black" style={{ letterSpacing: "-0.02em" }}>
            {details.name || <span className="text-warm-muted italic">Event name...</span>}
          </h3>

          {details.description && (
            <p className="text-sm text-warm-gray font-body line-clamp-3 leading-relaxed">{details.description}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            {dateLocation.date && (
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <Calendar size={14} className="text-coral shrink-0" />
                <span className="font-mono text-xs">{dateLocation.date}</span>
              </div>
            )}
            {dateLocation.startTime && (
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <span className="text-coral text-xs">🕐</span>
                <span className="font-mono text-xs">{formatTime(dateLocation.startTime)}</span>
              </div>
            )}
            {dateLocation.city && (
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <MapPin size={14} className="text-coral shrink-0" />
                <span className="text-xs truncate">{dateLocation.venue || dateLocation.city}</span>
              </div>
            )}
            {tickets.capacity && (
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <Users size={14} className="text-coral shrink-0" />
                <span className="text-xs">{tickets.capacity} spots</span>
              </div>
            )}
          </div>

          {tickets.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tickets.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-cream-dark text-xs font-semibold text-warm-gray">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[rgba(26,22,20,0.06)]">
            <span className={cn(
              "font-bold text-lg",
              tickets.priceType === "free" ? "text-forest" : "text-coral"
            )}>
              {tickets.priceType === "free"
                ? "Free"
                : tickets.amount
                  ? `${tickets.currency} ${Number(tickets.amount).toLocaleString()}`
                  : "Paid"}
            </span>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-coral to-gold text-white text-sm font-semibold opacity-60 cursor-not-allowed">
              Attend This Event →
            </span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {[
          { label: "Event name", done: !!details.name },
          { label: "Category selected", done: !!details.category },
          { label: "Description added", done: !!details.description },
          { label: "Date & time set", done: !!(dateLocation.date && dateLocation.startTime) },
          { label: "Location / format set", done: !!(dateLocation.city || dateLocation.onlineLink || dateLocation.format === "online") },
        ].map(({ label, done }) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
              done ? "bg-forest/10 text-forest" : "bg-cream-dark text-warm-muted"
            )}>
              {done ? "✓" : "·"}
            </span>
            <span className={done ? "text-warm-black" : "text-warm-muted"}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
