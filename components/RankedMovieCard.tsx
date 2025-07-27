import React from 'react';
import { motion } from 'framer-motion';
import { Media } from '../types.ts';

interface RankedMovieCardProps {
  movie: Media;
  rank: number;
  onCardClick: (media: Media) => void;
}

const RankedMovieCard: React.FC<RankedMovieCardProps> = ({ movie, rank, onCardClick }) => {
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onCardClick(movie);
  };
  
  return (
    <motion.a
      href={`/#/${movie.media_type}/${movie.id}`}
      onClick={handleCardClick}
      className="group relative flex-shrink-0 w-48 transition-transform duration-300 ease-in-out hover:-translate-y-2"
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute -left-8 -bottom-5 z-0">
        <span className="text-[12rem] font-black text-slate-800/50 transition-colors duration-300 group-hover:text-[color:var(--surface-color)]">
          {rank}
        </span>
      </div>
      <div className="relative z-10 aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-[color:var(--color-primary)]/20">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover bg-slate-800"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
    </motion.a>
  );
};

export default RankedMovieCard;
