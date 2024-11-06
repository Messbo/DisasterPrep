import React from 'react';
import { Link } from 'react-router-dom';
import { CloudLightning } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CloudLightning size={24} />
          <span className="text-xl font-bold">DisasterPrep</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/weather" className="hover:text-blue-200">Weather</Link></li>
            <li><Link to="/alerts" className="hover:text-blue-200">Alerts</Link></li>
            <li><Link to="/volunteers" className="hover:text-blue-200">Volunteers</Link></li>
            <li><Link to="/shelters" className="hover:text-blue-200">Shelters</Link></li>
            <li><Link to="/guidelines" className="hover:text-blue-200">Guidelines</Link></li>
            <li><Link to="/prediction" className="hover:text-blue-200">Prediction</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;