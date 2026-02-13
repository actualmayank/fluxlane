import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 12);
  }, [position, map]);
  return null;
}

export default function MapView({ traffic, position, theme }) {
  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const getColor = () => {
    if (!traffic) return "gray";
    if (traffic < 30) return "green";
    if (traffic < 70) return "orange";
    return "red";
  };

  return (
    <MapContainer center={position} zoom={12} style={{ height: "85vh", width: "100%" }}>
      <TileLayer url={tileUrl} />
      <RecenterMap position={position} />
      {traffic !== null && (
        <Circle
          center={position}
          radius={4000}
          pathOptions={{ color: getColor(), fillOpacity: 0.3 }}
        />
      )}
    </MapContainer>
  );
}