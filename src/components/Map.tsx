import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POI } from '../types/poi';

interface MapProps {
  center: [number, number];
  pois: POI[];
  icons: Record<string, Icon>;
}

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const Map: React.FC<MapProps> = ({ center, pois, icons }) => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater center={center} />
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={[poi.lat, poi.lon]}
          icon={icons[poi.tags.amenity || 'shelter']}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{poi.tags.name || 'Unnamed'}</h3>
              <p>{poi.tags.amenity}</p>
              <p className="text-sm">{poi.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;