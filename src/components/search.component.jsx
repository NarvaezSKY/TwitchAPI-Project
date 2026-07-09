import { useEffect, useState, useRef, useCallback } from "react";
import { categories } from "../api/categories";
import { SearchResultSkeleton } from "./Skeleton";
import ErrorState from "./ErrorState";
import "./search.css";

const ajustarURL = (url, width, height) => {
  return url?.replace("{width}", width).replace("{height}", height);
};

/* eslint-disable react/prop-types */
const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const fetchSearch = useCallback(async (q) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await categories(q);
      setSearchResults(response.data.data || []);
    } catch (err) {
      setError(err.message || "Search failed");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      fetchSearch(trimmed);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSearch]);

  const handleResultClick = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    window.open(`https://www.twitch.tv/directory/category/${slug}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Search categories"
    >
      <div className="modal">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Search Categories</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for games, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#18181b] border border-border-custom rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-twitch/50 focus:border-twitch transition-all"
            aria-label="Search categories"
          />
        </div>

        <div className="search-results">
          {isLoading ? (
            <div className="space-y-2" role="status" aria-label="Searching...">
              {Array.from({ length: 6 }).map((_, i) => (
                <SearchResultSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={() => fetchSearch(query.trim())} />
          ) : searchResults.length === 0 && query.trim() ? (
            <p className="text-center text-gray-500 py-8">
              {`No results for "`}<span className="text-white">{query}</span>{`"`}
            </p>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Start typing to search categories
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.name)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#18181b] border border-border-custom hover:border-twitch/30 hover:bg-[#1f1f23] transition-all text-left group"
                >
                  <img
                    src={ajustarURL(result.box_art_url, 80, 110)}
                    alt={result.name}
                    className="w-14 h-20 rounded-lg object-cover shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-twitch-light transition-colors truncate">
                      {result.name}
                    </p>
                    {result.is_broadcasting !== undefined && (
                      <p className={`text-xs mt-0.5 ${result.is_broadcasting ? 'text-red-500' : 'text-gray-500'}`}>
                        {result.is_broadcasting ? '● Live' : 'Offline'}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
