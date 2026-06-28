import React, { useState, useEffect, useRef, useCallback } from 'react';

const SearchBar = ({ 
  onSearch, 
  initialValue = '', 
  placeholder = 'Search trips...', 
  className = '' 
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);
  const inputRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  // Clear search
  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && query) {
        handleClear();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [query, handleClear]);

  // Icons with consistent colors
  const SearchIcon = () => (
    <svg className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-indigo-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFocused ? 2.5 : 2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <div className="relative">
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl transition-opacity duration-500 ${isFocused ? 'opacity-40 blur' : 'opacity-0'}`} />
        
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              w-full px-12 py-3.5 rounded-xl
              bg-white dark:bg-slate-900
              text-slate-800 dark:text-slate-200
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              border-2 transition-all duration-300
              ${isFocused 
                ? 'border-indigo-500 dark:border-indigo-400 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-400/10' 
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }
              focus:outline-none focus:ring-0
              text-base font-normal
              ${query ? 'pr-12' : 'pr-4'}
            `}
            aria-label="Search trips"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
          />

          {/* Loading Dots */}
          {query && isFocused && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse delay-150" />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse delay-300" />
            </div>
          )}

          {/* Clear Button */}
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-all duration-200 hover:scale-110 active:scale-90 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Clear search"
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>

      {/* Search Info */}
      {query && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500 animate-fadeIn">
          <span className="flex items-center gap-1.5">
            <span className="text-indigo-500">✦</span>
            Searching for: <span className="font-medium text-slate-600 dark:text-slate-300">"{query}"</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live search
          </span>
        </div>
      )}

      {/* Keyboard Shortcut */}
      {!query && !isFocused && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 pointer-events-none">
          <kbd className="px-2 py-1 text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            ⌘K
          </kbd>
          <span className="text-xs text-slate-300 dark:text-slate-600">or</span>
          <kbd className="px-2 py-1 text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            Esc
          </kbd>
        </div>
      )}

      {/* Search Tips */}
      {!query && !isFocused && (
        <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          
          <span>Try "beach", "mountain", or "city"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;