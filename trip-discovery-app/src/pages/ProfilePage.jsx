import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        const wishlist = JSON.parse(saved);
        setWishlistCount(wishlist.length);
      } catch {
        setWishlistCount(0);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'wishlist') {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
          try {
            const wishlist = JSON.parse(saved);
            setWishlistCount(wishlist.length);
          } catch {
            setWishlistCount(0);
          }
        } else {
          setWishlistCount(0);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden transition-colors duration-300">
          
          {/* Cover Image - Simplified */}
          <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600">
            {/* Decorative dots - using CSS instead of SVG */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-12 left-12 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute top-24 left-24 w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-4 right-16 w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="absolute bottom-12 right-12 w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            <button className="absolute top-3 right-3 px-3 py-1.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs font-medium rounded-lg border border-white/20 transition-all">
              Edit Profile
            </button>
          </div>

          {/* Avatar & Info */}
          <div className="relative px-6 pb-6">
            <div className="relative -mt-12 mb-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/25 border-4 border-white dark:border-slate-900">
                JD
              </div>
              <div className="absolute bottom-1 right-1/3 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                John Doe
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                john.doe@example.com
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-400 dark:text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>New York, USA</span>
                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Joined Jan 2024</span>
              </div>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  12
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Trips Taken</div>
              </div>
              
              <Link 
                to="/wishlist"
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group cursor-pointer"
              >
                <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                  {wishlistCount}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Wishlist</div>
              </Link>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-400 transition-colors">
                    4.8
                  </span>
                  <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Avg Rating</div>
              </div>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>

            {/* Bio */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                About Me
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                Travel enthusiast exploring the world one trip at a time. 
                Passionate about discovering hidden gems and creating unforgettable memories.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/trips"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl font-medium text-sm transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Trips
              </Link>
              
              <Link
                to="/wishlist"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                View Wishlist
              </Link>
            </div>

            <button className="mt-3 w-full px-6 py-3 text-sm text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors font-medium">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;