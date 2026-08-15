"use client";

import { useState, useCallback, useRef } from "react";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, SlidersHorizontal, MapPin, Calendar, ChevronRight } from "lucide-react";
import { events } from "@/lib/data/events";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { getCategoryColor, formatEventDate, formatPrice, cn } from "@/lib/utils";
import StickerBadge from "@/components/ui/StickerBadge";
import type { Event } from "@/types";
import type { EventCategory } from "@/types";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const INITIAL_VIEW = {
  longitude: 79.8612,
  latitude: 6.9271,
  zoom: 11,
};

function MapFallback() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-cream to-cream-dark flex flex-col items-center justify-center p-8">
      <div className="text-6xl mb-4">🗺️</div>
      <h2 className="font-heading text-2xl font-bold text-warm-black mb-2">Map requires Mapbox token</h2>
      <p className="text-warm-gray font-body text-sm mb-6 text-center max-w-sm">
        Add <code className="font-mono bg-cream-dark px-2 py-0.5 rounded text-coral">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code className="font-mono bg-cream-dark px-2 py-0.5 rounded">.env.local</code> file
      </p>
      {/* Fallback event list */}
      <div className="w-full max-w-md space-y-3">
        {events.slice(0, 4).map((e) => (
          <Link
            key={e.id}
            href={`/events/${e.slug}`}
            className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-warm-md hover:shadow-warm-lg transition-all border border-[rgba(26,22,20,0.06)]"
          >
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getCategoryColor(e.category) }} />
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-sm text-warm-black truncate">{e.name}</p>
              <p className="text-xs text-warm-muted font-mono">{formatEventDate(e.date, e.startTime)}</p>
            </div>
            <ChevronRight size={16} className="text-warm-muted shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function EventPopupCard({ event, onClose }: { event: Event; onClose: () => void }) {
  return (
    <div className="w-64 bg-white rounded-2xl overflow-hidden shadow-warm-xl">
      <div className="relative h-32">
        <Image src={event.coverImage} alt={event.name} fill className="object-cover" sizes="256px" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <X size={12} />
        </button>
        {event.badge && (
          <div className="absolute top-2 left-2">
            <StickerBadge badge={event.badge} className="text-[10px] px-2 py-0.5" />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(event.category) }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-warm-muted">
            {CATEGORY_CONFIG[event.category].label}
          </span>
        </div>
        <h3 className="font-heading font-bold text-sm text-warm-black leading-tight mb-1 line-clamp-2">
          {event.name}
        </h3>
        <p className="font-mono text-xs text-warm-muted mb-1">{formatEventDate(event.date, event.startTime)}</p>
        <div className="flex items-center gap-1 text-xs text-warm-muted mb-3">
          <MapPin size={11} />
          <span className="truncate">{event.location.venue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={cn("text-sm font-bold", event.price.type === "free" ? "text-forest" : "text-coral")}>
            {formatPrice(event.price)}
          </span>
          <Link
            href={`/events/${event.slug}`}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-coral to-gold text-white text-xs font-semibold hover:shadow-glow-coral transition-all"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SidebarEventRow({ event, active, onClick }: { event: Event; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
        active ? "bg-coral/5 border border-coral/20" : "hover:bg-cream-dark border border-transparent"
      )}
    >
      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
        <Image src={event.coverImage} alt={event.name} fill className="object-cover" sizes="56px" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getCategoryColor(event.category) }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-warm-muted truncate">
            {event.location.city}
          </span>
        </div>
        <p className="font-heading font-bold text-sm text-warm-black line-clamp-1">{event.name}</p>
        <p className="font-mono text-xs text-warm-muted mt-0.5">{formatEventDate(event.date, event.startTime)}</p>
      </div>
      <span className={cn("text-xs font-bold shrink-0", event.price.type === "free" ? "text-forest" : "text-coral")}>
        {formatPrice(event.price)}
      </span>
    </button>
  );
}

export default function MapView() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mapRef = useRef(null);

  const filtered = events.filter((e) => {
    if (activeCategory && e.category !== activeCategory) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.location.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleMarkerClick = useCallback((event: Event) => {
    setSelectedEvent(event);
  }, []);

  if (!TOKEN) return <MapFallback />;

  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">
      {/* Map */}
      <Map
        ref={mapRef}
        mapboxAccessToken={TOKEN}
        initialViewState={INITIAL_VIEW}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />

        {/* Markers */}
        {filtered.map((event) => (
          <Marker
            key={event.id}
            longitude={event.location.coordinates.lng}
            latitude={event.location.coordinates.lat}
            anchor="center"
            onClick={(e) => { e.originalEvent.stopPropagation(); handleMarkerClick(event); }}
          >
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all",
                  selectedEvent?.id === event.id ? "w-7 h-7 shadow-xl" : ""
                )}
                style={{
                  backgroundColor: getCategoryColor(event.category),
                  boxShadow: selectedEvent?.id === event.id
                    ? `0 0 0 4px ${getCategoryColor(event.category)}30`
                    : undefined,
                }}
              />
            </motion.div>
          </Marker>
        ))}

        {/* Popup */}
        {selectedEvent && (
          <Popup
            longitude={selectedEvent.location.coordinates.lng}
            latitude={selectedEvent.location.coordinates.lat}
            anchor="bottom"
            offset={20}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setSelectedEvent(null)}
          >
            <EventPopupCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
          </Popup>
        )}
      </Map>

      {/* Top search bar overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-warm-lg border border-[rgba(26,22,20,0.08)] flex items-center gap-2 px-4 py-2.5">
          <Search size={16} className="text-warm-muted shrink-0" />
          <input
            type="text"
            placeholder="Search events or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm font-body text-warm-black placeholder:text-warm-muted focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-warm-muted hover:text-warm-gray">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter pills overlay */}
      <div className="absolute top-36 left-1/2 -translate-x-1/2 z-20 w-full px-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 shadow-warm-sm",
              activeCategory === null
                ? "bg-warm-black text-cream border-warm-black"
                : "bg-white text-warm-gray border-[rgba(26,22,20,0.1)]"
            )}
          >
            All
          </button>
          {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 shadow-warm-sm",
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

      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-30 flex items-center gap-1.5 px-3 py-2 bg-white shadow-warm-lg border border-[rgba(26,22,20,0.08)] rounded-l-xl text-xs font-semibold text-warm-gray hover:text-warm-black transition-colors"
        style={{ right: sidebarOpen ? "320px" : "0" }}
      >
        <SlidersHorizontal size={14} />
        {sidebarOpen ? "Hide" : "Events"}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-16 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-md border-l border-[rgba(26,22,20,0.08)] shadow-warm-xl z-20 flex flex-col"
          >
            {/* Sidebar header */}
            <div className="p-4 border-b border-[rgba(26,22,20,0.06)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-warm-black">Events Near You</h2>
                  <p className="text-xs text-warm-muted mt-0.5">{filtered.length} events found</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-cream-dark transition-colors text-warm-muted"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Event list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-4xl mb-3">📍</div>
                  <p className="text-warm-gray font-body text-sm">No events match your filters</p>
                </div>
              ) : (
                filtered.map((event) => (
                  <SidebarEventRow
                    key={event.id}
                    event={event}
                    active={selectedEvent?.id === event.id}
                    onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                  />
                ))
              )}
            </div>

            {/* Sidebar footer */}
            <div className="p-4 border-t border-[rgba(26,22,20,0.06)]">
              <Link
                href="/events"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-coral to-gold text-white text-sm font-semibold hover:shadow-glow-coral transition-all"
              >
                <Calendar size={14} />
                Browse All Events
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom sheet — selected event */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden absolute bottom-16 left-0 right-0 z-30 px-4 pb-2"
          >
            <div className="bg-white rounded-2xl shadow-warm-xl border border-[rgba(26,22,20,0.06)] overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image src={selectedEvent.coverImage} alt={selectedEvent.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-warm-black line-clamp-1">{selectedEvent.name}</p>
                  <p className="font-mono text-xs text-warm-muted mt-0.5">{formatEventDate(selectedEvent.date, selectedEvent.startTime)}</p>
                  <div className="flex items-center gap-1 text-xs text-warm-muted mt-0.5">
                    <MapPin size={11} />
                    <span className="truncate">{selectedEvent.location.venue}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button onClick={() => setSelectedEvent(null)} className="text-warm-muted">
                    <X size={16} />
                  </button>
                  <Link
                    href={`/events/${selectedEvent.slug}`}
                    className="px-3 py-1.5 rounded-full bg-gradient-to-r from-coral to-gold text-white text-xs font-semibold"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
