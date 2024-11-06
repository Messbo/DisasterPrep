import React from 'react';
import { Link } from 'react-router-dom';
import { CloudRain, AlertCircle, Users, Home as HomeIcon, BookOpen, LineChart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to DisasterPrep</h1>
      <p className="text-xl mb-8">Stay informed and prepared for any emergency situation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<CloudRain size={48} />}
          title="Weather Information"
          description="Get real-time weather updates and forecasts."
          link="/weather"
        />
        <FeatureCard
          icon={<AlertCircle size={48} />}
          title="Disaster Alerts"
          description="Receive live updates on potential disasters."
          link="/alerts"
        />
        <FeatureCard
          icon={<Users size={48} />}
          title="Volunteer Database"
          description="Find or register as a volunteer for disaster relief."
          link="/volunteers"
        />
        <FeatureCard
          icon={<HomeIcon size={48} />}
          title="Rescue Shelters"
          description="Locate nearby rescue shelters and evacuation centers."
          link="/shelters"
        />
        <FeatureCard
          icon={<BookOpen size={48} />}
          title="Disaster Guidelines"
          description="Access crucial information for various disaster scenarios."
          link="/guidelines"
        />
        <FeatureCard
          icon={<LineChart size={48} />}
          title="Disaster Prediction"
          description="View risk assessments and disaster predictions."
          link="/prediction"
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default Home;