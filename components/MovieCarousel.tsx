// src/components/MovieCarousel.tsx

import React from 'react';
import { Media } from '../types';
import MovieCard from './MovieCard';

interface MovieCarouselProps {
  id: string;
  title: string;
  movies: Media[];
  onCardClick: (media: Media) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ id, title, movies, onCardClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section id={id} className="section" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-6">{title}</h2>
        <div className="movie-carousel flex items-start gap-4 md:gap-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto">
          {movies.map(movie => (
            <MovieCard key={`${movie.id}-${movie.media_type}`} movie={movie} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;