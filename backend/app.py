from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

# Add the path to your `ml` directory to the system path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ml_floods'))

# Import the necessary functions from `fetch_data.py`
from ml_floods.fetch_data import alert, get_location

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get-data-floods', methods=['GET'])
def get_data():
    try:
        # Get weather and alert information
        weather_data = alert()
        if "error" in weather_data:
            return jsonify({"error": weather_data["error"]}), 500

        response = {
            "location": get_location(),
            "weather": {
                "temperature": weather_data["temperature"],
                "feels_like": weather_data["feels_like"],
                "humidity": weather_data["humidity"],
                "pressure": weather_data["pressure"],
                "wind_speed": weather_data["wind_speed"],
                "cloud_cover": weather_data["cloud_cover"],
                "description": weather_data["description"],
                "country": weather_data["country"],
                "sunrise": weather_data["sunrise"],
                "sunset": weather_data["sunset"]
            },
            "alert": weather_data["alert"]
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Run the Flask server
    app.run(debug=True)