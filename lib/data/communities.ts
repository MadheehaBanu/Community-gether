import type { Community } from "@/types";

export const communities: Community[] = [
  {
    id: "c1",
    slug: "colombo-tech-community",
    name: "Colombo Tech Community",
    description:
      "Sri Lanka's largest tech community. Weekly meetups, hackathons, and knowledge sharing.",
    avatar:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    category: "tech",
    memberCount: 2400,
    eventsCount: 48,
    color: "#2563a8",
  },
  {
    id: "c2",
    slug: "creative-collective-sl",
    name: "Creative Collective SL",
    description:
      "Designers, photographers, artists, and creative minds. Workshops and collaborative projects.",
    avatar:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    category: "creative",
    memberCount: 890,
    eventsCount: 22,
    color: "#7c2d5b",
  },
  {
    id: "c3",
    slug: "startup-grind-colombo",
    name: "Startup Grind Colombo",
    description:
      "Connecting founders, investors, and innovators. Monthly fireside chats and pitch nights.",
    avatar:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    category: "business",
    memberCount: 1200,
    eventsCount: 35,
    color: "#c8963e",
  },
  {
    id: "c4",
    slug: "mindful-movement-sl",
    name: "Mindful Movement SL",
    description:
      "Yoga, meditation, and wellness events across Sri Lanka. All levels welcome.",
    avatar:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    category: "wellness",
    memberCount: 560,
    eventsCount: 52,
    color: "#2d7a4f",
  },
  {
    id: "c5",
    slug: "bookworms-colombo",
    name: "Bookworms Colombo",
    description:
      "Monthly book discussions, author meetups, and reading challenges.",
    avatar:
      "https://images.unsplash.com/photo-1512820790801-4153a73793b8?w=200&q=80",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    category: "social",
    memberCount: 340,
    eventsCount: 11,
    color: "#e85d3a",
  },
];

export function getCommunityBySlug(slug: string) {
  return communities.find((c) => c.slug === slug);
}
