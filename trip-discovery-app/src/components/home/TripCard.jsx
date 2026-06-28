import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Check if trip is already in wishlist
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      const wishlist = JSON.parse(saved);
      setIsWishlisted(wishlist.some(item => item.id === trip.id));
    }
  }, [trip.id]);

  const handleCardClick = () => {
    navigate(`/trip/${trip.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    
    // Get current wishlist
    const saved = localStorage.getItem('wishlist');
    let wishlist = saved ? JSON.parse(saved) : [];
    
    if (isWishlisted) {
      // Remove from wishlist
      wishlist = wishlist.filter(item => item.id !== trip.id);
    } else {
      // Add to wishlist
      wishlist.push(trip);
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(trip.price);

  // Star icons...
  // (keep your existing star rendering code)

  return (
    <div 
      className="group bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-2xl dark:shadow-slate-900/30 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/5 border border-slate-200/50 dark:border-slate-800/50"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer bg-[length:200%_100%]" />
        )}
        
        <img 
          src={trip.thumbnail} 
          alt={trip.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 left-3 p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 group-hover:text-rose-400'}`} fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg">
          <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {trip.rating.toFixed(1)}
          </span>
        </div>

        {/* Availability Badge */}
        <div className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm ${
          trip.stock > 0 
            ? 'bg-emerald-500/90 text-white' 
            : 'bg-rose-500/90 text-white'
        }`}>
          {trip.stock > 0 ? '✓ Available' : 'Sold Out'}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {trip.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="capitalize">{trip.category}</span>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              {formattedPrice}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">/ person</span>
          </div>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {trip.description}
        </p>
        
        <button 
          className="group/btn mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white py-3 rounded-xl transition-all duration-300 font-medium text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/trip/${trip.id}`);
          }}
        >
          <span>Explore Trip</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TripCard;