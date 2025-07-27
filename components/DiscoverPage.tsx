
import React from 'react';
import { motion } from 'framer-motion';
import { DiscoverPageData, Media } from '../types.ts';
import MovieCarousel from './MovieCarousel.tsx';
import RankedMovieCarousel from './RankedMovieCarousel.tsx';

interface DiscoverPageProps {
  data: DiscoverPageData | null;
  isLoading: boolean;
  onCardClick: (media: Media) => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ data, isLoading, onCardClick }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto border-[color:var(--color-primary)]"></div>
        <p className="text-slate-400 mt-4">Loading discover content...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <div className="text-slate-400">
          <h2 className="text-2xl font-bold mb-4">No Data Available</h2>
          <p>Unable to load discover content. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen text-slate-200 pt-32 pb-16"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-12">
          Discover
        </h1>
        
        <div className="space-y-16">
          {data.top10Week && data.top10Week.length > 0 && (
            <RankedMovieCarousel 
              id="top-10-week"
              title="Top 10 TV Shows This Week"
              movies={data.top10Week}
              onCardClick={onCardClick}
            />
          )}

          {data.allTimeGrossing && data.allTimeGrossing.length > 0 && (
            <MovieCarousel 
              id="all-time-grossing"
              title="All-Time Box Office Hits"
              movies={data.allTimeGrossing}
              onCardClick={onCardClick}
            />
          )}
          
          {data.popularAnime && data.popularAnime.length > 0 && (
            <MovieCarousel 
              id="popular-anime"
              title="Popular Anime Series"
              movies={data.popularAnime}
              onCardClick={onCardClick}
            />
          )}

          {(!data.top10Week || data.top10Week.length === 0) && 
           (!data.allTimeGrossing || data.allTimeGrossing.length === 0) && 
           (!data.popularAnime || data.popularAnime.length === 0) && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-400 mb-4">No Content Available</h2>
              <p className="text-slate-500">No discover content is currently available.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DiscoverPage;
