


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilmIcon, Bars3Icon, XMarkIcon } from '../constants.tsx';
import { Profile } from '../types.ts';
import ProfileMenu from './ProfileMenu.tsx';

interface HeaderProps {
    onSearch: (query: string) => void;
    showSearch?: boolean;
    activeProfile: Profile | null;
    profiles: Profile[];
    onProfileSelect: (profile: Profile) => void;
    onSignOut: () => void;
    onManageProfiles: () => void;
    onAccount: () => void;
}

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const navLinks = [
    { name: "Discover", href: "#/discover" },
    { name: "Library", href: "#/library" },
    { name: "My List", href: "#/mylist" },
    { name: "Popular", href: "#popular" },
    { name: "Top Rated", href: "#top-rated" },
    { name: "Upcoming", href: "#upcoming" },
];

const MobileMenu: React.FC<{onSearch: (q:string)=>void, onLinkClick:()=>void}> = ({onSearch, onLinkClick}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimeout = useRef<number | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = window.setTimeout(() => onSearch(query), 300);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(searchTimeout.current) clearTimeout(searchTimeout.current);
        onSearch(searchQuery);
    };

    const handleNavLinkClick = (href: string) => {
        window.location.hash = href;
        onLinkClick();
    };
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-50 flex flex-col p-4"
        >
            <div className="flex justify-end">
                <button onClick={onLinkClick} className="p-2">
                    <XMarkIcon className="w-8 h-8 text-white"/>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
                 <form onSubmit={handleFormSubmit} className="relative w-full max-w-sm">
                    <input 
                        type="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="h-12 w-full bg-slate-800/60 border-2 border-slate-700/80 rounded-full pl-6 pr-14 text-lg focus:ring-2 focus:ring-[color:var(--color-primary)]/50 focus:bg-slate-700/80 focus:border-[color:var(--color-primary-dark)] focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-200"
                    />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                        <SearchIcon className="w-6 h-6 text-slate-400"/>
                    </button>
                </form>
                <nav className="flex flex-col gap-6">
                     {navLinks.map((link) => (
                        <button 
                            key={link.name} 
                            onClick={() => handleNavLinkClick(link.href)} 
                            className="text-2xl font-bold text-slate-300 hover:text-white transition-colors"
                        >
                          {link.name}
                        </button>
                      ))}
                </nav>
            </div>
        </motion.div>
    );
};


const Header: React.FC<HeaderProps> = ({ onSearch, showSearch = true, activeProfile, profiles, onProfileSelect, onSignOut, onManageProfiles, onAccount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<number | null>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = window.setTimeout(() => {
          onSearch(query);
      }, 300); // Debounce search
  };
  
  const handleProfileSelectAndCloseMenu = (profile: Profile) => {
    onProfileSelect(profile);
    setIsProfileMenuOpen(false);
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#';
  };

  const handleNavLinkClick = (href: string) => {
    window.location.hash = href;
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between rounded-full pl-4 pr-2 sm:pl-6 sm:pr-4 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-2xl shadow-black/30 h-16' : 'h-20 bg-transparent'}`}>
            <div className="flex items-center gap-8">
              <button onClick={handleLogoClick} className="flex items-center space-x-3">
                <FilmIcon className="w-8 h-8 text-[color:var(--color-primary)]" />
                <span className="sitename text-xl sm:text-3xl text-white whitespace-nowrap [text-shadow:1px_1px_2px_rgb(0_0_0_/_50%)]">AnimeVerse</span>
              </button>
              {showSearch && (
                <nav className="hidden lg:flex items-center space-x-2 font-semibold text-slate-300">
                  {navLinks.map((link) => (
                    <button 
                        key={link.name} 
                        onClick={() => handleNavLinkClick(link.href)} 
                        className="nav-link"
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                {showSearch && (
                     <form onSubmit={(e) => e.preventDefault()} className="relative hidden sm:block">
                        <input 
                            ref={searchInputRef}
                            type="search"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="h-10 w-48 bg-slate-800/60 border border-slate-700/80 rounded-full pl-10 pr-4 text-sm focus:ring-2 focus:ring-[color:var(--color-primary)]/50 focus:bg-slate-700/80 focus:border-[color:var(--color-primary-dark)] focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-200"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"/>
                    </form>
                )}
                 {activeProfile && (
                    <div className="relative" ref={profileMenuRef}>
                        <button
                          onClick={() => setIsProfileMenuOpen(v => !v)}
                          className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-[color:var(--color-primary)]"
                          aria-label="Account"
                        >
                          <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-full h-full p-0.5 rounded-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          {activeProfile.kids && (
                            <span 
                              className="absolute -bottom-1 -right-1 flex h-5 items-center justify-center rounded-full border-2 border-[color:var(--surface-color)] bg-amber-400 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-md select-none" 
                              title="Kids Profile"
                            >
                              Kids
                            </span>
                          )}
                        </button>
                        <AnimatePresence>
                        {isProfileMenuOpen && (
                            <ProfileMenu 
                                activeProfile={activeProfile} 
                                profiles={profiles}
                                onProfileSelect={(profile) => handleProfileSelectAndCloseMenu(profile)}
                                onSignOut={() => { onSignOut(); setIsProfileMenuOpen(false); }}
                                onManageProfiles={() => { onManageProfiles(); setIsProfileMenuOpen(false); }}
                                onAccount={() => { onAccount(); setIsProfileMenuOpen(false); }}
                            />
                        )}
                        </AnimatePresence>
                    </div>
                )}
                 {showSearch && (
                     <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-white" aria-label="Open menu">
                         <Bars3Icon className="w-7 h-7"/>
                     </button>
                 )}
            </div>
        </div>
      </div>
      <AnimatePresence>
          {isMobileMenuOpen && <MobileMenu onSearch={onSearch} onLinkClick={toggleMobileMenu} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;