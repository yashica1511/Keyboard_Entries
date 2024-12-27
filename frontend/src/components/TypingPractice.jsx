import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const TypingPractice = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [word, setWord] = useState('');
  const [typedWord, setTypedWord] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [typedWords, setTypedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [timerStarted, setTimerStarted] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef(null);

  const wordsList = {
    easy: ['apple', 'banana', 'cat', 'dog', 'egg', 'fish', 'goat', 'hat', 'ink', 'jar', 'kite', 'leaf', 'mouse', 'nest', 
                'orange', 'pen', 'queen', 'rose', 'sun', 'tree', 'umbrella', 'vase', 'water', 'x-ray', 'yarn', 'zebra',
                'ball', 'chair', 'door', 'eye', 'frog', 'glass', 'horse', 'island', 'jump', 'key', 'lion', 'milk', 'note', 
                'ocean', 'pencil', 'quiet', 'ring', 'sock', 'table', 'under', 'vase', 'wall', 'xylophone', 'yellow', 'zoo',
                'ant', 'bird', 'cup', 'deer', 'ear', 'fan', 'grape', 'hand', 'igloo', 'juice', 'kite', 'lamp', 'moon', 'nut',
                'owl', 'pig', 'quiz', 'rain', 'star', 'toy', 'up', 'van', 'wind', 'xenon', 'yacht', 'zero',
                'arrow', 'bridge', 'cake', 'dance', 'earth', 'feather', 'gold', 'hill', 'ice', 'jam', 'kangaroo', 'lemon',
                'mountain', 'nose', 'octopus', 'plant', 'queen', 'river', 'snake', 'train', 'unicorn', 'violet', 'whale', 'xylophone',
                'year', 'zucchini', 'alien', 'book', 'cloud', 'dragon', 'engine', 'feather', 'garden', 'hero', 'idea', 'jewel',
                'knight', 'lizard', 'magic', 'nest', 'owl', 'pirate', 'quill', 'robot', 'ship', 'treasure', 'unicorn', 'violin',
                'wheel', 'x-ray', 'yeti', 'zeppelin'],
    medium: ['library', 'sunlight', 'picture', 'umbrella', 'infinite', 'whistle', 'giraffe', 'mountain', 'perfect', 'danger', 
                'holiday', 'capture', 'bicycle', 'feather', 'harmony', 'lantern', 'elephant', 'chicken', 'sandwich', 'freedom',
                'shining', 'envelope', 'village', 'compass', 'courage', 'paradise', 'notebook', 'backpack', 'waterfall', 'festival',
                'journey', 'sunflower', 'football', 'diamond', 'elephant', 'treasure', 'computer', 'blanket', 'cushion', 'airplane',
                'electric', 'dangerous', 'umbrella', 'gigantic', 'creative', 'laughter', 'frequent', 'pencil', 'mystery', 'glasses',
                'butterfly', 'flamingo', 'avocado', 'carousel', 'whisper', 'lightning', 'fireworks', 'balloons', 'telescope', 'galaxy',
                'popcorn', 'champion', 'dolphin', 'magnet', 'pancakes', 'football', 'calendar', 'sunset', 'rainbow', 'diamond', 
                'festival', 'universe', 'butterfly', 'whisper', 'carousel', 'galaxy', 'mountain', 'pancakes', 'computer', 'sunshine', 
                'butterfly', 'sunflower', 'telescope', 'lightning', 'flamingo', 'giraffe', 'laughter', 'pancakes', 'avocado', 
                'sunflower', 'carousel', 'whistle', 'infinite', 'galaxy', 'waterfall', 'telescope', 'rainbow', 'popcorn', 
                'champion', 'dolphin', 'magnet', 'holiday', 'festival', 'journey', 'compass', 'feather', 'mountain', 'perfect',
                'creative', 'lantern', 'gigantic', 'paradise', 'laughter', 'compass', 'harmony', 'whistle', 'village', 'capture',
                'diamond', 'holiday', 'umbrella', 'courage', 'treasure', 'whisper', 'notebook', 'airplane', 'freedom', 'carousel',
                'waterfall', 'computer', 'sunlight', 'sandwich', 'journey'],
    hard: ['acknowledge', 'adventure', 'alignment', 'allegiance', 'ambulance', 'ammunition', 'antibiotic', 'appreciation', 
                'architecture', 'articulate', 'atmosphere', 'authorization', 'background', 'behavioral', 'blasphemous', 'boundary',
                'calculation', 'capability', 'characterize', 'combustible', 'comprehensive', 'consequences', 'constellation', 
                'correlation', 'demonstration', 'development', 'differentiation', 'disciplinary', 'discovery', 'displacement',
                'efficiency', 'electrification', 'elimination', 'environmental', 'establishment', 'exaggeration', 'exclusively',
                'experimentation', 'extraterrestrial', 'geographical', 'gratification', 'hallucination', 'hypothetical', 
                'implementation', 'inconsequential', 'industrialization', 'intelligence', 'intercontinental', 'involvement', 
                'jurisdiction', 'kaleidoscope', 'laboratory', 'legislation', 'logarithmic', 'maintenance', 'manipulation', 
                'measurement', 'misinterpretation', 'monumental', 'nationalistic', 'neighborhood', 'neuroscientist', 'observation',
                'occupational', 'opportunity', 'organization', 'overwhelming', 'parameter', 'participation', 'performance', 
                'philosophical', 'photograph', 'practicality', 'preparation', 'preservation', 'principality', 'pronunciation', 
                'psychological', 'radiation', 'recognition', 'rehabilitation', 'reliability', 'representation', 'revolutionary', 
                'satisfaction', 'simplification', 'specification', 'sustainability', 'synchronized', 'telecommunication', 
                'theoretical', 'thoroughness', 'transportation', 'unbelievable', 'unification', 'unpredictable', 'verification', 
                'vulnerability', 'wavelength', 'wholesomeness', 'wonderment', 'xenophobia', 'youthfulness', 'zealousness', 
                'zooplankton', 'achievement', 'acknowledgment', 'acquisition', 'advancement', 'aggregation', 'announcement', 
                'anticipation', 'apprehension', 'articulation', 'astonishment', 'attachment', 'authenticity', 'availability', 
                'biotechnology', 'breathtaking', 'calculation', 'capitalization', 'categorization', 'characterization', 
                'communication', 'complication', 'congratulation', 'conjunction', 'consideration', 'continuation', 'contribution', 
                'coordination', 'determination', 'discontinuation', 'disorganization', 'documentation', 'domination', 'elaboration', 
                'evaluation', 'exaggeration', 'experimental', 'fascination', 'fortification', 'geographical', 'hallucination', 
                'harmonization', 'identification', 'imagination', 'illumination', 'implementation'],
  };

  const sentencesList = {
    easy: ['The sun is bright.', 'The cat is on the roof.', 'The dog runs fast.','I like to eat apples.','He reads a book daily.',
        'The bird is singing sweetly.',' I play with my friend.','The car is very fast.','She enjoys sunny days.'],
    medium: ['The elephant walked through the forest.','The library is a quiet place to read.','The festival was filled with joy and color.','She wore a beautiful dress to the event.','He drove across the scenic route.',
        'The picture on the wall was a beautiful landscape.','The umbrella protected her from the rain.','He wrote a compelling essay.','The river flowed gently through the valley.'
    ],
    hard: ['The quick brown fox jumps over the lazy dog.', 'She sells seashells by the seashore.','The algorithm efficiently solved the complex problem.','The symposium addressed critical global issues.',
        'The researcher carefully analyzed the data to draw meaningful conclusions.',' The research paper explored innovative methodologies.','The conservation effort aimed at preserving endangered species.',
        'The mathematical proofs were complex and intricate.','The cryptographic techniques ensure secure communication.'
    ],
  };

  useEffect(() => {
    startPractice(); 
    return () => clearTimeout(timerRef.current);
  }, [difficulty]);

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endPractice();
    }
    return () => clearTimeout(timerRef.current);
  }, [timerStarted, timeLeft]);

  const startPractice = () => {
    const randomItem = Math.random() < 0.5
      ? wordsList[difficulty][Math.floor(Math.random() * wordsList[difficulty].length)]
      : sentencesList[difficulty][Math.floor(Math.random() * sentencesList[difficulty].length)];
    setWord(randomItem);
    setTypedWord('');
  };

  const startTimer = () => {
    setTimerStarted(true);
    startPractice();
  };

  const handleInputChange = (e) => {
    setTypedWord(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (typedWord.trim() === word) {
        setCorrectWords([...correctWords, word]);
        setScore(score + 1);
      }
      setTypedWords([...typedWords, typedWord.trim()]);
      startPractice(); 
      setTypedWord(''); 
    }
  };

  const endPractice = () => {
    setTimerStarted(false);
    alert(`Time’s up! Your score: ${score}`);
  };

  const resetPractice = () => {
    setTimeLeft(60);
    setScore(0);
    setTypedWords([]);
    setCorrectWords([]); // Clear the correct words
    startPractice();
    setTimerStarted(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setTimeLeft(60);
    setTimerStarted(false);
    setScore(0);
    setTypedWords([]);
    setCorrectWords([]); 
    startPractice();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
      {/* Navbar */}
      <nav className="w-full bg-blue-700 p-4 fixed top-0 z-50"> {/* Adjusted the background color and made it fixed to the top */}
        <div className="container mx-auto flex justify-between">
          <Link to="/home" className="text-white text-xl font-semibold">
            Home
          </Link>
          {/* Add more links if needed */}
        </div>
      </nav>

      {/* Adding padding to avoid overlapping with the fixed navbar */}
      <div className="pt-16 flex flex-col items-center justify-center w-full">
        <h2 className="text-5xl font-bold mb-8 mt-4">Typing Practice</h2>
        <p className="text-lg mb-6">Choose a difficulty level and start practicing your typing skills!</p>
        <div className="flex mb-6">
          <button
            className={`px-6 py-3 mx-2 rounded-full ${difficulty === 'easy' ? 'bg-white text-blue-600' : 'bg-transparent border border-white'}`}
            onClick={() => handleDifficultyChange('easy')}
          >
            Easy
          </button>
          <button
            className={`px-6 py-3 mx-2 rounded-full ${difficulty === 'medium' ? 'bg-white text-blue-600' : 'bg-transparent border border-white'}`}
            onClick={() => handleDifficultyChange('medium')}
          >
            Medium
          </button>
          <button
            className={`px-6 py-3 mx-2 rounded-full ${difficulty === 'hard' ? 'bg-white text-blue-600' : 'bg-transparent border border-white'}`}
            onClick={() => handleDifficultyChange('hard')}
          >
            Hard
          </button>
        </div>
        <p className="text-4xl mt-6 font-mono bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg">{word}</p>
        <input
          type="text"
          value={typedWord}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="mt-4 px-4 py-2 text-lg font-mono rounded-lg text-black focus:outline-none"
          placeholder="Start typing..."
          autoFocus
          disabled={!timerStarted}
        />
        <div className="mt-6 text-2xl">Time Left: {timeLeft}s</div>
        <div className="mt-2 text-2xl">Score: {score}</div>
        <div className="mt-6">
          {!timerStarted ? (
            <button onClick={startTimer} className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">
              Start Timer
            </button>
          ) : (
            <button onClick={resetPractice} className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">
              Reset Practice
            </button>
          )}
        </div>
        <div className="mt-8 w-3/4">
          <h3 className="text-2xl font-semibold mb-4">Typed Words:</h3>
          <div className="flex flex-wrap">
            {typedWords.map((typed, index) => (
              <span
                key={index}
                className={`px-2 py-1 m-1 rounded-lg ${
                  correctWords.includes(typed) ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {typed}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;