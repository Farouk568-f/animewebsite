


import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header.tsx';
import HeroSlider from './components/HeroSlider.tsx';
import MovieCarousel from './components/MovieCarousel.tsx';
import FaqSection from './components/FaqSection.tsx';
import Footer from './components/Footer.tsx';
import MovieCarouselSkeleton from './components/MovieCarouselSkeleton.tsx';
import AnimeDetailsPage from './components/AnimeDetailsPage.tsx';
import SearchPage from './components/SearchPage.tsx';
import VideoPlayer from './components/VideoPlayer.tsx';
import AnimeLibrary from './components/AnimeLibrary.tsx';
import ProfileGate from './components/ProfileGate.tsx';
import ManageProfilesPage from './components/ManageProfilesPage.tsx';
import AccountPage from './components/AccountPage.tsx';
import DiscoverPage from './components/DiscoverPage.tsx';
import RankedMovieCarousel from './components/RankedMovieCarousel.tsx';
import MyListPage from './components/MyListPage.tsx';

import { getHomePageData, getKidsHomePageData, getMediaDetails, getDiscoverPageData } from './services/animeService.ts';
import { Media, Episode, Profile, DiscoverPageData } from './types.ts';
import { PlayIcon } from './constants.tsx';

// دالة للتنقل بالكيبورد للتفاز
const useTVNavigation = () => {
  useEffect(() => {
    const handleKeyNavigation = (event: KeyboardEvent) => {
      const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);
      
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextIndex]?.focus();
          break;
          
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
          focusableElements[prevIndex]?.focus();
          break;
          
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.click();
          }
          break;
          
        case 'Escape':
          event.preventDefault();
          // العودة للصفحة الرئيسية
          if (window.location.hash !== '') {
            window.location.hash = '';
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyNavigation);
    
    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, []);

  // إضافة مؤشر التركيز المرئي للتفاز
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .tv-focus {
        outline: 3px solid #ff6b35 !important;
        outline-offset: 2px !important;
        transform: scale(1.02) !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.5) !important;
      }
      
      .tv-focus:hover {
        transform: scale(1.05) !important;
      }
      
      /* تحسين التركيز للعناصر */
      a:focus, button:focus, input:focus, textarea:focus, select:focus {
        outline: 3px solid #ff6b35 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // إضافة tabindex للعناصر القابلة للتركيز
  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select'
    ) as NodeListOf<HTMLElement>;
    
    focusableElements.forEach((element) => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });
  }, []);
};


// --- Mock Data ---
const MOCK_PROFILES: Profile[] = [
    { id: '1', name: 'Eren', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Eren&backgroundColor=b6e3f4' },
    { id: '2', name: 'Mikasa', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Mikasa&backgroundColor=c0aede' },
    { id: '3', name: 'Armin', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Armin&backgroundColor=d1d4f9' },
    { id: '4', name: 'Levi', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Levi&backgroundColor=ffd5dc' },
];

// --- Sub-components for cleaner structure ---
const ContinueWatchingCarousel: React.FC<{ list: any[], onPlay: (media: Media, episode?: Episode) => void }> = ({ list, onPlay }) => (
    <section data-aos="fade-up" className="container mx-auto max-w-7xl">
        <h2 className="carousel-title ml-4 sm:ml-6 lg:ml-8 mb-6">
            Continue Watching
        </h2>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 movie-carousel">
            {list.map(item => (
                <motion.button
                    key={`${item.id}-${item.mediaType}-${item.season || 'm'}-${item.episode || 'e'}`}
                    className="group relative flex-shrink-0 w-40 sm:w-48 lg:w-56 h-auto aspect-[2/3] rounded-xl overflow-hidden shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--background-color)] focus-visible:ring-[color:var(--color-primary)]"
                    onClick={() => {
                        onPlay({
                            id: item.id, media_type: item.mediaType, title: item.title, poster_path: item.poster, imdb_id: item.imdb_id,
                            overview: '', backdrop_path: null, vote_average: 0, release_date: '', genres: [],
                        },
                          (item.season && item.episode) ? {
                            id: 0, name: '', overview: '', episode_number: item.episode, season_number: item.season, still_path: null, vote_average: 0,
                          } : undefined
                        );
                    }}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <img src={item.poster} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 bg-[color:var(--surface-color)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 lg:p-4 w-full">
                        <h3 className="font-bold text-base text-white truncate">{item.title}</h3>
                        {item.season && item.episode && (<p className="text-xs text-slate-300 font-medium">S{item.season} E{item.episode}</p>)}
                    </div>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform transition-transform group-hover:scale-100 scale-75">
                            <PlayIcon className="w-8 h-8 ml-1" />
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
    </section>
);


const App: React.FC = () => {
    // --- State Management ---
    const [trending, setTrending] = useState<Media[]>([]);
    const [popularMovies, setPopularMovies] = useState<Media[]>([]);
    const [topRatedTv, setTopRatedTv] = useState<Media[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Media[]>([]);
    const [discoverPageData, setDiscoverPageData] = useState<DiscoverPageData | null>(null);
    const [myList, setMyList] = useState<Media[]>([]);
    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
    const [isDiscoverLoading, setIsDiscoverLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [continueWatchingList, setContinueWatchingList] = useState<any[]>([]);
    const [detailedMedia, setDetailedMedia] = useState<Media | null>(null);

    const [currentView, setCurrentView] = useState<{ page: 'home' | 'details' | 'search' | 'library' | 'manageProfiles' | 'account' | 'discover' | 'myList', mediaId?: number, mediaType?: 'movie' | 'tv', query?: string }>({ page: 'home' });
    const [videoPlayer, setVideoPlayer] = useState<{ media: Media; episode?: Episode } | null>(null);

    // Profile State
    const [profiles, setProfiles] = useState<Profile[]>(() => {
      const saved = localStorage.getItem('profiles');
      return saved ? JSON.parse(saved) : MOCK_PROFILES;
    });
    const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

    // تفعيل التنقل بالكيبورد للتفاز
    useTVNavigation();

    // --- Effects ---
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Apply theme on load and navigation
        const savedTheme = JSON.parse(localStorage.getItem('theme') || JSON.stringify('blue'));
        document.body.dataset.theme = savedTheme;

        const handleHashChange = () => {
            const hash = window.location.hash;
            const detailsMatch = hash.match(/^#\/(movie|tv)\/(\d+)/);
            const searchMatch = hash.match(/^#\/search\/(.+)$/);
            const libraryMatch = hash.match(/^#\/library$/);
            const discoverMatch = hash.match(/^#\/discover$/);
            const myListMatch = hash.match(/^#\/mylist$/);
            
            // Smooth scroll to top with easing
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (currentView.page === 'manageProfiles' || currentView.page === 'account') {
                return;
            }

            if (detailsMatch) {
              const mediaType = detailsMatch[1] as 'movie' | 'tv';
              const mediaId = parseInt(detailsMatch[2], 10);
              setCurrentView({ page: 'details', mediaType, mediaId });
              // Fetch new details when hash changes
              getMediaDetails(mediaId, mediaType).then(setDetailedMedia).catch(() => setDetailedMedia(null));
            }
            else if (searchMatch) setCurrentView({ page: 'search', query: decodeURIComponent(searchMatch[1]) });
            else if (libraryMatch) setCurrentView({ page: 'library' });
            else if (discoverMatch) setCurrentView({ page: 'discover' });
            else if (myListMatch) setCurrentView({ page: 'myList' });
            else setCurrentView({ page: 'home' });
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial call
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []); 

    useEffect(() => {
        AOS.init({ duration: 800, once: true, offset: 50 });
        const fetchAllMedia = async () => {
            try {
                setIsPageLoading(true);
                setError(null);
                let data;
                if (activeProfile?.kids) {
                    data = await getKidsHomePageData();
                } else {
                    data = await getHomePageData();
                }
                setTrending(data.trending);
                setPopularMovies(data.popularMovies);
                setTopRatedTv(data.topRatedTv);
                setUpcomingMovies(data.upcomingMovies);
            } catch (err: any) {
                setError("Failed to load data. Please check your API key and network connection.");
            } finally {
                setIsPageLoading(false);
            }
        };

        const fetchDiscoverData = async () => {
            try {
              setIsDiscoverLoading(true);
              const data = await getDiscoverPageData();
              setDiscoverPageData(data);
            } catch (err) {
              setError("Failed to load Discover page data.");
            } finally {
              setIsDiscoverLoading(false);
            }
        };

        if (activeProfile) {
          if (currentView.page === 'home' && trending.length === 0) {
            fetchAllMedia();
          } else if (currentView.page === 'discover' && !discoverPageData) {
            fetchDiscoverData();
          }
        }
    }, [currentView.page, activeProfile, trending.length, discoverPageData]);

    useEffect(() => {
      if (activeProfile) {
        setContinueWatchingList(JSON.parse(localStorage.getItem(`continueWatchingList_${activeProfile.id}`) || '[]'));
        setMyList(JSON.parse(localStorage.getItem(`myList_${activeProfile.id}`) || '[]'));
      }
    }, [activeProfile]);

    useEffect(() => {
      if (activeProfile) {
        localStorage.setItem(`continueWatchingList_${activeProfile.id}`, JSON.stringify(continueWatchingList));
      }
    }, [continueWatchingList, activeProfile]);
    
    useEffect(() => {
      if (activeProfile) {
        localStorage.setItem(`myList_${activeProfile.id}`, JSON.stringify(myList));
      }
    }, [myList, activeProfile]);

    useEffect(() => {
      localStorage.setItem('profiles', JSON.stringify(profiles));
    }, [profiles]);

    // --- Handlers ---
    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            if (currentView.page === 'search') window.location.hash = '#';
            return;
        };
        window.location.hash = `#/search/${encodeURIComponent(query)}`;
    }, [currentView.page]);

    const openVideoPlayer = useCallback((media: Media, episode?: Episode) => setVideoPlayer({ media, episode }), []);
    const closeVideoPlayer = useCallback(() => setVideoPlayer(null), []);
    const handleCardClick = useCallback((media: Media) => window.location.hash = `#/${media.media_type}/${media.id}`, []);
    
    const handleToggleMyList = (mediaItem: Media) => {
        setMyList(currentList => {
            const existingIndex = currentList.findIndex(item => item.id === mediaItem.id);
            if (existingIndex > -1) {
                const newList = [...currentList];
                newList.splice(existingIndex, 1);
                return newList;
            } else {
                const summaryMedia: Media = {
                    id: mediaItem.id,
                    title: mediaItem.title,
                    poster_path: mediaItem.poster_path,
                    backdrop_path: mediaItem.backdrop_path,
                    overview: mediaItem.overview,
                    vote_average: mediaItem.vote_average,
                    release_date: mediaItem.release_date,
                    genres: mediaItem.genres.slice(0, 3),
                    media_type: mediaItem.media_type,
                };
                return [summaryMedia, ...currentList];
            }
        });
    };

    // Profile Handlers
    const handleProfileSelect = (profile: Profile) => {
      setActiveProfile(profile);
      setCurrentView({ page: 'home' });
      setTrending([]);
      setPopularMovies([]);
      setTopRatedTv([]);
      setUpcomingMovies([]);
    };
    const handleSignOut = () => setActiveProfile(null);
    const handleAddProfile = (profile: Profile) => {
      setProfiles(prev => [...prev, profile]);
    };
    const handleNavigateToManageProfiles = () => setCurrentView({ page: 'manageProfiles' });
    const handleNavigateToAccount = () => setCurrentView({ page: 'account' });
    const handleReturnHome = () => setCurrentView({ page: 'home' });
    
    const handleUpdateProfile = (updatedProfile: Profile) => {
      setProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
      if (activeProfile?.id === updatedProfile.id) {
        setActiveProfile(updatedProfile);
      }
    };
  
    const handleDeleteProfile = (profileId: string) => {
      if (profiles.length <= 1) {
        alert("You cannot delete the last profile.");
        return;
      }
      setProfiles(prev => prev.filter(p => p.id !== profileId));
      if (activeProfile?.id === profileId) {
        setActiveProfile(null); 
      }
    };

    const handleClearWatchHistory = () => {
        if (window.confirm("Are you sure you want to clear your entire watch history for this profile? This cannot be undone.")) {
            setContinueWatchingList([]);
        }
    };

    // --- Render Logic ---
    if (!activeProfile) {
        return <ProfileGate profiles={profiles} onProfileSelect={handleProfileSelect} onAddProfile={handleAddProfile} />;
    }

    const getPageKey = () => {
        if (currentView.page === 'details' && currentView.mediaId) return `details-${currentView.mediaId}`;
        if (currentView.page === 'search' && currentView.query) return `search-${currentView.query}`;
        if (currentView.page === 'discover') return 'discover';
        if (currentView.page === 'myList') return 'myList';
        return currentView.page;
    };
    
    const renderContent = () => {
        if (activeProfile?.kids && (currentView.page === 'home' || currentView.page === 'library')) {
          return (
            <>
              <HeroSlider movies={trending.filter(m => m.genres?.some(g => g.name.toLowerCase().includes('kids') || g.name.toLowerCase().includes('family')))} isLoading={isPageLoading} onCardClick={handleCardClick} />
              <div className="py-12 md:py-20 flex flex-col gap-y-12 md:gap-y-20">
                {continueWatchingList.length > 0 && <ContinueWatchingCarousel list={continueWatchingList} onPlay={openVideoPlayer} />}
                {error && <p className="text-center text-red-500 bg-red-900/20 py-3 px-4 rounded-lg container mx-auto max-w-4xl">{error}</p>}
                {isPageLoading ? (
                  [...Array(3)].map((_, i) => <MovieCarouselSkeleton key={i} />)
                ) : (
                  <>
                    <MovieCarousel id="kids-popular" title="Popular Kids" movies={popularMovies.filter(m => m.genres?.some(g => g.name.toLowerCase().includes('kids') || g.name.toLowerCase().includes('family')))} onCardClick={handleCardClick} />
                    <MovieCarousel id="kids-top-rated" title="Top Rated Kids" movies={topRatedTv.filter(m => m.genres?.some(g => g.name.toLowerCase().includes('kids') || g.name.toLowerCase().includes('family')))} onCardClick={handleCardClick} />
                    <MovieCarousel id="kids-upcoming" title="Upcoming Kids" movies={upcomingMovies.filter(m => m.genres?.some(g => g.name.toLowerCase().includes('kids') || g.name.toLowerCase().includes('family')))} onCardClick={handleCardClick} />
                  </>
                )}
              </div>
            </>
          );
        }
        switch (currentView.page) {
            case 'manageProfiles':
              return <ManageProfilesPage profiles={profiles} onUpdateProfile={handleUpdateProfile} onDeleteProfile={handleDeleteProfile} onDone={handleReturnHome} />;
            case 'account':
              return <AccountPage activeProfile={activeProfile} onBack={handleReturnHome} onClearWatchHistory={handleClearWatchHistory} />;
            case 'details':
              return <AnimeDetailsPage 
                media={detailedMedia} 
                onPlay={openVideoPlayer} 
                onCloseVideoPlayer={closeVideoPlayer} 
                myList={myList}
                onToggleMyList={handleToggleMyList}
              />;
            case 'library':
                return <AnimeLibrary />;
            case 'search':
                return <SearchPage initialQuery={currentView.query!} onCardClick={handleCardClick} activeProfile={activeProfile} />;
            case 'discover':
                return <DiscoverPage data={discoverPageData} isLoading={isDiscoverLoading} onCardClick={handleCardClick} />;
            case 'myList':
                return <MyListPage myList={myList} onCardClick={handleCardClick} />;
            case 'home':
            default:
                return (
                    <>
                        <HeroSlider movies={trending} isLoading={isPageLoading} onCardClick={handleCardClick} />
                        <div className="py-12 md:py-20 flex flex-col gap-y-12 md:gap-y-20">
                            {continueWatchingList.length > 0 && <ContinueWatchingCarousel list={continueWatchingList} onPlay={openVideoPlayer} />}
                            {error && <p className="text-center text-red-500 bg-red-900/20 py-3 px-4 rounded-lg container mx-auto max-w-4xl">{error}</p>}
                            {isPageLoading ? (
                                [...Array(4)].map((_, i) => <MovieCarouselSkeleton key={i} />)
                            ) : (
                                <>
                                    <RankedMovieCarousel id="trending" title="Top 10 This Week" movies={trending.slice(0, 10)} onCardClick={handleCardClick} />
                                    <MovieCarousel id="popular" title="Popular Movies" movies={popularMovies} onCardClick={handleCardClick} />
                                    <MovieCarousel id="top-rated" title="Top Rated TV Shows" movies={topRatedTv} onCardClick={handleCardClick} />
                                    <MovieCarousel id="upcoming" title="Upcoming Movies" movies={upcomingMovies} onCardClick={handleCardClick} />
                                </>
                            )}
                        </div>
                        <FaqSection />
                    </>
                );
        }
    };

    return (
        <div className="font-sans antialiased">
            <Header
                onSearch={handleSearch}
                showSearch={!['manageProfiles', 'account'].includes(currentView.page)}
                activeProfile={activeProfile}
                profiles={profiles}
                onProfileSelect={handleProfileSelect}
                onSignOut={handleSignOut}
                onManageProfiles={handleNavigateToManageProfiles}
                onAccount={handleNavigateToAccount}
            />

            <main>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={getPageKey()}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ 
                            duration: 0.3, 
                            ease: [0.4, 0.0, 0.2, 1],
                            staggerChildren: 0.05
                        }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />

            {videoPlayer && (
                <VideoPlayer media={videoPlayer.media} episode={videoPlayer.episode} onClose={closeVideoPlayer} setContinueWatchingList={setContinueWatchingList} continueWatchingList={continueWatchingList} />
            )}
        </div>
    );
};

export default App;