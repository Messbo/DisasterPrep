import React from 'react';

interface Factor {
  name: string;
  value: string;
  icon: React.ReactNode;
}

interface RiskFactorsProps {
  factors: Factor[];
}

const RiskFactors: React.FC<RiskFactorsProps> = ({ factors }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {factors.map((factor, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            {factor.icon}
            <span className="ml-2 font-medium">{factor.name}</span>
          </div>
          <div className="text-2xl font-bold">{factor.value}</div>
        </div>
      ))}
    </div>
  );
};

export default RiskFactors;