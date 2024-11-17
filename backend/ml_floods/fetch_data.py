import pandas as pd
import numpy as np
from . import flood_predictor as fp
import geocoder
import time
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the OpenWeather API key from environment variables
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')

# Example fake data for `tables` in the format you described
tables = np.array([
    ['ANDAMAN & NICOBAR ISLANDS', 'Extra Info', 12.3],
    ['ARUNACHAL PRADESH', 'Extra Info', 24.5],
    ['ASSAM', 'Extra Info', 36.7],
    ['MEGHALAYA', 'Extra Info', 45.8],
    ['BIHAR', 'Extra Info', 15.2],
    ['CHHATTISGARH', 'Extra Info', 5.6],
    ['ANDHRA PRADESH', 'Extra Info', 32.9],
    ['KARNATAKA', 'Extra Info', 22.4],
    ['MADHYA PRADESH', 'Extra Info', 19.7],
    ['RAJASTHAN', 'Extra Info', 10.1],
    ['UTTAR PRADESH', 'Extra Info', 8.9],
    ['WEST BENGAL', 'Extra Info', 11.3],
    ['GUJARAT', 'Extra Info', 17.5],
    ['HARYANA', 'Extra Info', 7.8],
    ['DELHI', 'Extra Info', 6.1],
    ['HIMACHAL PRADESH', 'Extra Info', 12.7],
    ['JAMMU & KASHMIR', 'Extra Info', 3.4],
    ['JHARKHAND', 'Extra Info', 9.9],
    ['KERALA', 'Extra Info', 45.3],
    ['GOA', 'Extra Info', 20.0],
    ['LAKSHADWEEP', 'Extra Info', 4.5],
    ['MADHYA MAHARASHTRA', 'Extra Info', 30.2],
    ['MARATHWADA', 'Extra Info', 25.6],
    ['NAGALAND', 'Extra Info', 14.2],
    ['ODISSA', 'Extra Info', 38.4],
    ['PUNJAB', 'Extra Info', 3.8],
    ['RAYALSEEMA', 'Extra Info', 18.9],
    ['SAURASHTRA & KUTCH', 'Extra Info', 28.3],
    ['SOUTH INTERIOR KARNATAKA', 'Extra Info', 11.5],
    ['SUB HIMALAYAN WEST BENGAL & SIKKIM', 'Extra Info', 33.6],
    ['TAMIL NADU', 'Extra Info', 27.5],
    ['TELANGANA', 'Extra Info', 13.9],
    ['UTTARAKHAND', 'Extra Info', 9.1],
    ['VIDARBHA', 'Extra Info', 26.8],
    ['WEST MADHYA PRADESH', 'Extra Info', 14.4],
    ['WEST RAJASTHAN', 'Extra Info', 7.3],
    ['WEST UTTAR PRADESH', 'Extra Info', 12.5]
])

states = {
    'ANDAMAN & NICOBAR ISLANDS': 0, 'ARUNACHAL PRADESH': 1, 'ASSAM': 2, 'MEGHALAYA': 2, 'BIHAR': 3, 'CHHATTISGARH': 4, 'ANDHRA PRADESH': 5, 
    'KARNATAKA': 6, 'MADHYA PRADESH': 7, 'RAJASTHAN': 8, 'UTTAR PRADESH': 9, 'WEST BENGAL': 10, 'GUJARAT': 11, 
    'HARYANA': 12, 'DELHI': 12, 'HIMACHAL PRADESH': 13, 'JAMMU & KASHMIR': 14, 'JHARKHAND': 15, 'KERALA': 16, 'GOA': 17, 
    'LAKSHADWEEP': 18, 'MADHYA MAHARASHTRA': 19, 'MARATHWADA': 20, 'NAGALAND': 21, 'MANIPUR': 21, 'MIZORAM': 21, 'TRIPURA': 21, 
    'ODISSA': 23, 'PUNJAB': 24, 'RAYALSEEMA': 25, 'SAURASHTRA & KUTCH': 26, 'SOUTH INTERIOR KARNATAKA': 27, 'SUB HIMALAYAN WEST BENGAL & SIKKIM': 28, 
    'TAMIL NADU': 29, 'TELANGANA': 30, 'UTTARAKHAND': 31, 'VIDARBHA': 32, 'WEST MADHYA PRADESH': 33, 'WEST RAJASTHAN': 34, 'WEST UTTAR PRADESH': 35
}

def get_location():
    g = geocoder.ip('me')
    state_cur = g.state
    return state_cur.upper()

def get_rain_from_api():
    location = get_location()
    
    # Use OpenWeather API to get weather data for a specific location
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        print("Data from OpenWeather API:")
        print(data)
        # Extract rain data; OpenWeather reports rain in mm for the past 1 hour or 3 hours
        rain_data = data.get('rain', {}).get('1h', 0.0)  # 'rain' in mm for the past 1 hour
        return rain_data

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from OpenWeather API: {e}")
        return 0.0  # Return 0 if there's an error in fetching rain data

def predict():
    location = get_location()
    rain = get_rain_from_api()
    return fp.prediction1([[states[location], rain]])

def alert():
    var = predict()
    if var == 0:
        return "You are completely safe"
    elif var == 1:
        return "Moderate rain falling, keep your umbrella with you, but you're safe"
    elif var == 2:
        return "Heavy raining, chances of floods increasing. Please take necessary precautions"
    else:
        return "Flood chances are at peak. Stay in your house"

# Example usage:
print(alert())