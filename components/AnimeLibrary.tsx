import React, { useEffect, useState } from 'react';
import { Media } from '../types.ts';
import MovieCard from './MovieCard.tsx';
import { MagnifyingGlassIcon, FilmIcon, TvIcon, CalendarDaysIcon, BarsArrowDownIcon, Squares2X2Icon } from '@heroicons/react/24/solid';

const years = Array.from({ length: 2024 - 1980 + 1 }, (_, i) => 2024 - i);
const types = [
  { label: 'All', value: '', icon: <Squares2X2Icon className="w-5 h-5" /> },
  { label: 'Movies', value: 'movie', icon: <FilmIcon className="w-5 h-5" /> },
  { label: 'TV Shows', value: 'tv', icon: <TvIcon className="w-5 h-5" /> },
];
const sortOptions = [
    { label: 'Newest First', value: 'desc' },
    { label: 'Oldest First', value: 'asc' },
];

const AnimeLibrary: React.FC = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    import('../services/animeService').then(({ getHomePageData }) => {
      getHomePageData().then(data => {
        const uniqueMedia = new Map();
        [
          ...data.trending,
          ...data.popularMovies,
          ...data.topRatedTv,
          ...data.upcomingMovies,
        ].forEach(item => {
            if (!uniqueMedia.has(item.id)) {
                uniqueMedia.set(item.id, item);
            }
        });
        setMediaList(Array.from(uniqueMedia.values()));
      });
    });
  }, []);

  const filteredAndSorted = mediaList
    .filter(m => (selectedType ? m.media_type === selectedType : true))
    .filter(m => (selectedYear ? (m.release_date && m.release_date.startsWith(selectedYear)) : true))
    .sort((a, b) => {
      if (!a.release_date || !b.release_date) return 0;
      if (sortOrder === 'desc') return b.release_date.localeCompare(a.release_date);
      return a.release_date.localeCompare(b.release_date);
    });

  return (
    <div className="min-h-screen text-slate-200 pt-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
            <MagnifyingGlassIcon className="w-10 h-10 text-[color:var(--color-primary)]" />
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Explore Library
            </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between p-4 rounded-xl bg-[color:var(--surface-color)]/60 border border-slate-800/50">
          <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-full">
            {types.map(t => (
              <button
                key={t.value}
                onClick={() => setSelectedType(t.value)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none ${selectedType === t.value ? 'bg-[color:var(--color-primary)] text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <CalendarDaysIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
              <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="bg-slate-800 text-slate-200 rounded-full pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] cursor-pointer">
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="relative">
               <BarsArrowDownIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'desc' | 'asc')} className="bg-slate-800 text-slate-200 rounded-full pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] cursor-pointer">
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="col-span-full text-center py-20 flex flex-col items-center gap-4">
            <FilmIcon className="w-24 h-24 text-slate-700" />
            <h3 className="text-2xl font-bold text-slate-400">No Results Found</h3>
            <p className="text-slate-500">Try adjusting your filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {filteredAndSorted.map(media => (
              <MovieCard key={`${media.id}-${media.media_type}`} movie={media} onCardClick={() => { window.location.hash = `#/${media.media_type}/${media.id}`; }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeLibrary;