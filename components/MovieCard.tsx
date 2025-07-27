import React from 'react';
import { motion } from 'framer-motion';
import { Media } from '../types.ts';
import { StarIcon } from '../constants.tsx';

interface MovieCardProps {
  movie: Media;
  onCardClick: (media: Media) => void;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onCardClick, className = '' }) => {
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onCardClick(movie);
  };
  
  const cardRef = React.useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.a 
      ref={cardRef}
      href={`/#/${movie.media_type}/${movie.id}`}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      className={`interactive-card-glow group relative block aspect-[2/3] rounded-xl overflow-hidden cursor-pointer ${className}`}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <img 
        src={movie.poster_path} 
        alt={movie.title} 
        className="absolute inset-0 w-full h-full object-cover bg-[color:var(--surface-color)] transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="font-bold text-lg leading-tight line-clamp-2">{movie.title}</h3>
            <div className="flex items-center gap-1.5 mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 transition-all duration-300">
              <StarIcon className="w-4 h-4 text-yellow-400" filled />
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-slate-400 font-normal ml-auto">{movie.release_date?.substring(0,4)}</span>
            </div>
        </div>
      </div>
    </motion.a>
  );
};

export default MovieCard;
