import { create } from "zustand";
import type { Event, EventCategory } from "@/types";
import { events as initialEvents } from "@/lib/data/events";

interface EventsStore {
  events: Event[];
  rsvpEventIds: Set<string>;
  rsvp: (eventId: string) => void;
  cancelRsvp: (eventId: string) => void;
  isRsvpd: (eventId: string) => boolean;
}

export const useEventsStore = create<EventsStore>((set, get) => ({
  events: initialEvents,
  rsvpEventIds: new Set(),
  rsvp: (eventId) =>
    set((state) => {
      const rsvpEventIds = new Set(state.rsvpEventIds);
      rsvpEventIds.add(eventId);
      const events = state.events.map((e) =>
        e.id === eventId ? { ...e, attendeeCount: e.attendeeCount + 1 } : e
      );
      return { rsvpEventIds, events };
    }),
  cancelRsvp: (eventId) =>
    set((state) => {
      const rsvpEventIds = new Set(state.rsvpEventIds);
      rsvpEventIds.delete(eventId);
      const events = state.events.map((e) =>
        e.id === eventId
          ? { ...e, attendeeCount: Math.max(0, e.attendeeCount - 1) }
          : e
      );
      return { rsvpEventIds, events };
    }),
  isRsvpd: (eventId) => get().rsvpEventIds.has(eventId),
}));

interface FilterStore {
  category: EventCategory | null;
  dateFilter: string;
  priceFilter: string;
  formatFilter: string;
  sortBy: string;
  searchQuery: string;
  setCategory: (c: EventCategory | null) => void;
  setDateFilter: (d: string) => void;
  setPriceFilter: (p: string) => void;
  setFormatFilter: (f: string) => void;
  setSortBy: (s: string) => void;
  setSearchQuery: (q: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: null,
  dateFilter: "all",
  priceFilter: "all",
  formatFilter: "all",
  sortBy: "relevance",
  searchQuery: "",
  setCategory: (category) => set({ category }),
  setDateFilter: (dateFilter) => set({ dateFilter }),
  setPriceFilter: (priceFilter) => set({ priceFilter }),
  setFormatFilter: (formatFilter) => set({ formatFilter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  clearFilters: () =>
    set({
      category: null,
      dateFilter: "all",
      priceFilter: "all",
      formatFilter: "all",
      sortBy: "relevance",
      searchQuery: "",
    }),
}));

interface UserStore {
  name: string;
  avatar: string;
  joinedCommunities: Set<string>;
  joinCommunity: (id: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  name: "You",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d2d457cfdf7e?w=100&q=80",
  joinedCommunities: new Set(),
  joinCommunity: (id) =>
    set((state) => {
      const joinedCommunities = new Set(state.joinedCommunities);
      joinedCommunities.add(id);
      return { joinedCommunities };
    }),
}));
