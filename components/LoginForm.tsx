
import React, { useState } from 'react';
import { LockIcon, UserIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '../constants';

interface LoginFormProps {
  onLoginSuccess: (userIdentifier: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Access credentials:
    // For production builds, window.APP_CONFIG is populated by env-config.js.
    // For Vite dev environment, process.env.VAR_NAME is substituted by Vite's define.
    // This pattern prioritizes window.APP_CONFIG if available.
    const appConfig = (typeof window !== 'undefined' && window.APP_CONFIG) ? window.APP_CONFIG : {};

    const ENV_USER1_USERNAME = appConfig.USER1_USERNAME || process.env.USER1_USERNAME;
    const ENV_USER1_PASSWORD = appConfig.USER1_PASSWORD || process.env.USER1_PASSWORD;
    const ENV_USER2_USERNAME = appConfig.USER2_USERNAME || process.env.USER2_USERNAME;
    const ENV_USER2_PASSWORD = appConfig.USER2_PASSWORD || process.env.USER2_PASSWORD;

    const user1CredentialsSet = ENV_USER1_USERNAME && ENV_USER1_PASSWORD;
    const user2CredentialsSet = ENV_USER2_USERNAME && ENV_USER2_PASSWORD;

    // Determine which user logged in
    if (user1CredentialsSet && username === ENV_USER1_USERNAME && password === ENV_USER1_PASSWORD) {
      onLoginSuccess('USER1');
    } else if (user2CredentialsSet && username === ENV_USER2_USERNAME && password === ENV_USER2_PASSWORD) {
      onLoginSuccess('USER2');
    } else {
      if (!user1CredentialsSet && !user2CredentialsSet) {
          setError('Login is not configured correctly, my love. Please ensure credentials are set in the environment.');
          console.error('Login Error: User credentials are not set or found. Check Vercel environment variables or local .env file.');
      } else {
          setError('Oops! Incorrect username or password, my dear.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:shadow-2xl">
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <div className="p-3 bg-pink-100 rounded-full mb-3 sm:mb-4">
          <LockIcon className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-pink-600 mb-1 sm:mb-2 text-center">Welcome Back, My Love</h1>
        <p className="text-center text-gray-500 text-xs sm:text-sm">Please log in to continue to our special place.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none block w-full pl-10 pr-3 py-3 bg-white text-black placeholder-gray-400 border border-pink-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm sm:text-base transition-colors"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="appearance-none block w-full pl-10 pr-10 py-3 bg-white text-black placeholder-gray-400 border border-pink-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm sm:text-base transition-colors"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-pink-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500 text-center" role="alert">{error}</p>}

        <div className="flex items-center justify-between mt-1 sm:mt-2">
          <div className="text-xs sm:text-sm">
            <a href="#" className="font-medium text-pink-500 hover:text-pink-400 transition-colors" onClick={(e) => {e.preventDefault(); alert("Password recovery isn't implemented yet, my love. Try to remember or contact your sweetheart for help! ❤️");}}>
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-transform transform hover:scale-105"
        >
          Log In
        </button>
      </form>
      <p className="mt-6 sm:mt-8 text-center text-xs text-gray-400">
        This is our private space. Your login keeps our memories safe.
      </p>
    </div>
  );
};

export default LoginForm;
