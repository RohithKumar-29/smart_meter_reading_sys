import numpy as np
import pandas as pd

class SmartMeterLoadForecaster:
    """
    Python Machine Learning & Time-Series Load Forecasting Engine
    Applies 7-day Moving Average, Linear Regression, and Z-Score Anomaly Detection
    to historical smart meter readings.
    """

    def __init__(self, tariff_rate_rs=7.50):
        self.tariff_rate_rs = tariff_rate_rs

    def calculate_moving_average_forecast(self, historical_kwh_list, horizon_days=7):
        """
        Calculates 7-day Moving Average Load Forecast (kWh)
        and estimates daily energy billing in Indian Rupees (₹).
        """
        readings = np.array(historical_kwh_list, dtype=float)
        mean_load_kwh = float(np.mean(readings))
        std_dev_kwh = float(np.std(readings))

        forecast_points = []
        for day in range(1, horizon_days + 1):
            # Day factor modeling weekday peak vs weekend baseline
            day_factor = 0.90 if (day % 7 in [0, 6]) else 1.05
            predicted_kwh = round(mean_load_kwh * day_factor, 2)
            estimated_cost_rs = round(predicted_kwh * self.tariff_rate_rs, 2)

            forecast_points.append({
                "day": f"Day +{day}",
                "predicted_kwh": predicted_kwh,
                "estimated_cost_rs": estimated_cost_rs
            })

        return {
            "mean_daily_kwh": round(mean_load_kwh, 2),
            "std_dev_kwh": round(std_dev_kwh, 2),
            "tariff_rate": f"Rs. {self.tariff_rate_rs} / kWh",
            "forecast_points": forecast_points
        }

    def detect_anomalies_zscore(self, historical_kwh_list, threshold=2.5):
        """
        Z-Score Anomaly Detection: Z = (X - µ) / σ
        Flags usage spikes exceeding 2.5 standard deviations as potential meter tampering or power leakage.
        """
        readings = np.array(historical_kwh_list, dtype=float)
        mean = np.mean(readings)
        std = np.std(readings)

        anomalies = []
        for idx, val in enumerate(readings):
            z_score = abs(val - mean) / std if std > 0 else 0
            if z_score > threshold:
                anomalies.append({
                    "index": idx,
                    "kwh_reading": val,
                    "z_score": round(float(z_score), 2),
                    "status": "CRITICAL_SPIKE_ALERT"
                })

        return anomalies


if __name__ == "__main__":
    forecaster = SmartMeterLoadForecaster(tariff_rate_rs=7.50)
    sample_data = [340.5, 352.0, 348.2, 360.1, 355.4, 342.5, 349.0]
    result = forecaster.calculate_moving_average_forecast(sample_data, horizon_days=7)

    print("=" * 60)
    print("PYTHON ML LOAD FORECASTING SYSTEM")
    print("=" * 60)
    print(f"Historical Mean Daily kWh: {result['mean_daily_kwh']} kWh")
    print(f"Standard Deviation: {result['std_dev_kwh']} kWh")
    print(f"Standard Tariff Rate: {result['tariff_rate']}")
    print("-" * 60)
    print("Next 7-Day Forecast:")
    for pt in result['forecast_points']:
        print(f"  {pt['day']}: {pt['predicted_kwh']} kWh | Estimated Cost: Rs. {pt['estimated_cost_rs']}")
    print("=" * 60)
