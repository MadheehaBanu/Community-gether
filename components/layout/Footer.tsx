import Link from "next/link";
import { Globe, MessageCircle, Briefcase, Code2 } from "lucide-react";
import Button from "@/components/ui/Button";

const FOOTER_LINKS = {
  Discover: [
    { label: "Events", href: "/events" },
    { label: "Communities", href: "/communities" },
    { label: "Map", href: "/map" },
    { label: "Search", href: "/search" },
  ],
  Create: [
    { label: "Create Event", href: "/create" },
    { label: "Host Guide", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-warm-black text-[#faf8f5] relative overflow-hidden">
      <div className="blob-2 absolute opacity-20 !w-[400px] !h-[400px] bottom-0 right-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-3xl font-extrabold text-cream lowercase">
              gather
            </span>
            <p className="mt-3 text-sm text-warm-muted leading-relaxed">
              Where communities come alive. Discover events that spark real connection.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-muted mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#faf8f5]/80 hover:text-coral transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {[Globe, MessageCircle, Briefcase, Code2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-coral hover:text-coral transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Stay in the loop"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm placeholder:text-warm-muted focus:outline-none focus:border-coral/50"
            />
            <Button variant="primary" size="sm">
              Subscribe
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-warm-muted mt-8">
          Made with 🧡 for communities everywhere
        </p>
      </div>
    </footer>
  );
}
