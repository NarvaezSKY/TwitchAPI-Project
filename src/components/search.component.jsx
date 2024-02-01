import React, { useEffect, useState } from "react";
import { categories } from "../api/categories";
import "./search.css";
const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categories(query);
        const data = response.data.data;
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <>
    {/* This is a custom modal using Tailwind and a custom CSS */}
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal">
        <div className="modal-content">
          <button className="close-button bg-twitch-color" onClick={onClose}>
            Close
          </button>
          <input
            type="text"
            placeholder="Search for games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full py-2 px-3 border border-twitch-color rounded-md shadow-sm focus:outline-none focus:ring focus:border-twitch-color dark:bg-sidebar dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-twitch-color dark:focus:border-twitch-color mb-5"
          />
          <div
            className="search-results"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">
              {searchResults.map((result) => (
                <div className="modalCard" key={result.id}>
                  <div className="modalImg">
                    <img src={result.box_art_url} alt="Category" />
                  </div>
                  <div className="textBox">
                    <div className="textContent">
                      <p className="h1">{result.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchModal;
