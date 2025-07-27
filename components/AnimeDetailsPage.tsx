// src/components/AnimeDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMediaDetails, getTvSeasonDetails } from '../services/animeService';
import { Media, Episode } from '../types';
import AnimeDetailsPageSkeleton from './AnimeDetailsPageSkeleton';
import Button from './Button';
import { StarIcon, CalendarDaysIcon, PlayCircleIcon, ChevronLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const imageBaseUrl = 'https://image.tmdb.org/t/p/';

// Framer Motion Variants for staggered animations
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AnimeDetailsPageProps {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  onPlay: (media: Media, episode?: Episode) => void;
  onCloseVideoPlayer?: () => void; // دالة اختيارية لإغلاق المشغل
}

const AnimeDetailsPage: React.FC<AnimeDetailsPageProps> = ({ mediaId, mediaType, onPlay, onCloseVideoPlayer }) => {
  const [media, setMedia] = useState<Media | null>(null);
  const [episodesBySeason, setEpisodesBySeason] = useState<Record<number, Episode[]>>({});
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      window.scrollTo(0, 0);
      setMedia(null); // Prevents flash of old content
      setIsLoading(true);
      setError(null);
      try {
        const details = await getMediaDetails(mediaId, mediaType);
        setMedia(details);
        if (details.media_type === 'tv' && details.seasons?.length) {
          const validSeasons = details.seasons.filter(s => s.season_number > 0 && s.episode_count > 0);
          if (validSeasons.length > 0) {
            const initialSeason = validSeasons.find(s => s.season_number === 1) || validSeasons[0];
            setActiveSeason(initialSeason.season_number);
            fetchEpisodes(details.id, initialSeason.season_number);
          }
        }
      } catch (err) {
        setError("Could not load details. The item might not exist or there was a network issue.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [mediaId, mediaType]);

  const fetchEpisodes = async (tvId: number, seasonNumber: number) => {
    if (episodesBySeason[seasonNumber]) return;
    try {
      const episodes = await getTvSeasonDetails(tvId, seasonNumber);
      setEpisodesBySeason(prev => ({ ...prev, [seasonNumber]: episodes }));
    } catch (error) {
      console.error(`Failed to fetch episodes for season ${seasonNumber}`, error);
    }
  };

  const handleSeasonChange = (seasonNumber: number) => {
    setActiveSeason(seasonNumber);
    if (media?.id) {
      fetchEpisodes(media.id, seasonNumber);
    }
  };

  const handlePlayClick = (episode?: Episode) => {
    if (media) onPlay(media, episode);
  };
  
  const handleGoBack = () => {
    if (typeof onCloseVideoPlayer === 'function') {
      onCloseVideoPlayer();
      setTimeout(() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.hash = '#';
        }
      }, 100); // أعطِ فرصة لإغلاق المشغل أولاً
    } else {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '#';
      }
    }
  };

  if (isLoading) {
    return <AnimeDetailsPageSkeleton />;
  }

  if (error || !media) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-950">
        <ExclamationTriangleIcon className="w-20 h-20 text-red-500/50 mb-4" />
        <h1 className="text-3xl font-bold text-red-400 mb-2">An Error Occurred</h1>
        <p className="text-slate-400 text-lg mb-8 max-w-md">{error || "The requested media could not be found."}</p>
        <button onClick={handleGoBack} className="flex items-center gap-2 px-6 py-3 bg-[color:var(--color-primary-dark)] rounded-full text-white font-bold hover:bg-[color:var(--color-primary)] transition-colors">
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
    );
  }

  const validSeasons = media.seasons?.filter(s => s.season_number > 0 && s.episode_count > 0) || [];
  const fullBackdropPath = media.backdrop_path ? `${imageBaseUrl}original${media.backdrop_path}` : '';
  const fullPosterPath = media.poster_path ? `${imageBaseUrl}w780${media.poster_path}` : '';

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Backdrop with a more dramatic gradient */}
      <div className="fixed top-0 left-0 w-full h-[75vh] -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${fullBackdropPath})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950" />
      </div>

      {/* Main Content with Staggered Animations */}
      <motion.div variants={pageVariants} initial="hidden" animate="visible" className="relative z-10">
        <button
          onClick={handleGoBack}
          aria-label="Go back"
          className="fixed top-6 left-6 z-[9999] flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full text-slate-200 hover:bg-black/90 transition-all cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            
            <motion.div variants={itemVariants} className="md:col-span-1">
              <img
                src={fullPosterPath}
                alt={media.title}
                className="w-full rounded-2xl shadow-2xl shadow-black/60 aspect-[2/3] object-cover bg-slate-800 ring-2 ring-white/10 transition-all duration-300 hover:shadow-cyan-400/20 hover:ring-white/30"
              />
            </motion.div>

            <div className="md:col-span-2 lg:col-span-3 flex flex-col pt-4">
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[color:var(--color-primary)] via-white to-slate-300 bg-clip-text text-transparent mb-4 leading-tight">
                {media.title}
              </motion.h1>

              <motion.div variants={itemVariants} className="flex items-center gap-x-4 gap-y-2 text-slate-300 font-medium my-4 flex-wrap">
                <div className="flex items-center gap-1.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-3 py-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span>{media.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-3 py-1">
                  <CalendarDaysIcon className="w-5 h-5 text-slate-400" />
                  <span>{media.release_date?.substring(0, 4)}</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-wider bg-[color:var(--color-primary-dark)]/50 border border-[color:var(--color-primary-dark)]/60 px-3 py-1.5 rounded-full">
                  {media.media_type}
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-6">
                {media.genres.map(genre => (
                  <span key={genre.id} className="text-xs font-semibold bg-slate-800 hover:bg-[color:var(--color-primary-dark)]/20 transition-colors border border-slate-700 text-slate-300 px-3 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </motion.div>

              <motion.p variants={itemVariants} className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                {media.overview}
              </motion.p>
              
              {media.media_type === 'movie' && (
                <motion.div variants={itemVariants} className="mt-auto">
                  <Button
                    size="lg"
                    onClick={() => handlePlayClick()}
                    className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] text-white shadow-lg hover:shadow-[color:var(--color-primary)]/40 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <PlayCircleIcon className="w-7 h-7 mr-2" />
                    Play
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {media.media_type === 'tv' && validSeasons.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} className="mt-16 md:mt-24">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-slate-400 bg-clip-text text-transparent mb-6">
                Episodes
              </h2>
              <div className="flex space-x-2 md:space-x-4 border-b border-slate-800 mb-6 overflow-x-auto pb-1">
                {validSeasons.map(season => (
                  <button
                    key={season.id}
                    onClick={() => handleSeasonChange(season.season_number)}
                    className={`relative px-3 md:px-4 py-3 font-semibold transition-colors focus:outline-none whitespace-nowrap ${activeSeason === season.season_number ? 'text-cyan-300' : 'text-slate-400 hover:text-white'}`}
                  >
                    {season.name}
                    {activeSeason === season.season_number && (
                      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-[color:var(--color-primary)] rounded-full" layoutId="underline" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={activeSeason}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {(episodesBySeason[activeSeason] || []).map(ep => {
                    const episodeStillPath = ep.still_path ? `${imageBaseUrl}w500${ep.still_path}` : fullBackdropPath;
                    return (
                      <li key={ep.id} onClick={() => handlePlayClick(ep)} className="group bg-slate-900/70 border border-slate-800 rounded-2xl p-3 cursor-pointer transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800/80 hover:scale-[1.02] transform">
                        <div className="flex items-center gap-4 md:gap-5">
                          <div className="relative w-32 md:w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                            <img src={episodeStillPath} alt={ep.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center">
                              <PlayCircleIcon className="w-12 h-12 text-white/60 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                            </div>
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="font-bold text-slate-200 truncate">{`E${ep.episode_number} - ${ep.name}`}</h3>
                            <p className="text-sm text-slate-400 mt-1.5 line-clamp-2">{ep.overview || "No overview available for this episode."}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AnimeDetailsPage;