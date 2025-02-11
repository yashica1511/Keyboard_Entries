import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-8 overflow-hidden" style={{ backgroundImage: "url('/sky.jpg')" }}>
      <nav className="w-full fixed top-0 left-0 flex justify-between items-center bg-black bg-opacity-50 p-4 shadow-lg z-50">
        <button
          className="text-white text-lg font-bold hover:underline"
          onClick={() => navigate("/home")}
        >
          Back
        </button>
      </nav>

      <div className="w-full max-w-6xl bg-white bg-opacity-90 text-blue-700 rounded-lg shadow-lg p-8 flex flex-col items-center text-center space-y-6 mt-16">
        <h2 className="text-4xl font-extrabold drop-shadow-lg">About the Typing Test App</h2>
        <p className="text-lg leading-relaxed max-w-5xl">
          Welcome to the Typing Test App! Our goal is to help you master the art of typing,
          whether you're a beginner or an advanced typist. Improve your speed, accuracy, and confidence.
        </p>

        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="p-6 bg-blue-200 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Custom Levels</h3>
            <p className="text-gray-800">Choose from Easy, Medium, or Hard to match your skill level.</p>
          </div>

          <div className="p-6 bg-blue-200 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Real-Time Feedback</h3>
            <p className="text-gray-800">Instantly see your WPM, accuracy, and improvement areas.</p>
          </div>

          <div className="p-6 bg-blue-200 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Performance Tracking</h3>
            <p className="text-gray-800">Analyze your progress with detailed stats and trends.</p>
          </div>

          <div className="p-6 bg-blue-200 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Exciting Games</h3>
            <p className="text-gray-800">Challenge yourself with Word Race, Typing Maze, and more.</p>
          </div>
        </div>

        <p className="text-lg max-w-5xl mt-6">
          Typing is a key skill in today's digital world. Our app makes learning fun and effective.
          Start your journey today and enjoy the engaging experience!
        </p>
      </div>
    </div>
  );
}

export default About;
