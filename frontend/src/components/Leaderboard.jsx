import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${API_URL}/api/typing/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('API Response:', response.data);

        const rawData = response.data.leaderboard || [];
        const userHighestScores = {};

        rawData.forEach(user => {
          if (!userHighestScores[user.username] || user.wpm > userHighestScores[user.username].wpm) {
            userHighestScores[user.username] = user;
          }
        });

        const highestScoresArray = Object.values(userHighestScores).sort((a, b) => b.wpm - a.wpm);

        setLeaderboard(highestScoresArray);
        setCurrentUser(response.data.currentUser || null);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
      });
  }, [navigate]);

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6" style={{
      background: `url('/photo.jpeg') center/cover no-repeat, linear-gradient(to bottom right, #0a0f1e, #1b1f2a)`
    }}>
      <nav className="absolute top-0 left-0 w-full px-6 py-4 bg-black bg-opacity-40 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/home" className="text-white text-xl font-bold">Back</Link>
        </div>
      </nav>
      
      {/* Title */}
      <h1 className="text-5xl font-extrabold mt-20 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
        🏆 Leaderboard 🏆
      </h1>

      {/* Leaderboard Table */}
      <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700">
        <div className="max-h-[360px] overflow-y-auto"> {/* Fixed height for 6 rows + scrollbar */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-lg bg-gray-900 text-white font-semibold rounded-t-lg">
                <th className="p-4 border-b border-gray-700 text-center">Rank</th>
                <th className="p-4 border-b border-gray-700">Username</th>
                <th className="p-4 border-b border-gray-700 text-center">WPM</th>
                <th className="p-4 border-b border-gray-700 text-center">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((user, index) => (
                  <tr key={user._id} className={`text-lg font-medium transition duration-300 hover:bg-gray-200 hover:scale-[1.02] ${currentUser?.username === user.username ? 'bg-yellow-400 text-gray-900 font-bold shadow-lg' : 'bg-white text-gray-900'}`}>
                    <td className="p-4 border-b border-gray-300 text-center">{getRankBadge(index + 1)}</td>
                    <td className="p-4 border-b border-gray-300">{user.username || 'Unknown'}</td>
                    <td className="p-4 border-b border-gray-300 text-center">{user.wpm}</td>
                    <td className="p-4 border-b border-gray-300 text-center">{user.accuracy}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-5 text-center text-lg text-gray-300">
                    No leaderboard data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Current User Rank */}
      {currentUser && (
        <div className="mt-6 text-xl font-bold bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg border border-yellow-500">
          Your Rank: {leaderboard.findIndex(user => user.username === currentUser.username) + 1}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
