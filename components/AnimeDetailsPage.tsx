import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTvSeasonDetails } from '../services/animeService.ts';
import { Media, Episode, CastMember, Video } from '../types.ts';
import AnimeDetailsPageSkeleton from './AnimeDetailsPageSkeleton.tsx';
import MovieCarousel from './MovieCarousel.tsx';
import Button from './Button.tsx';
import { StarIcon, CalendarDaysIcon, PlayCircleIcon, ChevronLeftIcon, XMarkIcon, FilmIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

const imageBaseUrl = 'https://image.tmdb.org/t/p/';

// Framer Motion Variants
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AnimeDetailsPageProps {
  media: Media | null;
  onPlay: (media: Media, episode?: Episode) => void;
  onCloseVideoPlayer?: () => void;
}

const DetailSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <motion.div variants={itemVariants} className="mt-12 md:mt-16">
        <div className="flex items-center gap-4 mb-6">
            <div className="text-[color:var(--color-primary)]">{icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-heading">{title}</h2>
        </div>
        {children}
    </motion.div>
);

const AnimeDetailsPage: React.FC<AnimeDetailsPageProps> = ({ media, onPlay, onCloseVideoPlayer }) => {
  const [episodesBySeason, setEpisodesBySeason] = useState<Record<number, Episode[]>>({});
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [selectedTrailer, setSelectedTrailer] = useState<Video | null>(null);

  useEffect(() => {
    if (media?.media_type === 'tv' && media.seasons?.length) {
      const validSeasons = media.seasons.filter(s => s.season_number > 0 && s.episode_count > 0);
      if (validSeasons.length > 0) {
        const initialSeason = validSeasons.find(s => s.season_number === 1) || validSeasons[0];
        setActiveSeason(initialSeason.season_number);
        fetchEpisodes(media.id, initialSeason.season_number);
      }
    }
  }, [media]);

  const fetchEpisodes = async (tvId: number, seasonNumber: number) => {
    if (episodesBySeason[seasonNumber] || !tvId || !seasonNumber) return;
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
  
  const handleRecommendationClick = (rec: Media) => {
    window.location.hash = `#/${rec.media_type}/${rec.id}`;
  };

  const handleGoBack = () => {
    if (typeof onCloseVideoPlayer === 'function') {
      onCloseVideoPlayer();
    }
    setTimeout(() => {
      window.history.length > 1 ? window.history.back() : (window.location.hash = '#');
    }, 100);
  };

  if (!media) return <AnimeDetailsPageSkeleton />;

  const fullBackdropPath = media.backdrop_path ? `${imageBaseUrl}original${media.backdrop_path}` : '';
  const fullPosterPath = media.poster_path ? `${imageBaseUrl}w780${media.poster_path}` : '';
  const validSeasons = media.seasons?.filter(s => s.season_number > 0 && s.episode_count > 0) || [];
  const trailers = (media.videos?.results || []).filter(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')) || [];
  const recommendations = media.recommendations || [];
  const cast = media.credits?.cast.slice(0, 20) || [];

  return (
    <div className="min-h-screen text-white">
      {/* Background and Header */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        {fullBackdropPath && (
            <img 
                src={fullBackdropPath} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover object-center" 
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background-color)] via-[color:var(--background-color)]/70 to-transparent" />
        <button onClick={handleGoBack} aria-label="Go back" className="absolute top-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-slate-200 hover:bg-black/90 transition-all cursor-pointer">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <motion.div variants={pageVariants} initial="hidden" animate="visible" className="relative z-10 -mt-[45vh] md:-mt-[45vh]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-3">
              <img src={fullPosterPath} alt={media.title} className="w-full rounded-2xl shadow-2xl shadow-black/60 aspect-[2/3] object-cover bg-slate-800 ring-2 ring-white/10 transition-all duration-300 hover:shadow-[color:var(--color-primary)]/20 hover:ring-white/30" />
            </motion.div>

            <div className="md:col-span-8 lg:col-span-9 flex flex-col pt-4 md:pt-16">
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-black font-heading bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
                {media.title}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-slate-300 text-lg md:text-xl font-light italic -mt-2 mb-6">
                {media.tagline}
              </motion.p>

              <motion.div variants={itemVariants} className="flex items-center gap-x-6 gap-y-2 text-slate-300 font-medium my-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span>{media.vote_average.toFixed(1)} / 10</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDaysIcon className="w-5 h-5 text-slate-400" />
                  <span>{media.release_date?.substring(0, 4)}</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-wider border border-slate-700 px-3 py-1 rounded-full">
                  {media.media_type}
                </span>
              </motion.div>

              <motion.p variants={itemVariants} className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                {media.overview}
              </motion.p>
              
              {media.media_type === 'movie' && (
                <motion.div variants={itemVariants} className="mt-auto flex items-center gap-4">
                  <Button size="lg" onClick={() => handlePlayClick()}>
                    <PlayCircleIcon className="w-7 h-7 mr-2" />
                    Play Movie
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mt-8">
            {media.genres.map(genre => (
              <span key={genre.id} className="text-sm font-semibold bg-slate-800 hover:bg-slate-700/80 transition-colors border border-slate-700 text-slate-300 px-4 py-1.5 rounded-full">
                {genre.name}
              </span>
            ))}
          </motion.div>
          
          {trailers.length > 0 && (
            <DetailSection title="Trailers" icon={<VideoCameraIcon className="w-8 h-8"/>}>
              <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 movie-carousel">
                {trailers.map(trailer => (
                  <div key={trailer.id} onClick={() => setSelectedTrailer(trailer)} className="group relative flex-shrink-0 w-80 h-44 rounded-lg overflow-hidden cursor-pointer bg-slate-800 border-2 border-slate-800 hover:border-[color:var(--color-primary)]/60 transition-all duration-300">
                    <img src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`} alt={trailer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <h4 className="text-white font-semibold line-clamp-2">{trailer.name}</h4>
                    </div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <PlayCircleIcon className="w-16 h-16 text-white/70 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {cast.length > 0 && (
            <DetailSection title="Top Billed Cast" icon={<UserGroupIcon className="w-8 h-8"/>}>
              <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 cast-carousel">
                {cast.map(member => (
                  <div key={member.id} className="flex-shrink-0 w-36 text-center group">
                    <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-3 bg-slate-800 border-2 border-slate-700/50 group-hover:border-[color:var(--color-primary)]/40 transition-colors">
                      <img src={member.profile_path ? `${imageBaseUrl}w185${member.profile_path}` : `https://ui-avatars.com/api/?name=${member.name}&background=1e293b&color=94a3b8&font-size=0.33`} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-slate-200 text-sm truncate">{member.name}</h4>
                    <p className="text-slate-400 text-xs truncate">{member.character}</p>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {media.media_type === 'tv' && validSeasons.length > 0 && (
            <DetailSection title="Episodes" icon={<FilmIcon className="w-8 h-8" />}>
              <div className="flex space-x-2 md:space-x-4 border-b border-slate-800 mb-6 overflow-x-auto pb-1 movie-carousel">
                {validSeasons.map(season => (
                  <button key={season.id} onClick={() => handleSeasonChange(season.season_number)} className={`relative px-3 md:px-4 py-3 font-semibold transition-colors focus:outline-none whitespace-nowrap ${activeSeason === season.season_number ? 'text-[color:var(--color-primary)]' : 'text-slate-400 hover:text-white'}`}>
                    {season.name}
                    {activeSeason === season.season_number && (
                      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-[color:var(--color-primary)] rounded-full" layoutId="underline" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.ul key={activeSeason} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.3 }} className="space-y-4">
                  {(episodesBySeason[activeSeason] || []).map(ep => (
                    <li key={ep.id} onClick={() => handlePlayClick(ep)} className="group bg-[color:var(--surface-color)]/70 border border-slate-800 rounded-2xl p-3 cursor-pointer transition-all duration-300 hover:border-[color:var(--color-primary)]/50 hover:bg-[rgba(var(--surface-color-rgb),0.8)] hover:scale-[1.02] transform">
                      <div className="flex items-start sm:items-center gap-4 md:gap-5 flex-col sm:flex-row">
                        <div className="relative w-full sm:w-32 md:w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                          <img src={ep.still_path ? `${imageBaseUrl}w500${ep.still_path}` : fullBackdropPath || fullPosterPath} alt={ep.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center">
                            <PlayCircleIcon className="w-12 h-12 text-white/60 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-bold text-slate-200 truncate">{`E${ep.episode_number} - ${ep.name}`}</h3>
                          <p className="text-sm text-slate-400 mt-1.5 line-clamp-2 sm:line-clamp-3">{ep.overview || "No overview available for this episode."}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                  {episodesBySeason[activeSeason]?.length === 0 && (
                      <div className="text-center py-8 text-slate-400 flex flex-col items-center">
                          <FilmIcon className="w-12 h-12 text-slate-500 mb-3" />
                          <p>No episode information available for this season yet.</p>
                      </div>
                  )}
                </motion.ul>
              </AnimatePresence>
            </DetailSection>
          )}

          {recommendations.length > 0 && (
             <div className="mt-16 md:mt-20">
                <MovieCarousel id="recommendations" title="You Might Also Like" movies={recommendations} onCardClick={handleRecommendationClick}/>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTrailer(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl"
            >
              <button onClick={() => setSelectedTrailer(null)} className="absolute -top-4 -right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center z-10 hover:bg-gray-200 transition">
                <XMarkIcon className="w-6 h-6" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1&rel=0`}
                title={selectedTrailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimeDetailsPage;