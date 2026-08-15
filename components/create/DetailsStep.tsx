"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types";

export interface DetailsData {
  name: string;
  category: EventCategory | "";
  description: string;
  coverImage: string;
}

interface Props {
  data: DetailsData;
  onChange: (data: DetailsData) => void;
}

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
];

export default function DetailsStep({ data, onChange }: Props) {
  const set = (field: keyof DetailsData, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* Cover image */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Cover Image
        </label>
        {data.coverImage ? (
          <div className="relative h-48 rounded-2xl overflow-hidden group">
            <Image src={data.coverImage} alt="Cover" fill className="object-cover" sizes="600px" />
            <div className="absolute inset-0 bg-warm-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => set("coverImage", "")}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="h-48 rounded-2xl border-2 border-dashed border-[rgba(26,22,20,0.15)] bg-cream-dark/50 flex flex-col items-center justify-center gap-2 hover:border-coral/40 hover:bg-coral/5 transition-all cursor-pointer">
              <Upload size={24} className="text-warm-muted" />
              <p className="text-sm text-warm-muted font-body">Click to upload or drag & drop</p>
              <p className="text-xs text-warm-muted">PNG, JPG up to 10MB</p>
            </div>
            <div>
              <p className="text-xs text-warm-muted mb-2 font-semibold">Or pick a sample:</p>
              <div className="grid grid-cols-4 gap-2">
                {PLACEHOLDER_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => set("coverImage", img)}
                    className="relative h-16 rounded-xl overflow-hidden hover:ring-2 hover:ring-coral transition-all"
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Event Name *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Give your event a great name..."
          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm text-base"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Category *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => set("category", key)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all",
                  data.category === key
                    ? "text-white border-transparent"
                    : "bg-white text-warm-gray border-[rgba(26,22,20,0.08)] hover:border-transparent hover:text-white"
                )}
                style={
                  data.category === key
                    ? { backgroundColor: config.color, borderColor: config.color }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (data.category !== key) {
                    e.currentTarget.style.backgroundColor = config.color;
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (data.category !== key) {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "";
                  }
                }}
              >
                <span className="text-lg">{config.emoji}</span>
                {config.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Description *
        </label>
        <textarea
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Tell people what your event is about, what to expect, and why they should come..."
          rows={5}
          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm resize-none text-sm leading-relaxed"
        />
        <p className="text-xs text-warm-muted mt-1 text-right">{data.description.length} characters</p>
      </div>
    </div>
  );
}
