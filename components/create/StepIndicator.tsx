import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Details", emoji: "✏️" },
  { label: "Date & Place", emoji: "📅" },
  { label: "Tickets", emoji: "🎟️" },
  { label: "Preview", emoji: "🚀" },
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  scale: active ? 1.1 : 1,
                  backgroundColor: done ? "#2d7a4f" : active ? "#e85d3a" : "#efe9e1",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  done ? "border-forest" : active ? "border-coral" : "border-cream-darker"
                )}
              >
                {done ? (
                  <Check size={16} className="text-white" strokeWidth={3} />
                ) : (
                  <span className={cn("text-base", active ? "" : "grayscale opacity-50")}>
                    {step.emoji}
                  </span>
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-semibold hidden sm:block",
                  active ? "text-coral" : done ? "text-forest" : "text-warm-muted"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="w-12 sm:w-20 h-0.5 mx-1 mb-5 rounded-full overflow-hidden bg-cream-darker">
                <motion.div
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full bg-forest rounded-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
