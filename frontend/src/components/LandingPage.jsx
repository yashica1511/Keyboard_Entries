const LandingPage = () => {
    return(
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col items-center justify-center text-white">
      
      <header className="w-full px-4 py-6 sm:px-8 md:px-16 lg:px-24 flex justify-between items-center">
        <div className="text-2xl font-bold">Typing Test</div>
        <nav className="space-x-4">
          <a href="/login" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">Login</a>
          <a href="/register" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">Sign Up</a>
        </nav>
      </header>

      <main className="text-center flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">Enhance Your Typing Skills</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">Challenge yourself and improve your typing speed and accuracy with our interactive tests.</p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
        </div>
      </main>

<section id="features" className="mt-16 px-4 sm:px-8 md:px-16 lg:px-24">
  <h2 className="text-3xl sm:text-4xl font-bold mb-8">Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-4">Real-Time Feedback</h3>
      <p className="text-base">Get instant feedback on your typing speed, accuracy, and errors as you type.</p>
    </div>
    <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
      <p className="text-base">Track your typing improvement over time with detailed statistics and graphs.</p>
    </div>
    <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-4">Multiplayer Mode</h3>
      <p className="text-base">Compete with friends or other users in real-time typing races.</p>
    </div>
  </div>
</section>
      
      <footer className="w-full px-4 py-6 sm:px-8 md:px-16 lg:px-24 mt-16 text-center text-sm">
        <p>&copy; 2024 Typing Test. All rights reserved.</p>
      </footer>
    </div>
        </>
    )
}
export default LandingPage