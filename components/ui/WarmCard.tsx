import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

interface WarmCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const WarmCard = forwardRef<HTMLDivElement, WarmCardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl shadow-warm-md transition-all duration-400",
          hover &&
            "hover:border-coral/20 hover:shadow-warm-lg hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(26,22,20,0.1),0_0_0_1px_rgba(232,93,58,0.1)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

WarmCard.displayName = "WarmCard";
export default WarmCard;
