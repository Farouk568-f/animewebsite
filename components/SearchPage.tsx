// src/components/SearchPage.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { searchMedia } from '../services/animeService.ts';
import { Media, Profile } from '../types.ts';
import { StarIcon, MagnifyingGlassIcon } from '../constants.tsx';

interface SearchPageProps {
  initialQuery?: string;
  onCardClick: (media: Media) => void;
  activeProfile?: Profile | null;
}

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
  }, [initialQuery]);

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
      className="min-h-screen bg-slate-950 pt-28" // Added top padding to fix overlap
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {isSearching ? (
          <div className="text-center py-20"><div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div></div>
        ) : error ? (
          <div className="text-center py-20"><p className="text-red-400">{error}</p></div>
        ) : searchResults.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">Search Results for "<span style={{ color: 'var(--color-primary)' }}>{initialQuery}</span>"</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((media) => (
                <motion.div
                  key={media.id}
                  onClick={() => onCardClick(media)}
                  className="bg-slate-900/50 rounded-xl overflow-hidden hover:bg-slate-800/50 group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img src={media.poster_path || 'https://via.placeholder.com/500x750?text=No+Image'} alt={media.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full text-xs">
                      <StarIcon className="w-3 h-3 text-yellow-400" filled />
                      <span className="text-white font-medium">{media.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-2 line-clamp-2" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={e => e.currentTarget.style.color = ''}>{media.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{media.media_type.toUpperCase()}</span>
                      {media.release_date && <span className="text-xs text-slate-400">{media.release_date.substring(0,4)}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : initialQuery ? (
          <div className="text-center py-20 flex flex-col items-center">
             <MagnifyingGlassIcon className="w-16 h-16 text-slate-600 mb-4" />
             <h2 className="text-2xl font-bold text-white mb-2">No results for "{initialQuery}"</h2>
             <p className="text-slate-400">Please check the spelling or try another search.</p>
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <MagnifyingGlassIcon className="w-16 h-16 text-slate-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Discover Anime</h2>
            <p className="text-slate-400">Use the search bar at the top to find movies and TV shows.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;