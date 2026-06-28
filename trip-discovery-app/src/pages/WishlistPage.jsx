import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TripCard from '../components/home/TripCard';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        try {
          setWishlist(JSON.parse(saved));
        } catch {
          setWishlist([]);
        }
      }
    };
    loadWishlist();

    // Listen for storage changes (if wishlist updated in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'wishlist') {
        loadWishlist();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-12 text-center max-w-md border border-slate-200/50 dark:border-slate-800/50">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Wishlist Yet
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Start exploring and save your favorite trips by clicking the heart icon ❤️
          </p>
          <Link
            to="/trips"
            className="inline-flex px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-medium hover:scale-105 transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Explore Trips
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {wishlist.length} {wishlist.length === 1 ? 'trip' : 'trips'} saved
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('Remove all trips from wishlist?')) {
                localStorage.removeItem('wishlist');
                setWishlist([]);
              }
            }}
            className="text-sm text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;