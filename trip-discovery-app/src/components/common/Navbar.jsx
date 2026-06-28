import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Memoized functions
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  // Nav Icons - Smaller
  const icons = useMemo(() => ({
    Home: ({ active }) => (
      <svg className={`w-3.5 h-3.5 ${active ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    Compass: ({ active }) => (
      <svg className={`w-3.5 h-3.5 ${active ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    Heart: ({ active }) => (
      <svg className={`w-3.5 h-3.5 ${active ? 'text-rose-500 fill-rose-500' : 'text-slate-400 group-hover:text-rose-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    User: ({ active }) => (
      <svg className={`w-3.5 h-3.5 ${active ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  }), []);

  const navLinks = useMemo(() => [
    { path: '/', label: 'Home', icon: icons.Home },
    { path: '/trips', label: 'Explore', icon: icons.Compass },
    { path: '/wishlist', label: 'Wishlist', icon: icons.Heart },
    { path: '/profile', label: 'Profile', icon: icons.User },
  ], [icons]);

  return (
    <>
      <nav 
        className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all duration-300"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            
            {/* Logo - Smaller */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-1"
              aria-label="BuddyInHills Home"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105">
                <svg className="w-4 h-4 md:w-4.5 md:h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  <path d="M12 22V12" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm md:text-base font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  BuddyInHills
                </span>
                <span className="block text-[7px] md:text-[8px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-[0.2em] -mt-0.5">
                  ✦ Trek Discovery
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links - Smaller */}
            <div className="hidden md:flex items-center gap-0.5 bg-slate-100/50 dark:bg-slate-800/30 p-0.5 rounded-xl border border-slate-200/20 dark:border-slate-700/30">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isActive(path)
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                  aria-current={isActive(path) ? 'page' : undefined}
                >
                  <Icon active={isActive(path)} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Right Actions - Smaller */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Explore CTA - Smaller */}
              <Link
                to="/trips"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-[10px] md:text-xs font-semibold rounded-lg shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                <span>Explore</span>
                <span className="text-sm">→</span>
              </Link>

              {/* Mobile Menu Button - Smaller */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Cleaner */}
      <div
        className={`md:hidden fixed inset-x-0 top-[56px] md:top-[64px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-2xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        role="menu"
        aria-label="Mobile navigation"
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={toggleMenu}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isActive(path)
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
              role="menuitem"
              aria-current={isActive(path) ? 'page' : undefined}
            >
              <Icon active={isActive(path)} />
              <span>{label}</span>
            </Link>
          ))}
          
          {/* Mobile Explore Button - Smaller */}
          <Link
            to="/trips"
            onClick={toggleMenu}
            className="flex items-center justify-center gap-2 mt-3 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/30 transition-all"
          >
            <span>Start Exploring</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(Navbar);