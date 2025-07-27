// src/components/MovieCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Media } from '../types';
import { StarIcon } from '../constants';

interface MovieCardProps {
  movie: Media;
  onCardClick: (media: Media) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onCardClick }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCardClick(movie);
  };

  return (
    <motion.a 
      href={`/#/${movie.media_type}/${movie.id}`}
      onClick={handleCardClick}
      className="group relative block flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img 
        src={movie.poster_path} 
        alt={movie.title} 
        className="w-full h-full object-cover aspect-[2/3] bg-slate-800"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white w-full">
        <h3 className="font-bold text-lg line-clamp-2">{movie.title}</h3>
        <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <StarIcon className="w-4 h-4 text-yellow-400" filled />
          <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </motion.a>
  );
};

export default MovieCard;