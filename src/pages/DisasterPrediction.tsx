import React, { useState } from 'react';
import axios from 'axios';

const DisasterPrediction: React.FC = () => {
  const [activeTab, setActiveTab] = useState('floods');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get-data');
      setLocation(response.data.location);
      setPrediction(response.data.alert);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Disaster Risk Prediction</h1>
        <div className="flex space-x-F4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'floods' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('floods')}
          >
            Floods
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'earthquakes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('earthquakes')}
          >
            Earthquakes
          </button>
        </div>
        {activeTab === 'floods' && (
          <div className="floods-tab">
            <button onClick={fetchData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Get Prediction</button>
          
            {location && prediction && (
              <div className="prediction-result mt-4">
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Prediction:</strong> {prediction}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'earthquakes' && (
          <div className="earthquakes-tab mt-4">
            <p>No prediction available for earthquakes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterPrediction;