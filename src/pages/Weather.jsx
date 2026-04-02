import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeatherCard from "../components/WeatherCard";
import locations from "../hooks/js/location";

function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWeather = async () => {
    try {
      const weatherResults = await Promise.all(
        locations.map(async (loc) => {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&hourly=relativehumidity_2m,cloudcover,windspeed_10m`;

          const res = await fetch(url);
          const data = await res.json();
          const weather = data.current_weather;

          const eatTime = new Date(weather.time).toLocaleString("en-KE", {
            timeZone: "Africa/Nairobi",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return {
            location: loc,
            weather: {
              temperature: weather.temperature,
              windspeed: weather.windspeed,
              winddirection: weather.winddirection,
              time: eatTime,
            },
          };
        })
      );

      setWeatherData(weatherResults);
      setLoading(false);
    } catch (error) {
      console.error("Error loading weather:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();

    const interval = setInterval(loadWeather, 600000); // 10 mins

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <section className="weather-section">
        <div className="weather-header">
          <h2>Nairobi Environmental Weather Monitoring</h2>
          <p>
            Real-time atmospheric conditions across HYDROS-C tracker locations.
            Weather conditions influence water pollution spread, oxygen levels,
            and ecosystem recovery in the Nairobi River Basin.
          </p>
        </div>

        <div className="weather-grid">
          {loading ? (
            <p>Loading weather data...</p>
          ) : (
            weatherData.map((item, index) => (
              <WeatherCard
                key={index}
                location={item.location}
                weather={item.weather}
              />
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Weather;