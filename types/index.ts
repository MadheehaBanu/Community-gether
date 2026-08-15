export type EventCategory =
  | "tech"
  | "creative"
  | "social"
  | "wellness"
  | "business"
  | "culture";

export type EventStatus = "upcoming" | "live" | "past";
export type EventBadge = "POPULAR" | "NEW" | "ALMOST FULL" | "FEATURED" | null;
export type LocationType = "in-person" | "online" | "hybrid";
export type PriceType = "free" | "paid";

export interface Host {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  eventsHosted: number;
  verified: boolean;
}

export interface EventLocation {
  type: LocationType;
  venue: string;
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  onlineLink?: string;
}

export interface EventPrice {
  type: PriceType;
  amount?: number;
  currency?: string;
}

export interface Event {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: EventCategory;
  coverImage: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  location: EventLocation;
  host: Host;
  price: EventPrice;
  capacity: number;
  attendeeCount: number;
  tags: string[];
  status: EventStatus;
  badge: EventBadge;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  description: string;
  avatar: string;
  cover: string;
  category: EventCategory;
  memberCount: number;
  eventsCount: number;
  color: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  avatar: string;
  eventsAttended: number;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  cover: string;
  eventsAttended: number;
  eventsHosted: number;
  communities: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  replies?: Comment[];
}
