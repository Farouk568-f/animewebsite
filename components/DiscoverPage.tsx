
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
  if (isLoading || !data) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto border-[color:var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen text-slate-200 pt-32 pb-16 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl sm:text-5xl font-extrabold font-heading bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Discover
        </motion.h1>
        <motion.p 
          className="text-lg text-slate-400 max-w-3xl mb-12 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
            Explore curated collections of top-tier movies and TV shows. From weekly top charts to all-time classics, find your next favorite here.
        </motion.p>
        
        <motion.div 
          className="space-y-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <RankedMovieCarousel 
            id="top-10-week"
            title="Top 10 TV Shows This Week"
            movies={data.top10Week}
            onCardClick={onCardClick}
          />

          <MovieCarousel 
            id="all-time-grossing"
            title="All-Time Box Office Hits"
            movies={data.allTimeGrossing}
            onCardClick={onCardClick}
          />
          
          <MovieCarousel 
            id="popular-anime"
            title="Popular Anime Series"
            movies={data.popularAnime}
            onCardClick={onCardClick}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DiscoverPage;
