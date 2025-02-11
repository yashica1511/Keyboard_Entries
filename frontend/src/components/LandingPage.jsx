


const LandingPage = () => {
  return (
      <>
          <div 
              className="min-h-screen flex flex-col items-center justify-center text-white relative"
              style={{
                  background: `url('/photo.jpeg') center/cover no-repeat, linear-gradient(to bottom right, #0a0f1e, #1b1f2a)`,
              }}
          >
              {/* Header */}
              <header className="w-full px-6 py-5 flex justify-between items-center bg-black bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg">
                  <div className="text-2xl font-bold text-white">Typing Test</div>
                  <nav className="flex space-x-4">
                      <a href="/login" className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all">
                          Login
                      </a>
                      <a href="/register" className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all">
                          Sign Up
                      </a>
                  </nav>
              </header>

              {/* Main Section */}
              <main className="text-center flex flex-col items-center px-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
                      Enhance Your Typing Skills
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-8">
                      Challenge yourself and improve your typing speed and accuracy with our interactive tests.
                  </p>
              </main>

              <section id="features" className="mt-16 px-4 sm:px-8 md:px-16 lg:px-24">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center">
                        Features
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white text-gray-900 font-semibold p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-4">Real-Time Feedback</h3>
                            <p className="text-base">Get instant feedback on your typing speed, accuracy, and errors as you type.</p>
                        </div>
                        <div className="bg-white text-gray-900 font-semibold p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
                            <p className="text-base">Track your typing improvement over time with detailed statistics and graphs.</p>
                        </div>
                        <div className="bg-white text-gray-900 font-semibold p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-4">Multiplayer Mode</h3>
                            <p className="text-base">Compete with friends or other users in real-time typing races.</p>
                        </div>
                    </div>
                </section>

              {/* Footer */}
              <footer className="w-full px-6 py-5 mt-16 text-center text-sm bg-black bg-opacity-40 backdrop-blur-lg rounded-lg">
                  <p className="text-gray-300">&copy; 2024 Typing Test. All rights reserved.</p>
              </footer>
          </div>
      </>
  );
};

export default LandingPage;
