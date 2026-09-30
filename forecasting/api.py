from flask import Flask, request, jsonify
from load_forecast import SmartMeterLoadForecaster

app = Flask(__name__)
forecaster = SmartMeterLoadForecaster(tariff_rate_rs=7.50)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ONLINE", "service": "Python ML Load Forecasting API", "tariff": "₹7.50 / kWh"})

@app.route('/api/v1/forecast', methods=['POST'])
def forecast():
    data = request.json or {}
    readings = data.get('readings', [340.5, 352.0, 348.2, 360.1, 355.4, 342.5, 349.0])
    horizon = data.get('horizon', 7)

    forecast_result = forecaster.calculate_moving_average_forecast(readings, horizon_days=horizon)
    anomalies = forecaster.detect_anomalies_zscore(readings)

    return jsonify({
        "status": "SUCCESS",
        "result": forecast_result,
        "anomalies": anomalies
    })

if __name__ == '__main__':
    print("Starting Python Load Forecasting REST API on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
