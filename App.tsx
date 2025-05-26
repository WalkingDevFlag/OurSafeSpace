
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SubmissionForm from './components/SubmissionForm';
import FloatingHearts from './components/FloatingHearts'; 

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Simulate loading stored auth state

  useEffect(() => {
    // Check for stored login session
    const storedUser = localStorage.getItem('loggedInUserOurSafeSpace');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (userIdentifier: string) => {
    setLoggedInUser(userIdentifier);
    localStorage.setItem('loggedInUserOurSafeSpace', userIdentifier);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUserOurSafeSpace');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <p className="text-pink-500 text-xl">Loading our special place...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-pink-50 relative" // Removed background image style
    >
      <FloatingHearts /> {/* Render floating hearts */}
      <div className="relative z-10 flex flex-col min-h-screen"> {/* Content wrapper to be above hearts */}
        <Navbar isLoggedIn={!!loggedInUser} onLogout={handleLogout} />
        <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
          {loggedInUser ? (
            <SubmissionForm loggedInUser={loggedInUser} />
          ) : (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
