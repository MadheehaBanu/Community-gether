export const pageTransition = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

export const eventCardVariants = {
  rest: {
    scale: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
  hover: {
    scale: 1.03,
    y: -8,
    rotate: 0.5,
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
  },
  tap: {
    scale: 0.97,
    rotate: -0.5,
    transition: { duration: 0.1 },
  },
};

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};
