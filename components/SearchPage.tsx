import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { searchMedia } from '../services/animeService.ts';
import { Media, Profile } from '../types.ts';
import { StarIcon, MagnifyingGlassIcon } from '../constants.tsx';

interface SearchPageProps {
  initialQuery?: string;
  onCardClick: (media: Media) => void;
  activeProfile?: Profile | null;
}

const SearchResultCard: React.FC<{ media: Media; onCardClick: (media: Media) => void; }> = ({ media, onCardClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={() => onCardClick(media)}
            onMouseMove={handleMouseMove}
            className="interactive-card-glow group bg-[color:var(--surface-color)] rounded-xl overflow-hidden cursor-pointer flex gap-4"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="w-24 md:w-32 flex-shrink-0">
                <img src={media.poster_path || 'https://via.placeholder.com/500x750?text=No+Image'} alt={media.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col justify-center">
                <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 transition-colors group-hover:text-[color:var(--color-primary)]">{media.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>{media.release_date?.substring(0,4)}</span>
                    <span className="font-bold uppercase tracking-wider border border-slate-700 px-2 py-0.5 rounded-full text-xs">
                      {media.media_type}
                    </span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400" filled />
                      <span className="font-semibold text-slate-200">{media.vote_average.toFixed(1)}</span>
                    </div>
                </div>
                 <p className="text-slate-400 text-sm mt-3 line-clamp-2 hidden sm:block">
                    {media.overview}
                </p>
            </div>
        </motion.div>
    );
};

const SearchPage: React.FC<SearchPageProps> = ({ initialQuery = '', onCardClick, activeProfile }) => {
  const [searchResults, setSearchResults] = useState<Media[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [initialQuery, activeProfile]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    setError(null);
    try {
      let results = await searchMedia(query);
      if (activeProfile?.kids) {
        results = results.filter(m =>
          m.genres && m.genres.some(g =>
            ['Animation', 'Family', 'Kids', 'Children'].includes(g.name)
          )
        );
      }
      setSearchResults(results);
    } catch (err) {
      setError("Failed to perform search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {isSearching ? (
          <div className="text-center py-20"><div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto border-[color:var(--color-primary)]"></div></div>
        ) : error ? (
          <div className="text-center py-20"><p className="text-red-400">{error}</p></div>
        ) : searchResults.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold font-heading text-white mb-8">Search Results for "<span className="text-[color:var(--color-primary)]">{initialQuery}</span>"</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {searchResults.map((media) => (
                <SearchResultCard key={media.id} media={media} onCardClick={onCardClick} />
              ))}
            </div>
          </div>
        ) : initialQuery ? (
          <div className="text-center py-20 flex flex-col items-center">
             <MagnifyingGlassIcon className="w-16 h-16 text-slate-600 mb-4" />
             <h2 className="text-2xl font-bold text-white mb-2 font-heading">No results for "{initialQuery}"</h2>
             <p className="text-slate-400">Please check the spelling or try another search.</p>
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <MagnifyingGlassIcon className="w-16 h-16 text-slate-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2 font-heading">Discover Anime</h2>
            <p className="text-slate-400">Use the search bar at the top to find movies and TV shows.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;
