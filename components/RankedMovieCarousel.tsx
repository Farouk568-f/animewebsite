
import React from 'react';
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

  return (
    <section id={id} className="section !py-0" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl">
        <div className="carousel-title-container">
          <h2 className="carousel-title">{title}</h2>
        </div>
        <div className="movie-carousel flex items-start gap-12 pb-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto">
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
    </section>
  );
};

export default RankedMovieCarousel;
