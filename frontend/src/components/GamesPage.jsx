import React from "react";
import { Link } from "react-router-dom";

const games = [
  {
    name: "Space Typing",
    image: "/space.jpg",
    description: "Defend your spaceship by typing the incoming words quickly!",
    route: "/space",
  },
  {
    name: "Typing Maze",
    image: "/maze.png",
    description: "Find and type the correct sentence fragments scattered in the maze!",
    route: "/maze",
  },
  {
    name: "Word Race",
    image: "/word-race-thumbnail.png",
    description: "Defend your spaceship by typing the incoming words quickly!",
    route: "/word-race",
  }
];

const GamesPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/sky.jpg')" }}>
      <nav className="w-full px-6 py-4 bg-black bg-opacity-50 backdrop-blur-md shadow-lg flex justify-between items-center">
        <Link to="/practice" className="text-white text-xl font-bold">Back</Link>
      </nav>

      <h2 className="text-5xl font-extrabold text-white my-10 drop-shadow-lg">Choose Your Game</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-3/4">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img src={game.image} alt={game.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-bold text-gray-900 mt-4">{game.name}</h3>
            <p className="text-gray-700 mt-2">{game.description}</p>
            <Link
              to={game.route}
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Play Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
