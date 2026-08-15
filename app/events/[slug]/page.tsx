"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  ArrowLeft, Share2, Bookmark, MapPin, Calendar, Clock,
  Users, CheckCircle, ExternalLink, ChevronDown,
} from "lucide-react";
import { getEventBySlug, events } from "@/lib/data/events";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { formatFullDate, formatTime, formatPrice, getSpotsLeft, getCategoryColor } from "@/lib/utils";
import RSVPButton from "@/components/events/RSVPButton";
import Comments from "@/components/events/Comments";
import RelatedEvents from "@/components/events/RelatedEvents";
import StickerBadge from "@/components/ui/StickerBadge";
import AvatarStack from "@/components/ui/AvatarStack";
import WarmCard from "@/components/ui/WarmCard";
import { cn } from "@/lib/utils";

const SAMPLE_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&q=80",
];

const TABS = ["About", "Attendees", "Discussion"] as const;
type Tab = (typeof TABS)[number];

const HIGHLIGHTS = [
  { emoji: "🎤", text: "Expert speakers from top companies" },
  { emoji: "🤝", text: "Networking session included" },
  { emoji: "🍕", text: "Food & refreshments provided" },
  { emoji: "📸", text: "Professional photography" },
];

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const event = getEventBySlug(slug);

  const [activeTab, setActiveTab] = useState<Tab>("About");
  const [saved, setSaved] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const tabIndicatorRef = useRef<HTMLSpanElement>(null);

  if (!event) return notFound();

  const catConfig = CATEGORY_CONFIG[event.category];
  const spotsLeft = getSpotsLeft(event.capacity, event.attendeeCount);
  const spotsPercent = Math.round((event.attendeeCount / event.capacity) * 100);
  const catColor = getCategoryColor(event.category);

  // Hero parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleScroll = () => {
      hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".detail-enter", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    }, infoRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero image */}
      <div className="relative h-[45vh] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 scale-110">
          <Image
            src={event.coverImage}
            alt={event.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-warm-black/20 to-transparent" />

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/events"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/30 transition-all border border-white/20"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/20">
              <Share2 size={18} />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={cn(
                "p-2.5 rounded-full backdrop-blur-md transition-all border",
                saved
                  ? "bg-coral text-white border-coral"
                  : "bg-white/20 text-white hover:bg-white/30 border-white/20"
              )}
            >
              <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Badge on hero */}
        <div className="absolute bottom-6 left-6">
          <StickerBadge badge={event.badge} />
        </div>
      </div>

      {/* Main content — pulled up over hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
        <div ref={infoRef} className="grid lg:grid-cols-3 gap-6">

          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Event name card */}
            <WarmCard className="p-6 detail-enter">
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: catColor }}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  {catConfig.emoji} {catConfig.label}
                </span>
                {event.status === "live" && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest/10 text-forest text-xs font-semibold ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest animate-ping" />
                    Live Now
                  </span>
                )}
              </div>

              <h1
                className="font-display font-extrabold text-warm-black mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
              >
                {event.name}
              </h1>

              {/* Host row */}
              <div className="flex items-center gap-3 pb-4 border-b border-[rgba(26,22,20,0.06)]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cream-dark">
                  <Image src={event.host.avatar} alt={event.host.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-sm text-warm-black">{event.host.name}</span>
                    {event.host.verified && (
                      <CheckCircle size={14} className="text-ocean fill-ocean" />
                    )}
                  </div>
                  <span className="text-xs text-warm-muted">{event.host.eventsHosted} events hosted</span>
                </div>
                <button className="ml-auto px-4 py-1.5 rounded-full border border-[rgba(26,22,20,0.1)] text-xs font-semibold text-warm-gray hover:border-coral hover:text-coral transition-all">
                  Follow
                </button>
              </div>

              {/* Quick info pills */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: Calendar, label: formatFullDate(event.date), sub: null },
                  { icon: Clock, label: `${formatTime(event.startTime)} – ${formatTime(event.endTime)}`, sub: event.timezone },
                  { icon: MapPin, label: event.location.venue, sub: event.location.city },
                  { icon: Users, label: `${event.attendeeCount} attending`, sub: `${event.capacity} capacity` },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-cream-dark/50">
                    <Icon size={16} className="text-coral mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-warm-black leading-tight">{label}</p>
                      {sub && <p className="text-xs text-warm-muted mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Online link */}
              {event.location.onlineLink && (
                <a
                  href={event.location.onlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl bg-ocean/5 border border-ocean/20 text-ocean text-sm font-semibold hover:bg-ocean/10 transition-colors"
                >
                  <ExternalLink size={14} />
                  Join Online Link (shared after RSVP)
                </a>
              )}
            </WarmCard>

            {/* Tabs */}
            <WarmCard className="p-6 detail-enter">
              {/* Tab bar */}
              <div className="relative flex gap-1 mb-6 border-b border-[rgba(26,22,20,0.06)]">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "relative px-4 py-2.5 text-sm font-semibold transition-colors",
                      activeTab === tab ? "text-warm-black" : "text-warm-muted hover:text-warm-gray"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* About tab */}
                  {activeTab === "About" && (
                    <div className="space-y-6">
                      <div className="prose prose-sm max-w-none text-warm-gray font-body leading-relaxed">
                        {event.description.split("\n").map((line, i) => (
                          <p key={i} className="mb-3 last:mb-0">{line}</p>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="font-heading font-bold text-sm text-warm-black mb-3 uppercase tracking-wider">
                          What to Expect
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {HIGHLIGHTS.map((h) => (
                            <div key={h.text} className="flex items-center gap-3 p-3 rounded-xl bg-cream-dark/40">
                              <span className="text-lg">{h.emoji}</span>
                              <span className="text-sm font-medium text-warm-gray">{h.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full bg-cream-dark text-xs font-semibold text-warm-gray border border-[rgba(26,22,20,0.06)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attendees tab */}
                  {activeTab === "Attendees" && (
                    <div className="space-y-4">
                      <p className="text-sm text-warm-gray font-body">
                        <span className="font-bold text-warm-black">{event.attendeeCount}</span> people are going
                      </p>
                      <div className="grid grid-cols-8 gap-2">
                        {SAMPLE_AVATARS.map((avatar, i) => (
                          <div
                            key={i}
                            className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-white shadow-warm-sm hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Image src={avatar} alt="" fill className="object-cover" sizes="48px" />
                          </div>
                        ))}
                      </div>
                      <button className="flex items-center gap-2 text-sm font-semibold text-coral hover:underline">
                        <ChevronDown size={16} />
                        View all {event.attendeeCount} attendees
                      </button>
                    </div>
                  )}

                  {/* Discussion tab */}
                  {activeTab === "Discussion" && <Comments />}
                </motion.div>
              </AnimatePresence>
            </WarmCard>
          </div>

          {/* Right — sticky RSVP sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">

              {/* RSVP card */}
              <WarmCard className="p-5 detail-enter">
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "text-2xl font-display font-extrabold",
                      event.price.type === "free" ? "text-forest" : "text-coral"
                    )}
                  >
                    {formatPrice(event.price)}
                  </span>
                  {event.price.type === "paid" && (
                    <span className="text-xs text-warm-muted font-body">per person</span>
                  )}
                </div>

                {/* Spots progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-warm-gray">{event.attendeeCount} going</span>
                    <span className={spotsLeft <= 5 ? "text-coral" : "text-warm-muted"}>
                      {spotsLeft} spots left
                    </span>
                  </div>
                  <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${spotsPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      className={cn(
                        "h-full rounded-full",
                        spotsPercent >= 90 ? "bg-coral" : spotsPercent >= 70 ? "bg-gold" : "bg-forest"
                      )}
                    />
                  </div>
                </div>

                <RSVPButton eventId={event.id} fullWidth />

                {/* Avatar stack */}
                <div className="mt-4 pt-4 border-t border-[rgba(26,22,20,0.06)]">
                  <AvatarStack avatars={SAMPLE_AVATARS.slice(0, 4)} count={event.attendeeCount - 4} />
                </div>
              </WarmCard>

              {/* Date & Location card */}
              <WarmCard className="p-5 detail-enter space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={15} className="text-coral" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-warm-muted">Date & Time</span>
                  </div>
                  <p className="font-heading font-bold text-sm text-warm-black">{formatFullDate(event.date)}</p>
                  <p className="font-mono text-xs text-warm-gray mt-0.5">
                    {formatTime(event.startTime)} – {formatTime(event.endTime)}
                  </p>
                  <button className="mt-2 text-xs font-semibold text-coral hover:underline flex items-center gap-1">
                    <Calendar size={12} />
                    Add to Calendar
                  </button>
                </div>

                <div className="border-t border-[rgba(26,22,20,0.06)] pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={15} className="text-coral" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-warm-muted">Location</span>
                  </div>
                  <p className="font-heading font-bold text-sm text-warm-black">{event.location.venue}</p>
                  <p className="text-xs text-warm-gray mt-0.5">{event.location.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${event.location.coordinates.lat},${event.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs font-semibold text-coral hover:underline flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    Get Directions
                  </a>
                </div>
              </WarmCard>

              {/* Host card */}
              <WarmCard className="p-5 detail-enter">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted mb-3">Hosted by</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cream-dark shrink-0">
                    <Image src={event.host.avatar} alt={event.host.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-heading font-bold text-sm text-warm-black truncate">{event.host.name}</span>
                      {event.host.verified && <CheckCircle size={13} className="text-ocean fill-ocean shrink-0" />}
                    </div>
                    <p className="text-xs text-warm-muted mt-0.5 line-clamp-2">{event.host.bio}</p>
                  </div>
                </div>
              </WarmCard>
            </div>
          </div>
        </div>

        {/* Related events */}
        <div className="mt-8 detail-enter">
          <RelatedEvents current={event} />
        </div>
      </div>

      {/* Mobile sticky RSVP bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-warm-xl border border-[rgba(26,22,20,0.06)] p-3 flex items-center gap-3">
          <div>
            <p className="text-xs text-warm-muted font-body">Price</p>
            <p className={cn("font-display font-extrabold text-lg", event.price.type === "free" ? "text-forest" : "text-coral")}>
              {formatPrice(event.price)}
            </p>
          </div>
          <div className="flex-1">
            <RSVPButton eventId={event.id} fullWidth />
          </div>
        </div>
      </div>
    </div>
  );
}
