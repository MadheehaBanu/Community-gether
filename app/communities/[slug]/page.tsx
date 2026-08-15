"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowLeft, Users, Calendar, CheckCircle, Share2 } from "lucide-react";
import { getCommunityBySlug } from "@/lib/data/communities";
import { events } from "@/lib/data/events";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { useUserStore } from "@/stores/eventsStore";
import EventCard from "@/components/events/EventCard";
import { cn } from "@/lib/utils";

const TABS = ["Events", "Members", "About"] as const;
type Tab = (typeof TABS)[number];

const SAMPLE_MEMBERS = [
  { name: "Kasun Perera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", role: "Organizer" },
  { name: "Amaya Silva", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", role: "Member" },
  { name: "Nuwan Fernando", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", role: "Member" },
  { name: "Dilini Jayasuriya", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", role: "Member" },
  { name: "Tharindu Bandara", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", role: "Member" },
  { name: "Sachini Weerasinghe", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", role: "Member" },
];

export default function CommunityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const community = getCommunityBySlug(slug);
  const [activeTab, setActiveTab] = useState<Tab>("Events");
  const { joinedCommunities, joinCommunity } = useUserStore();
  const joined = community ? joinedCommunities.has(community.id) : false;
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!community) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏘️</div>
          <h2 className="font-heading text-2xl font-bold text-warm-black mb-2">Community not found</h2>
          <Link href="/communities" className="text-coral font-semibold hover:underline">Browse all communities →</Link>
        </div>
      </div>
    );
  }

  const catConfig = CATEGORY_CONFIG[community.category];
  const communityEvents = events.filter((e) => e.category === community.category);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".community-enter", {
        y: 30, opacity: 0, duration: 0.6,
        stagger: 0.1, ease: "back.out(1.7)", delay: 0.2,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Cover banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <Image src={community.cover} alt={community.name} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${community.color}20, ${community.color}60)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/50 to-transparent" />

        {/* Back button */}
        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            href="/communities"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/30 transition-all border border-white/20"
          >
            <ArrowLeft size={16} /> Back
          </Link>
        </div>

        {/* Share */}
        <div className="absolute top-20 right-4 sm:right-8">
          <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/20">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-24" ref={contentRef}>

        {/* Identity card */}
        <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl shadow-warm-lg p-6 mb-6 community-enter">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-warm-lg shrink-0 -mt-14"
              style={{ boxShadow: `0 8px 24px ${community.color}40` }}
            >
              <Image src={community.avatar} alt={community.name} fill className="object-cover" sizes="80px" />
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-white text-xs font-semibold"
                      style={{ backgroundColor: community.color }}
                    >
                      {catConfig.emoji} {catConfig.label}
                    </span>
                  </div>
                  <h1 className="font-display font-extrabold text-warm-black text-2xl leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {community.name}
                  </h1>
                  <p className="text-warm-gray font-body text-sm mt-1 max-w-lg">{community.description}</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => joinCommunity(community.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shrink-0",
                    joined
                      ? "bg-forest/10 text-forest border border-forest/20"
                      : "bg-gradient-to-r from-coral to-gold text-white shadow-glow-coral hover:shadow-warm-lg hover:scale-105"
                  )}
                >
                  {joined ? "✓ Joined" : "Join Community"}
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[rgba(26,22,20,0.06)]">
                {[
                  { icon: Users, value: community.memberCount.toLocaleString(), label: "members" },
                  { icon: Calendar, value: community.eventsCount, label: "events" },
                  { icon: CheckCircle, value: "Active", label: "community" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={15} className="text-warm-muted" />
                    <span className="font-bold text-warm-black text-sm">{value}</span>
                    <span className="text-xs text-warm-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl shadow-warm-md overflow-hidden community-enter">
          {/* Tab bar */}
          <div className="flex border-b border-[rgba(26,22,20,0.06)] px-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-4 text-sm font-semibold transition-colors",
                  activeTab === tab ? "text-warm-black" : "text-warm-muted hover:text-warm-gray"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="community-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: community.color }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Events tab */}
                {activeTab === "Events" && (
                  <div>
                    {communityEvents.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">📅</div>
                        <p className="text-warm-gray font-body">No upcoming events yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {communityEvents.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Members tab */}
                {activeTab === "Members" && (
                  <div>
                    <p className="text-sm text-warm-gray mb-5">
                      <span className="font-bold text-warm-black">{community.memberCount.toLocaleString()}</span> members
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SAMPLE_MEMBERS.map((member) => (
                        <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl bg-cream-dark/40 hover:bg-cream-dark transition-colors">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shrink-0">
                            <Image src={member.avatar} alt={member.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div>
                            <p className="font-heading font-bold text-sm text-warm-black">{member.name}</p>
                            <p className="text-xs text-warm-muted">{member.role}</p>
                          </div>
                          {member.role === "Organizer" && (
                            <span
                              className="ml-auto px-2.5 py-0.5 rounded-full text-white text-xs font-semibold"
                              style={{ backgroundColor: community.color }}
                            >
                              Organizer
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About tab */}
                {activeTab === "About" && (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <h3 className="font-heading font-bold text-warm-black mb-2">About this community</h3>
                      <p className="text-warm-gray font-body leading-relaxed">{community.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Category", value: `${catConfig.emoji} ${catConfig.label}` },
                        { label: "Members", value: community.memberCount.toLocaleString() },
                        { label: "Events hosted", value: community.eventsCount.toString() },
                        { label: "Status", value: "Active & Growing 🌱" },
                      ].map(({ label, value }) => (
                        <div key={label} className="p-4 rounded-xl bg-cream-dark/40">
                          <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted mb-1">{label}</p>
                          <p className="font-heading font-bold text-sm text-warm-black">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
