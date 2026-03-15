import { useEffect } from "react";
import useUrlPosition from "../hooks/useUrlPosition";
import styles from "./Map.module.css";
import useTrip from "../hooks/useTrip";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
  useMapEvent,
} from "react-leaflet";
import Polyline from "./Polyline";
import { useNavigate } from "react-router-dom";

const defaultPosition = [28.7041, 77.1025];

export default function Map() {
  const { cities } = useTrip();
  const [lat, lng] = useUrlPosition();
  const mapPosition =
    lat !== null && lng !== null ? [lat, lng] : defaultPosition;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView position={mapPosition} />
        <Polyline />
        <ClickEvent />
        {cities.map((city, i) => (
          <Marker position={[city.lat, city.lng]} key={city.id}>
            <Tooltip>
              <div className={styles["leaflet-tooltip-content"]}>
                <span>{i + 1}</span>
                <span>
                  <img
                    src={`https://flagcdn.com/16x12/${city.countryCode?.toLowerCase()}.png`}
                    alt={`Logo of ${city.country} flag`}
                  />
                </span>
                <p>{city.cityName}</p>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function ChangeView({ position }) {
  const map = useMap();

  useEffect(
    () => {
      map.flyTo(position);
    },
    [map, position],
    6,
  );

  return null;
}

function ClickEvent() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}
