import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PredictionMap: React.FC = () => {
  const riskAreas = [
    { position: [51.505, -0.09], risk: 'High', radius: 20000, color: '#ef4444' },
    { position: [51.51, -0.1], risk: 'Medium', radius: 15000, color: '#f59e0b' },
    { position: [51.49, -0.08], risk: 'Low', radius: 10000, color: '#10b981' },
  ];

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {riskAreas.map((area, index) => (
          <Circle
            key={index}
            center={area.position}
            radius={area.radius}
            pathOptions={{ color: area.color, fillOpacity: 0.3 }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold">{area.risk} Risk Area</h3>
                <p>Radius: {area.radius / 1000}km</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default PredictionMap;