import { useEffect } from "react";
import useTrip from "../hooks/useTrip";
import L from "leaflet";
import "leaflet-polylinedecorator";
import { useMap } from "react-leaflet";

const color = "#1A73E8";
const opacity = 0.85;

export default function Polyline() {
  const { cities } = useTrip();
  const map = useMap();
  const citiesPosition = cities.map((city) => [city.lat, city.lng]);

  useEffect(() => {
    if (!map || citiesPosition.length === 0) return;

    const polyline = L.polyline(citiesPosition, { color, opacity }).addTo(map);
    const arrowPatterns = {
      offset: "0%",
      repeat: "200px",
      symbol: L.Symbol.arrowHead({
        pixelSize: 10,
        pathOptions: { fillOpacity: 0.5, color, opacity },
      }),
    };

    const polylineDecorator = L.polylineDecorator(polyline, {
      patterns: [arrowPatterns],
    }).addTo(map);

    return () => {
      map.removeLayer(polyline);
      map.removeLayer(polylineDecorator);
    };
  }, [cities, map]);
  return null;
}
