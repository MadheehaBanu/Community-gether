"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";
import { CATEGORY_CONFIG } from "@/lib/constants";
import BlobBackground from "@/components/effects/BlobBackground";
import DecorativeShapes from "@/components/effects/DecorativeShapes";
import HeroShapesWrapper from "@/components/three/HeroShapesWrapper";
import type { EventCategory } from "@/types";

const categories = Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
      tl.from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.5, ease: "back.out(2)" })
        .from(".hero-word", {
          y: 60,
          opacity: 0,
          rotateZ: -3,
          stagger: 0.08,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        }, "-=0.2")
        .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-search", { y: 30, opacity: 0, scale: 0.95, duration: 0.6 }, "-=0.2")
        .from(".category-pill", {
          y: 20,
          opacity: 0,
          scale: 0.8,
          stagger: 0.05,
          duration: 0.4,
          ease: "back.out(3)",
        }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = ["Events", "That", "Spark", "Real", "Connection"];

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] gradient-hero overflow-hidden pt-24 pb-16"
    >
      <BlobBackground />
      <DecorativeShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-4">
              FIND YOUR PEOPLE ✦
            </p>

            <h1 className="font-display font-extrabold text-warm-black leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              {words.map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.25em]">
                  {word === "Real" || word === "Connection" ? (
                    <span className="bg-gradient-to-r from-coral to-gold bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            <p className="hero-subtext text-lg text-warm-gray max-w-xl mb-8 font-body">
              Discover meetups, workshops, and experiences happening in your city.
              Join a community that gets you.
            </p>

            <div className="hero-search flex items-center bg-white rounded-full shadow-warm-lg border border-[rgba(26,22,20,0.06)] p-2 max-w-xl focus-within:shadow-glow-coral focus-within:border-coral/20 transition-all duration-300">
              <Search className="ml-4 text-warm-muted shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search events, topics, or communities..."
                className="flex-1 px-4 py-3 bg-transparent text-warm-black placeholder:text-warm-muted focus:outline-none font-body text-sm"
              />
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-cream-dark rounded-full text-sm font-semibold text-warm-gray hover:bg-cream-darker transition-colors shrink-0 mr-1">
                <MapPin size={14} />
                Colombo
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map(([key, config]) => (
                <Link
                  key={key}
                  href={`/events?category=${key}`}
                  className="category-pill inline-flex items-center gap-2 px-4 py-2 bg-white border border-[rgba(26,22,20,0.08)] rounded-full text-sm font-medium text-warm-gray hover:scale-105 transition-all duration-300 hover:border-transparent hover:shadow-warm-md"
                  style={{ ["--cat-color" as string]: config.color }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${config.color}15`;
                    e.currentTarget.style.color = config.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "";
                  }}
                >
                  <span>{config.emoji}</span>
                  {config.label.split(" ")[0]}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 hidden lg:block">
            <HeroShapesWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}
