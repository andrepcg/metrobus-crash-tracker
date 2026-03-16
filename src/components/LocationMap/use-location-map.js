import { useEffect, useRef } from "react";
import stationsData from "@/data/stations.json";

const MARKER_CONFIG = {
  station: {
    radius: 5,
    fillColor: "#F59E0B",
    color: "#FFFFFF",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  },
  accident: {
    radius: 8,
    fillColor: "#EF4444",
    color: "#FFFFFF",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9,
  },
  route: { color: "#F59E0B", weight: 4, opacity: 0.8 },
};

const ICON_URL = {
  retina:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  default:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadow:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
};

export function useLocationMap(accidents) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [accidents]);

  const initializeMap = async () => {
    const [{ default: L }] = await Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]);

    // Configure default icon
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions(ICON_URL);

    // Create map instance
    const map = L.map(mapRef.current).setView([40.149523, -8.334807], 12);

    // Add tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      },
    ).addTo(map);

    // Add routes
    addRoutes(map, L);

    // Add stations
    addStations(map, L);

    // Add accidents
    addAccidents(map, L, accidents);

    mapInstanceRef.current = map;
  };

  const addRoutes = (map, L) => {
    stationsData.routes.forEach((route) => {
      const coordinates = route.trackPoints || [];
      if (coordinates.length > 0) {
        L.polyline(coordinates, MARKER_CONFIG.route).addTo(map);
      }
    });
  };

  const addStations = (map, L) => {
    stationsData.stations.forEach((station) => {
      L.circleMarker(
        [station.latitude, station.longitude],
        MARKER_CONFIG.station,
      )
        .bindPopup(`<strong>${station.name}</strong>`)
        .addTo(map);
    });
  };

  const addAccidents = (map, L, accidents) => {
    accidents.forEach((accident) => {
      if (accident.latitude && accident.longitude) {
        L.circleMarker(
          [accident.latitude, accident.longitude],
          MARKER_CONFIG.accident,
        )
          .bindPopup(
            `<strong style="color: #EF4444;">${accident.titulo}</strong><br>
            <small>${accident.local}</small><br>
            <small>${new Date(accident.data).toLocaleDateString(
              "pt-PT",
            )}</small><br>
            ${accident.fonte ? `<a href="${accident.fonte}" target="_blank" rel="noopener noreferrer" style="color: #F59E0B; text-decoration: none;">Ver notícia →</a>` : ""}`,
          )
          .addTo(map);
      }
    });
  };

  return mapRef;
}
