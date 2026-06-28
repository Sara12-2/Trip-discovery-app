import React from 'react';

const ErrorFallback = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-10 max-w-md border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        
        {/* Icon with gradient background */}
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-full blur-2xl"></div>
          <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 rounded-full flex items-center justify-center border border-rose-200 dark:border-rose-800/30">
            <span className="text-4xl">🚀</span>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Oops! Something went wrong
        </h2>
        
        {/* Message */}
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
          {message || 'Failed to load trips. Please try again.'}
        </p>
        
        {/* Error Details (optional) */}
        {message && (
          <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-800/30">
            <p className="text-xs text-rose-600 dark:text-rose-400 font-mono break-all">
              {message}
            </p>
          </div>
        )}
        
        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl transition-all duration-300 font-medium text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Try Again</span>
        </button>
        
        {/* Help Text */}
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
          If the problem persists, please check your internet connection
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;