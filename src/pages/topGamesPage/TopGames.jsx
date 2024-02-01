import { useEffect, useState } from "react";
import { topGames } from "../../api/topGames";
import "./topGamesPage.css";

const TopGames = () => {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    fetchTopGames();
  }, []);

  const ajustarURL = (url, width, height) => {
    return url.replace("{width}", width).replace("{height}", height);
  };

  const fetchTopGames = async () => {
    try {
      const response = await topGames();
      setGameList(response.data.data);
    } catch (error) {
      console.error("Error fetching top games:", error);
    }
  };

  const handleCardClick = (game) => {
    const gameNameLower = game.name.toLowerCase();
    const gameNameForURL = gameNameLower.replace(/\s+/g, "-").replace(/:/g, "");
    const twitchCategoryURL = `https://www.twitch.tv/directory/category/${gameNameForURL}`;
    window.location.href = twitchCategoryURL;
  };

  return (
    <>
      <div className="top-games-container ">
        <h1 className="text-3xl my-5 font-bold">Top Games:</h1>
        <hr className="h-px my-9 border-0 dark:bg-twitch-color" />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10">
          {gameList.map((game) => (
            <div className="card" key={game.id}>
              <img
                src={ajustarURL(game.box_art_url, 250, 350)}
                alt="game image"
              />
              <div className="card__content">
                <p className="card__title mb-3">{game.name}</p>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCardClick(game)}
                  className="mb-2 text-twitch-color hover:text-twitch-color-dark"
                >
                  See more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopGames;
