import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Search, Home, Building2, ShieldAlert, Flame } from 'lucide-react';
import Map from '../components/Map';
import { POI } from '../types/poi';
import { createIcons } from '../utils/icons';

const RescueShelters: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [pois, setPois] = useState<POI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const icons = React.useMemo(() => createIcons(), []);

  useEffect(() => {
    const loadLeafletStyles = async () => {
      const leafletStyles = document.createElement('link');
      leafletStyles.rel = 'stylesheet';
      leafletStyles.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      document.head.appendChild(leafletStyles);
    };
    loadLeafletStyles();
  }, []);

  const getAddress = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      return response.data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not available';
    }
  };

  const searchPOIs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nominatimResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}`
      );
      
      if (nominatimResponse.data.length === 0) {
        throw new Error('Location not found');
      }
      
      const { lat, lon } = nominatimResponse.data[0];
      setMapCenter([parseFloat(lat), parseFloat(lon)]);

      const overpassQuery = `
        [out:json];
        (
          node["amenity"="shelter"](around:5000,${lat},${lon});
          node["amenity"="hospital"](around:5000,${lat},${lon});
          node["amenity"="police"](around:5000,${lat},${lon});
          node["amenity"="fire_station"](around:5000,${lat},${lon});
        );
        out;
      `;

      const overpassResponse = await axios.post('https://overpass-api.de/api/interpreter', overpassQuery);
      const elements = overpassResponse.data.elements;

      // Fetch addresses sequentially instead of in parallel
      const poisWithAddresses = [];
      for (const poi of elements) {
        const address = await getAddress(poi.lat, poi.lon);
        poisWithAddresses.push({ ...poi, address });
      }

      setPois(poisWithAddresses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getIconComponentForPOI = (poi: POI) => {
    switch (poi.tags.amenity) {
      case 'shelter': return Home;
      case 'hospital': return Building2;
      case 'police': return ShieldAlert;
      case 'fire_station': return Flame;
      default: return MapPin;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nearest Emergency Services</h1>
      
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Enter a location"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={searchPOIs}
          className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <Search className="mr-2" size={20} />
          Search
        </button>
      </div>

      <div className="mb-4">
        <p><span style={{ color: 'red' }}>Red</span> is for hospitals</p>
        <p><span style={{ color: 'green' }}>Green</span> is for shelters</p>
        <p><span style={{ color: 'blue' }}>Blue</span> is for police stations</p>
        <p><span style={{ color: 'orange' }}>Orange</span> is for fire stations</p>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div style={{ height: '600px', width: '100%' }} className="mb-8">
        <Map center={mapCenter} pois={pois} icons={icons} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Emergency Services List</h2>
        {pois.length > 0 ? (
          pois.map((poi) => {
            const IconComponent = getIconComponentForPOI(poi);
            return (
              <div key={poi.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <IconComponent className="text-blue-500 mr-2" size={20} />
                  <h3 className="text-lg font-semibold">{poi.tags.name || 'Unnamed'}</h3>
                </div>
                <p><strong>Type:</strong> {poi.tags.amenity}</p>
                <p><strong>Address:</strong> <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${poi.lat},${poi.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  {poi.address}
                </a></p>
              </div>
            );
          })
        ) : (
          <p>No emergency services found. Try searching for a location.</p>
        )}
      </div>
    </div>
  );
};

export default RescueShelters;