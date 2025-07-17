import React, { useState, useEffect } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Seoul");
  const [inputCity, setInputCity] = useState("");

  const getWeather = async (city) => {
    setLoading(true);
    setWeather(null);

    await new Promise((resolve) => setTimeout(resolve, 500)); // fake loading

    try {
      const apiKey = "91b9c6fc57139a262f616debfccb7223"; // 🔑 Replace with your key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();

      setWeather({
        temp: data.main.temp,
        name: data.name,
        description: data.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (err) {
      setWeather({ error: err.message });
    }

    setLoading(false);
  };

  useEffect(() => {
    getWeather(city);
  }, [city]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">🌤️ Weather</h1>
      <div className="weather-search">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter a city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {weather && weather.error && (
        <p className="error-message">{weather.error}</p>
      )}

      {weather && !weather.error && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img src={weather.icon} alt={weather.description} />
          <p className="temperature">{Math.round(weather.temp)}°C</p>
          <p className="description">{weather.description}</p>
        </div>
      )}
    </div>
  );
}
