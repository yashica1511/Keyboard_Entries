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
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get('/api/user/stats')
        .then((response) => {
          const { testsCompleted, avgWPM, highestWPM, recentActivity } = response.data;
          setUserStats({
            testsCompleted,
            avgWPM,
            highestWPM,
            recentActivity: recentActivity.slice(0, 2),
          });
        })
        .catch((error) => {
          console.error('Error fetching user stats:', error);
        });
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col items-center justify-center text-white">
      <header className="w-full px-4 py-6 sm:px-8 md:px-16 lg:px-24 flex justify-between items-center">
        <div className="text-2xl font-bold">Typing Test</div>
        <nav className="space-x-4">
          {isLoggedIn ? (
            <button
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="hidden sm:inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">Login</a>
              <a href="/register" className="hidden sm:inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">Sign Up</a>
            </>
          )}
        </nav>
      </header>

      <main className="text-center flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">Enhance Your Typing Skills</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          {isLoggedIn ? `Welcome back! Ready to break your record?` : `Challenge yourself and improve your typing speed and accuracy with our interactive tests.`}
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
          <a href="/typingtest" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">Start Typing Test</a>
          {isLoggedIn && (
            <>
              <a href="/practice" className="px-6 py-3 bg-transparent border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600">Practice Mode</a>
              <a href="/multimode" className="px-6 py-3 bg-transparent border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600">Settings</a>
            </>
          )}
        </div>
      </main>

      {isLoggedIn && (
        <section className="mt-16 px-4 sm:px-8 md:px-16 lg:px-24 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Tests Completed</h3>
              <p className="text-2xl">{userStats.testsCompleted}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Average WPM</h3>
              <p className="text-2xl">{userStats.avgWPM.toFixed(2)}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Highest WPM</h3>
              <p className="text-2xl">{userStats.highestWPM}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-8">Recent Activity</h3>
          <ul className="mt-4 space-y-2">
            {userStats.recentActivity.map((activity, index) => (
              <li key={index} className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
                <p>{activity.date}: {activity.activity}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="w-full px-4 py-6 sm:px-8 md:px-16 lg:px-24 mt-16 text-center text-sm">
        <p>&copy; 2024 Typing Test. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
