"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#e85d3a", "#c8963e", "#7c2d5b", "#2d7a4f", "#2563a8", "#9c4dc7"];
const SHAPES = ["circle", "square", "triangle"] as const;

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: (typeof SHAPES)[number];
  rotation: number;
}

export default function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200 - 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 2000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: 0,
              x: p.x,
              y: p.y + 150,
              scale: 1,
              rotate: p.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2"
            style={{
              width: p.shape === "triangle" ? 0 : 8,
              height: p.shape === "triangle" ? 0 : 8,
              backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
              borderLeft: p.shape === "triangle" ? "5px solid transparent" : undefined,
              borderRight: p.shape === "triangle" ? "5px solid transparent" : undefined,
              borderBottom: p.shape === "triangle" ? `8px solid ${p.color}` : undefined,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
