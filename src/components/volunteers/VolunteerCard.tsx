import React from 'react';
import { User } from 'lucide-react';
import { Volunteer } from '../../types/volunteer';

interface VolunteerCardProps {
  volunteer: Volunteer;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ volunteer }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-50">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <User className="text-indigo-600" size={24} />
        </div>
        <h3 className="text-xl font-semibold ml-3 text-gray-800">{volunteer.name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <span className="font-medium w-24 text-gray-700">Age:</span>
          <span>{volunteer.age}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="font-medium w-24 text-gray-700">Gender:</span>
          <span>{volunteer.gender}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="font-medium w-24 text-gray-700">Email:</span>
          <span className="text-indigo-600 hover:text-indigo-700">{volunteer.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="font-medium w-24 text-gray-700">Phone:</span>
          <span>{volunteer.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="font-medium w-24 text-gray-700">Location:</span>
          <span>{volunteer.location}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Skills:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {volunteer.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full border border-indigo-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;