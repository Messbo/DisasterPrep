import React from 'react';
import { Filter } from 'lucide-react';
import { TimeRange } from '../../types/alerts';

interface TimeFilterProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ selectedRange, onRangeChange }) => {
  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: 'hour', label: 'Past Hour' },
    { value: 'day', label: 'Past 24 Hours' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: 'year', label: 'Past Year' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Filter size={20} className="text-gray-500" />
      <div className="flex flex-wrap gap-2">
        {timeRanges.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onRangeChange(value)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedRange === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeFilter;