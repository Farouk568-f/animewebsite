

import React from 'react';
import { Media } from '../types.ts';
import MovieCard from './MovieCard.tsx';
import { ChevronRightIcon } from '../constants.tsx';

interface MovieCarouselProps {
  id: string;
  title: string;
  movies: Media[];
  onCardClick: (media: Media) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ id, title, movies, onCardClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section id={id} className="section !py-0" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl">
        <div className="carousel-title-container">
          <h2 className="carousel-title">{title}</h2>
          {id !== 'recommendations' && (
            <a href="#/library" className="text-sm font-semibold text-slate-400 hover:text-[color:var(--color-primary)] transition-colors flex items-center gap-1 group whitespace-nowrap">
              View All
              <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
        <div className="movie-carousel flex items-start gap-4 md:gap-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto">
          {movies.map(movie => (
            <MovieCard 
              key={`${movie.id}-${movie.media_type}`} 
              movie={movie} 
              onCardClick={onCardClick}
              className="w-36 sm:w-48 md:w-56 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
