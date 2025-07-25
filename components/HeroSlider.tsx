// src/components/HeroSlider.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Media } from '../types';
import { PlayIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../constants';
import Button from './Button.tsx';

interface HeroSliderProps {
    movies: Media[];
    isLoading: boolean;
    onCardClick: (media: Media) => void;
}

const sliderVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
};

const HeroSlider: React.FC<HeroSliderProps> = ({ movies, isLoading, onCardClick }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (movies.length === 0) return;
    setPage([(page + newDirection + movies.length) % movies.length, newDirection]);
  };

  useEffect(() => {
    if (movies.length > 0) {
      const timer = setTimeout(() => paginate(1), 5000);
      return () => clearTimeout(timer);
    }
  }, [page, movies]);

  if (isLoading || movies.length === 0) {
      return (
          <section id="hero" className="relative h-[85vh] min-h-[700px] flex items-center justify-center bg-slate-900">
            <div className="w-16 h-16 border-4 border-[color:var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          </section>
      );
  }

  const movieIndex = page % movies.length;
  const activeMovie = movies[movieIndex];
  
  return (
    <section id="hero" className="relative h-[85vh] min-h-[700px] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeMovie.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-slate-950 via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto max-w-7xl h-full flex flex-col justify-end pb-24 px-4 text-white">
        <motion.div 
            key={activeMovie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">{activeMovie.title}</h1>
          <div className="flex items-center gap-4 mb-2 flex-wrap">
              {activeMovie.genres.slice(0, 4).map(genre => (
                <span key={genre.id} className="text-sm font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-full">{genre.name}</span>
              ))}
            </div>
            <p className="max-w-xl text-slate-300 drop-shadow-lg text-lg leading-relaxed hidden md:block line-clamp-3">
              {activeMovie.overview}
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" onClick={() => onCardClick(activeMovie)}>
                <PlayIcon className="w-6 h-6 mr-2" />
                View Details
              </Button>
            </div>
          </motion.div>
      </div>

      <div className="absolute z-20 bottom-8 right-8 flex items-center gap-3">
        <button onClick={() => paginate(-1)} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"><ChevronLeftIcon className="w-7 h-7 mx-auto" /></button>
        <button onClick={() => paginate(1)} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"><ChevronRightIcon className="w-7 h-7 mx-auto" /></button>
      </div>
    </section>
  );
};

export default HeroSlider;