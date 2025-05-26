
import React, { useState, useRef, useEffect } from 'react';
import { APP_NAME, SOCIAL_LINKS, HeartIcon } from '../constants';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleContactDropdown = () => setIsContactDropdownOpen(!isContactDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsContactDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-pink-500 mr-2" />
            <span className="text-3xl font-semibold text-pink-600">{APP_NAME}</span>
          </div>

          {/* Conditionally render links and buttons based on login status */}
          {isLoggedIn && (
            <div className="flex items-center space-x-6">
              <a href="#" className="text-pink-500 hover:text-pink-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleContactDropdown}
                  className="text-pink-500 hover:text-pink-700 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none"
                >
                  Contact Me
                </button>
                {isContactDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3 text-pink-500" })}
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={onLogout}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Log Out
              </button>
            </div>
          )}
          {/* 
            If !isLoggedIn, the Log In button that was previously in an 'else' block 
            is now implicitly hidden because the entire containing div is not rendered.
          */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
