
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../types.ts';
import { ChevronLeftIcon } from '../constants.tsx';

interface AccountPageProps {
    activeProfile: Profile;
    onBack: () => void;
}

const THEMES = [
  { name: 'Blue', value: 'blue', color: 'bg-[color:var(--color-primary)]', ring: 'ring-[color:var(--color-primary)]' },
  { name: 'Red', value: 'red', color: 'bg-red-500', ring: 'ring-red-500' },
];

const AccountPage: React.FC<AccountPageProps> = ({ activeProfile, onBack }) => {
    const [activeTab, setActiveTab] = useState('account');
    const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('theme') || 'blue');

    useEffect(() => {
      document.body.dataset.theme = colorTheme;
      localStorage.setItem('theme', colorTheme);
    }, [colorTheme]);

    return (
        <div className="min-h-screen text-white pt-32 pb-16 px-4 bg-slate-950">
            <div className="container mx-auto max-w-4xl">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <button 
                        onClick={onBack} 
                        className="flex items-center gap-2 mb-8 text-slate-300 hover:text-[color:var(--color-primary)] font-semibold transition-colors"
                    >
                        <ChevronLeftIcon className="w-5 h-5"/> Back to Home
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-100">Account</h1>
                    <p className="text-slate-400 border-b border-slate-800 pb-8 mb-8">Control your AnimeVerse experience.</p>

                    {/* Tabs */}
                    <div className="flex gap-6 mb-8 border-b border-slate-800">
                      <button className="pb-3 px-2 text-lg font-bold border-b-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)]" onClick={() => setActiveTab('account')}>Account</button>
                      <button className={`pb-3 px-2 text-lg font-bold border-b-2 ${activeTab === 'themes' ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]' : 'border-transparent text-slate-400'}`} onClick={() => setActiveTab('themes')}>Themes</button>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'themes' ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-3 mb-4">Appearance</h2>
                        <p className="text-slate-400 mb-6">Choose a color theme to personalize your experience.</p>
                        <div className="flex gap-6">
                          {THEMES.map(t => (
                            <button
                              key={t.value}
                              onClick={() => setColorTheme(t.value)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${colorTheme === t.value ? t.ring + ' ring-4' : 'border-slate-700 hover:border-slate-500'}`}
                            >
                              <span className={`w-10 h-10 rounded-full ${t.color} mb-2`}></span>
                              <span className="font-bold text-lg text-slate-200">{t.name}</span>
                              {colorTheme === t.value && <span className="text-xs text-slate-400">Active</span>}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-8">
                        {/* Membership section */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-3 mb-4">MEMBERSHIP & BILLING</h2>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <span className="text-slate-400 font-mono">user@animeverse.io</span>
                                <button className="text-[color:var(--color-primary)] hover:underline text-sm font-semibold">Cancel Membership</button>
                            </div>
                        </div>

                        {/* Plan details */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-3 mb-4">PLAN DETAILS</h2>
                            <div className="flex items-center gap-4">
                               <span className="font-bold text-slate-100">Premium</span>
                               <span className="text-xs font-semibold uppercase tracking-wider bg-[color:var(--color-primary)/.1] text-[color:var(--color-primary)] px-2 py-1 rounded-full">4K+HDR</span>
                            </div>
                        </div>
                        
                         {/* Profile details */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-3 mb-4">PROFILE & PARENTAL CONTROLS</h2>
                            <div className="flex items-center gap-4">
                                <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-12 h-12 rounded-md object-cover" />
                                <div>
                                    <p className="font-bold text-lg text-slate-100">{activeProfile.name}</p>
                                    <p className="text-sm text-slate-400">All Maturity Ratings</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AccountPage;