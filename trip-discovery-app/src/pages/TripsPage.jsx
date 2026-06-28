import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/axios';
import TripCard from '../components/home/TripCard';
import Loader from '../components/common/Loader';
import ErrorFallback from '../components/common/ErrorFallback';

const TripsPage = () => {
  const { data: allTrips, loading, error } = useFetch(
    () => api.getAllTrips(100),
    []
  );

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Explore All Trips
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allTrips?.products?.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;  // ← ADD THIS!