import { useEffect, useState, useCallback } from "react";
import { topGames } from "../../api/topGames";
import { GameCardSkeleton } from "../../components/Skeleton";
import ErrorState from "../../components/ErrorState";
import "./topGamesPage.css";

const ajustarURL = (url, width, height) => {
  return url?.replace("{width}", width).replace("{height}", height);
};

const TopGames = () => {
  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopGames = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await topGames();
      setGameList(response.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load games");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopGames();
  }, [fetchTopGames]);

  const handleCardClick = (game) => {
    const slug = game.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    window.open(
      `https://www.twitch.tv/directory/category/${slug}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      className="px-4 sm:px-6 py-6 max-w-[1440px] mx-auto"
      aria-label="Top games"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Top Games
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Most popular games on Twitch right now
          </p>
        </div>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          role="status"
          aria-label="Loading games"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchTopGames} />
      ) : gameList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No games available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {gameList.map((game) => (
            <article
              key={game.id}
              className="game-card group cursor-pointer"
              onClick={() => handleCardClick(game)}
              tabIndex={0}
              role="link"
              aria-label={`View ${game.name} on Twitch`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(game);
                }
              }}
            >
              <div className="game-card-image-wrapper">
                <img
                  src={ajustarURL(game.box_art_url, 300, 400)}
                  alt={game.name}
                  className="game-card-image"
                  loading="lazy"
                />
                <div className="game-card-overlay" aria-hidden="true">
                  <span className="text-sm font-medium">View on Twitch</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-twitch-light transition-colors">
                  {game.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopGames;
