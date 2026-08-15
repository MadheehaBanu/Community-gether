import Link from "next/link";
import Button from "@/components/ui/Button";
import DecorativeShapes from "@/components/effects/DecorativeShapes";

export default function CreateCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-coral via-coral to-gold">
      <DecorativeShapes />
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          Got Something to Share?
        </h2>
        <p className="text-white/90 text-lg mb-8 font-body">
          Create an event and bring your community together
        </p>
        <Link href="/create">
          <Button variant="white" size="lg">
            Create Event
          </Button>
        </Link>
      </div>
    </section>
  );
}
