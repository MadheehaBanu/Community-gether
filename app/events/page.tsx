"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutGrid, List, Map, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { events } from "@/lib/data/events";
import { useFilterStore } from "@/stores/eventsStore";
import EventCard from "@/components/events/EventCard";
import FilterBar from "@/components/events/FilterBar";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { isToday, isTomorrow, parseISO, isThisWeek, isThisMonth } from "date-fns";
import type { Event } from "@/types";

gsap.registerPlugin(ScrollTrigger);

type ViewMode = "grid" | "list";

function filterEvents(allEvents: Event[], filters: ReturnType<typeof useFilterStore.getState>) {
  return allEvents.filter((e) => {
    if (filters.category && e.category !== filters.category) return false;
    if (filters.priceFilter !== "all" && e.price.type !== filters.priceFilter) return false;
    if (filters.formatFilter !== "all" && e.location.type !== filters.formatFilter) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      if (
        !e.name.toLowerCase().includes(q) &&
        !e.tags.some((t) => t.toLowerCase().includes(q)) &&
        !e.location.city.toLowerCase().includes(q)
      )
        return false;
    }
    if (filters.dateFilter !== "all") {
      const date = parseISO(e.date);
      if (filters.dateFilter === "today" && !isToday(date)) return false;
      if (filters.dateFilter === "week" && !isThisWeek(date)) return false;
      if (filters.dateFilter === "month" && !isThisMonth(date)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === "date") return a.date.localeCompare(b.date);
    if (filters.sortBy === "popular") return b.attendeeCount - a.attendeeCount;
    return 0;
  });
}

function EventCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/2] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

export default function EventsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ViewMode>("grid");
  const [loading, setLoading] = useState(true);
  const filters = useFilterStore();

  const filtered = useMemo(() => filterEvents(events, filters), [
    filters.category,
    filters.dateFilter,
    filters.priceFilter,
    filters.formatFilter,
    filters.sortBy,
    filters.searchQuery,
  ]);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // GSAP stagger on filter change
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: { amount: 0.4, from: "start" },
        ease: "back.out(1.7)",
        clearProps: "all",
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filtered, loading, view]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-gradient-to-b from-[#f0e8df] to-cream pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">
            EXPLORE ✦
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-display font-extrabold text-warm-black"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
            >
              Discover Events
            </h1>
            <div className="relative max-w-sm w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-muted" />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.searchQuery}
                onChange={(e) => filters.setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[rgba(26,22,20,0.08)] text-sm font-body text-warm-black placeholder:text-warm-muted focus:outline-none focus:border-coral/30 focus:shadow-glow-coral transition-all shadow-warm-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <FilterBar />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-warm-gray font-body">
            {loading ? (
              <span className="inline-block w-24 h-4 bg-cream-dark rounded animate-pulse" />
            ) : (
              <>
                <span className="font-semibold text-warm-black">{filtered.length}</span>{" "}
                event{filtered.length !== 1 ? "s" : ""} found
              </>
            )}
          </p>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-cream-dark rounded-xl">
            {([
              { mode: "grid" as ViewMode, icon: LayoutGrid },
              { mode: "list" as ViewMode, icon: List },
            ]).map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  view === mode
                    ? "bg-white shadow-warm-sm text-warm-black"
                    : "text-warm-muted hover:text-warm-gray"
                )}
              >
                <Icon size={16} />
              </button>
            ))}
            <Link
              href="/map"
              className="p-2 rounded-lg text-warm-muted hover:text-warm-gray transition-colors"
            >
              <Map size={16} />
            </Link>
          </div>
        </div>

        {/* Grid / List */}
        {loading ? (
          <div className={cn(
            "grid gap-5",
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}>
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading text-xl font-bold text-warm-black mb-2">
              No events found
            </h3>
            <p className="text-warm-gray font-body mb-6 max-w-sm">
              Try adjusting your filters or search for something different
            </p>
            <button
              onClick={filters.clearFilters}
              className="px-6 py-2.5 rounded-full bg-coral text-white text-sm font-semibold hover:bg-coral-light transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className={cn(
              "grid gap-5",
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-2xl"
            )}
          >
            {filtered.map((event) => (
              <div key={event.id} className="event-card">
                <EventCard
                  event={event}
                  size={view === "list" ? "compact" : "default"}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
