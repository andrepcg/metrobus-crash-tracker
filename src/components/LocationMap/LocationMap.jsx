"use client";

import { useLocationMap } from "./use-location-map";

export default function LocationMap({ accidents }) {
  const mapRef = useLocationMap(accidents);

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] border border-zinc-800 rounded"
    />
  );
}
