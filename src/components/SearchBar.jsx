import React from 'react'
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search any city"
        className="px-4 py-2 rounded-md bg-gray-900 bg-opacity-70 border border-gray-600 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
