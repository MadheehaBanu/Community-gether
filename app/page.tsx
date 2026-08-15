import Hero from "@/components/home/Hero";
import TickerStrip from "@/components/home/TickerStrip";
import HappeningNow from "@/components/home/HappeningNow";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import PopularCommunities from "@/components/home/PopularCommunities";
import WeekTimeline from "@/components/home/WeekTimeline";
import MapPreview from "@/components/home/MapPreview";
import Testimonials from "@/components/home/Testimonials";
import CreateCTA from "@/components/home/CreateCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerStrip />
      <HappeningNow />
      <FeaturedEvents />
      <PopularCommunities />
      <WeekTimeline />
      <MapPreview />
      <Testimonials />
      <CreateCTA />
    </>
  );
}
