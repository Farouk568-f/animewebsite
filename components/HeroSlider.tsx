<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Media } from '../types.ts';
import { ChevronLeftIcon, ChevronRightIcon } from '../constants.tsx';
import Button from './Button.tsx';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
=======
// src/components/HeroSlider.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Media } from '../types';
import { PlayIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../constants';
import Button from './Button.tsx';
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a

interface HeroSliderProps {
    movies: Media[];
    isLoading: boolean;
    onCardClick: (media: Media) => void;
}

const sliderVariants = {
<<<<<<< HEAD
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.2
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8
  }),
=======
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
};

const HeroSlider: React.FC<HeroSliderProps> = ({ movies, isLoading, onCardClick }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (movies.length === 0) return;
    setPage([(page + newDirection + movies.length) % movies.length, newDirection]);
  };

  useEffect(() => {
    if (movies.length > 0) {
<<<<<<< HEAD
      const timer = setTimeout(() => paginate(1), 6000);
=======
      const timer = setTimeout(() => paginate(1), 5000);
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
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
<<<<<<< HEAD
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeMovie.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background-color)] via-[color:var(--background-color)]/70 to-transparent/50"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto max-w-7xl h-full flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-8 text-white">
        <motion.div 
            key={activeMovie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight font-heading [text-shadow:0_4px_15px_rgba(0,0,0,0.5)]">{activeMovie.title}</h1>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
=======
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
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
              {activeMovie.genres.slice(0, 4).map(genre => (
                <span key={genre.id} className="text-sm font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-full">{genre.name}</span>
              ))}
            </div>
<<<<<<< HEAD
            <p className="max-w-xl text-slate-300 drop-shadow-lg text-lg leading-relaxed hidden md:block line-clamp-3 [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">
=======
            <p className="max-w-xl text-slate-300 drop-shadow-lg text-lg leading-relaxed hidden md:block line-clamp-3">
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
              {activeMovie.overview}
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" onClick={() => onCardClick(activeMovie)}>
<<<<<<< HEAD
                <PlayCircleIcon className="w-7 h-7 mr-2" />
=======
                <PlayIcon className="w-6 h-6 mr-2" />
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
                View Details
              </Button>
            </div>
          </motion.div>
      </div>

      <div className="absolute z-20 bottom-8 right-8 flex items-center gap-3">
<<<<<<< HEAD
        <button onClick={() => paginate(-1)} className="w-14 h-14 rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors text-white"><ChevronLeftIcon className="w-7 h-7 mx-auto" /></button>
        <button onClick={() => paginate(1)} className="w-14 h-14 rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors text-white"><ChevronRightIcon className="w-7 h-7 mx-auto" /></button>
=======
        <button onClick={() => paginate(-1)} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"><ChevronLeftIcon className="w-7 h-7 mx-auto" /></button>
        <button onClick={() => paginate(1)} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"><ChevronRightIcon className="w-7 h-7 mx-auto" /></button>
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default HeroSlider;
=======
export default HeroSlider;
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
