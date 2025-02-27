import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userStats, setUserStats] = useState({
    testsCompleted: 0,
    avgWPM: 0,
    highestWPM: 0,
    recentActivity: [],
  });
  const API_URL = import.meta.env.VITE_BACKEND_URL;


  const navigate = useNavigate();

  const fetchResults = () => {
    axios
      .get(`${API_URL}/api/typing/fetch-results`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const results = response.data.results || [];

        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const recentResults = results.slice(0, 3);
        const processedResults = recentResults.map((result) => {
          const date = new Date(result.createdAt).toISOString().split('T')[0];
          return {
            date,
            activity: `Completed a typing test with ${result.wpm || 0} WPM and ${result.accuracy || 0}% accuracy`,
          };
        });

        setUserStats({
          testsCompleted: results.length,
          avgWPM: results.length
            ? results.reduce((acc, result) => acc + result.wpm, 0) / results.length
            : 0,
          highestWPM: Math.max(...results.map((result) => result.wpm), 0),
          recentActivity: processedResults,
        });
      })
      .catch((error) => {
        console.error('Error fetching typing test results:', error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchResults();
    }

    const interval = setInterval(() => {
      fetchResults();
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center text-white relative"
      style={{
        background: `url('/photo.jpeg') center/cover no-repeat, linear-gradient(to bottom right, #0a0f1e, #1b1f2a)`,
      }}
    >
      {/* Header */}
      <header className="w-full px-6 py-5 flex justify-between items-center bg-black bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-white">Typing Test</div>
        <nav className="flex space-x-4">
          <button
            className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all"
            onClick={() => navigate('/about')}
          >
            About
          </button>
          {isLoggedIn ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
              onClick={() => {
                localStorage.removeItem('authToken');
                setIsLoggedIn(false);
                navigate('/');
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200">Login</a>
              <a href="/register" className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200">Sign Up</a>
            </>
          )}
        </nav>
      </header>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">Enhance Your Typing Skills</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-2">
          {isLoggedIn ? `Welcome back! Ready to break your record?` : `Challenge yourself and improve your typing speed and accuracy with our interactive tests.`}
        </p>

      {/* Main Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full px-6">
        <button className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all" onClick={() => navigate('/typingtest')}>
          Start Typing Test
        </button>
        <button className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all" onClick={() => navigate('/practice')}>
          Practice Mode
        </button>
        <button className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all" onClick={() => navigate('/leader')}>
          Leaderboard & Achievements
        </button>
      </div>

      {/* Stats Section */}
      {isLoggedIn && (
        <div className="mt-10 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">Your Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white text-gray-900 font-semibold rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Tests Completed</h3>
              <p className="text-3xl">{userStats.testsCompleted}</p>
            </div>
            <div className="p-6 bg-white text-gray-900 font-semibold rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Average WPM</h3>
              <p className="text-3xl">{userStats.avgWPM.toFixed(2)}</p>
            </div>
            <div className="p-6 bg-white text-gray-900 font-semibold rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Highest WPM</h3>
              <p className="text-3xl">{userStats.highestWPM}</p>
            </div>
          </div>

          {/* Recent Activity */}
          <h3 className="text-2xl font-bold mt-10 text-center text-white">Recent Activity</h3>
          <ul className="mt-4 space-y-4">
            {userStats.recentActivity.length > 0 ? (
              userStats.recentActivity.map((activity, index) => (
                <li key={index} className="p-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg">
                  <p>{activity.date}: {activity.activity}</p>
                </li>
              ))
            ) : (
              <p className="text-lg text-center text-gray-300">No recent activity.</p>
            )}
          </ul>
        </div>
      )}

      <footer className="w-full px-6 py-5 mt-10 text-center text-sm bg-black bg-opacity-40 backdrop-blur-lg rounded-lg">
        <p className="text-gray-300">&copy; 2024 Typing Test. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
