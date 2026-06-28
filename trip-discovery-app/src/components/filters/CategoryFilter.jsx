import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  // Loading state
  if (!categories) {
    return (
      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
        <div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm">Loading categories...</span>
      </div>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <div className="text-sm text-slate-400 dark:text-slate-500 italic">
        No categories available
      </div>
    );
  }

  // Process categories
  const processedCategories = categories.map((category) => {
    if (typeof category === 'string') return category;
    if (typeof category === 'object' && category !== null) {
      return category.slug || category.name || String(category);
    }
    return String(category);
  });

  const uniqueCategories = [...new Set(processedCategories)];

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Categories
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {uniqueCategories.length}
          </span>
        </div>
        
        {selectedCategory && (
          <button
            onClick={() => onSelect('')}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {/* All Button */}
        <button
          onClick={() => onSelect('')}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
            ${!selectedCategory 
              ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 scale-105' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            All
          </span>
        </button>

        {/* Category Buttons */}
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 scale-105' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            {category.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Selected Indicator */}
      {selectedCategory && (
        <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
          Showing trips in{' '}
          <span className="font-medium text-indigo-600 dark:text-indigo-400 capitalize">
            {selectedCategory.replace(/-/g, ' ')}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;