import { useEffect } from "react";
import useUrlPosition from "../hooks/useUrlPosition";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const defaultPosition = [28.7041, 77.1025];

export default function Map() {
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
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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
