"use client";

import { useRef, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Event } from "@/types";
import { getCategoryColor } from "@/lib/utils";
import Link from "next/link";

interface MapPreviewInnerProps {
  events: Event[];
}

export default function MapPreviewInner({ events }: MapPreviewInnerProps) {
  const mapRef = useRef(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="w-full h-[400px] bg-gradient-to-br from-cream-dark to-cream-darker flex flex-col items-center justify-center p-8 text-center">
        <p className="text-warm-gray mb-2 font-body">
          Map preview requires a Mapbox token
        </p>
        <p className="text-xs text-warm-muted mb-4">
          Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
        </p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {events.slice(0, 4).map((e) => (
            <Link
              key={e.id}
              href={`/events/${e.slug}`}
              className="p-3 bg-white rounded-xl shadow-warm-sm text-left hover:shadow-warm-md transition-shadow"
            >
              <div
                className="w-2 h-2 rounded-full mb-2"
                style={{ backgroundColor: getCategoryColor(e.category) }}
              />
              <p className="text-xs font-semibold text-warm-black line-clamp-2">
                {e.name}
              </p>
              <p className="text-[10px] text-warm-muted mt-1">{e.location.city}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{
        longitude: 79.8612,
        latitude: 6.9271,
        zoom: 11,
      }}
      style={{ width: "100%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <NavigationControl position="top-right" />
      {events.map((event) => (
        <Marker
          key={event.id}
          longitude={event.location.coordinates.lng}
          latitude={event.location.coordinates.lat}
          anchor="center"
        >
          <Link href={`/events/${event.slug}`}>
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform animate-pulse"
              style={{ backgroundColor: getCategoryColor(event.category) }}
            />
          </Link>
        </Marker>
      ))}
    </Map>
  );
}
