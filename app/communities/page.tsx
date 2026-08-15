"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { Search } from "lucide-react";
import { communities } from "@/lib/data/communities";
import { CATEGORY_CONFIG } from "@/lib/constants";
import CommunityCard from "@/components/communities/CommunityCard";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types";

export default function CommunitiesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);

  const filtered = useMemo(() => {
    return communities.filter((c) => {
      if (activeCategory && c.category !== activeCategory) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".community-card", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: { amount: 0.4, from: "start" },
        ease: "back.out(1.7)",
        clearProps: "all",
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#f0e8df] to-cream pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3">COMMUNITIES ✦</p>
          <h1
            className="font-display font-extrabold text-warm-black mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Find Your Tribe
          </h1>
          <p className="text-warm-gray font-body text-lg max-w-xl mx-auto mb-8">
            Join communities of people who share your passions. From tech to wellness, there&apos;s a place for everyone.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-muted" />
            <input
              type="text"
              placeholder="Search communities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white border border-[rgba(26,22,20,0.08)] text-sm font-body text-warm-black placeholder:text-warm-muted focus:outline-none focus:border-coral/30 focus:shadow-glow-coral transition-all shadow-warm-md"
            />
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(26,22,20,0.06)] shadow-warm-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold border transition-all shrink-0",
                activeCategory === null
                  ? "bg-warm-black text-cream border-warm-black"
                  : "bg-white text-warm-gray border-[rgba(26,22,20,0.1)] hover:border-warm-black/20"
              )}
            >
              All Communities
            </button>
            {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(
              ([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all shrink-0",
                    activeCategory === key ? "text-white border-transparent" : "bg-white text-warm-gray border-[rgba(26,22,20,0.1)]"
                  )}
                  style={activeCategory === key ? { backgroundColor: config.color } : undefined}
                >
                  {config.emoji} {config.label.split(" ")[0]}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-warm-gray">
            <span className="font-bold text-warm-black">{filtered.length}</span> communities
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🏘️</div>
            <h3 className="font-heading text-xl font-bold text-warm-black mb-2">No communities found</h3>
            <p className="text-warm-gray font-body mb-6">Try a different search or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory(null); }}
              className="px-6 py-2.5 rounded-full bg-coral text-white text-sm font-semibold hover:bg-coral-light transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((community) => (
              <div key={community.id} className="community-card">
                <CommunityCard community={community} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
