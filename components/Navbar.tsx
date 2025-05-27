
import React, { useState, useRef, useEffect } from 'react';
import { APP_NAME, SOCIAL_LINKS, HeartIcon, MenuIcon, CloseIcon } from '../constants';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleContactDropdown = () => setIsContactDropdownOpen(!isContactDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setIsContactDropdownOpen(false);
      }
      // Cast event.target to Element to safely use closest
      const targetElement = event.target as Element;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(targetElement) && !targetElement.closest('button[aria-label="Toggle mobile menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoutAndCloseMenu = () => {
    onLogout();
    setIsMobileMenuOpen(false);
    setIsContactDropdownOpen(false);
  }

  const navLinkClasses = "text-pink-500 hover:text-pink-700 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const mobileNavLinkClasses = "block w-full text-left text-pink-500 hover:text-pink-700 px-3 py-2 rounded-md text-base font-medium transition-colors";
  const mobileButtonClass = "w-full text-left bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-3 rounded-md text-base transition-colors shadow-md hover:shadow-lg";


  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-pink-500 mr-2" />
            <span className="text-2xl sm:text-3xl font-semibold text-pink-600 font-parisienne">{APP_NAME}</span>
          </div>

          {/* Mobile menu button */}
          {isLoggedIn && (
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-pink-500 hover:text-pink-700 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <CloseIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          )}

          {/* Desktop menu */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <a href="#" className={navLinkClasses} onClick={() => {setIsMobileMenuOpen(false); setIsContactDropdownOpen(false);}}>
                Home
              </a>
              <div className="relative" ref={contactDropdownRef}>
                <button
                  onClick={toggleContactDropdown}
                  className={`${navLinkClasses} focus:outline-none`}
                >
                  Contact Me
                </button>
                {isContactDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-20">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3 text-pink-500" })}
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleLogoutAndCloseMenu}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isLoggedIn && isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40 p-4 space-y-1 sm:px-3" id="mobile-menu" ref={mobileMenuRef}>
          <a href="#" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </a>
          
          {/* Contact Me dropdown for mobile */}
          <div>
            <button
              onClick={toggleContactDropdown}
              className={`${mobileNavLinkClasses} w-full flex justify-between items-center`}
            >
              Contact Me
              <svg className={`w-4 h-4 transform transition-transform duration-200 ${isContactDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isContactDropdownOpen && (
              <div className="mt-1 space-y-1 pl-4 border-l-2 border-pink-200">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-md"
                    onClick={() => { setIsContactDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  >
                    {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3 text-pink-500" })}
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogoutAndCloseMenu}
            className={mobileButtonClass}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
