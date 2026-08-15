"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { MapPin, Calendar, Users, Edit3, Share2, CheckCircle } from "lucide-react";
import { getUserByUsername } from "@/lib/data/users";
import { events } from "@/lib/data/events";
import { communities } from "@/lib/data/communities";
import { useUserStore } from "@/stores/eventsStore";
import EventCard from "@/components/events/EventCard";
import CommunityCard from "@/components/communities/CommunityCard";
import { cn } from "@/lib/utils";

const TABS = ["Upcoming", "Past", "Hosted", "Communities"] as const;
type Tab = (typeof TABS)[number];

const BADGE_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
];

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const user = getUserByUsername(username);
  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");
  const { avatar: storeAvatar } = useUserStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Use store avatar for "kasun" (the logged-in user)
  const displayAvatar = username === "kasun" ? storeAvatar : user?.avatar;

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="font-heading text-2xl font-bold text-warm-black mb-2">User not found</h2>
          <Link href="/" className="text-coral font-semibold hover:underline">Go home →</Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = username === "kasun";

  // Tab content data
  const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 4);
  const pastEvents = events.filter((e) => e.status !== "live").slice(0, 3);
  const hostedEvents = events.filter((e) => e.host.id === "h1").slice(0, 3);

  // GSAP stat counters
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-num", {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.1,
        delay: 0.3,
      });
      gsap.from(".profile-enter", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.1,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-cream" ref={contentRef}>
      {/* Cover */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <Image
          src={user.cover}
          alt="Cover"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 to-transparent" />

        {/* Action buttons */}
        <div className="absolute top-20 right-4 sm:right-8 flex items-center gap-2">
          <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/20">
            <Share2 size={18} />
          </button>
          {isOwnProfile && (
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/30 transition-all border border-white/20">
              <Edit3 size={15} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-24">

        {/* Identity card */}
        <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl shadow-warm-lg p-6 mb-6 profile-enter">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0 -mt-16">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-warm-lg">
                <Image
                  src={displayAvatar || user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              {isOwnProfile && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-forest border-2 border-white flex items-center justify-center">
                  <CheckCircle size={12} className="text-white" fill="white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-2">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-display font-extrabold text-2xl text-warm-black" style={{ letterSpacing: "-0.02em" }}>
                      {user.name}
                    </h1>
                    <CheckCircle size={18} className="text-ocean fill-ocean shrink-0" />
                  </div>
                  <p className="text-sm text-warm-muted font-mono">@{user.username}</p>
                </div>

                {!isOwnProfile && (
                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-coral to-gold text-white text-sm font-semibold hover:shadow-glow-coral transition-all shrink-0">
                    Follow
                  </button>
                )}
              </div>

              <p className="text-sm text-warm-gray font-body mt-2 max-w-lg leading-relaxed">
                {user.bio}
              </p>

              <div className="flex items-center gap-1.5 mt-2 text-xs text-warm-muted">
                <MapPin size={12} />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[rgba(26,22,20,0.06)]">
            {[
              { label: "Events Attended", value: user.eventsAttended, icon: Calendar },
              { label: "Events Hosted", value: user.eventsHosted, icon: Users },
              { label: "Communities", value: user.communities, icon: Users },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <p className="stat-num font-display font-extrabold text-2xl text-warm-black" style={{ letterSpacing: "-0.02em" }}>
                  {value}
                </p>
                <p className="text-xs text-warm-muted font-body mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Followers row */}
        <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl shadow-warm-md p-4 mb-6 profile-enter">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {BADGE_AVATARS.map((avatar, i) => (
                  <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                    <Image src={avatar} alt="" fill className="object-cover" sizes="32px" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-warm-gray font-body">
                <span className="font-bold text-warm-black">248</span> followers ·{" "}
                <span className="font-bold text-warm-black">91</span> following
              </p>
            </div>
            {isOwnProfile && (
              <Link href="/create" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-coral to-gold text-white text-xs font-semibold hover:shadow-glow-coral transition-all">
                <span>+</span> Create Event
              </Link>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl shadow-warm-md overflow-hidden profile-enter">
          {/* Tab bar */}
          <div className="flex border-b border-[rgba(26,22,20,0.06)] px-4 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-4 text-sm font-semibold transition-colors shrink-0",
                  activeTab === tab ? "text-warm-black" : "text-warm-muted hover:text-warm-gray"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="profile-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Upcoming */}
                {activeTab === "Upcoming" && (
                  <div>
                    {upcomingEvents.length === 0 ? (
                      <EmptyState emoji="📅" text="No upcoming events" cta="Browse Events" href="/events" />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {upcomingEvents.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Past */}
                {activeTab === "Past" && (
                  <div>
                    {pastEvents.length === 0 ? (
                      <EmptyState emoji="🎭" text="No past events yet" cta="Discover Events" href="/events" />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pastEvents.map((event) => (
                          <div key={event.id} className="relative">
                            <EventCard event={event} />
                            <div className="absolute inset-0 bg-white/50 rounded-2xl pointer-events-none" />
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-warm-black/60 text-white text-xs font-semibold backdrop-blur-sm">
                              Attended ✓
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Hosted */}
                {activeTab === "Hosted" && (
                  <div>
                    {hostedEvents.length === 0 ? (
                      <EmptyState emoji="🎪" text="No hosted events yet" cta="Create Event" href="/create" />
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {hostedEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                        <Link
                          href="/create"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-coral/30 text-coral text-sm font-semibold hover:bg-coral/5 transition-all"
                        >
                          + Create New Event
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Communities */}
                {activeTab === "Communities" && (
                  <div>
                    {communities.length === 0 ? (
                      <EmptyState emoji="🏘️" text="No communities joined" cta="Find Communities" href="/communities" />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {communities.slice(0, 4).map((community) => (
                          <CommunityCard key={community.id} community={community} />
                        ))}
                      </div>
                    )}
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

function EmptyState({ emoji, text, cta, href }: { emoji: string; text: string; cta: string; href: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <p className="text-warm-gray font-body text-sm mb-4">{text}</p>
      <Link
        href={href}
        className="px-5 py-2 rounded-full bg-coral text-white text-sm font-semibold hover:bg-coral-light transition-colors"
      >
        {cta} →
      </Link>
    </div>
  );
}
