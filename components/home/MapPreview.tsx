"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { events } from "@/lib/data/events";
import EventCard from "@/components/events/EventCard";
import Button from "@/components/ui/Button";

const MapPreviewInner = dynamic(() => import("./MapPreviewInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-cream-dark rounded-2xl animate-pulse flex items-center justify-center text-warm-muted">
      Loading map...
    </div>
  ),
});

export default function MapPreview() {
  const nearbyEvents = events.slice(0, 4);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl font-bold text-warm-black mb-10">
        Near You 📍
      </h2>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-warm-lg border border-[rgba(26,22,20,0.06)]">
          <MapPreviewInner events={events} />
        </div>
        <div className="lg:col-span-5 space-y-4">
          {nearbyEvents.map((event) => (
            <EventCard key={event.id} event={event} size="compact" />
          ))}
          <Link href="/map">
            <Button variant="outline" className="w-full mt-4">
              Explore Full Map →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
