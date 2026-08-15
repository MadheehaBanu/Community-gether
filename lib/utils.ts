import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isToday, isTomorrow, addDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEventDate(dateStr: string, startTime: string) {
  const date = parseISO(dateStr);
  const dayLabel = isToday(date)
    ? "Today"
    : isTomorrow(date)
      ? "Tomorrow"
      : format(date, "EEE, MMM d");
  return `${dayLabel} · ${formatTime(startTime)}`;
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatFullDate(dateStr: string) {
  return format(parseISO(dateStr), "EEEE, MMMM d, yyyy");
}

export function formatPrice(price: { type: string; amount?: number; currency?: string }) {
  if (price.type === "free") return "Free";
  return `${price.currency} ${price.amount?.toLocaleString()}`;
}

export function getSpotsLeft(capacity: number, attendeeCount: number) {
  return Math.max(0, capacity - attendeeCount);
}

export function groupEventsByDay(events: { date: string; name: string; startTime: string; slug: string; location: { venue: string; city: string }; attendeeCount: number; coverImage: string; category: string; price: { type: string; amount?: number; currency?: string } }[]) {
  const groups: Record<string, typeof events> = {};
  events.forEach((event) => {
    const date = parseISO(event.date);
    let key: string;
    if (isToday(date)) key = "Today 🔥";
    else if (isTomorrow(date)) key = "Tomorrow";
    else key = format(date, "EEEE");
    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
  });
  return groups;
}

export function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    tech: "#2563a8",
    creative: "#7c2d5b",
    social: "#e85d3a",
    wellness: "#2d7a4f",
    business: "#c8963e",
    culture: "#9c4dc7",
  };
  return colors[category] || "#e85d3a";
}
