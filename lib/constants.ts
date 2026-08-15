import type { EventCategory } from "@/types";

export const CATEGORY_CONFIG: Record<
  EventCategory,
  { label: string; emoji: string; color: string }
> = {
  tech: { label: "Tech & Dev", emoji: "🖥️", color: "#2563a8" },
  creative: { label: "Creative", emoji: "🎨", color: "#7c2d5b" },
  social: { label: "Social", emoji: "🤝", color: "#e85d3a" },
  wellness: { label: "Wellness", emoji: "🧘", color: "#2d7a4f" },
  business: { label: "Business", emoji: "💼", color: "#c8963e" },
  culture: { label: "Culture", emoji: "🎭", color: "#9c4dc7" },
};

export const TICKER_ITEMS = [
  "2,500+ Events",
  "180+ Communities",
  "45,000 Members",
  "12 Cities",
  "Join Free",
];

export const NAV_LINKS = [
  { href: "/", label: "Discover" },
  { href: "/events", label: "Events" },
  { href: "/communities", label: "Communities" },
  { href: "/map", label: "Map" },
];

export const MOBILE_NAV = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/events", label: "Events", emoji: "🔍" },
  { href: "/create", label: "Create", emoji: "➕" },
  { href: "/map", label: "Map", emoji: "🗺️" },
  { href: "/profile/kasun", label: "Profile", emoji: "👤" },
];
