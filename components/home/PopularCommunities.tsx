"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { communities } from "@/lib/data/communities";
import Button from "@/components/ui/Button";
import { CATEGORY_CONFIG } from "@/lib/constants";

export default function PopularCommunities() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-heading text-3xl font-bold text-warm-black">
          Find Your Tribe
        </h2>
        <Link href="/communities" className="text-coral font-semibold text-sm hover:underline">
          Browse All →
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
        {communities.map((community) => {
          const cat = CATEGORY_CONFIG[community.category];
          return (
            <motion.div
              key={community.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-[180px] text-center group"
            >
              <Link href={`/communities/${community.slug}`}>
                <div
                  className="relative w-20 h-20 mx-auto mb-3 rounded-full p-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-coral"
                  style={{
                    background: `linear-gradient(135deg, ${community.color}, ${community.color}88)`,
                  }}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={community.avatar}
                      alt={community.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-sm text-warm-black mb-1 line-clamp-2">
                  {community.name}
                </h3>
                <p className="text-xs text-warm-muted mb-3">
                  {community.memberCount.toLocaleString()} members
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Join
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
