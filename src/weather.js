import React, { useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState("No data yet");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    setWeather("Loading...");

    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake loading

    try {
      const city = "Seoul"; // you can make this dynamic
      const apiKey = "91b9c6fc57139a262f616debfccb7223"; // 🔑 Replace with your key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      setWeather(
        `🌡️ ${data.main.temp}°C in ${data.name} - ${data.weather[0].main}`
      );
    } catch (err) {
      setWeather("Error fetching weather");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>🌤️ Weather</h2>
      <button onClick={getWeather} disabled={loading}>
        {loading ? "Getting Weather..." : "Get Weather"}
      </button>
      <p>{weather}</p>
    </div>
  );
}
