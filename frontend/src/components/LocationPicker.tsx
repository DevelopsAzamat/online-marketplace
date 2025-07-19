import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

interface Props {
  onSelect: (lat: number, lng: number, address: string) => void;
}

const LocationPicker = ({ onSelect }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      return (
        data?.display_name ||
        data?.address?.road ||
        `Координаты: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
      );
    } catch {
      return `Координаты: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  };

  const getMyLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);
        const address = await fetchAddress(lat, lng);
        onSelect(lat, lng, address);
        setLoading(false);
      },
      () => {
        alert("Не удалось получить геолокацию");
        setLoading(false);
      }
    );
  };

  const LocationMarker = () => {
    useMapEvents({
      click: async (e: L.LeafletMouseEvent) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setPosition([lat, lng]);
        const address = await fetchAddress(lat, lng);
        onSelect(lat, lng, address);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={getMyLocation}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Определение местоположения..." : "Определить моё местоположение"}
      </button>

      <MapContainer
        center={position || [41.3111, 69.2797]} // Tashkent default
        zoom={13}
        style={{ height: "300px", borderRadius: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
