import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner with gradient */}
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 dark:border-slate-700"></div>
          <div className="absolute inset-0 animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 dark:border-indigo-400"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-600/20 blur-xl"></div>
        </div>
        
        {/* Loading text with dots animation */}
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Loading trips
          </span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </span>
        </div>
        
        {/* Subtle hint */}
        <p className="text-xs text-slate-400 dark:text-slate-500 animate-pulse">
          Discovering amazing destinations...
        </p>
      </div>
    </div>
  );
};

export default Loader;