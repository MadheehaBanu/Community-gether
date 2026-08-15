"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { useFilterStore } from "@/stores/eventsStore";
import type { EventCategory } from "@/types";

const DATE_OPTIONS = [
  { value: "all", label: "Any Date" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

const PRICE_OPTIONS = [
  { value: "all", label: "Any Price" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const FORMAT_OPTIONS = [
  { value: "all", label: "Any Format" },
  { value: "in-person", label: "In-Person" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Date" },
  { value: "popular", label: "Popular" },
];

export default function FilterBar() {
  const {
    category, dateFilter, priceFilter, formatFilter, sortBy,
    setCategory, setDateFilter, setPriceFilter, setFormatFilter, setSortBy,
    clearFilters,
  } = useFilterStore();

  const hasActiveFilters =
    category !== null ||
    dateFilter !== "all" ||
    priceFilter !== "all" ||
    formatFilter !== "all" ||
    sortBy !== "relevance";

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(26,22,20,0.06)] shadow-warm-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">

          {/* Category pills */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 shrink-0",
                category === null
                  ? "bg-warm-black text-cream border-warm-black"
                  : "bg-white text-warm-gray border-[rgba(26,22,20,0.1)] hover:border-warm-black/20"
              )}
            >
              All
            </button>
            {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(
              ([key, config]) => (
                <button
                  key={key}
                  onClick={() => setCategory(category === key ? null : key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 shrink-0",
                    category === key
                      ? "text-white border-transparent"
                      : "bg-white text-warm-gray border-[rgba(26,22,20,0.1)] hover:border-transparent hover:text-white"
                  )}
                  style={
                    category === key
                      ? { backgroundColor: config.color, borderColor: config.color }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (category !== key) {
                      e.currentTarget.style.backgroundColor = config.color;
                      e.currentTarget.style.borderColor = config.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (category !== key) {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.color = "";
                    }
                  }}
                >
                  <span>{config.emoji}</span>
                  {config.label.split(" ")[0]}
                </button>
              )
            )}
          </div>

          <div className="w-px h-6 bg-[rgba(26,22,20,0.08)] shrink-0" />

          {/* Date filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold border bg-white cursor-pointer outline-none transition-all shrink-0",
              dateFilter !== "all"
                ? "border-coral text-coral"
                : "border-[rgba(26,22,20,0.1)] text-warm-gray hover:border-warm-black/20"
            )}
          >
            {DATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Price filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold border bg-white cursor-pointer outline-none transition-all shrink-0",
              priceFilter !== "all"
                ? "border-coral text-coral"
                : "border-[rgba(26,22,20,0.1)] text-warm-gray hover:border-warm-black/20"
            )}
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Format filter */}
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold border bg-white cursor-pointer outline-none transition-all shrink-0",
              formatFilter !== "all"
                ? "border-coral text-coral"
                : "border-[rgba(26,22,20,0.1)] text-warm-gray hover:border-warm-black/20"
            )}
          >
            {FORMAT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <div className="w-px h-6 bg-[rgba(26,22,20,0.08)] shrink-0" />

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={14} className="text-warm-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-semibold text-warm-gray bg-transparent cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold text-coral border border-coral/30 hover:bg-coral/5 transition-all shrink-0 ml-auto"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
