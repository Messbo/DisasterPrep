# import pandas as pd
# import numpy as np
# import flood_predictor as fp
# import geocoder
# import time

# tables = pd.read_html("http://hydro.imd.gov.in/hydrometweb/(S(ht2dew45izstmbyyphslh455))/landing.aspx#")
# states={'ANDAMAN & NICOBAR ISLANDS': 0, 'ARUNACHAL PRADESH': 1, 'ASSAM':2, 'MEGHALAYA': 2, 'BIHAR': 3, 'CHHATTISGARH': 4, 'ANDHRA PRADESH': 5, 
# 'KARNATAKA': 6, 'MADHYA PRADESH': 7, 'RAJASTHAN': 8, 'UTTAR PRADESH': 9, 'WEST BENGAL': 10, 'GUJARAT': 11, 
# 'HARYANA': 12,'DELHI': 12, 'HIMACHAL PRADESH': 13, 'JAMMU & KASHMIR': 14, 'JHARKHAND': 15, 'KERALA': 16, 'GOA': 17, 
# 'LAKSHADWEEP': 18, 'MADHYA MAHARASHTRA': 19, 'MATATHWADA': 20, 'NAGALAND':21, 'MANIPUR':21, 'MIZORAM':21, 'TRIPURA': 21, 'KARNATAKA': 22, 
# 'ODISSA': 23, 'PUNJAB': 24, 'RAYALSEEMA': 25, 'SAURASHTRA & KUTCH': 26, 'SOUTH INTERIOR KARNATAKA': 27, 'SUB HIMALAYAN WEST BENGAL & SIKKIM': 28, 
# 'TAMIL NADU': 29, 'TELANGANA': 30, 'UTTARAKHAND': 31, 'VIDARBHA': 32, 'WEST MADHYA PRADESH': 33, 'WEST RAJASTHAN': 34, 'WEST UTTAR PRADESH': 35}

# print(tables)
# # Example fake data for `tables` in the format you described
# tables = np.array([
#     # ['State/Region', 'Some Other Data', 'Rainfall (mm)']
#     ['ANDAMAN & NICOBAR ISLANDS', 'Extra Info', 12.3],
#     ['ARUNACHAL PRADESH', 'Extra Info', 24.5],
#     ['ASSAM', 'Extra Info', 36.7],
#     ['MEGHALAYA', 'Extra Info', 45.8],
#     ['BIHAR', 'Extra Info', 15.2],
#     ['CHHATTISGARH', 'Extra Info', 5.6],
#     ['ANDHRA PRADESH', 'Extra Info', 32.9],
#     ['KARNATAKA', 'Extra Info', 22.4],
#     ['MADHYA PRADESH', 'Extra Info', 19.7],
#     ['RAJASTHAN', 'Extra Info', 10.1],
#     ['UTTAR PRADESH', 'Extra Info', 8.9],
#     ['WEST BENGAL', 'Extra Info', 11.3],
#     ['GUJARAT', 'Extra Info', 17.5],
#     ['HARYANA', 'Extra Info', 7.8],
#     ['DELHI', 'Extra Info', 6.1],
#     ['HIMACHAL PRADESH', 'Extra Info', 12.7],
#     ['JAMMU & KASHMIR', 'Extra Info', 3.4],
#     ['JHARKHAND', 'Extra Info', 9.9],
#     ['KERALA', 'Extra Info', 45.3],
#     ['GOA', 'Extra Info', 20.0],
#     ['LAKSHADWEEP', 'Extra Info', 4.5],
#     ['MADHYA MAHARASHTRA', 'Extra Info', 30.2],
#     ['MARATHWADA', 'Extra Info', 25.6],
#     ['NAGALAND', 'Extra Info', 14.2],
#     ['ODISSA', 'Extra Info', 38.4],
#     ['PUNJAB', 'Extra Info', 3.8],
#     ['RAYALSEEMA', 'Extra Info', 18.9],
#     ['SAURASHTRA & KUTCH', 'Extra Info', 28.3],
#     ['SOUTH INTERIOR KARNATAKA', 'Extra Info', 11.5],
#     ['SUB HIMALAYAN WEST BENGAL & SIKKIM', 'Extra Info', 33.6],
#     ['TAMIL NADU', 'Extra Info', 27.5],
#     ['TELANGANA', 'Extra Info', 13.9],
#     ['UTTARAKHAND', 'Extra Info', 9.1],
#     ['VIDARBHA', 'Extra Info', 26.8],
#     ['WEST MADHYA PRADESH', 'Extra Info', 14.4],
#     ['WEST RAJASTHAN', 'Extra Info', 7.3],
#     ['WEST UTTAR PRADESH', 'Extra Info', 12.5]
# ])

# print(tables)

# tables=np.array(tables[4])
# tables=np.array(tables[1:])
# # print(tables)
# def get_location():
#     g = geocoder.ip('me')
#     state_cur=g.state
#     # print(g.state)
#     state_cur=state_cur.upper()
#     # print(str(state_cur))
#     return state_cur
# def get_rain():
#     a=max(tables[tables[:,0]==get_location()][:,2].flatten())
#     return a
# # print(max(tables[tables[:,0]==get_location()][:,2].flatten()))
# #print(get_location)

# def predict():
#     # print(states[get_location()])
#     # print(get_rain())
#     return fp.prediction1([[states[get_location()],get_rain()]])
# def alert():
#     var=predict()
#     if(var==0):
#         return "You are completely safe"
#     elif(var==1):
#         return "Moderate rain falling, keep your umbrella with you, but you're safe"
#     elif(var==2):
#         return "Heavy raining, chances of floods increasing. Please take necessary precations "
#     else:
#         return "Flood chances are at peak.Stay in your house"
        

# # print(len(sorted(set(tables[1:,0]))))

import pandas as pd
import numpy as np
from . import flood_predictor as fp#Chnages
import geocoder
import time

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

# def get_location():
#     g = geocoder.ip('me')
#     self.state_cur = g.state
#     self.state_cur = self.state_cur.upper()
#     return self.state_cur

# def get_rain():
#     print(self.state_cur)
#     location = get_location()
#     rain_data = tables[tables[:, 0] == location][:, 2].astype(float)
#     if rain_data.size == 0:
#         return 0.0
#     return max(rain_data)

# def predict():
#     location = get_location()
#     rain = get_rain()
#     return fp.prediction1([[states[location], rain]])

# def alert():
#     var = predict()
#     if var == 0:
#         return "You are completely safe"
#     elif var == 1:
#         return "Moderate rain falling, keep your umbrella with you, but you're safe"
#     elif var == 2:
#         return "Heavy raining, chances of floods increasing. Please take necessary precautions"
#     else:
#         return "Flood chances are at peak. Stay in your house"

# # Example usage:
# print(alert())

import requests
# import flood_predictor as fp

# Define your OpenWeather API key here
OPENWEATHER_API_KEY = '666300bf6ba9165b0c98754afa3d5ab8'

def get_location():
    g = geocoder.ip('me')
    state_cur = g.state
    return state_cur.upper()

def get_rain_from_api():
    location = get_location()
    
    # Use OpenWeather API to get weather data for a specific location
    # Here, we can use city/state or coordinates if we know them; 
    # this example uses state as the location if cities aren't available

    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        print("Data from OpenWeather API:")
        print(data)
        # Extract rain data; OpenWeather reports rain in mm for the past 1 hour or 3 hours
        # Here, we’ll check if "rain" data is available
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
