"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Confetti from "@/components/ui/Confetti";
import { useEventsStore } from "@/stores/eventsStore";
import { cn } from "@/lib/utils";

interface RSVPButtonProps {
  eventId: string;
  className?: string;
  fullWidth?: boolean;
}

export default function RSVPButton({
  eventId,
  className,
  fullWidth,
}: RSVPButtonProps) {
  const { isRsvpd, rsvp, cancelRsvp } = useEventsStore();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const rsvpd = isRsvpd(eventId);

  const handleClick = async () => {
    if (rsvpd) {
      cancelRsvp(eventId);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    rsvp(eventId);
    setLoading(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className={cn("relative", fullWidth && "w-full")}>
      <Confetti active={showConfetti} />
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={fullWidth ? "w-full" : ""}
      >
        <Button
          onClick={handleClick}
          disabled={loading}
          variant={rsvpd ? "secondary" : "primary"}
          size="lg"
          className={cn(
            "relative overflow-hidden transition-all duration-500",
            rsvpd && "!bg-forest !from-forest !to-forest hover:!bg-forest/90",
            fullWidth && "w-full",
            className
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Joining...
            </span>
          ) : rsvpd ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              You&apos;re Going! 🎉
            </motion.span>
          ) : (
            "Attend This Event →"
          )}
        </Button>
      </motion.div>
    </div>
  );
}
