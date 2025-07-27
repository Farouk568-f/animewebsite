import React from 'react';
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
    <div className="min-h-screen text-slate-200 pt-32 pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-12">
          Discover
        </h1>
        
        <div className="space-y-16">
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
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
