import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../types.ts';
import { ArrowPathIcon, PencilIcon } from '../constants.tsx';

interface ManageProfilesPageProps {
    profiles: Profile[];
    onUpdateProfile: (profile: Profile) => void;
    onDeleteProfile: (profileId: string) => void;
    onDone: () => void;
}

const ManageProfilesPage: React.FC<ManageProfilesPageProps> = ({ profiles, onUpdateProfile, onDeleteProfile, onDone }) => {
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [name, setName] = useState('');
    const [kids, setKids] = useState(false);

    const handleStartEditing = (profile: Profile) => {
        setEditingProfile(profile);
        setName(profile.name);
        setKids(!!profile.kids);
    };

    const handleCancel = () => {
        setEditingProfile(null);
    };

    const handleSave = () => {
        if (!editingProfile || !name.trim()) return;
        onUpdateProfile({ ...editingProfile, name: name.trim(), kids });
        setEditingProfile(null);
    };
    
    const handleDelete = () => {
        if (!editingProfile) return;
        if (window.confirm(`Are you sure you want to delete the profile "${editingProfile.name}"? This cannot be undone.`)) {
            onDeleteProfile(editingProfile.id);
            setEditingProfile(null);
        }
    };

    const handleAvatarRefresh = () => {
        if (!editingProfile) return;
        // Generate a new random seed for the DiceBear avatar API
        const randomSeed = Math.random().toString(36).substring(7);
        const newAvatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${randomSeed}&backgroundColor=${editingProfile.avatarUrl.split('backgroundColor=')[1] || 'b6e3f4'}`;
        const updatedProfile = { ...editingProfile, avatarUrl: newAvatarUrl };
        onUpdateProfile(updatedProfile);
        setEditingProfile(updatedProfile); // Keep editing with the new avatar
    };

    if (editingProfile) {
        return (
<<<<<<< HEAD
             <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
=======
             <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-100">Edit Profile</h1>
                    <div className="relative">
                       <img src={editingProfile.avatarUrl} alt={editingProfile.name} className="w-40 h-40 rounded-lg object-cover border-4 border-slate-700"/>
                       <button onClick={handleAvatarRefresh} className="absolute -bottom-3 -right-3 w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-200 hover:bg-slate-600 transition-colors">
                            <ArrowPathIcon className="w-6 h-6"/>
                       </button>
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-64 h-12 text-center text-lg bg-slate-800 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-[color:var(--color-primary)]/50 focus:border-[color:var(--color-primary)] focus:outline-none transition-all duration-300 placeholder-slate-500 text-slate-200"
                    />
                    <label className="flex items-center gap-3 mt-2 select-none">
                        <input
                            type="checkbox"
                            checked={kids}
                            onChange={e => setKids(e.target.checked)}
                            className="w-5 h-5 accent-[color:var(--color-primary)]"
                        />
                        <span className="text-lg font-semibold text-[color:var(--color-primary)]">KIDS Profile</span>
                    </label>
                    <div className="flex items-center gap-4 mt-4">
                        <button onClick={handleSave} className="px-8 py-3 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] rounded-md font-semibold hover:opacity-90 transition-opacity">Save</button>
                        <button onClick={handleCancel} className="px-8 py-3 bg-slate-700 rounded-md font-semibold hover:bg-slate-600 transition-colors">Cancel</button>
                    </div>
                    <button onClick={handleDelete} className="text-red-500 hover:underline mt-4 font-semibold">Delete Profile</button>
                </motion.div>
             </div>
        )
    }

    return (
<<<<<<< HEAD
        <div className="min-h-screen flex flex-col items-center justify-center text-white pt-32 pb-16 px-4">
=======
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white pt-32 pb-16 px-4">
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
            <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-6xl font-bold mb-12 text-slate-100"
            >
                Manage Profiles
            </motion.h1>

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                className="flex flex-wrap justify-center items-start gap-4 sm:gap-8"
            >
                {profiles.map(profile => (
                    <motion.div 
                        key={profile.id}
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 }}}
                        className="text-center cursor-pointer group"
                    >
                        <button 
                            onClick={() => handleStartEditing(profile)}
                            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-4 border-transparent group-hover:border-white focus:border-white focus:outline-none transition-all duration-300"
                        >
                            <img 
                                src={profile.avatarUrl} 
                                alt={profile.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <PencilIcon className="w-10 h-10 text-white" />
                            </div>
                        </button>
                        <p className="mt-3 text-lg sm:text-xl font-medium text-slate-400 group-hover:text-white transition-colors">{profile.name}</p>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onDone}
                className="mt-16 px-12 py-3 bg-slate-800 text-slate-200 font-bold text-lg rounded-md hover:bg-slate-700 transition-colors"
            >
                Done
            </motion.button>
        </div>
    );
};

export default ManageProfilesPage;