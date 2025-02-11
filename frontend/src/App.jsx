import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import TypingTest from './components/TypingTest';
import TypingPractice from './components/TypingPractice';
import About from './components/About';
import SpaceTyping from './components/SpaceTyping';
import TypingMaze from './components/TypingMaze';
import GamesPage from './components/GamesPage';
import TypingEscapeRoom from './components/TypingEscapeRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/typingtest"
          element={
            <ProtectedRoute>
              <TypingTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <TypingPractice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/space"
          element={
            <ProtectedRoute>
              <SpaceTyping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maze"
          element={
            <ProtectedRoute>
              <TypingMaze />
            </ProtectedRoute>
          }
        />
      <Route
          path="/games"
          element={
            <ProtectedRoute>
              <GamesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/escape"
          element={
            <ProtectedRoute>
              <TypingEscapeRoom />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
