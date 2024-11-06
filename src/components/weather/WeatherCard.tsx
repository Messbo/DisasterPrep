import React from 'react';

interface WeatherCardProps {
  icon: React.ReactNode;
  title: string;
  items: Array<{ label: string; value: string }>;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ icon, title, items }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;