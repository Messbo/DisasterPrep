import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';

interface Guideline {
  id: number;
  title: string;
  content: string;
}

const guidelines: Guideline[] = [
  {
    id: 1,
    title: 'Earthquake Safety',
    content: `
      1. Drop, Cover, and Hold On: Drop to the ground, take cover under a sturdy desk or table, and hold on until the shaking stops.
      2. Stay away from windows, bookcases, and other heavy objects that could fall.
      3. If you're in bed, stay there and protect your head with a pillow.
      4. If you're outdoors, move to an open area away from buildings, trees, and power lines.
      5. After the shaking stops, be prepared for aftershocks.
    `,
  },
  {
    id: 2,
    title: 'Flood Preparedness',
    content: `
      1. Move to higher ground immediately if there's a flood warning.
      2. Avoid walking or driving through flood waters.
      3. Prepare an emergency kit with food, water, and essential supplies.
      4. Disconnect electrical appliances and turn off gas valves if instructed to do so.
      5. Follow evacuation orders promptly if given by local authorities.
    `,
  },
  {
    id: 3,
    title: 'Tornado Safety',
    content: `
      1. Stay informed about the storm's progress and follow official instructions.
      2. Prepare an emergency kit with food, water, medications, and important documents.
      3. Board up windows and secure outdoor objects that could become projectiles.
      4. If ordered to evacuate, do so immediately.
      5. If sheltering in place, stay in an interior room away from windows.
    `,
  },
  {
    id: 4,
    title: 'Wildfire Evacuation',
    content: `
      1. Be ready to evacuate at a moment's notice.
      2. Create a defensible space around your home by clearing vegetation.
      3. Pack an emergency kit with essentials and important documents.
      4. Follow evacuation routes provided by local authorities.
      5. Close all windows and doors before leaving your home.
    `,
  },
];

const DisasterGuidelines: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleGuideline = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Disaster-specific Guidelines</h1>
      <p className="mb-8 text-gray-600">
        Access crucial information and safety tips for various disaster scenarios. Click on each guideline to expand and read the detailed instructions.
      </p>
      <div className="space-y-4">
        {guidelines.map((guideline) => (
          <div key={guideline.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
              onClick={() => toggleGuideline(guideline.id)}
            >
              <div className="flex items-center">
                <Book className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold">{guideline.title}</h2>
              </div>
              {expandedId === guideline.id ? (
                <ChevronUp className="text-gray-500" size={24} />
              ) : (
                <ChevronDown className="text-gray-500" size={24} />
              )}
            </button>
            {expandedId === guideline.id && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="whitespace-pre-line">{guideline.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisasterGuidelines;