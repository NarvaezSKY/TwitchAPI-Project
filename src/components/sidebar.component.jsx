import { topStreams } from "../api/topStreams";
import { useState, useEffect } from "react";

export const SideBar = () => {
  const [streamList, setStreamList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchStreams();
  });

  const ajustarURL = (url, width, height) => {
    return url.replace("{width}", width).replace("{height}", height);
  };

  const fetchStreams = async () => {
    try {
      const response = await topStreams();
      setStreamList(response.data.data);
    } catch (error) {
      console.error("Error al obtener streams:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickStream = (stream) => {
    const twitchCategoryURL = `https://www.twitch.tv/${stream.user_name}`;
    window.location.href = twitchCategoryURL;
  };

  return (
    <>
      {/* This SideBar is also a Template from uiverse.io xd*/}
      <button
        aria-controls="default-sidebar"
        aria-expanded={isSidebarOpen}
        onClick={toggleSidebar}
        className="fixed bottom-20 right-4 z-50 inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={
              isSidebarOpen ? "fill-current" : "fill-current text-gray-300"
            }
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform ${
          isSidebarOpen ? "-translate-x-full sm:translate-x-0" : "translate-x-0"
        }`}
        aria-label="Sidebar"
        style={{
          position: window.innerWidth > 640 ? "sticky" : "fixed",
          top: 0,
          height: "100vh",
        }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-sidebar text-left">
          <h1 className="text-sm font-bold text-white mb-2">Top Streams</h1>
          <ul className="space-y-2 font-medium">
            {streamList.map((stream) => (
              <li key={stream.id}>
                <div className="flex items-center">
                  <img
                    src={ajustarURL(stream.thumbnail_url, 100, 100)}
                    alt={`Thumbnail de ${stream.user_name}`}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <a
                      onClick={() => handleClickStream(stream)}
                      href="/"
                      target="_blank"
                    >
                      <p className="text-sm font-medium text-white">
                        {stream.user_name}
                      </p>
                    </a>
                    <p className="text-xs text-gray-400">
                      <span className="font-bold">{stream.game_name}</span> -{" "}
                      <span className="font-bold">{stream.viewer_count}</span>{" "}
                      viewers,{" "}
                      <span className="italic">
                        {/*Cutting stream name*/}
                        {stream.title.length > 25
                          ? stream.title.substring(0, 25) + "..."
                          : stream.title}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
