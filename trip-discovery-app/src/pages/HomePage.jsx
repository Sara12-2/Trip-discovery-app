import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/axios';
import TripCard from '../components/home/TripCard';
import SearchBar from '../components/filters/SearchBar';
import CategoryFilter from '../components/filters/CategoryFilter';
import Loader from '../components/common/Loader';
import ErrorFallback from '../components/common/ErrorFallback';

// Hero backgrounds
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    title: 'Beach Paradise',
    subtitle: 'Tropical Getaways',
    tag: 'Popular',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80',
    title: 'Mountain Adventures',
    subtitle: 'Explore the Peaks',
    tag: 'Adventure',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    url: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80',
    title: 'City Escapes',
    subtitle: 'Urban Exploration',
    tag: 'Trending',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80',
    title: 'Nature Retreats',
    subtitle: 'Serene Getaways',
    tag: 'Relaxing',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=80',
    title: 'Luxury Travel',
    subtitle: 'Premium Experiences',
    tag: 'Luxury',
    gradient: 'from-rose-400 to-red-500'
  }
];

const HomePage = () => {
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch trips
  const { data: allTrips, loading, error } = useFetch(
    () => api.getAllTrips(100),
    []
  );

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await api.getCategories();
        let categoryNames = result;
        if (result && result.length > 0 && typeof result[0] === 'object') {
          categoryNames = result.map(cat => cat.slug || cat.name || String(cat));
        }
        setCategories(categoryNames);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter trips
  useEffect(() => {
    if (!allTrips?.products) {
      setFilteredTrips([]);
      return;
    }

    let filtered = allTrips.products;

    if (selectedCategory) {
      filtered = filtered.filter(trip => trip.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(trip =>
        trip.title.toLowerCase().includes(query) ||
        trip.description.toLowerCase().includes(query) ||
        trip.category.toLowerCase().includes(query)
      );
    }

    setFilteredTrips(filtered);
  }, [allTrips, selectedCategory, searchQuery]);

  // Scroll to top
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleSearch = useCallback((query) => setSearchQuery(query), []);
  const handleRetry = useCallback(() => window.location.reload(), []);
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
  }, []);

  const currentImage = heroImages[currentImageIndex];

  // Loading & Error states
  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} onRetry={handleRetry} />;

  // Icons
  const ArrowUpIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* ===== HERO SECTION - IMPROVED ===== */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        {/* Background */}
        <div 
          className={`absolute inset-0 transition-transform duration-[8000ms] ease-in-out ${
            isTransitioning ? 'scale-110' : 'scale-100'
          }`}
          style={{
            backgroundImage: `url(${currentImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Soft Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
            <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${currentImage.gradient} opacity-10 blur-3xl`} />
          </div>

          {/* Subtle Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/5 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${10 + Math.random() * 10}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full text-white/90 text-xs font-medium mb-4 animate-fadeInUp">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              <span>Featured</span>
              <span className="w-px h-3 bg-white/30" />
              <span className={`bg-gradient-to-r ${currentImage.gradient} bg-clip-text text-transparent font-semibold`}>
                {currentImage.tag}
              </span>
            </div>

            {/* Title - Smaller & Elegant */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-[1.1] animate-fadeInUp">
              {currentImage.title}
            </h1>

            {/* Subtitle - Delicate */}
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r ${currentImage.gradient} bg-clip-text text-transparent mb-4 animate-fadeInUp`}>
              {currentImage.subtitle}
            </h2>

            {/* Description - Shorter */}
            <p className="text-white/70 text-base md:text-lg max-w-xl mb-6 leading-relaxed animate-fadeInUp">
              Discover unforgettable experiences with our curated travel packages.
            </p>

            {/* CTA Buttons - Smaller */}
            <div className="flex flex-wrap gap-3 animate-fadeInUp">
              <Link
                to="/trips"
                className="group px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-sm rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>Explore Trips</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm rounded-xl font-medium border border-white/20 transition-all duration-300 hover:scale-105">
                View All
              </button>
            </div>

            {/* Stats - Smaller */}
            <div className="grid grid-cols-3 gap-3 mt-6 max-w-md animate-fadeInUp">
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-2xl font-bold text-white">{allTrips?.products?.length || 0}+</div>
                <div className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors">Destinations</div>
              </div>
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors">Avg Rating</div>
              </div>
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicators - Smaller */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setTimeout(() => setIsTransitioning(false), 100);
                }, 500);
              }}
              className={`transition-all duration-500 rounded-full ${
                currentImageIndex === index
                  ? 'w-8 h-1.5 bg-white shadow-lg shadow-white/30'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60 hover:scale-125'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-10 hidden md:block">
          <div className="flex flex-col items-center gap-1.5 text-white/30">
            <span className="text-[8px] uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-4 h-7 border border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/30 rounded-full mt-1.5 animate-scroll" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 py-6 -mt-6 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 transition-colors duration-300">
          
          {/* ===== SEARCH BAR - CENTERED ===== */}
          <div className="flex justify-center mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* ===== CATEGORY FILTER - CENTERED ===== */}
          <div className="flex justify-center mb-6">
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {filteredTrips.length}
              </span>
              {filteredTrips.length === 1 ? 'trip' : 'trips'} found
            </div>
            {(selectedCategory || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Trip Grid */}
          {filteredTrips.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No trips found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search or filters to find more trips'
                  : 'No trips available at the moment.'}
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl transition-all text-sm font-medium shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-110 active:scale-95 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default HomePage;