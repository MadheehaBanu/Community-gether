import type { Event } from "@/types";

export const events: Event[] = [
  {
    id: "1",
    slug: "colombo-tech-meetup-august",
    name: "Colombo Tech Meetup — AI & Web Dev",
    description:
      "Join us for an evening of talks on AI integration in web development. Featuring speakers from top Sri Lankan tech companies. Networking, pizza, and great conversations!\n\n## What to Expect\n\n- Keynote on AI in production\n- Live coding demos\n- Pizza & networking\n- Q&A with industry leaders",
    category: "tech",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    date: "2026-08-15",
    startTime: "18:00",
    endTime: "21:00",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "Colombo Innovation Hub",
      address: "42 Bauddhaloka Mawatha, Colombo 07",
      city: "Colombo",
      coordinates: { lat: 6.9147, lng: 79.8631 },
    },
    host: {
      id: "h1",
      name: "Kasun Perera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      bio: "Tech community builder. Organizing meetups since 2022.",
      eventsHosted: 24,
      verified: true,
    },
    price: { type: "free" },
    capacity: 80,
    attendeeCount: 62,
    tags: ["AI", "Web Development", "Networking", "JavaScript"],
    status: "upcoming",
    badge: "POPULAR",
  },
  {
    id: "2",
    slug: "creative-design-workshop",
    name: "UI/UX Design Workshop — From Zero to Portfolio",
    description:
      "A hands-on workshop for aspiring designers. Learn Figma, design principles, and build a portfolio piece in one day.",
    category: "creative",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    date: "2026-08-20",
    startTime: "09:00",
    endTime: "17:00",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "Hatch Coworking Space",
      address: "36 D.S. Senanayake Mawatha, Colombo 08",
      city: "Colombo",
      coordinates: { lat: 6.905, lng: 79.872 },
    },
    host: {
      id: "h2",
      name: "Amaya Silva",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      bio: "Senior Product Designer at a fintech startup.",
      eventsHosted: 8,
      verified: true,
    },
    price: { type: "paid", amount: 2500, currency: "LKR" },
    capacity: 30,
    attendeeCount: 27,
    tags: ["Design", "UI/UX", "Figma", "Workshop"],
    status: "upcoming",
    badge: "ALMOST FULL",
  },
  {
    id: "3",
    slug: "sunday-morning-yoga-park",
    name: "Sunday Morning Yoga in the Park",
    description:
      "Start your Sunday with mindful movement. All levels welcome. Bring your mat and water.",
    category: "wellness",
    coverImage:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    date: "2026-08-10",
    startTime: "06:30",
    endTime: "07:30",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "Viharamahadevi Park",
      address: "Colombo 07",
      city: "Colombo",
      coordinates: { lat: 6.9157, lng: 79.8636 },
    },
    host: {
      id: "h3",
      name: "Dilini Jayasuriya",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      bio: "Certified yoga instructor. Bringing wellness to the community.",
      eventsHosted: 52,
      verified: false,
    },
    price: { type: "free" },
    capacity: 40,
    attendeeCount: 18,
    tags: ["Yoga", "Wellness", "Morning", "Outdoor"],
    status: "upcoming",
    badge: null,
  },
  {
    id: "4",
    slug: "startup-pitch-night",
    name: "Startup Pitch Night — Season 3",
    description:
      "5 early-stage startups pitch to a panel of investors and mentors. Network with founders, investors, and the startup ecosystem.",
    category: "business",
    coverImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    date: "2026-08-22",
    startTime: "18:30",
    endTime: "21:30",
    timezone: "Asia/Colombo",
    location: {
      type: "hybrid",
      venue: "Trace Expert City",
      address: "Trace Expert City, Maradana",
      city: "Colombo",
      coordinates: { lat: 6.929, lng: 79.865 },
      onlineLink: "https://zoom.us/j/example",
    },
    host: {
      id: "h4",
      name: "Nuwan Fernando",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      bio: "Angel investor & startup mentor.",
      eventsHosted: 15,
      verified: true,
    },
    price: { type: "free" },
    capacity: 120,
    attendeeCount: 89,
    tags: ["Startups", "Pitching", "Investors", "Networking"],
    status: "upcoming",
    badge: "FEATURED",
  },
  {
    id: "5",
    slug: "photography-walk-galle-fort",
    name: "Photography Walk — Galle Fort Golden Hour",
    description:
      "Capture the magic of Galle Fort during golden hour. Learn composition, lighting, and storytelling through your lens.",
    category: "creative",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    date: "2026-08-17",
    startTime: "16:30",
    endTime: "19:00",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "Galle Fort Main Gate",
      address: "Galle Fort, Galle",
      city: "Galle",
      coordinates: { lat: 6.0269, lng: 80.217 },
    },
    host: {
      id: "h5",
      name: "Tharindu Bandara",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      bio: "Travel & street photographer. 50K+ followers.",
      eventsHosted: 12,
      verified: true,
    },
    price: { type: "paid", amount: 1500, currency: "LKR" },
    capacity: 20,
    attendeeCount: 16,
    tags: ["Photography", "Walking", "Galle", "Golden Hour"],
    status: "upcoming",
    badge: "ALMOST FULL",
  },
  {
    id: "6",
    slug: "react-nextjs-bootcamp",
    name: "React & Next.js Weekend Bootcamp",
    description:
      "Intensive 2-day bootcamp covering React fundamentals to Next.js App Router. Build and deploy a full project by Sunday evening.",
    category: "tech",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    date: "2026-08-23",
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "University of Moratuwa Tech Hub",
      address: "Katubedda, Moratuwa",
      city: "Moratuwa",
      coordinates: { lat: 6.7955, lng: 79.9014 },
    },
    host: {
      id: "h6",
      name: "Madheeha Banu",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
      bio: "Full Stack Developer. Passionate about teaching and community.",
      eventsHosted: 3,
      verified: false,
    },
    price: { type: "paid", amount: 5000, currency: "LKR" },
    capacity: 25,
    attendeeCount: 19,
    tags: ["React", "Next.js", "Bootcamp", "Web Dev"],
    status: "upcoming",
    badge: "NEW",
  },
  {
    id: "7",
    slug: "book-club-august",
    name: "Monthly Book Club — 'Atomic Habits'",
    description:
      "This month we're discussing James Clear's 'Atomic Habits'. Come share your takeaways and how you've applied the principles.",
    category: "social",
    coverImage:
      "https://images.unsplash.com/photo-1512820790801-4153a73793b8?w=800&q=80",
    date: "2026-08-28",
    startTime: "17:00",
    endTime: "19:00",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "Barefoot Garden Café",
      address: "706 Galle Road, Colombo 03",
      city: "Colombo",
      coordinates: { lat: 6.8985, lng: 79.8553 },
    },
    host: {
      id: "h7",
      name: "Sachini Weerasinghe",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      bio: "Avid reader. Building a reading culture in Colombo.",
      eventsHosted: 11,
      verified: false,
    },
    price: { type: "free" },
    capacity: 15,
    attendeeCount: 12,
    tags: ["Books", "Discussion", "Self-improvement", "Social"],
    status: "upcoming",
    badge: null,
  },
  {
    id: "8",
    slug: "live-music-jam-session",
    name: "Open Mic & Jam Session Night",
    description:
      "Bring your instrument or just your voice! Open stage for musicians of all levels. Acoustic sets, jam sessions, and good vibes.",
    category: "culture",
    coverImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    date: "2026-08-09",
    startTime: "19:00",
    endTime: "23:00",
    timezone: "Asia/Colombo",
    location: {
      type: "in-person",
      venue: "The Tap House",
      address: "15 Deal Place, Colombo 03",
      city: "Colombo",
      coordinates: { lat: 6.897, lng: 79.856 },
    },
    host: {
      id: "h8",
      name: "Ashan De Silva",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
      bio: "Musician & event curator. Bringing live music back to Colombo.",
      eventsHosted: 20,
      verified: true,
    },
    price: { type: "paid", amount: 500, currency: "LKR" },
    capacity: 60,
    attendeeCount: 45,
    tags: ["Music", "Live", "Open Mic", "Jam Session"],
    status: "live",
    badge: "POPULAR",
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents() {
  return events.filter((e) => e.badge === "FEATURED" || e.badge === "POPULAR").slice(0, 5);
}

export function getLiveEvents() {
  return events.filter((e) => e.status === "live");
}

export function getUpcomingEvents() {
  return events.filter((e) => e.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date));
}
