import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/axios';
import Loader from '../components/common/Loader';
import ErrorFallback from '../components/common/ErrorFallback';

const TripDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: trip, loading, error } = useFetch(
    () => api.getTripById(id),
    [id]
  );

  // Check if trip is already in wishlist
  useEffect(() => {
    if (trip) {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        const wishlist = JSON.parse(saved);
        setIsWishlisted(wishlist.some(item => item.id === trip.id));
      }
    }
  }, [trip]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleWishlistToggle = () => {
    if (!trip) return;
    
    const saved = localStorage.getItem('wishlist');
    let wishlist = saved ? JSON.parse(saved) : [];
    
    if (isWishlisted) {
      wishlist = wishlist.filter(item => item.id !== trip.id);
    } else {
      wishlist.push(trip);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-slate-300 dark:text-slate-600" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} onRetry={handleRetry} />;
  if (!trip) return null;

  const images = trip.images || [trip.thumbnail];
  const allImages = [trip.thumbnail, ...images.filter(img => img !== trip.thumbnail)];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl animate-fadeIn">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="group mb-6 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all trips
        </button>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden transition-colors duration-300">
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 p-2 bg-slate-50 dark:bg-slate-800/30">
            {/* Main Image */}
            <div className="lg:col-span-4 relative h-96 lg:h-[500px] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700">
              <img
                src={allImages[selectedImage]}
                alt={trip.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-medium">
                {selectedImage + 1} / {allImages.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[500px]">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    relative flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg overflow-hidden transition-all duration-300
                    ${selectedImage === index 
                      ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/25 scale-105' 
                      : 'hover:scale-105 hover:shadow-md'
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={`${trip.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-indigo-500/10"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title & Rating */}
                <div>
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                      {trip.title}
                    </h1>
                    <button
                      onClick={handleWishlistToggle}
                      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <svg className={`w-6 h-6 transition-all duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 hover:text-rose-400'}`} fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-0.5">
                      {renderStars(trip.rating)}
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({trip.reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About This Trip</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {trip.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Brand</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{trip.brand || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Stock</p>
                    <p className={`font-semibold ${trip.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {trip.stock > 0 ? `${trip.stock} available` : 'Out of stock'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Category</p>
                    <p className="font-semibold text-slate-900 dark:text-white capitalize">{trip.category}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Warranty</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{trip.warrantyInformation || 'N/A'}</p>
                  </div>
                </div>

                {/* Reviews */}
                {trip.reviews && trip.reviews.length > 0 && (
                  <div className="border-t dark:border-slate-700 pt-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {trip.reviews.slice(0, 3).map((review, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {review.reviewerName || 'Anonymous'}
                            </span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm">{review.comment}</p>
                        </div>
                      ))}
                      {trip.reviews.length > 3 && (
                        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                          View all {trip.reviews.length} reviews
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-6 shadow-lg border border-indigo-100 dark:border-slate-700">
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Price per person</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                      {formatPrice(trip.price)}
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                    <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
                      <span>Duration</span>
                      <span className="font-medium">7 Days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
                      <span>Group Size</span>
                      <span className="font-medium">15 people</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-600">
                      <span>Destination</span>
                      <span className="font-medium capitalize">{trip.category}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Rating</span>
                      <span className="font-medium">⭐ {trip.rating}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white py-3.5 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95">
                    Book Now
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Free cancellation within 24 hours
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Secure booking. Best price guarantee.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;