import React from "react";

// Reusable detail row component
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-500 pb-1">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

// Main weather details display
const WeatherDetails = ({ data }) => {
  if (!data) {
    return (
      <div className="text-gray-300 text-center">
        No weather data available. Please search for a city.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-md space-y-4 bg-white bg-opacity-10 p-6 rounded-xl shadow-lg">
      <DetailRow label="🌡 Temperature" value={`${data.temperature}°C`} />
      <DetailRow label="💧 Humidity" value={`${data.humidity}%`} />
      <DetailRow label="👁️ Visibility" value={`${data.visibility} mi`} />
      <DetailRow label="🌬 Wind Speed" value={`${data.windSpeed} Km/h`} />
      <DetailRow label="🌡️ Feels Like" value={`${data.feelsLike}°C`} />
      <DetailRow label="🔽 Min Temp" value={`${data.minTemp}°C`} />
      <DetailRow label="🔼 Max Temp" value={`${data.maxTemp}°C`} />
      <DetailRow label="🧭 Wind Direction" value={data.windDirection} />
      <DetailRow label="📈 Pressure" value={`${data.pressure} hPa`} />
      <DetailRow label="📍 Coordinates" value={`${data.lat}, ${data.lon}`} />
    </div>
  );
};

export default WeatherDetails;
