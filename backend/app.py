from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

# Add the path to your `ml` directory to the system path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ml'))

# Import the necessary functions from `fetch_data.py`
from ml_floods.fetch_data import alert, get_location

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get-data-floods', methods=['GET'])
def get_data():
    try:
        # Get the location and alert from the ML code
        location = get_location()
        alert_message = alert()
        
        # Respond with JSON
        response = {
            "location": location,
            "alert": alert_message
        }
        return jsonify(response), 200
    except Exception as e:
        # Handle exceptions gracefully
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask server
    app.run(debug=True)