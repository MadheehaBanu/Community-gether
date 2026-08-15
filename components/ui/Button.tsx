import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-coral to-gold text-white shadow-glow-coral hover:shadow-warm-lg hover:scale-105 active:scale-95",
      secondary:
        "bg-plum text-white hover:bg-plum-light shadow-warm-md hover:scale-105 active:scale-95",
      outline:
        "border-2 border-coral text-coral bg-transparent hover:bg-coral/10 hover:scale-105 active:scale-95",
      ghost:
        "bg-transparent text-warm-gray hover:bg-cream-dark hover:text-warm-black",
      white:
        "bg-white text-coral shadow-warm-lg hover:shadow-warm-xl hover:scale-105 active:scale-95",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
