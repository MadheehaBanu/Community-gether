"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data/testimonials";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-20 bg-warm-black relative overflow-hidden">
      <div className="absolute top-10 left-10 text-[120px] font-display text-coral/10 leading-none select-none">
        &ldquo;
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-heading text-3xl font-bold text-[#faf8f5] mb-12">
          What People Say
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="text-xl md:text-2xl text-[#faf8f5]/90 italic font-body leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-coral/30">
                <Image src={t.avatar} alt={t.author} fill className="object-cover" sizes="48px" />
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-[#faf8f5]">{t.author}</p>
                <p className="text-sm text-warm-muted">
                  Attended {t.eventsAttended} events
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active ? "bg-coral w-8" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
