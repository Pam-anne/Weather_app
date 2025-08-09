import React from 'react'
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query); // Debug log
      setIsLoading(true);
      try {
        await onSearch(query);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search any city"
        className="px-4 py-2 rounded-md bg-gray-900 bg-opacity-70 border border-gray-600 focus:outline-none text-white placeholder-gray-400"
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
