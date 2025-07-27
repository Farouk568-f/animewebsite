import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile } from '../types.ts';
import { ChevronLeftIcon, UserIcon, PaintBrushIcon, PlayPauseIcon, BellIcon, TrashIcon } from '../constants.tsx';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ToggleSwitch from './ToggleSwitch.tsx';

interface AccountPageProps {
    activeProfile: Profile;
    onBack: () => void;
    onClearWatchHistory: () => void;
}

const THEMES = [
  { name: 'Blue', value: 'blue', color: 'bg-cyan-500', ring: 'ring-cyan-500' },
  { name: 'Red', value: 'red', color: 'bg-red-500', ring: 'ring-red-500' },
  { name: 'Green', value: 'green', color: 'bg-green-500', ring: 'ring-green-500' },
  { name: 'Purple', value: 'purple', color: 'bg-purple-500', ring: 'ring-purple-500' },
  { name: 'Orange', value: 'orange', color: 'bg-orange-500', ring: 'ring-orange-500' },
];

const TABS = [
  { id: 'membership', name: 'Membership', icon: <UserIcon className="w-5 h-5"/> },
  { id: 'themes', name: 'Themes', icon: <PaintBrushIcon className="w-5 h-5"/> },
  { id: 'player', name: 'Player', icon: <PlayPauseIcon className="w-5 h-5"/> },
  { id: 'notifications', name: 'Notifications', icon: <BellIcon className="w-5 h-5"/> },
];

const useLocalStorageState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};


const AccountPage: React.FC<AccountPageProps> = ({ activeProfile, onBack, onClearWatchHistory }) => {
    const [activeTab, setActiveTab] = useState('membership');
    const [colorTheme, setColorTheme] = useLocalStorageState('theme', 'blue');
    
    // Player Settings
    const [autoplay, setAutoplay] = useLocalStorageState(`settings_autoplay_${activeProfile.id}`, true);
    const [skipIntro, setSkipIntro] = useLocalStorageState(`settings_skipIntro_${activeProfile.id}`, true);
    const [videoQuality, setVideoQuality] = useLocalStorageState(`settings_videoQuality_${activeProfile.id}`, 'auto');
    const [playbackSpeed, setPlaybackSpeed] = useLocalStorageState(`settings_playbackSpeed_${activeProfile.id}`, '1');
    
    // Notification Settings
    const [newEpisodeAlerts, setNewEpisodeAlerts] = useLocalStorageState(`settings_newEpisodeAlerts_${activeProfile.id}`, true);
    const [recommendationAlerts, setRecommendationAlerts] = useLocalStorageState(`settings_recommendationAlerts_${activeProfile.id}`, false);
    const [newsletter, setNewsletter] = useLocalStorageState(`settings_newsletter_${activeProfile.id}`, true);


    useEffect(() => {
      document.body.dataset.theme = colorTheme;
    }, [colorTheme]);
    
    const ContentCard: React.FC<{children: React.ReactNode}> = ({ children }) => (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -10}}
        transition={{ duration: 0.3 }}
        className="bg-[color:var(--surface-color)] border border-slate-800 rounded-2xl p-6 sm:p-8"
      >
        {children}
      </motion.div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'themes':
                return (
                  <ContentCard>
                    <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-6">Appearance</h2>
                    <p className="text-slate-400 mb-8">Choose a color theme to personalize your experience.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                      {THEMES.map(t => (
                        <button
                          key={t.value}
                          onClick={() => setColorTheme(t.value)}
                          className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-4 ${colorTheme === t.value ? t.ring + ' border-transparent' : 'border-slate-700 hover:border-slate-500'}`}
                        >
                          <span className={`w-12 h-12 rounded-full ${t.color} transition-transform duration-300 ${colorTheme === t.value ? 'scale-110' : 'group-hover:scale-105'}`}></span>
                          <span className="font-bold text-lg text-slate-200">{t.name}</span>
                          <AnimatePresence>
                          {colorTheme === t.value && (
                            <motion.div 
                              initial={{opacity: 0, scale: 0.5}}
                              animate={{opacity: 1, scale: 1}}
                              exit={{opacity: 0, scale: 0.5}}
                              className="absolute top-2 right-2 text-white bg-green-500 rounded-full"
                            >
                              <CheckCircleIcon className="w-6 h-6"/>
                            </motion.div>
                          )}
                          </AnimatePresence>
                        </button>
                      ))}
                    </div>
                  </ContentCard>
                );
            case 'player':
              return (
                <ContentCard>
                  <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-6">Player Settings</h2>
                  <div className="space-y-8">
                    <ToggleSwitch label="Autoplay Next Episode" enabled={autoplay} setEnabled={setAutoplay} />
                    <ToggleSwitch label="Skip Intros" enabled={skipIntro} setEnabled={setSkipIntro} />
                    
                    <div className="flex justify-between items-center">
                      <label className="font-semibold text-slate-200">Preferred Video Quality</label>
                      <select value={videoQuality} onChange={e => setVideoQuality(e.target.value)} className="bg-slate-800 text-slate-200 rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] cursor-pointer">
                        <option value="auto">Auto</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>

                    <div className="flex justify-between items-center">
                      <label className="font-semibold text-slate-200">Default Playback Speed</label>
                      <select value={playbackSpeed} onChange={e => setPlaybackSpeed(e.target.value)} className="bg-slate-800 text-slate-200 rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] cursor-pointer">
                        <option value="0.75">0.75x</option>
                        <option value="1">1x (Normal)</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                    </div>
                  </div>
                </ContentCard>
              );
            case 'notifications':
              return (
                 <ContentCard>
                    <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-6">Notification Settings</h2>
                    <div className="space-y-6">
                      <ToggleSwitch label="New Episode Alerts" description="Get notified when a new episode of a show in your list is available." enabled={newEpisodeAlerts} setEnabled={setNewEpisodeAlerts} />
                      <ToggleSwitch label="Personalized Recommendations" description="Receive occasional recommendations based on your watch history." enabled={recommendationAlerts} setEnabled={setRecommendationAlerts} />
                      <ToggleSwitch label="Newsletter" description="Subscribe to the AnimeVerse newsletter for news and updates." enabled={newsletter} setEnabled={setNewsletter} />
                    </div>
                 </ContentCard>
              );
            case 'membership':
            default:
                return (
                    <ContentCard>
                      <div className="space-y-10">
                        <div>
                            <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-4">MEMBERSHIP & BILLING</h2>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <span className="text-slate-400 font-mono">user@animeverse.io</span>
                                <button className="text-red-400 hover:text-red-300 hover:underline text-sm font-semibold">Cancel Membership</button>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-4">PLAN DETAILS</h2>
                            <div className="flex items-center gap-4">
                               <span className="font-bold text-slate-100">Premium</span>
                               <span className="text-xs font-semibold uppercase tracking-wider bg-[color:var(--color-primary)/.1] text-[color:var(--color-primary)] px-2 py-1 rounded-full">4K+HDR</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-4">PROFILE & PARENTAL CONTROLS</h2>
                            <div className="flex items-center gap-4">
                                <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                    <p className="font-bold text-lg text-slate-100">{activeProfile.name}</p>
                                    <p className="text-sm text-slate-400">All Maturity Ratings</p>
                                </div>
                            </div>
                        </div>
                         <div>
                            <h2 className="text-xl font-bold text-slate-100 font-heading border-b border-slate-700/70 pb-4 mb-4">DATA MANAGEMENT</h2>
                             <button onClick={onClearWatchHistory} className="flex items-center gap-3 px-4 py-2 bg-red-600/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/20 hover:text-red-300 transition-colors">
                                <TrashIcon className="w-5 h-5"/>
                                Clear Watch History
                             </button>
                        </div>
                      </div>
                    </ContentCard>
                );
        }
    }


    return (
        <div className="min-h-screen text-white pt-32 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <button 
                        onClick={onBack} 
                        className="flex items-center gap-2 mb-8 text-slate-300 hover:text-[color:var(--color-primary)] font-semibold transition-colors"
                    >
                        <ChevronLeftIcon className="w-5 h-5"/> Back to Home
                    </button>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-slate-100 font-heading">Account Settings</h1>
                    <p className="text-slate-400 border-b border-slate-800 pb-8 mb-8">Control your AnimeVerse experience for profile: <span className="font-bold text-slate-200">{activeProfile.name}</span></p>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 border-b border-slate-800">
                      {TABS.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative flex items-center gap-2 pb-3 px-2 sm:px-4 text-base sm:text-lg font-bold border-b-2 transition-colors focus:outline-none ${activeTab === tab.id ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]' : 'border-transparent text-slate-400 hover:text-white'}`}
                        >
                          {tab.icon}
                          {tab.name}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {renderContent()}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default AccountPage;