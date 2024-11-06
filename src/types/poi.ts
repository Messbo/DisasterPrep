export interface POI {
  id: string;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity?: string;
  };
  address?: string;
}