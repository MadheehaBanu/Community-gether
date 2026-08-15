"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard from "@/components/events/EventCard";
import { events } from "@/lib/data/events";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedEvents() {
  const ref = useRef<HTMLElement>(null);
  const featured = events.filter((e) => e.badge).slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-item", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        scale: 0.9,
        rotate: () => gsap.utils.random(-2, 2),
        duration: 0.6,
        stagger: { amount: 0.5, from: "center" },
        ease: "back.out(1.7)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-black">
            This Week&apos;s Highlights
          </h2>
          <p className="text-warm-gray mt-2 font-body">
            Curated events you won&apos;t want to miss
          </p>
        </div>
        <Link
          href="/events"
          className="text-coral font-semibold text-sm hover:underline hidden sm:block"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[180px]">
        <div className="bento-item md:col-span-2 md:row-span-2">
          <EventCard event={featured[0]} size="large" className="h-full" />
        </div>
        <div className="bento-item md:col-span-1 md:row-span-1">
          <EventCard event={featured[1]} className="h-full" />
        </div>
        <div className="bento-item md:col-span-1 md:row-span-1">
          <EventCard event={featured[2]} className="h-full" />
        </div>
        <div className="bento-item md:col-span-1 md:row-span-1">
          <EventCard event={featured[3]} className="h-full" />
        </div>
        <div className="bento-item md:col-span-1 md:row-span-1">
          <EventCard event={featured[4] || featured[0]} className="h-full" />
        </div>
      </div>
    </section>
  );
}
