import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  locationSearch: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  locationSearch,
  onSearchChange,
  onLocationChange,
}) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md border border-indigo-50">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or skills"
            className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={locationSearch}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Search by location"
            className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;