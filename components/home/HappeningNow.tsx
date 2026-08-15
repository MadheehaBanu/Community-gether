"use client";

import Link from "next/link";
import Image from "next/image";
import { getLiveEvents } from "@/lib/data/events";
import LivePulse from "@/components/ui/LivePulse";
import WarmCard from "@/components/ui/WarmCard";
import Button from "@/components/ui/Button";

export default function HappeningNow() {
  const liveEvents = getLiveEvents();

  if (liveEvents.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <LivePulse />
        <h2 className="font-heading text-2xl font-bold text-warm-black">
          Happening Right Now
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {liveEvents.map((event) => (
          <WarmCard
            key={event.id}
            className="min-w-[320px] flex-shrink-0 p-4 border-l-4 !border-l-forest"
          >
            <div className="flex items-start gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={event.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm text-warm-black truncate">
                  {event.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden">
                    <Image
                      src={event.host.avatar}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <span className="text-xs text-warm-gray">{event.host.name}</span>
                </div>
                <p className="text-xs text-forest font-mono mt-1">
                  Started 23 min ago · {event.attendeeCount} attending
                </p>
              </div>
              <Link href={`/events/${event.slug}`}>
                <Button variant="secondary" size="sm" className="!bg-forest shrink-0">
                  Join →
                </Button>
              </Link>
            </div>
          </WarmCard>
        ))}
      </div>
    </section>
  );
}
