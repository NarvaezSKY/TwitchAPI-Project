import { useState, useEffect, useCallback } from "react";
import { topStreams } from "../api/topStreams";
import { StreamItemSkeleton } from "./Skeleton";
import ErrorState from "./ErrorState";

const ajustarURL = (url, width, height) => {
  return url?.replace("{width}", width).replace("{height}", height);
};

const formatViewers = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count;
};

export const SideBar = () => {
  const [streamList, setStreamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStreams = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await topStreams();
      setStreamList(response.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load streams");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const handleClickStream = (stream) => {
    window.open(`https://www.twitch.tv/${stream.user_name}`, "_blank", "noopener,noreferrer");
  };

  return (
    <aside
      className="hidden sm:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-[#18181b] border-r border-border-custom scrollbar-hide"
      aria-label="Top streams sidebar"
    >
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Top Streams
        </h2>

        {isLoading ? (
          <div className="space-y-1" role="status" aria-label="Loading streams">
            {Array.from({ length: 8 }).map((_, i) => (
              <StreamItemSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchStreams} />
        ) : streamList.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No streams available</p>
        ) : (
          <ul className="space-y-1">
            {streamList.map((stream) => (
              <li key={stream.id}>
                <button
                  onClick={() => handleClickStream(stream)}
                  className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
                  aria-label={`Watch ${stream.user_name} streaming ${stream.game_name}`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={ajustarURL(stream.thumbnail_url, 100, 100)}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#18181b] rounded-full" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate group-hover:text-twitch-light transition-colors">
                      {stream.user_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      <span className="text-red-500 font-medium">{formatViewers(stream.viewer_count)} viewers</span>
                      <span className="mx-1">·</span>
                      <span className="truncate">{stream.game_name}</span>
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};
