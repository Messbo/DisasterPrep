import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Sun, CloudRain, Wind, Thermometer, Droplets, Compass, Eye, Gauge, Clock, CloudSun, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import WeatherCard from '../components/weather/WeatherCard';
import MapController from '../components/weather/MapController';

const API_KEY = '89bac86df8c8c06f80be941bc5907f03';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

const WeatherInfo: React.FC = () => {
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [zoom, setZoom] = useState(3);

  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ['weather', location],
    queryFn: async () => {
      if (!location) return null;
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
      return data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (data?.coord) {
      setMapCenter([data.coord.lat, data.coord.lon]);
      setZoom(10);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Real-time Weather Information</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && <p>Loading weather data...</p>}
      {error && <p className="text-red-500">Error fetching weather data. Please try again.</p>}
      
      {data && (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">{data.name}, {data.sys.country}</h2>
                  <p className="text-xl capitalize">{data.weather[0].description}</p>
                </div>
                <img 
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="w-20 h-20"
                />
              </div>
              <p className="text-5xl font-bold mt-4">{data.main.temp.toFixed(1)}°C</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WeatherCard
                  icon={<Thermometer className="text-red-500" size={24} />}
                  title="Temperature"
                  items={[
                    { label: 'Feels like', value: `${data.main.feels_like.toFixed(1)}°C` },
                    { label: 'Min', value: `${data.main.temp_min.toFixed(1)}°C` },
                    { label: 'Max', value: `${data.main.temp_max.toFixed(1)}°C` }
                  ]}
                />

                <WeatherCard
                  icon={<Wind className="text-blue-500" size={24} />}
                  title="Wind"
                  items={[
                    { label: 'Speed', value: `${data.wind.speed} m/s` },
                    { label: 'Direction', value: `${getWindDirection(data.wind.deg)} (${data.wind.deg}°)` },
                    { label: 'Gust', value: data.wind.gust ? `${data.wind.gust} m/s` : 'N/A' }
                  ]}
                />

                <WeatherCard
                  icon={<Droplets className="text-blue-400" size={24} />}
                  title="Atmosphere"
                  items={[
                    { label: 'Humidity', value: `${data.main.humidity}%` },
                    { label: 'Pressure', value: `${data.main.pressure} hPa` },
                    { label: 'Visibility', value: `${(data.visibility / 1000).toFixed(1)} km` }
                  ]}
                />

                <WeatherCard
                  icon={<CloudSun className="text-yellow-500" size={24} />}
                  title="Sun Schedule"
                  items={[
                    { label: 'Sunrise', value: formatTime(data.sys.sunrise) },
                    { label: 'Sunset', value: formatTime(data.sys.sunset) }
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Weather Map</h3>
            <div className="h-[500px] rounded-lg overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
              >
                <MapController center={mapCenter} zoom={zoom} />
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </LayersControl.BaseLayer>
                  
                  <LayersControl.Overlay checked name="Temperature">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Precipitation">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Clouds">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Wind Speed">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Pressure">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Sea Level Pressure">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Wind Direction">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Humidity">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/humidity_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay name="Weather Radar">
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/precipitation_cls/{z}/{x}/{y}.png?appid=${API_KEY}`}
                      attribution='&copy; OpenWeatherMap'
                    />
                  </LayersControl.Overlay>
                </LayersControl>

                {data && (
                  <Marker position={[data.coord.lat, data.coord.lon]}>
                    <Popup>
                      <div className="text-center">
                        <h4 className="font-semibold">{data.name}, {data.sys.country}</h4>
                        <p>{data.main.temp.toFixed(1)}°C</p>
                        <p className="capitalize">{data.weather[0].description}</p>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherInfo;