import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WeatherInfo from './pages/WeatherInfo';
import DisasterAlerts from './pages/DisasterAlerts';
import VolunteerDatabase from './pages/VolunteerDatabase';
import RescueShelters from './pages/RescueShelters';
import DisasterGuidelines from './pages/DisasterGuidelines';
import DisasterPrediction from './pages/DisasterPrediction';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weather" element={<WeatherInfo />} />
              <Route path="/alerts" element={<DisasterAlerts />} />
              <Route path="/volunteers" element={<VolunteerDatabase />} />
              <Route path="/shelters" element={<RescueShelters />} />
              <Route path="/guidelines" element={<DisasterGuidelines />} />
              <Route path="/prediction" element={<DisasterPrediction />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;