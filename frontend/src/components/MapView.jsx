import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import socket from '../socket';
// Custom Pixel Icon
const pixelIcon = new L.Icon({
  iconUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=marker&backgroundColor=f59e0b',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'pixel-marker-icon'
});

export default function MapView({ user }) {
  const [userLocations, setUserLocations] = useState({});
  const watchIdRef = useRef(null);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id);
    });

    socket.on('location-update', (data) => {
      setUserLocations((prev) => ({
        ...prev,
        [data.userId]: data,
      }));
    });

    socket.on('user-disconnected', ({ userId }) => {
      setUserLocations((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    });

    // Start sending location every 5 seconds
    if (navigator.geolocation) {
      const sendPos = () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            socket.emit('send-location', {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => console.error('[Geo] Error:', err.message),
          { enableHighAccuracy: true }
        );
      };
      sendPos();
      watchIdRef.current = setInterval(sendPos, 5000);
    }

    return () => {
      socket.disconnect();
      if (watchIdRef.current) clearInterval(watchIdRef.current);
    };
  }, []);

  return (
    <div className="h-full w-full relative group">
      <style>{`
        .leaflet-container {
          background: #0b1220 !important;
        }
        .pixel-marker-icon {
          filter: drop-shadow(0 0 5px #f59e0b);
          border: 2px solid black;
        }
        .leaflet-popup-content-wrapper {
          background: #0b1220 !important;
          color: #f59e0b !important;
          border: 2px solid #f59e0b !important;
          border-radius: 0 !important;
          font-family: 'VT323', monospace !important;
        }
        .leaflet-popup-tip {
          background: #f59e0b !important;
        }
      `}</style>

      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />
        {Object.values(userLocations).map((loc) => (
          <Marker 
            key={loc.userId} 
            position={[loc.lat, loc.lng]}
            icon={new L.Icon({
              iconUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${loc.userId}&backgroundColor=${loc.userId === user.id ? '22c55e' : 'f59e0b'}`,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              className: 'pixel-marker-icon'
            })}
          >
            <Popup>
              <div className="font-pixel text-[8px] mb-1">{loc.userId === user.id ? 'YOU (HERO)' : 'ADVENTURER'}</div>
              <div className="text-lg uppercase">{loc.name || 'ANON_HERO'}</div>
              <div className="text-[10px] opacity-70">POS: {loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
