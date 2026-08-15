"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Calendar } from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { useUserStore } from "@/stores/eventsStore";
import { cn } from "@/lib/utils";
import type { Community } from "@/types";

export default function CommunityCard({ community }: { community: Community }) {
  const { joinedCommunities, joinCommunity } = useUserStore();
  const joined = joinedCommunities.has(community.id);
  const catConfig = CATEGORY_CONFIG[community.category];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm-lg hover:border-coral/20 transition-all duration-300 group">
        {/* Cover */}
        <Link href={`/communities/${community.slug}`}>
          <div className="relative h-32 overflow-hidden">
            <Image
              src={community.cover}
              alt={community.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 to-transparent" />
            <span
              className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: community.color }}
            >
              {catConfig.emoji} {catConfig.label}
            </span>
          </div>
        </Link>

        <div className="p-5">
          <div className="flex items-start gap-3">
            <Link href={`/communities/${community.slug}`}>
              <div
                className="relative w-14 h-14 rounded-2xl overflow-hidden border-4 border-white shadow-warm-md shrink-0 -mt-10 hover:scale-105 transition-transform"
                style={{ boxShadow: `0 4px 16px ${community.color}30` }}
              >
                <Image src={community.avatar} alt={community.name} fill className="object-cover" sizes="56px" />
              </div>
            </Link>
            <div className="flex-1 min-w-0 pt-1">
              <Link href={`/communities/${community.slug}`}>
                <h3 className="font-heading font-bold text-warm-black text-base leading-tight hover:text-coral transition-colors line-clamp-1">
                  {community.name}
                </h3>
              </Link>
              <p className="text-xs text-warm-muted mt-0.5 line-clamp-2 font-body">{community.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[rgba(26,22,20,0.06)]">
            <div className="flex items-center gap-1.5 text-xs text-warm-gray">
              <Users size={13} className="text-warm-muted" />
              <span className="font-semibold text-warm-black">{community.memberCount.toLocaleString()}</span> members
            </div>
            <div className="flex items-center gap-1.5 text-xs text-warm-gray">
              <Calendar size={13} className="text-warm-muted" />
              <span className="font-semibold text-warm-black">{community.eventsCount}</span> events
            </div>
            <button
              onClick={() => joinCommunity(community.id)}
              className={cn(
                "ml-auto px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
                joined
                  ? "bg-forest/10 text-forest border-forest/20"
                  : "border-coral text-coral hover:bg-coral hover:text-white"
              )}
            >
              {joined ? "✓ Joined" : "Join"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
