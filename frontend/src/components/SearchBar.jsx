import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;