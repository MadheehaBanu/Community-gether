"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getUpcomingEvents } from "@/lib/data/events";
import { groupEventsByDay, formatTime, formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&q=80",
];

export default function WeekTimeline() {
  const ref = useRef<HTMLElement>(null);
  const upcoming = getUpcomingEvents().slice(0, 6);
  const grouped = groupEventsByDay(upcoming);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-row", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.7)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-warm-black mb-10">
          Upcoming This Week
        </h2>

        <div className="space-y-8">
          {Object.entries(grouped).map(([day, dayEvents]) => (
            <div key={day}>
              <h3 className="font-heading text-lg font-bold text-coral mb-4">{day}</h3>
              <div className="space-y-2">
                {dayEvents.map((event, i) => (
                  <Link
                    key={event.slug}
                    href={`/events/${event.slug}`}
                    className={`timeline-row flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-white/60 ${
                      i % 2 === 0 ? "bg-white/40" : ""
                    }`}
                  >
                    <span className="font-mono text-sm text-coral font-medium w-20 shrink-0">
                      {formatTime(event.startTime)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-warm-black truncate">
                        {event.name}
                      </p>
                      <p className="text-xs text-warm-muted truncate">
                        📍 {event.location.venue}
                      </p>
                    </div>
                    <div className="hidden sm:flex -space-x-2">
                      {AVATARS.map((a, j) => (
                        <div
                          key={j}
                          className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                        >
                          <Image src={a} alt="" fill className="object-cover" sizes="28px" />
                        </div>
                      ))}
                    </div>
                    <span className="hidden md:block text-sm text-warm-gray w-16 text-right">
                      {formatPrice(event.price)}
                    </span>
                    <Button variant="outline" size="sm" className="shrink-0 hidden sm:inline-flex">
                      Attend
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
