import React, { useState } from "react";
import bgImage from "../assets/bgimage1.jpg";
import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherData.jsx";

// Main Home Component
const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    console.log("fetchWeather called with:", city); // Debug log
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = `https://ymv9afmwvl.execute-api.us-west-2.amazonaws.com/dev/weather?city=${encodeURIComponent(city)}`;
      console.log("API URL:", apiUrl); // Debug log
      
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Response status:", res.status); // Debug log
      console.log("Response headers:", res.headers); // Debug log
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("API Response data:", data); // Debug log
      
      // Check if the response has the expected structure
      if (data && data.temperature !== undefined) {
        setWeather(data);
        setLocation({ 
          city: data.city || city, 
          country: data.country || "" 
        });
      } else {
        throw new Error("Invalid data structure received from API");
      }
      
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(`Failed to fetch weather data: ${err.message}`);
      setWeather(null);
      setLocation({ city: "", country: "" });
    } finally {
      setLoading(false);
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
            <h2 className="text-3xl font-semibold mb-1">
              {location.city || "Search for a city"}
            </h2>
            <p className="text-lg text-gray-300">{location.country}</p>
          </div>
          <div>
            <p className="text-xl mb-2">{new Date().toDateString()}</p>
            <p className="text-xl">{new Date().toLocaleTimeString()}</p>
          </div>
          <p className="text-6xl font-bold mt-8">
            {weather?.temperature ? `${weather.temperature}°C` : "--°C"}
          </p>
        </div>

        {/* Right Panel */}
       <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-black bg-opacity-60 backdrop-blur-md">
          {weather && (
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold">
                {weather.condition || "Weather Condition"}
              </h2>
              <p className="text-lg text-gray-300">
                {location.city}, {location.country}
              </p>
            </div>
          )}

          {/* Weather Details */}
          {<WeatherDetails data={weather} />}

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
