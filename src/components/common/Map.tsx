import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { borderRadius } from '../../styles/theme';
interface MapProps {
  position: [number, number];
  onPositionChange?: (lat: number, lng: number) => void;
}

// Custom dark theme style URL from MapTiler
const DARK_MAP_STYLE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

const LocationMarker: React.FC<MapProps> = ({ position, onPositionChange }) => {
  useMapEvents({
    click(e) {
      onPositionChange?.(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? (
    <Marker 
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onPositionChange?.(position.lat, position.lng);
        },
      }}
      icon={L.icon({
        iconUrl: '../../assets/icons/map/red-marker.png',
        iconSize: [42, 42],
        iconAnchor: [12, 41],
      })}
    />
  ) : null;
};

const Map: React.FC<MapProps> = ({ position, onPositionChange }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: borderRadius.main }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={DARK_MAP_STYLE}
      />
      <LocationMarker position={position} onPositionChange={onPositionChange} />
    </MapContainer>
  );
};

export default Map; 