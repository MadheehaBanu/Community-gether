"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TicketsData {
  priceType: "free" | "paid";
  amount: string;
  currency: string;
  capacity: string;
  tags: string[];
}

interface Props {
  data: TicketsData;
  onChange: (data: TicketsData) => void;
}

export default function TicketsStep({ data, onChange }: Props) {
  const [tagInput, setTagInput] = useState("");
  const set = (field: keyof TicketsData, value: string | string[]) =>
    onChange({ ...data, [field]: value });

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !data.tags.includes(tag) && data.tags.length < 8) {
      set("tags", [...data.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) =>
    set("tags", data.tags.filter((t) => t !== tag));

  return (
    <div className="space-y-6">
      {/* Price type */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-3">
          Ticket Type *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["free", "paid"] as const).map((type) => (
            <button
              key={type}
              onClick={() => set("priceType", type)}
              className={cn(
                "flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all",
                data.priceType === type
                  ? type === "free"
                    ? "border-forest bg-forest/5 text-forest"
                    : "border-coral bg-coral/5 text-coral"
                  : "border-[rgba(26,22,20,0.08)] bg-white text-warm-gray hover:border-warm-black/20"
              )}
            >
              <span className="text-2xl">{type === "free" ? "🎁" : "🎟️"}</span>
              <span className="font-heading font-bold capitalize">{type}</span>
              <span className="text-xs text-warm-muted">
                {type === "free" ? "No charge for attendees" : "Set a ticket price"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Paid fields */}
      {data.priceType === "paid" && (
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
              Currency
            </label>
            <select
              value={data.currency}
              onChange={(e) => set("currency", e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body focus:outline-none focus:border-coral/40 transition-all shadow-warm-sm"
            >
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
              Amount *
            </label>
            <input
              type="number"
              value={data.amount}
              onChange={(e) => set("amount", e.target.value)}
              placeholder="e.g. 2500"
              min="0"
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-mono placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
            />
          </div>
        </div>
      )}

      {/* Capacity */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Capacity
        </label>
        <input
          type="number"
          value={data.capacity}
          onChange={(e) => set("capacity", e.target.value)}
          placeholder="Max number of attendees (leave blank for unlimited)"
          min="1"
          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-mono placeholder:text-warm-muted focus:outline-none focus:border-coral/40 focus:shadow-glow-coral transition-all shadow-warm-sm"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-2">
          Tags <span className="normal-case font-normal">(up to 8)</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Add a tag and press Enter..."
            className="flex-1 px-5 py-3 rounded-2xl bg-white border border-[rgba(26,22,20,0.08)] text-warm-black font-body placeholder:text-warm-muted focus:outline-none focus:border-coral/40 transition-all shadow-warm-sm text-sm"
          />
          <button
            onClick={addTag}
            disabled={!tagInput.trim() || data.tags.length >= 8}
            className="px-4 py-3 rounded-2xl bg-coral text-white font-semibold disabled:opacity-40 hover:bg-coral-light transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-dark border border-[rgba(26,22,20,0.08)] text-sm font-semibold text-warm-gray"
              >
                #{tag}
                <button onClick={() => removeTag(tag)} className="text-warm-muted hover:text-coral transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
