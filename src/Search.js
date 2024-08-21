import React, { useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import "./SearchEngine.css";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  let [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  function searchCity() {
    const apiKey = "e37c6b88980f0619762528f7461327ae";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios
      .get(url)
      .then((response) => {
        const weather = response.data.weather[0];
        setTemperature(response.data.main.temp);
        setDescription(weather.description);
        setHumidity(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(getWeatherIcon(weather.main));
        setError(null);
      })
      .catch((error) => {
        setError("City not found");
        setTemperature(null);
        setDescription(null);
        setHumidity(null);
        setWind(null);
        setIcon(null);
      });
  }

  function getWeatherIcon(main) {
    switch (main) {
      case "Clear":
        return <WiDaySunny />;
      case "Clouds":
        return <WiCloud />;
      case "Rain":
        return <WiRain />;
      case "Snow":
        return <WiSnow />;
      case "Thunderstorm":
        return <WiThunderstorm />;
      case "Fog":
      case "Mist":
        return <WiFog />;
      default:
        return <WiDaySunny />;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateCity} placeholder="Enter city" />
        <input type="submit" value="Search" />
      </form>
      {temperature !== null && (
        <div className="result">
          <h2>Temperature: {temperature}°C</h2>
          <h3>Description: {description}</h3>
          <h3>Humidity: {humidity}%</h3>
          <h3>Wind: {wind} km/h</h3>
          <div className="icon">{icon}</div>
        </div>
      )}
      {error && (
        <div className="error">
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
}
