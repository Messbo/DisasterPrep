import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const DisasterPrediction: React.FC = () => {
  const [activeTab, setActiveTab] = useState('floods');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get-data-floods');
      const data = response.data;

      setLocation(data.location);
      setPrediction(data.alert);
      setWeatherData(data.weather);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <Typography
        variant="h4"
        align="center"
        color="primary"
       
        gutterBottom
        sx={{ fontSize: '1.5rem' , fontWeight: 700 }}
      >
        🌍 Disaster Risk Prediction
      </Typography>

      <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button
            variant={activeTab === 'floods' ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<WaterDropIcon />}
            onClick={() => setActiveTab('floods')}
          >
            Floods
          </Button>
        </Grid>
      </Grid>

      {activeTab === 'floods' && (
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<LocationOnIcon />}
            onClick={fetchData}
          >
            Get Prediction
          </Button>
        </Grid>
      )}

      {location && prediction && (
        <Card
          sx={{
            mt: 4,
            borderRadius: 2,
            boxShadow: 4,
            padding: 2,
            backgroundColor: '#fff',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              sx={{ fontSize: '1.5rem' , display: 'flex', alignItems: 'center', mb: 2 }}
            >
              <WaterDropIcon sx={{ mr: 1 }} />
              Flood Prediction Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ display: 'flex', mb: 1  ,fontSize: '1.5rem' }}>
                  <LocationOnIcon color="action" sx={{ mr: 1 }} />
                  <strong>Location:</strong> {location}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', mb: 1 , fontSize: '1.5rem' }}>
                  <CloudQueueIcon color="action" sx={{ mr: 1 }} />
                  <strong>Prediction:</strong> {prediction}
                </Typography>
              </Grid>
              {weatherData && (
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                    sx={{ fontSize: '1.5rem' }}
                  >
                
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1.5rem' ,display: 'flex', mb: 1 }}>
                    <ThermostatIcon sx={{ mr: 1, color: 'red' }} />
                    <strong>Temperature:</strong> {weatherData.temperature}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1.5rem' ,display: 'flex', mb: 1 }}>
                    <OpacityIcon sx={{ mr: 1, color: 'blue' }} />
                    <strong>Humidity:</strong> {weatherData.humidity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1.5rem' ,display: 'flex', mb: 1 }}>
                    <AirIcon sx={{ mr: 1, color: 'gray' }} />
                    <strong>Wind Speed:</strong> {weatherData.wind_speed}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1.5rem' ,display: 'flex', mb: 1 }}>
                    <CloudQueueIcon sx={{ mr: 1, color: 'gray' }} />
                    <strong>Cloud Cover:</strong> {weatherData.cloud_cover}
                  </Typography>
                  <Typography variant="body2" sx={{fontSize: '1.5rem' , display: 'flex' }}>
                    <CloudQueueIcon sx={{ mr: 1, color: 'gray' }} />
                    <strong>Description:</strong> {weatherData.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DisasterPrediction;
