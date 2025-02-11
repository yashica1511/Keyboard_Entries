import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const allSentences = [
  "The sun is bright.", "The cat is on the roof.", "The dog runs fast.",
  "I like to eat apples.", "He reads a book daily.", "The bird is singing sweetly.",
  "I play with my friend.", "The car is very fast.", "She enjoys sunny days.",
  "The elephant walked through the forest.", "The library is a quiet place to read.",
  "The festival was filled with joy and color.", "She wore a beautiful dress to the event.",
  "He drove across the scenic route.", "The picture on the wall was a beautiful landscape.",
  "The umbrella protected her from the rain.", "He wrote a compelling essay.",
  "The river flowed gently through the valley.", "The quick brown fox jumps over the lazy dog.",
  "She sells seashells by the seashore.", "The researcher carefully analyzed the data.",
  "The symposium addressed critical global issues.", "The conservation effort aimed at preserving species.",
  "The cryptographic techniques ensure secure communication."
];

const splitSentence = (sentence) => {
  const words = sentence.split(" ");
  let splitWords = [];
  let chunkSize = Math.ceil(words.length / 3);
  for (let i = 0; i < words.length; i += chunkSize) {
    splitWords.push(words.slice(i, i + chunkSize).join(" "));
  }
  return splitWords;
};

const getRandomPosition = (existingPositions, maxWidth, maxHeight) => {
  let x, y, overlap;
  do {
    x = Math.random() * (maxWidth - 200) + 50;
    y = Math.random() * (maxHeight - 200) + 50;
    overlap = existingPositions.some(pos => Math.abs(pos.x - x) < 150 && Math.abs(pos.y - y) < 70);
  } while (overlap);
  return { x, y };
};

const TypingMaze = () => {
  const [mazeWords, setMazeWords] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);
  let sentenceOrder = [];

  useEffect(() => {
    if (gameStarted) {
      gameRef.current.focus();
      let selectedSentences = allSentences.sort(() => 0.5 - Math.random()).slice(0, 6);
      sentenceOrder = selectedSentences.map((sentence, index) => ({ sentence, order: index + 1 }));
      let scatteredWords = [];
      let firstWords = new Set();

      selectedSentences.forEach((sentence) => {
        let splitWords = splitSentence(sentence);
        scatteredWords = [...scatteredWords, ...splitWords];
        firstWords.add(splitWords[0]);
      });

      let positions = [];
      scatteredWords = scatteredWords.map((word, index) => {
        const position = getRandomPosition(positions, window.innerWidth, window.innerHeight);
        positions.push(position);
        return { word, ...position, isFirst: firstWords.has(word), order: sentenceOrder.find(s => s.sentence.includes(word))?.order };
      });
      setMazeWords(scatteredWords);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [timeLeft, gameStarted]);

  const handleInputChange = (e) => {
    setTypedWord(e.target.value);
    if (e.target.value === mazeWords[currentSentenceIndex].word) {
      setScore(score + 10);
      if (currentSentenceIndex === mazeWords.length - 1) {
        setGameOver(true);
        setGameStarted(false);
      } else {
        setCurrentSentenceIndex((prev) => prev + 1);
        setTypedWord("");
      }
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden text-white flex flex-col items-center justify-center"
      tabIndex={0}
      ref={gameRef}
      style={{ background: `url('/sky.jpg') center/cover no-repeat` }}
    >
      <nav className="absolute top-0 left-0 w-full px-6 py-4 bg-black bg-opacity-40 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/games" className="text-white text-xl font-bold">Back</Link>
        </div>
      </nav>

      {!gameStarted ? (
        <div className="max-w-2xl text-center p-6 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4">Typing Maze Challenge</h1>
          <p className="text-lg mb-6">Find and type 6 hidden sentences in the maze. Each sentence is split into parts and scattered randomly. The first part of each sentence will be highlighted along with its order number.</p>
          <button
            onClick={() => {
              setGameStarted(true);
              setGameOver(false);
              setCurrentSentenceIndex(0);
              setTypedWord("");
              setTimeLeft(120);
              setScore(0);
            }}
            className="px-8 py-3 bg-green-500 text-white text-lg rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            {gameOver ? "Try Again" : "Start Now"}
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 text-4xl font-bold text-yellow-500">
            Time Left: {timeLeft}s | Score: {score}
          </div>
          {mazeWords.map((item, index) => (
            <div
              key={index}
              className={`absolute text-lg font-bold p-4 rounded-lg shadow-lg ${item.isFirst ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300"}`}
              style={{ left: `${item.x}px`, top: `${item.y}px` }}
            >
              {item.isFirst ? `${item.order}. ${item.word}` : item.word}
            </div>
          ))}
          <input
            type="text"
            value={typedWord}
            onChange={handleInputChange}
            className="absolute bottom-10 px-6 py-3 text-lg text-black rounded-md focus:outline-none"
            placeholder="Type here..."
          />
        </>
      )}
    </div>
  );
};

export default TypingMaze;
