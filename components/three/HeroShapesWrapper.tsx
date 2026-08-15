"use client";

import dynamic from "next/dynamic";

const HeroShapesCanvas = dynamic(() => import("./HeroShapes"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-coral/10 animate-pulse" />
    </div>
  ),
});

export default function HeroShapesWrapper() {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <HeroShapesCanvas />
    </div>
  );
}
