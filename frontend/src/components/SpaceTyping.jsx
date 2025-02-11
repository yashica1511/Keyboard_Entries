import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const wordList = [
  "apple", "banana", "cat", "dog", "egg", "fish", "goat", "hat", "ink", "jar", "kite", "leaf", "mouse", "nest",
  "orange", "pen", "queen", "rose", "sun", "tree", "umbrella", "vase", "water", "x-ray", "yarn", "zebra",
  "library", "sunlight", "picture", "umbrella", "infinite", "whistle", "giraffe", "mountain", "perfect", "danger",
  "holiday", "capture", "bicycle", "feather", "harmony", "lantern", "elephant", "chicken", "sandwich", "freedom",
  "shining", "envelope", "village", "compass", "courage", "paradise", "notebook", "backpack", "waterfall", "festival",
  "acknowledge", "adventure", "alignment", "allegiance", "ambulance", "ammunition", "antibiotic", "appreciation",
  "architecture", "articulate", "atmosphere", "authorization", "background", "behavioral", "blasphemous", "boundary",
  "calculation", "capability", "characterize", "combustible", "comprehensive", "consequences", "constellation",
  "correlation", "demonstration", "development", "differentiation", "disciplinary", "discovery", "displacement",
  "efficiency", "electrification", "elimination", "environmental", "establishment", "exaggeration", "exclusively",
  "experimentation", "extraterrestrial", "geographical", "gratification", "hallucination", "hypothetical",
  "implementation", "inconsequential", "industrialization", "intelligence", "intercontinental", "involvement",
  "satisfaction", "simplification", "specification", "sustainability", "synchronized", "telecommunication",
  "theoretical", "thoroughness", "transportation", "unbelievable", "unification", "unpredictable", "verification",
  "vulnerability", "wavelength", "wholesomeness", "wonderment", "xenophobia", "youthfulness", "zealousness",
  "zooplankton", "achievement", "acknowledgment", "acquisition", "advancement", "aggregation", "announcement",
  "anticipation", "apprehension", "articulation", "astonishment", "attachment", "authenticity", "availability",
  "biotechnology", "breathtaking", "capitalization", "categorization", "characterization", "communication",
  "complication", "congratulation", "conjunction", "consideration", "continuation", "contribution", "coordination",
  "determination", "discontinuation", "disorganization", "documentation", "domination", "elaboration", "evaluation",
  "exaggeration", "experimental", "fascination", "fortification", "geographical", "hallucination", "harmonization",
  "identification", "imagination", "illumination", "implementation"
];
const maxWordCount = 5;

const SpaceTyping = () => {
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameStarted) {
      gameRef.current.focus();
      const initialWords = Array.from({ length: maxWordCount }, () => createWord());
      setWords(initialWords);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setWords((prevWords) =>
          prevWords.map((word) => ({
            ...word,
            position: {
              x: word.position.x + (window.innerWidth / 2 - word.position.x) * 0.01,
              y: word.position.y + word.speed * speedMultiplier
            }
          }))
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameStarted, speedMultiplier]);

  useEffect(() => {
    words.forEach((word) => {
      if (word.position.y >= window.innerHeight - 100) {
        setGameOver(true);
        setGameStarted(false);
      }
    });
  }, [words]);

  useEffect(() => {
    if (score > 0 && score % 15 === 0) {
      setSpeedMultiplier((prev) => prev + 0.2);
    }
  }, [score]);

  const createWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    return {
      word,
      letters: word.split(""),
      position: { x: Math.random() * (window.innerWidth - 200) + 100, y: 0 },
      speed: Math.random() * 2 + 1
    };
  };

  const handleKeyPress = (e) => {
    const letter = e.key.toLowerCase();
    setWords((prevWords) =>
      prevWords.map((word) => {
        if (word.letters[0] === letter) {
          const newLetters = word.letters.slice(1);
          if (newLetters.length === 0) {
            setScore((prev) => prev + 1);
            return createWord();
          }
          return { ...word, letters: newLetters };
        }
        return word;
      })
    );
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden text-white flex flex-col items-center justify-center"
      tabIndex={0}
      ref={gameRef}
      onKeyDown={handleKeyPress}
      style={{ background: `url('/sky.jpg') center/cover no-repeat` }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full px-6 py-4 bg-black bg-opacity-40 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/games" className="text-white text-xl font-bold">Back</Link>
        </div>
      </nav>

      {!gameStarted ? (
        <div className="max-w-2xl text-center p-6 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4">Welcome to Word Race!</h1>
          <p className="text-lg mb-6">
            Test your typing speed and accuracy in this thrilling space adventure! Words fall from the sky, and you must type them quickly before they reach your rocket. As you progress, the game speeds up, making it more challenging.
          </p>
          <p className="text-lg mb-6">
            Can you beat the high score and become the ultimate Word Racer? Get ready to type your way to victory!
          </p>
          <button
            onClick={() => {
              setGameStarted(true);
              setGameOver(false);
              setScore(0);
              setSpeedMultiplier(1);
              setWords(Array.from({ length: maxWordCount }, () => createWord()));
            }}
            className="px-8 py-3 bg-green-500 text-white text-lg rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            {gameOver ? "Game Over! Restart" : "Start Now"}
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 text-4xl font-bold text-red-500">Score: {score}</div>
          <img src="/rocket.png" alt="Rocket" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-16" />
          {words.map((word, index) => (
            <div
              key={index}
              className="absolute text-green-400 text-xl"
              style={{ left: `${word.position.x}px`, top: `${word.position.y}px` }}
            >
              {word.letters.join("")}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SpaceTyping;
