"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/eventsStore";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { avatar } = useUserStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-warm-sm border-b border-[rgba(26,22,20,0.06)]"
          : "bg-white/70 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-heading text-2xl font-extrabold bg-gradient-to-r from-coral to-gold bg-clip-text text-transparent lowercase tracking-tight">
            gather
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-coral -mt-3 group-hover:scale-125 transition-transform" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-body font-medium text-warm-gray hover:text-warm-black transition-colors py-1",
                pathname === link.href && "text-warm-black"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-coral rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 rounded-full hover:bg-cream-dark transition-colors text-warm-gray"
          >
            <Search size={20} />
          </Link>
          <Link href="/create" className="hidden sm:block">
            <Button size="sm">Create Event</Button>
          </Link>
          <Link
            href="/profile/kasun"
            className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-coral/20 hover:border-coral/50 transition-colors"
          >
            <Image src={avatar} alt="Profile" fill className="object-cover" sizes="36px" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
