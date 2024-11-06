import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Calendar, MessageCircle, ExternalLink, Filter } from 'lucide-react';
import AlertsList from '../components/alerts/AlertsList';
import TimeFilter from '../components/alerts/TimeFilter';
import SearchBar from '../components/alerts/SearchBar';
import { fetchRedditPosts } from '../utils/redditApi';
import { TimeRange } from '../types/alerts';

const DisasterAlerts: React.FC = () => {
  const [location, setLocation] = useState('');
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['redditPosts', location, timeRange],
    queryFn: () => fetchRedditPosts(location, timeRange),
    enabled: false,
  });

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
    refetch();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Real-time Disaster Alerts</h1>
        <p className="text-gray-600">
          Get the latest updates about natural disasters from Reddit communities worldwide.
        </p>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-6">
        <TimeFilter selectedRange={timeRange} onRangeChange={setTimeRange} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <p className="text-red-700">Error fetching disaster alerts. Please try again.</p>
          </div>
        </div>
      )}

      {posts && <AlertsList posts={posts} />}

      {posts?.length === 0 && !isLoading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-700">
            No disaster alerts found for this location. Try broadening your search or checking a different time range.
          </p>
        </div>
      )}
    </div>
  );
};

export default DisasterAlerts;