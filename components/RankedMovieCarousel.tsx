
import React from 'react';
import { motion } from 'framer-motion';
import { Media } from '../types.ts';
import RankedMovieCard from './RankedMovieCard.tsx';

interface RankedMovieCarouselProps {
  id: string;
  title: string;
  movies: Media[];
  onCardClick: (media: Media) => void;
}

const RankedMovieCarousel: React.FC<RankedMovieCarouselProps> = ({ id, title, movies, onCardClick }) => {
  if (!movies || movies.length === 0) return null;

  console.log(`RankedMovieCarousel ${id}:`, { title, moviesCount: movies.length });

  return (
    <motion.section 
      id={id} 
      className="section !py-0 relative z-10" 
      data-aos="fade-up"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="carousel-title-container relative z-10">
          <h2 className="carousel-title text-white font-bold text-2xl relative z-10">{title}</h2>
        </div>
        <div className="movie-carousel flex items-start gap-12 pb-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto relative z-10">
          {movies.map((movie, index) => (
            <RankedMovieCard 
              key={`${movie.id}-${movie.media_type}`} 
              movie={movie} 
              rank={index + 1}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RankedMovieCarousel;
