
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Profile } from '../types.ts';
import { PlusIcon } from '../constants.tsx';

interface ProfileGateProps {
    profiles: Profile[];
    onProfileSelect: (profile: Profile) => void;
    onAddProfile: (profile: Profile) => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

const ProfileGate: React.FC<ProfileGateProps> = ({ profiles, onProfileSelect, onAddProfile }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [newName, setNewName] = useState('');
    const [newKids, setNewKids] = useState(false);
    const [newAvatar, setNewAvatar] = useState('');

    const handleAdd = () => {
        if (!newName.trim()) return;
        let avatarUrl = newAvatar.trim();
        if (!avatarUrl) {
            const randomSeed = Math.random().toString(36).substring(2, 10);
            avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(newName + randomSeed)}`;
        }
        onAddProfile({
            id: Date.now().toString(),
            name: newName.trim(),
            avatarUrl,
            kids: newKids
        });
        setShowAdd(false);
        setNewName('');
        setNewKids(false);
        setNewAvatar('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
            <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black font-heading mb-12 text-slate-100 text-center"
            >
                Who's Watching?
            </motion.h1>

            <motion.div 
                className="flex flex-wrap justify-center items-start gap-4 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {profiles.map(profile => (
                    <motion.div key={profile.id} variants={itemVariants} className="text-center group">
                        <motion.button
                            whileHover={{ y: -10, scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => onProfileSelect(profile)}
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-4 border-transparent group-hover:border-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] focus:outline-none transition-all duration-300 block"
                        >
                            <img 
                                src={profile.avatarUrl} 
                                alt={profile.name} 
                                className="w-full h-full object-cover transition-transform duration-300"
                            />
                        </motion.button>
                        <p className="mt-3 text-lg sm:text-xl font-medium text-slate-400 group-hover:text-white transition-colors">{profile.name}</p>
                    </motion.div>
                ))}
                <motion.div variants={itemVariants} className="text-center group">
                    <motion.button 
                        whileHover={{ y: -10, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        onClick={() => setShowAdd(true)}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg flex items-center justify-center bg-slate-800/50 group-hover:bg-slate-700/70 border-4 border-transparent group-hover:border-slate-500 focus:border-slate-500 focus:outline-none transition-all duration-300"
                        aria-label="Add Profile"
                    >
                        <PlusIcon className="w-16 h-16 text-slate-500 group-hover:text-slate-400 transition-colors" />
                    </motion.button>
                    <p className="mt-3 text-lg sm:text-xl font-medium text-slate-400 group-hover:text-white transition-colors">Add Profile</p>
                </motion.div>
            </motion.div>

            {showAdd && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-[color:var(--surface-color)] rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center gap-6 border border-[color:var(--color-primary-dark)]">
                        <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-2">Add Profile</h2>
                        <input
                            type="text"
                            placeholder="Profile name"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className="w-64 h-12 text-center text-lg bg-slate-800 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-[color:var(--color-primary)]/50 focus:border-[color:var(--color-primary)] focus:outline-none transition-all duration-300 placeholder-slate-500 text-slate-200"
                        />
                        <input
                            type="text"
                            placeholder="Avatar image URL (optional)"
                            value={newAvatar}
                            onChange={e => setNewAvatar(e.target.value)}
                            className="w-64 h-12 text-center text-lg bg-slate-800 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-[color:var(--color-primary)]/50 focus:border-[color:var(--color-primary)] focus:outline-none transition-all duration-300 placeholder-slate-500 text-slate-200"
                        />
                        <label className="flex items-center gap-3 select-none">
                            <input
                                type="checkbox"
                                checked={newKids}
                                onChange={e => setNewKids(e.target.checked)}
                                className="w-5 h-5 accent-[color:var(--color-primary)]"
                            />
                            <span className="text-lg font-semibold text-[color:var(--color-primary)]">KIDS Profile</span>
                        </label>
                        <div className="flex gap-4 mt-2">
                            <button onClick={handleAdd} className="px-6 py-2 bg-[color:var(--color-primary-dark)] rounded-md font-semibold text-white hover:bg-[color:var(--color-primary)] transition">Add</button>
                            <button onClick={() => setShowAdd(false)} className="px-6 py-2 bg-slate-700 rounded-md font-semibold text-white hover:bg-slate-600 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileGate;
