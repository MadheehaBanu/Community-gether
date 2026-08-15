import type { User } from "@/types";

export const users: User[] = [
  {
    id: "u1",
    username: "kasun",
    name: "Kasun Perera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bio: "Tech community builder. Organizing meetups since 2022. Passionate about AI and web development.",
    cover:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    eventsAttended: 34,
    eventsHosted: 24,
    communities: 5,
  },
];

export function getUserByUsername(username: string) {
  return users.find((u) => u.username === username);
}
