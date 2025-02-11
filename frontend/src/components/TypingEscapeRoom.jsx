import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const wordPuzzles = [
    { clue: "A tool used to unlock doors", answers: ["key", "lockpick"] },
    { clue: "The time between sunrise and sunset", answers: ["day", "daylight"] },
    { clue: "An entrance to a room or building", answers: ["door", "gate"] },
    { clue: "An object with pages used for reading", answers: ["book", "novel"] },
    { clue: "A source of artificial light", answers: ["lamp", "bulb", "light"] },
    { clue: "A device used to write or draw", answers: ["pen", "pencil"] },
    { clue: "A place where students learn", answers: ["school", "classroom"] },
    { clue: "A large body of saltwater", answers: ["ocean", "sea"] },
    { clue: "A soft object used for sleeping", answers: ["pillow", "cushion"] },
    { clue: "A four-legged pet that barks", answers: ["dog", "puppy"] },
    { clue: "A device used to tell time", answers: ["clock", "watch"] },
    { clue: "A food made from flour and baked", answers: ["bread", "bun"] },
    { clue: "A circular object that helps a car move", answers: ["wheel", "tire"] },
    { clue: "A flying insect that makes honey", answers: ["bee", "honeybee"] },
    { clue: "A place where you sleep at night", answers: ["bed", "cot", "bunk"] },
    { clue: "A cold season of the year", answers: ["winter", "cold"] },
    { clue: "A vehicle with two wheels", answers: ["bike", "bicycle"] },
    { clue: "A place where you watch movies", answers: ["cinema", "theater"] },
    { clue: "A machine used to keep food cold", answers: ["fridge", "refrigerator"] },
    { clue: "A person who treats sick people", answers: ["doctor", "physician"] },
    { clue: "A fruit that is red and often used in salads", answers: ["tomato", "fruit"] },
    { clue: "An object used to cut paper", answers: ["scissors", "blade"] },
    { clue: "A pet that purrs and loves to nap", answers: ["cat", "kitten"] },
    { clue: "A person who writes books", answers: ["author", "writer"] },
    { clue: "A place where many animals live", answers: ["zoo", "sanctuary"] },
    { clue: "A musical instrument with keys", answers: ["piano", "keyboard"] },
    { clue: "A sport played with a bat and ball", answers: ["cricket", "baseball"] },
    { clue: "A place where planes take off and land", answers: ["airport", "runway"] },
    { clue: "A soft frozen dessert", answers: ["ice cream", "gelato"] },
    { clue: "A device used to talk to someone far away", answers: ["phone", "mobile"] },
    { clue: "A flying vehicle that travels in space", answers: ["rocket", "spaceship"] },
    { clue: "A plant that gives us oxygen", answers: ["tree", "plant"] }
  ];
  

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const TypingEscapeRoom = () => {
  const [shuffledPuzzles, setShuffledPuzzles] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    setShuffledPuzzles(shuffleArray([...wordPuzzles]));
  }, []);

  useEffect(() => {
    if (gameStarted) {
      if (inputRef.current) inputRef.current.focus();
      if (timeLeft > 0 && !gameOver) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setGameOver(true);
      }
    }
  }, [timeLeft, gameOver, gameStarted]);

  const handleInputChange = (e) => {
    setTypedWord(e.target.value);
    if (shuffledPuzzles[currentLevel].answers.includes(e.target.value.toLowerCase())) {
      if (currentLevel === shuffledPuzzles.length - 1) {
        alert("You escaped!");
        navigate("/home");
      } else {
        setCurrentLevel(currentLevel + 1);
        setTypedWord("");
      }
    }
  };

  const restartGame = () => {
    setShuffledPuzzles(shuffleArray([...wordPuzzles]));
    setGameStarted(false);
    setGameOver(false);
    setCurrentLevel(0);
    setTypedWord("");
    setTimeLeft(60);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center text-white" style={{ backgroundImage: "url('/sky.jpg')" }}>
      <nav className="w-full fixed top-0 left-0 flex justify-between items-center bg-black bg-opacity-50 p-4 shadow-lg z-50">
        <button className="text-white text-lg font-bold hover:underline" onClick={() => navigate("/games")}>Back</button>
      </nav>

      {!gameStarted ? (
        <div className="w-full max-w-4xl bg-black bg-opacity-40 text-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center space-y-6 mt-16">
          <h2 className="text-4xl font-extrabold drop-shadow-lg">Typing Escape Room</h2>
          <p className="text-lg">Solve the word puzzle to escape! Type the correct word, and the game will automatically move to the next level if the answer is correct. You can use multiple valid answers for each clue.</p>
          <button
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 bg-green-500 text-white text-lg rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-black bg-opacity-40 text-blue-700 rounded-lg shadow-lg p-8 flex flex-col items-center text-center space-y-6 mt-16">
          <h2 className="text-3xl font-extrabold text-white">Typing Escape Room</h2>
          <div className="text-2xl font-semibold p-6 bg-blue-200 rounded-lg shadow-md">
            <p className="text-gray-800">{shuffledPuzzles[currentLevel].clue}</p>
          </div>

          {gameOver ? (
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-red-500">Game Over! Time's up.</div>
              <p className="text-xl text-white font-semibold mt-4">You completed {currentLevel} levels.</p>
              <button
                onClick={restartGame}
                className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-lg hover:bg-blue-600 transition"
              >
                Restart Game
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={typedWord}
              onChange={handleInputChange}
              ref={inputRef}
              className="px-6 py-3 text-lg text-black rounded-md focus:outline-none"
              placeholder="Type your answer..."
            />
          )}

          <div className="text-2xl font-bold text-yellow-500">Time Left: {timeLeft}s</div>
        </div>
      )}
    </div>
  );
};

export default TypingEscapeRoom;
