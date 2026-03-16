import { useEffect, useRef } from "react";
import stationsData from "@/data/stations.json";

const getCSSVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const getMarkerConfig = () => ({
  station: {
    radius: 5,
    fillColor: getCSSVariable("--map-station"),
    color: getCSSVariable("--map-border"),
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  },
  accident: {
    radius: 8,
    fillColor: getCSSVariable("--map-accident"),
    color: getCSSVariable("--map-border"),
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9,
  },
  route: {
    color: getCSSVariable("--map-station"),
    weight: 4,
    opacity: 0.8,
  },
});

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
    const config = getMarkerConfig();
    stationsData.routes.forEach((route) => {
      const coordinates = route.trackPoints || [];
      if (coordinates.length > 0) {
        L.polyline(coordinates, config.route).addTo(map);
      }
    });
  };

  const addStations = (map, L) => {
    const config = getMarkerConfig();
    stationsData.stations.forEach((station) => {
      L.circleMarker([station.latitude, station.longitude], config.station)
        .bindPopup(`<strong>${station.name}</strong>`)
        .addTo(map);
    });
  };

  const addAccidents = (map, L, accidents) => {
    const config = getMarkerConfig();
    const accidentColor = getCSSVariable("--map-accident");
    const stationColor = getCSSVariable("--map-station");

    accidents.forEach((accident) => {
      if (accident.latitude && accident.longitude) {
        L.circleMarker([accident.latitude, accident.longitude], config.accident)
          .bindPopup(
            `<strong style="color: ${accidentColor};">${accident.titulo}</strong><br>
            <small>${accident.local}</small><br>
            <small>${new Date(accident.data).toLocaleDateString(
              "pt-PT",
            )}</small><br>
            ${accident.fonte ? `<a href="${accident.fonte}" target="_blank" rel="noopener noreferrer" style="color: ${stationColor}; text-decoration: none;">Ver notícia →</a>` : ""}`,
          )
          .addTo(map);
      }
    });
  };

  return mapRef;
}
