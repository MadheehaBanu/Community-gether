"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-cream-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-coral/20 border-t-coral animate-spin mx-auto mb-4" />
        <p className="text-warm-gray font-body text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return <MapView />;
}
