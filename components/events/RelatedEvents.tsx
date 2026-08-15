import { events } from "@/lib/data/events";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types";

export default function RelatedEvents({ current }: { current: Event }) {
  const related = events
    .filter((e) => e.id !== current.id && e.category === current.category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-[rgba(26,22,20,0.06)]">
      <h2 className="font-heading text-2xl font-bold text-warm-black mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
