"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { events } from "@/lib/data/events";
import { communities } from "@/lib/data/communities";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { getCategoryColor, formatEventDate, formatPrice, cn } from "@/lib/utils";
import EventCard from "@/components/events/EventCard";
import CommunityCard from "@/components/communities/CommunityCard";
import type { EventCategory } from "@/types";

const TRENDING = ["Tech Meetup", "Yoga", "Startup", "Photography", "Book Club", "Music"];
const RECENT_KEY = "gather_recent_searches";

type ResultTab = "all" | "events" | "communities";

function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecent(stored);
    } catch { setRecent([]); }
  }, []);

  const add = (q: string) => {
    if (!q.trim()) return;
    const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const remove = (q: string) => {
    const updated = recent.filter((r) => r !== q);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  return { recent, add, remove };
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [activeTab, setActiveTab] = useState<ResultTab>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { recent, add, remove } = useRecentSearches();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // GSAP results animation
  useEffect(() => {
    if (!query) return;
    const ctx = gsap.context(() => {
      gsap.from(".search-result-item", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.7)",
        clearProps: "all",
      });
    }, resultsRef);
    return () => ctx.revert();
  }, [query, activeTab]);

  const filteredEvents = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return events.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)) ||
        e.location.city.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.host.name.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredCommunities = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return communities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const totalResults = filteredEvents.length + filteredCommunities.length;

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim()) add(q.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      add(query.trim());
    }
  };

  const showEmpty = query.trim() && totalResults === 0;
  const showResults = query.trim() && totalResults > 0;
  const showIdle = !query.trim();

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Search header */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(26,22,20,0.06)] shadow-warm-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="relative flex items-center gap-3 bg-cream-dark rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-coral/30 transition-all">
            <Search size={18} className="text-warm-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search events, communities, topics..."
              className="flex-1 bg-transparent text-warm-black font-body placeholder:text-warm-muted focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full hover:bg-cream-darker transition-colors text-warm-muted"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Result tabs — only show when there are results */}
        {showResults && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-3 flex items-center gap-2">
            {([
              { key: "all", label: `All (${totalResults})` },
              { key: "events", label: `Events (${filteredEvents.length})` },
              { key: "communities", label: `Communities (${filteredCommunities.length})` },
            ] as { key: ResultTab; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                  activeTab === key
                    ? "bg-warm-black text-cream"
                    : "text-warm-muted hover:text-warm-gray"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">

          {/* Idle state — trending + recent */}
          {showIdle && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Recent searches */}
              {recent.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={15} className="text-warm-muted" />
                    <h2 className="font-heading font-bold text-sm text-warm-black uppercase tracking-wider">
                      Recent
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <div key={r} className="flex items-center gap-1 pl-4 pr-2 py-2 rounded-full bg-white border border-[rgba(26,22,20,0.08)] shadow-warm-sm group">
                        <button
                          onClick={() => handleSearch(r)}
                          className="text-sm font-semibold text-warm-gray hover:text-warm-black transition-colors"
                        >
                          {r}
                        </button>
                        <button
                          onClick={() => remove(r)}
                          className="p-0.5 rounded-full text-warm-muted hover:text-coral transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={15} className="text-coral" />
                  <h2 className="font-heading font-bold text-sm text-warm-black uppercase tracking-wider">
                    Trending
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleSearch(t)}
                      className="px-4 py-2 rounded-full bg-white border border-[rgba(26,22,20,0.08)] text-sm font-semibold text-warm-gray hover:border-coral hover:text-coral shadow-warm-sm transition-all hover:scale-105"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse categories */}
              <div>
                <h2 className="font-heading font-bold text-sm text-warm-black uppercase tracking-wider mb-4">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(
                    ([key, config]) => (
                      <button
                        key={key}
                        onClick={() => handleSearch(config.label.split(" ")[0])}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[rgba(26,22,20,0.06)] shadow-warm-sm hover:shadow-warm-md hover:border-transparent hover:-translate-y-0.5 transition-all group"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{ backgroundColor: `${config.color}15` }}
                        >
                          {config.emoji}
                        </div>
                        <div className="text-left">
                          <p className="font-heading font-bold text-sm text-warm-black">{config.label}</p>
                          <p className="text-xs text-warm-muted">
                            {events.filter((e) => e.category === key).length} events
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-warm-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-heading text-xl font-bold text-warm-black mb-2">
                No results for &ldquo;{query}&rdquo;
              </h3>
              <p className="text-warm-gray font-body text-sm mb-6 max-w-sm">
                Try different keywords or browse by category
              </p>
              <button
                onClick={() => setQuery("")}
                className="px-6 py-2.5 rounded-full bg-coral text-white text-sm font-semibold hover:bg-coral-light transition-colors"
              >
                Clear search
              </button>
            </motion.div>
          )}

          {/* Results */}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={resultsRef}
              className="space-y-8"
            >
              {/* Events results */}
              {(activeTab === "all" || activeTab === "events") && filteredEvents.length > 0 && (
                <div className="search-result-item">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-warm-black">
                      Events
                      <span className="ml-2 text-sm font-normal text-warm-muted">
                        {filteredEvents.length} found
                      </span>
                    </h2>
                    {activeTab === "all" && filteredEvents.length > 3 && (
                      <button
                        onClick={() => setActiveTab("events")}
                        className="text-sm font-semibold text-coral hover:underline"
                      >
                        See all →
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(activeTab === "all" ? filteredEvents.slice(0, 4) : filteredEvents).map((event) => (
                      <div key={event.id} className="search-result-item">
                        <EventCard event={event} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Communities results */}
              {(activeTab === "all" || activeTab === "communities") && filteredCommunities.length > 0 && (
                <div className="search-result-item">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-warm-black">
                      Communities
                      <span className="ml-2 text-sm font-normal text-warm-muted">
                        {filteredCommunities.length} found
                      </span>
                    </h2>
                    {activeTab === "all" && filteredCommunities.length > 2 && (
                      <button
                        onClick={() => setActiveTab("communities")}
                        className="text-sm font-semibold text-coral hover:underline"
                      >
                        See all →
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(activeTab === "all" ? filteredCommunities.slice(0, 2) : filteredCommunities).map((community) => (
                      <div key={community.id} className="search-result-item">
                        <CommunityCard community={community} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
