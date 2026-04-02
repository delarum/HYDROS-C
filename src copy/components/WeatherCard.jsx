import React from "react";

function WeatherCard({ location, weather }) {
  return (
    <div className="weather-card">
      <div className="weather-location">{location.name}</div>

      <div className="weather-icon">🌤️</div>

      <div className="weather-temp">{weather.temperature}°C</div>

      <div className="weather-data">
        <span>Wind</span>
        <span>{weather.windspeed} km/h</span>
      </div>

      <div className="weather-data">
        <span>Direction</span>
        <span>{weather.winddirection}°</span>
      </div>

      <div className="weather-data">
        <span>Time</span>
        <span>{weather.time} EAT</span>
      </div>
    </div>
  );
}

export default WeatherCard;