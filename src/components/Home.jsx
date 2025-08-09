import React, { useState } from "react";
import bgImage from "../assets/bgimage1.jpg";
import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherData.jsx";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ city: "", country: "" });

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(`https://your-api-url.com/weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
      setLocation({ city: data.city, country: data.country });
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header */}
      <div className="bg-black bg-opacity-50 px-8 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Weather App</h1>
        <SearchBar onSearch={fetchWeather} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow w-full">
        {/* Left Panel */}
        <div className="flex flex-col justify-between w-full md:w-1/2 p-8 bg-black bg-opacity-40">
          <div>
            <h2 className="text-3xl font-semibold mb-1">{location.city}</h2>
            <p className="text-lg text-gray-300">{location.country}</p>
          </div>
          <div>
            <p className="text-xl mb-2">{new Date().toDateString()}</p>
            <p className="text-xl">{new Date().toLocaleTimeString()}</p>
          </div>
          <p className="text-6xl font-bold mt-8">{weather?.temperature}°C</p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-black bg-opacity-60 backdrop-blur-md">
          {weather && (
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold">{weather.condition}</h2>
              <p className="text-lg text-gray-300">
                {location.city}, {location.country}
              </p>
            </div>
          )}

          {/* Weather Details */}
          {weather && <WeatherDetails data={weather} />}

        </div>
      </div>
    </div>
  );
};

// Detail Row Component
const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-500 pb-1">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Home;
