"use client";

import { MapPin, Video, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateLocationData {
  date: string;
  startTime: string;
  endTime: string;
  format: "in-person" | "online" | "hybrid";
  venue: string;
  address: string;
  city: string;
  onlineLink: string;
}

interface Props {
  data: DateLocationData;
  onChange: (data: DateLocationData) => void;
}

const FORMAT_OPTIONS = [
  { value: "in-person", label: "In-Person", icon: MapPin, desc: "Physical venue" },
  { value: "online", label: "Online", icon: Video, desc: "Virtual event" },
  { value: "hybrid", label: "Hybrid", icon: Users, desc: "Both options" },
] as const;

export default function DateLocationStep({ data, onChange }: Props) {
  const set = (field: keyof DateLocationData, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* Date & Time */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Date *
        </label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => set("date", e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-mono focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
            Start Time *
          </label>
          <input
            type="time"
            value={data.startTime}
            onChange={(e) => set("startTime", e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-mono focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
            End Time
          </label>
          <input
            type="time"
            value={data.endTime}
            onChange={(e) => set("endTime", e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-mono focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
          />
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Format *
        </label>
        <div className="grid grid-cols-3 gap-3">
          {FORMAT_OPTIONS.map(({ value, label, icon: Icon, desc }) => (
            <button
              key={value}
              onClick={() => set("format", value)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                data.format === value
                  ? "border-coral bg-coral/5 text-coral"
                  : "border-[rgba(26,22,20,0.08)] bg-white text-warm-gray hover:border-coral/30"
              )}
            >
              <Icon size={20} />
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-xs text-warm-muted">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location fields */}
      {(data.format === "in-person" || data.format === "hybrid") && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
              Venue Name *
            </label>
            <input
              type="text"
              value={data.venue}
              onChange={(e) => set("venue", e.target.value)}
              placeholder="e.g. Colombo Innovation Hub"
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
              Address
            </label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Street address"
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
              City *
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="e.g. Colombo"
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
            />
          </div>
        </div>
      )}

      {/* Online link */}
      {(data.format === "online" || data.format === "hybrid") && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
            Online Link
          </label>
          <input
            type="url"
            value={data.onlineLink}
            onChange={(e) => set("onlineLink", e.target.value)}
            placeholder="https://zoom.us/j/..."
            className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
          />
          <p className="text-xs text-warm-muted mt-1">Shared with attendees after RSVP</p>
        </div>
      )}
    </div>
  );
}
